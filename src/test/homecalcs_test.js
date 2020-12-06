const assert = require('assert');
const housingImports = require('../homecalcs.js');
const returnAnnualHousingCost = housingImports.returnAnnualHousingCost;
const findHousePurchaseYearCashFlow = housingImports.findHousePurchaseYearCashFlow;
const homeCreator = housingImports.homeCreator;

describe('housing cost calculations', ()=>{
    //setup
    let houseList=[];
        
    describe('home creator',()=>{
        describe('home creator get mortgage payment',()=>{
            it('creates a home and returns mortgage payment',()=>{
                const origValue=500000;
                const expectedResult=1909.66;
        
                const home = homeCreator(2, 2020, 2030, origValue, .03, .04, .015, .2, 30, 0, false, 0);
                const rawResult = home.mortgagePayment;
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a home with zero down payment and returns mortgage payment',()=>{
                const origValue=500000;
                const downPayment=0;
                const expectedResult=2387.08;
        
                const home = homeCreator(2, 2020, 2030, origValue, .03, .04, .015, downPayment, 30, 0, false, 0);
                const rawResult = home.mortgagePayment;
                const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a home with invalid original value and returns mortgage payment',()=>{
                const origValue='value';
                const expectedResult=undefined;
        
                const home = homeCreator(2, 2020, 2030, origValue, .03, .04, .015, .2, 30, 0, false, 0);
                const result = home.mortgagePayment;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a home with invalid interest rate and returns mortgage payment',()=>{
                const interest=2;
                const expectedResult=undefined;
        
                const home = homeCreator(2, 2020, 2030, 500000, .03, interest, .015, .2, 30, 0, false, 0);
                const result = home.mortgagePayment;
        
                assert.strictEqual(result, expectedResult);
            });
        });
        describe('home creator yearly values',()=>{
            it('creates a home and returns yearly values for purchase year',()=>{
                const yearPurchased=2030;
                const yearSold=2040;
                const origValue=600000;
                const growth=.015;
                const interest=.035;
                const realEstateTaxRate=.02;
                const downPayment=.2;
                const mortgageYears=30;
                const HOA=0;
                const expectedMonthlyPayment=2155.41;
                const expectedAnnualCost=37864.97;
                const expectedRemainingBalance=480000;
                const expectedEquity=120000;

                const home = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
                const rawResult=home.yearlyValues(yearPurchased, .01);
                const resultMonthlyPayment=parseFloat((Math.round(rawResult.monthlyPayment * 100 ) / 100).toFixed(2));
                const resultAnnualCost=parseFloat((Math.round(rawResult.annualCost * 100 ) / 100).toFixed(2));
                const resultRemainingBalance=parseFloat((Math.round(rawResult.remainingBalance * 100 ) / 100).toFixed(2));
                const resultEquity=parseFloat((Math.round(rawResult.equity * 100 ) / 100).toFixed(2));

                assert.strictEqual(resultMonthlyPayment, expectedMonthlyPayment);
                assert.strictEqual(resultAnnualCost, expectedAnnualCost);
                assert.strictEqual(resultRemainingBalance, expectedRemainingBalance);
                assert.strictEqual(resultEquity, expectedEquity);
            });
            it('creates a home and returns yearly values for second year',()=>{
                const yearPurchased=2030;
                const yearSold=2040;
                const origValue=600000;
                const growth=.025;
                const interest=.035;
                const realEstateTaxRate=.02;
                const downPayment=.2;
                const mortgageYears=30;
                const HOA=0;
                const expectedMonthlyPayment=2155.41;
                const expectedAnnualCost=38044.97;
                const expectedRemainingBalance=470788.19;
                const expectedEquity=138211.81;
                const seekingYear=2031;

                const home = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
                const rawResult=home.yearlyValues(seekingYear, .01);
                const resultMonthlyPayment=parseFloat((Math.round(rawResult.monthlyPayment * 100 ) / 100).toFixed(2));
                const resultAnnualCost=parseFloat((Math.round(rawResult.annualCost * 100 ) / 100).toFixed(2));
                const resultRemainingBalance=parseFloat((Math.round(rawResult.remainingBalance * 100 ) / 100).toFixed(2));
                const resultEquity=parseFloat((Math.round(rawResult.equity * 100 ) / 100).toFixed(2));

                assert.strictEqual(resultMonthlyPayment, expectedMonthlyPayment);
                assert.strictEqual(resultAnnualCost, expectedAnnualCost);
                assert.strictEqual(resultRemainingBalance, expectedRemainingBalance);
                assert.strictEqual(resultEquity, expectedEquity);
            });
            it('creates a home and returns yearly values for year after sale',()=>{
                const yearPurchased=2030;
                const yearSold=2040;
                const origValue=600000;
                const growth=.025;
                const interest=.035;
                const realEstateTaxRate=.02;
                const downPayment=.2;
                const mortgageYears=30;
                const HOA=0;
                const expectedMonthlyPayment=0;
                const expectedAnnualCost=0;
                const expectedRemainingBalance=0;
                const expectedEquity=0;
                const seekingYear=2041;

                const home = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
                const rawResult=home.yearlyValues(seekingYear, .01);
                const resultMonthlyPayment=parseFloat((Math.round(rawResult.monthlyPayment * 100 ) / 100).toFixed(2));
                const resultAnnualCost=parseFloat((Math.round(rawResult.annualCost * 100 ) / 100).toFixed(2));
                const resultRemainingBalance=parseFloat((Math.round(rawResult.remainingBalance * 100 ) / 100).toFixed(2));
                const resultEquity=parseFloat((Math.round(rawResult.equity * 100 ) / 100).toFixed(2));

                assert.strictEqual(resultMonthlyPayment, expectedMonthlyPayment);
                assert.strictEqual(resultAnnualCost, expectedAnnualCost);
                assert.strictEqual(resultRemainingBalance, expectedRemainingBalance);
                assert.strictEqual(resultEquity, expectedEquity);
            });
            it('creates a home and returns yearly values for year after mortage is paid off',()=>{
                const yearPurchased=2030;
                const yearSold=2200;
                const origValue=600000;
                const growth=.025;
                const interest=.035;
                const realEstateTaxRate=.02;
                const downPayment=.2;
                const mortgageYears=30;
                const HOA=0;
                const expectedMonthlyPayment=2155.41;
                const expectedAnnualCost=21768.22;
                const expectedRemainingBalance=0;
                const expectedEquity=1088411.05;
                const seekingYear=2070;

                const home = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
                const rawResult=home.yearlyValues(seekingYear, .01);
                const resultMonthlyPayment=parseFloat((Math.round(rawResult.monthlyPayment * 100 ) / 100).toFixed(2));
                const resultAnnualCost=parseFloat((Math.round(rawResult.annualCost * 100 ) / 100).toFixed(2));
                const resultRemainingBalance=parseFloat((Math.round(rawResult.remainingBalance * 100 ) / 100).toFixed(2));
                const resultEquity=parseFloat((Math.round(rawResult.equity * 100 ) / 100).toFixed(2));

                assert.strictEqual(resultMonthlyPayment, expectedMonthlyPayment);
                assert.strictEqual(resultAnnualCost, expectedAnnualCost);
                assert.strictEqual(resultRemainingBalance, expectedRemainingBalance);
                assert.strictEqual(resultEquity, expectedEquity);
            });
            it('creates a home and returns yearly values for random year in the middle',()=>{
                const yearPurchased=2030;
                const yearSold=2200;
                const origValue=300000;
                const growth=.025;
                const interest=.035;
                const realEstateTaxRate=.02;
                const downPayment=.2;
                const mortgageYears=30;
                const HOA=0;
                const expectedMonthlyPayment=1077.71;
                const expectedAnnualCost=21013.62;
                const expectedRemainingBalance=108984.96;
                const expectedEquity=295071.54;
                const seekingYear=2050;

                const home = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
                const rawResult=home.yearlyValues(seekingYear, .01);
                const resultMonthlyPayment=parseFloat((Math.round(rawResult.monthlyPayment * 100 ) / 100).toFixed(2));
                const resultAnnualCost=parseFloat((Math.round(rawResult.annualCost * 100 ) / 100).toFixed(2));
                const resultRemainingBalance=parseFloat((Math.round(rawResult.remainingBalance * 100 ) / 100).toFixed(2));
                const resultEquity=parseFloat((Math.round(rawResult.equity * 100 ) / 100).toFixed(2));

                assert.strictEqual(resultMonthlyPayment, expectedMonthlyPayment);
                assert.strictEqual(resultAnnualCost, expectedAnnualCost);
                assert.strictEqual(resultRemainingBalance, expectedRemainingBalance);
                assert.strictEqual(resultEquity, expectedEquity);
            });
            it('creates a 1M home, varies interest and real estate tax, and returns yearly values for random year in the middle',()=>{
                const yearPurchased=2022;
                const yearSold=2040;
                const origValue=1000000;
                const growth=.035;
                const interest=.05;
                const realEstateTaxRate=.03;
                const downPayment=.2;
                const mortgageYears=30;
                const HOA=0;
                const expectedMonthlyPayment=4294.57;
                const expectedAnnualCost=88086.96;
                const expectedRemainingBalance=686823.15;
                const expectedEquity=531579.75;
                const seekingYear=2030;

                const home = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
                const rawResult=home.yearlyValues(seekingYear, .01);
                const resultMonthlyPayment=parseFloat((Math.round(rawResult.monthlyPayment * 100 ) / 100).toFixed(2));
                const resultAnnualCost=parseFloat((Math.round(rawResult.annualCost * 100 ) / 100).toFixed(2));
                const resultRemainingBalance=parseFloat((Math.round(rawResult.remainingBalance * 100 ) / 100).toFixed(2));
                const resultEquity=parseFloat((Math.round(rawResult.equity * 100 ) / 100).toFixed(2));

                assert.strictEqual(resultMonthlyPayment, expectedMonthlyPayment);
                assert.strictEqual(resultAnnualCost, expectedAnnualCost);
                assert.strictEqual(resultRemainingBalance, expectedRemainingBalance);
                assert.strictEqual(resultEquity, expectedEquity);
            });
            it('creates a 1M home, varies year purchased and growth rate, and returns yearly values for random year in the middle',()=>{
                const yearPurchased=2022;
                const yearSold=2040;
                const origValue=300000;
                const growth=.035;
                const interest=.035;
                const realEstateTaxRate=.02;
                const downPayment=.2;
                const mortgageYears=30;
                const HOA=0;
                const expectedMonthlyPayment=1077.71;
                const expectedAnnualCost=20242.90;
                const expectedRemainingBalance=198224.63;
                const expectedEquity=167296.24;
                const seekingYear=2030;

                const home = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
                const rawResult=home.yearlyValues(seekingYear, .01);
                const resultMonthlyPayment=parseFloat((Math.round(rawResult.monthlyPayment * 100 ) / 100).toFixed(2));
                const resultAnnualCost=parseFloat((Math.round(rawResult.annualCost * 100 ) / 100).toFixed(2));
                const resultRemainingBalance=parseFloat((Math.round(rawResult.remainingBalance * 100 ) / 100).toFixed(2));
                const resultEquity=parseFloat((Math.round(rawResult.equity * 100 ) / 100).toFixed(2));

                assert.strictEqual(resultMonthlyPayment, expectedMonthlyPayment);
                assert.strictEqual(resultAnnualCost, expectedAnnualCost);
                assert.strictEqual(resultRemainingBalance, expectedRemainingBalance);
                assert.strictEqual(resultEquity, expectedEquity);
            });
            it('creates a 1M home, varies down payment and length, and returns yearly values for random year in the middle',()=>{
                const yearPurchased=2022;
                const yearSold=2040;
                const origValue=1000000;
                const growth=.035;
                const interest=.05;
                const realEstateTaxRate=.03;
                const downPayment=.1;
                const mortgageYears=20;
                const HOA=0;
                const expectedMonthlyPayment=5939.60;
                const expectedAnnualCost=107827.31;
                const expectedRemainingBalance=642195.18;
                const expectedEquity=576207.72;
                const seekingYear=2030;

                const home = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
                const rawResult=home.yearlyValues(seekingYear, .01);
                const resultMonthlyPayment=parseFloat((Math.round(rawResult.monthlyPayment * 100 ) / 100).toFixed(2));
                const resultAnnualCost=parseFloat((Math.round(rawResult.annualCost * 100 ) / 100).toFixed(2));
                const resultRemainingBalance=parseFloat((Math.round(rawResult.remainingBalance * 100 ) / 100).toFixed(2));
                const resultEquity=parseFloat((Math.round(rawResult.equity * 100 ) / 100).toFixed(2));

                assert.strictEqual(resultMonthlyPayment, expectedMonthlyPayment);
                assert.strictEqual(resultAnnualCost, expectedAnnualCost);
                assert.strictEqual(resultRemainingBalance, expectedRemainingBalance);
                assert.strictEqual(resultEquity, expectedEquity);
            });
            it('creates a 1M home, varies HOA and inflation, and returns yearly values for random year in the middle',()=>{
                const yearPurchased=2025;
                const yearSold=2043;
                const origValue=800000;
                const growth=.025;
                const interest=.04;
                const realEstateTaxRate=.02;
                const downPayment=.2;
                const mortgageYears=30;
                const HOA=500;
                const expectedMonthlyPayment=3055.46;
                const expectedAnnualCost=59908.42;
                const expectedRemainingBalance=413073.92;
                const expectedEquity=449072.27;
                const seekingYear=2040;

                const home = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
                const rawResult=home.yearlyValues(seekingYear, .02);
                const resultMonthlyPayment=parseFloat((Math.round(rawResult.monthlyPayment * 100 ) / 100).toFixed(2));
                const resultAnnualCost=parseFloat((Math.round(rawResult.annualCost * 100 ) / 100).toFixed(2));
                const resultRemainingBalance=parseFloat((Math.round(rawResult.remainingBalance * 100 ) / 100).toFixed(2));
                const resultEquity=parseFloat((Math.round(rawResult.equity * 100 ) / 100).toFixed(2));

                assert.strictEqual(resultMonthlyPayment, expectedMonthlyPayment);
                assert.strictEqual(resultAnnualCost, expectedAnnualCost);
                assert.strictEqual(resultRemainingBalance, expectedRemainingBalance);
                assert.strictEqual(resultEquity, expectedEquity);
            });
            it('creates a rented home with 2k rent and returns yearly values for first year',()=>{
                const yearPurchased=2023;
                const yearSold=2028;
                const origValue=0;
                const growth=0;
                const interest=0;
                const realEstateTaxRate=0;
                const downPayment=0;
                const mortgageYears=0;
                const HOA=0;
                const rent=2000;
                const expectedMonthlyPayment=2000;
                const expectedAnnualCost=24000;
                const expectedRemainingBalance=0;
                const expectedEquity=0;
                const seekingYear=2023;

                const home = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, true, rent);
                const rawResult=home.yearlyValues(seekingYear, .02);
                const resultMonthlyPayment=parseFloat((Math.round(rawResult.monthlyPayment * 100 ) / 100).toFixed(2));
                const resultAnnualCost=parseFloat((Math.round(rawResult.annualCost * 100 ) / 100).toFixed(2));
                const resultRemainingBalance=parseFloat((Math.round(rawResult.remainingBalance * 100 ) / 100).toFixed(2));
                const resultEquity=parseFloat((Math.round(rawResult.equity * 100 ) / 100).toFixed(2));

                assert.strictEqual(resultMonthlyPayment, expectedMonthlyPayment);
                assert.strictEqual(resultAnnualCost, expectedAnnualCost);
                assert.strictEqual(resultRemainingBalance, expectedRemainingBalance);
                assert.strictEqual(resultEquity, expectedEquity);
            });
            it('creates a rented home with 3k rent and returns yearly values year after move out',()=>{
                const yearPurchased=2023;
                const yearSold=2028;
                const origValue=0;
                const growth=0;
                const interest=0;
                const realEstateTaxRate=0;
                const downPayment=0;
                const mortgageYears=0;
                const HOA=0;
                const rent=2000;
                const expectedMonthlyPayment=0;
                const expectedAnnualCost=0;
                const expectedRemainingBalance=0;
                const expectedEquity=0;
                const seekingYear=2030;

                const home = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, true, rent);
                const rawResult=home.yearlyValues(seekingYear, .02);
                const resultMonthlyPayment=parseFloat((Math.round(rawResult.monthlyPayment * 100 ) / 100).toFixed(2));
                const resultAnnualCost=parseFloat((Math.round(rawResult.annualCost * 100 ) / 100).toFixed(2));
                const resultRemainingBalance=parseFloat((Math.round(rawResult.remainingBalance * 100 ) / 100).toFixed(2));
                const resultEquity=parseFloat((Math.round(rawResult.equity * 100 ) / 100).toFixed(2));

                assert.strictEqual(resultMonthlyPayment, expectedMonthlyPayment);
                assert.strictEqual(resultAnnualCost, expectedAnnualCost);
                assert.strictEqual(resultRemainingBalance, expectedRemainingBalance);
                assert.strictEqual(resultEquity, expectedEquity);
            });
        });
        describe('home creator getters and setters',()=>{
            it('creates a home and sets a new number',()=>{
                const startValue=1;
                const expectedResult=1;
        
                const home = homeCreator(2, 2020, 2030, 500000, .03, .04, .015, .2, 30, 0, false, 0);
                home.number=startValue;
                const result = home.number;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a home and sets invalid number',()=>{
                const startValue='string';
                const expectedResult=2;
        
                const home = homeCreator(2, 2020, 2030, 500000, .03, .04, .015, .2, 30, 0, false, 0);
                home.number=startValue;
                const result = home.number;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a home and sets a new purchase year',()=>{
                const startValue=2025;
                const expectedResult=2025;
        
                const home = homeCreator(2, 2020, 2030, 500000, .03, .04, .015, .2, 30, 0, false, 0);
                home.yearPurchased=startValue;
                const result = home.yearPurchased;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a home and sets invalid purchase year',()=>{
                const startValue=5000;
                const expectedResult=2020;
        
                const home = homeCreator(2, 2020, 2030, 500000, .03, .04, .015, .2, 30, 0, false, 0);
                home.yearPurchased=startValue;
                const result = home.yearPurchased;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a home and sets a new sell year',()=>{
                const startValue=2035;
                const expectedResult=2035;
        
                const home = homeCreator(2, 2020, 2030, 500000, .03, .04, .015, .2, 30, 0, false, 0);
                home.yearSold=startValue;
                const result = home.yearSold;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a home and sets invalid sell year',()=>{
                const startValue=5000;
                const expectedResult=2030;
        
                const home = homeCreator(2, 2020, 2030, 500000, .03, .04, .015, .2, 30, 0, false, 0);
                home.yearSold=startValue;
                const result = home.yearSold;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a home and sets a new original value',()=>{
                const startValue=750000;
                const expectedResult=750000;
        
                const home = homeCreator(2, 2020, 2030, 500000, .03, .04, .015, .2, 30, 0, false, 0);
                home.originalValue=startValue;
                const result = home.originalValue;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a home and sets invalid original Value',()=>{
                const startValue=-5000;
                const expectedResult=500000;
        
                const home = homeCreator(2, 2020, 2030, 500000, .03, .04, .015, .2, 30, 0, false, 0);
                home.originalValue=startValue;
                const result = home.originalValue;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a home and sets a new growth rate',()=>{
                const startValue=.05;
                const expectedResult=.05;
        
                const home = homeCreator(2, 2020, 2030, 500000, .03, .04, .015, .2, 30, 0, false, 0);
                home.growthRate=startValue;
                const result = home.growthRate;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a home and sets invalid growth rate',()=>{
                const startValue=-1;
                const expectedResult=.03;
        
                const home = homeCreator(2, 2020, 2030, 500000, .03, .04, .015, .2, 30, 0, false, 0);
                home.growthRate=startValue;
                const result = home.growthRate;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a home and sets a new mortgage interest rate',()=>{
                const startValue=.035;
                const expectedResult=.035;
        
                const home = homeCreator(2, 2020, 2030, 500000, .03, .04, .015, .2, 30, 0, false, 0);
                home.mortgageInterestRate=startValue;
                const result = home.mortgageInterestRate;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a home and sets invalid mortgage interest rate',()=>{
                const startValue=-1;
                const expectedResult=.04;
        
                const home = homeCreator(2, 2020, 2030, 500000, .03, .04, .015, .2, 30, 0, false, 0);
                home.mortgageInterestRate=startValue;
                const result = home.mortgageInterestRate;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a home and sets a new real estate tax rate',()=>{
                const startValue=.02;
                const expectedResult=.02;
        
                const home = homeCreator(2, 2020, 2030, 500000, .03, .04, .015, .2, 30, 0, false, 0);
                home.realEstateTaxRate=startValue;
                const result = home.realEstateTaxRate;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a home and sets invalid real estate tax rate',()=>{
                const startValue=-1;
                const expectedResult=.015;
        
                const home = homeCreator(2, 2020, 2030, 500000, .03, .04, .015, .2, 30, 0, false, 0);
                home.realEstateTaxRate=startValue;
                const result = home.realEstateTaxRate;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a home and sets a new down payment percentage',()=>{
                const startValue=.15;
                const expectedResult=.15;
        
                const home = homeCreator(2, 2020, 2030, 500000, .03, .04, .015, .2, 30, 0, false, 0);
                home.downPayment=startValue;
                const result = home.downPayment;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a home and sets invalid down payment percentage',()=>{
                const startValue=-1;
                const expectedResult=.2;
        
                const home = homeCreator(2, 2020, 2030, 500000, .03, .04, .015, .2, 30, 0, false, 0);
                home.downPayment=startValue;
                const result = home.downPayment;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a home and sets a new mortgage length',()=>{
                const startValue=5;
                const expectedResult=5;
        
                const home = homeCreator(2, 2020, 2030, 500000, .03, .04, .015, .2, 30, 0, false, 0);
                home.mortgageYears=startValue;
                const result = home.mortgageYears;
        
                assert.strictEqual(result, expectedResult);
            });
            it('creates a home and sets invalid mortgage length',()=>{
                const startValue=-10;
                const expectedResult=30;
        
                const home = homeCreator(2, 2020, 2030, 500000, .03, .04, .015, .2, 30, 0, false, 0);
                home.mortgageYears=startValue;
                const result = home.mortgageYears;
        
                assert.strictEqual(result, expectedResult);
            });
        });
    });
    describe('return annual housing cost',()=>{
        it('calls returnAnnualHousingCost on empty house list',()=>{    
            const expectedResult=0;
            const seekingYear=2030;
            
            houseList=[];
            const result = returnAnnualHousingCost(seekingYear, houseList, .01);
    
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on one house in the year that house is purchased',()=>{    
            const yearPurchased=2030;
            const yearSold=2040;
            const origValue=600000;
            const growth=.015;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2030;
            const expectedResult=37864.97;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on one house in the second year after house is purchased',()=>{    
            const yearPurchased=2030;
            const yearSold=2040;
            const origValue=600000;
            const growth=.025;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2031;
            const expectedResult=38044.97;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on one house in a year after house is sold',()=>{    
            const yearPurchased=2030;
            const yearSold=2040;
            const origValue=600000;
            const growth=.025;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2041;
            const expectedResult=0;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on one house in a year after mortgage is paid off',()=>{    
            const yearPurchased=2022;
            const yearSold=2200;
            const origValue=800000;
            const growth=.025;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2060;
            const expectedResult=28172.77;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on two consecutive houses in year first house is purchased',()=>{    
            const yearPurchased1=2022;
            const yearSold1=2030;
            const origValue1=500000;
            const yearPurchased2=2030;
            const yearSold2=2040;
            const origValue2=1000000;
            const growth=.025;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2022;
            const expectedResult=31554.15;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on two consecutive houses in year second house is purchased',()=>{    
            const yearPurchased1=2022;
            const yearSold1=2030;
            const origValue1=500000;
            const yearPurchased2=2030;
            const yearSold2=2040;
            const origValue2=1000000;
            const growth=.025;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2030;
            const expectedResult=63108.29;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on two consecutive houses in year before second house is purchased',()=>{    
            const yearPurchased1=2022;
            const yearSold1=2030;
            const origValue1=500000;
            const yearPurchased2=2030;
            const yearSold2=2040;
            const origValue2=1000000;
            const growth=.025;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2029;
            const expectedResult=32652.59;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on two consecutive houses in year before second house is sold',()=>{    
            const yearPurchased1=2022;
            const yearSold1=2030;
            const origValue1=500000;
            const yearPurchased2=2030;
            const yearSold2=2040;
            const origValue2=1000000;
            const growth=.025;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2039;
            const expectedResult=65976.09;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on two consecutive houses in year after second house is sold',()=>{    
            const yearPurchased1=2022;
            const yearSold1=2030;
            const origValue1=500000;
            const yearPurchased2=2030;
            const yearSold2=2040;
            const origValue2=1000000;
            const growth=.025;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2040;
            const expectedResult=0;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on two overlapping houses in year before second house is purchased',()=>{    
            const yearPurchased1=2025;
            const yearSold1=2050;
            const origValue1=500000;
            const yearPurchased2=2035;
            const yearSold2=2060;
            const origValue2=1000000;
            const growth=.025;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2030;
            const expectedResult=32326.99;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on two overlapping houses in year after first house is sold',()=>{    
            const yearPurchased1=2025;
            const yearSold1=2050;
            const origValue1=500000;
            const yearPurchased2=2035;
            const yearSold2=2060;
            const origValue2=1000000;
            const growth=.025;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2055;
            const expectedResult=70045.39;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on two overlapping houses in year both houses are owned',()=>{    
            const yearPurchased1=2025;
            const yearSold1=2050;
            const origValue1=500000;
            const yearPurchased2=2035;
            const yearSold2=2060;
            const origValue2=1000000;
            const growth=.025;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2040;
            const expectedResult=98710.44;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on two overlapping houses in year first house is sold',()=>{    
            const yearPurchased1=2025;
            const yearSold1=2050;
            const origValue1=500000;
            const yearPurchased2=2035;
            const yearSold2=2060;
            const origValue2=1000000;
            const growth=.025;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2050;
            const expectedResult=68112.93;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on three consecutive houses in year first house is purchased',()=>{    
            const yearPurchased1=2030;
            const yearSold1=2040;
            const origValue1=250000;
            const yearPurchased2=2040;
            const yearSold2=2050;
            const origValue2=400000;
            const yearPurchased3=2050;
            const yearSold3=2060;
            const origValue3=900000;
            const growth=.03;
            const interest=.05;
            const realEstateTaxRate=.01;
            const downPayment=.25;
            const mortgageYears=10;
            const HOA=0;
            const seekingYear=2030;
            const expectedResult=26364.74;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(3, yearPurchased3, yearSold3, origValue3, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on three consecutive houses in year second house is purchased',()=>{    
            const yearPurchased1=2030;
            const yearSold1=2040;
            const origValue1=250000;
            const yearPurchased2=2040;
            const yearSold2=2050;
            const origValue2=400000;
            const yearPurchased3=2050;
            const yearSold3=2060;
            const origValue3=900000;
            const growth=.03;
            const interest=.05;
            const realEstateTaxRate=.01;
            const downPayment=.25;
            const mortgageYears=10;
            const HOA=0;
            const seekingYear=2040;
            const expectedResult=42183.59;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[2] = homeCreator(3, yearPurchased3, yearSold3, origValue3, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on three consecutive houses in year third house is purchased',()=>{    
            const yearPurchased1=2030;
            const yearSold1=2040;
            const origValue1=250000;
            const yearPurchased2=2040;
            const yearSold2=2050;
            const origValue2=400000;
            const yearPurchased3=2050;
            const yearSold3=2060;
            const origValue3=900000;
            const growth=.03;
            const interest=.05;
            const realEstateTaxRate=.01;
            const downPayment=.25;
            const mortgageYears=10;
            const HOA=0;
            const seekingYear=2050;
            const expectedResult=94913.07;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[2] = homeCreator(3, yearPurchased3, yearSold3, origValue3, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on three consecutive houses 5 years into first house',()=>{    
            const yearPurchased1=2030;
            const yearSold1=2040;
            const origValue1=250000;
            const yearPurchased2=2040;
            const yearSold2=2050;
            const origValue2=400000;
            const yearPurchased3=2050;
            const yearSold3=2060;
            const origValue3=900000;
            const growth=.03;
            const interest=.05;
            const realEstateTaxRate=.01;
            const downPayment=.25;
            const mortgageYears=10;
            const HOA=0;
            const seekingYear=2035;
            const expectedResult=26624.94;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(3, yearPurchased3, yearSold3, origValue3, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on three consecutive houses 5 years into second house',()=>{    
            const yearPurchased1=2030;
            const yearSold1=2040;
            const origValue1=250000;
            const yearPurchased2=2040;
            const yearSold2=2050;
            const origValue2=400000;
            const yearPurchased3=2050;
            const yearSold3=2060;
            const origValue3=900000;
            const growth=.03;
            const interest=.05;
            const realEstateTaxRate=.01;
            const downPayment=.25;
            const mortgageYears=10;
            const HOA=0;
            const seekingYear=2045;
            const expectedResult=42599.91;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[2] = homeCreator(3, yearPurchased3, yearSold3, origValue3, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on three consecutive houses 5 years into third house',()=>{    
            const yearPurchased1=2030;
            const yearSold1=2040;
            const origValue1=250000;
            const yearPurchased2=2040;
            const yearSold2=2050;
            const origValue2=400000;
            const yearPurchased3=2050;
            const yearSold3=2060;
            const origValue3=900000;
            const growth=.03;
            const interest=.05;
            const realEstateTaxRate=.01;
            const downPayment=.25;
            const mortgageYears=10;
            const HOA=0;
            const seekingYear=2055;
            const expectedResult=95849.79;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[2] = homeCreator(3, yearPurchased3, yearSold3, origValue3, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on three overlapping houses in a year all three are owned, first mortgage paid off',()=>{    
            const yearPurchased1=2030;
            const yearSold1=2060;
            const origValue1=250000;
            const yearPurchased2=2035;
            const yearSold2=2060;
            const origValue2=400000;
            const yearPurchased3=2040;
            const yearSold3=2060;
            const origValue3=900000;
            const growth=.03;
            const interest=.05;
            const realEstateTaxRate=.01;
            const downPayment=.25;
            const mortgageYears=10;
            const HOA=0;
            const seekingYear=2042;
            const expectedResult=141225.6;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[2] = homeCreator(3, yearPurchased3, yearSold3, origValue3, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on one rented house in first year of renting',()=>{    
            const yearPurchased=2030;
            const yearSold=2040;
            const origValue=600000;
            const growth=.015;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const rent = 2500;
            const seekingYear=2030;
            const expectedResult=30000;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, true, rent);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on one rented house in last year of renting',()=>{    
            const yearPurchased=2030;
            const yearSold=2040;
            const origValue=600000;
            const growth=.015;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const rent = 2500;
            const seekingYear=2039;
            const expectedResult=30000;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, true, rent);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on one rented house after lease is over',()=>{    
            const yearPurchased=2030;
            const yearSold=2040;
            const origValue=600000;
            const growth=.015;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const rent = 2500;
            const seekingYear=2040;
            const expectedResult=0;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, true, rent);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on two consecutive rented houses during second house lease',()=>{    
            const yearPurchased1=2021;
            const yearSold1=2025;
            const yearPurchased2=2025;
            const yearSold2=2030;
            const origValue=600000;
            const growth=.015;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const rent1 = 2500;
            const rent2 = 5000;
            const seekingYear=2027;
            const expectedResult=60000;

            houseList=[];
            houseList[0] = homeCreator(0, yearPurchased1, yearSold1, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, true, rent1);
            houseList[1] = homeCreator(1, yearPurchased2, yearSold2, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, true, rent2);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on two overlapping rented houses during middle year',()=>{    
            const yearPurchased1=2021;
            const yearSold1=2030;
            const yearPurchased2=2025;
            const yearSold2=2030;
            const origValue=600000;
            const growth=.015;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const rent1 = 2500;
            const rent2 = 5000;
            const seekingYear=2027;
            const expectedResult=90000;

            houseList=[];
            houseList[0] = homeCreator(0, yearPurchased1, yearSold1, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, true, rent1);
            houseList[1] = homeCreator(1, yearPurchased2, yearSold2, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, true, rent2);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on two overlapping rented houses during year only first house is active',()=>{    
            const yearPurchased1=2021;
            const yearSold1=2030;
            const yearPurchased2=2025;
            const yearSold2=2030;
            const origValue=600000;
            const growth=.015;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const rent1 = 2500;
            const rent2 = 5000;
            const seekingYear=2024;
            const expectedResult=30000;

            houseList=[];
            houseList[0] = homeCreator(0, yearPurchased1, yearSold1, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, true, rent1);
            houseList[1] = homeCreator(1, yearPurchased2, yearSold2, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, true, rent2);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls returnAnnualHousingCost on three consecutive rented houses during second transfer year',()=>{    
            const yearPurchased1=2021;
            const yearSold1=2025;
            const yearPurchased2=2025;
            const yearSold2=2030;
            const yearPurchased3=2030;
            const yearSold3=2035;
            const origValue=600000;
            const growth=.015;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const rent1 = 2500;
            const rent2 = 5000;
            const rent3 = 7500;
            const seekingYear=2030;
            const expectedResult=90000;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, true, rent1);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, true, rent2);
            houseList[2] = homeCreator(3, yearPurchased3, yearSold3, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, true, rent3);
            const rawResult=returnAnnualHousingCost(seekingYear, houseList, .01);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
    });
    describe('find house purchase year cashflow',()=>{
        it('calls findHousePurchaseYearCashFlow on empty house list',()=>{    
            const expectedResult=0;
            const seekingYear=2030;
            
            houseList=[];
            const result = findHousePurchaseYearCashFlow(seekingYear, houseList, .01, .05);
    
            assert.strictEqual(result, expectedResult);
        });
        it('calls findHousePurchaseYearCashFlow on one house, 20% DP, in the year that house is purchased',()=>{    
            const yearPurchased=2030;
            const yearSold=2040;
            const origValue=350000;
            const growth=.015;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2030;
            const inflation = .01;
            const commission = .05;
            const expectedResult=-70000;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=findHousePurchaseYearCashFlow(seekingYear, houseList, inflation, commission);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls findHousePurchaseYearCashFlow on one house in the second year after house is purchased',()=>{    
            const yearPurchased=2030;
            const yearSold=2040;
            const origValue=350000;
            const growth=.015;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2031;
            const inflation = .01;
            const commission = .05;
            const expectedResult=0;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=findHousePurchaseYearCashFlow(seekingYear, houseList, inflation, commission);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls findHousePurchaseYearCashFlow on one house in the year it is sold',()=>{    
            const yearPurchased=2030;
            const yearSold=2040;
            const origValue=350000;
            const growth=.015;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2040;
            const inflation = .01;
            const commission = .05;
            const expectedResult=132708.84;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=findHousePurchaseYearCashFlow(seekingYear, houseList, inflation, commission);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls findHousePurchaseYearCashFlow on one house in the year after it is sold',()=>{    
            const yearPurchased=2030;
            const yearSold=2040;
            const origValue=350000;
            const growth=.015;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2041;
            const inflation = .01;
            const commission = .05;
            const expectedResult=0;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=findHousePurchaseYearCashFlow(seekingYear, houseList, inflation, commission);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls findHousePurchaseYearCashFlow on a different value house, 10% DP, in the year that house is purchased',()=>{    
            const yearPurchased=2025;
            const yearSold=2050;
            const origValue=1000000;
            const growth=.015;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.1;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2025;
            const inflation = .01;
            const commission = .05;
            const expectedResult=-100000;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=findHousePurchaseYearCashFlow(seekingYear, houseList, inflation, commission);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls findHousePurchaseYearCashFlow on one house in the year it is sold',()=>{    
            const yearPurchased=2025;
            const yearSold=2050;
            const origValue=1000000;
            const growth=.015;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.1;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2050;
            const inflation = .01;
            const commission = .05;
            const expectedResult=853999.97;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased, yearSold, origValue, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=findHousePurchaseYearCashFlow(seekingYear, houseList, inflation, commission);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls findHousePurchaseYearCashFlow on two consecutive houses in year first house is purchased, 20% DP',()=>{    
            const yearPurchased1=2022;
            const yearSold1=2030;
            const origValue1=400000;
            const yearPurchased2=2030;
            const yearSold2=2040;
            const origValue2=1100000;
            const growth=.025;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2022;
            const inflation = .01;
            const commission = .05;
            const expectedResult=-80000;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=findHousePurchaseYearCashFlow(seekingYear, houseList, inflation, commission);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls findHousePurchaseYearCashFlow on two consecutive houses in year of transfer, 20% DP for both',()=>{    
            const yearPurchased1=2022;
            const yearSold1=2030;
            const origValue1=400000;
            const yearPurchased2=2030;
            const yearSold2=2040;
            const origValue2=1100000;
            const growth=.025;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2030;
            const inflation = .01;
            const commission = .05;
            const expectedResult=-56232.32;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=findHousePurchaseYearCashFlow(seekingYear, houseList, inflation, commission);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls findHousePurchaseYearCashFlow on two consecutive houses in year second house is sold, 20% DP',()=>{    
            const yearPurchased1=2022;
            const yearSold1=2030;
            const origValue1=400000;
            const yearPurchased2=2030;
            const yearSold2=2040;
            const origValue2=1100000;
            const growth=.025;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2040;
            const inflation = .01;
            const commission = .05;
            const expectedResult=531408.66;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=findHousePurchaseYearCashFlow(seekingYear, houseList, inflation, commission);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls findHousePurchaseYearCashFlow on two overlapping houses in year both are purchased, 20% DP',()=>{    
            const yearPurchased1=2022;
            const yearSold1=2030;
            const origValue1=400000;
            const yearPurchased2=2022;
            const yearSold2=2040;
            const origValue2=1100000;
            const growth=.025;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2022;
            const inflation = .01;
            const commission = .05;
            const expectedResult=-300000;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=findHousePurchaseYearCashFlow(seekingYear, houseList, inflation, commission);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls findHousePurchaseYearCashFlow on two overlapping houses in year both are sold, 20% DP',()=>{    
            const yearPurchased1=2022;
            const yearSold1=2040;
            const origValue1=400000;
            const yearPurchased2=2030;
            const yearSold2=2040;
            const origValue2=1100000;
            const growth=.025;
            const interest=.035;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2040;
            const inflation = .01;
            const commission = .05;
            const expectedResult=859434.62;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=findHousePurchaseYearCashFlow(seekingYear, houseList, inflation, commission);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls findHousePurchaseYearCashFlow on two consecutive houses in transfer year, full transfer DP',()=>{    
            const yearPurchased1=2025;
            const yearSold1=2035;
            const origValue1=750000;
            const yearPurchased2=2035;
            const yearSold2=2050;
            const origValue2=850000;
            const growth=.03;
            const interest=.04;
            const realEstateTaxRate=.02;
            const downPayment1=.2;
            const downPayment2=.3600645213;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2035;
            const inflation = .02;
            const commission = .06;
            const expectedResult=0;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment1, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment2, mortgageYears, HOA, false, 0);
            const rawResult=findHousePurchaseYearCashFlow(seekingYear, houseList, inflation, commission);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls findHousePurchaseYearCashFlow on two overlapping houses in a random year',()=>{    
            const yearPurchased1=2025;
            const yearSold1=2035;
            const origValue1=750000;
            const yearPurchased2=2030;
            const yearSold2=2050;
            const origValue2=850000;
            const growth=.03;
            const interest=.04;
            const realEstateTaxRate=.02;
            const downPayment1=.2;
            const downPayment2=.3600645213;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2032;
            const inflation = .02;
            const commission = .06;
            const expectedResult=0;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment1, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment2, mortgageYears, HOA, false, 0);
            const rawResult=findHousePurchaseYearCashFlow(seekingYear, houseList, inflation, commission);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls findHousePurchaseYearCashFlow on three consecutive houses in year first house is purchased, 20% DP',()=>{    
            const yearPurchased1=2022;
            const yearSold1=2030;
            const origValue1=250000;
            const yearPurchased2=2030;
            const yearSold2=2040;
            const origValue2=550000;
            const yearPurchased3=2040;
            const yearSold3=2050;
            const origValue3=850000;
            const growth=.025;
            const interest=.04;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2022;
            const inflation = .015;
            const commission = .06;
            const expectedResult=-50000;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[2] = homeCreator(3, yearPurchased3, yearSold3, origValue3, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=findHousePurchaseYearCashFlow(seekingYear, houseList, inflation, commission);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls findHousePurchaseYearCashFlow on three consecutive houses in year of first transfer, 20% DP for all',()=>{    
            const yearPurchased1=2022;
            const yearSold1=2030;
            const origValue1=250000;
            const yearPurchased2=2030;
            const yearSold2=2040;
            const origValue2=550000;
            const yearPurchased3=2040;
            const yearSold3=2050;
            const origValue3=850000;
            const growth=.025;
            const interest=.04;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2030;
            const inflation = .015;
            const commission = .06;
            const expectedResult=-22989.63;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[2] = homeCreator(3, yearPurchased3, yearSold3, origValue3, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=findHousePurchaseYearCashFlow(seekingYear, houseList, inflation, commission);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls findHousePurchaseYearCashFlow on three consecutive houses in year of second transfer, 20% DP for all',()=>{    
            const yearPurchased1=2022;
            const yearSold1=2030;
            const origValue1=250000;
            const yearPurchased2=2030;
            const yearSold2=2040;
            const origValue2=550000;
            const yearPurchased3=2040;
            const yearSold3=2050;
            const origValue3=850000;
            const growth=.025;
            const interest=.04;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2040;
            const inflation = .015;
            const commission = .06;
            const expectedResult=54440.22;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[2] = homeCreator(3, yearPurchased3, yearSold3, origValue3, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=findHousePurchaseYearCashFlow(seekingYear, houseList, inflation, commission);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls findHousePurchaseYearCashFlow on three consecutive houses in year third house is sold, 20% DP for all',()=>{    
            const yearPurchased1=2022;
            const yearSold1=2030;
            const origValue1=250000;
            const yearPurchased2=2030;
            const yearSold2=2040;
            const origValue2=550000;
            const yearPurchased3=2040;
            const yearSold3=2050;
            const origValue3=850000;
            const growth=.025;
            const interest=.04;
            const realEstateTaxRate=.02;
            const downPayment=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2050;
            const inflation = .015;
            const commission = .06;
            const expectedResult=346862.16;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            houseList[2] = homeCreator(3, yearPurchased3, yearSold3, origValue3, growth, interest, realEstateTaxRate, downPayment, mortgageYears, HOA, false, 0);
            const rawResult=findHousePurchaseYearCashFlow(seekingYear, houseList, inflation, commission);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls findHousePurchaseYearCashFlow on three consecutive houses in year of second transfer, full transfer DP',()=>{    
            const yearPurchased1=2022;
            const yearSold1=2030;
            const origValue1=250000;
            const yearPurchased2=2030;
            const yearSold2=2040;
            const origValue2=550000;
            const yearPurchased3=2040;
            const yearSold3=2050;
            const origValue3=850000;
            const growth=.025;
            const interest=.04;
            const realEstateTaxRate=.02;
            const downPayment12=.2;
            const downPayment3=.2640473157
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2040;
            const inflation = .015;
            const commission = .06;
            const expectedResult=0;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment12, mortgageYears, HOA, false, 0);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment12, mortgageYears, HOA, false, 0);
            houseList[2] = homeCreator(3, yearPurchased3, yearSold3, origValue3, growth, interest, realEstateTaxRate, downPayment3, mortgageYears, HOA, false, 0);
            const rawResult=findHousePurchaseYearCashFlow(seekingYear, houseList, inflation, commission);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls findHousePurchaseYearCashFlow on two consecutive rented houses in first year of purchase',()=>{    
            const yearPurchased1=2022;
            const yearSold1=2030;
            const origValue1=250000;
            const rent1=1500;
            const yearPurchased2=2030;
            const yearSold2=2040;
            const origValue2=550000;
            const rent2=2750;
            const growth=.025;
            const interest=.04;
            const realEstateTaxRate=.02;
            const downPayment12=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2022;
            const inflation = .015;
            const commission = .06;
            const expectedResult=0;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment12, mortgageYears, HOA, true, rent1);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment12, mortgageYears, HOA, true, rent2);
            const rawResult=findHousePurchaseYearCashFlow(seekingYear, houseList, inflation, commission);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls findHousePurchaseYearCashFlow on two consecutive rented houses in year of transfer',()=>{    
            const yearPurchased1=2022;
            const yearSold1=2030;
            const origValue1=250000;
            const rent1=1500;
            const yearPurchased2=2030;
            const yearSold2=2040;
            const origValue2=550000;
            const rent2=2750;
            const growth=.025;
            const interest=.04;
            const realEstateTaxRate=.02;
            const downPayment12=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2030;
            const inflation = .015;
            const commission = .06;
            const expectedResult=0;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment12, mortgageYears, HOA, true, rent1);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment12, mortgageYears, HOA, true, rent2);
            const rawResult=findHousePurchaseYearCashFlow(seekingYear, houseList, inflation, commission);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
        it('calls findHousePurchaseYearCashFlow on two consecutive rented houses in final year of sale',()=>{    
            const yearPurchased1=2022;
            const yearSold1=2030;
            const origValue1=250000;
            const rent1=1500;
            const yearPurchased2=2030;
            const yearSold2=2040;
            const origValue2=550000;
            const rent2=2750;
            const growth=.025;
            const interest=.04;
            const realEstateTaxRate=.02;
            const downPayment12=.2;
            const mortgageYears=30;
            const HOA=0;
            const seekingYear=2040;
            const inflation = .015;
            const commission = .06;
            const expectedResult=0;

            houseList=[];
            houseList[0] = homeCreator(1, yearPurchased1, yearSold1, origValue1, growth, interest, realEstateTaxRate, downPayment12, mortgageYears, HOA, true, rent1);
            houseList[1] = homeCreator(2, yearPurchased2, yearSold2, origValue2, growth, interest, realEstateTaxRate, downPayment12, mortgageYears, HOA, true, rent2);
            const rawResult=findHousePurchaseYearCashFlow(seekingYear, houseList, inflation, commission);
            const result=parseFloat((Math.round(rawResult * 100 ) / 100).toFixed(2));
            
            assert.strictEqual(result, expectedResult);
        });
    });
});