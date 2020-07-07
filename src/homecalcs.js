//import rate default values for use in below functions-growth rate, inflation rate, mortgage interest rate, mortgage years 
////These are passed as default paramter values to the function but can be changed at the function call
const rateDefaults = require('./globaldefaults.js');
//Import basic functions object and extract grow against infaltion function for calculating future home values as the value grows over time
const basicFunctions = require('./basicfunctions.js');
const growAgainstInflation = basicFunctions.growAgainstInflation;
const calcMonthlyLoanPayment = basicFunctions.calcMonthlyLoanPayment;

//home creator takes all the required variables related to a home purchase and saves them as an object.  This is a factory function for home objects
//Every value has a getter and setter method, though most of them are probably not necessary
//Important method is yearly values
const homeCreator = (_number, _yearPurchased, _yearSold, _originalValue, _growthRate=rateDefaults.homeValueGrowth, _mortgageInterestRate=rateDefaults.mortgageInterest,
    _realEstateTaxRate=rateDefaults.realEstateTax, _downPayment=.2*_originalValue, _mortgageYears=rateDefaults.mortgageYears, _HOA=0, _renting=false, _monthlyRent=0) =>{
    return {
        //Number just refers to which house in the progression of owning homes this particualr home object is referring to-may not be necessary-could probably just use year purchased/sold
        _number,
        //Year when the house is purchased-helps set the range for which the house has meaningful data like value, equity, loan remaining, etc.
        _yearPurchased,
        //Year when the house is sold-helps set the range for which the house has meaningful data like value, equity, loan remaining, etc.
        _yearSold,
        //Purchase price of the home
        _originalValue,
        //Growth rate can be left as default or set when calling home creator.  Would need an array of growth rates set by user, and that array to be consumed, to support this
        _growthRate,
        //Growth rate can be left as default or set when calling home creator.  Would need an array of interest rates set by user, and that array to be consumed, to support this
        _mortgageInterestRate,
        //real estate tax rate rate can be left as default or set when calling home creator.  Would need an array of tax rates set by user, and that array to be consumed, to support this
        _realEstateTaxRate,
        //Down payment will default to 20% if nothing provided.  If full transfer is true above, the previous home's equity will be used as DP regardless of what % that represents
        _downPayment,
        //Mortgage years can be left as default or set when calling home creator.  Would need an array of loan lengths set by user, and that array to be consumed, to support this
        _mortgageYears,
        //yearly values takes in any year and returns relevant values for the home-the monthly payment (which does not change over time), amount of equity in the home,
        //remaining loon balance, and the overall value of the home.  These are returned as four objets which make up one parent object
        _HOA,
        _renting,
        _monthlyRent,
        yearlyValues (seekingYear=this._yearPurchased) {
            //start by making sure the year being passed to method is reasonable
            if(seekingYear>2100 || seekingYear < 1950){
                console.log(`Please enter a valid year to return relevant home values`);
            }else{
            //Then calculate the monthly payment of the loan based on outstanding principle, interest rate, length of mortgage, etc.  Standard loan calculator formula
            //This payment is monthly which is one of the only values in the app which refers to a montly value-hence the *12 and /12 in the formula
            let monthlyPayment;
            if(this._renting==false){
                monthlyPayment = calcMonthlyLoanPayment(this._originalValue-this._downPayment, this._mortgageInterestRate, this._mortgageYears);
            }else{
                monthlyPayment=0;
            }
            //Annual cost section
            let annualCost;
            //If seeking year does not fall within the range of when the house is actually owned, annual cost is 0
            if(seekingYear>=this._yearSold || seekingYear<this._yearPurchased){
                annualCost = 0;
            //Check if seeking year is after the loan has been fully paid but also before the year sold-basically when the only cost associated with the home is ongoing real estate tax payments
            }else if(this._renting==true){
                annualCost = this._monthlyRent*12;
            }
            else if(seekingYear>=this._yearPurchased+this._mortgageYears){
                //annual cost in this scenario is just the growing value of the home times the real estate tax rate
                annualCost = ((growAgainstInflation(this._originalValue, seekingYear-this._yearPurchased, this._growthRate, rateDefaults.inflation)*this._realEstateTaxRate))+(this._HOA*12);
            }//Now we are in the "normal" range when the house is actually owned and not yet paid off
            else{
                //annual cost is the constant monthly payment*12 + the growing value of the home times the real estate tax rate
                annualCost= (monthlyPayment*12)+(growAgainstInflation(this._originalValue, seekingYear-this._yearPurchased, this._growthRate, rateDefaults.inflation)*this._realEstateTaxRate)+(this._HOA*12);
            }
            //Remaining balance on the loan section
            let remainingBalance;
            //If the seeking year is before the house is purchased, after it is sold, or after the loan is fully paid off, remaining balance is 0
            if(seekingYear>=this._yearPurchased+this._mortgageYears || seekingYear>this._yearSold || seekingYear<this._yearPurchased || this._renting==true){
                remainingBalance = 0;
            }else{
                //If not, remaining balance is calculated by another, related loan calculator formula using loan starting value, length, and interest rate
                remainingBalance = (this._originalValue-this._downPayment)*((1+(this._mortgageInterestRate/12))**(this._mortgageYears*12)-(1+(this._mortgageInterestRate/12))**((seekingYear-this._yearPurchased)*12))/(((1+(this._mortgageInterestRate/12))**(this._mortgageYears*12))-1);
            }

            //Equity section-how much money the owner has as an asset in the home
            let equity;
            //If the house hasn't been purhcased yet, or has already been sold, equity is 0 (equity from a home sale will have already been transferred to a cash account or to another home)
            if(seekingYear>this._yearSold || seekingYear<=this._yearPurchased || this._renting==true){
                equity=0;
            }else {
                //If the home is owned in the seeking year, equity is calculated as the value of the home minus the above calculated remaining balance on the loan
                equity = growAgainstInflation(this._originalValue, seekingYear-this._yearPurchased, this._growthRate, rateDefaults.inflation)-remainingBalance;
            }
            //define object which is used to return all releavnt values for that home in the given year 
            const homeValueAtCertainYear = {monthlyPayment, annualCost, remainingBalance, equity};
            return homeValueAtCertainYear;
            }
        },    
        get number(){
            if(typeof this._number === 'number'){
                return this._number;
            } else {
                console.log(`Enter valid number for which house number this is`);
            }
        },
        set number (newNumber){
            if (typeof newNumber==='number' && newNumber>0 && newNumber > 100){
                this._number = newNumber;
            }else{
                console.log(`Enter valid number for which house number this is`);
            }
        },
        get yearPurchased(){
            if(typeof this._yearPurchased === 'number'){
                return this._yearPurchased;
            } else {
                console.log(`Enter valid year for the purchase year of the house`);
            }
        },
        set yearPurchased (newYear){
            if (typeof newYear==='number' && newYear>1900 && newYear < 3000){
                this._yearPurchased = newYear;
            }else{
                console.log(`Enter valid year for the purchase year of the house`);
            }
        },
        get yearSold(){
            if(typeof this._yearSold === 'number'){
                return this._yearSold;
            } else {
                console.log(`Enter valid year for the year the house was sold`);
            }
        },
        set yearSold (newYear){
            if (typeof newYear==='number' && newYear>=this._yearPurchased && newYear < 3000){
                this._yearSold = newYear;
            }else{
                console.log(`Enter valid year for the year the house was sold`);
            }
        },
        get originalValue(){
            if(typeof this._originalValue === 'number'){
                return this._originalValue;
            } else {
                console.log(`Enter valid number for the original value of the house`);
            }
        },
        set originalValue (newValue){
            if (typeof newValue==='number' && newValue<1 && newValue > -.5){
                this._originalValue = newValue;
            }else{
                console.log(`Enter valid number for the original value of the house`);
            }
        },
        get growthRate(){
            if(typeof this._growthRate === 'number'){
                return this._growthRate;
            } else {
                console.log(`Enter valid number for the original value of the house`);
            }
        },
        set growthRate (newGrowth){
            if (typeof newGrowth==='number' && newGrowth<1 && newGrowth > -.5){
                this._growthRate = newGrowth;
            }else{
                console.log(`Enter valid number for the original value of the house`);
            }
        },
        get mortgageInterestRate(){
            if(typeof this._mortgageInterestRate === 'number'){
                return this._mortgageInterestRate;
            } else {
                console.log(`Enter valid number for the original value of the house`);
            }
        },
        set mortgageInterestRate (newRate){
            if (typeof newRate==='number' && newRate<1 && newRate > 0){
                this._mortgageInterestRate = newRate;
            }else{
                console.log(`Enter valid number for the original value of the house`);
            }
        },
        get realEstateTaxRate(){
            if(typeof this._realEstateTaxRate === 'number'){
                return this._realEstateTaxRate;
            } else {
                console.log(`Enter valid number for the original value of the house`);
            }
        },
        set realEstateTaxRate (newTaxRate){
            if (typeof newTaxRate==='number' && newTaxRate<1 && newTaxRate > 0){
                this._realEstateTaxRate = newTaxRate;
            }else{
                console.log(`Enter valid number for the original value of the house`);
            }
        },
        get downPayment(){
            if(typeof this._downPayment === 'number'){
                return this._downPayment;
            } else {
                console.log(`Enter valid number for the down payment`);
            }
        },
        set downPayment (newDP){
            if (typeof newDP==='number' && newDP<1 && newDP > -.5){
                this._downPayment = newDP;
            }else{
                console.log(`Enter valid number for the down payment`);
            }
        },
        get mortgageYears(){
            if(typeof this._mortgageYears === 'number'){
                return this._mortgageYears;
            } else {
                console.log(`Enter valid number for length of the mortgage`);
            }
        },
        set mortgageYears (newYears){
            if (typeof newYears==='number' && newYears>0 && newYears <100){
                this._mortgageYears = newYears;
            }else{
                console.log(`Enter valid number for length of the mortgage`);
            }
        },
        get mortgagePayment(){
            if(typeof this._mortgagePayment === 'number'){
                return this._mortgagePayment;
            } else {
                console.log(`Error calculating mortgage payment`);
            }
        }                     
    }
};

//House progression is an array which contains all the homes to be owned, each home being an object defined above by home creator
let houseProgression = [];
//House purchase cash flow is an array of numbers which define years where homes are bought or sold, and what the cashs flow consequences are for those actions.  If a home is bought, maybe the DP is a negative cashflow
//out of some account.  If a home is bought and previous one is sold, there could be a net positive cash flow if the second downpayment is less than the equity in the previous home, etc.
//This array only has values during years where home purchase/selling activity takes place.  Each element has a year and a cash flow value in it
let housePurchaseCashFlow = [];

function insertHousingValues (){
    /* let numberOfHouses;
    let yearsPurchased=[];
    let originalValues=[];
    let fullTransfer=[];
    let downPayments=[];
    let HOA=[];
    let renting=[];
    let monthlyRent=[];
    numberOfHouses=parseInt(window.sessionStorage.getItem('NOH'), 10);
    
    for(let i=0; i<numberOfHouses; i++){
        yearsPurchased[i]=houseArray[i][0];
        originalValues[i]=houseArray[i][1];
        fullTransfer[i]=houseArray[i][2];
        downPayments[i]=houseArray[i][3]*houseArray[i][1];
        HOA[i]=houseArray[i][4];
        renting[i]=houseArray[i][5];
        monthlyRent[i]=houseArray[i][6];                
    }
    console.log(`House page NOH is ${numberOfHouses}`);
    console.log(`House page years purchased is ${yearsPurchased}`);
    console.log(`House page original values is ${originalValues}`);
    console.log(`House page full transfer y/n is ${fullTransfer}`);
    console.log(`House page down payments is ${downPayments}`);
    console.log(`House page HOA is ${HOA}`);
    console.log(`House page renting y/n is ${renting}`);
    console.log(`House page monthly rent is ${monthlyRent}`); */

    const houseArray = JSON.parse(window.sessionStorage.getItem('houseArray'));
    houseArray.push([2200]);
    window.sessionStorage.setItem('housingDistributed', 1);

    //For loop to run through all the houses defined by UI inputs and create a home object for each using the defined values
    //In general this would need to be extended to look at more variables-independent growth rates for each house, for example
    for (let j=0; j<(houseArray.length-1); j++){
        //Have to treat first house separately, as there is no chance of a "transfer", it has to just be purchased with a negative DP cashflow
        if(j===0){
            //Create the home with specified values, and add to house purchase cash flow array with year and DP value
            houseProgression[j]=homeCreator(j+1, houseArray[j][0], houseArray[j+1][0], houseArray[j][1], undefined, undefined, undefined, houseArray[j][3], undefined, houseArray[j][4], houseArray[j][5], houseArray[j][6]);
            if(!houseArray[j][5]){
                housePurchaseCashFlow[j]=[houseProgression[j].yearPurchased, -(houseProgression[j].downPayment*houseProgression[j].originalValue)];
            }else{
                housePurchaseCashFlow[j]=[houseArray[j][0], 0];
            }
        }else{
            //If full transfer is false, still create the home object but fill in cash flow array with the year purchased, and the difference between the previous homes equity in the sale year and the current homes downpayment
            //For year purchased, using yearsPurchased[i].  For year sold using [i+1] which means the assumption is that only one home is owned at at a time-limitation here
            if(!houseArray[j][2]){
                houseProgression[j]=homeCreator(j+1, houseArray[j][0], houseArray[j+1][0], houseArray[j][1], undefined, undefined, undefined, houseArray[j][3], undefined, houseArray[j][4], houseArray[j][5], houseArray[j][6]);
                if(!houseArray[j][5]){
                    //Pull relevant home values for previous house in the year that the new house is being purchased.  Equity + remaining balance gives the total value of the home in that year
                    const relevantValues=houseProgression[j-1].yearlyValues(houseArray[j][0]);
                    housePurchaseCashFlow[j]=[houseArray[j][0], ((relevantValues.equity-((relevantValues.equity+relevantValues.remainingBalance)*rateDefaults.brokerSellCommission))-houseProgression[j].downPayment)];
                }else{
                    housePurchaseCashFlow[j]=[houseArray[j][0], 0]; 
                }
                
            //If full transfer is true, have to set the downpayment value explicity by calculating the previous homes equity at in the year of sale.  Undefined parameters are just keeping the default value
            }else{
                const relevantValues=houseProgression[j-1].yearlyValues(houseArray[j][0]);
                houseProgression[j]=homeCreator(j+1, houseArray[j][0], houseArray[j+1][0], houseArray[j][1], undefined, undefined, undefined, 
                (relevantValues.equity-((relevantValues.equity+relevantValues.remainingBalance)*rateDefaults.brokerSellCommission)), undefined, houseArray[j][4], houseArray[j][5], houseArray[j][6]);
                //In this case, no effect to cash flow with full transfer=true
                housePurchaseCashFlow[j]=[houseArray[j][0], 0];
            }
        }
    }
    window.sessionStorage.setItem('housingConsumed', 1);
    console.log(`Time House page insert values at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);
}
window.addEventListener('load', insertHousingValues);
/* const insertHousingButton = document.getElementById("saveHousing");
insertHousingButton.addEventListener("click", insertHousingValues); */

//This function takes a year as a parameter and returns the annual cost of ownership for each home for that year.  This function is probably set up to support owning multiple homes at once, but the above for loop is not
const returnAnnualHousingCost = year =>{
    if (houseProgression.length==0){
        return 0;
    }
    const annualCostValues = [];
    //Create array of the annual cost of all homes in the system for that year
    houseProgression.forEach(home => {
        annualCostValues.push(home.yearlyValues(year).annualCost);
    })
    //then reduce above array to sum up all those annual cost values into one value, representing all home value ownership costs
    const annualCost = annualCostValues.reduce((previousValue, currentValue)=>{
        return previousValue + currentValue;
    })
    return annualCost;
}

function findHousePurchaseYearCashFlow(propValue) {
    let valueToReturn;
    for (let i=0; i < housePurchaseCashFlow.length; i++){
        if (housePurchaseCashFlow[i][0] === propValue){
            valueToReturn=housePurchaseCashFlow[i][1];
            }       
        }
    if(valueToReturn===undefined){
        return 0;
    }else{
        return valueToReturn;
    }
}

//Consolidate function to return annual housing cost, and cash flow array, to be exported and used in overall scheme to calculate life for each year 
const housingExports = {returnAnnualHousingCost, findHousePurchaseYearCashFlow}
module.exports = housingExports;