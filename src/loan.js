const basicFunctions = require('./basicfunctions.js');
//const growAgainstInflation = basicFunctions.growAgainstInflation;
const calcMonthlyLoanPayment = basicFunctions.calcMonthlyLoanPayment;

const loanCreator = (_number, _yearOriginated, _amount, _interestRate, _length, _cashInflow) =>{
    return {
        _number,
        _yearOriginated,
        _amount,
        _interestRate,
        _length,
        _cashInflow,
        monthlyPayment (seekingYear) {
            let monthlyPayment=0;
            //start by making sure the year being passed to method is reasonable
            if(seekingYear>2100 || seekingYear < 1950){
                console.log(`Please enter a valid year to return relevant home values`);
            }else if (seekingYear>=this._yearOriginated + this._length || seekingYear < this._yearOriginated){
                return monthlyPayment;
            }else{
                monthlyPayment = calcMonthlyLoanPayment(this._amount, this._interestRate, this._length);
                return monthlyPayment;
            }
        },           
        get number(){
            if(typeof this._number === 'number'){
                return this._number;
            } else {
                console.log(`Enter valid number for which house number this is`);
            }
        },
        set number (newNumber){
            if (typeof newNumber==='number' && newNumber>0 && newNumber > 100){
                this._number = newNumber;
            }else{
                console.log(`Enter valid number for which house number this is`);
            }
        },
        get yearOriginated(){
            if(typeof this._yearOriginated === 'number'){
                return this._yearOriginated;
            } else {
                console.log(`Enter valid year for the origination of the loan`);
            }
        },
        set yearOriginated (newYear){
            if (typeof newYear==='number' && newYear>1900 && newYear < 3000){
                this._yearOriginated = newYear;
            }else{
                console.log(`Enter valid year for the origination of the loan`);
            }
        },
        get amount(){
            if(typeof this._amount === 'number'){
                return this._amount;
            } else {
                console.log(`Enter valid amount of the loan`);
            }
        },
        set amount (newAmount){
            if (typeof newAmount==='number' && newAmount>0 && newAmount < 10000000){
                this._amount = newAmount;
            }else{
                console.log(`Enter valid amount of the loan`);
            }
        },
        get interestRate(){
            if(typeof this._interestRate === 'number'){
                return this._interestRate;
            } else {
                console.log(`Enter valid number for the interest rate of the loan`);
            }
        },
        set interestRate (newValue){
            if (typeof newValue==='number' && newValue<1 && newValue > -.5){
                this._interestRate = newValue;
            }else{
                console.log(`Enter valid number for the interest rate of the loan`);
            }
        },
        get length(){
            if(typeof this._length === 'number'){
                return this._length;
            } else {
                console.log(`Enter valid number for the length of the loan`);
            }
        },
        set length (newLength){
            if (typeof newLength==='number' && newLength<100 && newLength > 0){
                this._length = newLength;
            }else{
                console.log(`Enter valid number for the length of the loan`);
            }
        },
        get cashInflow(){
            if(typeof this._cashInflow === 'boolean'){
                return this._cashInflow;
            } else {
                console.log(`Enter valid value for cash inflow flag for the loan`);
            }
        },
        set cashInflow (newValue){
            if (typeof newValue==='boolean'){
                this._cashInflow = newValue;
            }else{
                console.log(`Enter valid value for cash inflow flag for the loan`);
            }
        }
    }
};

function insertLoanValues (){
    numberOfLoans=parseInt(window.sessionStorage.getItem('NOL'), 10);
    const loanArray = JSON.parse(window.sessionStorage.getItem('loanArray'));

    console.log(`Loan page NOL is ${numberOfLoans}`);
    window.sessionStorage.setItem('loanDistributed', 1);
      
    loans=[];
    for (let i=0; i<numberOfLoans; i++){
        loans[i]=loanCreator(i+1, loanArray[i][0], loanArray[i][1], loanArray[i][2], loanArray[i][3], loanArray[i][4]);
    }
    console.log(`Loan page loan list is ${JSON.stringify(loans)}`);
    window.sessionStorage.setItem('loanConsumed', 1);
}
window.addEventListener('load', insertLoanValues);

const returnAnnualLoanCost = year =>{
    const annualLoanCostValues = [];
    //Create array of the annual cost of all loans in the system for that year
    if(loans.length>0){
        loans.forEach(loan => {
            if(loan.yearOriginated==year && loan.cashInflow==true){
                annualLoanCostValues.push((loan.monthlyPayment(year)*12)-loan.amount);
            }else{
                annualLoanCostValues.push(loan.monthlyPayment(year)*12);
            }
        })
        //then reduce above array to sum up all those annual cost values into one value, representing all home value ownership costs
        const annualCost = annualLoanCostValues.reduce((previousValue, currentValue)=>{
            return previousValue + currentValue;
        })
        return annualCost;
    }else{
        return 0;
    }
}

const loanExports = {returnAnnualLoanCost};
module.exports = loanExports;