 let quizzes = [
            {
                id: 1,
                image: "../assets/image.png",
                category: "🏠 Đời sống",
                title: "Thách thức sự hiểu biết của bạn",
                stats: "15 câu hỏi - 1 lượt chơi",
                plays: 1
            },
            {
                id: 2,
                image: "../assets/image.png",
                category: "🏠 Đời sống",
                title: "Thách thức sự hiểu biết của bạn",
                stats: "15 câu hỏi - 2 lượt chơi",
                plays: 2
            },
            {
                id: 3,
                image: "../assets/image.png",
                category: "🏠 Đời sống",
                title: "Thách thức sự hiểu biết của bạn",
                stats: "15 câu hỏi - 1 lượt chơi",
                plays: 1
            },
            {
                id: 4,
                image: "../assets/image.png",
                category: "🏠 Đời sống",
                title: "Thách thức sự hiểu biết của bạn",
                stats: "15 câu hỏi - 1 lượt chơi",
                plays: 1
            },
            {
                id: 5,
                image: "../assets/image.png",
                category: "🏠 Đời sống",
                title: "Thách thức sự hiểu biết của bạn",
                stats: "15 câu hỏi - 1 lượt chơi",
                plays: 1
            },
            {
                id: 6,
                image: "../assets/image.png",
                category: "🏠 Đời sống",
                title: "Thách thức sự hiểu biết của bạn",
                stats: "15 câu hỏi - 1 lượt chơi",
                plays: 1
            },
            {
                id: 7,
                image: "../assets/image.png",
                category: "🏠 Đời sống",
                title: "Thách thức sự hiểu biết của bạn",
                stats: "15 câu hỏi - 1 lượt chơi",
                plays: 1
            },
            {
                id: 8,
                image: "../assets/image.png",
                category: "🏠 Đời sống",
                title: "Thách thức sự hiểu biết của bạn",
                stats: "15 câu hỏi - 1 lượt chơi",
                plays: 1
            }
        ];

        let filteredQuizzes = quizzes.slice();
        const totalPerPage = 4;
        let currentPage = 1;

        function renderQuizzes(page) {
            const start = (page - 1) * totalPerPage;
            const end = start + totalPerPage;
            const quizzesToShow = filteredQuizzes.slice(start, end);

            const quizzList = document.getElementById('quizzList');
            quizzList.innerHTML = '';

            quizzesToShow.forEach(quiz => {
                const quizzItem = document.createElement('div');
                quizzItem.className = 'quizzItem';
                quizzItem.innerHTML = `
                    <div class="quizzContent">
                        <div class="quizzImg">
                            <img src="${quiz.image}" alt="Quiz Image" />
                        </div>
                        <div class="quizzInfo">
                            <p>${quiz.category}</p>
                            <strong>${quiz.title}</strong>
                            <p>${quiz.stats}</p>
                        </div>
                        <div class="quizzBtn">
                            <button class="btnStartPlay" data-id="${quiz.id}">Chơi</button>
                        </div>
                    </div>
                `;
                quizzList.appendChild(quizzItem);
            });

            document.querySelectorAll('.btnStartPlay').forEach(btn => {
                btn.addEventListener('click', () => {
                    const quizId = btn.getAttribute('data-id');
                    window.location.href = `../pages/quiz.html?id=${quizId}`;
                });
            });
        } 

        function renderPagination() {
            const totalPage = Math.ceil(filteredQuizzes.length / totalPerPage);
            const pagination = document.getElementById('pagination');
            pagination.innerHTML = '';

            const btnPrev = document.createElement('button');
            btnPrev.id = 'btnPrev';
            btnPrev.textContent = 'Previous';
            btnPrev.disabled = currentPage === 1;
            btnPrev.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderQuizzes(currentPage);
                    renderPagination();
                }
            });
            pagination.appendChild(btnPrev);

            for (let i = 1; i <= totalPage; i++) {
                const btnPage = document.createElement('button');
                btnPage.className = `btnPage ${i === currentPage ? 'active' : ''}`;
                btnPage.textContent = i;
                btnPage.addEventListener('click', () => {
                    currentPage = i;
                    renderQuizzes(currentPage);
                    renderPagination();
                });
                pagination.appendChild(btnPage);
            }

            const btnNext = document.createElement('button');
            btnNext.id = 'btnNext';
            btnNext.textContent = 'Next';
            btnNext.disabled = currentPage === totalPage;
            btnNext.addEventListener('click', () => {
                if (currentPage < totalPage) {
                    currentPage++;
                    renderQuizzes(currentPage);
                    renderPagination();
                }
            });
            pagination.appendChild(btnNext);
        }

        document.getElementById('inputSearch').addEventListener('input', (e) => {
            const searchTerm = e.target.value.trim().toLowerCase();
            filteredQuizzes = quizzes.filter(quiz =>
                quiz.title.toLowerCase().includes(searchTerm) ||
                quiz.category.toLowerCase().includes(searchTerm)
            );
            currentPage = 1; 
            renderQuizzes(currentPage);
            renderPagination();
        });

        document.getElementById('sortBtn').addEventListener('click', () => {
        filteredQuizzes = quizzes.slice();
        filteredQuizzes.sort((a, b) => a.plays - b.plays);
        currentPage = 1;
        renderQuizzes(currentPage);
        renderPagination();
        document.getElementById('sortBtn').classList.add('active');
        document.getElementById('sortBtn2').classList.remove('active');
        });

        document.getElementById('sortBtn2').addEventListener('click', () => {
        filteredQuizzes = quizzes.slice();
        filteredQuizzes.sort((a, b) => b.plays - a.plays);
        currentPage = 1;
        renderQuizzes(currentPage);
        renderPagination();
        document.getElementById('sortBtn2').classList.add('active');
        document.getElementById('sortBtn').classList.remove('active');
        });

        document.getElementById('btnPlay').addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * quizzes.length);
            const quizId = quizzes[randomIndex].id;
            window.location.href = `../pages/quiz.html?id=${quizId}`;
        });

        const logoutLink = document.getElementById("logoutLink");
        if (logoutLink) {
            logoutLink.addEventListener("click", (e) => {
                e.preventDefault();
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("currentUser");
                window.location.href = "../pages/login.html";
            });
        }

        renderQuizzes(currentPage);
        renderPagination();