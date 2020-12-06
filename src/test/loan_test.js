const assert = require('assert');
const loanImports = require('../loan.js');
const returnAnnualLoanCost = loanImports.returnAnnualLoanCost;
const loanCreator = loanImports.loanCreator;

describe('loan cost calculations', ()=>{
    //setup
    //let monthlyCost=1500;
    let loanList=[];
        
    describe('loan creator',()=>{
        it('creates a loan and sets a new number',()=>{
            const startValue=1;
            const expectedResult=1;
    
            const loan = loanCreator(2, 2020, 10000, .05, 10, false);
            loan.number=startValue;
            const result = loan.number;
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates a loan and sets invalid number',()=>{
            const startValue='string';
            const expectedResult=2;
    
            const loan = loanCreator(2, 2020, 10000, .05, 10, false);
            loan.number=startValue;
            const result = loan.number;
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates a loan and sets a new year',()=>{
            const startValue=2025;
            const expectedResult=2025;
    
            const loan = loanCreator(2, 2020, 10000, .05, 10, false);
            loan.yearOriginated=startValue;
            const result = loan.yearOriginated;
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates a loan and sets invalid year',()=>{
            const startValue=5000;
            const expectedResult=2020;
    
            const loan = loanCreator(2, 2020, 10000, .05, 10, false);
            loan.yearOriginated=startValue;
            const result = loan.yearOriginated;
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates a loan and sets a new amount',()=>{
            const startValue=50000;
            const expectedResult=50000;
    
            const loan = loanCreator(2, 2020, 10000, .05, 10, false);
            loan.amount=startValue;
            const result = loan.amount;
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates a loan and sets invalid amount',()=>{
            const startValue=-5000;
            const expectedResult=10000;
    
            const loan = loanCreator(2, 2020, 10000, .05, 10, false);
            loan.amount=startValue;
            const result = loan.amount;
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates a loan and sets a new interest rate',()=>{
            const startValue=.075;
            const expectedResult=.075;
    
            const loan = loanCreator(2, 2020, 10000, .05, 10, false);
            loan.interestRate=startValue;
            const result = loan.interestRate;
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates a loan and sets invalid interest rate',()=>{
            const startValue=-1;
            const expectedResult=.05;
    
            const loan = loanCreator(2, 2020, 10000, .05, 10, false);
            loan.interestRate=startValue;
            const result = loan.interestRate;
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates a loan and sets a new length',()=>{
            const startValue=15;
            const expectedResult=15;
    
            const loan = loanCreator(2, 2020, 10000, .05, 10, false);
            loan.length=startValue;
            const result = loan.length;
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates a loan and sets invalid length',()=>{
            const startValue=-10;
            const expectedResult=10;
    
            const loan = loanCreator(2, 2020, 10000, .05, 10, false);
            loan.length=startValue;
            const result = loan.length;
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates a loan and sets a new cash inflow value',()=>{
            const startValue=true;
            const expectedResult=true;
    
            const loan = loanCreator(2, 2020, 10000, .05, 10, false);
            loan.cashInflow=startValue;
            const result = loan.cashInflow;
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates a loan and sets invalid cash inflow value',()=>{
            const startValue=1;
            const expectedResult=false;
    
            const loan = loanCreator(2, 2020, 10000, .05, 10, false);
            loan.cashInflow=startValue;
            const result = loan.cashInflow;
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates a loan and returns monthly payment for a valid year',()=>{
            const seekingYear=2025;
            const expectedResult=106.07;
    
            const loan = loanCreator(2, 2020, 10000, .05, 10, false);
            const rawResult = loan.monthlyPayment(seekingYear);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates a loan and returns monthly payment for a valid year',()=>{
            const seekingYear=2023;
            const amount=50000;
            const interest=.1;
            const length = 5;
            const expectedResult=1062.35;
    
            const loan = loanCreator(1, 2020, amount, interest, length, false);
            const rawResult = loan.monthlyPayment(seekingYear);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates a loan and returns monthly payment for a year before loan',()=>{
            const seekingYear=2025;
            const amount=50000;
            const interest=.1;
            const length = 5;
            const expectedResult=0;
    
            const loan = loanCreator(1, 2030, amount, interest, length, false);
            const rawResult = loan.monthlyPayment(seekingYear);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates a loan and returns monthly payment for a year after loan',()=>{
            const seekingYear=2041;
            const amount=50000;
            const interest=.1;
            const length = 10;
            const expectedResult=0;
    
            const loan = loanCreator(1, 2030, amount, interest, length, false);
            const rawResult = loan.monthlyPayment(seekingYear);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
    });
    describe('return annual loan cost',()=>{
        it('calls returnAnnualLoanCost on empty kid list',()=>{    
            const expectedResult=0;
            const seekingYear=2030;
            
            const result = returnAnnualLoanCost(seekingYear, loanList);
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates one loan with no cash inflow and calls returnAnnualLoanCost on a valid year',()=>{
            const seekingYear=2035;
            const origYear=2030
            const amount=50000;
            const interest=.1;
            const length = 10;
            const cash = false
            const expectedResult=7929.04;
    
            loanList=[];
            loanList[0] = loanCreator(1, origYear, amount, interest, length, cash);
            const rawResult = returnAnnualLoanCost(seekingYear, loanList);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates one loan with no cash inflow and calls returnAnnualLoanCost on a year before loan',()=>{
            const seekingYear=2025;
            const origYear=2030
            const amount=50000;
            const interest=.1;
            const length = 10;
            const cash = false
            const expectedResult=0;
    
            loanList=[];
            loanList[0] = loanCreator(1, origYear, amount, interest, length, cash);
            const rawResult = returnAnnualLoanCost(seekingYear, loanList);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates one loan with no cash inflow and calls returnAnnualLoanCost on a year after loan',()=>{
            const seekingYear=2045;
            const origYear=2030
            const amount=50000;
            const interest=.1;
            const length = 10;
            const cash = false
            const expectedResult=0;
    
            loanList=[];
            loanList[0] = loanCreator(1, origYear, amount, interest, length, cash);
            const rawResult = returnAnnualLoanCost(seekingYear, loanList);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates one loan with cash inflow and calls returnAnnualLoanCost on orig year',()=>{
            const seekingYear=2030;
            const origYear=2030
            const amount=10000;
            const interest=.05;
            const length = 5;
            const cash = true
            const expectedResult=-7735.45;
    
            loanList=[];
            loanList[0] = loanCreator(1, origYear, amount, interest, length, cash);
            const rawResult = returnAnnualLoanCost(seekingYear, loanList);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates two loans with no cash inflow and calls returnAnnualLoanCost on a valid year',()=>{
            const seekingYear=2035;
            const origYear1=2030
            const amount1=50000;
            const interest1=.1;
            const length1 = 10;
            const origYear2=2033
            const amount2=25000;
            const interest2=.075;
            const length2 = 5;
            const cash = false
            const expectedResult=13940.43;
    
            loanList=[];
            loanList[0] = loanCreator(1, origYear1, amount1, interest1, length1, cash);
            loanList[1] = loanCreator(2, origYear2, amount2, interest2, length2, cash);
            const rawResult = returnAnnualLoanCost(seekingYear, loanList);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates two loans, one with cash inflow, and calls returnAnnualLoanCost on various years',()=>{
            const seekingYear1=2022;
            const seekingYear2=2024;
            const seekingYear3=2026;
            const origYear1=2020
            const amount1=10000;
            const interest1=.05;
            const length1 = 10;
            const origYear2=2024
            const amount2=15000;
            const interest2=.03;
            const length2 = 10;
            const cash1 = false;
            const cash2 = true;
            const expectedResult1=1272.79;
            const expectedResult2=-11989.12;
            const expectedResult3=3010.88;
    
            loanList=[];
            loanList[0] = loanCreator(1, origYear1, amount1, interest1, length1, cash1);
            loanList[1] = loanCreator(2, origYear2, amount2, interest2, length2, cash2);
            const rawResult1 = returnAnnualLoanCost(seekingYear1, loanList);
            const result1=parseFloat((Math.round(rawResult1 * 100 ) / 100).toFixed(2));
            const rawResult2 = returnAnnualLoanCost(seekingYear2, loanList);
            const result2=parseFloat((Math.round(rawResult2 * 100 ) / 100).toFixed(2));
            const rawResult3 = returnAnnualLoanCost(seekingYear3, loanList);
            const result3=parseFloat((Math.round(rawResult3 * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result1, expectedResult1);
            assert.strictEqual(result2, expectedResult2);
            assert.strictEqual(result3, expectedResult3);
        });
        it('creates three loans with no cash inflow and calls returnAnnualLoanCost on various years',()=>{
            const seekingYear1=2049;
            const seekingYear2=2050;
            const seekingYear3=2054;
            const origYear1=2040
            const amount1=50000;
            const interest1=.04;
            const origYear2=2043
            const amount2=60000;
            const interest2=.05;
            const origYear3=2046
            const amount3=70000;
            const interest3=.06;
            const length = 10;
            const cash = false;
            const expectedResult1=23037.15;
            const expectedResult2=16962.44;
            const expectedResult3=9325.72;
    
            loanList=[];
            loanList[0] = loanCreator(1, origYear1, amount1, interest1, length, cash);
            loanList[1] = loanCreator(2, origYear2, amount2, interest2, length, cash);
            loanList[2] = loanCreator(3, origYear3, amount3, interest3, length, cash);
            const rawResult1 = returnAnnualLoanCost(seekingYear1, loanList);
            const result1=parseFloat((Math.round(rawResult1 * 100 ) / 100).toFixed(2));
            const rawResult2 = returnAnnualLoanCost(seekingYear2, loanList);
            const result2=parseFloat((Math.round(rawResult2 * 100 ) / 100).toFixed(2));
            const rawResult3 = returnAnnualLoanCost(seekingYear3, loanList);
            const result3=parseFloat((Math.round(rawResult3 * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result1, expectedResult1);
            assert.strictEqual(result2, expectedResult2);
            assert.strictEqual(result3, expectedResult3);
        });
    });
});