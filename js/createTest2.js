// //function category 
// function renderCategory() {
//     //lay gtri tren local
//     const categories = JSON.parse(localStorage.getItem("arrCategories"));

//     let htmls = '<option value="" disabled selected>Select category</option>'

//     for (let i = 0; i < categories.length; i++) {
//         htmls +=
//             `
//                 <option value=${categories[i].id}>
//                     ${categories[i].emoji} ${categories[i].name}
//                 </option>
//             `
//     }
//     document.getElementById('category-test').innerHTML = htmls
// }
// renderCategory();
// //
// const test = {
//     id: -1,
//     testName: "",
//     categoryId: -1,
//     playTime: 0,
//     playAmount: 5,
//     questions:[]
// }
// const inputTestName =document.getElementById('testName');
// inputTestName.addEventListener('input', function (e) {
//     test.testName = e.target.value;
// });

// const categoryTest=document.getElementById('category-test');
// categoryTest.addEventListener('change', function (e) {
//     test.categoryId = +e.target.value;
// });

// const timeInput=document.getElementById('time');
// timeInput.addEventListener('change', function (e) {
//     test.playTime = +e.target.value;
// });


// let questionList = []
// let question = {
//     content: '',
//     answers: [],
// }

// function renderAnswers() {  
//     document.getElementById('answerList').innerHTML = ''
//     let answerHtml = ''
//     for (let i = 0; i < question.answers.length; i++) {
//         answerHtml +=
//             `
//             <div style="position: relative;">
//                 <div class="input-group">
//                     <div class="input-group-text">
//                         <input class="form-check-input mt-0 checkbox-answer" type="checkbox" ${question.answers[i].isCorrected ? 'checked' : ''}
//                             aria-label="Checkbox for following text input" id="answer-${i}">
//                     </div>

//                     <input type="text" class="form-control input-answer" placeholder="Input answer" value='${question.answers[i].answer}'>
//                 </div>
//                 <button class="btnDelete btn-del-answer"><img src="../assets/garbage.png"></button>
//             </div>
//             `
//     }
//     document.getElementById('answerList').innerHTML = answerHtml

//     const inputAnsers = document.querySelectorAll('.input-answer')
//     inputAnsers.forEach((el, i) => {
//         el.addEventListener('input', (e) => {
//             question.answers[i].answer = e.target.value
//         })
//     })
    
//     const checkboxAnswer = document.querySelectorAll('.checkbox-answer')
//     checkboxAnswer.forEach((el, i) => {
//         el.addEventListener('change', (e) => {
//             question.answers[i].isCorrected = e.target.checked
//         })
//     })
    
//     const btnDelAnswer = document.querySelectorAll('.btn-del-answer')
//     btnDelAnswer.forEach((el, i) => {
//         el.addEventListener('click', (e) => {
//             question.answers.splice(i, 1)
//             renderAnswers()
//         })
//     })
// }
// renderAnswers()

// document.getElementById("addAnswer").addEventListener("click", function () { 
//     question.answers.push({
//         answer: '',
//         isCorrected: false
//     })
//     renderAnswers()
// })

// const inputQuestionContent = document.getElementById('content-question')
// inputQuestionContent.addEventListener('input',(e) => {
//     question.content = e.target.value
// })

// // document.getElementById('save-question').addEventListener('click', () => {
// //     // questionList.push(question)
// //     questionList.push({
// //         content: question.content,
// //         answers: JSON.parse(JSON.stringify(question.answers))
// //     })
// //     inputQuestionContent.value = ''
// //     question = {
// //         content: '',
// //         answers: [],
// //     }
// //     renderAnswers()
// //     renderTestListQuestion()
// // })

// function renderTestListQuestion() {
//     let testListQuestionHtml = ''
//     for (let i = 0; i < questionList.length; i++){
//         testListQuestionHtml += 
//             `
//                 <tr>
//                     <td>${i+1}</td>
//                     <td>${questionList[i].content}</td>
//                     <td>
//                         <button class="btn-edit-question" onclick="editQuestion(${i})">Edit</button>
//                         <button class="btn-del-question">Delete</button>
//                     </td>
//                 </tr>
//             `
//         //   onclick="deleteQuestion(${i})
//     }
//     document.getElementById('test-list-question').innerHTML = testListQuestionHtml
    
//     const btnDelQuestion = document.querySelectorAll('.btn-del-question')
//     btnDelQuestion.forEach((btnDel, i) => {
//         btnDel.addEventListener('click', (e) => {
//             questionList.splice(i, 1)
//             renderTestListQuestion()
//         })
//     })
// }
// //function edit
// //Lay data question từ questionList dua tren index
// //edit data of modal(open model for edit)
// //Update
// //B1: Variable global for follow index of the ques ... edit
// let editIndex = -1
// function editQuestion(i) {
//     //Save index of ques đg edit
//     editIndex = i
//     //B2: Lay data ques tu questionList and gan ttiep vao ques
//     question.content = questionList[i].content;
//     question.answers = questionList[i].answers;
//     //B3: Dien ndung ques vao input
//     document.getElementById("content-question").value = question.content;
//     //B4: Display ... list answer
//     renderAnswers();
//     const modal = document.getElementById("questionModal");
//     modal.classList.add('show');
//     modal.style.display = "block";
//     //Thêm class để xử lý nền mờ
//     document.body.classList.add("modal-open");
// }

// function closeModal() {
//     const modal = document.getElementById("questionModal");
//     modal.classList.remove('show');
//     modal.style.display = 'none';
//     document.body.classList.remove("modal-open");
// }

// document.getElementById("save-question").addEventListener("click", () => {
//     //B1: Ktra dk index and before get data and edit
//     if (editIndex >= 0) {
//         questionList[editIndex] = {
//             content: question.content,
//             answers: JSON.parse(JSON.stringify(question.answers))
//         }
//         editIndex = -1;
//     } else {
//         //Add ban copy
//         questionList.push({
//             content: question.content,
//             answers: JSON.parse(JSON.stringify(question.answers))
//         })
//     }
//     //B2: Reset and close model
//     document.getElementById("content-question").value = ""
//     question = {
//         content: "",
//         answers:[]
//     }
//     renderAnswers()
//     renderTestListQuestion()
//     //Close modal
//     closeModal();
// })
// //function close modal

// document.getElementById('btn-save-test').addEventListener('click', () => {
//     const listTestLocal = JSON.parse(localStorage.getItem('list-test') || '[]')
    
//     if (listTestLocal.length === 0) {
//         test.id = 1
//     } else {
//         test.id = listTestLocal[listTestLocal.length - 1].id + 1
//     }

//     // test.questions = questionList
// test.questions = JSON.parse(JSON.stringify(questionList));///
//     listTestLocal.push(test)
//     localStorage.setItem('list-test', JSON.stringify(listTestLocal))

//     test.testName = "";
//     test.categoryId = -1;
//     test.playTime = 0;
//     questionList = [];
//     question = {
//         content: '',
//         answers: []
//     };
//     document.getElementById('testName').value = "";
//     document.getElementById('category-test').value = "";
//     document.getElementById('time').value = "";
//     document.getElementById("content-question").value = "";
//     renderTestListQuestion();
//     renderAnswers();
// })
