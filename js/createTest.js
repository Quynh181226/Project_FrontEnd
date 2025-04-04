let questions = [];
        let editIndex = -1;
        document.getElementById('addAnswer').addEventListener('click', function () {
            const answersList = document.getElementById('answerList');
            const newAnswer = document.createElement('div');
            newAnswer.classList.add('answerItem');
            newAnswer.innerHTML = `
        <div class="input-group">
            <div class="input-group-text">
                <input class="form-check-input mt-0" type="checkbox" value=""
                    aria-label="Checkbox for following text input">
            </div>
            <input type="text" class="form-control" placeholder="Input answer">
        </div>
        <button class="btnDelete"><img src="../assets/garbage.png"></button>
    `;
            answersList.appendChild(newAnswer);

            newAnswer.querySelector('.btnDelete').addEventListener('click', function () {
                newAnswer.remove();
            });
        });

        function clearModal() {
            document.getElementById('question').value = '';
            const answersList = document.getElementById('answerList');
            answersList.innerHTML = `
        <div class="answerItem">
            <div class="input-group">
                <div class="input-group-text">
                    <input class="form-check-input mt-0" type="checkbox" value=""
                        aria-label="Checkbox for following text input">
                </div>
                <input type="text" class="form-control" placeholder="Nhập câu trả lời">
            </div>
            <button class="btnDelete"><img src="../assets/garbage.png"></button>
        </div>
        <div class="answerItem">
            <div class="input-group">
                <div class="input-group-text">
                    <input class="form-check-input mt-0" type="checkbox" value=""
                        aria-label="Checkbox for following text input">
                </div>
                <input type="text" class="form-control" placeholder="Nhập câu trả lời">
            </div>
            <button class="btnDelete"><img src="../assets/garbage.png"></button>
        </div>
        <div class="answerItem">
            <div class="input-group">
                <div class="input-group-text">
                    <input class="form-check-input mt-0" type="checkbox" value=""
                        aria-label="Checkbox for following text input">
                </div>
                <input type="text" class="form-control" placeholder="Nhập câu trả lời">
            </div>
            <button class="btnDelete"><img src="../assets/garbage.png"></button>
        </div>
        <div class="answerItem">
            <div class="input-group">
                <div class="input-group-text">
                    <input class="form-check-input mt-0" type="checkbox" value=""
                        aria-label="Checkbox for following text input">
                </div>
                <input type="text" class="form-control" placeholder="Nhập câu trả lời">
            </div>
            <button class="btnDelete"><img src="../assets/garbage.png"></button>
        </div>
    `;
            document.querySelectorAll('.btnDelete').forEach(button => {
                button.addEventListener('click', function () {
                    button.parentElement.remove();
                });
            });
        }

        function renderQuestions() {
            const testList = document.getElementById('testList');
            testList.innerHTML = '';
            questions.forEach((question, index) => {
                document.createElement('tr').innerHTML = `
                    <td>${index + 1}</td>
                    <td>${question.text}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editQuestion(${index})">Sửa</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteQuestion(${index})">Xóa</button>
                    </td>
                `;
                testList.appendChild(tr);
            });
        }

        document.getElementById('saveQuestion').addEventListener('click', function () {
            const questionText = document.getElementById('question').value?.trim();
            const answers = Array.from(document.querySelectorAll('#answerList .answerItem')).map(item => {
                return {
                    text: item.querySelector('input[type="text"]').value,
                    isCorrect: item.querySelector('input[type="checkbox"]').checked
                };
            });

            if (!questionText || answers.some(answer => !answer.text)) {
                return;
            }

            const hasCorrectAnswer = answers.some(answer => answer.isCorrect);
            if (!hasCorrectAnswer) {
                return;
            }

            const question = {
                text: questionText,
                answers: answers
            };

            if (editIndex === -1) {
                questions.push(question);
            } else {
                questions[editIndex] = question;
                editIndex = -1;
            }

            renderQuestions();
            clearModal();
            const modal = bootstrap.Modal.getInstance(document.getElementById('questionModal'));
            modal.hide();
        });

        function editQuestion(index) {
            editIndex = index;
            const question = questions[index];
            document.getElementById('question').value = question.text;
            const answersList = document.getElementById('answerList');
            answersList.innerHTML = '';
            question.answers.forEach(answer => {
                const newAnswer = document.createElement('div');
                newAnswer.classList.add('answerItem');
                newAnswer.innerHTML = `
            <div class="input-group">
                <div class="input-group-text">
                    <input class="form-check-input mt-0" type="checkbox" value=""
                        ${answer.isCorrect ? 'checked' : ''} aria-label="Checkbox for following text input">
                </div>
                <input type="text" class="form-control" value="${answer.text}">
            </div>
            <button class="btnDelete"><img src="../assets/garbage.png"></button>
        `;
                answersList.appendChild(newAnswer);
                newAnswer.querySelector('.btnDelete').addEventListener('click', function () {
                    newAnswer.remove();
                });
            });

            const modal = new bootstrap.Modal(document.getElementById('questionModal'));
            modal.show();
        }

        function deleteQuestion(index) {
            if (confirm('Are you sure want to delete the question???')) {
                questions.splice(index, 1);
                renderQuestions();
            }
        }

        document.getElementById('questionModal').addEventListener('show.bs.modal', function (event) {
            if (editIndex === -1) {
                clearModal();
            }
        });

        document.getElementById('save').addEventListener('click', function () {
            const testName = document.getElementById('testName').value;
            const category = document.getElementById('category').value;
            const time = document.getElementById('time').value;

            if (!testName || !category || !time) {
                return;
            }

            const test = {
                name: testName,
                category: category,
                time: time,
                questions: questions
            };
        });