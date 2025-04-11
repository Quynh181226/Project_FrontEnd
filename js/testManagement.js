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

//ý tưởng của e la muốn lấy danh mục của arrCate... và sau đó khi thêm hay khi sửa nó
//sẽ hiện ở phần chọn danh mục và sau đó add vào local => testList sau đó khi render sẽ là ra dữ liệu của testList(nhưng mà lúc đầu cũng đúng đúng rồi nhưng mà hình như e chỉnh cái gì ý trung quy là chỉnh tên key nên giờ nó còn sai ác hơn giwof không biết chỉnh sao cho đúng )
//lúc đầu chỉ là cái cate nó hiện số như kiểu id ý nên em mới muốn fix sao để hiện đúng nhưng mà giờ thì sai ác chung quy em cảm giác mình chưa đủ hiểu logic code 
//giờ phải làm sao để fix đúng nhỉ 
let testList = JSON.parse(localStorage.getItem("testList")) || [];
const testListEl = document.getElementById("test-list")
const selectOp = document.getElementById("select-op")
const inputSearch = document.getElementById("inputSearch")
const btnAdd = document.getElementById("btnAdd")
const testModal = new bootstrap.Modal(document.getElementById("test-modal"))
const testName = document.getElementById("testName")
const testCategory = document.getElementById("testCategory")
const testQuestions = document.getElementById("testQuestions")
const testTime = document.getElementById("testTime")
const saveTestBtn = document.getElementById("saveTestBtn")
const modalTitle = document.getElementById("testModalLabel")
const modalEl = document.getElementById("test-modal")
const btnPagesEl = document.querySelector("#btnPages")
const btnPrevEl = document.querySelector("#btnPrev")
const btnNextEl = document.querySelector("#btnNext")
const category = document.querySelector("#category")
const theTest = document.querySelector("#the-test")
const LogIn1=document.querySelector("#log-in1")

let modalStatus = {
    mode: "",
    id: null
}

function saveLocal() {
    localStorage.setItem("testList", JSON.stringify(testList));
}

//function pagination
let currentPage = 1;
const totalPerPage = 4;
//Tinh tong so trang dua tren do dai list va totalPage
//tso la danh sach can tinh
const getTotalPage = (list) => Math.ceil(list.length / totalPerPage);
//tai sao sai u sai la vi khoi tao sai key neu chi khoi tao test...ma ko khoi tao arr...
//tiep sai tiep tai sao => lay data tu test... nhg test chua list bai test not cate
//=>do la ly do vi sao lai hien id(vi no ko lay dc gtri cua cate...)

//function render(display) cate vao select
function renderCategory(el) {
    const categories = JSON.parse(localStorage.getItem("arrCategories") || "[]");
    let htmls = '<option value="" disabled selected>Select category</option>';
    categories.forEach(category => {
        htmls += `<option value="${category.id}">${category.emoji} ${category.name}</option>`;
    });
    el.innerHTML = htmls;
}

//function tim danh muc theo id
//tại sao lại khai báo bài category và ies ý nghĩa là gì ??
//tại sao lại phải . toString ....
function cateById(cateId) {
    const categories = JSON.parse(localStorage.getItem("arrCategories")) || [];
    const category = categories.find(item => item.id === cateId.toString());
    return category ? `${category.emoji} ${category.name}` : "Unknown Category";
} 

function searchOp() {
    let searchTest = testList.filter(test =>
        test.name.toLowerCase().includes(inputSearch.value.toLowerCase().trim())
    )
    if (selectOp.value === "1") {
        searchTest.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectOp.value === "2") {
        searchTest.sort((a, b) => a.time - b.time);
    }
    return searchTest 
}

//sai tiep la tai sao u tai sao ko lay ra dc cate nhu cate tu arr...
//vi ta phai truy cap va find ra đc dung id cua cate sau do ms tra ve dung string cua no de render bai test dung
function renderTest() {
    //console.log(testList);
    //tinh toan phan trang dua tren searchTest
    const searchTest = searchOp(); //tại sao lại phải gọi trong này searchTest thì có liên quan gì đến  totalPage và mấy cái nữa chẳng hiểu 
    const totalPage = getTotalPage(searchTest); //cả cái này nữa tại sao lại là search...mà không phải là cái khác sao tôi thấy cái logic này cứ buồn cười thế nào ấy
    // const totalPage = Math.ceil(searchTest.length / totalPerPage)
    //dchinh currentPage if over totalPage
    if (currentPage > totalPage && totalPage > 0) {
        currentPage = totalPage;
    }
    const start = (currentPage - 1) * totalPerPage;
    const end = start + totalPerPage;
    const items = searchTest.slice(start, end);
    //console.log(items);
    //sau khi viet function find id cate=>can call function and input value need display khi duyet = inner... qua testListEl = 1 mang gtri ms
    testListEl.innerHTML = items.map(test => `
        <tr>
            <td>${test.id}</td>
            <td>${test.name}</td>
            <td>${cateById(test.cate)}</td>
            <td>${test.ques}</td>
            <td>${test.time} min</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="openEditModal(${test.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="openDeleteModal(${test.id})">Delete</button>
            </td>
        </tr>
    `).join("");

    //Tao nut phan trang
    btnPagesEl.innerHTML = "";
    for (let i = 1; i <= totalPage; i++) {
        const btnEl = document.createElement("button");
        btnEl.textContent = i;
        if (currentPage === i) btnEl.classList.add("btn-active");
        btnEl.addEventListener("click", function () {
            currentPage = i;
            renderTest();
            renderPagination();
        });
        btnPagesEl.appendChild(btnEl);
    }
    renderPagination();
}

//function update status button
function renderPagination() {
    const totalPage = getTotalPage(testList);
    btnPrevEl.disabled = currentPage === 1;
    btnNextEl.disabled = currentPage === totalPage;
}

//lang nghe skien cho Prev/Next
btnPrevEl.addEventListener("click", function () {
    if (currentPage > 1) {
        currentPage--;
        renderTest();
        renderPagination();
    }
});

btnNextEl.addEventListener("click", function () {
    if (currentPage < getTotalPage(testList)) {
        currentPage++;
        renderTest();
        renderPagination();
    }
});

btnAdd.addEventListener("click", () => {
    renderCategory(testCategory);
    modalTitle.textContent = "Add Test";
    testName.value = "";
    testCategory.value = "";
    testQuestions.value = "";
    testTime.value = "";
    saveTestBtn.textContent = "Add";
    modalStatus = {
        mode: "add",
        id: null
    };
    testModal.show();
});

function openEditModal(id) {
    renderCategory(testCategory);
    modalTitle.textContent = "Edit Test";
    const test = testList.find(test => test.id === id);
    if (test) {
        testName.value = test.name;
        testCategory.value = test.cate;
        testQuestions.value = test.ques;
        testTime.value = test.time;
        saveTestBtn.textContent = "Save";
        modalStatus = {
            mode: "edit",
            id
        };
    }
    testModal.show();
}

saveTestBtn.addEventListener("click", () => {
    //tai sao phai check ma ko phai la return u
    //return => display lan luot
    //check => (check)display dua theo value nhap vao
    let check = true;
    const name = testName.value?.trim();
    const cate = testCategory.value;
    const ques = testQuestions.value;
    const time = testTime.value;
    if (!name) {
        document.getElementById("name-error").style.display = "block";
        check = false;
    } else {
        document.getElementById("name-error").style.display = "none";
    }

    if (!cate) {
        document.getElementById("cate-error").style.display = "block";
        check = false;
    } else {
        document.getElementById("cate-error").style.display = "none";
    }

    if (!ques || +ques < 1) {
        document.getElementById("ques-error").style.display = "block";
        check = false;
    } else {
        document.getElementById("ques-error").style.display = "none";
    }

    if (!time || +time < 1) {
        document.getElementById("time-error").style.display = "block";
        check = false;
    } else {
        document.getElementById("time-error").style.display = "none";
    }

    if (check) {
        const { mode, id } = modalStatus;
        
        if (mode === "add") {
            const newTest = {
                id: testList[testList.length - 1].id + 1,
                name,
                cate,
                ques: +ques,
                time: +time
            };
            testList.push(newTest);
        } else if (mode === "edit" && id !== null) {
            const index = testList.findIndex(test => test.id === id);
            if (index !== -1) {
                testList[index] = {
                    id: testList[index].id,
                    name,
                    cate,
                    ques: +ques,
                    time: +time
                };
            }
        }

        saveLocal()
        testModal.hide()
        currentPage = 1
        renderTest()
        renderPagination()
    }
});

function openDeleteModal(id) {
    const deleteModal = new bootstrap.Modal(document.getElementById("delete-modal"));
    deleteModal.show();
    document.getElementById("confirmDeleteBtn").onclick = () => {
        const index = testList.findIndex(test => test.id === id);
        if (index !== -1) {
            testList.splice(index, 1);
            saveLocal();
            deleteModal.hide();
            currentPage = 1;
            renderTest();
            renderPagination();
        }
    };
}

inputSearch.addEventListener("input", renderTest);
selectOp.addEventListener("change", renderTest);

LogIn1.addEventListener("click", (e) => {
    // e.preventDefault()
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "../pages/login.html";
});


category.addEventListener("click", (e) => {
    // e.preventDefault()
    window.location.href="../pages/categoryManagement.html"
}) 

theTest.addEventListener("click", (e)=>{
    // e.preventDefault()
    window.location.href="../pages/testManagement1.html"
})
renderTest()
renderPagination()