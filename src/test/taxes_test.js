const assert = require('assert');
const taxImports = require('../Taxes.js');
const calculateNetIncome = taxImports.calculateNetIncome;
const calculateAddtlNetIncome = taxImports.calculateAddtlNetIncome;
const reverseTaxCalc=taxImports.reverseTaxCalc;

describe('tax calculations', ()=>{
    describe('calculateNetIncome',()=>{
        it('calls calcuate net income with one person at 50k',()=>{
            const people=1;
            const salary=50000;
            const expectedResult=45685.5;

            const result = calculateNetIncome(people, salary);

            assert.strictEqual(result, expectedResult);
        });
        it('calls calc net income with one person at 150k',()=>{
            const people=1;
            const salary=150000;
            const expectedResult=122896.5;

            const result = calculateNetIncome(people, salary);

            assert.strictEqual(result, expectedResult);
        });
        it('calls calc net income with one person at 1.1M',()=>{
            const people=1;
            const salary=1100000;
            const expectedResult=733161;

            const result = calculateNetIncome(people, salary);

            assert.strictEqual(result, expectedResult);
        });
        it('calls calc net income with two people at 100k, 75k',()=>{
            const people=2;
            const salary1=100000;
            const salary2=75000;
            const expectedResult=150376;

            const result = calculateNetIncome(people, salary1+salary2);

            assert.strictEqual(result, expectedResult);
        });
        it('calls calc net income with two people at 200k',()=>{
            const people=2;
            const salary1=200000;
            const salary2=200000;
            const expectedResult=317905;

            const result = calculateNetIncome(people, salary1+salary2);

            assert.strictEqual(result, expectedResult);
        });
        it('calls calc net income with zero salary',()=>{
            const people=1;
            const salary=0;
            const expectedResult=0;

            const result = calculateNetIncome(people, salary);

            assert.strictEqual(result, expectedResult);
        });
        it('calls calc net income with negative salary',()=>{
            const people=1;
            const salary=-50000;
            const expectedResult=0;

            const result = calculateNetIncome(people, salary);

            assert.strictEqual(result, expectedResult);
        });
    });
    describe('calculate additional net income',()=>{
        it('calculates additional net income for one person at 50k previous, 25k additional',()=>{
            const people=1;
            const origSalary=50000;
            const newSalary=25000;
            const expectedResult=19752.5;
    
            const result = calculateAddtlNetIncome(people, newSalary, origSalary);
    
            assert.strictEqual(result, expectedResult);
        });
        it('calculates additional net income for one person at 500k previous, 150k additional',()=>{
            const people=1;
            const origSalary=500000;
            const newSalary=150000;
            const expectedResult=95116;
    
            const result = calculateAddtlNetIncome(people, newSalary, origSalary);
    
            assert.strictEqual(result, expectedResult);
        });
        it('calculates additional net income for one person at 0 previous, 75k additional',()=>{
            const people=1;
            const origSalary=0;
            const newSalary=75000;
            const expectedResult=65438;
    
            const result = calculateAddtlNetIncome(people, newSalary, origSalary);
    
            assert.strictEqual(result, expectedResult);
        });
        it('calculates additional net income for one person at 100k previous, 0 additional',()=>{
            const people=1;
            const origSalary=100000;
            const newSalary=0;
            const expectedResult=0;
    
            const result = calculateAddtlNetIncome(people, newSalary, origSalary);
    
            assert.strictEqual(result, expectedResult);
        });
        it('calculates additional net income for two people at 300k previous, 100k additional',()=>{
            const people=2;
            const origSalary=300000;
            const newSalary=100000;
            const expectedResult=72112;
    
            const result = calculateAddtlNetIncome(people, newSalary, origSalary);
    
            assert.strictEqual(result, expectedResult);
        });
        it('calculates additional net income for two people at 180k previous, 20k additional',()=>{
            const people=2;
            const origSalary=180000;
            const newSalary=20000;
            const expectedResult=15517;
    
            const result = calculateAddtlNetIncome(people, newSalary, origSalary);
    
            assert.strictEqual(result, expectedResult);
        });
        it('calculates additional net income for two people at 1.5M previous, 250k additional',()=>{
            const people=2;
            const origSalary=1500000;
            const newSalary=250000;
            const expectedResult=157500;
    
            const result = calculateAddtlNetIncome(people, newSalary, origSalary);
    
            assert.strictEqual(result, expectedResult);
        });
        it('calculates additional net income for two people at 0 previous, 100k additional',()=>{
            const people=2;
            const origSalary=0;
            const newSalary=100000;
            const expectedResult=91371;
    
            const result = calculateAddtlNetIncome(people, newSalary, origSalary);
    
            assert.strictEqual(result, expectedResult);
        });       
    });
    describe('calculate reverse tax required',()=>{
        it('calculates required pretax income for given post tax need bracket 1',()=>{
            const people=1;
            const origSalary=0;
            const postTax=18000;
            const expectedResult=18622.22;
    
            const rawResult = reverseTaxCalc(people, postTax, origSalary);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('calculates required pretax income for given post tax need bracket 2',()=>{
            const people=1;
            const origSalary=0;
            const postTax=40000;
            const expectedResult=43539.20;
    
            const rawResult = reverseTaxCalc(people, postTax, origSalary);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('calculates required pretax income for given post tax need bracket 3',()=>{
            const people=1;
            const origSalary=0;
            const postTax=80000;
            const expectedResult=93669.23;
    
            const rawResult = reverseTaxCalc(people, postTax, origSalary);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('calculates required pretax income for given post tax need bracket 4',()=>{
            const people=1;
            const origSalary=0;
            const postTax=500000;
            const expectedResult=729903.17;
    
            const rawResult = reverseTaxCalc(people, postTax, origSalary);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('calculates required pretax income for two people given post tax need bracket 3',()=>{
            const people=2;
            const origSalary=0;
            const postTax=150000;
            const expectedResult=174517.95;
    
            const rawResult = reverseTaxCalc(people, postTax, origSalary);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
    });
});