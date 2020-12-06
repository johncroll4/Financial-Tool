const assert = require('assert');
const retirementImports = require('../retirement.js');
const RegInvestment = retirementImports.RegInvestment;
const RothIRA = retirementImports.RothIRA;
const F401k = retirementImports.F401k;
const balanceYearOfCashFlow = retirementImports.balanceYearOfCashFlow;
const processRMDs = retirementImports.processRMDs;
const growAccounts = retirementImports.growAccounts;
const increase401ks = retirementImports.increase401ks;
const returnAccountValues = retirementImports.returnAccountValues;
const findElementIndex = retirementImports.findElementIndex;
const rmdFactor = retirementImports.rmdFactor;
const personImports = require('../person.js');
const personCreator = personImports.personCreator;


describe('financial and retirement account calculations', ()=>{
    //setup
    let personList=[];
    describe('Investment', ()=>{
        describe('creator getters and setters',()=>{
            it('creates an account and sets name',()=>{
                const name='Account1';
                const value=50000;
                const growth=.05;
                const owner='John';
                personList=[];
                personList[0] = personCreator(owner, 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedResult='Account1';
        
                const account = new RegInvestment('SomeAccount', value, growth, owner, personList);
                account.name=name;
                const result=account.name;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates an account and sets invalid name',()=>{
                const name=10;
                const value=50000;
                const growth=.05;
                const owner='John';
                personList=[];
                personList[0] = personCreator(owner, 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedResult='SomeAccount';
        
                const account = new RegInvestment('SomeAccount', value, growth, owner, personList);
                account.name=name;
                const result=account.name;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates an account and sets current value',()=>{
                const name='Account1';
                const value=50000;
                const growth=.05;
                const owner='John';
                personList=[];
                personList[0] = personCreator(owner, 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedResult=50000;
        
                const account = new RegInvestment('SomeAccount', 0, growth, owner, personList);
                account.currentValue=value;
                const result=account.currentValue;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates an account and sets invalid current value',()=>{
                const name=10;
                const value='Hello';
                const growth=.05;
                const owner='John';
                personList=[];
                personList[0] = personCreator(owner, 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedResult=0;
        
                const account = new RegInvestment('SomeAccount', 0, growth, owner, personList);
                account.currentValue=value;
                const result=account.currentValue;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates an account and sets growth',()=>{
                const name='Account1';
                const value=50000;
                const growth=.05;
                const owner='John';
                personList=[];
                personList[0] = personCreator(owner, 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedResult=.05;
        
                const account = new RegInvestment(name, value, 0, owner, personList);
                account.growth=growth;
                const result=account.growth;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates an account and sets invalid growth',()=>{
                const name=10;
                const value='Hello';
                const growth='growth';
                const owner='John';
                personList=[];
                personList[0] = personCreator(owner, 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedResult=0;
        
                const account = new RegInvestment(name, value, 0, owner, personList);
                account.growth=growth;
                const result=account.growth;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates an account and sets owner',()=>{
                const name='Account1';
                const value=50000;
                const growth=.05;
                const owner='John';
                personList=[];
                personList[0] = personCreator(owner, 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedResult='John';
        
                const account = new RegInvestment(name, value, growth, 'fred', personList);
                account.owner=owner;
                const result=account.owner;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates an account and sets invalid owner',()=>{
                const name=10;
                const value='Hello';
                const owner=10;
                personList=[];
                personList[0] = personCreator('Owner', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedResult='John';
        
                const account = new RegInvestment(name, value, 0, 'John', personList);
                account.owner=owner;
                const result=account.owner;
        
                assert.strictEqual(result, expectedResult);
            });               
        });
        describe('grow', ()=>{
            it('creates an account and grows it against zero inflation',()=>{
                const value=100000;
                const growth=.05;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedResult=105000;
        
                const account = new RegInvestment('Name', value, growth, 'John', personList, 0);
                account.grow();
                const result=account.currentValue;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates an account and grows it against nonzero inflation',()=>{
                const value=100000;
                const growth=.05;
                const inflation=.01;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedResult=104000;
        
                const account = new RegInvestment('Name', value, growth, 'John', personList, inflation);
                account.grow();
                const result=account.currentValue;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates an account and grows different value against nonzero inflation',()=>{
                const value=550000;
                const growth=.05;
                const inflation=.01;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedResult=572000;
        
                const account = new RegInvestment('Name', value, growth, 'John', personList, inflation);
                account.grow();
                const result=account.currentValue;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates an account and applies zero growth it against nonzero inflation',()=>{
                const value=100000;
                const growth=0;
                const inflation=.01;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedResult=99000;
        
                const account = new RegInvestment('Name', value, growth, 'John', personList, inflation);
                account.grow();
                const result=account.currentValue;
        
                assert.strictEqual(result, expectedResult);
            });             
        });
    });
    describe('RegInvestment', ()=>{
        describe('creator', ()=>{
            it('creates a regular investment account, sets name and returns name',()=>{
                const name='Account1';
                const value=50000;
                const growth=.05;
                const owner='John';
                personList=[];
                personList[0] = personCreator(owner, 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedResult='Account1';
        
                const account = new RegInvestment('SomeAccount', value, growth, owner, personList);
                account.name=name;
                const result=account.name;
        
                assert.strictEqual(result, expectedResult);
            });
        });
        describe('add money',()=>{
            it('creates a regular investment account and adds money, returns current value',()=>{
                const value=100000;
                const year=2020;
                const addValue=10000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedResult=110000;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                account.addMoney(year, addValue);
                const result=account.currentValue;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a regular investment account and adds different value, returns current value',()=>{
                const value=700000;
                const year=2020;
                const addValue=65000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedResult=765000;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                account.addMoney(year, addValue);
                const result=account.currentValue;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a regular investment account and adds negative money, returns current value',()=>{
                const value=700000;
                const year=2020;
                const addValue=-65000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedResult=700000;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                account.addMoney(year, addValue);
                const result=account.currentValue;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a regular investment account and adds money, tests return value (zero) of add money method',()=>{
                const value=700000;
                const year=2020;
                const addValue=65000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedResult=0;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const result=account.addMoney(year, addValue);;
        
                assert.strictEqual(result, expectedResult);
            });             
        });
        describe('withdraw money', ()=>{
            it('creates a regular investment account and tries to withdraw positive amount',()=>{
                const value=200000;
                const year=2020;
                const withdrawAmount=10000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=200000;
                const expectedReturnResult=undefined;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResult=account.withdrawMoney(year, withdrawAmount);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a regular investment account and withdraws amount less than 40k, less than account value',()=>{
                const value=200000;
                const year=2020;
                const withdrawAmount=-10000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=190000;
                const expectedReturnResult=10000;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResult=account.withdrawMoney(year, withdrawAmount);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a regular investment account and withdraws 40k, less than account value',()=>{
                const value=200000;
                const year=2020;
                const withdrawAmount=-40000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=160000;
                const expectedReturnResult=40000;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResult=account.withdrawMoney(year, withdrawAmount);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a regular investment account and withdraws amount more than 40k, less than account value',()=>{
                const value=200000;
                const year=2020;
                const withdrawAmount=-100000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=89411.76;
                const expectedReturnResult=100000;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResultRaw=account.currentValue;
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a regular investment account and withdraws different amount more than 40k, less than account value',()=>{
                const value=350000;
                const year=2020;
                const withdrawAmount=-80000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=262941.18;
                const expectedReturnResult=80000;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResultRaw=account.currentValue;
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a regular investment account and withdraws amount more than 400k, less than account value',()=>{
                const value=2000000;
                const year=2020;
                const withdrawAmount=-1000000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=789518.38;
                const expectedReturnResult=1000000;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResultRaw=account.currentValue;
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a regular investment account and withdraws different amount more than 400k, less than account value',()=>{
                const value=965000;
                const year=2020;
                const withdrawAmount=-600000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=254518.38;
                const expectedReturnResult=600000;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResultRaw=account.currentValue;
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a regular investment account and withdraws amount less than 40k, more than account value',()=>{
                const value=20000;
                const year=2020;
                const withdrawAmount=-30000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=0;
                const expectedReturnResult=20000;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResult=account.withdrawMoney(year, withdrawAmount);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a regular investment account and withdraws amount more than 40k, more than account value',()=>{
                const value=50000;
                const year=2020;
                const withdrawAmount=-60000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=0;
                const expectedReturnResult=48500;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a regular investment account and withdraws amount more than 400k, more than account value',()=>{
                const value=500000;
                const year=2020;
                const withdrawAmount=-600000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=0;
                const expectedReturnResult=428072.5;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a regular investment account and withdraws amount more than 40k, less than account value but close enough where tax takes it over',()=>{
                const value=50000;
                const year=2020;
                const withdrawAmount=-49000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=0;
                const expectedReturnResult=48500;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            }); 
            it('creates a regular investment account and withdraws amount more than 441k, less than account value but close enough where tax takes it over',()=>{
                const value=500000;
                const year=2020;
                const withdrawAmount=-475000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=0;
                const expectedReturnResult=428072.5;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a regular investment account with two people and tries to withdraw positive amount',()=>{
                const value=200000;
                const year=2020;
                const withdrawAmount=10000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                personList[1] = personCreator('Name2', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=200000;
                const expectedReturnResult=undefined;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResult=account.withdrawMoney(year, withdrawAmount);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a regular investment account with two people and withdraws amount less than 80k, less than account value',()=>{
                const value=200000;
                const year=2020;
                const withdrawAmount=-50000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                personList[1] = personCreator('Name2', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=150000;
                const expectedReturnResult=50000;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResult=account.withdrawMoney(year, withdrawAmount);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a regular investment account with two people and withdraws 80k, less than account value',()=>{
                const value=200000;
                const year=2020;
                const withdrawAmount=-80000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                personList[1] = personCreator('Name2', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=120000;
                const expectedReturnResult=80000;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResult=account.withdrawMoney(year, withdrawAmount);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a regular investment account with two people and withdraws more than 80k, less than account value',()=>{
                const value=200000;
                const year=2020;
                const withdrawAmount=-100000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                personList[1] = personCreator('Name2', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=96470.59;
                const expectedReturnResult=100000;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResultRaw=account.currentValue;
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a regular investment account with two people and withdraws different amount more than 80k, less than account value',()=>{
                const value=350000;
                const year=2020;
                const withdrawAmount=-120000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                personList[1] = personCreator('Name2', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=222941.18;
                const expectedReturnResult=120000;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResultRaw=account.currentValue;
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a regular investment account with two people and withdraws amount more than 500k, less than account value',()=>{
                const value=2000000;
                const year=2020;
                const withdrawAmount=-1000000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                personList[1] = personCreator('Name2', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=800632.35;
                const expectedReturnResult=1000000;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResultRaw=account.currentValue;
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
                
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a regular investment account with two people and withdraws different amount more than 500k, less than account value',()=>{
                const value=965000;
                const year=2020;
                const withdrawAmount=-600000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                personList[1] = personCreator('Name2', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=265632.35;
                const expectedReturnResult=600000;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResultRaw=account.currentValue;
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a regular investment account with two people and withdraws amount less than 80k, more than account value',()=>{
                const value=50000;
                const year=2020;
                const withdrawAmount=-60000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                personList[1] = personCreator('Name2', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=0;
                const expectedReturnResult=50000;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResultRaw=account.currentValue;
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a regular investment account with two people and withdraws amount more than 80k, more than account value',()=>{
                const value=100000;
                const year=2020;
                const withdrawAmount=-120000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                personList[1] = personCreator('Name2', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=0;
                const expectedReturnResult=97000;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a regular investment account with two people and withdraws amount more than 500k, more than account value',()=>{
                const value=600000;
                const year=2020;
                const withdrawAmount=-700000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                personList[1] = personCreator('Name2', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=0;
                const expectedReturnResult=516830;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a regular investment account with two people and withdraws amount more than 80k, less than account value but close enough where tax takes it over',()=>{
                const value=90000;
                const year=2020;
                const withdrawAmount=-89000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                personList[1] = personCreator('Name2', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=0;
                const expectedReturnResult=88500;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            }); 
            it('creates a regular investment account with two people and withdraws amount more than 500k, less than account value but close enough where tax takes it over',()=>{
                const value=600000;
                const year=2020;
                const withdrawAmount=-575000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                personList[1] = personCreator('Name2', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=0;
                const expectedReturnResult=516830;
        
                const account = new RegInvestment('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });            
        });
    });
    describe('RothIRA', ()=>{
        describe('creator', ()=>{
            it('creates a RothIRA account, sets name and returns name',()=>{
                const name='Account2';
                const value=50000;
                const growth=.05;
                const owner='John';
                personList=[];
                personList[0] = personCreator(owner, 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedResult='Account2';
        
                const account = new RothIRA('SomeAccount', value, growth, owner, personList);
                account.name=name;
                const result=account.name;
        
                assert.strictEqual(result, expectedResult);
            });
        });
        describe('add money',()=>{
            it('creates a RothIRA account and adds money for an invalid early year',()=>{
                const value=100000;
                const year=2010;
                const addValue=5000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=100000;
                const expectedReturnResult=undefined;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.addMoney(year, addValue);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account and adds money for an invalid late year',()=>{
                const value=100000;
                const year=2210;
                const addValue=5000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=100000;
                const expectedReturnResult=undefined;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.addMoney(year, addValue);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account and tries to add negative money',()=>{
                const value=100000;
                const year=2020;
                const addValue=-5000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=100000;
                const expectedReturnResult=undefined;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.addMoney(year, addValue);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account and tries to add money for a person with salary above cutoff',()=>{
                const value=100000;
                const year=2020;
                const addValue=5000;
                personList=[];
                personList[0] = personCreator('Name', 30, 140000, .05, [], [], 2060, 0, 0);
                const expectedCurrentResult=100000;
                const expectedReturnResult=5000;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.addMoney(year, addValue);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account and tries to add money for a person with starting salary below cutoff, salary in relevant year above',()=>{
                const value=100000;
                const year=2030;
                const addValue=5000;
                personList=[];
                personList[0] = personCreator('Name', 30, 120000, .05, [], [], 2060, 0, 0);
                const expectedCurrentResult=100000;
                const expectedReturnResult=5000;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.addMoney(year, addValue);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account and tries to add money for a person with starting salary above cutoff, but pre tax contribution takes it under',()=>{
                const value=100000;
                const year=2020;
                const addValue=5000;
                personList=[];
                personList[0] = personCreator('Name', 30, 140000, .05, [], [], 2060, .05, 0);
                const expectedCurrentResult=105000;
                const expectedReturnResult=0;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.addMoney(year, addValue);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account and tries to add money for two people with starting salary above cutoff',()=>{
                const value=100000;
                const year=2020;
                const addValue=5000;
                personList=[];
                personList[0] = personCreator('Name', 30, 150000, .05, [], [], 2060, 0, 0);
                personList[1] = personCreator('Name2', 30, 60000, .05, [], [], 2060, 0, 0);
                const expectedCurrentResult=100000;
                const expectedReturnResult=5000;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.addMoney(year, addValue);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account and tries to add money for two people with starting salary below cutoff but growing to above cutoff',()=>{
                const value=100000;
                const year=2030;
                const addValue=5000;
                personList=[];
                personList[0] = personCreator('Name', 30, 140000, .05, [], [], 2060, 0, 0);
                personList[1] = personCreator('Name2', 30, 50000, .05, [], [], 2060, 0, 0);
                const expectedCurrentResult=100000;
                const expectedReturnResult=5000;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.addMoney(year, addValue);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account and tries to add money for two people with starting salary above cutoff but pre tax brings it below',()=>{
                const value=100000;
                const year=2020;
                const addValue=5000;
                personList=[];
                personList[0] = personCreator('Name', 30, 150000, .05, [], [], 2060, .05, 0);
                personList[1] = personCreator('Name2', 30, 60000, .05, [], [], 2060, .05, 0);
                const expectedCurrentResult=105000;
                const expectedReturnResult=0;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.addMoney(year, addValue);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account and tries to add more than 6k for one person with appropriate salary',()=>{
                const value=100000;
                const year=2020;
                const addValue=10000;
                personList=[];
                personList[0] = personCreator('Name', 30, 120000, .05, [], [], 2060, 0, 0);
                const expectedCurrentResult=106000;
                const expectedReturnResult=4000;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.addMoney(year, addValue);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account and tries to add more than 6k for two people with appropriate salaries',()=>{
                const value=100000;
                const year=2020;
                const addValue=10000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, 0, 0);
                personList[1] = personCreator('Name2', 30, 60000, .05, [], [], 2060, 0, 0);
                const expectedCurrentResult=106000;
                const expectedReturnResult=4000;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.addMoney(year, addValue);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account and adds 6k for one person with appropriate salary',()=>{
                const value=100000;
                const year=2020;
                const addValue=6000;
                personList=[];
                personList[0] = personCreator('Name', 30, 120000, .05, [], [], 2060, 0, 0);
                const expectedCurrentResult=106000;
                const expectedReturnResult=0;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.addMoney(year, addValue);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account and adds 6k for two people with appropriate salaries',()=>{
                const value=100000;
                const year=2020;
                const addValue=6000;
                personList=[];
                personList[0] = personCreator('Name', 30, 120000, .05, [], [], 2060, 0, 0);
                personList[1] = personCreator('Name2', 30, 60000, .05, [], [], 2060, 0, 0);
                const expectedCurrentResult=106000;
                const expectedReturnResult=0;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.addMoney(year, addValue);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });  
            it('creates a RothIRA account and adds 4k for two people with appropriate salaries',()=>{
                const value=100000;
                const year=2020;
                const addValue=4000;
                personList=[];
                personList[0] = personCreator('Name', 30, 120000, .05, [], [], 2060, 0, 0);
                personList[1] = personCreator('Name2', 30, 60000, .05, [], [], 2060, 0, 0);
                const expectedCurrentResult=104000;
                const expectedReturnResult=0;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.addMoney(year, addValue);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });              
        });
        describe('withdraw money', ()=>{
            it('creates a Roth IRA and tries to withdraw positive money',()=>{
                const value=250000;
                const year=2020;
                const withdrawValue=5000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=250000;
                const expectedReturnResult=undefined;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.withdrawMoney(year, withdrawValue);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a Roth IRA and withdraws 5k (less than current value)',()=>{
                const value=250000;
                const year=2020;
                const withdrawValue=-5000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=245000;
                const expectedReturnResult=5000;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.withdrawMoney(year, withdrawValue);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a Roth IRA and withdraws 50k (less than current value)',()=>{
                const value=250000;
                const year=2020;
                const withdrawValue=-50000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=200000;
                const expectedReturnResult=50000;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.withdrawMoney(year, withdrawValue);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a Roth IRA and withdraws 500k (more than current value)',()=>{
                const value=250000;
                const year=2020;
                const withdrawValue=-500000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=0;
                const expectedReturnResult=250000;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.withdrawMoney(year, withdrawValue);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            }); 
            it('creates a Roth IRA with two people and withdraws 50k (less than current value)',()=>{
                const value=250000;
                const year=2020;
                const withdrawValue=-50000;
                personList=[];
                personList[0] = personCreator('Name', 30, 100000, .05, [], [], 2060, .05, .075);
                personList[1] = personCreator('Name2', 30, 100200, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=200000;
                const expectedReturnResult=50000;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.withdrawMoney(year, withdrawValue);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });            
        });
        describe('getRMD', ()=>{
            it('creates a RothIRA account and gets RMD for an invalid early year',()=>{
                const value=777777;
                const year=2010;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=777777;
                const expectedReturnResult=undefined;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.getRMD(year);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account and gets RMD for an invalid late year',()=>{
                const value=777777;
                const year=2210;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=777777;
                const expectedReturnResult=undefined;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.getRMD(year);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account and gets RMD for a year when owner is too young for RMD',()=>{
                const value=777777;
                const year=2030;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=777777;
                const expectedReturnResult=0;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.getRMD(year);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account and gets RMD for a year when owner is old enough for RMD',()=>{
                const value=777777;
                const year=2030;
                personList=[];
                personList[0] = personCreator('John', 65, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=743812.94;
                const expectedReturnResult=33964.06;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.getRMD(year);
                const currentResultRaw=account.currentValue;
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account and gets RMD for a different year when owner is old enough for RMD',()=>{
                const value=777777;
                const year=2030;
                personList=[];
                personList[0] = personCreator('John', 75, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=725224.5;
                const expectedReturnResult=52552.5;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.getRMD(year);
                const currentResultRaw=account.currentValue;
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account and gets RMD for a different starting year/age when owner is old enough for RMD',()=>{
                const value=777777;
                const year=2060;
                personList=[];
                personList[0] = personCreator('John', 45, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=725224.5;
                const expectedReturnResult=52552.5;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.getRMD(year);
                const currentResultRaw=account.currentValue;
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account and gets RMD for a different account amount when owner is old enough for RMD',()=>{
                const value=400000;
                const year=2060;
                personList=[];
                personList[0] = personCreator('John', 45, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=372972.97;
                const expectedReturnResult=27027.03;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.getRMD(year);
                const currentResultRaw=account.currentValue;
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account and gets RMD when owner is over 100',()=>{
                const value=400000;
                const year=2080;
                personList=[];
                personList[0] = personCreator('John', 45, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=311111.11;
                const expectedReturnResult=88888.89;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.getRMD(year);
                const currentResultRaw=account.currentValue;
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account and gets RMD when owner is over 115',()=>{
                const value=400000;
                const year=2080;
                personList=[];
                personList[0] = personCreator('John', 56, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=189473.68;
                const expectedReturnResult=210526.32;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.getRMD(year);
                const currentResultRaw=account.currentValue;
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account with two people involved and gets RMD when true owner in RMD range',()=>{
                const value=400000;
                const year=2030;
                personList=[];
                personList[0] = personCreator('John', 36, 100000, .05, [], [], 2060, .05, .075);
                personList[1] = personCreator('Jamie', 65, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=382532.75;
                const expectedReturnResult=17467.25;
        
                const account = new RothIRA('Name', value, .05, 'Jamie', personList, 0);
                const returnResultRaw=account.getRMD(year);
                const currentResultRaw=account.currentValue;
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account with two people involved and gets RMD when true owner is too young',()=>{
                const value=400000;
                const year=2030;
                personList=[];
                personList[0] = personCreator('John', 36, 100000, .05, [], [], 2060, .05, .075);
                personList[1] = personCreator('Jamie', 65, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=400000;
                const expectedReturnResult=0;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.getRMD(year);
                const currentResultRaw=account.currentValue;
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a RothIRA account and gets RMD for when owner would be over 200',()=>{
                const value=777777;
                const year=2100;
                personList=[];
                personList[0] = personCreator('John', 150, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=777777;
                const expectedReturnResult=undefined;
        
                const account = new RothIRA('Name', value, .05, 'John', personList, 0);
                const returnResult=account.getRMD(year);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });                
        });
    });
    describe('401k', ()=>{
        describe('creator', ()=>{
            it('creates a 401k account, sets name and returns name',()=>{
                const name='Account3';
                const value=50000;
                const growth=.05;
                const owner='John';
                personList=[];
                personList[0] = personCreator(owner, 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedResult='Account3';
        
                const account = new F401k('SomeAccount', value, growth, owner, personList);
                account.name=name;
                const result=account.name;
        
                assert.strictEqual(result, expectedResult);
            });
        });
        describe('increase value',()=>{
            it('creates a 401k account and increases value for an invalid early year',()=>{
                const value=300000;
                const year=2010;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedResult=300000;
        
                const account = new F401k('AccountName', value, .05, 'John', personList, 0);
                account.increaseValue(year);
                const rawResult=account.currentValue;
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a 401k account and increases value for an invalid late year',()=>{
                const value=300000;
                const year=2210;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedResult=300000;
        
                const account = new F401k('AccountName', value, .05, 'John', personList, 0);
                account.increaseValue(year);
                const rawResult=account.currentValue;
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a 401k account and increases value for a valid year',()=>{
                const value=300000;
                const year=2020;
                const preTax=.05;
                const match=.1;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, preTax, match);
                const expectedResult=315000;
        
                const account = new F401k('AccountName', value, .05, 'John', personList, 0);
                account.increaseValue(year);
                const rawResult=account.currentValue;
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a 401k account and increases value for a different year',()=>{
                const value=300000;
                const year=2030;
                const preTax=.05;
                const match=.1;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, preTax, match);
                const expectedResult=324433.42;
        
                const account = new F401k('AccountName', value, .05, 'John', personList, 0);
                account.increaseValue(year);
                const rawResult=account.currentValue;
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a 401k account with different value and increases value for a valid year',()=>{
                const value=900000;
                const year=2030;
                const preTax=.05;
                const match=.1;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, preTax, match);
                const expectedResult=924433.42;
        
                const account = new F401k('AccountName', value, .05, 'John', personList, 0);
                account.increaseValue(year);
                const rawResult=account.currentValue;
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a 401k account with different value and increases value with different pretax',()=>{
                const value=900000;
                const year=2030;
                const preTax=.1;
                const match=.1;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, preTax, match);
                const expectedResult=932577.89;
        
                const account = new F401k('AccountName', value, .05, 'John', personList, 0);
                account.increaseValue(year);
                const rawResult=account.currentValue;
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a 401k account with different value and increases value with zero match',()=>{
                const value=900000;
                const year=2030;
                const preTax=.1;
                const match=0;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, preTax, match);
                const expectedResult=916288.95;
        
                const account = new F401k('AccountName', value, .05, 'John', personList, 0);
                account.increaseValue(year);
                const rawResult=account.currentValue;
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a 401k account with different value and increases value with zero pretax and match',()=>{
                const value=900000;
                const year=2030;
                const preTax=0;
                const match=0;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, preTax, match);
                const expectedResult=900000;
        
                const account = new F401k('AccountName', value, .05, 'John', personList, 0);
                account.increaseValue(year);
                const rawResult=account.currentValue;
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a 401k account with different value and increases value with different salary',()=>{
                const value=900000;
                const year=2030;
                const preTax=.05;
                const match=.05;
                personList=[];
                personList[0] = personCreator('John', 30, 200000, .05, [], [], 2060, preTax, match);
                const expectedResult=932577.89;
        
                const account = new F401k('AccountName', value, .05, 'John', personList, 0);
                account.increaseValue(year);
                const rawResult=account.currentValue;
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a 401k account with two people, owner has nonzero pretax and match',()=>{
                const value=900000;
                const year=2020;
                const preTax1=.05;
                const match1=.075;
                const preTax2=0;
                const match2=0;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, preTax1, match1);
                personList[1] = personCreator('Jamie', 30, 50000, .05, [], [], 2060, preTax2, match2);
                const expectedResult=912500;
        
                const account = new F401k('AccountName', value, .05, 'John', personList, 0);
                account.increaseValue(year);
                const rawResult=account.currentValue;
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a 401k account with two people, owner has zero pretax and match',()=>{
                const value=900000;
                const year=2020;
                const preTax1=.05;
                const match1=.075;
                const preTax2=0;
                const match2=0;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, preTax1, match1);
                personList[1] = personCreator('Jamie', 30, 50000, .05, [], [], 2060, preTax2, match2);
                const expectedResult=900000;
        
                const account = new F401k('AccountName', value, .05, 'Jamie', personList, 0);
                account.increaseValue(year);
                const rawResult=account.currentValue;
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a 401k account with two people, owner is #2 and has nonzero pretax and match',()=>{
                const value=900000;
                const year=2020;
                const preTax1=0;
                const match1=0;
                const preTax2=.05;
                const match2=.075;
                personList=[];
                personList[0] = personCreator('Jamie', 30, 50000, .05, [], [], 2060, preTax1, match1);
                personList[1] = personCreator('John', 30, 100000, .05, [], [], 2060, preTax2, match2);
                const expectedResult=912500;
        
                const account = new F401k('AccountName', value, .05, 'John', personList, 0);
                account.increaseValue(year);
                const rawResult=account.currentValue;
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });             
        });
        describe('withdraw money', ()=>{
            it('creates a 401k account and withdraws money for an invalid early year',()=>{
                const value=500000;
                const year=2010;
                const withdrawAmount=-10000;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=500000;
                const expectedReturnResult=undefined;
        
                const account = new F401k('AccountName', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const currentResultRaw=account.currentValue;
                const returnResult=returnResultRaw;
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(currentResult, expectedCurrentResult);
                assert.strictEqual(returnResult, expectedReturnResult);
            });
            it('creates a 401k account and withdraws money for an invalid late year',()=>{
                const value=500000;
                const year=2210;
                const withdrawAmount=-10000;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=500000;
                const expectedReturnResult=undefined;
        
                const account = new F401k('AccountName', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const currentResultRaw=account.currentValue;
                const returnResult=returnResultRaw;
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(currentResult, expectedCurrentResult);
                assert.strictEqual(returnResult, expectedReturnResult);
            });
            it('creates a 401k account and tries to withdraw positive money',()=>{
                const value=500000;
                const year=2020;
                const withdrawAmount=10000;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=500000;
                const expectedReturnResult=undefined;
        
                const account = new F401k('AccountName', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const currentResultRaw=account.currentValue;
                const returnResult=returnResultRaw;
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(currentResult, expectedCurrentResult);
                assert.strictEqual(returnResult, expectedReturnResult);
            });
            it('creates a 401k account and withdraws money, less than current value',()=>{
                const value=500000;
                const year=2065;
                const withdrawAmount=-100000;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
                const expectedCurrentResult=380126.97;
                const expectedReturnResult=100000;
        
                const account = new F401k('AccountName', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const currentResultRaw=account.currentValue;
                const returnResult=returnResultRaw;
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(currentResult, expectedCurrentResult);
                assert.strictEqual(returnResult, expectedReturnResult);
            });
            it('creates a 401k account and withdraws different amount, less than current value',()=>{
                const value=1000000;
                const year=2065;
                const withdrawAmount=-500000;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
                const expectedCurrentResult=270096.83;
                const expectedReturnResult=500000;
        
                const account = new F401k('AccountName', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const currentResultRaw=account.currentValue;
                const returnResult=returnResultRaw;
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(currentResult, expectedCurrentResult);
                assert.strictEqual(returnResult, expectedReturnResult);
            });
            it('creates a 401k account and withdraws money, more than current value',()=>{
                const value=50000;
                const year=2065;
                const withdrawAmount=-100000;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
                const expectedCurrentResult=0;
                const expectedReturnResult=45685.5;
        
                const account = new F401k('AccountName', value, .05, 'John', personList, 0);
                const returnResultRaw=account.withdrawMoney(year, withdrawAmount);
                const currentResultRaw=account.currentValue;
                const returnResult=returnResultRaw;
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(currentResult, expectedCurrentResult);
                assert.strictEqual(returnResult, expectedReturnResult);
            });             
        });
        describe('getRMD', ()=>{
            it('creates a F401k account and gets RMD for an invalid early year',()=>{
                const value=777777;
                const year=2010;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=777777;
                const expectedReturnResult=undefined;
        
                const account = new F401k('Name', value, .05, 'John', personList, 0);
                const returnResult=account.getRMD(year);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a F401k account and gets RMD for an invalid late year',()=>{
                const value=777777;
                const year=2210;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=777777;
                const expectedReturnResult=undefined;
        
                const account = new F401k('Name', value, .05, 'John', personList, 0);
                const returnResult=account.getRMD(year);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a F401k account and gets RMD for a year when owner is too young for RMD',()=>{
                const value=777777;
                const year=2030;
                personList=[];
                personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=777777;
                const expectedReturnResult=0;
        
                const account = new F401k('Name', value, .05, 'John', personList, 0);
                const returnResult=account.getRMD(year);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a F401k account and gets RMD for a year when owner is old enough for RMD',()=>{
                const value=777777;
                const year=2030;
                personList=[];
                personList[0] = personCreator('John', 65, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=743812.94;
                const expectedReturnResult=33964.06;
        
                const account = new F401k('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.getRMD(year);
                const currentResultRaw=account.currentValue;
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a F401k account and gets RMD for a different year when owner is old enough for RMD',()=>{
                const value=777777;
                const year=2030;
                personList=[];
                personList[0] = personCreator('John', 75, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=725224.5;
                const expectedReturnResult=52552.5;
        
                const account = new F401k('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.getRMD(year);
                const currentResultRaw=account.currentValue;
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a F401k account and gets RMD for a different starting year/age when owner is old enough for RMD',()=>{
                const value=777777;
                const year=2060;
                personList=[];
                personList[0] = personCreator('John', 45, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=725224.5;
                const expectedReturnResult=52552.5;
        
                const account = new F401k('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.getRMD(year);
                const currentResultRaw=account.currentValue;
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a F401k account and gets RMD for a different account amount when owner is old enough for RMD',()=>{
                const value=400000;
                const year=2060;
                personList=[];
                personList[0] = personCreator('John', 45, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=372972.97;
                const expectedReturnResult=27027.03;
        
                const account = new F401k('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.getRMD(year);
                const currentResultRaw=account.currentValue;
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a F401k account and gets RMD when owner is over 100',()=>{
                const value=400000;
                const year=2080;
                personList=[];
                personList[0] = personCreator('John', 45, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=311111.11;
                const expectedReturnResult=88888.89;
        
                const account = new F401k('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.getRMD(year);
                const currentResultRaw=account.currentValue;
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a F401k account and gets RMD when owner is over 115',()=>{
                const value=400000;
                const year=2080;
                personList=[];
                personList[0] = personCreator('John', 56, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=189473.68;
                const expectedReturnResult=210526.32;
        
                const account = new F401k('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.getRMD(year);
                const currentResultRaw=account.currentValue;
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a F401k account with two people involved and gets RMD when true owner in RMD range',()=>{
                const value=400000;
                const year=2030;
                personList=[];
                personList[0] = personCreator('John', 36, 100000, .05, [], [], 2060, .05, .075);
                personList[1] = personCreator('Jamie', 65, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=382532.75;
                const expectedReturnResult=17467.25;
        
                const account = new F401k('Name', value, .05, 'Jamie', personList, 0);
                const returnResultRaw=account.getRMD(year);
                const currentResultRaw=account.currentValue;
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a F401k account with two people involved and gets RMD when true owner is too young',()=>{
                const value=400000;
                const year=2030;
                personList=[];
                personList[0] = personCreator('John', 36, 100000, .05, [], [], 2060, .05, .075);
                personList[1] = personCreator('Jamie', 65, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=400000;
                const expectedReturnResult=0;
        
                const account = new F401k('Name', value, .05, 'John', personList, 0);
                const returnResultRaw=account.getRMD(year);
                const currentResultRaw=account.currentValue;
                const returnResult=parseFloat((Math.round(returnResultRaw * 100 ) / 100).toFixed(2));
                const currentResult=parseFloat((Math.round(currentResultRaw * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });
            it('creates a F401k account and gets RMD for when owner would be over 200',()=>{
                const value=777777;
                const year=2100;
                personList=[];
                personList[0] = personCreator('John', 150, 100000, .05, [], [], 2060, .05, .075);
                const expectedCurrentResult=777777;
                const expectedReturnResult=undefined;
        
                const account = new F401k('Name', value, .05, 'John', personList, 0);
                const returnResult=account.getRMD(year);
                const currentResult=account.currentValue;
        
                assert.strictEqual(returnResult, expectedReturnResult);
                assert.strictEqual(currentResult, expectedCurrentResult);
            });             
        });
    });
    describe('balance year of cashflow', ()=>{
        it('creates one roth account and one reg account for one person, and balances a year of positive cashflow', ()=>{
            const year=2020;
            const net=25000;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, .05, .075);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 75000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 75000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 50000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedRoth=56000;
            const expectedF401k=125000;
            const expectedReg=94000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList,negList);
            const rawRoth=posList[0].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
            const rawReg=posList[1].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);
            assert.strictEqual(resultReg, expectedReg);                    
        });
        it('creates one roth account and one reg account for one person, and balances a year of different positive cashflow', ()=>{
            const year=2020;
            const net=50000;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, .05, .075);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 75000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 75000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 50000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedRoth=56000;
            const expectedF401k=125000;
            const expectedReg=119000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList,negList);
            const rawRoth=posList[0].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
            const rawReg=posList[1].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);
            assert.strictEqual(resultReg, expectedReg);                    
        });
        it('creates one roth account and balances a year of positive cashflow > 6k', ()=>{
            const year=2020;
            const net=50000;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, .05, .075);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 75000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 50000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedRoth=56000;
            const expectedF401k=125000;
            const expectedReg=75000;
            const expectedNet=44000;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList,negList);
            const rawRoth=posList[0].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
            const rawReg=negList[0].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);
            assert.strictEqual(resultReg, expectedReg);                    
        });
        it('creates one reg account and balances a year of positive cashflow', ()=>{
            const year=2020;
            const net=50000;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, .05, .075);
            const posList=[];
            posList[0]=new RegInvestment('PosReg1', 50000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 75000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 50000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedRoth=50000;
            const expectedF401k=125000;
            const expectedReg=100000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList,negList);
            const rawRoth=negList[1].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
            const rawReg=posList[0].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);
            assert.strictEqual(resultReg, expectedReg);                    
        });
        it('creates am empty positive list and tries to balance a year of positive cashflow', ()=>{
            const year=2020;
            const net=50000;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, .05, .075);
            const posList=[];
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 75000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 50000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedRoth=50000;
            const expectedF401k=125000;
            const expectedReg=75000;
            const expectedNet=50000;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList,negList);
            const rawRoth=negList[1].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
            const rawReg=negList[0].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);
            assert.strictEqual(resultReg, expectedReg);                    
        });
        it('creates one roth account and one reg account for one person, and balances a year of positive cashflow in the future when not roth qualified', ()=>{
            const year=2030;
            const net=25000;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 75000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 75000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 50000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedRoth=50000;
            const expectedF401k=125000;
            const expectedReg=100000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList,negList);
            const rawRoth=posList[0].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
            const rawReg=posList[1].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);
            assert.strictEqual(resultReg, expectedReg);                    
        });
        it('creates two roth accounts and one reg account for two people, and balances a year of positive cashflow', ()=>{
            const year=2020;
            const net=25000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            personList[1] = personCreator('Jamie', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RothIRA('PosRoth2', 60000, .05, 'Jamie', personList, 0);
            posList[2]=new RegInvestment('PosReg1', 75000, .05, 'Jamie', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 75000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 50000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedRoth1=56000;
            const expectedRoth2=66000;
            const expectedF401k=125000;
            const expectedReg=88000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList,negList);
            const rawRoth1=posList[0].currentValue;
            const resultRoth1=parseFloat((Math.round(rawRoth1 * 100 ) / 100).toFixed(2));
            const rawRoth2=posList[1].currentValue;
            const resultRoth2=parseFloat((Math.round(rawRoth2 * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
            const rawReg=posList[2].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultRoth1, expectedRoth1);
            assert.strictEqual(resultRoth2, expectedRoth2);
            assert.strictEqual(resultF401k, expectedF401k);
            assert.strictEqual(resultReg, expectedReg);                    
        });
        it('creates two roth accounts and one reg account for two people (together not roth qualified), and balances a year of positive cashflow', ()=>{
            const year=2020;
            const net=25000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            personList[1] = personCreator('Jamie', 30, 140000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RothIRA('PosRoth2', 60000, .05, 'Jamie', personList, 0);
            posList[2]=new RegInvestment('PosReg1', 75000, .05, 'Jamie', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 75000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 50000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedRoth1=50000;
            const expectedRoth2=60000;
            const expectedF401k=125000;
            const expectedReg=100000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList,negList);
            const rawRoth1=posList[0].currentValue;
            const resultRoth1=parseFloat((Math.round(rawRoth1 * 100 ) / 100).toFixed(2));
            const rawRoth2=posList[1].currentValue;
            const resultRoth2=parseFloat((Math.round(rawRoth2 * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
            const rawReg=posList[2].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultRoth1, expectedRoth1);
            assert.strictEqual(resultRoth2, expectedRoth2);
            assert.strictEqual(resultF401k, expectedF401k);
            assert.strictEqual(resultReg, expectedReg);                    
        });
        it('creates two roth accounts and one reg account for two people, and tries to balances positive cashflow for an invalid year', ()=>{
            const year=2220;
            const net=25000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            personList[1] = personCreator('Jamie', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RothIRA('PosRoth2', 60000, .05, 'Jamie', personList, 0);
            posList[2]=new RegInvestment('PosReg1', 75000, .05, 'Jamie', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 75000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 50000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedRoth1=50000;
            const expectedRoth2=60000;
            const expectedF401k=125000;
            const expectedReg=75000;
            const expectedNet=25000;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList,negList);
            const rawRoth1=posList[0].currentValue;
            const resultRoth1=parseFloat((Math.round(rawRoth1 * 100 ) / 100).toFixed(2));
            const rawRoth2=posList[1].currentValue;
            const resultRoth2=parseFloat((Math.round(rawRoth2 * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
            const rawReg=posList[2].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultRoth1, expectedRoth1);
            assert.strictEqual(resultRoth2, expectedRoth2);
            assert.strictEqual(resultF401k, expectedF401k);
            assert.strictEqual(resultReg, expectedReg);                    
        });
        it('creates two roth accounts and balances positive cashflow > 12k', ()=>{
            const year=2020;
            const net=25000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            personList[1] = personCreator('Jamie', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RothIRA('PosRoth2', 60000, .05, 'Jamie', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 75000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 50000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedRoth1=56000;
            const expectedRoth2=66000;
            const expectedF401k=125000;
            const expectedReg=75000;
            const expectedNet=13000;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList,negList);
            const rawRoth1=posList[0].currentValue;
            const resultRoth1=parseFloat((Math.round(rawRoth1 * 100 ) / 100).toFixed(2));
            const rawRoth2=posList[1].currentValue;
            const resultRoth2=parseFloat((Math.round(rawRoth2 * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
            const rawReg=negList[0].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultRoth1, expectedRoth1);
            assert.strictEqual(resultRoth2, expectedRoth2);
            assert.strictEqual(resultF401k, expectedF401k);
            assert.strictEqual(resultReg, expectedReg);                    
        });
        it('creates one of each account for one person and balances negative cashflow < current value of reg, <40k', ()=>{
            const year=2020;
            const net=-25000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 50000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 75000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedReg=25000;
            const expectedRoth=75000;
            const expectedF401k=125000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg=negList[0].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
            const rawRoth=negList[1].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg, expectedReg); 
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);                 
        });
        it('creates one of each account for one person and balances negative cashflow < current value of reg, <40k', ()=>{
            const year=2020;
            const net=-39000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 50000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 75000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedReg=11000;
            const expectedRoth=75000;
            const expectedF401k=125000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg=negList[0].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
            const rawRoth=negList[1].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg, expectedReg); 
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);                 
        });
        it('creates one of each account for one person and balances negative cashflow < current value of reg, =40k', ()=>{
            const year=2020;
            const net=-40000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 50000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 75000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedReg=10000;
            const expectedRoth=75000;
            const expectedF401k=125000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg=negList[0].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
            const rawRoth=negList[1].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg, expectedReg); 
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);                 
        });
        it('creates one of each account for one person and balances negative cashflow < current value of reg, >40k', ()=>{
            const year=2020;
            const net=-50000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 75000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 75000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedReg=23235.29;
            const expectedRoth=75000;
            const expectedF401k=125000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg=negList[0].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
            const rawRoth=negList[1].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg, expectedReg); 
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);                 
        });
        it('creates one of each account for one person and balances negative cashflow < current value of reg, >400k', ()=>{
            const year=2020;
            const net=-500000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 750000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 75000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedReg=164518.38;
            const expectedRoth=75000;
            const expectedF401k=125000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg=negList[0].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
            const rawRoth=negList[1].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg, expectedReg); 
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);                 
        });
        it('creates one of each account for one person and balances negative cashflow < current value of reg, =400k', ()=>{
            const year=2020;
            const net=-441450;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 750000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 75000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedReg=237705.88;
            const expectedRoth=75000;
            const expectedF401k=125000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg=negList[0].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
            const rawRoth=negList[1].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg, expectedReg); 
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);                 
        });
        it('creates one of each account for one person and balances negative cashflow > current value of reg, <40k', ()=>{
            const year=2020;
            const net=-39000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 30000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 75000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedReg=0;
            const expectedRoth=66000;
            const expectedF401k=125000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg=negList[0].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
            const rawRoth=negList[1].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg, expectedReg); 
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);                 
        });
        it('creates one of each account for one person and balances negative cashflow > current value of reg, =40k', ()=>{
            const year=2020;
            const net=-40000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 30000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 75000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedReg=0;
            const expectedRoth=65000;
            const expectedF401k=125000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg=negList[0].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
            const rawRoth=negList[1].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg, expectedReg); 
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);                 
        });
        it('creates one of each account for one person and balances negative cashflow > current value of reg, >40k', ()=>{
            const year=2020;
            const net=-75000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 50000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 75000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedReg=0;
            const expectedRoth=48500;
            const expectedF401k=125000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg=negList[0].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
            const rawRoth=negList[1].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg, expectedReg); 
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);                 
        });
        it('creates one of each account for one person and balances negative cashflow > current value of reg, >400k', ()=>{
            const year=2020;
            const net=-600000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 500000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 250000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedReg=0;
            const expectedRoth=78072.5;
            const expectedF401k=125000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg=negList[0].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
            const rawRoth=negList[1].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg, expectedReg); 
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);                 
        });
        it('creates one of each account for one person and balances negative cashflow > current value of reg, =400k', ()=>{
            const year=2020;
            const net=-500000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 441450, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 150000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedReg=0;
            const expectedRoth=31232.5;
            const expectedF401k=125000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg=negList[0].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
            const rawRoth=negList[1].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg, expectedReg); 
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);                 
        });
        it('creates one reg account for one person and balances negative cashflow > current value of reg, <40k', ()=>{
            const year=2020;
            const net=-30000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 20000, .05, 'John', personList, 0);
            const expectedReg=0;
            const expectedNet=-10000;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg=negList[0].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg, expectedReg);            
        });
        it('creates one of each account for two people and balances negative cashflow < current value of combined regs, <80k', ()=>{
            const year=2020;
            const net=-59000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            personList[1] = personCreator('Jamie', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 50000, .05, 'John', personList, 0);
            negList[1]=new RegInvestment('NegReg2', 60000, .05, 'Jamie', personList, 0);
            negList[2]=new RothIRA('NegRoth1', 75000, .05, 'John', personList, 0);
            negList[3]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedReg1=0;
            const expectedReg2=51000;
            const expectedRoth=75000;
            const expectedF401k=125000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg1=negList[0].currentValue;
            const resultReg1=parseFloat((Math.round(rawReg1 * 100 ) / 100).toFixed(2));
            const rawReg2=negList[1].currentValue;
            const resultReg2=parseFloat((Math.round(rawReg2 * 100 ) / 100).toFixed(2));
            const rawRoth=negList[2].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[3].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg1, expectedReg1);
            assert.strictEqual(resultReg2, expectedReg2);  
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);                 
        });
        it('creates one of each account for two people and balances negative cashflow > current value of combined regs, <80k', ()=>{
            const year=2020;
            const net=-70000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            personList[1] = personCreator('Jamie', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 30000, .05, 'John', personList, 0);
            negList[1]=new RegInvestment('NegReg2', 30000, .05, 'Jamie', personList, 0);
            negList[2]=new RothIRA('NegRoth1', 75000, .05, 'John', personList, 0);
            negList[3]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedReg1=0;
            const expectedReg2=0;
            const expectedRoth=65000;
            const expectedF401k=125000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg1=negList[0].currentValue;
            const resultReg1=parseFloat((Math.round(rawReg1 * 100 ) / 100).toFixed(2));
            const rawReg2=negList[1].currentValue;
            const resultReg2=parseFloat((Math.round(rawReg2 * 100 ) / 100).toFixed(2));
            const rawRoth=negList[2].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[3].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg1, expectedReg1);
            assert.strictEqual(resultReg2, expectedReg2);  
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);                 
        });
        it('creates one of each account for two people and balances negative cashflow < current value of first reg, >80k', ()=>{
            const year=2020;
            const net=-120000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            personList[1] = personCreator('Jamie', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 200000, .05, 'John', personList, 0);
            negList[1]=new RegInvestment('NegReg2', 30000, .05, 'Jamie', personList, 0);
            negList[2]=new RothIRA('NegRoth1', 75000, .05, 'John', personList, 0);
            negList[3]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedReg1=72941.18;
            const expectedReg2=30000;
            const expectedRoth=75000;
            const expectedF401k=125000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg1=negList[0].currentValue;
            const resultReg1=parseFloat((Math.round(rawReg1 * 100 ) / 100).toFixed(2));
            const rawReg2=negList[1].currentValue;
            const resultReg2=parseFloat((Math.round(rawReg2 * 100 ) / 100).toFixed(2));
            const rawRoth=negList[2].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[3].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg1, expectedReg1);
            assert.strictEqual(resultReg2, expectedReg2);  
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);                 
        });
        it('creates one of each account for two people and balances negative cashflow < current value of first reg, >500k', ()=>{
            const year=2020;
            const net=-700000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            personList[1] = personCreator('Jamie', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 2000000, .05, 'John', personList, 0);
            negList[1]=new RegInvestment('NegReg2', 30000, .05, 'Jamie', personList, 0);
            negList[2]=new RothIRA('NegRoth1', 75000, .05, 'John', personList, 0);
            negList[3]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedReg1=1175632.35;
            const expectedReg2=30000;
            const expectedRoth=75000;
            const expectedF401k=125000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg1=negList[0].currentValue;
            const resultReg1=parseFloat((Math.round(rawReg1 * 100 ) / 100).toFixed(2));
            const rawReg2=negList[1].currentValue;
            const resultReg2=parseFloat((Math.round(rawReg2 * 100 ) / 100).toFixed(2));
            const rawRoth=negList[2].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[3].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg1, expectedReg1);
            assert.strictEqual(resultReg2, expectedReg2);  
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);                 
        });
        it('creates one of each account for two people and balances negative cashflow < current value of first reg, =500k', ()=>{
            const year=2020;
            const net=-496600;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            personList[1] = personCreator('Jamie', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 2000000, .05, 'John', personList, 0);
            negList[1]=new RegInvestment('NegReg2', 30000, .05, 'Jamie', personList, 0);
            negList[2]=new RothIRA('NegRoth1', 75000, .05, 'John', personList, 0);
            negList[3]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedReg1=1429882.35;
            const expectedReg2=30000;
            const expectedRoth=75000;
            const expectedF401k=125000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg1=negList[0].currentValue;
            const resultReg1=parseFloat((Math.round(rawReg1 * 100 ) / 100).toFixed(2));
            const rawReg2=negList[1].currentValue;
            const resultReg2=parseFloat((Math.round(rawReg2 * 100 ) / 100).toFixed(2));
            const rawRoth=negList[2].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[3].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg1, expectedReg1);
            assert.strictEqual(resultReg2, expectedReg2);  
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);                 
        });
        it('creates one of each account for two people and balances negative cashflow < current value of first reg, =80k', ()=>{
            const year=2020;
            const net=-80000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            personList[1] = personCreator('Jamie', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 2000000, .05, 'John', personList, 0);
            negList[1]=new RegInvestment('NegReg2', 30000, .05, 'Jamie', personList, 0);
            negList[2]=new RothIRA('NegRoth1', 75000, .05, 'John', personList, 0);
            negList[3]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedReg1=1920000;
            const expectedReg2=30000;
            const expectedRoth=75000;
            const expectedF401k=125000;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg1=negList[0].currentValue;
            const resultReg1=parseFloat((Math.round(rawReg1 * 100 ) / 100).toFixed(2));
            const rawReg2=negList[1].currentValue;
            const resultReg2=parseFloat((Math.round(rawReg2 * 100 ) / 100).toFixed(2));
            const rawRoth=negList[2].currentValue;
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[3].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg1, expectedReg1);
            assert.strictEqual(resultReg2, expectedReg2);  
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);                 
        });
        it('creates one of each account for two people and balances negative cashflow > current value of reg and roth', ()=>{
            const year=2070;
            const net=-250000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            personList[1] = personCreator('Jamie', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 100000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 75000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedReg=0;
            const expectedRoth=0;
            const expectedF401k=40194.32;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg=negList[0].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
            const rawRoth=negList[1].currentValue
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg, expectedReg);
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);      
        });
        it('creates one of each account for two people and balances negative cashflow > current value of all accounts', ()=>{
            const year=2070;
            const net=-350000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            personList[1] = personCreator('Jamie', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 100000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 75000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 125000, .05, 'John', personList, 0);
            const expectedReg=0;
            const expectedRoth=0;
            const expectedF401k=0;
            const expectedNet=-66624;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg=negList[0].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
            const rawRoth=negList[1].currentValue
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg, expectedReg);
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);      
        });
        it('creates one of each account for one person and balances negative cashflow > current value of reg and roth', ()=>{
            const year=2070;
            const net=-100000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 50000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 25000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 50000, .05, 'John', personList, 0);
            const expectedReg=0;
            const expectedRoth=0;
            const expectedF401k=21801.70;
            const expectedNet=0;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg=negList[0].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
            const rawRoth=negList[1].currentValue
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg, expectedReg);
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);      
        });
        it('creates one of each account for one person and balances negative cashflow > current value of all accounts', ()=>{
            const year=2070;
            const net=-150000;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, 0, 0);
            const posList=[];
            posList[0]=new RothIRA('PosRoth1', 50000, .05, 'John', personList, 0);
            posList[1]=new RegInvestment('PosReg1', 60000, .05, 'John', personList, 0);
            
            const negList=[];
            negList[0]=new RegInvestment('NegReg1', 50000, .05, 'John', personList, 0);
            negList[1]=new RothIRA('NegRoth1', 25000, .05, 'John', personList, 0);
            negList[2]=new F401k('Neg401k1', 50000, .05, 'John', personList, 0);
            const expectedReg=0;
            const expectedRoth=0;
            const expectedF401k=0;
            const expectedNet=-30814.5;

            const rawNetResult=balanceYearOfCashFlow(year, net, posList, negList);

            const rawReg=negList[0].currentValue;
            const resultReg=parseFloat((Math.round(rawReg * 100 ) / 100).toFixed(2));
            const rawRoth=negList[1].currentValue
            const resultRoth=parseFloat((Math.round(rawRoth * 100 ) / 100).toFixed(2));
            const rawF401k=negList[2].currentValue;
            const resultF401k=parseFloat((Math.round(rawF401k * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(rawNetResult, expectedNet);
            assert.strictEqual(resultReg, expectedReg);
            assert.strictEqual(resultRoth, expectedRoth);
            assert.strictEqual(resultF401k, expectedF401k);      
        });
    });
    describe('process RMDs', ()=>{
        it('creates a roth account, 401k account, and proccesses RMDs for a valid RMD year with zero initial net', ()=>{
            const year=2070;
            const initialNet=0;
            const rothValue=100000;
            const f401kValue=250000;
            const inflation=0;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            rothList[0]=new RothIRA('Name', rothValue, .05, 'John', personList, inflation);
            const f401kList=[];
            f401kList[0]=new F401k('Name', f401kValue, .05, 'John', personList, inflation);
            const expectedResult=18084.92;

            const rawResult = processRMDs(year, initialNet, personList, rothList, f401kList, inflation);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);                    
        });
        it('creates a roth account, 401k account, with different values, and proccesses RMDs for a different RMD year with zero initial net', ()=>{
            const year=2075;
            const initialNet=0;
            const rothValue=700000;
            const f401kValue=3500000;
            const inflation=0;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            rothList[0]=new RothIRA('Name', rothValue, .05, 'John', personList, inflation);
            const f401kList=[];
            f401kList[0]=new F401k('Name', f401kValue, .05, 'John', personList, inflation);
            const expectedResult=214004.46;

            const rawResult = processRMDs(year, initialNet, personList, rothList, f401kList, inflation);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);                    
        });
        it('creates a roth account, 401k account, with different values, and proccesses RMDs for a different RMD year with positive initial net', ()=>{
            const year=2075;
            const initialNet=15000;
            const rothValue=700000;
            const f401kValue=3500000;
            const inflation=0;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            rothList[0]=new RothIRA('Name', rothValue, .05, 'John', personList, inflation);
            const f401kList=[];
            f401kList[0]=new F401k('Name', f401kValue, .05, 'John', personList, inflation);
            const expectedResult=229004.46;

            const rawResult = processRMDs(year, initialNet, personList, rothList, f401kList, inflation);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);                    
        });
        it('creates a roth account, 401k account, with different values, and proccesses RMDs for a different RMD year with negative initial net', ()=>{
            const year=2075;
            const initialNet=-15000;
            const rothValue=700000;
            const f401kValue=3500000;
            const inflation=0;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            rothList[0]=new RothIRA('Name', rothValue, .05, 'John', personList, inflation);
            const f401kList=[];
            f401kList[0]=new F401k('Name', f401kValue, .05, 'John', personList, inflation);
            const expectedResult=199004.46;

            const rawResult = processRMDs(year, initialNet, personList, rothList, f401kList, inflation);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);                    
        });
        it('creates two roth accounts, two 401k accounts, for two people, and proccesses RMDs for a valid year zero initial net', ()=>{
            const year=2075;
            const initialNet=0;
            const rothValue1=700000;
            const rothValue2=500000;
            const f401kValue1=3500000;
            const f401kValue2=1500000;
            const inflation=0;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, .05, .075);
            personList[1] = personCreator('Jamie', 20, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            rothList[0]=new RothIRA('Name', rothValue1, .05, 'John', personList, inflation);
            rothList[1]=new RothIRA('Name2', rothValue2, .05, 'Jamie', personList, inflation);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, .05, 'John', personList, inflation);
            f401kList[1]=new F401k('NameB', f401kValue2, .05, 'Jamie', personList, inflation);
            const expectedResult=223557.19;

            const rawResult = processRMDs(year, initialNet, personList, rothList, f401kList, inflation);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);                    
        });
        it('creates two roth accounts, two 401k accounts, for two people of different ages, and proccesses RMDs for a valid year, zero initial net', ()=>{
            const year=2075;
            const initialNet=0;
            const rothValue1=700000;
            const rothValue2=500000;
            const f401kValue1=3500000;
            const f401kValue2=1500000;
            const inflation=0;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, .05, .075);
            personList[1] = personCreator('Jamie', 30, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            rothList[0]=new RothIRA('Name', rothValue1, .05, 'John', personList, inflation);
            rothList[1]=new RothIRA('Name2', rothValue2, .05, 'Jamie', personList, inflation);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, .05, 'John', personList, inflation);
            f401kList[1]=new F401k('NameB', f401kValue2, .05, 'Jamie', personList, inflation);
            const expectedResult=259884.35;

            const rawResult = processRMDs(year, initialNet, personList, rothList, f401kList, inflation);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);                    
        });
        it('creates two roth accounts, two 401k accounts, for two people of different ages, one not in RMD range, and proccesses RMDs for a valid year, zero initial net', ()=>{
            const year=2050;
            const initialNet=0;
            const rothValue1=700000;
            const rothValue2=500000;
            const f401kValue1=3500000;
            const f401kValue2=1500000;
            const inflation=0;
            personList=[];
            personList[0] = personCreator('John', 50, 100000, .05, [], [], 2040, .05, .075);
            personList[1] = personCreator('Jamie', 30, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            rothList[0]=new RothIRA('Name', rothValue1, .05, 'John', personList, inflation);
            rothList[1]=new RothIRA('Name2', rothValue2, .05, 'Jamie', personList, inflation);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, .05, 'John', personList, inflation);
            f401kList[1]=new F401k('NameB', f401kValue2, .05, 'Jamie', personList, inflation);
            const expectedResult=146856.77;

            const rawResult = processRMDs(year, initialNet, personList, rothList, f401kList, inflation);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);                    
        });
        it('creates two roth accounts, two 401k accounts, for two people of different ages, one not in RMD range, and proccesses RMDs for a valid year, zero initial net', ()=>{
            const year=2050;
            const initialNet=0;
            const rothValue1=700000;
            const rothValue2=500000;
            const f401kValue1=3500000;
            const f401kValue2=1500000;
            const inflation=.01;
            personList=[];
            personList[0] = personCreator('John', 50, 100000, .05, [], [], 2040, .05, .075);
            personList[1] = personCreator('Jamie', 30, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            rothList[0]=new RothIRA('Name', rothValue1, .05, 'John', personList, inflation);
            rothList[1]=new RothIRA('Name2', rothValue2, .05, 'Jamie', personList, inflation);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, .05, 'John', personList, inflation);
            f401kList[1]=new F401k('NameB', f401kValue2, .05, 'Jamie', personList, inflation);
            const expectedResult=153392.80;

            const rawResult = processRMDs(year, initialNet, personList, rothList, f401kList, inflation);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);                    
        });
        it('processes RMDs for a year before RMD range', ()=>{
            const year=2050;
            const initialNet=0;
            const rothValue1=700000;
            const rothValue2=500000;
            const f401kValue1=3500000;
            const f401kValue2=1500000;
            const inflation=.01;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2040, .05, .075);
            personList[1] = personCreator('Jamie', 30, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            rothList[0]=new RothIRA('Name', rothValue1, .05, 'John', personList, inflation);
            rothList[1]=new RothIRA('Name2', rothValue2, .05, 'Jamie', personList, inflation);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, .05, 'John', personList, inflation);
            f401kList[1]=new F401k('NameB', f401kValue2, .05, 'Jamie', personList, inflation);
            const expectedResult=0;

            const rawResult = processRMDs(year, initialNet, personList, rothList, f401kList, inflation);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);                    
        });
        it('processes RMDs for an invalid year', ()=>{
            const year=2350;
            const initialNet=0;
            const rothValue1=700000;
            const rothValue2=500000;
            const f401kValue1=3500000;
            const f401kValue2=1500000;
            const inflation=.01;
            personList=[];
            personList[0] = personCreator('John', 30, 100000, .05, [], [], 2040, .05, .075);
            personList[1] = personCreator('Jamie', 30, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            rothList[0]=new RothIRA('Name', rothValue1, .05, 'John', personList, inflation);
            rothList[1]=new RothIRA('Name2', rothValue2, .05, 'Jamie', personList, inflation);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, .05, 'John', personList, inflation);
            f401kList[1]=new F401k('NameB', f401kValue2, .05, 'Jamie', personList, inflation);
            const expectedResult=0;

            const rawResult = processRMDs(year, initialNet, personList, rothList, f401kList, inflation);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(result, expectedResult);                    
        });
    });
    describe('grow accounts', ()=>{
        it('creates two roth accounts, two 401k accounts, and two reg accounts for two people, and grows them with no inflation', ()=>{
            const rothValue1=700000;
            const rothValue2=500000;
            const f401kValue1=3500000;
            const f401kValue2=1500000;
            const regValue1=50000;
            const regValue2=75000;
            const inflation=0;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, .05, .075);
            personList[1] = personCreator('Jamie', 20, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            rothList[0]=new RothIRA('Name', rothValue1, .05, 'John', personList, inflation);
            rothList[1]=new RothIRA('Name2', rothValue2, .05, 'Jamie', personList, inflation);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, .05, 'John', personList, inflation);
            f401kList[1]=new F401k('NameB', f401kValue2, .05, 'Jamie', personList, inflation);
            const regList=[];
            regList[0] = new RegInvestment('Name', regValue1, .05, 'John', personList, 0);
            regList[1] = new RegInvestment('Name', regValue2, .05, 'Jamie', personList, 0);
            const expectedRoth1=735000;
            const expectedRoth2=525000;
            const expectedF401k1=3675000;
            const expectedF401k2=1575000;
            const expectedReg1=52500;
            const expectedReg2=78750;

            growAccounts(rothList,f401kList,regList);
            const rawRoth1=rothList[0].currentValue;
            const resultRoth1=parseFloat((Math.round(rawRoth1 * 100 ) / 100).toFixed(2));
            const rawRoth2=rothList[1].currentValue;
            const resultRoth2=parseFloat((Math.round(rawRoth2 * 100 ) / 100).toFixed(2));
            const rawF401k1=f401kList[0].currentValue;
            const resultF401k1=parseFloat((Math.round(rawF401k1 * 100 ) / 100).toFixed(2));
            const rawF401k2=f401kList[1].currentValue;
            const resultF401k2=parseFloat((Math.round(rawF401k2 * 100 ) / 100).toFixed(2));
            const rawReg1=regList[0].currentValue;
            const resultReg1=parseFloat((Math.round(rawReg1 * 100 ) / 100).toFixed(2));
            const rawReg2=regList[1].currentValue;
            const resultReg2=parseFloat((Math.round(rawReg2 * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(resultRoth1, expectedRoth1);
            assert.strictEqual(resultRoth2, expectedRoth2);
            assert.strictEqual(resultF401k1, expectedF401k1);
            assert.strictEqual(resultF401k2, expectedF401k2);
            assert.strictEqual(resultReg1, expectedReg1);
            assert.strictEqual(resultReg2, expectedReg2);                    
        });
        it('creates two roth accounts, two 401k accounts, and two reg accounts for two people, and grows them with inflation', ()=>{
            const rothValue1=700000;
            const rothValue2=500000;
            const f401kValue1=3500000;
            const f401kValue2=1500000;
            const regValue1=50000;
            const regValue2=75000;
            const inflation=.01;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, .05, .075);
            personList[1] = personCreator('Jamie', 20, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            rothList[0]=new RothIRA('Name', rothValue1, .05, 'John', personList, inflation);
            rothList[1]=new RothIRA('Name2', rothValue2, .05, 'Jamie', personList, inflation);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, .05, 'John', personList, inflation);
            f401kList[1]=new F401k('NameB', f401kValue2, .05, 'Jamie', personList, inflation);
            const regList=[];
            regList[0] = new RegInvestment('Name', regValue1, .05, 'John', personList, inflation);
            regList[1] = new RegInvestment('Name', regValue2, .05, 'Jamie', personList, inflation);
            const expectedRoth1=728000;
            const expectedRoth2=520000;
            const expectedF401k1=3640000;
            const expectedF401k2=1560000;
            const expectedReg1=52000;
            const expectedReg2=78000;

            growAccounts(rothList,f401kList,regList);
            const rawRoth1=rothList[0].currentValue;
            const resultRoth1=parseFloat((Math.round(rawRoth1 * 100 ) / 100).toFixed(2));
            const rawRoth2=rothList[1].currentValue;
            const resultRoth2=parseFloat((Math.round(rawRoth2 * 100 ) / 100).toFixed(2));
            const rawF401k1=f401kList[0].currentValue;
            const resultF401k1=parseFloat((Math.round(rawF401k1 * 100 ) / 100).toFixed(2));
            const rawF401k2=f401kList[1].currentValue;
            const resultF401k2=parseFloat((Math.round(rawF401k2 * 100 ) / 100).toFixed(2));
            const rawReg1=regList[0].currentValue;
            const resultReg1=parseFloat((Math.round(rawReg1 * 100 ) / 100).toFixed(2));
            const rawReg2=regList[1].currentValue;
            const resultReg2=parseFloat((Math.round(rawReg2 * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(resultRoth1, expectedRoth1);
            assert.strictEqual(resultRoth2, expectedRoth2);
            assert.strictEqual(resultF401k1, expectedF401k1);
            assert.strictEqual(resultF401k2, expectedF401k2);
            assert.strictEqual(resultReg1, expectedReg1);
            assert.strictEqual(resultReg2, expectedReg2);                    
        });
        it('creates two roth accounts, two 401k accounts, and two reg accounts for two people, and grows them at different rates with inflation', ()=>{
            const rothValue1=700000;
            const rothValue2=500000;
            const f401kValue1=3500000;
            const f401kValue2=1500000;
            const regValue1=50000;
            const regValue2=75000;
            const growth1=.1
            const growth2=.025
            const inflation=.01;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, .05, .075);
            personList[1] = personCreator('Jamie', 20, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            rothList[0]=new RothIRA('Name', rothValue1, growth1, 'John', personList, inflation);
            rothList[1]=new RothIRA('Name2', rothValue2, growth2, 'Jamie', personList, inflation);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, growth2, 'John', personList, inflation);
            f401kList[1]=new F401k('NameB', f401kValue2, growth1, 'Jamie', personList, inflation);
            const regList=[];
            regList[0] = new RegInvestment('Name', regValue1, growth1, 'John', personList, inflation);
            regList[1] = new RegInvestment('Name', regValue2, growth2, 'Jamie', personList, inflation);
            const expectedRoth1=763000;
            const expectedRoth2=507500;
            const expectedF401k1=3552500;
            const expectedF401k2=1635000;
            const expectedReg1=54500;
            const expectedReg2=76125;

            growAccounts(rothList,f401kList,regList);
            const rawRoth1=rothList[0].currentValue;
            const resultRoth1=parseFloat((Math.round(rawRoth1 * 100 ) / 100).toFixed(2));
            const rawRoth2=rothList[1].currentValue;
            const resultRoth2=parseFloat((Math.round(rawRoth2 * 100 ) / 100).toFixed(2));
            const rawF401k1=f401kList[0].currentValue;
            const resultF401k1=parseFloat((Math.round(rawF401k1 * 100 ) / 100).toFixed(2));
            const rawF401k2=f401kList[1].currentValue;
            const resultF401k2=parseFloat((Math.round(rawF401k2 * 100 ) / 100).toFixed(2));
            const rawReg1=regList[0].currentValue;
            const resultReg1=parseFloat((Math.round(rawReg1 * 100 ) / 100).toFixed(2));
            const rawReg2=regList[1].currentValue;
            const resultReg2=parseFloat((Math.round(rawReg2 * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(resultRoth1, expectedRoth1);
            assert.strictEqual(resultRoth2, expectedRoth2);
            assert.strictEqual(resultF401k1, expectedF401k1);
            assert.strictEqual(resultF401k2, expectedF401k2);
            assert.strictEqual(resultReg1, expectedReg1);
            assert.strictEqual(resultReg2, expectedReg2);                    
        });
        it('creates two roth accounts, two 401k accounts, and three reg accounts for two people, and grows them at different rates with inflation', ()=>{
            const rothValue1=700000;
            const rothValue2=500000;
            const f401kValue1=3500000;
            const f401kValue2=1500000;
            const regValue1=50000;
            const regValue2=75000;
            const regValue3=112500;
            const growth1=.1
            const growth2=.025
            const inflation=.01;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, .05, .075);
            personList[1] = personCreator('Jamie', 20, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            rothList[0]=new RothIRA('Name', rothValue1, growth1, 'John', personList, inflation);
            rothList[1]=new RothIRA('Name2', rothValue2, growth2, 'Jamie', personList, inflation);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, growth2, 'John', personList, inflation);
            f401kList[1]=new F401k('NameB', f401kValue2, growth1, 'Jamie', personList, inflation);
            const regList=[];
            regList[0] = new RegInvestment('Name', regValue1, growth1, 'John', personList, inflation);
            regList[1] = new RegInvestment('Name', regValue2, growth2, 'Jamie', personList, inflation);
            regList[2] = new RegInvestment('Name', regValue3, growth2, 'Jamie', personList, inflation);
            const expectedRoth1=763000;
            const expectedRoth2=507500;
            const expectedF401k1=3552500;
            const expectedF401k2=1635000;
            const expectedReg1=54500;
            const expectedReg2=76125;
            const expectedReg3=114187.5;

            growAccounts(rothList,f401kList,regList);
            const rawRoth1=rothList[0].currentValue;
            const resultRoth1=parseFloat((Math.round(rawRoth1 * 100 ) / 100).toFixed(2));
            const rawRoth2=rothList[1].currentValue;
            const resultRoth2=parseFloat((Math.round(rawRoth2 * 100 ) / 100).toFixed(2));
            const rawF401k1=f401kList[0].currentValue;
            const resultF401k1=parseFloat((Math.round(rawF401k1 * 100 ) / 100).toFixed(2));
            const rawF401k2=f401kList[1].currentValue;
            const resultF401k2=parseFloat((Math.round(rawF401k2 * 100 ) / 100).toFixed(2));
            const rawReg1=regList[0].currentValue;
            const resultReg1=parseFloat((Math.round(rawReg1 * 100 ) / 100).toFixed(2));
            const rawReg2=regList[1].currentValue;
            const resultReg2=parseFloat((Math.round(rawReg2 * 100 ) / 100).toFixed(2));
            const rawReg3=regList[2].currentValue;
            const resultReg3=parseFloat((Math.round(rawReg3 * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(resultRoth1, expectedRoth1);
            assert.strictEqual(resultRoth2, expectedRoth2);
            assert.strictEqual(resultF401k1, expectedF401k1);
            assert.strictEqual(resultF401k2, expectedF401k2);
            assert.strictEqual(resultReg1, expectedReg1);
            assert.strictEqual(resultReg2, expectedReg2);
            assert.strictEqual(resultReg3, expectedReg3);                    
        });
        it('creates one roth account, one 401k account, and one reg account for one person, and grows them with inflation', ()=>{
            const rothValue1=700000;
            const f401kValue1=3500000;
            const regValue1=50000;
            const growth1=.1
            const growth2=.025
            const inflation=.01;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            rothList[0]=new RothIRA('Name', rothValue1, growth1, 'John', personList, inflation);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, growth2, 'John', personList, inflation);
            const regList=[];
            regList[0] = new RegInvestment('Name', regValue1, growth1, 'John', personList, inflation);
            const expectedRoth1=763000;
            const expectedF401k1=3552500;
            const expectedReg1=54500;

            growAccounts(rothList,f401kList,regList);
            const rawRoth1=rothList[0].currentValue;
            const resultRoth1=parseFloat((Math.round(rawRoth1 * 100 ) / 100).toFixed(2));
            const rawF401k1=f401kList[0].currentValue;
            const resultF401k1=parseFloat((Math.round(rawF401k1 * 100 ) / 100).toFixed(2));
            const rawReg1=regList[0].currentValue;
            const resultReg1=parseFloat((Math.round(rawReg1 * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(resultRoth1, expectedRoth1);
            assert.strictEqual(resultF401k1, expectedF401k1);
            assert.strictEqual(resultReg1, expectedReg1);                    
        });
        it('creates one roth account, one 401k account, and one reg account for one person, and applies negative growth', ()=>{
            const rothValue1=700000;
            const f401kValue1=3500000;
            const regValue1=50000;
            const growth1=-.1
            const inflation=0;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            rothList[0]=new RothIRA('Name', rothValue1, growth1, 'John', personList, inflation);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, growth1, 'John', personList, inflation);
            const regList=[];
            regList[0] = new RegInvestment('Name', regValue1, growth1, 'John', personList, inflation);
            const expectedRoth1=630000;
            const expectedF401k1=3150000;
            const expectedReg1=45000;

            growAccounts(rothList,f401kList,regList);
            const rawRoth1=rothList[0].currentValue;
            const resultRoth1=parseFloat((Math.round(rawRoth1 * 100 ) / 100).toFixed(2));
            const rawF401k1=f401kList[0].currentValue;
            const resultF401k1=parseFloat((Math.round(rawF401k1 * 100 ) / 100).toFixed(2));
            const rawReg1=regList[0].currentValue;
            const resultReg1=parseFloat((Math.round(rawReg1 * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(resultRoth1, expectedRoth1);
            assert.strictEqual(resultF401k1, expectedF401k1);
            assert.strictEqual(resultReg1, expectedReg1);                    
        });
        it('creates one reg account, and grows it against inflation', ()=>{
            const regValue1=60000;
            const growth1=.075
            const inflation=0;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            const f401kList=[];
            const regList=[];
            regList[0] = new RegInvestment('Name', regValue1, growth1, 'John', personList, inflation);
            const expectedReg1=64500;

            growAccounts(rothList,f401kList,regList);
            const rawReg1=regList[0].currentValue;
            const resultReg1=parseFloat((Math.round(rawReg1 * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(resultReg1, expectedReg1);                    
        });
    });
    describe('increase 401ks', ()=>{
        it('creates two 401k accounts and increases them with pretax/match contributions', ()=>{
            const year=2020;
            const f401kValue1=250000;
            const f401kValue2=300000;
            const inflation=0;
            const preTax=.05;
            const match=.025;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, preTax, match);
            personList[1] = personCreator('Jamie', 20, 50000, .05, [], [], 2060, preTax, match);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, .05, 'John', personList, inflation);
            f401kList[1]=new F401k('NameB', f401kValue2, .05, 'Jamie', personList, inflation);
            const expectedF401k1=257500;
            const expectedF401k2=303750;
        
            increase401ks(year, f401kList);
            const rawF401k1=f401kList[0].currentValue;
            const resultF401k1=parseFloat((Math.round(rawF401k1 * 100 ) / 100).toFixed(2));
            const rawF401k2=f401kList[1].currentValue;
            const resultF401k2=parseFloat((Math.round(rawF401k2 * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(resultF401k1, expectedF401k1);
            assert.strictEqual(resultF401k2, expectedF401k2);
        });
        it('creates two 401k accounts and increases them with different pretax/match contributions', ()=>{
            const year=2020;
            const f401kValue1=250000;
            const f401kValue2=300000;
            const inflation=0;
            const preTax=.05;
            const match=.025;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, preTax, match);
            personList[1] = personCreator('Jamie', 20, 50000, .05, [], [], 2060, preTax*2, match*2);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, .05, 'John', personList, inflation);
            f401kList[1]=new F401k('NameB', f401kValue2, .05, 'Jamie', personList, inflation);
            const expectedF401k1=257500;
            const expectedF401k2=307500;
        
            increase401ks(year, f401kList);
            const rawF401k1=f401kList[0].currentValue;
            const resultF401k1=parseFloat((Math.round(rawF401k1 * 100 ) / 100).toFixed(2));
            const rawF401k2=f401kList[1].currentValue;
            const resultF401k2=parseFloat((Math.round(rawF401k2 * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(resultF401k1, expectedF401k1);
            assert.strictEqual(resultF401k2, expectedF401k2);
        });
        it('creates two 401k accounts and increases themin future year with different pretax/match contributions', ()=>{
            const year=2028;
            const f401kValue1=250000;
            const f401kValue2=300000;
            const inflation=0;
            const preTax=.05;
            const match=.025;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, preTax, match);
            personList[1] = personCreator('Jamie', 20, 50000, .075, [], [], 2060, preTax*2, match*2);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, .05, 'John', personList, inflation);
            f401kList[1]=new F401k('NameB', f401kValue2, .05, 'Jamie', personList, inflation);
            const expectedF401k1=261080.92;
            const expectedF401k2=313376.08;
        
            increase401ks(year, f401kList);
            const rawF401k1=f401kList[0].currentValue;
            const resultF401k1=parseFloat((Math.round(rawF401k1 * 100 ) / 100).toFixed(2));
            const rawF401k2=f401kList[1].currentValue;
            const resultF401k2=parseFloat((Math.round(rawF401k2 * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(resultF401k1, expectedF401k1);
            assert.strictEqual(resultF401k2, expectedF401k2);
        });
        it('creates two 401k accounts but only one owned by someone with preatx, and increases them', ()=>{
            const year=2028;
            const f401kValue1=250000;
            const f401kValue2=300000;
            const inflation=0;
            const preTax=.05;
            const match=.025;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, 0, 0);
            personList[1] = personCreator('Jamie', 20, 50000, .075, [], [], 2060, preTax*2, match*2);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, .05, 'John', personList, inflation);
            f401kList[1]=new F401k('NameB', f401kValue2, .05, 'Jamie', personList, inflation);
            const expectedF401k1=250000;
            const expectedF401k2=313376.08;
        
            increase401ks(year, f401kList);
            const rawF401k1=f401kList[0].currentValue;
            const resultF401k1=parseFloat((Math.round(rawF401k1 * 100 ) / 100).toFixed(2));
            const rawF401k2=f401kList[1].currentValue;
            const resultF401k2=parseFloat((Math.round(rawF401k2 * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(resultF401k1, expectedF401k1);
            assert.strictEqual(resultF401k2, expectedF401k2);
        });
        it('creates one 401k account and increases it', ()=>{
            const year=2028;
            const f401kValue1=250000;
            const inflation=0;
            const preTax=.05;
            const match=.025;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, preTax, match);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, .05, 'John', personList, inflation);
            const expectedF401k1=261080.92;
        
            increase401ks(year, f401kList);
            const rawF401k1=f401kList[0].currentValue;
            const resultF401k1=parseFloat((Math.round(rawF401k1 * 100 ) / 100).toFixed(2));
    
            assert.strictEqual(resultF401k1, expectedF401k1);
        });
        it('tries to increase an empty 401k array', ()=>{
            const year=2028;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, .05, .05);
            const f401kList=[];
            const expectedResult=0;
        
            increase401ks(year, f401kList);
            const result=f401kList.length
    
            assert.strictEqual(result, expectedResult);
        });
    });
    describe('return account values', ()=>{
        it('creates two roth accounts, two 401k accounts, and two reg accounts for two people, and returns values for them', ()=>{
            const rothValue1=700000;
            const rothValue2=500000;
            const f401kValue1=3500000;
            const f401kValue2=1500000;
            const regValue1=50000;
            const regValue2=75000;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, .05, .075);
            personList[1] = personCreator('Jamie', 20, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            rothList[0]=new RothIRA('Name', rothValue1, .05, 'John', personList, 0);
            rothList[1]=new RothIRA('Name2', rothValue2, .05, 'Jamie', personList, 0);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, .05, 'John', personList, 0);
            f401kList[1]=new F401k('NameB', f401kValue2, .05, 'Jamie', personList, 0);
            const regList=[];
            regList[0] = new RegInvestment('Name', regValue1, .05, 'John', personList, 0);
            regList[1] = new RegInvestment('Name', regValue2, .05, 'Jamie', personList, 0);
            const expectedRetirment=6200000;
            const expectedRegular=125000;

            const returnValue=returnAccountValues(rothList,f401kList,regList);
            const retirementResultRaw=returnValue.retirementValue;
            const regularResultRaw=returnValue.regularValue;
            
            const retirementResult=parseFloat((Math.round(retirementResultRaw * 100 ) / 100).toFixed(2));
            
            const regularResult=parseFloat((Math.round(regularResultRaw * 100 ) / 100).toFixed(2));
                            
            assert.strictEqual(retirementResult, expectedRetirment);
            assert.strictEqual(regularResult, expectedRegular);                   
        });
        it('creates two roth accounts, two 401k accounts, and three reg accounts for two people, and returns values for them', ()=>{
            const rothValue1=700000;
            const rothValue2=500000;
            const f401kValue1=3500000;
            const f401kValue2=1500000;
            const regValue1=50000;
            const regValue2=75000;
            const regValue3=500000;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, .05, .075);
            personList[1] = personCreator('Jamie', 20, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            rothList[0]=new RothIRA('Name', rothValue1, .05, 'John', personList, 0);
            rothList[1]=new RothIRA('Name2', rothValue2, .05, 'Jamie', personList, 0);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, .05, 'John', personList, 0);
            f401kList[1]=new F401k('NameB', f401kValue2, .05, 'Jamie', personList, 0);
            const regList=[];
            regList[0] = new RegInvestment('Name', regValue1, .05, 'John', personList, 0);
            regList[1] = new RegInvestment('Name', regValue2, .05, 'Jamie', personList, 0);
            regList[2] = new RegInvestment('Name', regValue3, .05, 'Jamie', personList, 0);
            const expectedRetirment=6200000;
            const expectedRegular=625000;

            const returnValue=returnAccountValues(rothList,f401kList,regList);
            const retirementResultRaw=returnValue.retirementValue;
            const regularResultRaw=returnValue.regularValue;
            
            const retirementResult=parseFloat((Math.round(retirementResultRaw * 100 ) / 100).toFixed(2));
            
            const regularResult=parseFloat((Math.round(regularResultRaw * 100 ) / 100).toFixed(2));
                            
            assert.strictEqual(retirementResult, expectedRetirment);
            assert.strictEqual(regularResult, expectedRegular);                   
        });
        it('creates one roth account, one 401k account, and one reg account for one person, and returns values for them', ()=>{
            const rothValue1=700000;
            const f401kValue1=3500000;
            const regValue1=50000;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            rothList[0]=new RothIRA('Name', rothValue1, .05, 'John', personList, 0);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, .05, 'John', personList, 0);
            const regList=[];
            regList[0] = new RegInvestment('Name', regValue1, .05, 'John', personList, 0);
            const expectedRetirment=4200000;
            const expectedRegular=50000;

            const returnValue=returnAccountValues(rothList,f401kList,regList);
            const retirementResultRaw=returnValue.retirementValue;
            const regularResultRaw=returnValue.regularValue;
            
            const retirementResult=parseFloat((Math.round(retirementResultRaw * 100 ) / 100).toFixed(2));
            
            const regularResult=parseFloat((Math.round(regularResultRaw * 100 ) / 100).toFixed(2));
                            
            assert.strictEqual(retirementResult, expectedRetirment);
            assert.strictEqual(regularResult, expectedRegular);                   
        });
        it('creates zero retirement accounts and one reg account for one person, and returns values for them', ()=>{
            const regValue1=50000;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            const f401kList=[];
            const regList=[];
            regList[0] = new RegInvestment('Name', regValue1, .05, 'John', personList, 0);
            const expectedRetirment=0;
            const expectedRegular=50000;

            const returnValue=returnAccountValues(rothList,f401kList,regList);
            const retirementResultRaw=returnValue.retirementValue;
            const regularResultRaw=returnValue.regularValue;
            
            const retirementResult=parseFloat((Math.round(retirementResultRaw * 100 ) / 100).toFixed(2));
            
            const regularResult=parseFloat((Math.round(regularResultRaw * 100 ) / 100).toFixed(2));
                            
            assert.strictEqual(retirementResult, expectedRetirment);
            assert.strictEqual(regularResult, expectedRegular);                   
        });
        it('creates one roth account, one 401k account, and zero reg account for one person, and returns values for them', ()=>{
            const rothValue1=700000;
            const f401kValue1=3500000;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            rothList[0]=new RothIRA('Name', rothValue1, .05, 'John', personList, 0);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, .05, 'John', personList, 0);
            const regList=[];
            const expectedRetirment=4200000;
            const expectedRegular=0;

            const returnValue=returnAccountValues(rothList,f401kList,regList);
            const retirementResultRaw=returnValue.retirementValue;
            const regularResultRaw=returnValue.regularValue;
            
            const retirementResult=parseFloat((Math.round(retirementResultRaw * 100 ) / 100).toFixed(2));
            
            const regularResult=parseFloat((Math.round(regularResultRaw * 100 ) / 100).toFixed(2));
                            
            assert.strictEqual(retirementResult, expectedRetirment);
            assert.strictEqual(regularResult, expectedRegular);                   
        });
        it('creates one roth account, one 401k account, and zero reg account for two people, and returns values for them', ()=>{
            const rothValue1=700000;
            const f401kValue1=3500000;
            personList=[];
            personList[0] = personCreator('John', 20, 100000, .05, [], [], 2060, .05, .075);
            personList[1] = personCreator('Jamie', 20, 100000, .05, [], [], 2060, .05, .075);
            const rothList=[];
            rothList[0]=new RothIRA('Name', rothValue1, .05, 'John', personList, 0);
            const f401kList=[];
            f401kList[0]=new F401k('NameA', f401kValue1, .05, 'John', personList, 0);
            const regList=[];
            const expectedRetirment=4200000;
            const expectedRegular=0;

            const returnValue=returnAccountValues(rothList,f401kList,regList);
            const retirementResultRaw=returnValue.retirementValue;
            const regularResultRaw=returnValue.regularValue;
            
            const retirementResult=parseFloat((Math.round(retirementResultRaw * 100 ) / 100).toFixed(2));
            
            const regularResult=parseFloat((Math.round(regularResultRaw * 100 ) / 100).toFixed(2));
                            
            assert.strictEqual(retirementResult, expectedRetirment);
            assert.strictEqual(regularResult, expectedRegular);                   
        });
    });
    describe('find element index', ()=>{
        it('creates an array of objects with names and finds index of a certain name in that array', ()=>{
            const array=[{name: 'John'}, {name:'Jamie'}, {name:'Frankie'}];
            const name='John'
            const expectedResult=0;
    
            const result=findElementIndex(array, name);
    
            assert.strictEqual(result, expectedResult);                    
        });
        it('creates an array of objects with names and finds index of a different name in that array', ()=>{
            const array=[{name: 'John'}, {name:'Jamie'}, {name:'Frankie'}];
            const name='Frankie'
            const expectedResult=2;
    
            const result=findElementIndex(array, name);
    
            assert.strictEqual(result, expectedResult);                    
        });
        it('creates an empty array and tries to find index of a name', ()=>{
            const array=[];
            const name='Frankie'
            const expectedResult=undefined;
    
            const result=findElementIndex(array, name);
    
            assert.strictEqual(result, expectedResult);                    
        });
        it('creates an array of objects with names and finds index of a repeated name in that array', ()=>{
            const array=[{name: 'John'}, {name:'Jamie'}, {name:'John'}];
            const name='John'
            const expectedResult=0;
    
            const result=findElementIndex(array, name);
    
            assert.strictEqual(result, expectedResult);                    
        });
    });
    describe('RMD factor', ()=>{
        it('calls RMD factor on a too-early age', ()=>{
            const age=30;
            const expectedResult=0;
    
            const result=rmdFactor(age);
    
            assert.strictEqual(result, expectedResult);                    
        });
        it('calls RMD factor on age 70', ()=>{
            const age=70;
            const expectedResult=27.4;
    
            const result=rmdFactor(age);
    
            assert.strictEqual(result, expectedResult);                    
        });
        it('calls RMD factor on age 75', ()=>{
            const age=75;
            const expectedResult=22.9;
    
            const result=rmdFactor(age);
    
            assert.strictEqual(result, expectedResult);                    
        });
        it('calls RMD factor on age 80', ()=>{
            const age=80;
            const expectedResult=18.7;
    
            const result=rmdFactor(age);
    
            assert.strictEqual(result, expectedResult);                    
        });
        it('calls RMD factor on age 87', ()=>{
            const age=87;
            const expectedResult=13.4;
    
            const result=rmdFactor(age);
    
            assert.strictEqual(result, expectedResult);                    
        });
        it('calls RMD factor on age 98', ()=>{
            const age=98;
            const expectedResult=7.1;
    
            const result=rmdFactor(age);
    
            assert.strictEqual(result, expectedResult);                    
        });
        it('calls RMD factor on age 109', ()=>{
            const age=109;
            const expectedResult=3.4;
    
            const result=rmdFactor(age);
    
            assert.strictEqual(result, expectedResult);                    
        });
        it('calls RMD factor on age 116', ()=>{
            const age=116;
            const expectedResult=1.9;
    
            const result=rmdFactor(age);
    
            assert.strictEqual(result, expectedResult);                    
        });
    });
});