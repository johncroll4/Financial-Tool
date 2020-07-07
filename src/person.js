//const rateDefaults = require('./globaldefaults.js');
//Import basic functions object and extract grow against infaltion function for calculating future home values as the value grows over time
const basicFunctions = require('./basicfunctions.js');
const growAgainstInflation = basicFunctions.growAgainstInflation;
const taxImports = require('./taxes.js');
const calculateNetIncome = taxImports.calculateNetIncome;
const calculateAddlNetIncome = taxImports.calculateAddlNetIncome;
console.log(`Time Person page top part at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);

//person creator takes all the required variables related to a person and their earnings, and saves them as an object.  This is a factory function for person objects
//Only certain values have a getter and setter method, these are the ones used by retirement functions
//Important method is yearly salary
const personCreator = (_name='Person', _age=30, _startingSalary=100000, _salaryGrowth=.05, _salaryBumps=[], _salaryPlateau=[], _retirementYear, _preTaxContribution=0, _companyMatch=0) =>{
    return {
        //Name used to identify account owners for retirement
        _name,
        //age when app is being run, important for retirement/RMD considerations
        _age,
        _startingSalary,
        //Salary growth is not tied to default 5% growth of money-likely to vary widely across people
        _salaryGrowth,
        //Salary bumps are one time (one year) increases in salary meant to approximate promotion related income increases
        _salaryBumps: _salaryBumps,
        //salary plateau is a year after which salary growth slows, ceases, or reverses.  Has to be after all bumps
        _salaryPlateau,
        //Salary is set to 0 after retirement year-no partial retirement support, though could accomplish this with bump/plateau theoretically
        _retirementYear,
        //Only relevant if 401k account will be tied to this person.  If it doesn't apply, should be set to 0
        _preTaxContribution,
        _companyMatch,
        //With above information, can calculate estimated salary for this person for a given year
        yearlySalary(seekingYear){
            let newSalary = this._startingSalary;
            //console.log(`Initial newSalary is ${newSalary}`);
            //y is the current year that function is being called in (2020)
            const y = new Date().getFullYear();
            //First check if seeking year is before the current year, which wouldn't make much sense.  Return starting salary, which is always discounted by pre tax contribution rate (which could be 0 and therefore have no impact)
            if(seekingYear<y){
                //console.log(`Seeking year before current year code is being executed`);
                return newSalary*(1-this.preTaxContribution);
            //if seeking year is after retirement, salary is 0
            }else if(seekingYear>=this._retirementYear){
                newSalary=0;
                //console.log(`Seeking year after retirement year code is being executed`);
                return newSalary;
            //Check if there are salary bumps defined, and seeking year is after at least one of the bumps.  Or if plateau is defined, and seeking year is after plateau
            }else if ((this._salaryBumps.length>0 && seekingYear>=this._salaryBumps[0][0]) || (this._salaryPlateau.length>0 && seekingYear>=this._salaryPlateau[0])){
                //console.log(this._salaryBumps.length);
                //console.log(this._salaryPlateau.length);
                //Then check if seeking year is before plateau year (or there is no plateau)-therefore can only focus on salary bumps
                if(this._salaryPlateau.length===0 || seekingYear<this._salaryPlateau[0]){
                    //first grow salary using growth rate and number of years between seeking year and current year (standard)
                    newSalary = growAgainstInflation(newSalary, seekingYear-y, this._salaryGrowth);
                    //console.log(`Second newSalary is ${newSalary}`);
                    //relevant salary bumps are determined as the bumps which occur before the seeking year
                    const relevantSalaryBumps = this._salaryBumps.filter(bump => {
                        return bump[0] < seekingYear;                        
                    })
                    //Then use relevant salary bumps to increase salary accoringly.  Important to note that percentage increases commute so order of operation doesn't matter                
                    for(i=0; i<relevantSalaryBumps.length; i++){
                        newSalary = growAgainstInflation(newSalary, 1, relevantSalaryBumps[i][1]);                        
                        //console.log(`For loop with i = ${i}, newSalary is ${newSalary}`);
                    }
                    //console.log(`Salary bump return statement code is being executed`);
                    return newSalary*(1-this.preTaxContribution);
                //Now we are in the section where seeking year is after the salary plateau year
                }else{
                    //If there are nonzero number of salary bumps, first repeat above section to calculate the salary at the end of the pre-plateau period.  No need to use relevant bumps since all bumps will be relevant
                    if(this._salaryBumps.length>0){
                        newSalary = growAgainstInflation(newSalary, this._salaryPlateau[0]-y-1, this._salaryGrowth);
                        //console.log(`Plateau before For loop, newSalary is ${newSalary}`);
                        for(i=0; i<this._salaryBumps.length; i++){
                            newSalary = growAgainstInflation(newSalary, 1, this._salaryBumps[i][1]);                        
                            //console.log(`Plateau For loop with i = ${i}, newSalary is ${newSalary}`);
                        }
                        //then calculate salary growth in plateau period, using the relevant years and new salary growth value
                        newSalary = growAgainstInflation(newSalary, seekingYear+1-this._salaryPlateau[0], this._salaryPlateau[1]);
                        //console.log(`Plateau after For loop, newSalary is ${newSalary}`);
                        return newSalary*(1-this.preTaxContribution);
                    //If there were no salary bumps to begin with, calculate salary at beginning of plateau period, then salary within plateau period
                    }else{
                        newSalary = growAgainstInflation(newSalary, this._salaryPlateau[0]-y-1, this._salaryGrowth);
                        newSalary = growAgainstInflation(newSalary, seekingYear+1-this._salaryPlateau[0], this._salaryPlateau[1]);
                        //console.log(`Post plateau, no salary bumps code is being executed`);
                        return newSalary*(1-this.preTaxContribution); 
                    }
                }
            //if not, salary is calculated based on basic growth rate and number of years between first year and seeking year
            }else{
                newSalary = growAgainstInflation(this._startingSalary, seekingYear-y, this._salaryGrowth);
                //console.log(`no salary bumps code is being executed`);
                return newSalary*(1-this.preTaxContribution);
            }
        },
        get name(){
            if(typeof this._name === 'string'){
                return this._name;
            } else {
                console.log(`Enter valid name for this person (get)`);
            }
        },
        set name (newName){
            if (typeof newName==='string'){
                this._name = newName;
            }else{
                console.log(`Enter valid name for this person (set)`);
            }
        },
        //method to return person's age for a given year
        age(year){
            const y = new Date().getFullYear();
            if(year<y||year>2200){
                console.log(`Enter a valid year to return person's age`);
            }else{
                age = (year-y)+this._age;
                return age;
            }
        },
        get preTaxContribution(){
            if(typeof this._preTaxContribution === 'number'){
                return this._preTaxContribution;
            } else {
                console.log(`Enter valid pre tax contribution rate (get)`);
            }
        },
        set preTaxContribution (newRate){
            if (typeof newRate==='number' && newRate>=0 && rewRate<=.5){
                this._preTaxContribution = newRate;
            }else{
                console.log(`Enter valid pre tax contribution rate (set)`);
            }
        },
        get companyMatch(){
            if(typeof this._companyMatch === 'number'){
                return this._companyMatch;
            } else {
                console.log(`Enter valid company match contribution rate (get)`);
            }
        },
        set companyMatch (newRate){
            if (typeof newRate==='number' && newRate>=0 && rewRate<=.5){
                this._companyMatch = newRate;
            }else{
                console.log(`Enter valid company match contribution rate (set)`);
            }
        }
    }
};

//Household members is an array which contains the people invovled, each person being an object defined above by person creator
let householdMembers = [];

function insertPersonValues (){
    numberOfPeople=parseInt(window.sessionStorage.getItem('NOP'), 10);
    const personArray = JSON.parse(window.sessionStorage.getItem('personArray'));
    let names=[];
    let age=[];
    let startingSalary=[];
    let salaryGrowth=[];
    let salaryPlateau=[[],[]];
    let retirementYears=[];
    let preTax=[];
    let companyMatch=[];
    let salaryBumps=[[],[]];

    for(let i=0; i<numberOfPeople; i++){
        names[i]=personArray[i][0];
        age[i]=personArray[i][1];
        startingSalary[i]=personArray[i][2];
        salaryGrowth[i]=personArray[i][3];
        salaryPlateau[i][0]=personArray[i][4];
        salaryPlateau[i][1]=personArray[i][5];
        retirementYears[i]=personArray[i][6];
        preTax[i]=personArray[i][7];
        companyMatch[i]=personArray[i][8];                
    }
    
    console.log(`Person page array is ${personArray}`);
    console.log(`Person page NOP is ${numberOfPeople}`);
    console.log(`Person page names is ${names}`);
    console.log(`Person page ages are ${age}`);
    console.log(`Person page starting salaries are ${startingSalary}`);
    console.log(`Person page salary growth is ${salaryGrowth}`);
    console.log(`Person page salary plateaus is ${salaryPlateau}`);
    console.log(`Person page retirement years are ${retirementYears}`);
    console.log(`Person page pre tax are ${preTax}`);
    console.log(`Person page company match are ${companyMatch}`);
    
    const bumpArray = JSON.parse(window.sessionStorage.getItem('bumpArray'));
    salaryBumps=bumpArray;
    console.log(`Person page bump array is ${salaryBumps}`);
    window.sessionStorage.setItem('salaryDistributed', 1);
    //For loop to run through the people defined by UI inputs and create a person object for each using the defined values
    for (i=0; i<names.length; i++){
        householdMembers[i]=personCreator(names[i], age[i], startingSalary[i], salaryGrowth[i], salaryBumps[i], salaryPlateau[i], retirementYears[i], preTax[i], companyMatch[i]);
    }
    console.log(`Household members are ${householdMembers}`);
    window.sessionStorage.setItem('salaryConsumed', 1);
    console.log(`Time Person page values inserted at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);
}

window.addEventListener('load', insertPersonValues);
console.log(`Time Person page bottom at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);

const returnAnnualSalary = year =>{
    const annualSalaryValues = [];
    //Create array of the annual salary of all people in the household
    householdMembers.forEach(person => {
        annualSalaryValues.push(person.yearlySalary(year));
    })
    //then reduce above array to sum up all those annual salary values into one value, representing total salary
    const annualSalary = annualSalaryValues.reduce((previousValue, currentValue)=>{
        return previousValue + currentValue;
    })
    const salaryReturn = {annualSalaryValues, annualSalary};
    return salaryReturn;
}

const yearlyHouseSalary = year =>{
    const annualSalaryReturn = returnAnnualSalary(year);
    const totalSalary = annualSalaryReturn.annualSalary;
    const netSalary = calculateNetIncome(householdMembers.length, totalSalary);
    const salaryValues = annualSalaryReturn.annualSalaryValues;
    const salaryReturn = {salaryValues, netSalary}
    return salaryReturn;
}

//Consolidate function to return person creator function (which may not be necessary) and household members array, to be exported and used in overall scheme to calculate life for each year 
const personExports = {householdMembers, returnAnnualSalary, yearlyHouseSalary};
module.exports = personExports; 