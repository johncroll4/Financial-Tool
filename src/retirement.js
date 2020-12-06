//Import growth function for account growth calculations
const basicFunctions = require('./basicfunctions.js');
const growAgainstInflation = basicFunctions.growAgainstInflation;
//Import household members array to assign owners to accounts-especially relevant for 401k contribution information
const personImports = require('./person.js');
//const householdMembers = personImports.householdMembers;
const returnAnnualSalary = personImports.returnAnnualSalary;
const taxImports = require('./taxes.js');
const calculateNetIncome = taxImports.calculateNetIncome;
const calculateAddtlNetIncome = taxImports.calculateAddtlNetIncome;
const reverseTaxCalc=taxImports.reverseTaxCalc;

console.log(`??Time retirement page top at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);

//This find element index function is used to find the index number of a specific person (account owner) in the household members array.  Returns the index of that person in the array to be used later
function findElementIndex(arr, propValue) {
    for (var m=0; m < arr.length; m++){
        if (arr[m].name === propValue){
            return m;
        }       
    }     
}

//RMD factor is a function which returns the RMD factor for a given age.  These are set by the government
const rmdFactor = (age) => {
    //If age is less than 70, no RMDs.  Is actually 70.5
    if (age < 70){
        return 0;
    //RMDs past 115 are all the same
    }else if(age>=70 && age <=115){
        let factorIndex = age-70;
        //age values are excluded from the array, but they start at 70 and continue to 100, using index number in the array to loate
        const factors = [27.4, 26.5, 25.6, 24.7, 23.8, 22.9, 22, 21.2, 20.3, 19.5, 18.7, 17.9, 17.1, 16.3, 15.5, 
            14.8, 14.1, 13.4, 12.7, 12, 11.4, 10.8, 10.2, 9.6, 9.1, 8.6, 8.1, 7.6, 7.1, 6.7, 6.3, 5.9, 5.5, 5.2, 4.9, 4.5, 4.2, 3.9, 3.7, 3.4, 3.1, 2.9, 2.6, 2.4, 2.1, 1.9];
        let factor = factors[factorIndex];
        //only return the factor, which is used along with value of the account in that year to determin the RMD $ value
        return factor; 
    }else{
        return 1.9;
    }
}

//Parent class InvestmentAccount.  Accounts below inherit qualities from this class.  This class will probably not have any real instances of it, only instances of subclasses
//Lots of getters and setters defined for relevant values
class InvestmentAccount {
    constructor(name, currentValue=0, growth, owner, personArray, inflation) {
        //name probably not really relevant, can probably define account by class and owner
        this._name = name;
        this._currentValue=currentValue;
        //growth rate set to rate defaults value but can be changed in general based on type of account
        this._growth = growth;
        //Owner value is importand and must match personArray name values-need UI to mandate this
        this._owner = owner;
        //find owner index value within household members array for use below
        this._personArray=personArray;
        this._ownerIndex = findElementIndex(personArray, this.owner);
        this._inflation = inflation;
    }
    //Grow method just grows the account valuee for 1 year-to be used in yearly life calculations
    grow(){
        this.currentValue = growAgainstInflation(this.currentValue, 1, this.growth, this.inflation);
        }
    get name(){
        if(typeof this._name === 'string'){
            return this._name;
        } else {
            console.log(`Enter valid name for this investment account (get)`);
        }
    }
    set name (newName){
        if (typeof newName==='string'){
            this._name = newName;
        }else{
            console.log(`Enter valid name for this investment account (set)`);
        }
    }
    get currentValue(){
        if(typeof this._currentValue === 'number' && this._currentValue>=0){
            return this._currentValue;
        } else {
            console.log(`Enter valid current value for this investment account (get)`);
        }
    }
    set currentValue (newcurrentValue){
        if (typeof newcurrentValue==='number' && newcurrentValue>=0 && newcurrentValue < 1000000000){
            this._currentValue = newcurrentValue;
        }else{
            console.log(`Enter valid current value for this investment account (set)`);
        }
    }
    get growth(){
        if(typeof this._growth === 'number'){
            return this._growth;
        } else {
            console.log(`Enter valid growth rate for this investment account`);
        }
    }
    set growth (newgrowth){
        if (typeof newgrowth==='number' && newgrowth>0 && newgrowth<.5){
            this._growth = newgrowth;
        }else{
            console.log(`Enter valid growth rate for this investment account`);
        }
    }
    get owner(){
        if(typeof this._owner === 'string'){
            return this._owner;
        } else {
            console.log(`Enter valid owner for this investment account (get)`);
        }
    }
    set owner (newOwner){
        if (typeof newOwner==='string'){
            this._owner = newOwner;
        }else{
            console.log(`Enter valid owner for this investment account (set)`);
        }
    }
    get inflation(){
        if(typeof this._inflation === 'number'){
            return this._inflation;
        } else {
            console.log(`Enter valid inflation for this investment account (get)`);
        }
    }
    set inflation (newInflation){
        if (typeof newInflation==='number'){
            this._inflation = newInflation;
        }else{
            console.log(`Enter valid inflation for this investment account (set)`);
        }
    }
}

//RegInvestment is meant to be a non-tax advantaged account, just a regular investment account where money can come in and out with no restrictions on age/timing, etc.  No RMDs
class RegInvestment extends InvestmentAccount {
    //standard constructor, all the same values as parent class
    constructor(name, startingValue=0, growth, owner, personArray, inflation){
        super(name, startingValue, growth, owner, personArray, inflation);
    }
    //Change value method takes in an amount from a year of cash flow.  Positive means money is coming in to the account, negative means money is required from the account to balance cashflow
    //Need year parameter just for consistency with other account types
    addMoney(year, amount){
        //if amount is greater than zero, just need to add that amount to current value to increase the value and move on
        if(amount>=0){
            this.currentValue += amount;
            return 0;
        }else{
            console.log("Please enter a positive amount to call add money method");
        }
    }
    withdrawMoney(year, amount){
        amount=(-1*amount);
        let amountWithTax;
        if(this._personArray.length==1){
            if(amount<=40000){
                amountWithTax=amount;
            }else if(amount>40000 && amount<=441450){
                amountWithTax=(amount-40000)/.85 + 40000;
            }else if(amount>441450){
                amountWithTax=(amount-441450)/.8 + (441450-40000)/.85 + 40000;
            }else{
                console.log("Please enter a valid amount to call withdraw money method");
            }
            if(amountWithTax<0){
                console.log("Please enter a negative amount to call withdraw money method");
            }
            //if amount is negative, need to check if that amount is greater than the value of the account.  If so, set current value to 0 and return only the amount actually in the account to begin with
            else if(amountWithTax>=this.currentValue){
                let returnAmount = this.currentValue;
                this.currentValue=0;
                //below section reduces returned amount according to capital gains taxes on values over $40,000 or $441,450
                //account is still zeroed out, just less money is returned to balance cash flow
                if(returnAmount<=40000){
                    return returnAmount;
                }else if (returnAmount<=441450){
                    returnAmount -=(returnAmount-40000)*.15;
                    return returnAmount;
                }else{
                    returnAmount -= ((441450-40000)*.15 + ((returnAmount-441450)*.20));
                    return returnAmount;
                }
            //This section is for negative amounts (requests from the account) but not such that account value is zeroed out
            //Now for tax purposes, the amount deducted from account value is increased according to capital gains tax, but the returned amount is exactly what is "requested"
            }else {
                this.currentValue -= amountWithTax;
                return amount;
            }
        }else if(this._personArray.length==2){
            if(amount<=80000){
                amountWithTax=amount;
            }else if(amount>80000 && amount<=496600){
                amountWithTax=(amount-80000)/.85 + 80000;
            }else if(amount>496600){
                amountWithTax=(amount-496600)/.8 + (496600-80000)/.85 + 80000;
            }else{
                console.log("Please enter a valid amount to call withdraw money method");
            }
            if(amountWithTax<0){
                console.log("Please enter a negative amount to call withdraw money method");
            }
            //if amount is negative, need to check if that amount is greater than the value of the account.  If so, set current value to 0 and return only the amount actually in the account to begin with
            else if(amountWithTax>=this.currentValue){
                let returnAmount = this.currentValue;
                this.currentValue=0;
                //below section reduces returned amount according to capital gains taxes on values over $40,000 or $441,450
                //account is still zeroed out, just less money is returned to balance cash flow
                if(returnAmount<=80000){
                    return returnAmount;
                }else if (returnAmount<=496600){
                    returnAmount -= (returnAmount-80000)*.15;
                    return returnAmount;
                }else{
                    returnAmount -=((496600-80000)*.15 + ((returnAmount-496600)*.20));
                    return returnAmount;
                }
            //This section is for negative amounts (requests from the account) but not such that account value is zeroed out
            //Now for tax purposes, the amount deducted from account value is increased according to capital gains tax, but the returned amount is exactly what is "requested"
            }else {
                this.currentValue -= amountWithTax;
                return amount;
            }
        }
    }
}

class RothIRA extends InvestmentAccount {
    //standard constructor, all the same values as parent class
    constructor(name, startingValue=0, growth, owner, personArray, inflation){
        super(name, startingValue, growth, owner, personArray, inflation);
    }
    addMoney(year, amount){
        //first check if year is reasonable
        if(year<2020 || year>2200){
            console.log(`Please enter a valid year to add money to this account`);
        //check if amount if negative-shouldn't call addMoney with negative amount
        }else if(amount<0){
            console.log(`Can't call addMoney with negative amount of money`);
        //Roth IRA has a contribution cap of $6k per year in 2020.  Can't add more than that in a given year.  Cap grows over time but inflation adjustments should keep this cap pretty close to $6k
        }else if((this._personArray.length===1 && returnAnnualSalary(year, this._personArray, this.inflation).annualSalary>139000)|| (this._personArray.length===2 && returnAnnualSalary(year, this._personArray, this.inflation).annualSalary>206000)){
            return amount;
        }
        else if (amount>6000){
            this.currentValue+=6000;
            console.log(`Can't add more than $6,000 in one year to Roth IRA account`);
            return amount-6000;
        }else{
            this.currentValue+=amount;
            return 0;
        }
    }
    getRMD(year){
        const ownerAge = this._personArray[this._ownerIndex].age(year);
        let RMD=0;
        //first check if year is reasonable
        if(year<2020 || year>2200){
            console.log(`Please enter a valid year to return RMD info for this Roth account`);
        //Check if owner age is outside of RMD range
        }else if(ownerAge<70){
            return RMD;
        //If owner age within RMD range, subtract RMD from value of account and return RMD
        }else if (ownerAge>=70 && ownerAge<=200){
            RMD = this.currentValue/rmdFactor(ownerAge);
            this.currentValue-=RMD;
            return RMD;
        }else {
            console.log(`Something weird happened with RMD for this Roth account`);
        }
    }
    //Withdraw money method takes in an amount and year from a year of cash flow.  Should only be negative amount of money, meaning money is required from the account to balance cashflow
    withdrawMoney(year, amount){
        //Amount should be negative, otherwise use Add Money method
        if(amount<=0){        
            //If magnitude of amount is less than current value, can return full amount.  Sign is changed to indicate positive money is flowing to the bottom line
            if(-amount<this.currentValue){
                this.currentValue+=amount;
                return -amount;
                //If magnitue of amount is greater than the value of the account, set current value to 0 and return only the amount actually in the account to begin with.  No tax concerns with Roth
            }else if(-amount>=this.currentValue){
                let returnAmount = this.currentValue;
                this.currentValue=0;
                return returnAmount;
            }
        }else{
            console.log(`Can't use withdraw money method to add money`);
        }
    }
}

class F401k extends InvestmentAccount {
    //standard constructor but adding pretax contributiona and company match rates from househould members array to calculate annual growth
    constructor(name, startingValue=0, growth, owner, personArray, inflation){
        super(name, startingValue, growth, owner, personArray, inflation);
        this._preTaxContribution = personArray[this._ownerIndex].preTaxContribution;
        this._companyMatch = personArray[this._ownerIndex].companyMatch;
    }
    getRMD(year){
        const ownerAge = this._personArray[this._ownerIndex].age(year);
        let RMD=0;
        //first check if year is reasonable
        if(year<2020 || year>2200){
            console.log(`Please enter a valid year to return RMD info for this 401k account`);
        //Check if owner age is outside of RMD range
        }else if(ownerAge<70){
            return RMD;
        //If owner age within RMD range, subtract RMD from value of account and return RMD
        }else if (ownerAge>=70 && ownerAge<=200){
            RMD = this.currentValue/rmdFactor(ownerAge);
            this.currentValue-=RMD;
            return RMD;
        }else {
            console.log(`Something weird happened with RMD for this 401k account`);
        }
    }
    //Change value method takes in an amount and year from a year of cash flow.  Positive means money is coming in to the account (shouldn't happen for this account), negative means money is required from the account to balance cashflow
    increaseValue(year){
        //first check if year is reasonable
        if(year<2020 || year>2200){
            console.log(`Please enter a valid year to increase this 401k account value`);
        //now enter into meat of the method
        }else{
            //figure out salary for the owner of the account for the year in question--yearly salary method includes discount for pre tax contribution, which must be un-discounted here in this method
            const salary = this._personArray[this._ownerIndex].yearlySalary(year, this.inflation);
            //console.log(`salary is ${salary}`);
            //figure out how salary contributes to increase of account value.  In retirement, salary will be zero, so will value increase
            let valueIncrease = salary*(this._preTaxContribution+this._companyMatch)/(1-this._preTaxContribution);
            //console.log(`valueIncrease is ${valueIncrease}`);
            this.currentValue+=valueIncrease;
        }
    }
    withdrawMoney(year, amount){
        //remember amount is going to be negative for withdrawMoney
        const preTaxRequired=reverseTaxCalc(this._personArray.length, -amount, returnAnnualSalary(year, this._personArray, this.inflation).annualSalary);   
        if(year<2020 || year>2200){
            console.log(`Enter a valid year to withdraw money from this 401k account`);
        }else if (amount>0){
            console.log(`Can't use withdraw money method to add money to this 401k account`);
        }else{
            if(preTaxRequired<this.currentValue){
                //this won't be accurate if withdrawal is taking place before retirement, and there is income before this 401k withdrawal income
                this.currentValue-=preTaxRequired;
                return -amount;
            }
            //this won't be accurate if withdrawal is taking place before retirement, and there is income before this 401k withdrawal income               
            if(preTaxRequired>=this.currentValue){
                let returnAmount = calculateAddtlNetIncome(this._personArray.length, this.currentValue, returnAnnualSalary(year, this._personArray, this.inflation).annualSalary);
                this.currentValue=0;
                return returnAmount;
            }
        }
    }
}

const balanceYearOfCashFlow = (year, net, posList, negList) =>{
    if(year>2200 || year<2020){
        console.log(`Invalid year in balanceYearOfCashflow`);
        return net;
    }else if(net>0){
        for(let i=0; i<posList.length; i++){
            net = posList[i].addMoney(year, net);
            if(net===0){break;}
        }
        return net;
    }else if(net<0){
        for(let i=0; i<negList.length; i++){
            net = net + negList[i].withdrawMoney(year, net);
            if(net===0){break;}
        }
        return net;
    }else{
        console.log(`Net was exactly 0???`);
    }
}

const processRMDs = (year, net, personArray2, rothList, f401kList, inflation) =>{
    let rmd=0;
    if(year>2200 || year<2020){
        return 0;
    }else {
        rothList.forEach((element)=>{
            rmd+=element.getRMD(year);
        });
        f401kList.forEach((element)=>{
            rmd+=element.getRMD(year);
        })
        net += calculateAddtlNetIncome(personArray2.length, rmd, returnAnnualSalary(year, personArray2, inflation).annualSalary);
        return net;
    }
}

const growAccounts = (rothList, f401kList, regList) =>{
    rothList.forEach((element)=>{
        element.grow();
    });
    f401kList.forEach((element)=>{
        element.grow();
    });
    regList.forEach((element)=>{
        element.grow();
    });
}

const increase401ks = (year, f401kList) =>{
    f401kList.forEach((element)=>{
        element.increaseValue(year);
    });
}

const returnAccountValues = (rothList, f401kList, regList) =>{
    let regularValue=0;
    let retirementValue=0;
    rothList.forEach((element)=>{
        retirementValue+=element.currentValue;
    });
    f401kList.forEach((element)=>{
        retirementValue+=element.currentValue;
    });
    regList.forEach((element) =>{
        regularValue+=element.currentValue;
    });
    const returnValue={regularValue, retirementValue};
    return returnValue;
}

console.log(`Time retirement page bottom at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);

//export all account types
const retirementExports = {balanceYearOfCashFlow, processRMDs, growAccounts, increase401ks, returnAccountValues, RegInvestment, RothIRA, F401k, findElementIndex, rmdFactor};
module.exports = retirementExports;