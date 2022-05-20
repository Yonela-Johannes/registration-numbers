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
const counter = document.querySelector(".counter")
// get/set local storage
JSON.parse(localStorage.getItem('regNumbers')) == null && localStorage.setItem("regNumbers", JSON.stringify([]))
let numbers = JSON.parse(localStorage.getItem('regNumbers')).reverse()
// townName.innerHTML = "No Town Selected"`
// loop add, and store 
regNumbers.storedLocList(numbers)
counter.innerHTML = numbers.length
const storedRegis = (numberPlate, array) => {
    numberPlate.innerHTML = ""
    array.forEach(element =>
        numberPlate.innerHTML += `
                <div class='list'>${element}</div>
            `
    )
}
// display all registration numbers
storedRegis(filteredNumberPlate, numbers)
const resetErrorHandlers = (errorHandler, errorHandlerWrapper) => {
    // Time out for poppup messages
    setTimeout(() => {
        // clear handler from dom
        errorHandler.classList.remove('fail'),
            errorHandler.classList.remove('success'),
            errorHandlerWrapper.classList.add("hide")
    }, 2600)
}

// init app
const addRegNo = (e) => {
    towns.selectedIndex = 0
    townName.innerHTML = "No Town Selected"
    let number = regInput.value
    regNumbers.setNumber(number)
    // check if number is entered
    // valid if number entered is correct
    // check if it does exist in local storage
    if (!regNumbers.limit()) {
        if (regNumbers.getRegNumber() && regNumbers.validNo() && regNumbers.checkReg()) {
            // if it does exist add number to storage
            if (numbers.includes(regNumbers.getRegNumber()) == false) {
                regNumbers.setNumber(number)
                errorHandlerWrapper.classList.remove("hide")
                errorHandler.classList.add('success')
                regNumbers.setRegNumbers(numbers)
                regNumbers.getNumbers()
                localStorage.setItem("regNumbers", JSON.stringify(numbers))
                storedRegis(filteredNumberPlate, numbers)
                errorHandler.innerHTML = 'Number added successfully'
                regInput.value = ''
                counter.innerHTML = numbers.length
            } else {
                // If number in storage response
                errorHandlerWrapper.classList.remove("hide")
                errorHandler.classList.add('fail')
                errorHandler.innerHTML = 'Number exist in storage'
                regInput.value = ''
            }
        }

        if (!regNumbers.getRegNumber()) {
            towns.selectedIndex = 0
            errorHandlerWrapper.classList.remove("hide")
            errorHandler.classList.add('fail')
            errorHandler.innerHTML = 'Enter registration number'
            regInput.value = ''
        }
        // if prefix or affix is not of the Western Province
        else if (regNumbers.checkPrefixAndAffix()) {
            errorHandlerWrapper.classList.remove("hide")
            errorHandler.classList.add('fail')
            errorHandler.innerHTML = 'Registration should start with valid Western Province registration prefix'
            regInput.value = ''
        }
        // correct registration format
        else if (!regNumbers.validNo()) {
            errorHandlerWrapper.classList.remove("hide")
            errorHandler.classList.add('fail')
            errorHandler.innerHTML = 'Enter correct registration, e.g: CA 123-456 or CT 123'
        }
    } else {
        errorHandlerWrapper.classList.remove("hide")
        errorHandler.classList.add('fail')
        errorHandler.innerHTML = 'Only take up to a limit of 20 registrations'
        regInput.value = ''
    }
    // setTimeout for popup messages
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
    counter.innerHTML = regNumbers.getTownReg().length
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
// clear local storage
const clearRegNumbers = () => {
    !!regNumbers.getNumbers() && (errorHandlerWrapper.classList.remove("hide")),
        errorHandler.classList.add('fail'),
        regNumbers.getNumbers().length == 0 ? errorHandler.innerHTML = 'Registration numbers are already cleared' : localStorage.clear('regNumbers')
    setTimeout(() => {
        errorHandler.innerHTML = '',
            errorHandlerWrapper.classList.add("hide")
        location.reload()
    }, 2000)
}

resetRegNumbers.addEventListener('click', clearRegNumbers)