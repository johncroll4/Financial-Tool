//Kid creator takes all the required variables related to the cost of a kid, and saves them as an object.  This is a factory function for kid objects
//Really only need a name and year born, default values are reasonable
//Important method is yearlyCost
console.log(`Time kid page top at ${new Date().getSeconds()} and ${new Date().getMilliseconds()}`);

const taxCredit = 1500;
const kidCreator = (_name='Kid', _yearBorn=2020, _dayCareCost=0, _collegeCost=30000) =>{
    return {
        _name,
        _yearBorn,
        _dayCareCost,
        _collegeCost,
        //With above information, can calculate estimated cost for this kid for a given year
        yearlyCost(seekingYear, monthlyCost){
            let cost = 0;
            //if seeking year is before birth year, cost is 0
            if (seekingYear<this._yearBorn){
                cost =0;
            //if seeking year occurs between age 0 and 4, enter this section
            }else if (seekingYear-this._yearBorn<4){
                //cost is regular monthly cost + daycare cost (which can be zero)
                cost = (monthlyCost + this._dayCareCost)*12-taxCredit;
            //This section is for kids aged 4-18
            }else if (seekingYear-this._yearBorn<=18){
                cost = monthlyCost*12-taxCredit;
            //Seeking year falls within college years
            }else if (seekingYear-this._yearBorn>18 && seekingYear-this._yearBorn<23){
                cost = this._collegeCost-taxCredit;
            //Kid has left the nest, no cost
            }else if (seekingYear-this._yearBorn>22){
                cost = 0;
            }
            return cost;
        }  
    }
}

//This function takes a year as a parameter and returns the annual cost of having kids for that year.  Will add up costs of multiple kids at the same time
const returnAnnualKidCost = (year, kidList, monthlyCost) =>{
    if(kidList.length==0){
        return 0;
    }
    const annualCostValues = [];
    kidList.forEach(kid => {
        //for each kid, add the cost for the given year to an array
        annualCostValues.push(kid.yearlyCost(year, monthlyCost));
    })
    //then reduce above array to sum up kid cost values into one total cost number
    const annualCost = annualCostValues.reduce((previousValue, currentValue)=>{
        return previousValue + currentValue;
    })
    return annualCost;
}

//export annual kid cost calculator to be used in overall life yearly calculations
const kidExports = {returnAnnualKidCost, kidCreator}
module.exports = kidExports;