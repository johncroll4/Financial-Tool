const assert = require('assert');
const regSpending = require('../regularcost.js');

describe(`regular cost calculations`, ()=>{
    describe('regSpending', ()=>{
        it('calculates spending for two people, neither in retirement', ()=>{
            const year = 2030;
            const monthlySpend = 5000;
            const retirementSpend = 7500;
            const expectedResult = 60000;
            const householdMembers = [
                {
                    _retirementYear: 2054
                },
                {
                    _retirementYear: 2055
                }];

            const result = regSpending(year, monthlySpend, retirementSpend, householdMembers);

            assert.strictEqual(result, expectedResult);
        });
        it('calculates spending for one person, not in retirement', ()=>{
            const year = 2030;
            const monthlySpend = 4000;
            const retirementSpend = 8500;
            const expectedResult = 48000;
            const householdMembers = [
                {
                    _retirementYear: 2050
                }];

            const result = regSpending(year, monthlySpend, retirementSpend, householdMembers);

            assert.strictEqual(result, expectedResult);
        });
        it('calculates spending for two people, one in retirement', ()=>{
            const year = 2053;
            const monthlySpend = 4000;
            const retirementSpend = 8000;
            const expectedResult = 96000;
            const householdMembers = [
                {
                    _retirementYear: 2052
                },
                {
                    _retirementYear: 2055
                }];

            const result = regSpending(year, monthlySpend, retirementSpend, householdMembers);

            assert.strictEqual(result, expectedResult);
        });
        it('calculates spending for two people, both in retirement', ()=>{
            const year = 2060;
            const monthlySpend = 4000;
            const retirementSpend = 8000;
            const expectedResult = 96000;
            const householdMembers = [
                {
                    _retirementYear: 2052
                },
                {
                    _retirementYear: 2055
                }];

            const result = regSpending(year, monthlySpend, retirementSpend, householdMembers);

            assert.strictEqual(result, expectedResult);
        });
        it('calculates spending for one person, in retirement', ()=>{
            const year = 2051;
            const monthlySpend = 4000;
            const retirementSpend = 8500;
            const expectedResult = 102000;
            const householdMembers = [
                {
                    _retirementYear: 2050
                }];

            const result = regSpending(year, monthlySpend, retirementSpend, householdMembers);

            assert.strictEqual(result, expectedResult);
        });
        it('calculates spending for one person, with empty household members', ()=>{
            const year = 2051;
            const monthlySpend = 4000;
            const retirementSpend = 8500;
            const expectedResult = undefined;
            const householdMembers = [];

            const result = regSpending(year, monthlySpend, retirementSpend, householdMembers);

            assert.strictEqual(result, expectedResult);
        });
        it('calculates spending for one person, with too many household members', ()=>{
            const year = 2051;
            const monthlySpend = 4000;
            const retirementSpend = 8500;
            const expectedResult = undefined;
            const householdMembers = [
                {
                    _retirementYear: 2052
                },
                {
                    _retirementYear: 2055
                },
                {
                    _retirementYear: 2056
                }];

            const result = regSpending(year, monthlySpend, retirementSpend, householdMembers);

            assert.strictEqual(result, expectedResult);
        });
        it('calculates zero spending', ()=>{
            const year = 2030;
            const monthlySpend = 0;
            const retirementSpend = 8000;
            const expectedResult = 0;
            const householdMembers = [
                {
                    _retirementYear: 2052
                },
                {
                    _retirementYear: 2055
                }];

            const result = regSpending(year, monthlySpend, retirementSpend, householdMembers);

            assert.strictEqual(result, expectedResult);
        });
    });
});