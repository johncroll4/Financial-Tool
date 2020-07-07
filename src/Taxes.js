//define relevant tax brackets for sigle filers and joint filers, per 2020 tax code
//Added 0,0 bracket to make it easier to use for loops below
const taxBracketsSingle = [[0,0],[.1, 9875], [.12, 40125],[.22, 85525],[.24,163300],[.32, 207350], [.35, 518400],[.37, 1000000]];
const taxBracketsJoint = [[0,0],[.1, 19750], [.12, 80250],[.22, 171050],[.24,326600],[.32, 414700], [.35, 622050],[.37, 1000000]];
//standard deduction for single filers as of 2020 tax code.  Need to be careful that this deduction is only used once per year-it will be applied once per function call
const standardDeduction = 12400;

//function to determine net income based on filing status and pretax income coming in.  Do not account for pre-tax 401k contributions, that is taken care of upstream
const calculateNetIncome = (numPeople, salary) => {
    let tax=0;
    //remove standard deduction from taxable income to lessen tax buren
    let deductedSalary = salary-(standardDeduction*numPeople);
    //if salary entered is less than standard deduction, no tax is owed, so the full salary is returned
    if(deductedSalary<=0){
        return salary;
    //first calculate for single filers
    }else if (numPeople === 1){
        //create array of relevant tax brackets based on deducted salary-only those which are below deducted salary
        let relevantTaxBrackets = taxBracketsSingle.filter(bracket => {
            return bracket[1] < deductedSalary;            
        })
        //Then add the very next bracket above deducted salary to calculate final portion of tax owed
        relevantTaxBrackets.push(taxBracketsSingle[relevantTaxBrackets.length]);
        //add up tax owed in each bracket that is crossed completely by deducted. i starts at 1 so i-1 can be used to determine $ difference between each bracket, with 0,0 bracket in place at the beginning
        //i goes up to length-1 so that final tax bracket can be calculated differently-using deducted salary instead of the full bracket width
        for (i=1; i<relevantTaxBrackets.length-1; i++){
            tax +=(relevantTaxBrackets[i][0]*(relevantTaxBrackets[i][1]-relevantTaxBrackets[i-1][1]));
        }
        //then add tax in the final bracket, using deducted salary as the upper bound
        tax += relevantTaxBrackets[relevantTaxBrackets.length-1][0]*(deductedSalary-relevantTaxBrackets[relevantTaxBrackets.length-2][1]);
        return salary-tax;
    //then calculate for joint filers
    }else if(numPeople===2){
        //create array of relevant tax brackets based on deducted salary-only those which are below deducted salary
        let relevantTaxBrackets = taxBracketsJoint.filter(bracket => {
            return bracket[1] < deductedSalary;            
        })
        //Then add the very next bracket above deducted salary to calculate final portion of tax owed
        relevantTaxBrackets.push(taxBracketsJoint[relevantTaxBrackets.length]);
        //add up tax owed in each bracket that is crossed completely by deducted. i starts at 1 so i-1 can be used to determine $ difference between each bracket, with 0,0 bracket in place at the beginning
        //i goes up to length-1 so that final tax bracket can be calculated differently-using deducted salary instead of the full bracket width
        for (i=1; i<relevantTaxBrackets.length-1; i++){
            tax +=(relevantTaxBrackets[i][0]*(relevantTaxBrackets[i][1]-relevantTaxBrackets[i-1][1]));
        }
        //then add tax in the final bracket, using deducted salary as the upper bound
        tax += relevantTaxBrackets[relevantTaxBrackets.length-1][0]*(deductedSalary-relevantTaxBrackets[relevantTaxBrackets.length-2][1]);
        return salary-tax;
    //If number of earners isn't 1 or 2, can't calculate tax
    }else{
        console.log(`Please enter a valid number of salary earners`);
    }
}

const calculateAddtlNetIncome = (numPeople, newSalary, previousSalary) => {
    origNet = calculateNetIncome(numPeople, previousSalary);
    newNet = calculateNetIncome(numPeople, newSalary+previousSalary);
    netNet = newNet - origNet;
    return netNet;
}

//Export calculate net income function.  Will be used when calculating life income/net cash flow each year
const taxExports = {calculateNetIncome, calculateAddtlNetIncome}
module.exports = taxExports;