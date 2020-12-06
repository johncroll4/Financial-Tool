const assert = require('assert');
const personImports = require('../person.js');
const returnAnnualSalary = personImports.returnAnnualSalary;
const yearlyHouseSalary = personImports.yearlyHouseSalary;
const personCreator = personImports.personCreator;

describe('person calculations', ()=>{
    //setup
    let personList=[];
    describe('personCreateor', ()=>{
        describe('getters/setters', ()=>{
            it('creates a person and returns name',()=>{
                const name='John';
                const age=31;
                const salary=100000;
                const growth=.05;
                const bumps=[];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=0;
                const match=0;
                const expectedResult='John';
        
                const person = personCreator('SomeName', age, salary, growth, bumps, plateau, retirementYear, preTax, match);
                person.name=name;
                const result=person.name;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a person and returns pre tax contribution',()=>{
                const name='John';
                const age=31;
                const salary=100000;
                const growth=.05;
                const bumps=[];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=.05;
                const match=0;
                const expectedResult=.05;
        
                const person = personCreator(name, 59, salary, 0, bumps, plateau, retirementYear, 0, match);
                person.preTaxContribution=preTax;
                const result=person.preTaxContribution;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a person and returns company match',()=>{
                const name='John';
                const age=31;
                const salary=100000;
                const growth=.05;
                const bumps=[];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=.05;
                const match=.07;
                const expectedResult=.07;
        
                const person = personCreator(name, 59, salary, 0, bumps, plateau, retirementYear, 0, 0);
                person.companyMatch=match;
                const result=person.companyMatch;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a person and tries to set invalid pretax',()=>{
                const name='John';
                const age=31;
                const salary=100000;
                const growth=.05;
                const bumps=[];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=-1;
                const match=100;
                const expectedResult=.02;
        
                const person = personCreator(name, 59, salary, 0, bumps, plateau, retirementYear, 0, .02);
                person.companyMatch=match;
                const result=person.companyMatch;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a person and tries to set invalid company match',()=>{
                const name='John';
                const age=31;
                const salary=100000;
                const growth=.05;
                const bumps=[];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=.05;
                const match=100;
                const expectedResult=.02;
        
                const person = personCreator(name, 59, salary, 0, bumps, plateau, retirementYear, 0, .02);
                person.companyMatch=match;
                const result=person.companyMatch;
        
                assert.strictEqual(result, expectedResult);
            });
        });
        describe('age calculator method',()=>{
            it('creates a person and calculates age for a random year',()=>{
                const name='John';
                const age=30;
                const salary=100000;
                const growth=.05;
                const bumps=[];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=0;
                const match=0;
                const seekingYear=2030;
                const expectedResult=40;
        
                const person = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
                const result=person.age(seekingYear);
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a person and calculates age for another random year',()=>{
                const name='John';
                const age=30;
                const salary=100000;
                const growth=.05;
                const bumps=[];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=0;
                const match=0;
                const seekingYear=2040;
                const expectedResult=50;
        
                const person = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
                const result=person.age(seekingYear);
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a person and calculates age for an invalid year',()=>{
                const name='John';
                const age=30;
                const salary=100000;
                const growth=.05;
                const bumps=[];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=0;
                const match=0;
                const seekingYear=2300;
                const expectedResult=undefined;
        
                const person = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
                const result=person.age(seekingYear);
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a person and calculates age for a year thats too early',()=>{
                const name='John';
                const age=30;
                const salary=100000;
                const growth=.05;
                const bumps=[];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=0;
                const match=0;
                const seekingYear=2015;
                const expectedResult=undefined;
        
                const person = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
                const result=person.age(seekingYear);
        
                assert.strictEqual(result, expectedResult);
            });               
        });
        describe('yearly salary method', ()=>{
            it('creates a person and calculates salary for first year',()=>{
                const name='John';
                const age=30;
                const salary=100000;
                const growth=.05;
                const bumps=[];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=0;
                const match=0;
                const inflation=.02;
                const seekingYear=2020;
                const expectedResult=100000;
        
                const person = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
                const rawResult = person.yearlySalary(seekingYear, inflation);
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a person and calculates salary for second year',()=>{
                const name='John';
                const age=30;
                const salary=100000;
                const growth=.05;
                const bumps=[];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=0;
                const match=0;
                const inflation=.02;
                const seekingYear=2021;
                const expectedResult=103000;
        
                const person = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
                const rawResult = person.yearlySalary(seekingYear, inflation);
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a person and calculates salary for third year',()=>{
                const name='John';
                const age=30;
                const salary=100000;
                const growth=.05;
                const bumps=[];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=0;
                const match=0;
                const inflation=.02;
                const seekingYear=2022;
                const expectedResult=106090;
        
                const person = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
                const rawResult = person.yearlySalary(seekingYear, inflation);
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a person and calculates salary for a late year',()=>{
                const name='John';
                const age=30;
                const salary=100000;
                const growth=.05;
                const bumps=[];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=0;
                const match=0;
                const inflation=.02;
                const seekingYear=2048;
                const expectedResult=228792.77;
        
                const person = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
                const rawResult = person.yearlySalary(seekingYear, inflation);
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a person and calculates salary for after a salary bump year',()=>{
                const name='John';
                const age=30;
                const salary=100000;
                const growth=.05;
                const bumps=[[2045, .1]];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=0;
                const match=0;
                const inflation=.02;
                const seekingYear=2048;
                const expectedResult=251672.04;
        
                const person = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
                const rawResult = person.yearlySalary(seekingYear, inflation);
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a person and calculates salary for after two salary bumps',()=>{
                const name='John';
                const age=30;
                const salary=100000;
                const growth=.05;
                const bumps=[[2045, .1],[2040, .1]];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=0;
                const match=0;
                const inflation=.02;
                const seekingYear=2048;
                const expectedResult=276839.25;
        
                const person = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
                const rawResult = person.yearlySalary(seekingYear, inflation);
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a person and calculates salary for after two salary bumps, with different starting salary',()=>{
                const name='John';
                const age=30;
                const salary=65000;
                const growth=.05;
                const bumps=[[2025, .1],[2030, .1]];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=0;
                const match=0;
                const inflation=.02;
                const seekingYear=2035;
                const expectedResult=122534.14;
        
                const person = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
                const rawResult = person.yearlySalary(seekingYear, inflation);
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a person and calculates salary for after two salary bumps, with different growth and bump values',()=>{
                const name='John';
                const age=30;
                const salary=65000;
                const growth=.06;
                const bumps=[[2025, .05],[2030, .075]];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=0;
                const match=0;
                const inflation=.02;
                const seekingYear=2035;
                const expectedResult=132132.97;
        
                const person = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
                const rawResult = person.yearlySalary(seekingYear, inflation);
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a person and calculates salary for after two salary bumps and into plateau',()=>{
                const name='John';
                const age=30;
                const salary=65000;
                const growth=.06;
                const bumps=[[2025, .05],[2030, .075]];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=0;
                const match=0;
                const inflation=.02;
                const seekingYear=2055;
                const expectedResult=228811.56;
        
                const person = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
                const rawResult = person.yearlySalary(seekingYear, inflation);
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a person and calculates salary for after empty bumps array and into plateau',()=>{
                const name='John';
                const age=30;
                const salary=65000;
                const growth=.06;
                const bumps=[];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=0;
                const match=0;
                const inflation=.02;
                const seekingYear=2055;
                const expectedResult=202712.34;
        
                const person = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
                const rawResult = person.yearlySalary(seekingYear, inflation);
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a person and calculates salary for after two salary bumps, with no plateau array defined',()=>{
                const name='John';
                const age=30;
                const salary=65000;
                const growth=.06;
                const bumps=[[2025, .05],[2030, .075]];
                const plateau=[];
                const retirementYear=2060;
                const preTax=0;
                const match=0;
                const inflation=.02;
                const seekingYear=2035;
                const expectedResult=132132.97;
        
                const person = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
                const rawResult = person.yearlySalary(seekingYear, inflation);
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a person and calculates salary first retirement year, after two bumps and a plateau',()=>{
                const name='John';
                const age=30;
                const salary=65000;
                const growth=.06;
                const bumps=[[2025, .05],[2030, .075]];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=0;
                const match=0;
                const inflation=.02;
                const seekingYear=2060;
                const expectedResult=0;
        
                const person = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
                const rawResult = person.yearlySalary(seekingYear, inflation);
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a person and calculates salary first retirement year, after two bumps and a plateau',()=>{
                const name='John';
                const age=30;
                const salary=65000;
                const growth=.06;
                const bumps=[[2025, .05],[2030, .075]];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=0;
                const match=0;
                const inflation=.02;
                const seekingYear=2065;
                const expectedResult=0;
        
                const person = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
                const rawResult = person.yearlySalary(seekingYear, inflation);
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a person and calculates salary for after two salary bumps and into plateau, with pretax contribution',()=>{
                const name='John';
                const age=30;
                const salary=225000;
                const growth=.04;
                const bumps=[[2025, .05],[2030, .075]];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=.05;
                const match=0;
                const inflation=.02;
                const seekingYear=2055;
                const expectedResult=428458.60;
        
                const person = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
                const rawResult = person.yearlySalary(seekingYear, inflation);
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a person and calculates salary for after two salary bumps and into plateau, with pretax contribution',()=>{
                const name='John';
                const age=30;
                const salary=225000;
                const growth=.04;
                const bumps=[[2025, .05],[2030, .075]];
                const plateau=[2050, .02];
                const retirementYear=2060;
                const preTax=.05;
                const match=0;
                const inflation=.01;
                const seekingYear=2055;
                const expectedResult=603547.76;
        
                const person = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
                const rawResult = person.yearlySalary(seekingYear, inflation);
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });               
        });
    });
    describe('returnAnnualSalary', ()=>{
        it('creates a person and returns annual salary on first year', ()=>{
            const name='John';
            const age=30;
            const salary=100000;
            const growth=.05;
            const bumps=[];
            const plateau=[2050, .02];
            const retirementYear=2060;
            const preTax=0;
            const match=0;
            const inflation=.02;
            const seekingYear=2020;
            const expectedResult=100000;
    
            personList=[];
            personList[0] = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
            const rawResult = returnAnnualSalary(seekingYear, personList, inflation).annualSalary
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);                    
        });
        it('creates a person and calls return annual salary for year after two salary bumps and into plateau, with pretax contribution',()=>{
            const name='John';
            const age=30;
            const salary=225000;
            const growth=.04;
            const bumps=[[2025, .05],[2030, .075]];
            const plateau=[2050, .02];
            const retirementYear=2060;
            const preTax=.05;
            const match=0;
            const inflation=.01;
            const seekingYear=2055;
            const expectedResult=603547.76;
    
            personList=[];
            personList[0] = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
            const rawResult = returnAnnualSalary(seekingYear, personList, inflation).annualSalary
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates two people and calls return annual salary for an early year',()=>{
            const name1='John';
            const age1=30;
            const salary1=50000;
            const growth1=.06;
            const bumps1=[[2025, .1],[2030, .15]];
            const plateau1=[2055, .02];
            const retirementYear1=2060;
            const preTax1=0;
            const match1=0;
            const name2='Jamie';
            const age2=31;
            const salary2=100000;
            const growth2=.04;
            const bumps2=[[2028, .05],[2033, .075]];
            const plateau2=[2050, .02];
            const retirementYear2=2065;
            const preTax2=0;
            const match2=0;
            const inflation=.01;
            const seekingYear=2024;
            const expectedResult=173326.19;
    
            personList=[];
            personList[0] = personCreator(name1, age1, salary1, growth1, bumps1, plateau1, retirementYear1, preTax1, match1);
            personList[1] = personCreator(name2, age2, salary2, growth2, bumps2, plateau2, retirementYear2, preTax2, match2);
            const rawResult = returnAnnualSalary(seekingYear, personList, inflation).annualSalary
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates two people and calls return annual salary for a year after salary bumps',()=>{
            const name1='John';
            const age1=30;
            const salary1=50000;
            const growth1=.06;
            const bumps1=[[2025, .1],[2030, .15]];
            const plateau1=[2055, .02];
            const retirementYear1=2060;
            const preTax1=0;
            const match1=0;
            const name2='Jamie';
            const age2=31;
            const salary2=100000;
            const growth2=.04;
            const bumps2=[[2028, .05],[2033, .075]];
            const plateau2=[2050, .02];
            const retirementYear2=2065;
            const preTax2=0;
            const match2=0;
            const inflation=.01;
            const seekingYear=2032;
            const expectedResult=263292.81;
    
            personList=[];
            personList[0] = personCreator(name1, age1, salary1, growth1, bumps1, plateau1, retirementYear1, preTax1, match1);
            personList[1] = personCreator(name2, age2, salary2, growth2, bumps2, plateau2, retirementYear2, preTax2, match2);
            const rawResult = returnAnnualSalary(seekingYear, personList, inflation).annualSalary
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates two people and calls return annual salary for a year after bumps for one person',()=>{
            const name1='John';
            const age1=30;
            const salary1=50000;
            const growth1=.06;
            const bumps1=[];
            const plateau1=[2055, .02];
            const retirementYear1=2060;
            const preTax1=0;
            const match1=0;
            const name2='Jamie';
            const age2=31;
            const salary2=100000;
            const growth2=.04;
            const bumps2=[[2028, .05],[2033, .075]];
            const plateau2=[2050, .02];
            const retirementYear2=2065;
            const preTax2=0;
            const match2=0;
            const inflation=.01;
            const seekingYear=2035;
            const expectedResult=279801.98;
    
            personList=[];
            personList[0] = personCreator(name1, age1, salary1, growth1, bumps1, plateau1, retirementYear1, preTax1, match1);
            personList[1] = personCreator(name2, age2, salary2, growth2, bumps2, plateau2, retirementYear2, preTax2, match2);
            const rawResult = returnAnnualSalary(seekingYear, personList, inflation).annualSalary
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates two people and calls return annual salary for a year in plateau for both people',()=>{
            const name1='John';
            const age1=30;
            const salary1=50000;
            const growth1=.06;
            const bumps1=[[2028, .05],[2033, .075]];
            const plateau1=[2055, .02];
            const retirementYear1=2060;
            const preTax1=.05;
            const match1=0;
            const name2='Jamie';
            const age2=31;
            const salary2=100000;
            const growth2=.04;
            const bumps2=[[2028, .05],[2033, .075]];
            const plateau2=[2050, .02];
            const retirementYear2=2065;
            const preTax2=.05;
            const match2=0;
            const inflation=.01;
            const seekingYear=2056;
            const expectedResult=558248.82;
    
            personList=[];
            personList[0] = personCreator(name1, age1, salary1, growth1, bumps1, plateau1, retirementYear1, preTax1, match1);
            personList[1] = personCreator(name2, age2, salary2, growth2, bumps2, plateau2, retirementYear2, preTax2, match2);
            const rawResult = returnAnnualSalary(seekingYear, personList, inflation).annualSalary
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates two people and calls return annual salary for a year in retirement for both people',()=>{
            const name1='John';
            const age1=30;
            const salary1=50000;
            const growth1=.06;
            const bumps1=[[2028, .05],[2033, .075]];
            const plateau1=[2055, .02];
            const retirementYear1=2060;
            const preTax1=.05;
            const match1=0;
            const name2='Jamie';
            const age2=31;
            const salary2=100000;
            const growth2=.04;
            const bumps2=[[2028, .05],[2033, .075]];
            const plateau2=[2050, .02];
            const retirementYear2=2065;
            const preTax2=.05;
            const match2=0;
            const inflation=.01;
            const seekingYear=2066;
            const expectedResult=0;
    
            personList=[];
            personList[0] = personCreator(name1, age1, salary1, growth1, bumps1, plateau1, retirementYear1, preTax1, match1);
            personList[1] = personCreator(name2, age2, salary2, growth2, bumps2, plateau2, retirementYear2, preTax2, match2);
            const rawResult = returnAnnualSalary(seekingYear, personList, inflation).annualSalary
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates two people and calls return annual salary for a year in retirement for one person',()=>{
            const name1='John';
            const age1=30;
            const salary1=50000;
            const growth1=.06;
            const bumps1=[[2028, .05],[2033, .075]];
            const plateau1=[2055, .02];
            const retirementYear1=2060;
            const preTax1=.05;
            const match1=0;
            const name2='Jamie';
            const age2=31;
            const salary2=100000;
            const growth2=.04;
            const bumps2=[[2028, .05],[2033, .075]];
            const plateau2=[2050, .02];
            const retirementYear2=2065;
            const preTax2=.05;
            const match2=0;
            const inflation=.01;
            const seekingYear=2063;
            const expectedResult=290469.22;
    
            personList=[];
            personList[0] = personCreator(name1, age1, salary1, growth1, bumps1, plateau1, retirementYear1, preTax1, match1);
            personList[1] = personCreator(name2, age2, salary2, growth2, bumps2, plateau2, retirementYear2, preTax2, match2);
            const rawResult = returnAnnualSalary(seekingYear, personList, inflation).annualSalary
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates two people and calls return annual salary for a year in plateau for both people, checking if salary values add up correctly',()=>{
            const name1='John';
            const age1=30;
            const salary1=50000;
            const growth1=.06;
            const bumps1=[[2028, .05],[2033, .075]];
            const plateau1=[2055, .02];
            const retirementYear1=2060;
            const preTax1=.05;
            const match1=0;
            const name2='Jamie';
            const age2=31;
            const salary2=100000;
            const growth2=.04;
            const bumps2=[[2028, .05],[2033, .075]];
            const plateau2=[2050, .02];
            const retirementYear2=2065;
            const preTax2=.05;
            const match2=0;
            const inflation=.01;
            const seekingYear=2056;
            const expectedResult=0;
    
            personList=[];
            personList[0] = personCreator(name1, age1, salary1, growth1, bumps1, plateau1, retirementYear1, preTax1, match1);
            personList[1] = personCreator(name2, age2, salary2, growth2, bumps2, plateau2, retirementYear2, preTax2, match2);
            const rawResultTotal = returnAnnualSalary(seekingYear, personList, inflation).annualSalary
            const resultTotal=parseFloat((Math.round(rawResultTotal * 100 ) / 100).toFixed(2));
            const rawSalary1=returnAnnualSalary(seekingYear, personList, inflation).annualSalaryValues[0];
            const salaryResult1=parseFloat((Math.round(rawSalary1 * 100 ) / 100).toFixed(2));
            const rawSalary2=returnAnnualSalary(seekingYear, personList, inflation).annualSalaryValues[1];
            const salaryResult2=parseFloat((Math.round(rawSalary2 * 100 ) / 100).toFixed(2));
            const rawResult = salaryResult1 + salaryResult2 - resultTotal;
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
    });
    describe('yearlyHouseSalary', ()=>{
        it('creates a person and returns yearly house salary on first year', ()=>{
            const name='John';
            const age=30;
            const salary=100000;
            const growth=.05;
            const bumps=[];
            const plateau=[2050, .02];
            const retirementYear=2060;
            const preTax=0;
            const match=0;
            const inflation=.02;
            const seekingYear=2020;
            const expectedResult=84896.50;
    
            personList=[];
            personList[0] = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
            const rawResult = yearlyHouseSalary(seekingYear, personList, inflation).netSalary
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);                    
        });
        it('creates a person and calls yearly house salary for year after two salary bumps and into plateau, with pretax contribution',()=>{
            const name='John';
            const age=30;
            const salary=225000;
            const growth=.04;
            const bumps=[[2025, .05],[2030, .075]];
            const plateau=[2050, .02];
            const retirementYear=2060;
            const preTax=.05;
            const match=0;
            const inflation=.01;
            const seekingYear=2055;
            const expectedResult=420396.09;
    
            personList=[];
            personList[0] = personCreator(name, age, salary, growth, bumps, plateau, retirementYear, preTax, match);
            const rawResult = yearlyHouseSalary(seekingYear, personList, inflation).netSalary;
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates two people and calls yearly house salary for an early year',()=>{
            const name1='John';
            const age1=30;
            const salary1=50000;
            const growth1=.06;
            const bumps1=[[2025, .1],[2030, .15]];
            const plateau1=[2055, .02];
            const retirementYear1=2060;
            const preTax1=0;
            const match1=0;
            const name2='Jamie';
            const age2=31;
            const salary2=100000;
            const growth2=.04;
            const bumps2=[[2028, .05],[2033, .075]];
            const plateau2=[2050, .02];
            const retirementYear2=2065;
            const preTax2=0;
            const match2=0;
            const inflation=.01;
            const seekingYear=2024;
            const expectedResult=149070.43;
    
            personList=[];
            personList[0] = personCreator(name1, age1, salary1, growth1, bumps1, plateau1, retirementYear1, preTax1, match1);
            personList[1] = personCreator(name2, age2, salary2, growth2, bumps2, plateau2, retirementYear2, preTax2, match2);
            const rawResult = yearlyHouseSalary(seekingYear, personList, inflation).netSalary;
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates two people and calls yearly house salary for a year after salary bumps',()=>{
            const name1='John';
            const age1=30;
            const salary1=50000;
            const growth1=.06;
            const bumps1=[[2025, .1],[2030, .15]];
            const plateau1=[2055, .02];
            const retirementYear1=2060;
            const preTax1=0;
            const match1=0;
            const name2='Jamie';
            const age2=31;
            const salary2=100000;
            const growth2=.04;
            const bumps2=[[2028, .05],[2033, .075]];
            const plateau2=[2050, .02];
            const retirementYear2=2065;
            const preTax2=0;
            const match2=0;
            const inflation=.01;
            const seekingYear=2032;
            const expectedResult=217895.53;
    
            personList=[];
            personList[0] = personCreator(name1, age1, salary1, growth1, bumps1, plateau1, retirementYear1, preTax1, match1);
            personList[1] = personCreator(name2, age2, salary2, growth2, bumps2, plateau2, retirementYear2, preTax2, match2);
            const rawResult = yearlyHouseSalary(seekingYear, personList, inflation).netSalary;
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates two people and calls yearly house salary for a year after bumps for one person',()=>{
            const name1='John';
            const age1=30;
            const salary1=50000;
            const growth1=.06;
            const bumps1=[];
            const plateau1=[2055, .02];
            const retirementYear1=2060;
            const preTax1=0;
            const match1=0;
            const name2='Jamie';
            const age2=31;
            const salary2=100000;
            const growth2=.04;
            const bumps2=[[2028, .05],[2033, .075]];
            const plateau2=[2050, .02];
            const retirementYear2=2065;
            const preTax2=0;
            const match2=0;
            const inflation=.01;
            const seekingYear=2035;
            const expectedResult=230442.51;
    
            personList=[];
            personList[0] = personCreator(name1, age1, salary1, growth1, bumps1, plateau1, retirementYear1, preTax1, match1);
            personList[1] = personCreator(name2, age2, salary2, growth2, bumps2, plateau2, retirementYear2, preTax2, match2);
            const rawResult = yearlyHouseSalary(seekingYear, personList, inflation).netSalary;
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates two people and calls yearly house salary for a year in plateau for both people',()=>{
            const name1='John';
            const age1=30;
            const salary1=50000;
            const growth1=.06;
            const bumps1=[[2028, .05],[2033, .075]];
            const plateau1=[2055, .02];
            const retirementYear1=2060;
            const preTax1=.05;
            const match1=0;
            const name2='Jamie';
            const age2=31;
            const salary2=100000;
            const growth2=.04;
            const bumps2=[[2028, .05],[2033, .075]];
            const plateau2=[2050, .02];
            const retirementYear2=2065;
            const preTax2=.05;
            const match2=0;
            const inflation=.01;
            const seekingYear=2056;
            const expectedResult=421951.73;
    
            personList=[];
            personList[0] = personCreator(name1, age1, salary1, growth1, bumps1, plateau1, retirementYear1, preTax1, match1);
            personList[1] = personCreator(name2, age2, salary2, growth2, bumps2, plateau2, retirementYear2, preTax2, match2);
            const rawResult = yearlyHouseSalary(seekingYear, personList, inflation).netSalary;
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates two people and calls return yearly house salary for a year in retirement for both people',()=>{
            const name1='John';
            const age1=30;
            const salary1=50000;
            const growth1=.06;
            const bumps1=[[2028, .05],[2033, .075]];
            const plateau1=[2055, .02];
            const retirementYear1=2060;
            const preTax1=.05;
            const match1=0;
            const name2='Jamie';
            const age2=31;
            const salary2=100000;
            const growth2=.04;
            const bumps2=[[2028, .05],[2033, .075]];
            const plateau2=[2050, .02];
            const retirementYear2=2065;
            const preTax2=.05;
            const match2=0;
            const inflation=.01;
            const seekingYear=2066;
            const expectedResult=0;
    
            personList=[];
            personList[0] = personCreator(name1, age1, salary1, growth1, bumps1, plateau1, retirementYear1, preTax1, match1);
            personList[1] = personCreator(name2, age2, salary2, growth2, bumps2, plateau2, retirementYear2, preTax2, match2);
            const rawResult = yearlyHouseSalary(seekingYear, personList, inflation).netSalary;
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates two people and calls return yearly house salary for a year in retirement for one person',()=>{
            const name1='John';
            const age1=30;
            const salary1=50000;
            const growth1=.06;
            const bumps1=[[2028, .05],[2033, .075]];
            const plateau1=[2055, .02];
            const retirementYear1=2060;
            const preTax1=.05;
            const match1=0;
            const name2='Jamie';
            const age2=31;
            const salary2=100000;
            const growth2=.04;
            const bumps2=[[2028, .05],[2033, .075]];
            const plateau2=[2050, .02];
            const retirementYear2=2065;
            const preTax2=.05;
            const match2=0;
            const inflation=.01;
            const seekingYear=2063;
            const expectedResult=238549.61;
    
            personList=[];
            personList[0] = personCreator(name1, age1, salary1, growth1, bumps1, plateau1, retirementYear1, preTax1, match1);
            personList[1] = personCreator(name2, age2, salary2, growth2, bumps2, plateau2, retirementYear2, preTax2, match2);
            const rawResult = yearlyHouseSalary(seekingYear, personList, inflation).netSalary;
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);
        });
        it('creates two people and calls yearly house salary for a year in plateau for both people, checking if salary values add up correctly',()=>{
            const name1='John';
            const age1=30;
            const salary1=50000;
            const growth1=.06;
            const bumps1=[[2028, .05],[2033, .075]];
            const plateau1=[2055, .02];
            const retirementYear1=2060;
            const preTax1=.05;
            const match1=0;
            const name2='Jamie';
            const age2=31;
            const salary2=100000;
            const growth2=.04;
            const bumps2=[[2028, .05],[2033, .075]];
            const plateau2=[2050, .02];
            const retirementYear2=2065;
            const preTax2=.05;
            const match2=0;
            const inflation=.01;
            const seekingYear=2056;
            const expectedResult=0;
    
            personList=[];
            personList[0] = personCreator(name1, age1, salary1, growth1, bumps1, plateau1, retirementYear1, preTax1, match1);
            personList[1] = personCreator(name2, age2, salary2, growth2, bumps2, plateau2, retirementYear2, preTax2, match2);
            const returnAnnualSalaryResult = returnAnnualSalary(seekingYear, personList, inflation).annualSalaryValues;
            const yearlyHouseSalaryResult = yearlyHouseSalary(seekingYear, personList, inflation).salaryValues
            
            assert.deepStrictEqual(returnAnnualSalaryResult, yearlyHouseSalaryResult);
        });
    });
});

