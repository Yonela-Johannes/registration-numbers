import { data } from "./handlebarscontent.js";
const secondRegistration = document.querySelector('.second-registration')


const screenTemplate = document.querySelector("#template").innerHTML

const registratrationTemplate = Handlebars.compile(screenTemplate)

let templateData = registratrationTemplate({ data: data })

secondRegistration.innerHTML = templateData

console.log(data)

console.log(templateData)