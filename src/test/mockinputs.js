
const fillOutInputValues = ()=> {
    const personArray=[];
    window.sessionStorage.setItem('NOP', 2);
    personArray[0] = ["PersonA", 30, 75000, 0.03, 2050, 0.02, 2060, 0, 0];
    personArray[1] = ["PersonB", 31, 85000, 0.04, 2051, 0.03, 2061, 0, 0];
    window.sessionStorage.setItem('personArray', JSON.stringify(personArray));
    console.log(`Test Page person array is ${window.sessionStorage.getItem('personArray')}`);
    const bumpArray = [[],[]];
    bumpArray[0]= [[2030,0.05],[2040,.1]];
    bumpArray[1]=[[2035,0.03],[2045,.075]];
    window.sessionStorage.setItem('bumpArray', JSON.stringify(bumpArray));

    window.sessionStorage.setItem('NOA', 3);
    const accountArray=[];
    accountArray[0]=["Regular", "PersonA", 30000];
    accountArray[1]=["401k", "PersonA", 25000];
    accountArray[2]=["Roth", "PersonB", 50000];
    window.sessionStorage.setItem('accountArray', JSON.stringify(accountArray));

    window.sessionStorage.setItem('NOL', 1);
    const loanArray=[];
    loanArray[0]=[2023,50000,0.05,10,false]
    window.sessionStorage.setItem('loanArray', JSON.stringify(loanArray));

    window.sessionStorage.setItem('NOH', 2);
    const houseArray = [];
    houseArray[0]=[2024,500000,false,0.2,0,false,0,"Home1"];
    houseArray[1]=[2028,600000,false,0.2,0,false,0,"Home2"];
    window.sessionStorage.setItem('houseArray', JSON.stringify(houseArray));

    window.sessionStorage.setItem('NOK', 1);
    const kidArray = [];
    kidArray[0]=[2025,0,30000];
    window.sessionStorage.setItem('kidArray', JSON.stringify(kidArray));

    window.sessionStorage.setItem('spend', 1500);
    window.sessionStorage.setItem('retir', 2000);
}

module.exports = fillOutInputValues;
