export class Question {
    static create(question) {
        return fetch("https://only-js-app.firebaseio.com/question.json", {
            method: "POST",
            body: JSON.stringify(question),
            headers: {"Content-type": "application/json"}
        }).then(response => {
            question.id = response.name
            return question
        }).then(addToLocalStorage)
            .then(Question.renderList)
    }

    static renderList() {
        const question = getQuestionFromLocalStorage()
        const html = question.length ? question.map(toCard).join("")
            : `<div class="mui&#45;&#45;text-headline">You not have any question...</div>`
        const list = document.getElementById("list")
        list.innerHTML = html
    }

    static listToHTML(question) {
        return question.length ?
            `<ol>${question.map(q => `<li>${q.text}</li>`).join('')}</ol>`
            :
            "<p> You not have question</p>"
    }

    static fetch(token) {
        if (!token) {
            return Promise.resolve("<p class='error'>You not have token</p>")
        }
        return fetch(`https://only-js-app.firebaseio.com/question.json?auth=${token}`)
            .then(response => response.json())
            .then(response => {
                if (response && response.error) {
                    return `<p class='error'>${response.error}</p>`
                }
                return response ?
                    Object.keys(response).map(key => ({
                        ...response[key], id: key
                    }))
                    :
                    []
            })
    }
}

function addToLocalStorage(question) {
    const all = getQuestionFromLocalStorage()
    all.push(question)
    localStorage.setItem("question", JSON.stringify(all))
}

function getQuestionFromLocalStorage() {
    return JSON.parse(localStorage.getItem("question") || "[]")
}

function toCard(question) {
    return `<div class="mui&#45;&#45;text-black-54">
${new Date(question.date).toLocaleDateString()}
${new Date(question.date).toLocaleTimeString()}
</div>
                      <div> ${question.text}</div>
<br>
`
}
