//import rate default values for use in below functions-primarily growth rate and inflation rate.  
//These are passed as default paramter values to the function but can be changed at the function call
const rateDefaults = require('./globaldefaults.js');

//Grow Against Inflation is the basic function which calculates the new value of an amount of money after one year of growth.  
//Values are entered with raw growth rate and inflation is separate, with inflation discounting the growth rate within the calculation
//Typically this function will be called with years=1, to take one value and "grow" it by one year.  But in general this function can be 
//called with any number of years to calculate the future value of something.  This is particularly useful when calculating future salaries
//Start is the starting value of whatever is being grown.  ** is the symbol for exponent in JavaScript

const growAgainstInflation = (start, years=1, grow=rateDefaults.growth, inflation=rateDefaults.inflation) => {
    let newAmount = start*((1+(grow-inflation))**years);
    return newAmount;
}

const calcMonthlyLoanPayment = (loanAmount=0, loanRate=rateDefaults.mortgageInterest, loanLength=10) => {
    const monthlyPayment = (loanAmount)*((loanRate/12)*(1+(loanRate/12))**(loanLength*12))/(((1+(loanRate/12))**(loanLength*12))-1);
    return monthlyPayment;
}

const numberFormatter = (number, digits=2, keepNumber=true, dollarSign=false) =>{
    if(keepNumber==true){
        const numString = number.toFixed(digits);
        return parseFloat(numString);
    }else{
        if(dollarSign==false){
            return new Intl.NumberFormat('en-US', {minimumFractionDigits: digits, maximumFractionDigits: digits}).format(number);
        }else if(dollarSign==true){
            return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: digits, maximumFractionDigits: digits}).format(number);
        }
    }
}

//original monthly payment calc from homecalcs page, which was replaced by above function
//monthlyPayment = (this._originalValue-this._downPayment)*((this._mortgageInterestRate/12)*(1+(this._mortgageInterestRate/12))**(this._mortgageYears*12))/(((1+(this._mortgageInterestRate/12))**(this._mortgageYears*12))-1);

const basicFunctions = {growAgainstInflation, calcMonthlyLoanPayment, numberFormatter};
module.exports = basicFunctions;
