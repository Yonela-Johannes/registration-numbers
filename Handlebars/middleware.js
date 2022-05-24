import { data } from "./handlebarscontent.js";
import { registrationTemplate } from "./template.js";

const secondRegistration = document.querySelector('.second-registration')
const screenTemplate = document.querySelector("#template").innerHTML = registrationTemplate
const registratrationTemplate = Handlebars.compile(screenTemplate)
let templateData = registratrationTemplate({ data: data })
secondRegistration.innerHTML = templateData
