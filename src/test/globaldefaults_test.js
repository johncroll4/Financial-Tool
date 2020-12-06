const assert = require('assert');
const fillOutInputValues = require('./mockinputs.js');
fillOutInputValues();
const rateDefaults = require('../calculate.js').rateDefaults;

describe('globalDefaults', ()=>{
    //setup
    console.log('setup phase');
    let initialRateDeafults = {
        _growth: 0,
        _inflation: 0,
        _realEstateTax: 0,
        _mortgageYears: 0,
        _mortgageInterest: 0,
        _homeValueGrowth: 0,
        _brokerSellCommission: 0
    };
    initialRateDeafults = Object.assign(initialRateDeafults, rateDefaults);
    console.log(`Initial Rate Defaults is ${initialRateDeafults}`);

    //tear down
    afterEach(() =>{
        console.log(`teardown phase`);
        rateDefaults.growth=initialRateDeafults._growth;
        rateDefaults.inflation=initialRateDeafults._inflation;
        rateDefaults.realEstateTax=initialRateDeafults._realEstateTax;
        rateDefaults.mortgageYears=initialRateDeafults._mortgageYears;
        rateDefaults.mortgageInterest=initialRateDeafults._mortgageInterest;
        rateDefaults.homeValueGrowth=initialRateDeafults._homeValueGrowth;
        rateDefaults.brokerSellCommission=initialRateDeafults._brokerSellCommission;
    });
    
    describe('growth rate',()=>{
        it('assigns a new growth rate of .35 and returns it',()=>{
            const startValue=.35;
            const expectedResult = .35;
    
            rateDefaults.growth=startValue;
            const result = rateDefaults.growth;
    
            assert.strictEqual(result, expectedResult);
        });
        it('tries to assign a new growth rate of 1.35 and returns it',()=>{
            const startValue=.15;
            const badValue=1.35;
            const expectedResult = .15;
    
            rateDefaults.growth=startValue;
            rateDefaults.growth=badValue;
            const result = rateDefaults.growth;
    
            assert.strictEqual(result, expectedResult);
        });
        it('assigns a new growth rate of -.35 and returns it',()=>{
            const startValue=-.35;
            const expectedResult = -.35;
    
            rateDefaults.growth=startValue;
            const result = rateDefaults.growth;
    
            assert.strictEqual(result, expectedResult);
        });
        it('tries to assign a new growth rate of -.75 and returns it',()=>{
            const startValue=.125;
            const badValue=-.75;
            const expectedResult = .125;
    
            rateDefaults.growth=startValue;
            rateDefaults.growth=badValue;
            const result = rateDefaults.growth;
    
            assert.strictEqual(result, expectedResult);
        });
    });
    describe('inflation rate',()=>{
        it('assigns a new inflation rate of .35 and returns it',()=>{
            const startValue=.35;
            const expectedResult = .35;
    
            rateDefaults.inflation=startValue;
            const result = rateDefaults.inflation;
    
            assert.strictEqual(result, expectedResult);
        });
        it('tries to assign a new inflation rate of 1.35 and returns it',()=>{
            const startValue=.15;
            const badValue=1.35;
            const expectedResult = .15;
    
            rateDefaults.inflation=startValue;
            rateDefaults.inflation=badValue;
            const result = rateDefaults.inflation;
    
            assert.strictEqual(result, expectedResult);
        });
        it('assigns a new inflation rate of -.35 and returns it',()=>{
            const startValue=-.35;
            const expectedResult = -.35;
    
            rateDefaults.inflation=startValue;
            const result = rateDefaults.inflation;
    
            assert.strictEqual(result, expectedResult);
        });
        it('tries to assign a new inflation rate of -.75 and returns it',()=>{
            const startValue=.125;
            const badValue=-.75;
            const expectedResult = .125;
    
            rateDefaults.inflation=startValue;
            rateDefaults.inflation=badValue;
            const result = rateDefaults.inflation;
    
            assert.strictEqual(result, expectedResult);
        });
    });
    describe('real estate tax',()=>{
        it('assigns a new realEstateTax rate of .35 and returns it',()=>{
            const startValue=.08;
            const expectedResult = .08;
    
            rateDefaults.realEstateTax=startValue;
            const result = rateDefaults.realEstateTax;
    
            assert.strictEqual(result, expectedResult);
        });
        it('tries to assign a new realEstateTax rate of 1.35 and returns it',()=>{
            const startValue=.15;
            const badValue=1.35;
            const expectedResult = .15;
    
            rateDefaults.realEstateTax=startValue;
            rateDefaults.realEstateTax=badValue;
            const result = rateDefaults.realEstateTax;
    
            assert.strictEqual(result, expectedResult);
        });
        it('tries to assign a new realEstateTax rate of -.15 and returns it',()=>{
            const startValue=.03;
            const badValue=-.15;
            const expectedResult = .03;
    
            rateDefaults.realEstateTax=startValue;
            rateDefaults.realEstateTax=badValue;
            const result = rateDefaults.realEstateTax;
    
            assert.strictEqual(result, expectedResult);
        });
    });
    describe('mortgage years',()=>{
        it('assigns a new mortgageYears of 30 and returns it',()=>{
            const startValue=30;
            const expectedResult = 30;
    
            rateDefaults.mortgageYears=startValue;
            const result = rateDefaults.mortgageYears;
    
            assert.strictEqual(result, expectedResult);
        });
        it('tries to assign a new mortgageYears of 135 and returns it',()=>{
            const startValue=20;
            const badValue=135;
            const expectedResult = 20;
    
            rateDefaults.mortgageYears=startValue;
            rateDefaults.mortgageYears=badValue;
            const result = rateDefaults.mortgageYears;
    
            assert.strictEqual(result, expectedResult);
        });
        it('tries to assign a new mortgageYears of 0 and returns it',()=>{
            const startValue=25;
            const badValue=0;
            const expectedResult = 25;
    
            rateDefaults.mortgageYears=startValue;
            rateDefaults.mortgageYears=badValue;
            const result = rateDefaults.mortgageYears;
    
            assert.strictEqual(result, expectedResult);
        });
    });
    describe('mortage interest rate',()=>{
        it('assigns a new mortgage interest rate of .35 and returns it',()=>{
            const startValue=.04;
            const expectedResult = .04;
    
            rateDefaults.mortgageInterest=startValue;
            const result = rateDefaults.mortgageInterest;
    
            assert.strictEqual(result, expectedResult);
        });
        it('tries to assign a new mortgage interest rate of 1.35 and returns it',()=>{
            const startValue=.06;
            const badValue=1.35;
            const expectedResult = .06;
    
            rateDefaults.mortgageInterest=startValue;
            rateDefaults.mortgageInterest=badValue;
            const result = rateDefaults.mortgageInterest;
    
            assert.strictEqual(result, expectedResult);
        });
        it('tries to assign a new mortgage interest rate of -.15 and returns it',()=>{
            const startValue=.03;
            const badValue=-.15;
            const expectedResult = .03;
    
            rateDefaults.mortgageInterest=startValue;
            rateDefaults.mortgageInterest=badValue;
            const result = rateDefaults.mortgageInterest;
    
            assert.strictEqual(result, expectedResult);
        });
    });
    describe('homeValueGrowth rate',()=>{
        it('assigns a new homeValueGrowth rate of .35 and returns it',()=>{
            const startValue=.35;
            const expectedResult = .35;
    
            rateDefaults.homeValueGrowth=startValue;
            const result = rateDefaults.homeValueGrowth;
    
            assert.strictEqual(result, expectedResult);
        });
        it('tries to assign a new homeValueGrowth rate of 1.35 and returns it',()=>{
            const startValue=.15;
            const badValue=1.35;
            const expectedResult = .15;
    
            rateDefaults.homeValueGrowth=startValue;
            rateDefaults.homeValueGrowth=badValue;
            const result = rateDefaults.homeValueGrowth;
    
            assert.strictEqual(result, expectedResult);
        });
        it('assigns a new homeValueGrowth rate of -.35 and returns it',()=>{
            const startValue=-.35;
            const expectedResult = -.35;
    
            rateDefaults.homeValueGrowth=startValue;
            const result = rateDefaults.homeValueGrowth;
    
            assert.strictEqual(result, expectedResult);
        });
        it('tries to assign a new homeValueGrowth rate of -.75 and returns it',()=>{
            const startValue=.125;
            const badValue=-.75;
            const expectedResult = .125;
    
            rateDefaults.homeValueGrowth=startValue;
            rateDefaults.homeValueGrowth=badValue;
            const result = rateDefaults.homeValueGrowth;
    
            assert.strictEqual(result, expectedResult);
        });
    });
    describe('broke sell commission',()=>{
        it('assigns a new broke sell commission of .35 and returns it',()=>{
            const startValue=.04;
            const expectedResult = .04;
    
            rateDefaults.brokerSellCommission=startValue;
            const result = rateDefaults.brokerSellCommission;
    
            assert.strictEqual(result, expectedResult);
        });
        it('tries to assign a new broke sell commission of 1.35 and returns it',()=>{
            const startValue=.06;
            const badValue=1.35;
            const expectedResult = .06;
    
            rateDefaults.brokerSellCommission=startValue;
            rateDefaults.brokerSellCommission=badValue;
            const result = rateDefaults.brokerSellCommission;
    
            assert.strictEqual(result, expectedResult);
        });
        it('tries to assign a new broke sell commission of -.15 and returns it',()=>{
            const startValue=.03;
            const badValue=-.15;
            const expectedResult = .03;
    
            rateDefaults.brokerSellCommission=startValue;
            rateDefaults.brokerSellCommission=badValue;
            const result = rateDefaults.brokerSellCommission;
    
            assert.strictEqual(result, expectedResult);
        });
    });
});