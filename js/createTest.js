// const category11 = document.querySelector("#category1")
// const theTest = document.querySelector("#the-test1")
// const logOut1=document.querySelector("#log-out1")

// category11.addEventListener("click", (e) => {
//     window.location("../pages/categoryManagement.html")
// })

// theTest.addEventListener("click", (e) => {
//     window.location("../pages/testManagement1.html")
// })

// logOut1.addEventListener("click", (e) => {
//     localStorage.removeItem("isLoggedIn")
//     window.location("../pages/login.html")
// })
//function category 
function renderCategory() {
    //lay gtri tren local
    const categories = JSON.parse(localStorage.getItem("arrCategories")||"[]");

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
//Ktra is editTest hay CreateTest
const testEdit=JSON.parse(localStorage.getItem('testEdit')||'null')
const test = testEdit || {
    id: -1,
    testName: "",
    categoryId: -1,
    playTime: 0,
    playAmount: 0,
    questions:[]
}
//If co the test need edit => update interface
if (testEdit) {
    //Change title to Create => Edit
    document.querySelector('h2').textContent = 'Edit the test';
    //Fill in test data in the form
    document.getElementById('testName').value = test.testName
    document.getElementById('category-test').value = test.categoryId
    document.getElementById('time').value = test.playTime
    //Update list test
    questionList = test.questions || [];
    renderTestListQuestion()
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
            <div id="input-group-answer" style="position: relative;">
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
// renderAnswers()

document.getElementById("addAnswer").addEventListener("click", function () { 
  question.answers.push({
    answer: '',
    isCorrected: false
  })
    renderAnswers()
})

const inputQuestionContent = document.getElementById('content-question')
inputQuestionContent.addEventListener('input',(e) => {
    question.content = e.target.value
})

let editIndex = -1;
function renderTestListQuestion() {
    let testListQuestionHtml = '';
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
//function editQues
const btnEditQuestion = document.querySelectorAll('.btn-edit-question');
    btnEditQuestion.forEach((btnEdit, i) => {
        btnEdit.addEventListener("click", (e) => {
            // Copy ques and ans
            //1. 
            question = {
                content: questionList[i].content,
                answers: []
            };
            for (let j = 0; j < questionList[i].answers.length; j++) {
                question.answers.push({
                    answer: questionList[i].answers[j].answer,
                    isCorrected: questionList[i].answers[j].isCorrected
                });
            }
            editIndex = i;
            document.getElementById('content-question').value = question.content;
            renderAnswers(); 
            const modalElement = document.getElementById('questionModal');
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        });
    });
}

document.getElementById('save-question').addEventListener('click', () => {
    //Validate data before save ques
    //1. Ques not empty
    if (!question.content.trim()) return
    //2. Ques length least to answer
    if (question.answers.length < 2) return
    //3. Ques least one answer true
    //c1
    let check = false;
    for (let ans of question.answers) {
        if (ans.isCorrected) {
            check = true
            break
        }
    }
    if (!check) return
    //c2
//     const found = question.answers.find(ans => ans.isCorrected);
//     if (!found) return;
    if (editIndex === -1) {
        questionList.push(question);
    } else {
        questionList[editIndex] = {
            content: question.content,
            answers: []
        };
        for (let j = 0; j < question.answers.length; j++) {
            questionList[editIndex].answers.push({
                answer: question.answers[j].answer,
                isCorrected: question.answers[j].isCorrected
            });
        }
        editIndex = -1; 
    }

    document.getElementById('content-question').value = '';
    question = {
        content: '',
        answers: [],
    };
    renderAnswers();
    renderTestListQuestion();
    const modalElement = document.getElementById('questionModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
});
document.getElementById('btn-save-test').addEventListener('click', () => {
    //Validate data before save
    //1. testName not empty
    if (!test.testName.trim()) return 
    //2. cate not empty
    if (test.categoryId === -1) return
    //3. time not <0
    if (test.playTime <= 0) return
    //4. quesList <=1(least 1 ques)
    const listTestLocal = JSON.parse(localStorage.getItem('list-test') || '[]')
    //Check đg edit hay create
    if (testEdit) {
        //c1
        //   const index = listTestLocal.findIndex(item => item.id === test.id);
        //c2
        let index = -1;
        for (let i = 0; i < listTestLocal.length; i++) {
            if (listTestLocal[i].id === test.id) {
                index = i
                break;
            }
        }
        if (index !== -1) {
            test.questions = questionList
            listTestLocal[index]=test
        }
    } else {
        if (listTestLocal.length === 0) {
            test.id = 1
        } else {
            test.id = listTestLocal[listTestLocal.length - 1].id + 1
        }
    test.questions = questionList
    listTestLocal.push(test) 
    }
    //??????????? 
    localStorage.setItem('list-test', JSON.stringify(listTestLocal))
    //Reset data and del 'key' after save
    localStorage.removeItem('testEdit');
    test = {
        id: -1,
        testName: "",
        categoryId: -1,
        playTime: 0,
        playAmount: 5,
        questions: []
    };
    questionList = [];
    document.getElementById('testName').value = '';
    document.getElementById('category-test').value = '';
    document.getElementById('time').value = '';
    document.querySelector('h2').textContent="Create the test"
    renderTestListQuestion()
}) 