let quizzes = JSON.parse(localStorage.getItem("testList")) || [];
quizzes = quizzes.map(quiz => ({
    id: quiz.id,
    image: "../assets/image.png",
    category: quiz.cate,
    title: quiz.name,
    stats: `${quiz.ques} câu hỏi - ${quiz.plays || 0} lượt chơi`,
    plays: quiz.plays || 0 
}));

const totalPerPage = 4;
let currentPage = 1;

function renderQuizzes(page, quizData) {
    if (!quizData) quizData = quizzes
    const start = (page - 1) * totalPerPage
    const end = start + totalPerPage
    const quizze = quizData.slice(start, end)

    const quizzList = document.getElementById('quizzList')
    quizzList.innerHTML = '';

    quizze.forEach(quiz => {
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
                    <button class="btnStartPlay" onclick="window.location.href='../pages/test.html?id=${quiz.id}'">Chơi</button>
                </div>
            </div>
        `;
        quizzList.appendChild(quizzItem);
    });
}

function renderPagination(quizData) {
    if (!quizData) quizData = quizzes;
    const totalPage = Math.ceil(quizData.length / totalPerPage)
    const pagination = document.getElementById('pagination')
    pagination.innerHTML = '';

    const btnPrev = document.createElement('button')
    btnPrev.id = 'btnPrev';
    btnPrev.textContent = 'Previous';
    btnPrev.disabled = currentPage === 1;
    btnPrev.onclick = function() {
        if (currentPage > 1) {
            currentPage--
            renderQuizzes(currentPage, quizData)
            renderPagination(quizData)
        }
    };
    pagination.appendChild(btnPrev)

    for (let i = 1; i <= totalPage; i++) {
        const btnPage = document.createElement('button');
        btnPage.className = `btnPage ${i === currentPage ? 'active' : ''}`;
        btnPage.textContent = i;
        btnPage.onclick = function() {
            currentPage = i
            renderQuizzes(currentPage, quizData)
            renderPagination(quizData)
        };
        pagination.appendChild(btnPage)
    }

    const btnNext = document.createElement('button');
    btnNext.id = 'btnNext';
    btnNext.textContent = 'Next';
    btnNext.disabled = currentPage === totalPage;
    btnNext.onclick = function() {
        if (currentPage < totalPage) {
            currentPage++
            renderQuizzes(currentPage, quizData)
            renderPagination(quizData)
        }
    };
    pagination.appendChild(btnNext)
}

document.getElementById('inputSearch').input = function(e) {
    const searchs = e.target.value.trim().toLowerCase();
    const filtered = [];
    for (let i = 0; i < quizzes.length; i++) {
        if (quizzes[i].title.toLowerCase().indexOf(searchs) !== -1 || 
            quizzes[i].category.toLowerCase().indexOf(searchs) !== -1) {
            filtered.push(quizzes[i])
        }
    }
    currentPage = 1
    renderQuizzes(currentPage, filtered)
    renderPagination(filtered)
};

document.getElementById('sortBtn').onclick = function() {
    const sorted = [];
    for (let i = 0; i < quizzes.length; i++) {
        sorted[i] = quizzes[i]
    }
    sorted.sort(function(a, b) { return a.plays - b.plays; });
    currentPage = 1
    renderQuizzes(currentPage, sorted)
    renderPagination(sorted)
    document.getElementById('sortBtn').classList.add('active')
    document.getElementById('sortBtn2').classList.remove('active')
};

document.getElementById('sortBtn2').onclick = function() {
    const sorted = [];
    for (let i = 0; i < quizzes.length; i++) {
        sorted[i] = quizzes[i]
    }
    sorted.sort(function(a, b) { return b.plays - a.plays; });
    currentPage = 1
    renderQuizzes(currentPage, sorted)
    renderPagination(sorted)
    document.getElementById('sortBtn2').classList.add('active')
    document.getElementById('sortBtn').classList.remove('active')
};

renderQuizzes(currentPage)
renderPagination()