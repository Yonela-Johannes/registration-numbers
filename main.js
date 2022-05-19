const RegistrationNumbers = () => {
    let number = ''
    let selectedTownReg = []
    let newList = []
    let existNo = false
    const regex = /[a-zA-Z]{1,2}\s[0-9]{2,5}(\s|\-)?([0-9]{2,3})?[a-zA-Z]?/
    const regisAbreviations = () => {
        const indexes = ['ca', 'caa', 'wp', 'cy', 'cf', 'cn', 'cl', 'ck', 'cw', 'ct', 'caw', 'cf', 'cj']
        return indexes.map(el => el.toUpperCase())
    }
    const setNumber = (reg) => {
        number = reg.toUpperCase().trim()
    }

    const getRegNumber = () => number

    const validNo = () => regex.test(getRegNumber())

    const setRegNumbers = (list) => list.find(regNo => regNo == getRegNumber()) ? (newList = list, existNo = true) : (newList = list.push(getRegNumber()), existNo = false)
    const getNumbers = () => newList
    const checkRegExist = () => existNo

    const checkPrefixAndAffix = () => regisAbreviations().includes(getRegNumber())
    
    const checkReg = () => {
        let introArray = false
        for (let i = 0; i < regisAbreviations().length; i++) {
            if (getRegNumber().startsWith(regisAbreviations()[i])) introArray = true
        }
        return introArray
    }

    const setTownReg = (string, array) => {
        selectedTownReg = array.filter(arr => arr.startsWith(string))
    }

    const setByTown = (string, array) => {
        selectedTownReg = string !== "refresh" ? array.filter(arr => arr.startsWith(string.toUpperCase())) : array
    }

    const getTownReg = () => selectedTownReg

    return {
        setNumber,
        regisAbreviations,
        getRegNumber,
        validNo,
        setRegNumbers,
        getNumbers,
        checkPrefixAndAffix,
        checkReg,
        checkRegExist,
        setTownReg,
        getTownReg,
        setByTown,
    }
}

export default RegistrationNumbers