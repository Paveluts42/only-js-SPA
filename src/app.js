import "./styles.css"
import {isValid, modalWindow} from "./utils";
import {Question} from "./question";
import {authWithEmailAndPassword, getAuthForm} from "./auth";

const $form = document.getElementById("form")
const $input = $form.querySelector("#question-input")
const $button = $form.querySelector("#submit")
const $modalButton = document.getElementById("modalBtn")

$modalButton.addEventListener('click', onModal)

window.addEventListener("load", Question.renderList)


$form.addEventListener("submit", submitFormHandler)

$input.addEventListener("input", () => {

    $button.disabled = !isValid($input.value)
})

async function submitFormHandler(event) {
    event.preventDefault()
    if (isValid($input.value)) {
        const question = {
            text: $input.value.trim(),
            date: new Date().toJSON()
        }

        $button.disabled = true

        Question.create(question).then(() => {
            console.log(question)
            $input.value = ""
            $input.className = ""
            $button.disabled = true
        })

    }

}

function onModal() {
    modalWindow("authenticated", getAuthForm())
    document.getElementById("authForm")
        .addEventListener("submit", authFormHandler, {once: true})
}

function authFormHandler(event) {
    event.preventDefault()
    const $email = event.target.querySelector("#email")
    const $password = event.target.querySelector("#password")
const $authButton=event.target.querySelector("#authButton")
    $authButton.disable=true
    authWithEmailAndPassword($email.value,$password.value)
        .then(Question.fetch)
        .then(renderModalAfterAuth)
        .then(()=>$authButton.disable=false)

    $email.value=""
    $password.value=""

}
function renderModalAfterAuth(content) {
    if(typeof content==="string"){
        modalWindow("error",content)
    }else {
        modalWindow("List questions",Question.listToHTML(content))
    }
    console.log(content)
}
