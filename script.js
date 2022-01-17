let startBtn = document.querySelector(".ok-btn");
let startMenu = document.querySelector(".start-menu");
let backBtn = document.querySelector("#back-btn");
let travelExpMenu = document.querySelector(".travel-expenses-menu");

/*startBtn.addEventListener('click', nextPage);*/

startBtn.addEventListener('click', nextPage);

backBtn.addEventListener('click', prevPage);

function visualise(element) {
    element.style.display = "block";
};

function hide(element) {
    element.style.display = "none";
};

function nextPage() {
    setVersion();
    setLanguage();
    hide(startMenu);
    visualise(travelExpMenu);
};

function prevPage() {
    visualise(startMenu);
    hide(travelExpMenu);
    resetCostCentre();
}

/********* SELECTION **********/

let languageSelect = document.getElementById("language");
let versionSelect = document.getElementById("version");
let costObjectContainer = document.querySelector(".cost-object-container");
let costIdNrContainer = document.getElementById("cost-id-nr-container");
let costIdNrTitle = document.querySelector("#cost-id-nr-title");
let costIdNrInput = document.querySelector(".cost-id-nr-input");

function setLanguage() {
    if(languageSelect.value === "german") {

        for(let i = 0; i < inputLabel.length; i++) {
            inputLabel[i].innerHTML = labelNamesGerman[i];
        }

    } else {
        for(let j = 0; j < inputLabel.length; j++) {
            inputLabel[j].innerHTML = labelNamesEnglish[j];
        };
    };
};
let versionTitle = document.querySelector("#version-title");
function setVersion() {

    switch(versionSelect.value) {

        case("ALDI-International-Services"):
            setAis();
            break;

        case("AHEAD"):
            setAhead();
            break;

        case("ALDI-Digital-Services"):
            setAds();
    };

};

function setAis() {
    versionTitle.innerHTML = "ALDI International Services";
    visualise(aisCostCentre);
    hide(aheadCostCentre);
    costObjectContainer.children[0].style.display = "inline-block";
    costObjectContainer.children[1].style.display = "inline-block";
};

function setAhead() {
    versionTitle.innerHTML = "AHEAD";
    visualise(aheadCostCentre);
    hide(aisCostCentre);
    costObjectContainer.children[0].style.display = "inline-block";
    costObjectContainer.children[1].style.display = "inline-block";
};

function setAds() {
    versionTitle.innerHTML = "ALDI Digital Services";
    hide(aisCostCentre);
    hide(aheadCostCentre);
    hide(costObjectContainer.children[0]);
    hide(costObjectContainer.children[1]);
    visualise(costIdNrContainer);
    costIdNrTitle.innerHTML = "WBS-Element";
};

function resetCostCentre() {
    costIdNrContainer.style.display = "none";
    for(let i = 0; i < radioBtns.length; i++) {
        radioBtns[i].checked = false;
    }
};

/*********** SET AIS COST CENTRE **********/
let aisCostCentre = document.querySelector(".ais-cost-centre");
let aisButtons = document.querySelectorAll('input[name="ais-cost-centre"]');

for(let i = 0; i < aisButtons.length; i++) {
    aisButtons[i].addEventListener('click', checkAisCostCentreValue);
};
function checkAisCostCentreValue() {
    
        if(this.value === "061-iit") {
            visualise(costIdNrContainer);
            costIdNrTitle.innerHTML = "WBS-Element";
        } else if(this.value === "051-iia" || this.value === "052-iia-rcm") {
            hide(costIdNrContainer);
        } else {
            visualise(costIdNrContainer);
            costIdNrTitle.innerHTML = "Internal Order";
        };
};

/************* SET AHEAD COST CENTRE ************/
let aheadCostCentre = document.querySelector(".ahead-cost-centre");
let aheadButtons = document.querySelectorAll('input[name="ahead-cost-centre"]');
for(let i = 0; i < aheadButtons.length; i++) {
    aheadButtons[i].addEventListener('click', checkAheadCostCentreValue);
};

function checkAheadCostCentreValue() {
    if(this.value === "5100-project") {
        visualise(costIdNrContainer);
        costIdNrTitle.innerHTML = "WBS-Element";
    } else {
        visualise(costIdNrContainer);
        costIdNrTitle.innerHTML = "Internal Order";
    };
};

/****** INPUT CELLS *****/
let inputLabel = document.querySelectorAll(".inputLabel");

let labelNamesGerman = ["Vorname", "Nachname", "Personalnummer", "Reisedatum von", "Reisedatum bis", "Reiseland", "IBAN", "BIC", "Bank", "eigenem PKW", "firmen PKW", "Mietwagen", "Bahn bzw. Flugzeug", "Kennzeichen", "Datum", "Abf. Uhrzeit", "Rückk. Uhrzeit", "Reiseziel", "Reisezweck", "gefahrene km", "abzgl. Arbeitsweg km", "Summe", "Pauschale", "Abzug für Mahlzeiten", "Art", "Betrag in EUR", "Fahrtkosten", "Pauschale", "Nebenkosten", "Alle Kosten", "Kostenstelle", "(bitte ankreuzen)"];

let labelNamesEnglish = ["First Name", "Last Name", "Personal Number", "Date of travel from", "Date of travel to", "Destination", "IBAN", "BIC", "Bank", "own vehicle", "company car", "hire car", "train and/or aeroplane", "registration plate", "Date", "Dep. time", "Return time", "Destination", "Purpose of travel", "km travelled", "minus commuting distance in km", "sub-total", "Fixed rate", "Deduction for meals", "Type", "Amount in EUR", "Car Travel Costs", "Meal Costs", "Incidental Costs", "Total Costs", "Cost centre", "(please select)"];

/******** REQUIRED INPUTS VALIDATION **************/
let mandatoryInputs = {
    mandatoryTextFields : document.querySelectorAll(".mandatory-text"),
    mandatoryNumberFields : document.querySelectorAll(".mandatory-number"),
    mandatoryDateFields : document.querySelectorAll(".mandatory-date"),
};
let startDateContainer = document.getElementById("date-of-travel-from-container");
let endDateContainer = document.getElementById("date-of-travel-to-container");

function errorMessage(domItem) {
    alert("Please apply your " + domItem.firstElementChild.innerHTML + "!");
};

function errorBorder(domItem) {
    domItem.lastElementChild.classList.remove("mandatory");
    domItem.lastElementChild.classList.add("mandatory-error");
};

function addInputValue(element) {
    
    for(let i = 0; i < element.length; i++) {
        element[i].addEventListener('click', function(){
            this.lastElementChild.classList.remove("mandatory-error")
            this.lastElementChild.classList.add("mandatory");
        });
    };
};

addInputValue(mandatoryInputs.mandatoryTextFields);
addInputValue(mandatoryInputs.mandatoryNumberFields);
addInputValue(mandatoryInputs.mandatoryDateFields);

function checkTextValue(element) {
    
    for(let i = 0; i < element.length; i++) {
        
        if(element[i].lastElementChild.value.trim() === "") {
            errorMessage(element[i]);
            errorBorder(element[i]);
            return false;
        };
    };
    console.log("Text Works!");
    return true;
};

function checkNumberValue(element) {

    for (let i = 0; i < element.length; i++) {

        if(element[i].lastElementChild.value.trim() === "" || isNaN(element[i].lastElementChild.value.trim())) {
            errorMessage(element[i]);
            errorBorder(element[i]);
            return false;
        };
        console.log("Number Works!");
        return true;
    };
    
};

function checkDateValue() {

    let startDate = Date.parse(startDateContainer.lastElementChild.value);
    let endDate = Date.parse(endDateContainer.lastElementChild.value);
    let dateDifference = endDate - startDate;

    if(isNaN(startDate)) {
        errorMessage(startDateContainer);
        errorBorder(startDateContainer);
        return false;
    };
    if(isNaN(endDate)) {
        errorMessage(endDateContainer);
        errorBorder(endDateContainer);
        return false;
    };
    if(endDate < startDate) {
        alert("The end date of your journey is earlier then your start date!");
        errorBorder(startDateContainer);
        errorBorder(endDateContainer);
        return false;
    };
    if(dateDifference > 2332800000) {
        alert("Too long journey!");
        errorBorder(startDateContainer);
        errorBorder(endDateContainer);
        return false;
    };
    console.log("Date Works!");
    return true;
};

function validateInputs() {
    
    if(
    checkTextValue(mandatoryInputs.mandatoryTextFields) &&
    checkNumberValue(mandatoryInputs.mandatoryNumberFields) &&
    checkDateValue() &&
    validateCostCentre() &&
    checkCostIdNr()) {
        console.log("Inputs are valid!");
        return true;
    } else {
        return false;
    };
};

/********** COST CENTRE VALIDATION *************/
let radioBtns = document.querySelectorAll(".radio-btn");
function validateCostCentre() {
    
    let validCostCentre = false;

    for(let i = 0; i < radioBtns.length; i++) { 
        if(radioBtns[i].checked == true) {
            validCostCentre = true;
        };
    };
    if(!validCostCentre) {
        alert("Please select a cost centre!");
        return false;
    };
    console.log("Cost centre works!");
    return true;
};

function checkCostIdNr() {

    switch(costIdNrTitle.innerHTML) {
        case "WBS-Element":
            return validateWbsElement(costIdNrInput);
        case "Internal Order":
            return validateInternalOrder(costIdNrInput);
    };
    return true;
};

function validateWbsElement(element) {
    
    if(isNaN(element.value) || element.value.length !== 16) {
        alert("Wrong WBS element!");
        return false;
    };
    console.log("WBS-element valid!");
    return true;
};

function validateInternalOrder(element) {
  
    if(isNaN(element.value) || element.value.length < 11 || element.value.length > 12) {
        alert("Wrong Internal Order!");
        return false;
    };  
    console.log("Internal Order valid!");
    return true;
};

/***** REGISTRATION PLATE ON-OFF ******/

let companyVehicle = document.getElementById("company-vehicle");
let registrationPlate = document.querySelector("#registration-plate");
let registrationPlateInput = document.querySelector("#registration-plate-input");

companyVehicle.addEventListener('click', checkCompanyCar);

function checkCompanyCar() {

    if (companyVehicle.checked === true) {
        registrationPlate.style.visibility = "visible";
    };

    if (companyVehicle.checked === false) {
        registrationPlate.style.visibility = "hidden";
        registrationPlateInput.value = "";
    };
};

/****** TABLE HANDLIMG *************/
let travelExpensesTable = document.getElementById("travel-expenses-table");
let carTravelCostParagraph = document.getElementById('subtotal-car-travel-costs').children[1];
let mealCostParagraph = document.getElementById('subtotal-meal-costs').children[1];
let incidentalCostParagraph = document.getElementById('subtotal-incidental-costs').children[1];
let totalCostParagraph = document.getElementById('total-cost').children[1];
let addExpenseBtn = document.querySelector("#add-expense-btn");

addExpenseBtn.addEventListener('click', addExpense);

function addExpense() {
    let newExpenseRow = document.createElement("tr");
    newExpenseRow.classList.add("new-expense-container");
    createExpenseCells(newExpenseRow);

    newExpenseRow.childNodes[7].firstElementChild.classList.add("car-travel-cost");
    newExpenseRow.childNodes[8].firstElementChild.classList.add("meal-cost");
    newExpenseRow.childNodes[11].firstElementChild.classList.add("incidental-cost");
    
    newExpenseRow.childNodes[7].firstElementChild.addEventListener('change', calculateCarTravelCost);
    newExpenseRow.childNodes[8].firstElementChild.addEventListener('change', calculateMealCost);
    newExpenseRow.childNodes[11].firstElementChild.addEventListener('change', calculateIncidentalCost);

    createDeleteBtn(newExpenseRow);
    travelExpensesTable.appendChild(newExpenseRow);
};

function createExpenseCells(row) {
    for(var i = 0; i < 12; i++) {
        let newExpenseCell = document.createElement("td");
        let newExpenseCellInput = document.createElement("input");
        newExpenseCellInput.classList.add("new-expense-cell-input");
        newExpenseCell.appendChild(newExpenseCellInput);
        row.appendChild(newExpenseCell);
    };
};

function createDeleteBtn(row) {
    let deleteBtn = document.createElement("button");
    let deleteBtnText = document.createTextNode("X");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.appendChild(deleteBtnText);
    deleteBtn.addEventListener('click', deleteCost);
    row.appendChild(deleteBtn);
};

function deleteCost() {
    this.parentElement.remove();
    calculateCarTravelCost();
    calculateMealCost();
    calculateIncidentalCost();
};

function calculateTotalCost() {
    totalCostParagraph.value = calculteElements('car-travel-cost') + calculteElements('meal-cost') + calculteElements('incidental-cost') + " EUR";
};

function calculateCarTravelCost() {
    carTravelCostParagraph.value = calculteElements('car-travel-cost') + " EUR";
    calculateTotalCost();
};

function calculateMealCost() {
    mealCostParagraph.value = calculteElements('meal-cost') + " EUR";
    calculateTotalCost();
};

function calculateIncidentalCost() {
    incidentalCostParagraph.value = calculteElements('incidental-cost') + " EUR";
    calculateTotalCost();
};

function calculteElements(className) {
    let elements = document.getElementsByClassName(className);
    let total = 0;

    for (let item of elements) {

        if (!isNaN(item.value)) {
            if(item.value !== "") {
                total += parseFloat(item.value);
            } else {
                item.value = 0;
            };
        } else {
            alert("Please add a number!");
        };
    };
    return total;
};

/*************** SUBMIT **************/

let submitBtn = document.getElementById("submit-btn");
let kontierungMenu = document.querySelector(".kontierung-menu");

submitBtn.addEventListener('click', checkFields);

function checkFields() {
    if(validateInputs()) {
        console.log("Validation complete!");
        kontierungMenu.style.display = "block";
    };
    getServicenowTicketId();
    getUserData(userData, inputValues);
};

/************** KONTIERUNGS MENU ***************/

let companyTitle = document.getElementById("company-title");
let kontierungsDatum = document.getElementById("kontierungs-datum");

(function getKontierungsDatum() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    if(month < 10) {
        month = "0" + month;
    };
    let date = today.getDate();
    if(date < 10) {
        date = "0" + date;
    };
    kontierungsDatum.innerHTML = year + " " + month + " " + date;
})();

let serviceNowTicketId = document.getElementById("servicenow-ticket-id");

let numArr = ["0","1","2","3","4","5","6","7","8","9"];
function getRandomNumber() {
    var randNumArr = [];
    for(i = 0; i < 7; i++) {
        var randNum = numArr[Math.floor(Math.random()* numArr.length)];
        randNumArr.push(randNum);
    };
    return "RITM" + randNumArr.join('');
};

function getServicenowTicketId() {
    let ritmNumber = getRandomNumber();
    serviceNowTicketId.innerHTML = ritmNumber;
};

let userData = document.querySelectorAll(".user-data");
let inputValues = document.querySelectorAll(".input-value");

function getUserData(element, value) {
    companyTitle.innerHTML = versionTitle.innerHTML;
    document.querySelector("#user-cost-id-number-label").innerHTML = document.querySelector("#cost-id-nr-title").innerHTML;
    for(let i = 0; i < element.length; i++) {
        element[i].innerHTML = value[i].value;
    };
};
