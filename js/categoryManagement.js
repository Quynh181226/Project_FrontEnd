let arrCategories = JSON.parse(localStorage.getItem("arrCategories")) || [
    { id: "1", name: "Lịch sử", emoji: "📜" },
    { id: "2", name: "Khoa học", emoji: "🔬" },
    { id: "3", name: "Giải trí", emoji: "🎮" },
    { id: "4", name: "Đố song", emoji: "🎵" },
    { id: "5", name: "Toán học", emoji: "➕" }
];

const categoryList = document.getElementById("categoryList");
const pagination = document.getElementById("pagination");
const btnSaveItem = document.getElementById("btnSaveItem");
const btnConfirmDelete = document.getElementById("btnConfirmDelete");
const logoutLink = document.querySelector('a[href="../pages/login.html"]');

const cateName = document.getElementById("cateName");
const cateEmoji = document.getElementById("cateEmoji");
const errName = document.getElementById("errName");
const errEmoji = document.getElementById("errEmoji");

let indexEdit = null;
let currentPage = 1;
const totalPerpage = 4;

const getTotalPage = () => Math.ceil(arrCategories.length / totalPerpage);

function renderData(data, start) {
    categoryList.innerHTML = "";
    let arrData = data.map((item, index) => {
        const Index = start + index;
        return `
        <tr>
        <td>${item.id}</td>
        <td>${item.emoji} ${item.name}</td>
        <td>
            <button class="btn-edit" onclick="openAddEditModal(${Index}, 'edit')">Sửa</button>
            <button class="btn-delete" onclick="openDeleteModal(${Index})">Xóa</button>
        </td>
        </tr>
       `;
    });
    categoryList.innerHTML = arrData.join("");
}

function renderPages() {
    const start = (currentPage - 1) * totalPerpage;
    const end = start + totalPerpage;
    const result = arrCategories.slice(start, end);
    const total = getTotalPage();
    pagination.innerHTML = "";

    const btnPrev = document.createElement("button");
    btnPrev.textContent = "Prev";
    btnPrev.id = "btnPrev";
    btnPrev.disabled = currentPage === 1;
    btnPrev.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            renderPages();
        }
    });
    pagination.appendChild(btnPrev);

    for (let i = 1; i <= total; i++) {
        const btnElement = document.createElement("button");
        btnElement.textContent = i;
        if (currentPage === i) {
            btnElement.classList.add("active");
        }
        btnElement.addEventListener("click", function () {
            currentPage = i;
            renderPages();
        });
        pagination.appendChild(btnElement);
    }

    const btnNext = document.createElement("button");
    btnNext.textContent = "Next";
    btnNext.id = "btnNext";
    btnNext.disabled = currentPage === total;
    btnNext.addEventListener("click", function () {
        if (currentPage < getTotalPage()) {
            currentPage++;
            renderPages();
        }
    });
    pagination.appendChild(btnNext);

    renderData(result, start);
}

function nameDuplicate(name, edit, editIndex) {
    for (let i = 0; i < arrCategories.length; i++) {
        if (arrCategories[i].name === name) {
            if (!edit || i !== editIndex) {
                return true;
            }
        }
    }
    return false;
}

function validateCate(name, emoji, edit) {
    errName.classList.add("d-none");
    errEmoji.classList.add("d-none");
    if (!name || name.length < 1 || name.length > 50) {
        errName.classList.remove("d-none");
        errName.textContent = "Name must be 1-50 characters long";
        return false;
    }
    if (nameDuplicate(name, edit, editIndex)) {
        errName.classList.remove("d-none");
        errName.textContent = "Name has existed";
        return false;
    }
    if (emoji.length < 1 || emoji.length > 3) {
        errEmoji.classList.remove("d-none");
        return false;
    }
    return true;
}

const openAddEditModal = (index = null, mode = "add") => {
    indexEdit = index;
    errName.classList.add('d-none');
    errEmoji.classList.add('d-none');
    if (mode === 'edit' && index !== null) {
        const cat = arrCategories[index];
        cateName.value = cat.name;
        cateEmoji.value = cat.emoji;
    } else {
        cateName.value = "";
        cateEmoji.value = "";
    }
    new bootstrap.Modal(document.getElementById("modalAddEditCategory")).show();
};

function openDeleteModal(index) {
    indexEdit = index;
    new bootstrap.Modal(document.getElementById("deleteModal")).show();
}

function addCategory(name, emoji) {
    arrCategories.push({ id: (arrCategories.length + 1).toString(), name, emoji });
}

function editCategory(index, name, emoji) {
    arrCategories[index] = { id: arrCategories[index].id, name, emoji };
}

btnSaveItem.addEventListener("click", () => {
    const name = cateName.value.trim();
    const emoji = cateEmoji.value.trim();
    const isEdit = indexEdit !== null;

    if (validateCate(name, emoji, isEdit)) {
        if (isEdit) {
            editCategory(indexEdit, name, emoji);
        } else {
            addCategory(name, emoji);
        }

        localStorage.setItem("arrCategories", JSON.stringify(arrCategories));
        renderPages();
        bootstrap.Modal.getInstance(document.getElementById("modalAddEditCategory")).hide();
        indexEdit = null;
    }
});

btnConfirmDelete.addEventListener("click", () => {
    arrCategories.splice(indexEdit, 1);
    localStorage.setItem("arrCategories", JSON.stringify(arrCategories));
    const total = getTotalPage();
    if (currentPage > total && total > 0) {
        currentPage = total;
    }
    renderPages();
    bootstrap.Modal.getInstance(document.getElementById("deleteModal")).hide();
});

document.getElementById("modalAddEditCategory").addEventListener('hidden.bs.modal', () => {
    indexEdit = null;
});

logoutLink.addEventListener("click", (e) => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "../pages/login.html";
});

document.querySelectorAll("#nav-links a:not([href='../pages/login.html'])").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelectorAll("#nav-links a").forEach(a => a.classList.remove("active"));
        link.classList.add("active");
    });
});

renderPages();