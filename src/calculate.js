console.log(`Time Calculate js page top part at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);

const basicFunctions = require('./basicfunctions.js');
const numberFormatter = basicFunctions.numberFormatter;
const regSpending = require('./regularcost.js');
const housingImports = require('./homecalcs.js');
const returnAnnualHousingCost = housingImports.returnAnnualHousingCost;
const findHousePurchaseYearCashFlow = housingImports.findHousePurchaseYearCashFlow;
const returnAnnualKidCost = require('./kiddos.js');
const personImports = require('./person.js');
const yearlyHouseSalary = personImports.yearlyHouseSalary;
const retirementImports = require('./retirement.js');
const balanceYearOfCashFlow = retirementImports.balanceYearOfCashFlow;
const processRMDs = retirementImports.processRMDs;
const growAccounts = retirementImports.growAccounts;
const increase401ks = retirementImports.increase401ks;
const insertAccountValues = retirementImports.insertAccountValues;
const returnAccountValues = retirementImports.returnAccountValues;
const loanImports = require('./loan.js');
const returnAnnualLoanCost = loanImports.returnAnnualLoanCost;
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

const netAfterCost = year => {
    const yearlyHouseSalaryReturn = yearlyHouseSalary(year);
    const income = yearlyHouseSalaryReturn.netSalary;
    const kidCost = returnAnnualKidCost(year);
    const regCost = regSpending(year);
    const houseCost = returnAnnualHousingCost(year);
    const housePurchaseCashFlow = findHousePurchaseYearCashFlow(year);
    const loanCost = returnAnnualLoanCost(year);
    costs.push(kidCost + regCost + houseCost + loanCost);
    netSalaries.push(income);
    preTaxSalaries.push(yearlyHouseSalaryReturn.salaryValues);
    let net = income - kidCost - regCost - houseCost + housePurchaseCashFlow - loanCost;
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
        increase401ks(i);
        net = processRMDs(i, net);
        console.log(`big function post RMD net is ${net}`);
        net = balanceYearOfCashFlow(i, net);
        console.log(`big function post balance net is ${net}`);
        growAccounts();
        regAccountTotals.push(returnAccountValues().regularValue);
        retirementAccountTotals.push(returnAccountValues().retirementValue);
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
    regAccountTotals=[];
    retirementAccountTotals=[];
}

function bigCalc(){
    insertAccountValues();
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
    const netChart = new Chart(netChartElement, {
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
    const cumNetChartElement = document.getElementById('cumNetChart');
    const cumNetChart = new Chart(cumNetChartElement, {
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
    const preTaxSalaryChartElement = document.getElementById('preTaxSalaryChart');
    const preTaxSalaryChart = new Chart(preTaxSalaryChartElement, {
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
    const netSalaryChartElement = document.getElementById('netSalaryChart');
    const netSalaryChart = new Chart(netSalaryChartElement, {
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
    const costChartElement = document.getElementById('costChart');
    const costChart = new Chart(costChartElement, {
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
    const accountChartElement = document.getElementById('accountChart');
    const accountChart = new Chart(accountChartElement, {
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
document.getElementById('bigCalc').addEventListener("click", bigCalc);

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

function loadStatus(){
    let defaultStored = window.sessionStorage.getItem('defaultStored');
    let defaultDistributed = window.sessionStorage.getItem('defaultDistributed');
    document.getElementById('defaultStored').innerHTML=defaultStored;
    document.getElementById('defaultDistributed').innerHTML=defaultDistributed;
    let defaultConsumed = window.sessionStorage.getItem('defaultConsumed');
    document.getElementById('defaultConsumed').innerHTML=defaultConsumed;

    let housingStored = window.sessionStorage.getItem('housingStored');
    let housingDistributed = window.sessionStorage.getItem('housingDistributed');
    let housingConsumed = window.sessionStorage.getItem('housingConsumed');
    document.getElementById('housingStored').innerHTML=housingStored;
    document.getElementById('housingDistributed').innerHTML=housingDistributed;
    document.getElementById('housingConsumed').innerHTML=housingConsumed;

    let salaryStored = window.sessionStorage.getItem('salaryStored');
    let salaryDistributed = window.sessionStorage.getItem('salaryDistributed');
    document.getElementById('salaryStored').innerHTML=salaryStored;
    document.getElementById('salaryDistributed').innerHTML=salaryDistributed;
    let salaryConsumed = window.sessionStorage.getItem('salaryConsumed');
    document.getElementById('salaryConsumed').innerHTML=salaryConsumed;

    let costStored = window.sessionStorage.getItem('costStored');
    let regCostDistributed = window.sessionStorage.getItem('regCostDistributed');
    document.getElementById('costStored').innerHTML=costStored;
    document.getElementById('regCostDistributed').innerHTML=regCostDistributed;
    let kidCostDistributed = window.sessionStorage.getItem('kidCostDistributed');
    document.getElementById('kidCostDistributed').innerHTML=kidCostDistributed;
    let regCostConsumed = window.sessionStorage.getItem('regCostConsumed');
    document.getElementById('regCostConsumed').innerHTML=regCostConsumed;
    let kidCostConsumed = window.sessionStorage.getItem('kidCostConsumed');
    document.getElementById('kidCostConsumed').innerHTML=kidCostConsumed;

    let accountStored = window.sessionStorage.getItem('accountStored');
    let accountDistributed = window.sessionStorage.getItem('accountDistributed');
    document.getElementById('accountStored').innerHTML=accountStored;
    document.getElementById('accountDistributed').innerHTML=accountDistributed;
    let accountConsumed = window.sessionStorage.getItem('accountConsumed');
    document.getElementById('accountConsumed').innerHTML=accountConsumed;

    console.log(`Time Calculate js page load status at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);
}

setTimeout(loadStatus, 2000);

function resetStatus(){
    window.sessionStorage.setItem('defaultStored', 0);
    window.sessionStorage.setItem('housingStored', 0);
    window.sessionStorage.setItem('salaryStored', 0);
    window.sessionStorage.setItem('costStored', 0);
    window.sessionStorage.setItem('accountStored', 0);
    window.sessionStorage.setItem('defaultDistributed', 0);
    window.sessionStorage.setItem('housingDistributed', 0);
    window.sessionStorage.setItem('salarytDistributed', 0);
    window.sessionStorage.setItem('regCostDistributed', 0);
    window.sessionStorage.setItem('kidCostDistributed', 0);
    window.sessionStorage.setItem('accountDistributed', 0);
    window.sessionStorage.setItem('housingConsumed', 0);
    window.sessionStorage.setItem('salaryConsumed', 0);
    window.sessionStorage.setItem('kidCostConsumed', 0);
    window.sessionStorage.setItem('regCostConsumed', 0);
    window.sessionStorage.setItem('defaultConsumed', 0);
    window.sessionStorage.setItem('accountConsumed', 0);
}
document.getElementById('resetStatus').addEventListener("click", resetStatus);

console.log(`Time Calculate js page bottom part at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);