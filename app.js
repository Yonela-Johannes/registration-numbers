import RegistrationNumbers from './main.js'
const registrationNumbers = RegistrationNumbers()
const towns = document.querySelector('select')
const townName = document.querySelector('.town-name')
const numberPlate = document.querySelector('.number-plate-inner-box')
const filteredNumberPlate = document.querySelector('.filter-plate-inner-box')
const errorHandler = document.querySelector('.error-handling')
const errorHandlerWrapper = document.querySelector('.error-handling-wrapper')
const regInput = document.querySelector('.reg-input')
const addNumber = document.querySelector('.add-number')
let oldRegNum;

const platesAbrev = ['ca', 'caa', 'wp', 'cy', 'cf', 'cn', 'ck', 'cw', 'ct', 'caw']

JSON.parse(localStorage.getItem('regNumbers')) === null && JSON.parse(localStorage.setItem('regNumbers', '[]'))

let registrationList = JSON.parse(localStorage.getItem('regNumbers'))

registrationNumbers.storedRegis(numberPlate, registrationList)

const addRegNo = e => {
    e.preventDefault()
    let number = regInput.value
    const regCheck = registrationNumbers.numberCodes(platesAbrev).includes(number)

    const regPlateInputFormat = registrationNumbers.validateRegistrationNr(number)

    console.log(regCheck)
    regPlateInputFormat & typeof number == 'string' & regCheck ? (
        registrationNumbers.setRegNumber(number),
        oldRegNum = JSON.parse(localStorage.getItem('regNumbers')),
        oldRegNum.push(registrationNumbers.getRegNumber()),
        localStorage.setItem("regNumbers", JSON.stringify(oldRegNum)),
        regInput.value = ''

    )
        : !regPlateInputFormat && (
            errorHandlerWrapper.classList.remove("hide"),
            errorHandler.innerHTML = 'enter correct fomat e.g: ca 12345')
    number == "" ? (
        errorHandlerWrapper.classList.remove("hide"),
        errorHandler.innerHTML = 'enter registration number please'
    ) : !number.startsWith(platesAbrev) ? (errorHandlerWrapper.classList.remove("hide"),
        errorHandler.innerHTML = 'add correct province registration format') : ''

    setTimeout(() => {
        errorHandlerWrapper.classList.add("hide")
    }, 3000)
}
addNumber.addEventListener('click', addRegNo)

const selectTown = () => {
    const selectedTown = towns.options[towns.selectedIndex].value
    townName.innerHTML = selectedTown

    selectedTown == "Cape Town" && (registrationNumbers.setTownReg("CA", registrationList), registrationNumbers.filterTowns(filteredNumberPlate, registrationNumbers.getTownReg()))
    selectedTown == "Stellenbosch" && (registrationNumbers.setTownReg("CL", registrationList), registrationNumbers.filterTowns(filteredNumberPlate, registrationNumbers.getTownReg()))
    selectedTown == "Bellville" && (registrationNumbers.setTownReg("CY", registrationList), registrationNumbers.filterTowns(filteredNumberPlate, registrationNumbers.getTownReg()))
    selectedTown == "Kuils River" && (registrationNumbers.setTownReg("CF", registrationList), registrationNumbers.filterTowns(filteredNumberPlate, registrationNumbers.getTownReg()))
    selectedTown == "Wellington" && (registrationNumbers.setTownReg("CN", registrationList), registrationNumbers.filterTowns(filteredNumberPlate, registrationNumbers.getTownReg()))
    selectedTown == "Malmesbury" && (registrationNumbers.setTownReg("CK", registrationList), registrationNumbers.filterTowns(filteredNumberPlate, registrationNumbers.getTownReg()))
    selectedTown == "Worcester" && (registrationNumbers.setTownReg("CW", registrationList), registrationNumbers.filterTowns(filteredNumberPlate, registrationNumbers.getTownReg()))
    selectedTown == "Ceres" && (registrationNumbers.setTownReg("CT", registrationList), registrationNumbers.filterTowns(filteredNumberPlate, registrationNumbers.getTownReg()))
    selectedTown == "George" && (registrationNumbers.setTownReg("CAW", registrationList), registrationNumbers.filterTowns(filteredNumberPlate, registrationNumbers.getTownReg()))
}

towns.addEventListener('change', selectTown)