//Pagination
//B1: Tinh tong so page
//B2: Tao nut so trang
//B3: Tinh toan phan trang
//B4: Hthi dlieu
//B5: Cap nhat status button Prev/Next
//Logic:
//Phan trang: Chia key thanh 4 doan ptu, hthi doan tuong ung vs currnetPage
//Dieu huong: Cac nut so trang cap nhat currentPage vs lm ms giao dien
//Trang thai nut đc add or remove disabled dua tren vtri cua curr...

let quizzes = JSON.parse(localStorage.getItem("testList")) || [];
quizzes = quizzes.map(quiz => ({
    id: quiz.id || "",
    image: "../assets/image.png",
    category: quiz.cate || "", // Đảm bảo category không undefined
    title: quiz.name || "Không có tiêu đề",
    stats: `${quiz.ques || 0} câu hỏi - ${quiz.plays || 0} lượt chơi`,
    plays: quiz.plays || 0 
}));

const totalPerPage = 4;
let currentPage = 1;
let sortOrder = "none"; // Thêm để theo dõi trạng thái sắp xếp

// Thêm hàm getTotalPage giống đoạn code mẫu
const getTotalPage = (list) => Math.ceil(list.length / totalPerPage);

// Thêm hàm cateById để chuyển id thành danh mục [emoji] [name]
function cateById(cateId) {
    const categories = JSON.parse(localStorage.getItem("arrCategories")) || [];
    if (!cateId) return "🏠 Không xác định"; // Giá trị mặc định nếu cateId undefined
    const category = categories.find(item => item.id === cateId.toString());
    return category ? `${category.emoji} ${category.name}` : "🏠 Không xác định";
}

// Hàm áp dụng sắp xếp
function applySort(data) {
    const sorted = [...data];
    if (sortOrder === "ascending") {
        sorted.sort((a, b) => a.plays - b.plays);
    } else if (sortOrder === "descending") {
        sorted.sort((a, b) => b.plays - a.plays);
    }
    return sorted;
}

function renderQuizzes(page, quizData) {
    if (!quizData) quizData = applySort(quizzes);
    const start = (page - 1) * totalPerPage;
    const end = start + totalPerPage;
    const quizze = quizData.slice(start, end);

    const quizzList = document.getElementById('quizzList');
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
                    <p>${cateById(quiz.category)}</p> <!-- Sử dụng cateById để hiển thị danh mục -->
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

    renderPagination(quizData);
}

function renderPagination(quizData) {
    if (!quizData) quizData = applySort(quizzes);
    const totalPage = getTotalPage(quizData);
    const btnPagesEl = document.querySelector("#btnPages");
    const btnPrevEl = document.querySelector("#btnPrev");
    const btnNextEl = document.querySelector("#btnNext");

    btnPagesEl.innerHTML = "";
    for (let i = 1; i <= totalPage; i++) {
        const btnEl = document.createElement("button");
        btnEl.textContent = i;
        if (currentPage === i) btnEl.classList.add("btn-active");
        btnEl.addEventListener("click", function () {
            currentPage = i;
            renderQuizzes(currentPage, quizData);
        });
        btnPagesEl.appendChild(btnEl);
    }

    btnPrevEl.disabled = currentPage === 1;
    btnNextEl.disabled = currentPage === totalPage;
}

document.querySelector("#btnPrev").addEventListener("click", function () {
    if (currentPage > 1) {
        currentPage--;
        renderQuizzes(currentPage);
    }
});

document.querySelector("#btnNext").addEventListener("click", function () {
    if (currentPage < getTotalPage(applySort(quizzes))) {
        currentPage++;
        renderQuizzes(currentPage);
    }
});

document.getElementById('inputSearch').addEventListener("input", function(e) {
    const searchs = e.target.value.trim().toLowerCase();
    const filtered = quizzes.filter(quiz =>
        quiz.title.toLowerCase().includes(searchs) ||
        cateById(quiz.category).toLowerCase().includes(searchs)
    );
    currentPage = 1;
    const sortedFiltered = applySort(filtered);
    renderQuizzes(currentPage, sortedFiltered);
});

document.getElementById('sortBtn').onclick = function() {
    sortOrder = "ascending";
    const sorted = applySort(quizzes);
    currentPage = 1;
    renderQuizzes(currentPage, sorted);
    document.getElementById('sortBtn').classList.add('active');
    document.getElementById('sortBtn2').classList.remove('active');
};

document.getElementById('sortBtn2').onclick = function() {
    sortOrder = "descending";
    const sorted = applySort(quizzes);
    currentPage = 1;
    renderQuizzes(currentPage, sorted);
    document.getElementById('sortBtn2').classList.add('active');
    document.getElementById('sortBtn').classList.remove('active');
};

renderQuizzes(currentPage);
renderPagination(); 






function applySort(data) {
    switch (sortOrder) {
        case "ascending":
            return data.sort((a, b) => a.plays - b.plays);
        case "descending":
            return data.sort((a, b) => b.plays - a.plays);
        case "titleAZ":
            return data.sort((a, b) => a.title.localeCompare(b.title));
        case "titleZA":
            return data.sort((a, b) => b.title.localeCompare(a.title));
        default:
            return data;
    }
}
