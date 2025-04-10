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
        let testList = JSON.parse(localStorage.getItem("arrCategories")) || [];
        const testListEl = document.getElementById("test-list");
        const selectOp = document.getElementById("select-op");
        const inputSearch = document.getElementById("inputSearch");
        const btnAdd = document.getElementById("btnAdd");
        const testModal = new bootstrap.Modal(document.getElementById("test-modal"));
        const testName = document.getElementById("testName");
        const testCategory = document.getElementById("testCategory");
        const testQuestions = document.getElementById("testQuestions");
        const testTime = document.getElementById("testTime");
        const saveTestBtn = document.getElementById("saveTestBtn");
        const modalTitle = document.getElementById("testModalLabel");
        const modalEl = document.getElementById("test-modal");
        const btnPagesEl = document.querySelector("#btnPages");
        const btnPrevEl = document.querySelector("#btnPrev");
        const btnNextEl = document.querySelector("#btnNext");

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
        //Tinh tong so trang dua tren do dai testList va totalPage
        const getTotalPage = () => Math.ceil(testList.length / totalPerPage);

        function renderCategory(el) {
            const categories = JSON.parse(localStorage.getItem("arrCategories") || "[]");
            let htmls = '<option value="" disabled selected>Select category</option>';
            categories.forEach(category => {
                htmls += `<option value="${category.id}">${category.emoji} ${category.name}</option>`;
            });
            el.innerHTML = htmls;
        }

function renderTest() {
            console.log(testList);
            
            let searchTest = testList.filter(test =>
                test.name.toLowerCase().includes(inputSearch.value.toLowerCase().trim())
            );

            if (selectOp.value === "1") {
                searchTest.sort((a, b) => a.name.localeCompare(b.name));
            } else if (selectOp.value === "2") {
                searchTest.sort((a, b) => a.time - b.time);
            }

            //tinh toan phan trang dua tren searchTest
            const totalPage = Math.ceil(searchTest.length / totalPerPage);
            const start = (currentPage - 1) * totalPerPage;
            const end = start + totalPerPage;
            const items = searchTest.slice(start, end);
            console.log(items);
            

            testListEl.innerHTML = items.map(test => `
        <tr>
            <td>${test.id}</td>
            <td>${test.name}</td>
            <td>${test.cate}</td>
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
        }
        //function update status button
        function renderPagination() {
            const totalPage = Math.ceil(testList.length / totalPerPage);
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
            if (currentPage < getTotalPage()) {
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
            }
            testModal.show();
        })

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
                }
            }
            testModal.show();
        }
        saveTestBtn.addEventListener("click", () => {
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
                const {
                    mode,
                    id
                }=modalStatus
                
                if (mode === "add") {
                    const newTest = {
                        id: testList.length > 0 ? testList[testList.length - 1].id + 1 : 1,
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
        })

        function openDeleteModal(id) {
            const deleteModal = new bootstrap.Modal(document.getElementById("delete-modal"));
            deleteModal.show();
            document.getElementById("confirmDeleteBtn").onclick = () => {
                const index = testList.findIndex(test => test.id === id);
                if (index !== -1) {
                    testList.splice(index, 1)
                    saveLocal()
                    deleteModal.hide()
                    currentPage = 1
                    renderTest()
                    renderPagination()
                }
            };
        }

        inputSearch.addEventListener("input", renderTest)
        selectOp.addEventListener("change", renderTest)
        const logoutLink = document.getElementById("logoutLink");
        if (logoutLink) {
            logoutLink.addEventListener("click", (e) => {
                e.preventDefault();
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("currentUser");
                window.location.href = "../pages/login.html";
            });
        }
        renderTest()
        renderPagination()