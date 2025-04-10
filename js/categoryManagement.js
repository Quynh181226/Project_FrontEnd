const arrCategories = JSON.parse(localStorage.getItem("arrCategories")) || [
    { id: "1", name: "History", emoji: "📜" },
    { id: "2", name: "Game", emoji: "🎮" },
    { id: "3", name: "Music", emoji: "🔬" },
    { id: "4", name: "Caculate", emoji: "➕" },
    { id: "5", name: "Science", emoji: "🧪" },
    { id: "6", name: "Life", emoji: "🏠" },
    { id: "7", name: "Geography", emoji: "🗺️" },
    { id: "8", name: "Literature", emoji: "📖" },
    { id: "9", name: "Programming", emoji: "💻" },
    { id: "10", name: "Mathematics", emoji: "🔢" },
    { id: "11", name: "Art", emoji: "🎨" }
];

const categoryList = document.getElementById("categoryList");
const pagination = document.getElementById("pagination");
const btnSaveItem = document.getElementById("btn-save");
const btnConfirmDelete = document.getElementById("btnConfirmDelete");
const logoutLink = document.querySelector('a[href="../pages/login.html"]');

const cateName = document.getElementById("cateName");
const cateEmoji = document.getElementById("cateEmoji");
const errName = document.getElementById("errName");
const errEmoji = document.getElementById("errEmoji");

let currentPage = 1;
const totalPerpage = 4;

const getTotalPage = () => Math.ceil(arrCategories.length / totalPerpage);

function renderData(data, start) {
    categoryList.innerHTML = "";
    let arrData = data.map((item, index) => {
        const currentIndex = start + index;
        return `
        <tr>
            <td>${item.id}</td>
            <td>${item.emoji} ${item.name}</td>
            <td>
                <button class="btn-edit" onclick="openAddEditModal(${currentIndex}, 'edit')">Sửa</button>
                <button class="btn-delete" onclick="openDeleteModal(${currentIndex})">Xóa</button>
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

    const btnPrev = document.createElement("button")
    btnPrev.textContent = "Prev"
    btnPrev.id = "btnPrev"
    btnPrev.disabled = currentPage === 1;
    btnPrev.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--
            renderPages()
        }
    });
    pagination.appendChild(btnPrev);

    for (let i = 1; i <= total; i++) {
        const btnElement = document.createElement("button");
        btnElement.textContent = i
        if (currentPage === i) {
            btnElement.classList.add("active")
        }
        btnElement.addEventListener("click", function () {
            currentPage = i
            renderPages()
        });
        pagination.appendChild(btnElement)
    }

    const btnNext = document.createElement("button")
    btnNext.textContent = "Next";
    btnNext.id = "btnNext";
    btnNext.disabled = currentPage === total;
    btnNext.addEventListener("click", function () {
        if (currentPage < getTotalPage()) {
            currentPage++;
            renderPages()
        }
    });
    pagination.appendChild(btnNext)

    renderData(result, start)
}

function nameDuplicate(name, editIndex) {
    for (let i = 0; i < arrCategories.length; i++) {
        if (arrCategories[i].name === name && i !== editIndex) {
            return true
        }
    }
    return false
}

function validateCate(name, emoji, editIndex) {
    errName.classList.add("d-none")
    errEmoji.classList.add("d-none")
    let check=true
    if (!name || name.length < 1 || name.length > 50) {
        errName.classList.remove("d-none")
        errName.textContent = "Name must be 1-50 characters long"
        check=false
    }
    if (nameDuplicate(name, editIndex)) {
        errName.classList.remove("d-none")
        errName.textContent = "Name has existed"
        check=false
    }
    if (emoji.length < 1 || emoji.length > 3) {
        errEmoji.classList.remove("d-none")
        check=false
    }
    return check
}

function openAddEditModal(index, mode) {
    errName.classList.add('d-none')
    errEmoji.classList.add('d-none')
    const modal = new bootstrap.Modal(document.getElementById("modalAddEditCategory"))
    if (mode === 'edit' &&  index!==null) {
        const cat = arrCategories[index]
        cateName.value = cat.name
        cateEmoji.value = cat.emoji  
    } else {
        cateName.value = "";
        cateEmoji.value = "";
    }
    modal.show()

    btnSaveItem.onclick = () => {
        const name = cateName.value?.trim();
        const emoji = cateEmoji.value?.trim();

        if (validateCate(name, emoji, index)) {
            if (index) {
                arrCategories[index] = {
                    id: arrCategories[index].id,
                    name,
                    emoji
                };
                console.log("edit thanh cong..............");
            } else {
                arrCategories.push({
                    id: (arrCategories.length + 1).toString(),
                    name,
                    emoji
                });
                console.log("addddddddd cate"); 
            }
            localStorage.setItem("arrCategories", JSON.stringify(arrCategories));
            renderPages();
            modal.hide();
        }
    };
}

function openDeleteModal(index) {
    const modal = new bootstrap.Modal(document.getElementById("deleteModal"))
    modal.show()

    btnConfirmDelete.onclick = () => {
        arrCategories.splice(index, 1)
        localStorage.setItem("arrCategories", JSON.stringify(arrCategories))
        const total = getTotalPage()
        if (currentPage > total && total > 0) {
            currentPage = total
        }
        console.log("delete succcceeeesss"); 
        renderPages()
        modal.hide()
    };
}

logoutLink.addEventListener("click", (e) => {
    localStorage.removeItem("isLoggedIn")
    window.location.href = "../pages/login.html"
});

renderPages();