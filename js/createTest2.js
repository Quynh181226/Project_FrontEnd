//function category 
function renderCategory() {
    //lay gtri tren local
    const categories = JSON.parse(localStorage.getItem("arrCategories"));

    let stringHTML = '<option value="" disabled selected>Select category</option>'

    for (let i = 0; i < categories.length; i++) {
        stringHTML +=
            `
                <option value=${categories[i].id}>
                    ${categories[i].emoji} ${categories[i].name}
                </option>
            `
    }
    document.getElementById('category-test').innerHTML = stringHTML
}
renderCategory();
//
const test = {
    id: -1,
    testName: "",
    categoryId: -1,
    playTime: 0,
    playAmount: 5,
    questions:[]
}
const inputTestName =document.getElementById('testName');
inputTestName.addEventListener('input', function (e) {
    test.testName = e.target.value;
});

const categoryTest=document.getElementById('category-test');
categoryTest.addEventListener('change', function (e) {
    test.categoryId = +e.target.value;
});

const timeInput=document.getElementById('time');
timeInput.addEventListener('change', function (e) {
    test.playTime = +e.target.value;
});


let questionList = []
let question = {
    content: '',
    answers: [],
}

function renderAnswers() {  
    document.getElementById('answerList').innerHTML = ''
    let answerHtml = ''
    for (let i = 0; i < question.answers.length; i++) {
        answerHtml +=
            `
            <div style="position: relative;">
                <div class="input-group">
                    <div class="input-group-text">
                        <input class="form-check-input mt-0 checkbox-answer" type="checkbox" ${question.answers[i].isCorrected ? 'checked' : ''}
                            aria-label="Checkbox for following text input" id="answer-${i}">
                    </div>

                    <input type="text" class="form-control input-answer" placeholder="Input answer" value='${question.answers[i].answer}'>
                </div>
                <button class="btnDelete btn-del-answer"><img src="../assets/garbage.png"></button>
            </div>
            `
    }
    document.getElementById('answerList').innerHTML = answerHtml

    const inputAnsers = document.querySelectorAll('.input-answer')
    inputAnsers.forEach((el, i) => {
        el.addEventListener('input', (e) => {
            question.answers[i].answer = e.target.value
        })
    })
    
    const checkboxAnswer = document.querySelectorAll('.checkbox-answer')
    checkboxAnswer.forEach((el, i) => {
        el.addEventListener('change', (e) => {
            question.answers[i].isCorrected = e.target.checked
        })
    })
    
    const btnDelAnswer = document.querySelectorAll('.btn-del-answer')
    btnDelAnswer.forEach((el, i) => {
        el.addEventListener('click', (e) => {
            question.answers.splice(i, 1)
            renderAnswers()
        })
    })
}
renderAnswers()

document.getElementById("addAnswer").addEventListener("click", function () { 
    question.answers.push({ answer: '', isCorrected: false })
    renderAnswers()
})

const inputQuestionContent = document.getElementById('content-question')
inputQuestionContent.addEventListener('input',(e) => {
    question.content = e.target.value
})

document.getElementById('save-question').addEventListener('click', () => {
    questionList.push(question)

    inputQuestionContent.value = ''
    question = {
        content: '',
        answers: [],
    }
    renderAnswers()
    renderTestListQuestion()
})

function renderTestListQuestion() {
    let testListQuestionHtml = ''
    for (let i = 0; i < questionList.length; i++){
        testListQuestionHtml += 
            `
                <tr>
                    <td>${i+1}</td>
                    <td>${questionList[i].content}</td>
                    <td>
                        <button class="btn-edit-question">Edit</button>
                        <button class="btn-del-question">Xoa</button>
                    </td>
                </tr>
            `
    }
    document.getElementById('test-list-question').innerHTML = testListQuestionHtml
    
    const btnDelQuestion = document.querySelectorAll('.btn-del-question')
    btnDelQuestion.forEach((btnDel, i) => {
        btnDel.addEventListener('click', (e) => {
            questionList.splice(i, 1)
            renderTestListQuestion()
        })
    })
}

document.getElementById('btn-save-test').addEventListener('click', () => {
    const listTestLocal = JSON.parse(localStorage.getItem('list-test') || '[]')
    
    if (listTestLocal.length === 0) {
        test.id = 1
    } else {
        test.id = listTestLocal[listTestLocal.length - 1].id + 1
    }

    test.questions = questionList

    listTestLocal.push(test)
    localStorage.setItem('list-test', JSON.stringify(listTestLocal))
})
