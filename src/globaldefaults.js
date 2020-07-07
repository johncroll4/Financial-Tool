//This object is exported from this file and imported to most other files.  The idea is that there are default values used across the application.  
//The user would in general be able to modify these values from a simple UI or just accept the defaults
//Each value has a getter and setter method associated with it
const rateDefaults = {
    //growth is used as the default value for the annual growth of money in any year.  The value is considered without considering inflation, whihc is separately deducted 
    _growth: .05,
    //inflation rate is used to deduct against regular growth to keep all income/money value in today's dollars.  Income is discounted while costs are not and remain in 2020 dollars
    _inflation: .02,
    //real estate tax rate is used to determine total cost of homeownership-realEstateTax*home value.
    _realEstateTax: .02,
    //This is the default length of a home loan and can be changed for any specific home/loan
    _mortgageYears: 30,
    //This is the default interest rate of a home loan and can be changed for any specific home/loan
    _mortgageInterest: .035,
    //This is the assumed rate of annual home value growth.  This value does not account for inflation, but inflation is discounted when this value is used in any formula
    _homeValueGrowth: .03,
    _brokerSellCommission: .06,
    get growth() {
        if(typeof this._growth === 'number'){
            return this._growth;
        } else {
            console.log(`Enter valid number for growth rate`);
        }
    },
    get inflation() {
        if(typeof this._inflation === 'number'){
            return this._inflation;
        } else {
            console.log(`Enter valid number for inflation rate`);
        }
    },
    get realEstateTax() {
        if(typeof this._realEstateTax === 'number'){
            return this._realEstateTax;
        } else {
            console.log(`Enter valid number for real estate tax rate`);
        }
    },
    get mortgageYears() {
        if(typeof this._mortgageYears === 'number'){
            return this._mortgageYears;
        } else {
            console.log(`Enter valid number for years of mortgage`);
        }
    },
    get mortgageInterest() {
        if(typeof this._mortgageInterest === 'number'){
            return this._mortgageInterest;
        } else {
            console.log(`Enter valid number for mortgage interest rate`);
        }
    },
    get homeValueGrowth() {
        if(typeof this._homeValueGrowth === 'number'){
            return this._homeValueGrowth;
        } else {
            console.log(`Enter valid number for home value growth rate`);
        }
    },
    get brokerSellCommission() {
        if(typeof this._brokerSellCommission === 'number'){
            return this._brokerSellCommission;
        } else {
            console.log(`Enter valid number for broker commision for house sale`);
        }
    },
    set growth(newGrowth){
        if (typeof newGrowth==='number' && newGrowth<1 && newGrowth > -.5){
            this._growth = newGrowth;
        }else{
            console.log(`Enter valid number for growth rate`);
        }
    },
    set inflation(newInflation){
        if (typeof newInflation==='number' && newInflation<1 && newInflation > -.5){
            this._inflation = newInflation;
        }else{
            console.log(`Enter valid number for inflation rate`);
        }
    },
    set realEstateTax(newRealEstateTax){
        if (typeof newRealEstateTax==='number' && newRealEstateTax<1 && newRealEstateTax > 0){
            this._realEstateTax = newRealEstateTax;
        }else{
            console.log(`Enter valid number for real estate tax rate`);
        }
    },
    set mortgageYears(newMortgageYears){
        if (typeof newMortgageYears==='number' && newMortgageYears<100 && newMortgageYears > 0){
            this._mortgageYears = newMortgageYears;
        }else{
            console.log(`Enter valid number for years of mortgage`);
        }
    },
    set mortgageInterest(newMortgageInterest){
        if (typeof newMortgageInterest==='number' && newMortgageInterest<1 && newMortgageInterest > 0){
            this._mortgageInterest = newMortgageInterest;
        }else{
            console.log(`Enter valid number for mortgage interest rate`);
        }
    },
    set homeValueGrowth(newHomeValueGrowth){
        if (typeof newHomeValueGrowth==='number' && newHomeValueGrowth<1 && newHomeValueGrowth > -.5){
            this._homeValueGrowth = newHomeValueGrowth;
        }else{
            console.log(`Enter valid number for home value growth rate`);
        }
    },
    set brokerSellCommission(newbrokerSellCommission){
        if (typeof newbrokerSellCommission==='number' && newbrokerSellCommission<1 && newbrokerSellCommission >=0){
            this._brokerSellCommission = newbrokerSellCommission;
        }else{
            console.log(`Enter valid number for broker commision for house sale`);
        }
    }
}

function insertDefaultValues (){
    rateDefaults.growth=parseFloat(window.sessionStorage.getItem('growthRate'),10);
    console.log(`global defaults growth rate is now ${rateDefaults.growth}`);
    rateDefaults.inflation=parseFloat(window.sessionStorage.getItem('inflation'),10);
    console.log(`global defaults inflation rate is now ${rateDefaults.inflation}`);
    rateDefaults.realEstateTax=parseFloat(window.sessionStorage.getItem('propertyTax'),10);
    console.log(`global defaults property tax rate is now ${rateDefaults.realEstateTax}`);
    rateDefaults.mortgageYears=parseInt(window.sessionStorage.getItem('mortgageLength'),10);
    console.log(`global defaults mortage length is now ${rateDefaults.mortgageYears}`);
    rateDefaults.mortgageInterest=parseFloat(window.sessionStorage.getItem('mortgageRate'),10);
    console.log(`global defaults mortgage rate is now ${rateDefaults.mortgageInterest}`);
    rateDefaults.homeValueGrowth=parseFloat(window.sessionStorage.getItem('homeGrowth'),10);
    console.log(`global defaults home value growth rate is now ${rateDefaults.homeValueGrowth}`);
    rateDefaults.brokerSellCommission=parseFloat(window.sessionStorage.getItem('broker'),10);
    console.log(`global defaults broker commission is now ${rateDefaults.brokerSellCommission}`);
    window.sessionStorage.setItem('defaultDistributed', 1);
    window.sessionStorage.setItem('defaultConsumed', 1);
    console.log(`Time Default page insert values at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);
}

window.addEventListener('load', insertDefaultValues);

//Only exporting one object from this file for now.  Future default values can be added to the same object or split out as needed
module.exports = rateDefaults;