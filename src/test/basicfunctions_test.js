const assert = require('assert');

const basicFunctions = require('../basicfunctions.js');
const growAgainstInflation=basicFunctions.growAgainstInflation;
const calcMonthlyLoanPayment=basicFunctions.calcMonthlyLoanPayment;
const numberFormatter=basicFunctions.numberFormatter;

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
    it('grows 100 at -5% against a 2% inflation rate, for 1 years', ()=>{
        const startValue=100;
        const years=1;
        const growthRate=-.05;
        const inflationRate=.02;
        const expectedResult=93;

        const rawResult=growAgainstInflation(startValue, years, growthRate, inflationRate);
        const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));

        assert.strictEqual(result, expectedResult);
    });
});