const RegistrationNumbers = () => {
    let number = ''
    let selectedTownReg = []


    const storedRegis = (numberPlate, array) => {
        numberPlate.innerHTML = ""
        array.forEach(element =>
            numberPlate.innerHTML += `
                <div class='list'>${element}</div>
            `
        )
    }

    const setRegNumber = regNo => number = regNo.toUpperCase().trim()
    const getRegNumber = () => number
    const validateRegistrationNr = number => {
        const regex = /\b[a-zA-Z]{1,2}(\s|\-)?\d{2,3}((\-|\s)?\d{2,4})?\b/
        return regex.test(number)
    }

    const numberCodes = array => {
        let introArray = []
        for (let i = 0; i < array.length; i++) {
            introArray.push(array[i])
        }
        return introArray
    }

    const setTownReg = (string, array) => {
        selectedTownReg = array.filter(arr => arr.startsWith(string))
    }
    const getTownReg = () => selectedTownReg

    const filterTowns = (reg, array) => {
        reg.innerHTML = []
        array.forEach(elem =>
            reg.innerHTML += `<div class="filterList">${elem}</div>`
        )
    }
    return {
        setRegNumber,
        getRegNumber,
        storedRegis,
        numberCodes,
        setTownReg,
        getTownReg,
        filterTowns,
        validateRegistrationNr,
    }
}

export default RegistrationNumbers