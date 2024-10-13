import translate from "https://cdn.jsdelivr.net/npm/translate/index.min.js";
import { detectLanguage } from 'https://cdn.jsdelivr.net/npm/deepl-translator@1.2.1/+esm'

detectLanguage('Selam!')
    .then(response => {
        console.log(response);
    })

const fromLangElement = document.getElementById('fromLangSelect')
const toLangElement = document.getElementById('toLangSelect')
const inputElement = document.getElementById('inputText')
const outputElement = document.getElementById('outputText')
const returnButton = document.getElementById('return')
const copyButton = document.getElementById('copyOutputButton')
const readWithSoundButton = document.getElementById('readWithSoundButton')

function controlFromLang(){
    document.querySelectorAll('#toLangSelect option').forEach(option => {
        option.disabled = false
    })

     document.querySelectorAll('#toLangSelect option').forEach(option => {
        if(fromLangElement.value == option.value){
            option.disabled = true
        }
    })
}

function controlToLang(){
    document.querySelectorAll('#fromLangSelect option').forEach(option => {
        option.disabled = false
    })

     document.querySelectorAll('#fromLangSelect option').forEach(option => {
        if(toLangElement.value == option.value){
            option.disabled = true
        }
    })
}

controlFromLang()
controlToLang()

fromLangElement.onchange = async e => {
    controlFromLang()
    try{
        const response = await translate(inputElement.value,{from:fromLangElement.value,to:toLangElement.value})
        outputElement.value = response
    }
    catch(err){
        outputElement.placeholder = "Metin çevirilemedi, lütfen internet bağlantınızı kontrol edip tekrar deneyiniz."
    }
}

toLangElement.onchange = async () => {
    controlToLang()
    try{
        const response = await translate(inputElement.value,{from:fromLangElement.value,to:toLangElement.value})
        outputElement.value = response
    }
    catch(err){
        outputElement.placeholder = "Metin çevirilemedi, lütfen internet bağlantınızı kontrol edip tekrar deneyiniz."
    }
}

inputElement.oninput = async () => {
    if(inputElement.value.trim() == ""){
        outputElement.value = ""
        return;
    }

    try{
        const response = await translate(inputElement.value,{from:fromLangElement.value,to:toLangElement.value})
        outputElement.value = response
    }
    catch(err){
        outputElement.placeholder = "Metin çevirilemedi, lütfen internet bağlantınızı kontrol edip tekrar deneyiniz."
    }
}

returnButton.onclick = async () => {
    document.querySelectorAll('option').forEach(option => {
        option.disabled = false
    })

    const beforeFromLangValue = fromLangElement.value
    const beforeToLangValue = toLangElement.value

    fromLangElement.value = beforeToLangValue
    toLangElement.value = beforeFromLangValue

    inputElement.value = outputElement.value

    if(inputElement.value.trim() !== ""){
        try{
            const response = await translate(inputElement.value,{from:fromLangElement.value,to:toLangElement.value})
            outputElement.value = response
        }
        catch(err){
            outputElement.placeholder = "Metin çevirilemedi, lütfen internet bağlantınızı kontrol edip tekrar deneyiniz."
        }
    }

    controlFromLang()
    controlToLang()
}

copyButton.onclick = () => {
    navigator.clipboard.writeText(outputElement.value).then(() => {
        alert('Kopyalandı!')
    })
    .catch(() => {
        alert('Kopyalanamadı!')
    })
}

readWithSoundButton.onclick = () => {
    const speech = new SpeechSynthesisUtterance(outputElement.value);

    window.speechSynthesis.speak(speech)
}