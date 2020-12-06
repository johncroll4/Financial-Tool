const regSpending = (year, spend, retir, personArray) =>{
    console.log(`Time Cost page regspending called at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);
    let annualCost=0;
    if (personArray.length==1){
        if (year>=personArray[0]._retirementYear){
            annualCost = retir*12;
            return annualCost;
        }else{
            annualCost = spend*12;
            return annualCost;
        }
    }else if (personArray.length==2){
        if(year>=personArray[0]._retirementYear || year>=personArray[1]._retirementYear){
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