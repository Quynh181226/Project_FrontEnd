const category11 = document.querySelector("#category1")
const theTest = document.querySelector("#the-test1")
const logOut1 = document.querySelector("#log-out1")

category11.addEventListener("click", (e) => {
    window.location = "../pages/categoryManagement.html"
})

theTest.addEventListener("click", (e) => {
    window.location = "../pages/testManagement1.html"
})

logOut1.addEventListener("click", (e) => {
    localStorage.removeItem("isLoggedIn")
    window.location = "../pages/login.html"
})
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
    const questionErrorEmp = document.getElementById("question-error-emp")
    const questionErrorLength = document.getElementById("question-error-length")
    const answerErrorMin = document.getElementById("answer-error-min")
    const answerErrorEmp = document.getElementById("answer-error-emp")
    const answerErrorLength = document.getElementById("answer-error-length")
    const answerErrorCorrect = document.getElementById("answer-error-correct")
    let check = true

    // 1. Question not empty
    if (!question.content.trim()) {
        questionErrorEmp.style.display = "block"
        check = false
    } else {
        questionErrorEmp.style.display = "none"
    }

    // 2. Ques length (1-50) characters
    if (question.content.length < 1 || question.content.length > 50) {
        questionErrorLength.style.display = "block"
        check = false
    } else {
        questionErrorLength.style.display = "none"
    }

    // 3. At least 2 answers
    if (question.answers.length < 2) {
        answerErrorMin.style.display = "block"
        check = false
    } else {
        answerErrorMin.style.display = "none"
    }

    // 4. Answers not empty
    let hasEmptyAnswer = false
    for (let i = 0; i < question.answers.length; i++) {
        if (!question.answers[i].answer.trim()) {
            hasEmptyAnswer = true
            break
        }
    }
    if (hasEmptyAnswer) {
        answerErrorEmp.style.display = "block"
        check = false
    } else {
        answerErrorEmp.style.display = "none"
    }

    // 5. Answer length (1-50) characters
    let hasInvalidLengthAnswer = false
    for (let i = 0; i < question.answers.length; i++) {
        if (question.answers[i].answer.length < 1 || question.answers[i].answer.length > 50) {
            hasInvalidLengthAnswer = true
            break
        }
    }
    if (hasInvalidLengthAnswer) {
        answerErrorLength.style.display = "block"
        check = false
    } else {
        answerErrorLength.style.display = "none"
    }

    // 6. At least one correct answer
    let hasCorrectAnswer = false
    for (let i = 0; i < question.answers.length; i++) {
        if (question.answers[i].isCorrected) {
            hasCorrectAnswer = true
            break
        }
    }
    if (!hasCorrectAnswer) {
        answerErrorCorrect.style.display = "block"
        check = false
    } else {
        answerErrorCorrect.style.display = "none"
    }

    if (!check) return

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
///////////////////////////////////
document.getElementById('btn-save-test').addEventListener('click', () => {
    // //Validate data before save
    // //1. testName not empty
    // if (!test.testName.trim()) return 
    // //2. cate not empty
    // if (test.categoryId === -1) return
    // //3. time not <0
    // if (test.playTime <= 0) return
    // //4. quesList <=1(least 1 ques)

    const nameErrorEmpty = document.getElementById("name-error-empty")
    const nameErrorLength = document.getElementById("name-error-length")
    const nameErrorDupli = document.getElementById("name-error-dupli")
    const cateError = document.getElementById("cate-error")
    const timeError = document.getElementById("time-error")
    let check = true

    // 1. Test name not empty
    if (!test.testName.trim()) {
        nameErrorEmpty.style.display = "block"
        check = false
    } else {
        nameErrorEmpty.style.display = "none"
    }

    // 2. Test name length (1-50) characters
    if (test.testName.length < 1 || test.testName.length > 50) {
        nameErrorLength.style.display = "block"
        check = false
    } else {
        nameErrorLength.style.display = "none"
    }

    // 3. Test name not duplicate (skip if editing the same test)
    let listTestLocal = JSON.parse(localStorage.getItem("list-test") || "[]")
    let isDuplicate = false
    if (!testEdit) { // Only check for duplicates when creating a new test
        for (let i = 0; i < listTestLocal.length; i++) {
            if (listTestLocal[i].testName.toLowerCase() === test.testName.toLowerCase()) {
                isDuplicate = true
                break
            }
        }
    }
    if (isDuplicate) {
        nameErrorDupli.style.display = "block"
        check = false
    } else {
        nameErrorDupli.style.display = "none"
    }

    // 4. Category not empty
    if (test.categoryId === -1) {
        cateError.style.display = "block"
        check = false
    } else {
        cateError.style.display = "none"
    }

    // 5. Time greater than 0
    if (test.playTime <= 0) {
        timeError.style.display = "block"
        check = false
    } else {
        timeError.style.display = "none"
    }

    // 6. At least one question
    if (questionList.length === 0) {
        check = false
    }

    if (!check) return

    // Save the test
    if (testEdit) {
        let index = -1;
        for (let i = 0; i < listTestLocal.length; i++) {
            if (listTestLocal[i].id === test.id) {
                index = i
                break;
            }
        }
        if (index !== -1) {
            test.questions = questionList
            listTestLocal[index] = test
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
    document.querySelector('h2').textContent = "Create the test"
    renderTestListQuestion()
}) 