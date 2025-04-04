const questions = [
            {
                text: "Which is the part of the computer system that one can physically touch?",
                answers: ["Data", "Operating systems", "Hardware", "Software"],
                correct: 2
            },
            {
                text: "What does CPU stand for?",
                answers: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Processor Unit"],
                correct: 1
            },
            {
                text: "What is the brain of the computer?",
                answers: ["Monitor", "CPU", "RAM", "Hard Drive"],
                correct: 1
            }
        ];

        let currentQuestion = 0;

        function loadQuestion() {
            document.getElementById("question-index").textContent = currentQuestion + 1;
            document.getElementById("question-text").textContent = questions[currentQuestion].text;
            const answersDiv = document.getElementById("answers");
            answersDiv.innerHTML = "";
            questions[currentQuestion].answers.forEach((answer, index) => {
                const div = document.createElement("div");
                div.innerHTML = `<input type="radio" name="answer" value="${index}"> ${answer}`;
                answersDiv.appendChild(div);
            });

            // Update pagination active state
            document.querySelectorAll(".pagination button").forEach((btn, index) => {
                btn.classList.toggle("active", index === currentQuestion);
            });
        }

        // Pagination
        function createPagination() {
            const pagination = document.getElementById("pagination");
            questions.forEach((_, index) => {
                const btn = document.createElement("button");
                btn.textContent = index + 1;
                btn.addEventListener("click", () => {
                    currentQuestion = index;
                    loadQuestion();
                });
                pagination.appendChild(btn);
            });
        }

        // Navigation
        document.getElementById("prev-btn").addEventListener("click", () => {
            if (currentQuestion > 0) {
                currentQuestion--;
                loadQuestion();
            }
        });

        document.getElementById("next-btn").addEventListener("click", () => {
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                loadQuestion();
            }
        });

        // Load initial state
        createPagination();
        loadQuestion();
        // Tạo modal hoàn thành khi làm bài xong
        const modalHTML = `
<div id="completion-modal" class="modal" style="display: none;">
    <div class="modal-content">
        <span class="close-btn">&times;</span>
        <h2>Hoàn thành</h2>
        <div class="result-message">
            <p>Chúc mừng!</p>
            <p>Bạn đã hoàn thành bài kiểm tra</p>
            <p>Điểm của bạn: <strong id="score">85%</strong></p>
        </div>
        <div class="result-details">
            <p>Tổng số câu hỏi: <span id="total-questions">20</span></p>
            <p>Câu trả lời đúng: <span id="correct-answers">17</span></p>
            <p>Câu trả lời sai: <span id="wrong-answers">3</span></p>
        </div>
        <div class="modal-buttons">
            <button id="retry-btn" class="primary">Làm lại</button>
            <button id="home-btn" class="success">Trang chủ</button>
        </div>
    </div>
</div>`;

        document.body.insertAdjacentHTML("beforeend", modalHTML);

        // Thêm CSS cho modal
        const style = document.createElement("style");
        style.innerHTML = `
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 300px;
    position: relative;
}
.close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
    font-size: 20px;
}
.primary {
    background: blue;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
}
.success {
    background: green;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
}`;
        document.head.appendChild(style);

        // Xử lý hiển thị modal
        const completeBtn = document.getElementById("complete-btn");
        if (completeBtn) {
            completeBtn.addEventListener("click", function () {
                document.getElementById("completion-modal").style.display = "flex";

                // Cập nhật dữ liệu kết quả từ bài test
                let totalQuestions = questions.length;
                let correctAnswers = 17; // Thay bằng số câu đúng từ logic chấm điểm
                let wrongAnswers = totalQuestions - correctAnswers;
                let score = Math.round((correctAnswers / totalQuestions) * 100);

                document.getElementById("total-questions").textContent = totalQuestions;
                document.getElementById("correct-answers").textContent = correctAnswers;
                document.getElementById("wrong-answers").textContent = wrongAnswers;
                document.getElementById("score").textContent = score + "%";
            });
        }

        document.body.addEventListener("click", function (event) {
            if (event.target.classList.contains("close-btn")) {
                document.getElementById("completion-modal").style.display = "none";
            }
        });

        // Xử lý nút "Làm lại"
        document.getElementById("retry-btn").addEventListener("click", function () {
            document.getElementById("completion-modal").style.display = "none";
            currentQuestion = 0; // Reset về câu hỏi đầu tiên
            loadQuestion(); // Tải lại câu hỏi đầu tiên
            document.querySelectorAll("input[name='answer']").forEach(input => input.checked = false); // Bỏ chọn tất cả câu trả lời
        });