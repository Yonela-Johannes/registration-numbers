// getting function
import RegistrationNumbers from './main.js'
const registrationNumbers = RegistrationNumbers()
// getting and init document object elements
const towns = document.querySelector('select')
const townName = document.querySelector('.display-name')
const filteredNumberPlate = document.querySelector('.filter-plate-inner-box')
const errorHandler = document.querySelector('.error-handling')
const errorHandlerWrapper = document.querySelector('.error-handling-wrapper')
const regInput = document.querySelector('.reg-input')
const addNumber = document.querySelector('.add-number')
// end of selecting dom elements
// getting localstorage and setting if empty
let numbers = JSON.parse(localStorage.getItem('regNumbers')) ? JSON.parse(localStorage.getItem('regNumbers')) : localStorage.setItem("regNumbers", JSON.stringify([]))
let oldRegNum = numbers ? numbers : []
townName.innerHTML = "No Town Selected"
// printing local storage data to document
registrationNumbers.storedRegis(filteredNumberPlate, oldRegNum)
// init app
const addRegNo = (e) => {
    // cancel event
    e.preventDefault()
    // reseting dropdown
    towns.selectedIndex = 0
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
            registrationNumbers.storedRegis(filteredNumberPlate, oldRegNum),
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
            registrationNumbers.storedRegis(filteredNumberPlate, oldRegNum)
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
    // displaying towns on dom
    const town = towns.options[towns.selectedIndex].value
    const displayName = towns.options[towns.selectedIndex].textContent
    townName.innerHTML = displayName
    // filter towns
    registrationNumbers.setByTown(town, oldRegNum)
    !!registrationNumbers.getTownReg() ?
        filteredNumberPlate.innerHTML = `There is no registration numbers for ${displayName}` :
        registrationNumbers.storedRegis(filteredNumberPlate, registrationNumbers.getTownReg())
    // set time out for error handlers
    setTimeout(() => {
        filteredNumberPlate.innerHTML = ""
    }, 3700)
}
// listening for a change event on the dom
towns.addEventListener('change', selectTown)