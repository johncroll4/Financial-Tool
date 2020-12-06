
//Import basic functions object and extract grow against infaltion function for calculating future home values as the value grows over time
const basicFunctions = require('./basicfunctions.js');
const growAgainstInflation = basicFunctions.growAgainstInflation;
const calcMonthlyLoanPayment = basicFunctions.calcMonthlyLoanPayment;

//home creator takes all the required variables related to a home purchase and saves them as an object.  This is a factory function for home objects
//Every value has a getter and setter method, though most of them are probably not necessary
//Important method is yearly values
const homeCreator = (_number, _yearPurchased, _yearSold, _originalValue, _growthRate, _mortgageInterestRate,
    _realEstateTaxRate, _downPayment=.2, _mortgageYears, _HOA=0, _renting=false, _monthlyRent=0) =>{
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
        yearlyValues (seekingYear=this._yearPurchased, inflation) {
            //start by making sure the year being passed to method is reasonable
            if(seekingYear>2100 || seekingYear < 1950){
                console.log("Please enter a valid year to return relevant home values");
                return 0;
            }else if(inflation==undefined){
                console.log("Please enter an inflation rate");
                return 0;
            }
            //Then calculate the monthly payment of the loan based on outstanding principle, interest rate, length of mortgage, etc.  Standard loan calculator formula
            //This payment is monthly which is one of the only values in the app which refers to a montly value-hence the *12 and /12 in the formula
            let monthlyPayment;
            if(seekingYear>=this._yearSold || seekingYear<this._yearPurchased){
                monthlyPayment=0;
            }
            else if(this._renting==false){
                monthlyPayment = calcMonthlyLoanPayment(this._originalValue*(1-this._downPayment), this._mortgageInterestRate, this._mortgageYears);
            }else if(this._renting==true){
                monthlyPayment=this._monthlyRent;
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
                annualCost = ((growAgainstInflation(this._originalValue, seekingYear-this._yearPurchased, this._growthRate, inflation)*this._realEstateTaxRate))+(this._HOA*12);
            }//Now we are in the "normal" range when the house is actually owned and not yet paid off
            else{
                //annual cost is the constant monthly payment*12 + the growing value of the home times the real estate tax rate
                annualCost= (monthlyPayment*12)+(growAgainstInflation(this._originalValue, seekingYear-this._yearPurchased, this._growthRate, inflation)*this._realEstateTaxRate)+(this._HOA*12);
            }
            //Remaining balance on the loan section
            let remainingBalance;
            //If the seeking year is before the house is purchased, after it is sold, or after the loan is fully paid off, remaining balance is 0
            if(seekingYear>=this._yearPurchased+this._mortgageYears || seekingYear>this._yearSold || seekingYear<this._yearPurchased || this._renting==true){
                remainingBalance = 0;
            }else{
                //If not, remaining balance is calculated by another, related loan calculator formula using loan starting value, length, and interest rate
                remainingBalance = (this._originalValue*(1-this._downPayment))*((1+(this._mortgageInterestRate/12))**(this._mortgageYears*12)-(1+(this._mortgageInterestRate/12))**((seekingYear-this._yearPurchased)*12))/(((1+(this._mortgageInterestRate/12))**(this._mortgageYears*12))-1);
            }

            //Equity section-how much money the owner has as an asset in the home
            let equity;
            //If the house hasn't been purhcased yet, or has already been sold, equity is 0 (equity from a home sale will have already been transferred to a cash account or to another home)
            if(seekingYear>this._yearSold || seekingYear<this._yearPurchased || this._renting==true){
                equity=0;
            }else {
                //If the home is owned in the seeking year, equity is calculated as the value of the home minus the above calculated remaining balance on the loan
                equity = growAgainstInflation(this._originalValue, seekingYear-this._yearPurchased, this._growthRate, inflation)-remainingBalance;
            }
            //define object which is used to return all releavnt values for that home in the given year 
            const homeValueAtCertainYear = {monthlyPayment, annualCost, remainingBalance, equity};
            return homeValueAtCertainYear;
        },    
        get number(){
            if(typeof this._number === 'number'){
                return this._number;
            } else {
                console.log(`Enter valid number for which house number this is`);
            }
        },
        set number (newNumber){
            if (typeof newNumber==='number' && newNumber>0 && newNumber < 100){
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
            if (typeof newValue==='number' && newValue>0 && newValue < 1000000000){
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
            if (typeof newDP==='number' && newDP<1 && newDP > 0){
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
            if(typeof this._originalValue === 'number'){
                return calcMonthlyLoanPayment(this._originalValue*(1-this._downPayment), this._mortgageInterestRate, this._mortgageYears);
            } else {
                console.log(`Error calculating mortgage payment`);
            }
        },
        get renting(){
            if(typeof this._renting === 'boolean'){
                return this._renting;
            } else {
                console.log(`Problem with renting flag`);
            }
        }                     
    }
};

//This function takes a year as a parameter and returns the annual cost of ownership for each home for that year.  This function is probably set up to support owning multiple homes at once, but the above for loop is not
const returnAnnualHousingCost = (year, houseList, inflation) =>{
    if (houseList.length==0){
        return 0;
    }
    const annualCostValues = [];
    //Create array of the annual cost of all homes in the system for that year
    houseList.forEach(home => {
        annualCostValues.push(home.yearlyValues(year, inflation).annualCost);
    })
    //then reduce above array to sum up all those annual cost values into one value, representing all home value ownership costs
    const annualCost = annualCostValues.reduce((previousValue, currentValue)=>{
        return previousValue + currentValue;
    })
    return annualCost;
}

function findHousePurchaseYearCashFlow (year, houseList, inflation, commission){
    if (houseList.length==0){
        return 0;
    }
    let cashflow=0;
    houseList.forEach(home=>{
        if(home.yearPurchased===year){
            if(home.renting===false){
                cashflow-=home.originalValue*home.downPayment;
            }
        }else if(home.yearSold===year){
            const relevantValues=home.yearlyValues(year, inflation);
            cashflow+=relevantValues.equity-((relevantValues.equity+relevantValues.remainingBalance)*commission);
        }
    })
    return cashflow;
}

//Consolidate function to return annual housing cost, and cash flow array, to be exported and used in overall scheme to calculate life for each year 
const housingExports = {returnAnnualHousingCost, findHousePurchaseYearCashFlow, homeCreator}
module.exports = housingExports;