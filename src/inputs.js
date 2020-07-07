//handlebars demo and read from form
//test comment for branch
import Handlebars from './handlebars-v4.7.6.js';

window.sessionStorage.setItem('defaultDistributed', 0);
window.sessionStorage.setItem('housingDistributed', 0);
window.sessionStorage.setItem('housingConsumed', 0);
window.sessionStorage.setItem('accountDistributed', 0);
window.sessionStorage.setItem('accountConsumed', 0);
window.sessionStorage.setItem('regCostDistributed', 0);
window.sessionStorage.setItem('kidCostDistributed', 0);
window.sessionStorage.setItem('regCostConsumed', 0);
window.sessionStorage.setItem('kidCostConsumed', 0);
window.sessionStorage.setItem('salaryDistributed', 0);
window.sessionStorage.setItem('salaryConsumed', 0);
window.sessionStorage.setItem('loanDistributed', 0);
window.sessionStorage.setItem('loanConsumed', 0);
window.sessionStorage.setItem('basicMode', 0);

function replaceInputValues(){
    if (window.sessionStorage.getItem('defaultStored')==null){
        window.sessionStorage.setItem('defaultStored', 0);
    }else if (window.sessionStorage.getItem('defaultStored')==1){
        document.getElementById("growthRate").value=parseFloat(window.sessionStorage.getItem('growthRate'),10);
        document.getElementById("inflation").value=parseFloat(window.sessionStorage.getItem('inflation'),10);
        document.getElementById("propertyTax").value=parseFloat(window.sessionStorage.getItem('propertyTax'),10);
        document.getElementById("mortgageLength").value=parseInt(window.sessionStorage.getItem('mortgageLength'),10);
        document.getElementById("mortgageRate").value=parseFloat(window.sessionStorage.getItem('mortgageRate'),10);
        document.getElementById("homeGrowth").value=parseFloat(window.sessionStorage.getItem('homeGrowth'),10);
        document.getElementById("broker").value=parseFloat(window.sessionStorage.getItem('broker'),10);
        if(window.sessionStorage.getItem('calcPageFromBasic')==null || window.sessionStorage.getItem('calcPageFromBasic')==0){
            confirmValueSave("defaultNav");
        }
        calcPageButton();
    }
    if (window.sessionStorage.getItem('housingStored')==null){
        window.sessionStorage.setItem('housingStored', 0);
    }else if (window.sessionStorage.getItem('housingStored')==1){
        document.getElementById("houseNumber").value=parseInt(window.sessionStorage.getItem('NOH'),10);
        addNOH();
        if(window.sessionStorage.getItem('calcPageFromBasic')==null || window.sessionStorage.getItem('calcPageFromBasic')==0){
            confirmValueSave("housingNav");
        }
        calcPageButton();
    }
    if(window.sessionStorage.getItem('accountStored')==null){
        window.sessionStorage.setItem('accountStored', 0);
    }else if(window.sessionStorage.getItem('accountStored')==1){
        document.getElementById("accountNumber").value=parseInt(window.sessionStorage.getItem('NOA'),10);
        addNOA();
        if(window.sessionStorage.getItem('calcPageFromBasic')==null || window.sessionStorage.getItem('calcPageFromBasic')==0){
            confirmValueSave("investmentNav");  
        }
        calcPageButton();
    }
    if(window.sessionStorage.getItem('costStored')==null){
        window.sessionStorage.setItem('costStored', 0);
    }else if(window.sessionStorage.getItem('costStored')==1){
        document.getElementById("monthlySpend").value=parseInt(window.sessionStorage.getItem('spend'),10);
        document.getElementById("monthlyRetir").value=parseInt(window.sessionStorage.getItem('retir'),10);
        document.getElementById("monthlyKid").value=parseInt(window.sessionStorage.getItem('monthlyKid'),10);
        document.getElementById("kidNumber").value=parseInt(window.sessionStorage.getItem('NOK'),10);
        addNOK();
        if(window.sessionStorage.getItem('calcPageFromBasic')==null || window.sessionStorage.getItem('calcPageFromBasic')==0){
            confirmValueSave("costNav"); 
        }
        calcPageButton();
    }
    if(window.sessionStorage.getItem('salaryStored')==null){
        window.sessionStorage.setItem('salaryStored', 0);
    }else if(window.sessionStorage.getItem('salaryStored')==1){
        document.getElementById("personNumber").value=parseInt(window.sessionStorage.getItem('NOP'),10);
        const personArray = JSON.parse(window.sessionStorage.getItem('personArray'));
        const bumpArray = JSON.parse(window.sessionStorage.getItem('bumpArray'));
        document.getElementById("nameA").value=personArray[0][0];
        document.getElementById("ageA").value=personArray[0][1];
        document.getElementById("startingSalaryA").value=personArray[0][2];
        document.getElementById("growthA").value=personArray[0][3];
        document.getElementById("plateauYearA").value=personArray[0][4];
        document.getElementById("plateauGrowthA").value=personArray[0][5];
        document.getElementById("retirementA").value=personArray[0][6];
        document.getElementById("preTaxA").value=personArray[0][7];
        document.getElementById("companyMatchA").value=personArray[0][8];
        document.getElementById("bumpNumberA").value=bumpArray[0].length;
        addNOBA();
        if(parseInt(window.sessionStorage.getItem('NOP'),10)==2){
            addPeople();
            document.getElementById("nameB").value=personArray[1][0];
            document.getElementById("ageB").value=personArray[1][1];
            document.getElementById("startingSalaryB").value=personArray[1][2];
            document.getElementById("growthB").value=personArray[1][3];
            document.getElementById("plateauYearB").value=personArray[1][4];
            document.getElementById("plateauGrowthB").value=personArray[1][5];
            document.getElementById("retirementB").value=personArray[1][6];
            document.getElementById("preTaxB").value=personArray[1][7];
            document.getElementById("companyMatchB").value=personArray[1][8];
            document.getElementById("bumpNumberB").value=bumpArray[1].length;
            addNOBB();

        }
        if(window.sessionStorage.getItem('calcPageFromBasic')==null || window.sessionStorage.getItem('calcPageFromBasic')==0){
            confirmValueSave("salaryNav");
        }
        calcPageButton();
    }
    if(window.sessionStorage.getItem('loanStored')==null){
        window.sessionStorage.setItem('loanStored', 0);
    }else if(window.sessionStorage.getItem('loanStored')==1){
        document.getElementById("loanNumber").value=parseInt(window.sessionStorage.getItem('NOL'),10);
        addNOL();
        if(window.sessionStorage.getItem('calcPageFromBasic')==null || window.sessionStorage.getItem('calcPageFromBasic')==0){
            confirmValueSave("loanNav");
        }
        calcPageButton();
    }
}

replaceInputValues();

function calcPageButton(){
    let storedProduct = parseInt(window.sessionStorage.getItem('costStored'),10)*parseInt(window.sessionStorage.getItem('accountStored'),10)*parseInt(window.sessionStorage.getItem('defaultStored'),10)
    *parseInt(window.sessionStorage.getItem('housingStored'),10)*parseInt(window.sessionStorage.getItem('salaryStored'),10);
    if(storedProduct>0){
        document.getElementById('instructions').style.display='none';
        document.getElementById('calcPage').style.display='inline-block';
    }else{
        console.log(`All stored values were not set to 1, so calc page button not activated`);
    }
}

function confirmValueSave(id){
    const element=document.getElementById(id);
    element.style.fontStyle='italic';
    element.style.border='4px groove grey';
    element.style.padding='0';
}

const inputElement = document.getElementById("kidNumber");
function addNOK(){
    const source = document.getElementById("kidTemplate").innerHTML;
    const template = Handlebars.compile(source);
    const fill=document.getElementById("kiddos");
    const numberOfKids = document.getElementById("kidNumber").value;
    let kidArray = [];
    for (let i=0; i<numberOfKids; i++){
        kidArray[i]=i+1;
    }
    const context = {
        kidArray
    };
    const compiledHtml = template(context);
    fill.innerHTML=compiledHtml;
    if(window.sessionStorage.getItem('kidArray')==null){
        console.log(`no kids saved yet`)
    }else{
        const kidArray2=JSON.parse(window.sessionStorage.getItem('kidArray'));
        if(kidArray2.length==0){
            console.log(`No kids were saved previously`)
        }else if (kidArray2.length>0){
            for(let k=0; k<numberOfKids && k<kidArray2.length; k++){
                let l=k+1;
                document.getElementById('kidYear' + l).value=kidArray2[k][0];
                document.getElementById('dayCare' + l).value=kidArray2[k][1];
                document.getElementById('college' + l).value=kidArray2[k][2];              
            }
        }
    }
    for(let m=1; m<=numberOfKids; m++){
        if(window.sessionStorage.getItem('basicMode')==1){
            document.getElementById('dayCareRow' + m).style.display='none';
            document.getElementById('collegeRow' + m).style.display='none';
        }else{
            document.getElementById('dayCareRow' + m).style.display='table-row';
            document.getElementById('collegeRow' + m).style.display='table-row';
        }  
    }
}

inputElement.addEventListener("change", addNOK);

function pullCostValues(){
    const discElement=document.getElementById("monthlySpend");
    window.sessionStorage.setItem('spend', discElement.value);
    const retirElement=document.getElementById("monthlyRetir");
    window.sessionStorage.setItem('retir', retirElement.value);
    console.log(`Storage Page Spending is ${window.sessionStorage.getItem('spend')}`);
    console.log(`Storage Page Retirement Spending is ${window.sessionStorage.getItem('retir')}`);
    const nokElement=document.getElementById("kidNumber");
    window.sessionStorage.setItem('NOK', nokElement.value);
    console.log(`Storage Page NOK is ${window.sessionStorage.getItem('NOK')}`);
    const numberOfKids=parseInt(nokElement.value, 10);
    let kidArray=[];
    for(let i=0; i<numberOfKids; i++){
        let j=i+1;
        kidArray[i] = [document.getElementById('kidYear' + j).valueAsNumber, document.getElementById('dayCare' + j).valueAsNumber, document.getElementById('college' + j).valueAsNumber];
    }
    window.sessionStorage.setItem('kidArray', JSON.stringify(kidArray));
    console.log(`Storage Page kid array is ${window.sessionStorage.getItem('kidArray')}`);
    const kidElement=document.getElementById("monthlyKid");
    window.sessionStorage.setItem('monthlyKid', kidElement.value);
    console.log(`Storage Page monthly kid is ${window.sessionStorage.getItem('monthlyKid')}`);
    window.sessionStorage.setItem('costStored', 1);
    confirmValueSave("costNav");
    calcPageButton();    
}
const pullCostButton3 = document.getElementById("saveCost");
pullCostButton3.addEventListener("click", pullCostValues);


function estimateSpending(){
    const spendArray = [document.getElementById("groceries").valueAsNumber, document.getElementById("travel").valueAsNumber, document.getElementById("entertainment").valueAsNumber,
    document.getElementById("transportation").valueAsNumber, document.getElementById("retail").valueAsNumber, document.getElementById("utilities").valueAsNumber, document.getElementById("personal").valueAsNumber];
    const spendingEstimate = spendArray.reduce((previousValue, currentValue)=>{
        return previousValue + currentValue;
    });
    window.sessionStorage.setItem('spendArray', JSON.stringify(spendArray));
    document.getElementById("monthlySpend").value=spendingEstimate;
    document.getElementById("total").value=spendingEstimate;
    window.sessionStorage.setItem('spendEstimateStored', 1);
}
function replaceSpendValues(){
    if(window.sessionStorage.getItem('spendEstimateStored')==null){
        window.sessionStorage.setItem('spendEstimateStored', 0);
    }else if(window.sessionStorage.getItem('spendEstimateStored')==1){
        const spendArray = JSON. parse(window.sessionStorage.getItem('spendArray'));
        document.getElementById("groceries").value=spendArray[0];
        document.getElementById("travel").value=spendArray[1];
        document.getElementById("entertainment").value=spendArray[2];
        document.getElementById("transportation").value=spendArray[3];
        document.getElementById("retail").value=spendArray[4];
        document.getElementById("utilities").value=spendArray[5];
        document.getElementById("personal").value=spendArray[6];
    }
}
const spendModal = document.getElementById('spendModal');
const openSpendModal = document.getElementById('openSpendModal');
const span = document.getElementsByClassName('close')[0];
const estimateButton = document.getElementById("estimate");
openSpendModal.addEventListener("click", function(){
    spendModal.style.display= 'inline-block';
    replaceSpendValues();
});
span.addEventListener("click", function(){
    estimateSpending()
    spendModal.style.display= 'none';
});
window.addEventListener("click", function(event){
    if(event.target==spendModal){
        estimateSpending()
        spendModal.style.display='none';
    }
});
estimateButton.addEventListener("click", estimateSpending);

const inputElement2 = document.getElementById("houseNumber");
function addNOH (){
    const source2 = document.getElementById("houseTemplate").innerHTML;
    const template2 = Handlebars.compile(source2);
    const fill2=document.getElementById("houses");
    const numberOfHouses = document.getElementById("houseNumber").valueAsNumber;
    let houseArray = [];
    for (let i=0; i<numberOfHouses; i++){
        houseArray[i]=i+1;
    }
    const context2 = {
        houseArray
    };
    const compiledHtml2 = template2(context2);
    fill2.innerHTML=compiledHtml2;
    if(window.sessionStorage.getItem('houseArray')==null){
        console.log(`no houses saved yet`)
    }else{
        const houseArray2=JSON.parse(window.sessionStorage.getItem('houseArray'));
        if(houseArray2.length==0){
            console.log(`No houses were saved previously`)
        }else if (houseArray2.length>0){
            for(let k=0; k<numberOfHouses && k<houseArray2.length; k++){
                let l=k+1;
                document.getElementById('houseYear' + l).value=houseArray2[k][0];
                document.getElementById('houseAmount' + l).value=houseArray2[k][1];
                document.getElementById('fullTransfer' + l).checked=houseArray2[k][2];
                document.getElementById('downPayment' + l).value=houseArray2[k][3];
                document.getElementById('HOA' + l).value=houseArray2[k][4];
                document.getElementById('renting' + l).checked=houseArray2[k][5];
                document.getElementById('monthlyRent' + l).value=houseArray2[k][6];
            }
        }
    }
    for(let m=1; m<numberOfHouses+1; m++){
        //for some reason, numberOfHouses is not defined in here, but everything works okay?
        if(document.getElementById('renting' + m).checked==false){
            document.getElementById('hideRent' + m).style.display='none';
        }else if(document.getElementById('renting' + m).checked==true){
            document.getElementById('hideHouse' + m).style.display='none';
        }
        document.getElementById('renting'+m).addEventListener("change", function(){
            if(document.getElementById('renting' + m).checked==false){
                document.getElementById('hideRent' + m).style.display='none';
                document.getElementById('hideHouse' + m).style.display='table-row-group';
            }else if(document.getElementById('renting' + m).checked==true){
                document.getElementById('hideHouse' + m).style.display='none';
                document.getElementById('hideRent' + m).style.display='table-row';
            }
        });
    }
    //hide full transfer checkbox for first house automatically
    const fullTransfer1 = document.getElementById('hideTransfer1');
    if(typeof(fullTransfer1) != 'undefined' && fullTransfer1 != null){
        fullTransfer1.style.display='none';
    }
}

inputElement2.addEventListener("change", addNOH);

function pullHousingValues(){
    const nohElement=document.getElementById("houseNumber");
    const numberOfHouses=parseInt(nohElement.value, 10);
    window.sessionStorage.setItem('NOH', numberOfHouses);
    console.log(`Storage Page NOH is ${window.sessionStorage.getItem('NOH')}`);
    let houseArray=[];
    for(let i=0; i<numberOfHouses; i++){
        let j=i+1;
        houseArray[i] = [document.getElementById('houseYear' + j).valueAsNumber, document.getElementById('houseAmount' + j).valueAsNumber, document.getElementById('fullTransfer' + j).checked,
        document.getElementById('downPayment' + j).valueAsNumber, document.getElementById('HOA' + j).valueAsNumber, document.getElementById('renting' + j).checked, document.getElementById('monthlyRent' + j).valueAsNumber,];
    }
    window.sessionStorage.setItem('houseArray', JSON.stringify(houseArray));
    console.log(`Storage Page house array is ${window.sessionStorage.getItem('houseArray')}`);
    window.sessionStorage.setItem('housingStored', 1);
    confirmValueSave("housingNav");
    calcPageButton();   
}
const pullHousingButton = document.getElementById("saveHousing");
pullHousingButton.addEventListener("click", pullHousingValues);

const inputElement3 = document.getElementById("accountNumber");
function addNOA(){
    const numberofAccounts = document.getElementById("accountNumber");
    const source3 = document.getElementById("accountTemplate").innerHTML;
    const template3 = Handlebars.compile(source3);
    const fill3=document.getElementById("accounts");
    let accountArray = [];
    for (let i=0; i<numberofAccounts.value; i++){
        accountArray[i]=i+1;
    }
    const context3 = {
        accountArray
    };
    const compiledHtml3 = template3(context3);
    fill3.innerHTML=compiledHtml3;
    if(window.sessionStorage.getItem('accountArray')==null){
        console.log(`no accounts saved yet`)
    }else{
        const accountArray2=JSON.parse(window.sessionStorage.getItem('accountArray'));
        if(accountArray2.length==0){
            console.log(`No accounts were saved previously`)
        }else if (accountArray2.length>0){
            for(let k=0; k<numberofAccounts.value && k<accountArray2.length; k++){
                let l=k+1;
                document.getElementById('accountType' + l).value=accountArray2[k][0];
                document.getElementById('accountOwner' + l).value=accountArray2[k][1];
                document.getElementById('accountAmount' + l).value=accountArray2[k][2];
                document.getElementById('posPrecedence' + l).value=accountArray2[k][3];  
                document.getElementById('negPrecedence' + l).value=accountArray2[k][4];                  
            }
        }
    } 
}
inputElement3.addEventListener("change", addNOA);

function pullAccountValues(){
    const noaElement=document.getElementById("accountNumber");
    const numberOfAccounts=parseInt(noaElement.value, 10);
    window.sessionStorage.setItem('NOA', numberOfAccounts);
    console.log(`Storage Page NOA is ${window.sessionStorage.getItem('NOA')}`);
    let accountArray=[];
    for(let i=0; i<numberOfAccounts; i++){
        let j=i+1;
        accountArray[i] = [document.getElementById('accountType' + j).value, document.getElementById('accountOwner' + j).value, document.getElementById('accountAmount' + j).valueAsNumber,
                        document.getElementById('posPrecedence' + j).valueAsNumber, document.getElementById('negPrecedence' + j).valueAsNumber];
    }
    window.sessionStorage.setItem('accountArray', JSON.stringify(accountArray));
    console.log(`Storage Page account array is ${window.sessionStorage.getItem('accountArray')}`);
    window.sessionStorage.setItem('accountStored', 1);
    confirmValueSave("investmentNav");
    calcPageButton();   
}
const pullAccountsButton = document.getElementById("saveAccounts");
pullAccountsButton.addEventListener("click", pullAccountValues);

const inputElement4 = document.getElementById("personNumber");
function addPeople () {
    const personB=document.getElementById("personB");
    const numberOfPeople = document.getElementById("personNumber").value;
    if(numberOfPeople==1){
        personB.style.display='none';
    }else if(numberOfPeople==2){
        personB.style.display='block';
        if(window.sessionStorage.getItem('basicMode')==1){
            document.getElementById("salaryGrowthBRow").style.display='none';
            document.getElementById("bumpBRow").style.display='none';
            document.getElementById("bumpsB").style.display='none';
            document.getElementById("personBTable2").style.display='none';           
        }else{
            document.getElementById("salaryGrowthBRow").style.display='table-row';
            document.getElementById("bumpBRow").style.display='table-row';
            document.getElementById("bumpsB").style.display='table-row';
            document.getElementById("personBTable2").style.display='table-row';  
        }
    }else{
        console.log(`Issue with number of people`);
    }
    document.getElementById('person').style.display='none';
}

inputElement4.addEventListener("change", addPeople);

const inputElement5 = document.getElementById("bumpNumberA");
const inputElement6 = document.getElementById("bumpNumberB");
function addNOBA (){
    const numberOfBumpsA=document.getElementById("bumpNumberA").value;
    const source5 = document.getElementById("bumpTemplateA").innerHTML;
    const template5 = Handlebars.compile(source5);
    const fill5 = document.getElementById("bumpsA");
    const bumpArrayA=[];
    for(let i=0; i<numberOfBumpsA; i++){
        bumpArrayA[i]=i+1;
    }
    const context5 = {
        bumpArrayA
    };
    const compiledHtml5 = template5(context5);
    fill5.innerHTML=compiledHtml5;
    if(window.sessionStorage.getItem('bumpArray')==null){
        console.log(`no bumps saved yet`)
    }else{
        const bumpArrayA2=JSON.parse(window.sessionStorage.getItem('bumpArray'))[0];
        if(bumpArrayA2.length==0){
            console.log(`No bumps for person A were saved previously`)
        }else if (bumpArrayA2.length>0){
            for(let k=0; k<numberOfBumpsA && k<bumpArrayA2.length; k++){
                let l=k+1;
                document.getElementById('bumpYearA' + l).value=bumpArrayA2[k][0];
                document.getElementById('bumpGrowthA' + l).value=bumpArrayA2[k][1];              
            }
        }
    }
}
function addNOBB (){
    const numberOfBumpsB=document.getElementById("bumpNumberB").value;
    const source6 = document.getElementById("bumpTemplateB").innerHTML;
    const template6 = Handlebars.compile(source6);
    const fill6 = document.getElementById("bumpsB");
    const bumpArrayB=[];
    for(let i=0; i<numberOfBumpsB; i++){
        bumpArrayB[i]=i+1;
    }
    const context6 = {
        bumpArrayB
    };
    const compiledHtml6 = template6(context6);
    fill6.innerHTML=compiledHtml6;
    if(window.sessionStorage.getItem('bumpArray')==null){
        console.log(`no bumps saved yet`)
    }else{
        const bumpArrayB2=JSON.parse(window.sessionStorage.getItem('bumpArray'))[1];
        if(bumpArrayB2.length==0){
            console.log(`No bumps for person B were saved previously`)
        }else if (bumpArrayB2.length>0){
            for(let k=0; k<numberOfBumpsB && k<bumpArrayB2.length; k++){
                let l=k+1;
                document.getElementById('bumpYearB' + l).value=bumpArrayB2[k][0];
                document.getElementById('bumpGrowthB' + l).value=bumpArrayB2[k][1];              
            }
        }
    }
}

inputElement5.addEventListener("change", addNOBA);
inputElement6.addEventListener("change", addNOBB);

function pullPersonValues(){
    const nopElement=document.getElementById("personNumber");
    const numberOfPeople=parseInt(nopElement.value, 10);
    window.sessionStorage.setItem('NOP', numberOfPeople);
    console.log(`Storage Page NOP is ${window.sessionStorage.getItem('NOP')}`);
    
    const nameA = document.getElementById("nameA").value;
    const ageA = document.getElementById("ageA").valueAsNumber;
    const startingSalaryA = document.getElementById("startingSalaryA").valueAsNumber;
    const growthA = document.getElementById("growthA").valueAsNumber;
    const plateauYearA = document.getElementById("plateauYearA").valueAsNumber;
    const plateauGrowthA = document.getElementById("plateauGrowthA").valueAsNumber;
    const retirementA = document.getElementById("retirementA").valueAsNumber;
    const preTaxA = document.getElementById("preTaxA").valueAsNumber;
    const companyMatchA = document.getElementById("companyMatchA").valueAsNumber;

    const nameB = document.getElementById("nameB").value;
    const ageB = document.getElementById("ageB").valueAsNumber;
    const startingSalaryB = document.getElementById("startingSalaryB").valueAsNumber;
    const growthB = document.getElementById("growthB").valueAsNumber;
    const plateauYearB = document.getElementById("plateauYearB").valueAsNumber;
    const plateauGrowthB = document.getElementById("plateauGrowthB").valueAsNumber;
    const retirementB = document.getElementById("retirementB").valueAsNumber;
    const preTaxB = document.getElementById("preTaxB").valueAsNumber;
    const companyMatchB = document.getElementById("companyMatchB").valueAsNumber;

    let personArray=[];
    personArray[0] = [nameA, ageA, startingSalaryA, growthA, plateauYearA, plateauGrowthA, retirementA, preTaxA, companyMatchA];
    if (numberOfPeople==2){
        personArray[1] = [nameB, ageB, startingSalaryB, growthB, plateauYearB, plateauGrowthB, retirementB, preTaxB, companyMatchB];
    }       
    window.sessionStorage.setItem('personArray', JSON.stringify(personArray));
    console.log(`Storage Page person array is ${window.sessionStorage.getItem('personArray')}`);

    const bumpNumberA = document.getElementById("bumpNumberA").value;
    const bumpNumberB = document.getElementById("bumpNumberB").value;
    const bumpArray = [[],[]];
    if(numberOfPeople==1){
        if(bumpNumberA==0){
            console.log(`No bumps for person A`);
        }else if (bumpNumberA>0){
            for(let i=0; i<bumpNumberA; i++){
                let j=i+1;
                bumpArray[0][i]=[document.getElementById('bumpYearA'+j).valueAsNumber, document.getElementById('bumpGrowthA'+j).valueAsNumber];
            }
        }else{
            console.log(`Issue with salary bumps for person A`);
        }
    }else if(numberOfPeople==2){
        if(bumpNumberA==0 && bumpNumberB==0){
            console.log(`No bumps for either person`);
        }else if(bumpNumberB==0 && bumpNumberA>0){
            for(let i=0; i<bumpNumberA; i++){
                let j=i+1;
                bumpArray[0][i]=[document.getElementById('bumpYearA'+j).valueAsNumber, document.getElementById('bumpGrowthA'+j).valueAsNumber];
            }
        }else if(bumpNumberA==0 && bumpNumberB>0){
            for(let i=0; i<bumpNumberB; i++){
                let j=i+1;
                bumpArray[1][i]=[document.getElementById('bumpYearB'+j).valueAsNumber, document.getElementById('bumpGrowthB'+j).valueAsNumber];
            }
        }else if(bumpNumberA>0 && bumpNumberB>0){
            for(let h=0; h<bumpNumberA; h++){
                for(let i=0; i<bumpNumberB; i++){
                    let j=h+1;
                    let k=i+1;
                    bumpArray[0][h]=[document.getElementById('bumpYearA'+j).valueAsNumber, document.getElementById('bumpGrowthA'+j).valueAsNumber];
                    bumpArray[1][i]=[document.getElementById('bumpYearB'+k).valueAsNumber, document.getElementById('bumpGrowthB'+k).valueAsNumber];
                }
            }
        }else{
            console.log(`Issue with salary bumps-none of the if statements were activated`);
        }
    }else{
        console.log(`Issue with number of people-none of the if statements were activated`)
    }
    window.sessionStorage.setItem('bumpArray', JSON.stringify(bumpArray));
    console.log(`Storage Page bump array is ${window.sessionStorage.getItem('bumpArray')}`);
    window.sessionStorage.setItem('salaryStored', 1);
    confirmValueSave("salaryNav");
    calcPageButton();   
}
const pullPersonButton = document.getElementById("savePerson");
pullPersonButton.addEventListener("click", pullPersonValues);

function pullDefaultValues(){
    const growthElement=document.getElementById("growthRate");
    window.sessionStorage.setItem('growthRate', growthElement.value);
    console.log(`Storage Page Growth is ${window.sessionStorage.getItem('growthRate')}`);
    const inflationElement=document.getElementById("inflation");
    window.sessionStorage.setItem('inflation', inflationElement.value);
    console.log(`Storage Page Inflation is ${window.sessionStorage.getItem('inflation')}`);
    const properyTaxElement=document.getElementById("propertyTax");
    window.sessionStorage.setItem('propertyTax', properyTaxElement.value);
    console.log(`Storage Page Property Tax is ${window.sessionStorage.getItem('propertyTax')}`);
    const mortgageLengthElement=document.getElementById("mortgageLength");
    window.sessionStorage.setItem('mortgageLength', mortgageLengthElement.value);
    console.log(`Storage Page Mortgage Length is ${window.sessionStorage.getItem('mortgageLength')}`);
    const mortgageRateElement=document.getElementById("mortgageRate");
    window.sessionStorage.setItem('mortgageRate', mortgageRateElement.value);
    console.log(`Storage Page Mortgage Rate is ${window.sessionStorage.getItem('mortgageRate')}`);
    const homeGrowthElement=document.getElementById("homeGrowth");
    window.sessionStorage.setItem('homeGrowth', homeGrowthElement.value);
    console.log(`Storage Page Home Value Growth is ${window.sessionStorage.getItem('homeGrowth')}`);
    const brokerElement=document.getElementById("broker");
    window.sessionStorage.setItem('broker', brokerElement.value);
    console.log(`Storage Page Broker Sale Commission is ${window.sessionStorage.getItem('broker')}`);
    window.sessionStorage.setItem('defaultStored', 1);
    confirmValueSave("defaultNav");
    calcPageButton();
}

const pullDefaultButton = document.getElementById("saveDefault");
pullDefaultButton.addEventListener("click", pullDefaultValues);

const inputElement7 = document.getElementById("loanNumber");
function addNOL(){
    const source = document.getElementById("loanTemplate").innerHTML;
    const template = Handlebars.compile(source);
    const fill=document.getElementById("loans");
    const numberOfLoans = document.getElementById("loanNumber").valueAsNumber;
    let loanArray = [];
    for (let i=0; i<numberOfLoans; i++){
        loanArray[i]=i+1;
    }
    const context = {
        loanArray
    };
    const compiledHtml = template(context);
    fill.innerHTML=compiledHtml;
    if(window.sessionStorage.getItem('loanArray')==null){
        console.log(`no loans saved yet`)
    }else{
        const loanArray2=JSON.parse(window.sessionStorage.getItem('loanArray'));
        if(loanArray2.length==0){
            console.log(`No loans were saved previously`)
        }else if (loanArray2.length>0){
            for(let k=0; k<numberOfLoans && k<loanArray2.length; k++){
                let l=k+1;
                document.getElementById('loanYear' + l).value=loanArray2[k][0];
                document.getElementById('loanAmount' + l).value=loanArray2[k][1];
                document.getElementById('loanRate' + l).value=loanArray2[k][2];
                document.getElementById('loanLength' + l).value=loanArray2[k][3];
                document.getElementById('cashInflow' + l).checked=loanArray2[k][4];                
            }
        }
    }
}
inputElement7.addEventListener("change", addNOL);

function pullLoanValues(){
    const numberOfLoans=document.getElementById("loanNumber").valueAsNumber;
    window.sessionStorage.setItem('NOL', numberOfLoans);
    console.log(`Storage Page NOL is ${window.sessionStorage.getItem('NOL')}`);
    let loanArray=[];
    for(let i=0; i<numberOfLoans; i++){
        let j=i+1;
        loanArray[i] = [document.getElementById('loanYear' + j).valueAsNumber, document.getElementById('loanAmount' + j).valueAsNumber, document.getElementById('loanRate' + j).valueAsNumber,
        document.getElementById('loanLength' + j).valueAsNumber, document.getElementById('cashInflow' + j).checked];
    }
    window.sessionStorage.setItem('loanArray', JSON.stringify(loanArray));
    console.log(`Storage Page loan array is ${window.sessionStorage.getItem('loanArray')}`);
    window.sessionStorage.setItem('loanStored', 1);
    confirmValueSave("loanNav");
    calcPageButton();   
}
document.getElementById("saveLoans").addEventListener("click", pullLoanValues);

function showOneSection(){
    window.sessionStorage.setItem('basicMode', 0);
    hideBasicStuff();
    if (event.target.id=="defaultAnchor"){
        document.getElementById("values").style.display='block';
        document.getElementById("housing").style.display='none';
        document.getElementById("salary").style.display='none';
        document.getElementById("cost").style.display='none';
        document.getElementById("investment").style.display='none';
        document.getElementById("loan").style.display='none';
        
        document.getElementById("saveDefault").style.display='block';
    }else if (event.target.id=="housingAnchor"){
        showHousingInputs();
    }else if (event.target.id=="salaryAnchor"){
        document.getElementById("values").style.display='none';
        document.getElementById("housing").style.display='none';
        document.getElementById("salary").style.display='block';
        document.getElementById("cost").style.display='none';
        document.getElementById("investment").style.display='none';
        document.getElementById("loan").style.display='none';
        document.getElementById("salaryGrowthARow").style.display='table-row';
        document.getElementById("bumpARow").style.display='table-row';
        document.getElementById("bumpsA").style.display='table-row';
        document.getElementById("personATable2").style.display='table-row';
        addPeople();
        document.getElementById("savePerson").style.display='block'; 
    }else if (event.target.id=="costAnchor"){
        document.getElementById("values").style.display='none';
        document.getElementById("housing").style.display='none';
        document.getElementById("salary").style.display='none';
        document.getElementById("cost").style.display='block';
        document.getElementById("investment").style.display='none';
        document.getElementById("loan").style.display='none';
        addNOK();
        document.getElementById("retirementSpendRow").style.display='table-row';
        document.getElementById("kidSpendRow").style.display='table-row';
        document.getElementById("saveCost").style.display='block';
    }else if (event.target.id=="investmentAnchor"){
        document.getElementById("values").style.display='none';
        document.getElementById("housing").style.display='none';
        document.getElementById("salary").style.display='none';
        document.getElementById("cost").style.display='none';
        document.getElementById("investment").style.display='block';
        document.getElementById("loan").style.display='none';
        document.getElementById("accountHeader1").innerHTML="Account 1";
        document.getElementById("accountNumberRow").style.display='table-row';
        document.getElementById("accountTypeRow1").style.display='table-row';
        document.getElementById("ownerRow1").style.display='table-row';
        document.getElementById("posPrecRow1").style.display='table-row';
        document.getElementById("negPrecRow1").style.display='table-row';
        document.getElementById("saveAccounts").style.display='block';
    }else if (event.target.id=="loanAnchor"){
        document.getElementById("values").style.display='none';
        document.getElementById("housing").style.display='none';
        document.getElementById("salary").style.display='none';
        document.getElementById("cost").style.display='none';
        document.getElementById("investment").style.display='none';
        document.getElementById("loan").style.display='block';
        document.getElementById("saveLoans").style.display='block';
    }
}
document.getElementById("defaultNav").addEventListener("click", showOneSection);
document.getElementById("housingNav").addEventListener("click", showOneSection);
document.getElementById("salaryNav").addEventListener("click", showOneSection);
document.getElementById("costNav").addEventListener("click", showOneSection);
document.getElementById("investmentNav").addEventListener("click", showOneSection);
document.getElementById("loanNav").addEventListener("click", showOneSection);

function showHousingInputs(){
    hideBasicStuff();
    document.getElementById("values").style.display='none';
    document.getElementById("housing").style.display='block';
    document.getElementById("salary").style.display='none';
    document.getElementById("cost").style.display='none';
    document.getElementById("investment").style.display='none';
    document.getElementById("loan").style.display='none';
    document.getElementById("houseNumberRow").style.display='table-row';
    document.getElementById("HOARow1").style.display='table-row';
    document.getElementById("saveHousing").style.display='block';
}

function hideBasicStuff(){
    if(document.getElementById("basicModeHeader")!==null){
        document.getElementById("basicModeHeader").style.display='none';
    }
    document.getElementById("saveBasic1").style.display='none';
    document.getElementById("saveBasic2").style.display='none';
}

function showBasicInputs(){
    window.sessionStorage.setItem('basicMode', 1);
    const basicModeHeader=document.getElementById("basicModeHeader");
    if(basicModeHeader==null){
        const secondHeader = document.createElement("h3");
        secondHeader.innerHTML="Basic Mode";
        secondHeader.id="basicModeHeader";
        secondHeader.style.color='red';
        document.getElementsByTagName("header")[0].appendChild(secondHeader);
    }else if (basicModeHeader.style.display=='none'){
        basicModeHeader.style.display='block';
        basicModeHeader.style.color='red';
    }
    document.getElementById("saveBasic1").style.display='block';
    document.getElementById("saveBasic2").style.display='block';
    
    document.getElementById("values").style.display='none';

    document.getElementById("housing").style.display='block';
    document.getElementById("houseNumber").value=1;
    addNOH();
    document.getElementById("houseNumberRow").style.display='none';
    document.getElementById("HOARow1").style.display='none';
    document.getElementById("saveHousing").style.display='none';

    document.getElementById("salary").style.display='block';
    document.getElementById("nameARow").style.display='none';
    document.getElementById("salaryGrowthARow").style.display='none';
    document.getElementById("bumpARow").style.display='none';
    document.getElementById("bumpsA").style.display='none';
    document.getElementById("personATable2").style.display='none';
    addPeople();
    document.getElementById("savePerson").style.display='none';

    document.getElementById("cost").style.display='block';
    document.getElementById("retirementSpendRow").style.display='none';
    document.getElementById("kidSpendRow").style.display='none';
    addNOK();
    document.getElementById("saveCost").style.display='none';

    
    document.getElementById("investment").style.display='block';
    document.getElementById("accountNumber").value=1;
    addNOA();
    document.getElementById("accountNumberRow").style.display='none';
    document.getElementById("accountTypeRow1").style.display='none';
    document.getElementById("ownerRow1").style.display='none';
    document.getElementById("posPrecRow1").style.display='none';
    document.getElementById("negPrecRow1").style.display='none';
    document.getElementById("accountHeader1").innerHTML="All cash on hand, including retirement $";
    document.getElementById("saveAccounts").style.display='none';

    document.getElementById("loan").style.display='none';
}
document.getElementById("basicNav").addEventListener("click", showBasicInputs);

function saveBasicMode(){
    pullLoanValues();
    pullPersonValues();
    pullHousingValues();
    pullCostValues();
    pullDefaultValues();
    pullAccountValues();
    window.sessionStorage.setItem('calcPageFromBasic', 1);
    setTimeout(function(){
        window.location.href="./calculate.html";
    }, 1000);
}
document.getElementById("saveBasicButton1").addEventListener("click", saveBasicMode);
document.getElementById("saveBasicButton2").addEventListener("click", saveBasicMode);

function goToCalcPage(){
    pullLoanValues();
    window.location.href="./calculate.html";
    window.sessionStorage.setItem('calcPageFromBasic', 0);
}
document.getElementById("calcPage").addEventListener("click", goToCalcPage);

if(window.sessionStorage.getItem('calcPageFromBasic')==1 || window.sessionStorage.getItem('calcPageFromBasic')==null){
    showBasicInputs();
}else if(window.sessionStorage.getItem('calcPageFromBasic')==0){
    showHousingInputs();
}
