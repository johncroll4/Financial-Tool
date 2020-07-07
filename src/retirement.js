//Import rate defaults and growth function for account growth calculations
const rateDefaults = require('./globaldefaults.js');
const basicFunctions = require('./basicfunctions.js');
const growAgainstInflation = basicFunctions.growAgainstInflation;
//Import household members array to assign owners to accounts-especially relevant for 401k contribution information
const personImports = require('./person.js');
const householdMembers = personImports.householdMembers;
const returnAnnualSalary = personImports.returnAnnualSalary;
const taxImports = require('./taxes.js');
const calculateNetIncome = taxImports.calculateNetIncome;
const calculateAddtlNetIncome = taxImports.calculateAddtlNetIncome;

console.log(`Time retirement page top at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);

let investmentAccounts=[];
let rothAccounts=[];
let f401kAccounts=[];
let allAccounts=[];
let sortedAccountsPos=[];
let sortedAccountsNeg=[];

function insertAccountValues (){
    const accountArray = JSON.parse(window.sessionStorage.getItem('accountArray'));
    
    window.sessionStorage.setItem('accountDistributed', 1);
      
    allAccounts=[];
    for (let m=0; m<accountArray.length; m++){
        if(accountArray[m][0]=="401k"){
            allAccounts[m]= [new F401k(accountArray[m][0]+(m+1), accountArray[m][2], undefined, accountArray[m][1]), accountArray[m][3], accountArray[m][4]];
        }else if(accountArray[m][0]=="Regular"){
            allAccounts[m]= [new RegInvestment(accountArray[m][0]+(m+1), accountArray[m][2], undefined, accountArray[m][1]), accountArray[m][3], accountArray[m][4]];
        }else if(accountArray[m][0]=="Roth"){
            allAccounts[m]= [new RothIRA(accountArray[m][0]+(m+1), accountArray[m][2], undefined, accountArray[m][1]), accountArray[m][3], accountArray[m][4]];            
        }else{
            console.log(`Something wrong with account type for account ${m} in account array`);
        }
    }
    console.log(`Retirement page all acounts list is ${JSON.stringify(allAccounts)}`);

    function returnFirstElements(array){
        const newArray=array.map(element =>{
            return element[0];
        })
        return newArray;
    }

    sortedAccountsPos=[];
    sortedAccountsNeg=[];
    sortedAccountsPos=allAccounts.sort(function(x,y){
        return x[1] - y[1];
    });
    sortedAccountsPos=sortedAccountsPos.filter(account=>{
        return !(account[0] instanceof F401k);
    });
    sortedAccountsPos=returnFirstElements(sortedAccountsPos);
    
    sortedAccountsNeg=allAccounts.sort(function(x,y){
        return x[2] - y[2];
    });
    sortedAccountsNeg=returnFirstElements(sortedAccountsNeg);

    investmentAccounts=[];
    rothAccounts=[];
    f401kAccounts=[];
    investmentAccounts=allAccounts.filter(account=>{
        return account[0] instanceof RegInvestment;
    });
    investmentAccounts=returnFirstElements(investmentAccounts);

    rothAccounts=allAccounts.filter(account=>{
        return account[0] instanceof RothIRA;
    });
    rothAccounts=returnFirstElements(rothAccounts);

    f401kAccounts=allAccounts.filter(account=>{
        return account[0] instanceof F401k;
    });
    f401kAccounts=returnFirstElements(f401kAccounts);

    console.log(`Retirement page sorted pos accounts list is ${JSON.stringify(sortedAccountsPos)}`);
    console.log(`Retirement page sorted neg accounts list is ${JSON.stringify(sortedAccountsNeg)}`);
    console.log(`Retirement page reg accounts2 list is ${JSON.stringify(investmentAccounts)}`);
    console.log(`Retirement page roth accounts2 list is ${JSON.stringify(rothAccounts)}`);
    console.log(`Retirement page 401k accounts2 list is ${JSON.stringify(f401kAccounts)}`);
    window.sessionStorage.setItem('accountConsumed', 1);
    console.log(`Time Retirement page insert values at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);
}
window.addEventListener('load', insertAccountValues);

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
    //RMDs technically go past 100 but this one stops at 100
    }else if(age>=70 && age <=100){
        let factorIndex = age-70;
        //age values are excluded from the array, but they start at 70 and continue to 100, using index number in the array to loate
        const factors = [27.4, 26.5, 25.6, 24.7, 23.8, 22.9, 22, 21.2, 20.4, 19.6, 18.8, 18, 17.2, 16.4, 15.6, 
            14.9, 14.2, 13.5, 12.8, 12.1, 11.5, 10.9, 10.3, 9.7, 9.1, 8.6, 8.1, 7.6, 7.1, 6.7, 6.3];
        let factor = factors[factorIndex];
        //only return the factor, which is used along with value of the account in that year to determin the RMD $ value
        return factor; 
    }else{
        console.log(`You are too old`);
        return 0;
    }
}

//Parent class InvestmentAccount.  Accoutns below inherit qualities from this class.  This class will probably not have any real instances of it, only instances of subclasses
//Lots of getters and setters defined for relevant values
class InvestmentAccount {
    constructor(name, currentValue=0, growth=rateDefaults.growth, owner) {
        //name probably not really relevant, can probably define account by class and owner
        this._name = name;
        this._currentValue=currentValue;
        //growth rate set to rate defaults value but can be changed in general based on type of account
        this._growth = growth;
        //Owner value is importand and must match householdmembers name values-need UI to mandate this
        this._owner = owner;
        //find owner index value within household members array for use below
        this._ownerIndex = findElementIndex(householdMembers, this.owner);
    }
    //Grow method just grows the account valuee for 1 year-to be used in yearly life calculations
    grow(){
        this.currentValue = growAgainstInflation(this.currentValue, 1, this.growth);
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
    get type(){
        if(typeof this._type === 'number'){
            return this._type;
        } else {
            console.log(`Enter valid type for this investment account`);
        }
    }
    set type (newtype){
        if (typeof newtype==='number' && newtype>0 && newtype<6){
            this._type = newtype;
        }else{
            console.log(`Enter valid type for this investment account`);
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
        if (typeof newowner==='string'){
            this._owner = newOwner;
        }else{
            console.log(`Enter valid owner for this investment account (set)`);
        }
    }
}

//RegInvestment is meant to be a non-tax advantaged account, just a regular investment account where money can come in and out with no restrictions on age/timing, etc.  No RMDs
class RegInvestment extends InvestmentAccount {
    //standard constructor, all the same values as parent class
    constructor(name, startingValue=0, growth=rateDefaults.growth, owner){
        super(name, startingValue, growth, owner);
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
        if(amount>0){
            console.log("Please enter a negative amount to call withdraw money method");
        }
        //if amount is negative, need to check if that amount is greater than the value of the account.  If so, set current value to 0 and return only the amount actually in the account to begin with
        else if(-amount>=this.currentValue){
            let returnAmount = this.currentValue;
            this.currentValue=0;
            //below section reduces returned amount according to capital gains taxes on values over $40,000 or $441,450
            //account is still zeroed out, just less money is returned to balance cash flow
            if(returnAmount<=40000){
                return returnAmount;
            }else if (returnAmount<=441450){
                returnAmount = 40000 + ((returnAmount-40000)/1.15);
                return returnAmount;
            }else{
                returnAmount = 40000 + ((441450-40000)/1.15) + ((returnAmount-441450)/1.20);
                return returnAmount;
            }
        //This section is for negative amounts (requests from the account) but not such that account value is zeroed out
        //Now for tax purposes, the amount deducted from account value is increased according to capital gains tax, but the returned amount is exactly what is "requested"
        }else if(-amount<=40000){
            this.currentValue += amount;
            return -amount;
        }else if(-amount<=441450){
            let decAmount = -40000 + 1.15*(amount+40000);
            this.currentValue += decAmount;
            return -amount;
        }else{
            let decAmount = -40000 + 1.15*(-441450+40000) + 1.2*(amount+441450);
            this.currentValue += decAmount;
            return -amount;
        }
    }
}

class RothIRA extends InvestmentAccount {
    //standard constructor, all the same values as parent class
    constructor(name, startingValue=0, growth=rateDefaults.growth, owner){
        super(name, startingValue, growth, owner);
    }
    addMoney(year, amount){
        //first check if year is reasonable
        if(year<2020 || year>2200){
            console.log(`Please enter a valid year to add money to this account`);
        //check if amount if negative-shouldn't call addMoney with negative amount
        }else if(amount<0){
            console.log(`Can't call addMoney with negative amount of money`);
        //Roth IRA has a contribution cap of $6k per year in 2020.  Can't add more than that in a given year.  Cap grows over time but inflation adjustments should keep this cap pretty close to $6k
        }else if((householdMembers.length===1 && returnAnnualSalary(year)>139000)|| (householdMembers.length===2 && returnAnnualSalary(year)>206000)){
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
        const ownerAge = householdMembers[this._ownerIndex].age(year);
        let RMD=0;
        //first check if year is reasonable
        if(year<2020 || year>2200){
            console.log(`Please enter a valid year to return RMD info for this Roth account`);
        //Check if owner age is outside of RMD range
        }else if(ownerAge<70 || ownerAge>100){
            return RMD;
        //If owner age within RMD range, subtract RMD from value of account and return RMD
        }else if (ownerAge>=70 && ownerAge<=100){
            RMD = this.currentValue/rmdFactor(ownerAge);
            console.log(`Roth RMD is ${RMD}`);
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
                console.log(`amount less than current value section, currentValue is ${this.currentValue}`);
                return -amount;
                //If magnitue of amount is greater than the value of the account, set current value to 0 and return only the amount actually in the account to begin with.  No tax concerns with Roth
            }else if(-amount>=this.currentValue){
                let returnAmount = this.currentValue;
                this.currentValue=0;
                console.log(`amount greater than current value section, currentValue is ${this.currentValue}`);
                return returnAmount;
            }
        }else{
            console.log(`Can't use withdraw money method to add money`);
        }
    }
}

class F401k extends InvestmentAccount {
    //standard constructor but adding pretax contributiona and company match rates from househould members array to calculate annual growth
    constructor(name, startingValue=0, growth=rateDefaults.growth, owner){
        super(name, startingValue, growth, owner);
        this._preTaxContribution = householdMembers[this._ownerIndex].preTaxContribution;
        this._companyMatch = householdMembers[this._ownerIndex].companyMatch;
    }
    getRMD(year){
        const ownerAge = householdMembers[this._ownerIndex].age(year);
        let RMD=0;
        //first check if year is reasonable
        if(year<2020 || year>2200){
            console.log(`Please enter a valid year to return RMD info for this 401k account`);
        //Check if owner age is outside of RMD range
        }else if(ownerAge<70 || ownerAge>100){
            return RMD;
        //If owner age within RMD range, subtract RMD from value of account and return RMD
        }else if (ownerAge>=70 && ownerAge<=100){
            RMD = this.currentValue/rmdFactor(ownerAge);
            console.log(`401k RMD is ${RMD}`);
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
            //figure out salary for the owner of the account for the year in question
            const salary = householdMembers[this._ownerIndex].yearlySalary(year);
            //console.log(`salary is ${salary}`);
            //figure out how salary contributes to increase of account value.  In retirement, salary will be zero, so will value increase
            let valueIncrease = salary*(this._preTaxContribution+this._companyMatch);
            //console.log(`valueIncrease is ${valueIncrease}`);
            console.log(`401k account starting currentValue is ${this.currentValue}`);
            this.currentValue+=valueIncrease;
            console.log(`401k account after currentValue is ${this.currentValue}`);
        }
    }
    withdrawMoney(year, amount){
        //remember amount is going to be negative for withdrawMoney
        const amountWithTax = (2*amount) + (calculateAddtlNetIncome(householdMembers.length, -amount, returnAnnualSalary(year).annualSalary));   
        if (amount>0){
            console.log(`Can't use withdraw money method to add money`);
        }else{
            if(-amountWithTax<this.currentValue){
                this.currentValue+=amountWithTax;
                console.log(`amount less than current value section, currentValue is ${this.currentValue}`);
                return -amount;
            }               
            if(-amountWithTax>=this.currentValue){
                let returnAmount = calculateAddtlNetIncome(householdMembers.length, this.currentValue, returnAnnualSalary(year).annualSalary);
                this.currentValue=0;
                console.log(`amount greater than current value section, currentValue is ${this.currentValue}`);
                return returnAmount;
            }
        }
    }
}

const balanceYearOfCashFlow = (year, net) =>{
    console.log(`Initial net is ${net}`);
    if(net>0){
        for(let i=0; i<sortedAccountsPos.length; i++){
            net = sortedAccountsPos[i].addMoney(year, net);
            console.log(`Positive section, Post net is ${net}`);
            console.log(sortedAccountsPos[i]);
            if(net===0){break;}
        }
        return net;
    }else if(net<0){
        for(let i=0; i<sortedAccountsNeg.length; i++){
            net = net + sortedAccountsNeg[i].withdrawMoney(year, net);
            console.log(`Negative section, Post net is ${net}`);
            console.log(sortedAccountsNeg[i]);
            if(net===0){break;}
        }
        return net;
    }else{
        console.log(`Net was exactly 0???`);
    }
}

const processRMDs = (year, net) =>{
    let rmd=0;
    for(let i=0; i<rothAccounts.length; i++){
        rmd = rmd + rothAccounts[i].getRMD(year);
        console.log(`RMD roth is ${rmd}`);
    }
    for(let i=0; i<f401kAccounts.length; i++){
        rmd = rmd + f401kAccounts[i].getRMD(year);
        console.log(`RMD 401k is ${rmd}`);
    }
    net = net + calculateAddtlNetIncome(householdMembers.length, rmd, returnAnnualSalary(year).annualSalary);
    return net;
}

const growAccounts = () =>{
    for(let i=0; i<rothAccounts.length; i++){
        rothAccounts[i].grow();
    }
    for(let i=0; i<f401kAccounts.length; i++){
        f401kAccounts[i].grow();
    }
    for(let i=0; i<investmentAccounts.length; i++){
        investmentAccounts[i].grow();
    }
    console.log(rothAccounts);
    console.log(f401kAccounts);
    console.log(investmentAccounts);
}

const increase401ks = year =>{
    if(f401kAccounts.length>0){
        for(let i=0; i<f401kAccounts.length; i++){
            f401kAccounts[i].increaseValue(year);
        }
    }else{
        console.log(`No 401k accounts`);
    }
}

const returnAccountValues = () =>{
    let regularValue=0;
    let retirementValue=0;
    investmentAccounts.forEach((element) =>{
        regularValue+=element.currentValue;
    });
    rothAccounts.forEach((element)=>{
        retirementValue+=element.currentValue;
    });
    f401kAccounts.forEach((element)=>{
        retirementValue+=element.currentValue;
    });
    const returnValue={regularValue, retirementValue};
    return returnValue;
}

console.log(`Time retirement page bottom at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);

//export all account types
const retirementExports = {balanceYearOfCashFlow, processRMDs, growAccounts, increase401ks, insertAccountValues, returnAccountValues};
module.exports = retirementExports;