// getting function
import RegistrationNumbers from './main.js'
const regNumbers = RegistrationNumbers()
// getting and init document object elements
const towns = document.querySelector('select')
const townName = document.querySelector('.display-name')
const filteredNumberPlate = document.querySelector('.filter-plate-inner-box')
const errorHandler = document.querySelector('.error-handling')
const errorHandlerWrapper = document.querySelector('.error-handling-wrapper')
const regInput = document.querySelector('.reg-input')
const addNumber = document.querySelector('.add-number')
const resetRegNumbers = document.querySelector('.reset-numbers')

JSON.parse(localStorage.getItem('regNumbers')) == null && localStorage.setItem("regNumbers", JSON.stringify([]))

let numbers = JSON.parse(localStorage.getItem('regNumbers'))

townName.innerHTML = "No Town Selected"
// loop add, and store 
const storedRegis = (numberPlate, array) => {
    numberPlate.innerHTML = ""
    array.forEach(element =>
        numberPlate.innerHTML += `
                <div class='list'>${element}</div>
            `
    )
}

const resetErrorHandlers = (errorHandler, errorHandlerWrapper) => {
    // Time out for poppup messages
    setTimeout(() => {
        // clear handler from dom
        errorHandler.classList.remove('fail'),
            errorHandler.classList.remove('success'),
            errorHandlerWrapper.classList.add("hide")
    }, 3000)
}

// init app
const addRegNo = (e) => {
    // cancel event
    // e.preventDefault()
    towns.selectedIndex = 0
    townName.innerHTML = "No Town Selected"
    let number = regInput.value
    regNumbers.setNumber(number)
    JSON.parse(localStorage.getItem("regNumbers")),

        !regNumbers.checkRegExist() && (
            regNumbers.getRegNumber() && regNumbers.validNo() && regNumbers.checkReg() && (
                regNumbers.setNumber(number),
                errorHandlerWrapper.classList.remove("hide"),
                errorHandler.classList.add('success'),
                errorHandler.innerHTML = 'Number added successfully',
                regNumbers.setRegNumbers(numbers),
                console.log(regNumbers.getNumbers()),
                localStorage.setItem("regNumbers", JSON.stringify(numbers)),
                storedRegis(filteredNumberPlate, numbers),
                regInput.value = ''
            ))

    regNumbers.checkRegExist() && (
        errorHandlerWrapper.classList.remove("hide"),
        errorHandler.classList.add('fail'),
        errorHandler.innerHTML = 'Number exist in storage',
        regInput.value = ''
    )


    regNumbers.getRegNumber() == "" && (
        towns.selectedIndex = 0,
        errorHandlerWrapper.classList.remove("hide"),
        errorHandler.classList.add('fail'),
        errorHandler.innerHTML = 'Enter registration please')

    !regNumbers.validNo() && (
        errorHandlerWrapper.classList.remove("hide"),
        errorHandler.classList.add('fail'),
        errorHandler.innerHTML = 'Enter correct registration, e.g: ca 123-456 or CT 123')

    !!regNumbers.checkPrefixAndAffix() && (errorHandlerWrapper.classList.remove("hide"),
        errorHandler.classList.add('fail'),
        errorHandler.innerHTML = 'Enter correct registration number format, e.g: ca 123-456 or CF 123')
    resetErrorHandlers(errorHandler, errorHandlerWrapper)
    // filteredNumberPlate.innerHTML = ""
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
    regNumbers.setByTown(town, numbers)
    regNumbers.getTownReg().length == 0 ? filteredNumberPlate.innerHTML = `There is no registration numbers for ${displayName}` :
        storedRegis(filteredNumberPlate, regNumbers.getTownReg())
    // set time out for error handlers
    regNumbers.getTownReg().length == 0 &&
        setTimeout(() => {
            towns.selectedIndex = 0
            townName.innerHTML = "not town selected"
            filteredNumberPlate.innerHTML = ""
        }, 3500)
}
// listening for a change event on the dom
towns.addEventListener('change', selectTown)
// listening for a change event on the dom

const clearRegNumbers = () => {
    !!numbers && (errorHandlerWrapper.classList.remove("hide"),
        errorHandler.classList.add('fail'),
        errorHandler.innerHTML = 'Registration numbers are already cleared')
    localStorage.clear('regNumbers')
    resetErrorHandlers(errorHandler, errorHandlerWrapper)
    location.reload()
}

resetRegNumbers.addEventListener('click', clearRegNumbers)
