console.log(`?? Time Calculate js page top part at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);

const basicFunctions = require('./basicfunctions.js');
const numberFormatter = basicFunctions.numberFormatter;
const regSpending = require('./regularcost.js');
const housingImports = require('./homecalcs.js');
const returnAnnualHousingCost = housingImports.returnAnnualHousingCost;
const findHousePurchaseYearCashFlow = housingImports.findHousePurchaseYearCashFlow;
const homeCreator = housingImports.homeCreator;
const kidImports = require('./kiddos.js');
const returnAnnualKidCost = kidImports.returnAnnualKidCost;
const kidCreator = kidImports.kidCreator;
const personImports = require('./person.js');
const yearlyHouseSalary = personImports.yearlyHouseSalary;
const personCreator = personImports.personCreator;
const retirementImports = require('./retirement.js');
const balanceYearOfCashFlow = retirementImports.balanceYearOfCashFlow;
const processRMDs = retirementImports.processRMDs;
const growAccounts = retirementImports.growAccounts;
const increase401ks = retirementImports.increase401ks;
const returnAccountValues = retirementImports.returnAccountValues;
const RegInvestment = retirementImports.RegInvestment;
const RothIRA = retirementImports.RothIRA;
const F401k = retirementImports.F401k;
const loanImports = require('./loan.js');
const returnAnnualLoanCost = loanImports.returnAnnualLoanCost;
const loanCreator = loanImports.loanCreator;

//default rate values pulled from session storage, saved to object rateDefaults
const rateDefaults = {
    //growth is used as the default value for the annual growth of money in any year.  The value is considered without considering inflation, whihc is separately deducted 
    _growth: .05,
    //inflation rate is used to deduct against regular growth to keep all income/money value in today's dollars.  Income is discounted while costs are not and remain in 2020 dollars
    _inflation: .02,
    //real estate tax rate is used to determine total cost of homeownership-realEstateTax*home value.
    _realEstateTax: .02,
    //This is the default length of a home loan and can be changed for any specific home/loan
    _mortgageYears: 30,
    //This is the default interest rate of a home loan and can be changed for any specific home/loan
    _mortgageInterest: .035,
    //This is the assumed rate of annual home value growth.  This value does not account for inflation, but inflation is discounted when this value is used in any formula
    _homeValueGrowth: .03,
    _brokerSellCommission: .06,
    get growth() {
        if(typeof this._growth === 'number'){
            return this._growth;
        } else {
            console.log(`Enter valid number for growth rate GET`);
        }
    },
    get inflation() {
        if(typeof this._inflation === 'number'){
            return this._inflation;
        } else {
            console.log(`Enter valid number for inflation rate`);
        }
    },
    get realEstateTax() {
        if(typeof this._realEstateTax === 'number'){
            return this._realEstateTax;
        } else {
            console.log(`Enter valid number for real estate tax rate`);
        }
    },
    get mortgageYears() {
        if(typeof this._mortgageYears === 'number'){
            return this._mortgageYears;
        } else {
            console.log(`Enter valid number for years of mortgage`);
        }
    },
    get mortgageInterest() {
        if(typeof this._mortgageInterest === 'number'){
            return this._mortgageInterest;
        } else {
            console.log(`Enter valid number for mortgage interest rate`);
        }
    },
    get homeValueGrowth() {
        if(typeof this._homeValueGrowth === 'number'){
            return this._homeValueGrowth;
        } else {
            console.log(`Enter valid number for home value growth rate`);
        }
    },
    get brokerSellCommission() {
        if(typeof this._brokerSellCommission === 'number'){
            return this._brokerSellCommission;
        } else {
            console.log(`Enter valid number for broker commision for house sale`);
        }
    },
    set growth(newGrowth){
        if (typeof newGrowth==='number' && newGrowth<1 && newGrowth > -.5){
            this._growth = newGrowth;
        }else{
            console.log(`Enter valid number for growth rate SET`);
        }
    },
    set inflation(newInflation){
        if (typeof newInflation==='number' && newInflation<1 && newInflation > -.5){
            this._inflation = newInflation;
        }else{
            console.log(`Enter valid number for inflation rate`);
        }
    },
    set realEstateTax(newRealEstateTax){
        if (typeof newRealEstateTax==='number' && newRealEstateTax<1 && newRealEstateTax > 0){
            this._realEstateTax = newRealEstateTax;
        }else{
            console.log(`Enter valid number for real estate tax rate`);
        }
    },
    set mortgageYears(newMortgageYears){
        if (typeof newMortgageYears==='number' && newMortgageYears<100 && newMortgageYears > 0){
            this._mortgageYears = newMortgageYears;
        }else{
            console.log(`Enter valid number for years of mortgage`);
        }
    },
    set mortgageInterest(newMortgageInterest){
        if (typeof newMortgageInterest==='number' && newMortgageInterest<1 && newMortgageInterest > 0){
            this._mortgageInterest = newMortgageInterest;
        }else{
            console.log(`Enter valid number for mortgage interest rate`);
        }
    },
    set homeValueGrowth(newHomeValueGrowth){
        if (typeof newHomeValueGrowth==='number' && newHomeValueGrowth<1 && newHomeValueGrowth > -.5){
            this._homeValueGrowth = newHomeValueGrowth;
        }else{
            console.log(`Enter valid number for home value growth rate`);
        }
    },
    set brokerSellCommission(newbrokerSellCommission){
        if (typeof newbrokerSellCommission==='number' && newbrokerSellCommission<1 && newbrokerSellCommission >=0){
            this._brokerSellCommission = newbrokerSellCommission;
        }else{
            console.log(`Enter valid number for broker commision for house sale`);
        }
    }
}
function insertDefaultValues (){
    rateDefaults.growth=parseFloat(window.sessionStorage.getItem('growthRate'),10);
    console.log(`global defaults growth rate is now ${rateDefaults.growth}`);
    rateDefaults.inflation=parseFloat(window.sessionStorage.getItem('inflation'),10);
    console.log(`global defaults inflation rate is now ${rateDefaults.inflation}`);
    rateDefaults.realEstateTax=parseFloat(window.sessionStorage.getItem('propertyTax'),10);
    console.log(`global defaults property tax rate is now ${rateDefaults.realEstateTax}`);
    rateDefaults.mortgageYears=parseInt(window.sessionStorage.getItem('mortgageLength'),10);
    console.log(`global defaults mortage length is now ${rateDefaults.mortgageYears}`);
    rateDefaults.mortgageInterest=parseFloat(window.sessionStorage.getItem('mortgageRate'),10);
    console.log(`global defaults mortgage rate is now ${rateDefaults.mortgageInterest}`);
    rateDefaults.homeValueGrowth=parseFloat(window.sessionStorage.getItem('homeGrowth'),10);
    console.log(`global defaults home value growth rate is now ${rateDefaults.homeValueGrowth}`);
    rateDefaults.brokerSellCommission=parseFloat(window.sessionStorage.getItem('broker'),10);
    console.log(`global defaults broker commission is now ${rateDefaults.brokerSellCommission}`);
    window.sessionStorage.setItem('defaultConsumed', 1);
    insertCostValues();
    console.log(`Time Default page insert values at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);
}

//Cost/Spending Values pulled from session storage, saved to variables
let monthlySpending;
let monthlyRetirementSpending;
function insertCostValues (){
    monthlySpending=parseInt(window.sessionStorage.getItem('spend'), 10);
       monthlyRetirementSpending=parseInt(window.sessionStorage.getItem('retir'), 10);
    console.log(`Cost section monthly spending is ${monthlySpending}`);
    console.log(`Cost section retirement is ${monthlyRetirementSpending}`);
    insertPersonValues();
    console.log(`Time Cost section values inserted at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);
    window.sessionStorage.setItem('regCostConsumed', 1);
}
//end cost/spending section

//Person values pulled from session storage, saved to househould members array of person objects
let householdMembers = [];
function insertPersonValues (){
    const numberOfPeople=parseInt(window.sessionStorage.getItem('NOP'), 10);
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
    console.log(`Person section array is ${personArray}`);
    console.log(`Person section NOP is ${numberOfPeople}`);
    console.log(`Person section names is ${names}`);
    console.log(`Person section ages are ${age}`);
    console.log(`Person section starting salaries are ${startingSalary}`);
    console.log(`Person section salary growth is ${salaryGrowth}`);
    console.log(`Person section salary plateaus is ${salaryPlateau}`);
    console.log(`Person section retirement years are ${retirementYears}`);
    console.log(`Person section pre tax are ${preTax}`);
    console.log(`Person section company match are ${companyMatch}`);
    
    const bumpArray = JSON.parse(window.sessionStorage.getItem('bumpArray'));
    salaryBumps=bumpArray;
    console.log(`Person section bump array is ${salaryBumps}`);
    //For loop to run through the people defined by UI inputs and create a person object for each using the defined values
    for (let i=0; i<names.length; i++){
        householdMembers[i]=personCreator(names[i], age[i], startingSalary[i], salaryGrowth[i], salaryBumps[i], salaryPlateau[i], retirementYears[i], preTax[i], companyMatch[i]);
    }
    console.log(`Household members are ${householdMembers}`);
    window.sessionStorage.setItem('salaryConsumed', 1);
    insertAccountValues();
    console.log(`Time Person section values inserted at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);
}
//End person values section

//Retirement/investment account section, pulling from session storage and creating accounts
let investmentAccounts=[];
let rothAccounts=[];
let f401kAccounts=[];
let allAccounts=[];
let sortedAccountsPos=[];
let sortedAccountsNeg=[];

function insertAccountValues (){
    const accountArray = JSON.parse(window.sessionStorage.getItem('accountArray'));
    allAccounts=[];
    for (let m=0; m<accountArray.length; m++){
        if(accountArray[m][0]=="401k"){
            allAccounts[m]= [new F401k(accountArray[m][0]+(m+1), accountArray[m][2], undefined, accountArray[m][1], householdMembers), (m+1)*100, (m+1)*100];
        }else if(accountArray[m][0]=="Regular"){
            allAccounts[m]= [new RegInvestment(accountArray[m][0]+(m+1), accountArray[m][2], undefined, accountArray[m][1], householdMembers), (m+1)*10, m+1];
        }else if(accountArray[m][0]=="Roth"){
            allAccounts[m]= [new RothIRA(accountArray[m][0]+(m+1), accountArray[m][2], undefined, accountArray[m][1], householdMembers), m+1, (m+1)*10];
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
    console.log(`Retirement section sorted pos accounts list is ${JSON.stringify(sortedAccountsPos)}`);
    console.log(`Retirement section sorted neg accounts list is ${JSON.stringify(sortedAccountsNeg)}`);
    console.log(`Retirement section reg accounts2 list is ${JSON.stringify(investmentAccounts)}`);
    console.log(`Retirement section roth accounts2 list is ${JSON.stringify(rothAccounts)}`);
    console.log(`Retirement section 401k accounts2 list is ${JSON.stringify(f401kAccounts)}`);
    window.sessionStorage.setItem('accountConsumed', 1);
    insertLoanValues();
    console.log(`Time Retirement section insert values at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);
}
//End retirement/investment account section

//Loan input value section
const loans=[];
function insertLoanValues (){
    const numberOfLoans=parseInt(window.sessionStorage.getItem('NOL'), 10);
    const loanArray = JSON.parse(window.sessionStorage.getItem('loanArray'));
    console.log(`Loan page NOL is ${numberOfLoans}`);   
    
    for (let i=0; i<numberOfLoans; i++){
        loans[i]=loanCreator(i+1, loanArray[i][0], loanArray[i][1], loanArray[i][2], loanArray[i][3], loanArray[i][4]);
    }
    console.log(`Loan page loan list is ${JSON.stringify(loans)}`);
    window.sessionStorage.setItem('loanConsumed', 1);
    insertKidValues();
}
//End loan section

//Kid cost input value section
const kiddos = [];
let monthlyCost;
function insertKidValues (){
    let numberOfKids=parseInt(window.sessionStorage.getItem('NOK'), 10);
    const kidArray = JSON.parse(window.sessionStorage.getItem('kidArray'));
    kidArray.forEach((kid, index)=>{
        kiddos[index]=kidCreator(undefined, kid[0], kid[1], kid[2])
    });
    console.log(`Kid page NOK is ${numberOfKids}`);
    monthlyCost=parseInt(window.sessionStorage.getItem('monthlyKid'), 10);
    console.log(`Kid page monthly cost is ${monthlyCost}`);
    //dayCareMonthly=parseInt(window.sessionStorage.getItem('dayCare'), 10);
    console.log(`Kid page kid arry is ${JSON.stringify(kidArray)}`);
    window.sessionStorage.setItem('kidCostConsumed', 1);
    insertHousingValues();
    console.log(`Time kid page values inserted at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);
}
//End kid cost section

//House section pull input values from session storage and save them
const houseProgression = [];
//House purchase cash flow is an array of numbers which define years where homes are bought or sold, and what the cashs flow consequences are for those actions.  If a home is bought, maybe the DP is a negative cashflow
//out of some account.  If a home is bought and previous one is sold, there could be a net positive cash flow if the second downpayment is less than the equity in the previous home, etc.
//This array only has values during years where home purchase/selling activity takes place.  Each element has a year and a cash flow value in it
//const housePurchaseCashFlow = [];

function insertHousingValues (){
    const houseArray = JSON.parse(window.sessionStorage.getItem('houseArray'));
    houseArray.push([2200]);

    //For loop to run through all the houses defined by UI inputs and create a home object for each using the defined values
    //In general this would need to be extended to look at more variables-independent growth rates for each house, for example
    for (let j=0; j<(houseArray.length-1); j++){
        //If full transfer is false, still create the home object but fill in cash flow array with the year purchased, and the difference between the previous homes equity in the sale year and the current homes downpayment
        //For year purchased, using yearsPurchased[i].  For year sold using [i+1] which means the assumption is that only one home is owned at at a time-limitation here
        if(!houseArray[j][2]){
            houseProgression[j]=homeCreator(j+1, houseArray[j][0], houseArray[j+1][0], houseArray[j][1], rateDefaults.homeValueGrowth, rateDefaults.mortgageInterest, rateDefaults.realEstateTax, houseArray[j][3], rateDefaults.mortgageYears, houseArray[j][4], houseArray[j][5], houseArray[j][6]);
        //If full transfer is true, have to set the downpayment value explicity by calculating the previous homes equity at in the year of sale
        }else{
            const relevantValues=houseProgression[j-1].yearlyValues(houseArray[j][0], rateDefaults.inflation);
            houseProgression[j]=homeCreator(j+1, houseArray[j][0], houseArray[j+1][0], houseArray[j][1], rateDefaults.homeValueGrowth, rateDefaults.mortgageInterest, rateDefaults.realEstateTax, 
            ((relevantValues.equity-((relevantValues.equity+relevantValues.remainingBalance)*rateDefaults.brokerSellCommission))/houseArray[j][1]), rateDefaults.mortgageInterest, rateDefaults.realEstateTax, houseArray[j][3], rateDefaults.mortgageYears, houseArray[j][4], houseArray[j][5], houseArray[j][6]);
        }
    }
    window.sessionStorage.setItem('housingConsumed', 1);
    console.log(`Time House page insert values at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);
}

//Start chain of pulling input values from session storage and saving them to proper variables here
insertDefaultValues();

import Chart from './Chart.bundle.js';
let nets=[];
let years=[];
let cumulativeNet=[];
let costs=[];
let netSalaries=[];
let preTaxSalaries=[];
let person1Salaries=[];
let person2Salaries=[];
let regAccountTotals=[];
let retirementAccountTotals=[];
let netWorth=[];
let netChart;
let cumNetChart;
let preTaxSalaryChart;
let netSalaryChart;
let costChart;
let accountChart;

const netAfterCost = year => {
    const yearlyHouseSalaryReturn = yearlyHouseSalary(year, householdMembers, rateDefaults.inflation);
    const income = yearlyHouseSalaryReturn.netSalary;
    const kidCost = returnAnnualKidCost(year, kiddos, monthlyCost);
    const regCost = regSpending(year, monthlySpending, monthlyRetirementSpending, householdMembers);
    const houseCost = returnAnnualHousingCost(year, houseProgression, rateDefaults.inflation);
    const currentHousePurchaseCashFlow = findHousePurchaseYearCashFlow(year, houseProgression, rateDefaults.inflation, rateDefaults.brokerSellCommission);
    const loanCost = returnAnnualLoanCost(year, loans);
    costs.push(kidCost + regCost + houseCost + loanCost);
    netSalaries.push(income);
    preTaxSalaries.push(yearlyHouseSalaryReturn.salaryValues);
    let net = income - kidCost - regCost - houseCost + currentHousePurchaseCashFlow - loanCost;
    nets.push(net);
    return net;
}

const calcCashFlowUpToYear = year =>{
    const y = new Date().getFullYear();
    let net;
    for(let i=y; i<=year; i++){
        console.log(`i is ${i}`);
        net = netAfterCost(i);
        console.log(`big function first net is ${net}`);
        increase401ks(i, f401kAccounts);
        net = processRMDs(i, net, householdMembers, rothAccounts, f401kAccounts, rateDefaults.inflation);
        console.log(`big function post RMD net is ${net}`);
        net = balanceYearOfCashFlow(i, net, sortedAccountsPos, sortedAccountsNeg);
        console.log(`big function post balance net is ${net}`);
        growAccounts(rothAccounts, f401kAccounts, investmentAccounts);
        regAccountTotals.push(returnAccountValues(rothAccounts, f401kAccounts, investmentAccounts).regularValue);
        retirementAccountTotals.push(returnAccountValues(rothAccounts, f401kAccounts, investmentAccounts).retirementValue);
        years.push(i);    
    }
    return net;
}

function resetChartArrays(){
    nets=[];
    years=[];
    cumulativeNet=[];
    costs=[];
    netSalaries=[];
    preTaxSalaries=[];
    person1Salaries=[];
    person2Salaries=[];
    regAccountTotals=[];
    retirementAccountTotals=[];
    netWorth=[];
}

function bigCalc(){
    resetChartArrays();
    const testYear = document.getElementById('calcYear').valueAsNumber;
    const netTest = calcCashFlowUpToYear(testYear);
    const totalNet = nets.reduce((previousValue, currentValue)=>{
        return previousValue + currentValue;
    })
    
    nets.reduce((previousValue, currentValue, i)=>{
        return cumulativeNet[i] = previousValue+currentValue;
    },0);

    regAccountTotals.forEach((element)=>{
        netWorth.push(element);
    });
    retirementAccountTotals.forEach((element, index)=>{
        netWorth[index]+=element;
    });
    if(preTaxSalaries[0].length==1){
        preTaxSalaries.forEach((element)=>{
            person1Salaries.push(element[0]);
        })
        person2Salaries[0]=0;
    }else if(preTaxSalaries[0].length==2){
        preTaxSalaries.forEach((element)=>{
            person1Salaries.push(element[0]);
            person2Salaries.push(element[1]);
        })
    }else{
        console.log(`Something is wrong with pre tax salaries output array`);
    }
    formatChartArrays();
    
    document.getElementById('totalNet').innerHTML=numberFormatter(totalNet, true, 2);

    Chart.defaults.global.tooltips.callbacks.label = function(tooltipItem) {
        return '$' + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
    Chart.scaleService.updateScaleDefaults('linear', {
            ticks: {
                beginAtZero: true,
                callback: function(value) {
                    if(value>=0){
                        return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }else if (value<0){
                        return '-' + '$' + (value*-1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                },
            }
    });
    const netChartElement = document.getElementById('netChart');
    if(netChart){
        netChart.destroy();
    }
    netChart = new Chart(netChartElement, {
        type: 'bar',
        data: {
            labels: years,
            datasets: 
            [{
                label: 'Net Cashflow for each Year',
                data: nets,
                backgroundColor: 'rgba(255, 99, 132, 0.4)',
                borderColor: 'rgba(255, 99, 132, 0.4)',
                borderWidth: 3,
                hoverBackgroundColor: 'rgba(50, 99, 255, 0.4)',
                barPercentage: .9
            }
        ]},
    });
    if(cumNetChart){
        cumNetChart.destroy();
    }
    const cumNetChartElement = document.getElementById('cumNetChart');
    cumNetChart = new Chart(cumNetChartElement, {
        type: 'line',
        data: {
            labels: years,
            datasets: 
            [
            {
                label: 'Cumulative Cashflow Over Time',
                data: cumulativeNet,
                backgroundColor: 'rgba(0, 255, 132, 0.4)',
                borderColor: 'rgba(0, 255, 132, 0.4)',
                hoverBackgroundColor: 'rgba(50, 99, 255, 0.2)',
            }
        ]},
    });
    if(preTaxSalaryChart){
        preTaxSalaryChart.destroy();
    }
    const preTaxSalaryChartElement = document.getElementById('preTaxSalaryChart');
    preTaxSalaryChart = new Chart(preTaxSalaryChartElement, {
        type: 'bar',
        data: {
            labels: years,
            datasets: 
            [{
                label: 'Person 1 Pre Tax Salary Over Time',
                data: person1Salaries,
                backgroundColor: 'rgba(255, 99, 132, 0.4)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 3,
                hoverBackgroundColor: 'rgba(50, 99, 255, 0.2)',
                barPercentage: .9
            },
            {
                label: 'Person 2 Pre Tax Salary Over Time',
                data: person2Salaries,
                backgroundColor: 'rgba(0, 255, 132, 0.4)',
                borderColor: 'rgba(0, 255, 132, 0.4)',
                borderWidth: 3,
                hoverBackgroundColor: 'rgba(50, 99, 255, 0.2)',
                barPercentage: .9
            }
        ]},
        options: {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true,
                }]
            }
        }
    });
    if(netSalaryChart){
        netSalaryChart.destroy();
    }
    const netSalaryChartElement = document.getElementById('netSalaryChart');
    netSalaryChart = new Chart(netSalaryChartElement, {
        type: 'line',
        data: {
            labels: years,
            datasets: 
            [
            {
                label: 'Net Salary Over Time',
                data: netSalaries,
                backgroundColor: 'rgba(0, 255, 132, 0.4)',
                borderColor: 'rgba(0, 255, 132, 0.2)',
                hoverBackgroundColor: 'rgba(50, 99, 255, 0.4)',
            }
        ]},
    });
    if(costChart){
        costChart.destroy();
    }
    const costChartElement = document.getElementById('costChart');
    costChart = new Chart(costChartElement, {
        type: 'bar',
        data: {
            labels: years,
            datasets: 
            [
            {
                label: 'Total Cost Over Time',
                data: costs,
                backgroundColor: 'rgba(0, 255, 132, 0.4)',
                borderColor: 'rgba(0, 255, 132, 0.2)',
                borderWidth: 3,
                hoverBackgroundColor: 'rgba(50, 99, 255, 0.4)',
                barPercentage: .9
            }
        ]},
    });
    if(accountChart){
        accountChart.destroy();
    }
    const accountChartElement = document.getElementById('accountChart');
    accountChart = new Chart(accountChartElement, {
        type: 'line',
        data: {
            labels: years,
            datasets: 
            [{
                label: 'Net Worth Over Time',
                data: netWorth,
                backgroundColor: 'rgba(255, 99, 132, 0.4)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 3,
                hoverBackgroundColor: 'rgba(50, 99, 255, 0.4)',
                barPercentage: .9
            },
            {
                label: 'Regular Account Value Over Time',
                data: regAccountTotals,
                backgroundColor: 'rgba(0, 255, 132, 0.4)',
                borderColor: 'rgba(0, 255, 132, 0.2)',
                borderWidth: 3,
                hoverBackgroundColor: 'rgba(50, 99, 255, 0.4)',
                barPercentage: .9
            },
            {
                label: 'Retirement Account Value Over Time',
                data: retirementAccountTotals,
                backgroundColor: 'rgba(100, 0, 255, 0.4)',
                borderColor: 'rgba(100, 0, 255, 0.4)',
                borderWidth: 3,
                hoverBackgroundColor: 'rgba(50, 99, 255, 0.2)',
                barPercentage: .9
            }
        ]},
    });
}
const bigCalcButton = document.getElementById('bigCalc')
if(bigCalcButton){
    bigCalcButton.addEventListener("click", bigCalc);
}

function formatChartArrays(){
    function elementFormatter(array){
        array.forEach((element, index)=>{
            array[index]=numberFormatter(element, 0, true);
        });
    }
    elementFormatter(costs);
    elementFormatter(regAccountTotals);
    elementFormatter(retirementAccountTotals);
    elementFormatter(netWorth);
    elementFormatter(nets);
    elementFormatter(cumulativeNet);
    elementFormatter(netSalaries);
    elementFormatter(person1Salaries);
    elementFormatter(person2Salaries);
}

function runBigCalc(){
    if(bigCalcButton){
        bigCalc();
        console.log(`Time Calculate js page run big calc at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);
    }
}

setTimeout(runBigCalc, 1000);

console.log(`Time Calculate js page bottom part at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);

const calcPageExports = {rateDefaults};
module.exports = calcPageExports;
