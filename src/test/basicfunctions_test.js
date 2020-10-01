const assert = require('assert');

const basicFunctions = require('../basicfunctions.js');
const growAgainstInflation=basicFunctions.growAgainstInflation;
const calcMonthlyLoanPayment=basicFunctions.calcMonthlyLoanPayment;
const numberFormatter=basicFunctions.numberFormatter;

describe('basic functions', ()=>{
    describe('growAgainstInflation', ()=>{
        it('grows zero at 5% against an inflation rate of 3%, for 1 year', ()=>{
            const startValue=0;
            const years=1;
            const growthRate=.05;
            const inflationRate=.02;
            const expectedResult=0;
    
            const rawResult=growAgainstInflation(startValue, years, growthRate, inflationRate);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('grows 100 at 5% against a 2% inflation rate, for 1 year', ()=>{
            const startValue=100;
            const years=1;
            const growthRate=.05;
            const inflationRate=.02;
            const expectedResult=103;
    
            const rawResult=growAgainstInflation(startValue, years, growthRate, inflationRate);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('grows 100 at 5% against a 2% inflation rate, for 2 years', ()=>{
            const startValue=100;
            const years=2;
            const growthRate=.05;
            const inflationRate=.02;
            const expectedResult=106.09;
    
            const rawResult=growAgainstInflation(startValue, years, growthRate, inflationRate);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('grows 50,000 at 10% against a 3% inflation rate, for 5 years', ()=>{
            const startValue=50000;
            const years=5;
            const growthRate=.10;
            const inflationRate=.03;
            const expectedResult=70127.59;
    
            const rawResult=growAgainstInflation(startValue, years, growthRate, inflationRate);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('grows 100 at -5% against a 2% inflation rate, for 1 year', ()=>{
            const startValue=100;
            const years=1;
            const growthRate=-.05;
            const inflationRate=.02;
            const expectedResult=93;
    
            const rawResult=growAgainstInflation(startValue, years, growthRate, inflationRate);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('grows 0 at 5% against a 2% inflation rate, for 1 year', ()=>{
            const startValue=0;
            const years=1;
            const growthRate=-.05;
            const inflationRate=.02;
            const expectedResult=0;
    
            const rawResult=growAgainstInflation(startValue, years, growthRate, inflationRate);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('grows 1000 at 0% against a 2% inflation rate, for 1 year', ()=>{
            const startValue=1000;
            const years=1;
            const growthRate=-.00;
            const inflationRate=.02;
            const expectedResult=980;
    
            const rawResult=growAgainstInflation(startValue, years, growthRate, inflationRate);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('grows 1000 at 5% against a 0% inflation rate, for 1 year', ()=>{
            const startValue=1000;
            const years=1;
            const growthRate=.05;
            const inflationRate=0;
            const expectedResult=1050;
    
            const rawResult=growAgainstInflation(startValue, years, growthRate, inflationRate);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('grows 1000 at 5% against a 2% inflation rate, for 0 years', ()=>{
            const startValue=1000;
            const years=0;
            const growthRate=.05;
            const inflationRate=.02;
            const expectedResult=1000;
    
            const rawResult=growAgainstInflation(startValue, years, growthRate, inflationRate);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
    });
    describe('calcMonthlyPayment', ()=>{
        it('calculates payment for 100,000, at 5% interest, over 30 years', ()=>{
            const loanAmount=100000;
            const loanLength=30;
            const interest=.05;
            const expectedResult=536.82;
    
            const rawResult=calcMonthlyLoanPayment(loanAmount, interest, loanLength);
            const result=parseFloat((Math.round(rawResult*100)/100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('calculates payment for 1,000,000, at 3.5% interest, over 20 years', ()=>{
            const loanAmount=1000000;
            const loanLength=20;
            const interest=.035;
            const expectedResult=5799.60;
    
            const rawResult=calcMonthlyLoanPayment(loanAmount, interest, loanLength);
            const result=parseFloat((Math.round(rawResult*100)/100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('calculates payment for 500,000, at 0% interest, over 30 years', ()=>{
            const loanAmount=500000;
            const loanLength=30;
            const interest=0;
            const expectedResult=1388.89;
    
            const rawResult=calcMonthlyLoanPayment(loanAmount, interest, loanLength);
            const result=parseFloat((Math.round(rawResult*100)/100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('calculates payment for 0, at 5% interest, over 30 years', ()=>{
            const loanAmount=0;
            const loanLength=30;
            const interest=.05;
            const expectedResult=0;
    
            const rawResult=calcMonthlyLoanPayment(loanAmount, interest, loanLength);
            const result=parseFloat((Math.round(rawResult*100)/100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('calculates payment for 250,000, at 5% interest, over 0 years', ()=>{
            const loanAmount=0;
            const loanLength=30;
            const interest=.05;
            const expectedResult=0;
    
            const rawResult=calcMonthlyLoanPayment(loanAmount, interest, loanLength);
            const result=parseFloat((Math.round(rawResult*100)/100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
    
    });
    describe('numberFormatter', ()=>{
        it('formats 11.23456789 to two decimals, as a float, no dollar sign', ()=>{
            const number=11.23456789;
            const digits=2;
            const keepNumber=true;
            const expectedResult=11.23;
    
            const result=numberFormatter(number, digits, keepNumber);
    
            assert.strictEqual(result, expectedResult);
        });
        it('formats 11.23456789 to two decimals, as a string, no dollar sign', ()=>{
            const number=11.23456789;
            const digits=2;
            const keepNumber=false;
            const expectedResult='11.23';
    
            const result=numberFormatter(number, digits, keepNumber);
    
            assert.strictEqual(result, expectedResult);
        });
        it('formats 11.23456789 to two decimals, as a string, with dollar sign', ()=>{
            const number=11.23456789;
            const digits=2;
            const keepNumber=false;
            const expectedResult='$11.23';
            const dollarSign=true;
    
            const result=numberFormatter(number, digits, keepNumber, dollarSign);
    
            assert.strictEqual(result, expectedResult);
        });
        it('formats 11.555 to two decimals, as a float, with no dollar sign', ()=>{
            const number=11.555;
            const digits=2;
            const keepNumber=true;
            const expectedResult=11.56;
            const dollarSign=false;
    
            const result=numberFormatter(number, digits, keepNumber, dollarSign);
    
            assert.strictEqual(result, expectedResult);
        });
        it('formats 11.555 to two decimals, as a string, with dollar sign', ()=>{
            const number=11.555;
            const digits=2;
            const keepNumber=false;
            const expectedResult='$11.56';
            const dollarSign=true;
    
            const result=numberFormatter(number, digits, keepNumber, dollarSign);
    
            assert.strictEqual(result, expectedResult);
        });
        it('formats -11.555 to two decimals, as a float, with no dollar sign', ()=>{
            const number=-11.555;
            const digits=2;
            const keepNumber=true;
            const expectedResult=-11.55; //Javascript Math.round rounds towards + infinity, not "away from zero"
            const dollarSign=false;
    
            const result=numberFormatter(number, digits, keepNumber, dollarSign);
    
            assert.strictEqual(result, expectedResult);
        });
        it('formats -11.5551 to two decimals, as a float, with no dollar sign', ()=>{
            const number=-11.5551;
            const digits=2;
            const keepNumber=true;
            const expectedResult=-11.56;
            const dollarSign=false;
    
            const result=numberFormatter(number, digits, keepNumber, dollarSign);
    
            assert.strictEqual(result, expectedResult);
        });
        it('formats 1,256,512.756 to zero decimals, as a string, with dollar sign', ()=>{
            const number=1256512.756;
            const digits=0;
            const keepNumber=false;
            const expectedResult='$1,256,513';
            const dollarSign=true;
    
            const result=numberFormatter(number, digits, keepNumber, dollarSign);
    
            assert.strictEqual(result, expectedResult);
        });
    })
});

