const assert = require('assert');
const kidImports = require('../kiddos.js');
const returnAnnualKidCost = kidImports.returnAnnualKidCost;
const kidCreator = kidImports.kidCreator;

describe('kid cost calculations', ()=>{
    //setup
    let monthlyCost=1500;
    let kidList=[];
        
    describe('kid creator',()=>{
        it('creates a kid and returns name',()=>{
            const startValue='Frankie';
            const expectedResult = 'Frankie';
    
            const kid = kidCreator(startValue);
            const result = kid._name;
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates a kid and returns year born',()=>{
            const startValue=2025;
            const expectedResult = 2025;
    
            const kid = kidCreator(undefined, startValue);
            const result = kid._yearBorn;
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates a kid and returns daycarecost',()=>{
            const startValue=1000;
            const expectedResult = 1000;
    
            const kid = kidCreator(undefined, undefined, startValue);
            const result = kid._dayCareCost;
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates a kid and returns college cost',()=>{
            const startValue=40000;
            const expectedResult = 40000;
    
            const kid = kidCreator(undefined, undefined, undefined, startValue);
            const result = kid._collegeCost;
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates a kid with nonzero daycare and calls yearlyCost on early years',()=>{
            const yearBorn=2024;
            const dayCareCost=1000;
            const seekingYear1=2023;
            const seekingYear2=2024;
            const seekingYear3=2027;
            const seekingYear4=2028;
            const seekingYear5=2029;
            const expectedResult1 = 0;
            const expectedResult2 = 28500;
            const expectedResult3 = 28500;
            const expectedResult4 = 16500;
            const expectedResult5 = 16500;
    
            const kid = kidCreator(undefined, yearBorn, dayCareCost, undefined);
            const result1 = kid.yearlyCost(seekingYear1, monthlyCost);
            const result2 = kid.yearlyCost(seekingYear2, monthlyCost);
            const result3 = kid.yearlyCost(seekingYear3, monthlyCost);
            const result4 = kid.yearlyCost(seekingYear4, monthlyCost);
            const result5 = kid.yearlyCost(seekingYear5, monthlyCost);
    
            assert.strictEqual(result1, expectedResult1);
            assert.strictEqual(result2, expectedResult2);
            assert.strictEqual(result3, expectedResult3);
            assert.strictEqual(result4, expectedResult4);
            assert.strictEqual(result5, expectedResult5);
        });
        it('creates a kid with zero daycare and calls yearlyCost on early years',()=>{
            const monthlyCost2=2000;
            const yearBorn=2028;
            const dayCareCost=0;
            const seekingYear1=2025;
            const seekingYear2=2028;
            const seekingYear3=2031;
            const seekingYear4=2032;
            const seekingYear5=2033;
            const expectedResult1 = 0;
            const expectedResult2 = 22500;
            const expectedResult3 = 22500;
            const expectedResult4 = 22500;
            const expectedResult5 = 22500;
    
            const kid = kidCreator(undefined, yearBorn, dayCareCost, undefined);
            const result1 = kid.yearlyCost(seekingYear1, monthlyCost2);
            const result2 = kid.yearlyCost(seekingYear2, monthlyCost2);
            const result3 = kid.yearlyCost(seekingYear3, monthlyCost2);
            const result4 = kid.yearlyCost(seekingYear4, monthlyCost2);
            const result5 = kid.yearlyCost(seekingYear5, monthlyCost2);
    
            assert.strictEqual(result1, expectedResult1);
            assert.strictEqual(result2, expectedResult2);
            assert.strictEqual(result3, expectedResult3);
            assert.strictEqual(result4, expectedResult4);
            assert.strictEqual(result5, expectedResult5);
        });
        it('creates a kid with valid values and calls yearlyCost on years around college',()=>{
            const yearBorn=2030;
            const collegeCost=40000;
            const seekingYear1=2040;
            const seekingYear2=2047;
            const seekingYear3=2048;
            const seekingYear4=2049;
            const seekingYear5=2051;
            const seekingYear6=2052;
            const seekingYear7=2053;
            const expectedResult1 = 16500;
            const expectedResult2 = 16500;
            const expectedResult3 = 16500;
            const expectedResult4 = 38500;
            const expectedResult5 = 38500;
            const expectedResult6 = 38500;
            const expectedResult7 = 0;
    
            const kid = kidCreator(undefined, yearBorn, undefined, collegeCost);
            const result1 = kid.yearlyCost(seekingYear1, monthlyCost);
            const result2 = kid.yearlyCost(seekingYear2, monthlyCost);
            const result3 = kid.yearlyCost(seekingYear3, monthlyCost);
            const result4 = kid.yearlyCost(seekingYear4, monthlyCost);
            const result5 = kid.yearlyCost(seekingYear5, monthlyCost);
            const result6 = kid.yearlyCost(seekingYear6, monthlyCost);
            const result7 = kid.yearlyCost(seekingYear7, monthlyCost);
    
            assert.strictEqual(result1, expectedResult1);
            assert.strictEqual(result2, expectedResult2);
            assert.strictEqual(result3, expectedResult3);
            assert.strictEqual(result4, expectedResult4);
            assert.strictEqual(result5, expectedResult5);
            assert.strictEqual(result6, expectedResult6);
            assert.strictEqual(result7, expectedResult7);
        });
    });
    describe('return annual kid cost',()=>{
        it('calls returnAnnualKidCost on empty kid list',()=>{    
            const expectedResult=0;
            const seekingYear=2030;
            
            const result = returnAnnualKidCost(seekingYear, kidList, monthlyCost);
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates one kid with nonzero daycare and calls returnAnnualKidCost on early years',()=>{
            const yearBorn=2024;
            const dayCareCost=1000;
            const seekingYear1=2023;
            const seekingYear2=2024;
            const seekingYear3=2027;
            const seekingYear4=2028;
            const seekingYear5=2029;
            const expectedResult1 = 0;
            const expectedResult2 = 28500;
            const expectedResult3 = 28500;
            const expectedResult4 = 16500;
            const expectedResult5 = 16500;
    
            kidList=[];
            kidList[0] = kidCreator(undefined, yearBorn, dayCareCost, undefined);
            const result1 = returnAnnualKidCost(seekingYear1, kidList, monthlyCost);
            const result2 = returnAnnualKidCost(seekingYear2, kidList, monthlyCost);
            const result3 = returnAnnualKidCost(seekingYear3, kidList, monthlyCost);
            const result4 = returnAnnualKidCost(seekingYear4, kidList, monthlyCost);
            const result5 = returnAnnualKidCost(seekingYear5, kidList, monthlyCost);
    
            assert.strictEqual(result1, expectedResult1);
            assert.strictEqual(result2, expectedResult2);
            assert.strictEqual(result3, expectedResult3);
            assert.strictEqual(result4, expectedResult4);
            assert.strictEqual(result5, expectedResult5);
        });
        it('creates a kid with valid values and calls yearlyCost on years around college',()=>{
            const yearBorn=2030;
            const collegeCost=40000;
            const seekingYear1=2040;
            const seekingYear2=2047;
            const seekingYear3=2048;
            const seekingYear4=2049;
            const seekingYear5=2051;
            const seekingYear6=2052;
            const seekingYear7=2053;
            const expectedResult1 = 16500;
            const expectedResult2 = 16500;
            const expectedResult3 = 16500;
            const expectedResult4 = 38500;
            const expectedResult5 = 38500;
            const expectedResult6 = 38500;
            const expectedResult7 = 0;
    
            kidList=[];
            kidList[0] = kidCreator(undefined, yearBorn, undefined, collegeCost);
            const result1 = returnAnnualKidCost(seekingYear1, kidList, monthlyCost);
            const result2 = returnAnnualKidCost(seekingYear2, kidList, monthlyCost);
            const result3 = returnAnnualKidCost(seekingYear3, kidList, monthlyCost);
            const result4 = returnAnnualKidCost(seekingYear4, kidList, monthlyCost);
            const result5 = returnAnnualKidCost(seekingYear5, kidList, monthlyCost);
            const result6 = returnAnnualKidCost(seekingYear6, kidList, monthlyCost);
            const result7 = returnAnnualKidCost(seekingYear7, kidList, monthlyCost);
    
            assert.strictEqual(result1, expectedResult1);
            assert.strictEqual(result2, expectedResult2);
            assert.strictEqual(result3, expectedResult3);
            assert.strictEqual(result4, expectedResult4);
            assert.strictEqual(result5, expectedResult5);
            assert.strictEqual(result6, expectedResult6);
            assert.strictEqual(result7, expectedResult7);
        });
        it('creates two kids with nonzero daycare and calls returnAnnualKidCost on early years',()=>{
            const yearBorn1=2024;
            const yearBorn2=2026;
            const dayCareCost=1000;
            const seekingYear1=2023;
            const seekingYear2=2025;
            const seekingYear3=2027;
            const seekingYear4=2029;
            const seekingYear5=2030;
            const expectedResult1 = 0;
            const expectedResult2 = 28500;
            const expectedResult3 = 57000;
            const expectedResult4 = 45000;
            const expectedResult5 = 33000;
    
            kidList=[];
            kidList[0] = kidCreator(undefined, yearBorn1, dayCareCost, undefined);
            kidList[1] = kidCreator(undefined, yearBorn2, dayCareCost, undefined);
            const result1 = returnAnnualKidCost(seekingYear1, kidList, monthlyCost);
            const result2 = returnAnnualKidCost(seekingYear2, kidList, monthlyCost);
            const result3 = returnAnnualKidCost(seekingYear3, kidList, monthlyCost);
            const result4 = returnAnnualKidCost(seekingYear4, kidList, monthlyCost);
            const result5 = returnAnnualKidCost(seekingYear5, kidList, monthlyCost);
    
            assert.strictEqual(result1, expectedResult1);
            assert.strictEqual(result2, expectedResult2);
            assert.strictEqual(result3, expectedResult3);
            assert.strictEqual(result4, expectedResult4);
            assert.strictEqual(result5, expectedResult5);
        });
        it('creates two kids and calls returnAnnualKidCost on college years',()=>{
            const yearBorn1=2030;
            const yearBorn2=2032;
            const collegeCost=50000;
            const seekingYear1=2048;
            const seekingYear2=2050;
            const seekingYear3=2051;
            const seekingYear4=2053;
            const seekingYear5=2055;
            const expectedResult1 = 33000;
            const expectedResult2 = 65000;
            const expectedResult3 = 97000;
            const expectedResult4 = 48500;
            const expectedResult5 = 0;
    
            kidList=[];
            kidList[0] = kidCreator(undefined, yearBorn1, undefined, collegeCost);
            kidList[1] = kidCreator(undefined, yearBorn2, undefined, collegeCost);
            const result1 = returnAnnualKidCost(seekingYear1, kidList, monthlyCost);
            const result2 = returnAnnualKidCost(seekingYear2, kidList, monthlyCost);
            const result3 = returnAnnualKidCost(seekingYear3, kidList, monthlyCost);
            const result4 = returnAnnualKidCost(seekingYear4, kidList, monthlyCost);
            const result5 = returnAnnualKidCost(seekingYear5, kidList, monthlyCost);
    
            assert.strictEqual(result1, expectedResult1);
            assert.strictEqual(result2, expectedResult2);
            assert.strictEqual(result3, expectedResult3);
            assert.strictEqual(result4, expectedResult4);
            assert.strictEqual(result5, expectedResult5);
        });
        it('creates three kids, two with daycare, and calls returnAnnualKidCost on some years',()=>{
            const yearBorn1=2025;
            const yearBorn2=2027;
            const yearBorn3=2031;
            const dayCareCost=1250;
            const collegeCost=50000;
            const seekingYear1=2028;
            const seekingYear2=2033;
            const seekingYear3=2044;
            const seekingYear4=2046;
            const seekingYear5=2051;
            const expectedResult1 = 63000;
            const expectedResult2 = 49500;
            const expectedResult3 = 81500;
            const expectedResult4 = 113500;
            const expectedResult5 = 48500;
    
            kidList=[];
            kidList[0] = kidCreator(undefined, yearBorn1, dayCareCost, collegeCost);
            kidList[1] = kidCreator(undefined, yearBorn2, dayCareCost, collegeCost);
            kidList[2] = kidCreator(undefined, yearBorn3, undefined, collegeCost);
            const result1 = returnAnnualKidCost(seekingYear1, kidList, monthlyCost);
            const result2 = returnAnnualKidCost(seekingYear2, kidList, monthlyCost);
            const result3 = returnAnnualKidCost(seekingYear3, kidList, monthlyCost);
            const result4 = returnAnnualKidCost(seekingYear4, kidList, monthlyCost);
            const result5 = returnAnnualKidCost(seekingYear5, kidList, monthlyCost);
    
            assert.strictEqual(result1, expectedResult1);
            assert.strictEqual(result2, expectedResult2);
            assert.strictEqual(result3, expectedResult3);
            assert.strictEqual(result4, expectedResult4);
            assert.strictEqual(result5, expectedResult5);
        });
    });
});