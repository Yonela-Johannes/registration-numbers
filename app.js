// getting function
import RegistrationNumbers from './main.js'
const registrationNumbers = RegistrationNumbers()
// getting and init document object elements
const towns = document.querySelector('select')
const townName = document.querySelector('.town-name')
const numberPlate = document.querySelector('.number-plate-inner-box')
const filteredNumberPlate = document.querySelector('.filter-plate-inner-box')
const errorHandler = document.querySelector('.error-handling')
const errorHandlerWrapper = document.querySelector('.error-handling-wrapper')
const regInput = document.querySelector('.reg-input')
const addNumber = document.querySelector('.add-number')
// end of selecting dom elements
// getting localstorage and setting if empty
let numbers = JSON.parse(localStorage.getItem('regNumbers')) ? JSON.parse(localStorage.getItem('regNumbers')) : localStorage.setItem("regNumbers", JSON.stringify([]))
let oldRegNum = numbers ? numbers : []
// printing local storage data to document
registrationNumbers.storedRegis(numberPlate, oldRegNum)
// init app
const addRegNo = (e) => {
    e.preventDefault()
    // init data
    let number = regInput.value
    // passing input
    registrationNumbers.setRegNumber(number)
    // validate if registration format is correct
    const regPlateInputFormat = registrationNumbers.validateRegistrationNr(number)
    // if registatrion is a correct Western Cape string
    const checkRegistration = registrationNumbers.checkReg(registrationNumbers.regisAbreviations())
    // checking registration number using REGEX and JS methods

    regPlateInputFormat & typeof number == 'string' & checkRegistration ? (
        // Checking if number already exists
        !registrationNumbers.checkIfRegExist(oldRegNum, number) ? (
            // setting entered number
            registrationNumbers.setRegNumber(number),
            // start of success error handlers
            errorHandlerWrapper.classList.remove("hide"),
            errorHandler.classList.add('success'),
            errorHandler.innerHTML = 'Number added successfully',
            // end of dom succes handlers
            // storing data to local storage
            oldRegNum = JSON.parse(localStorage.getItem('regNumbers')),
            oldRegNum.push(registrationNumbers.getRegNumber()),
            localStorage.setItem("regNumbers", JSON.stringify(oldRegNum)),
            registrationNumbers.storedRegis(numberPlate, oldRegNum),
            regInput.value = ''
        ) :
            // start of error dom handlers
            (
                errorHandlerWrapper.classList.remove("hide"),
                errorHandler.classList.add('fail'),
                errorHandler.innerHTML = 'Number exist in storage',
                regInput.value = ''
            )
        // end of success dom handlers
    ) :
        // Checking if input is emty and returning an error
        number == "" ? (
            // start of error dom handlers
            // toggling node elements
            errorHandlerWrapper.classList.remove("hide"),
            errorHandler.classList.add('fail'),
            errorHandler.innerHTML = 'Enter registration please',
            registrationNumbers.storedRegis(numberPlate, oldRegNum)
        ) :
            // Checking if number is entered in the correct format
            !regPlateInputFormat ? (
                // start of error dom handlers
                // toggling node elements
                errorHandlerWrapper.classList.remove("hide"),
                errorHandler.classList.add('fail'),
                errorHandler.innerHTML = 'Enter correct registration, e.g: ca 123-456 or CT 123')
                : !number.includes(registrationNumbers.regisAbreviations()) && (errorHandlerWrapper.classList.remove("hide"),
                    errorHandler.classList.add('fail'),
                    errorHandler.innerHTML = 'Enter correct town registration format, e.g: ca 123-456 or CF 123')
    // end of error dom handlers
    // Time out for poppup messages
    setTimeout(() => {
        // clear handler from dom
        errorHandler.classList.remove('fail'),
            errorHandler.classList.remove('success'),
            errorHandlerWrapper.classList.add("hide")
    }, 3000)
}

// listening for a click even on the dom
addNumber.addEventListener('click', addRegNo)
// init function
const selectTown = () => {
    const selectedTown = towns.options[towns.selectedIndex].value
    townName.innerHTML = selectedTown
    // Check if Registration corresponds with town
    // get/filter town plates by  selected town ` name
    selectedTown == "Cape Town" && (registrationNumbers.setTownReg("CA", oldRegNum), registrationNumbers.filterTowns(filteredNumberPlate, registrationNumbers.getTownReg()))
    selectedTown == "Stellenbosch" && (registrationNumbers.setTownReg("CL", oldRegNum), registrationNumbers.filterTowns(filteredNumberPlate, registrationNumbers.getTownReg()))
    selectedTown == "Bellville" && (registrationNumbers.setTownReg("CY", oldRegNum), registrationNumbers.filterTowns(filteredNumberPlate, registrationNumbers.getTownReg()))
    selectedTown == "Kuils River" && (registrationNumbers.setTownReg("CF", oldRegNum), registrationNumbers.filterTowns(filteredNumberPlate, registrationNumbers.getTownReg()))
    selectedTown == "Wellington" && (registrationNumbers.setTownReg("CN", oldRegNum), registrationNumbers.filterTowns(filteredNumberPlate, registrationNumbers.getTownReg()))
    selectedTown == "Malmesbury" && (registrationNumbers.setTownReg("CK", oldRegNum), registrationNumbers.filterTowns(filteredNumberPlate, registrationNumbers.getTownReg()))
    selectedTown == "Worcester" && (registrationNumbers.setTownReg("CW", oldRegNum), registrationNumbers.filterTowns(filteredNumberPlate, registrationNumbers.getTownReg()))
    selectedTown == "Ceres" && (registrationNumbers.setTownReg("CT", oldRegNum), registrationNumbers.filterTowns(filteredNumberPlate, registrationNumbers.getTownReg()))
    selectedTown == "George" && (registrationNumbers.setTownReg("CAW", oldRegNum), registrationNumbers.filterTowns(filteredNumberPlate, registrationNumbers.getTownReg()))
}
// listening for a change event on the dom
towns.addEventListener('change', selectTown)