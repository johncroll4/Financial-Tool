const personImports = require('./person.js');
const householdMembers = personImports.householdMembers;

let monthlySpending;
let monthlyRetirementSpending;
function insertCostValues (){
    monthlySpending=parseInt(window.sessionStorage.getItem('spend'), 10);
       monthlyRetirementSpending=parseInt(window.sessionStorage.getItem('retir'), 10);
    console.log(`Cost page monthly spending is ${monthlySpending}`);
    console.log(`Cost page retirement is ${monthlyRetirementSpending}`);
    window.sessionStorage.setItem('regCostDistributed', 1);
    console.log(`Time Cost page values inserted at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);
    window.sessionStorage.setItem('regCostConsumed', 1);
}
window.addEventListener('load', insertCostValues);

const regSpending = (year, spend=monthlySpending, retir=monthlyRetirementSpending) =>{
    console.log(`Time Cost page regspending called at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);
    let annualCost=0;
    if (householdMembers.length==1){
        if (year>=householdMembers[0]._retirementYear){
            annualCost = retir*12;
            return annualCost;
        }else{
            annualCost = spend*12;
            return annualCost;
        }
    }else if (householdMembers.length==2){
        if(year>=householdMembers[0]._retirementYear || year>=householdMembers[1]._retirementYear){
            annualCost = retir*12;
            return annualCost;
        }else{
            annualCost = spend*12;
            return annualCost;
        }
    }else{
        console.log(`Household members length is not 1 or 2, something is wrong`);
    }
}
console.log(`Time Cost page bottom at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);

module.exports = regSpending;