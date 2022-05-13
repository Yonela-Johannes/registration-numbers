const RegistrationNumbers = () => {
    let number = ''
    let selectedTownReg = []

    // Western province registration abbreviations
    const regisAbreviations = () => {
        const indexes = ['ca', 'caa', 'wp', 'cy', 'cf', 'cn', 'cl', 'ck', 'cw', 'ct', 'caw', 'cf', 'cj']
        return indexes.map(el => el.toUpperCase())
    }
    // loop add, and store 
    const storedRegis = (numberPlate, array) => {
        numberPlate.innerHTML = ""
        array.forEach(element =>
            numberPlate.innerHTML += `
                <div class='list'>${element}</div>
            `
        )
    }
    // Set/Get/Validate number
    const setRegNumber = regNo => number = regNo.toUpperCase().trim()
    const getRegNumber = () => number
    // Test Input string using Regex
    const validateRegistrationNr = number => {
        const regex = /[a-zA-Z]{1,2}\s[0-9]{2,5}(\s|\-)?([0-9]{2,3})?[a-zA-Z]?/
        return regex.test(number)
    }
    // Check if new number exist of not
    const checkIfRegExist = (list, number) => {
        let result = list.find(regno => regno == number.toUpperCase()) ? true : false
        return result
    }
    // check if input starts with correct letters
    const checkReg = array => {
        let introArray = false
        for (let i = 0; i < array.length; i++) {
            if (getRegNumber().startsWith(array[i])) introArray = true
        }
        return introArray
    }
    // Get registration by town names
    const setTownReg = (string, array) => {
        selectedTownReg = array.filter(arr => arr.startsWith(string))
    }
    const getTownReg = () => selectedTownReg
    // looping data
    const filterTowns = (reg, array) => {
        reg.innerHTML = []
        array.forEach(elem =>
            reg.innerHTML += `<div class="filterList">${elem}</div>`
        )
    }
    return {
        regisAbreviations,
        setRegNumber,
        getRegNumber,
        checkReg,
        checkIfRegExist,
        storedRegis,
        setTownReg,
        getTownReg,
        filterTowns,
        validateRegistrationNr,
    }
}

export default RegistrationNumbers