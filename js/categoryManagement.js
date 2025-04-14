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

        const categoryList = document.getElementById("categoryList")
        const btnSaveItem = document.getElementById("btn-save")
        const btnConfirmDelete = document.getElementById("btnConfirmDelete")
        const logOut = document.querySelector('#log-inn')
        const testManagement = document.querySelector("#test-management")
        const categoryManagement = document.querySelector("#category-management")

        const cateName = document.getElementById("cateName")
        const cateEmoji = document.getElementById("cateEmoji")
        const errName = document.getElementById("errName")
        const errEmoji = document.getElementById("errEmoji")

        let currentPage = 1
        const totalPerpage = 4

        const getTotalPage = () => Math.ceil(arrCategories.length / totalPerpage);
        
        function renderData() {
            const start = (currentPage - 1) * totalPerpage;
            const end = start + totalPerpage;
            const result = arrCategories.slice(start, end);
            categoryList.innerHTML = "";
            let arrData = result.map((item, index) => {
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

        function renderPagination() {
            const totalPage = getTotalPage();
            const btnPagesEl = document.querySelector("#btnPages");
            const btnPrevEl = document.querySelector("#btnPrev");
            const btnNextEl = document.querySelector("#btnNext");

            btnPagesEl.innerHTML = "";
            for (let i = 1; i <= totalPage; i++) {
                const btnEl = document.createElement("button");
                btnEl.textContent = i
                if (currentPage === i) btnEl.classList.add("btn-active");
                btnEl.addEventListener("click", function () {
                    currentPage = i
                    renderData()
                    renderPagination()
                });
                btnPagesEl.appendChild(btnEl)
            }

            btnPrevEl.disabled = currentPage === 1
            btnNextEl.disabled = currentPage === totalPage
            // console.log("currentPage:", currentPage, "totalPage:", getTotalPage())
        }

        document.querySelector("#btnPrev").addEventListener("click", function () {
            if (currentPage > 1) {
                currentPage--
                renderData()
                renderPagination()
            }
        });

        document.querySelector("#btnNext").addEventListener("click", function () {
            if (currentPage < getTotalPage()) {
                currentPage++
                renderData()
                renderPagination()
            }
        });

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
            let check = true
            if (!name || name.length < 1 || name.length > 50) {
                errName.classList.remove("d-none")
                errName.textContent = "Name must be 1-50 characters long"
                check = false
            }
            if (nameDuplicate(name, editIndex)) {
                errName.classList.remove("d-none")
                errName.textContent = "Name has existed"
                check = false
            }
            if (!emoji|| emoji.length > 2) {
                errEmoji.classList.remove("d-none")
                errEmoji.textContent = "Emoji must be 1-2 characters"
                check = false
            }
            return check
        }

        if (!localStorage.getItem("arrCategories")) {
            localStorage.setItem("arrCategories", arrCategories.length.toString());
        }

        function openAddEditModal(index, mode) {
            errName.classList.add('d-none')
            errEmoji.classList.add('d-none')
            const modal = new bootstrap.Modal(document.getElementById("modalAddEditCategory"))
            if (mode === 'edit' && index !== null) {
                const cat = arrCategories[index]
                cateName.value = cat.name
                cateEmoji.value = cat.emoji
            } else {
                // let Id = +localStorage.getItem("arrCategoryId") || 0;
                // Id++;
                // arrCategories.push({
                //     id: Id.toString(),
                //     emoji
                // });
            
                // localStorage.setItem("arrCategoryId", Id.toString());
                cateName.value = ""
                cateEmoji.value = ""
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
                        // console.log("edit thanh cong..............");
                    } else {
                        let Id = +localStorage.getItem("arrCategoryId") || arrCategories.length;
                    Id++;
                    arrCategories.push({
                        id: Id.toString(),
                        name,
                        emoji
                    });
                    localStorage.setItem("arrCategoryId", Id.toString());

                        // arrCategories.push({
                        //     id: (arrCategories.length + 1).toString(),
                        //     name,
                        //     emoji
                        // });
                        // console.log("addddddddd cate"); 
                    }
                    localStorage.setItem("arrCategories", JSON.stringify(arrCategories));
                    renderData()
                    renderPagination()
                    modal.hide()
                }
            };
        }
        //open model
        // dele tai pos index 1 el
        // duyet qua arr arrCate... de update lai id (dung template literal de chuyen i do thanh string lluot theo ttu : tai sao u => vi id trg dtg = chuoi) => nhung gtri thanh string
        // ko hieu sao loi => .toString  ... ttiep thanh string
        function openDeleteModal(index) {
            const modal = new bootstrap.Modal(document.getElementById("deleteModal")); // Khởi tạo modal
            modal.show()
        
            btnConfirmDelete.onclick = () => {
                arrCategories.splice(index, 1); 
                arrCategories.forEach((el, i) => {
                    el.id = (i + 1).toString(); 
                });
                localStorage.setItem("arrCategories", JSON.stringify(arrCategories));
                // console.log(arrCategories)
                const total = getTotalPage();
                if (arrCategories.length === 0) {
                    currentPage = 1;
                } else if (currentPage > total) {
                    currentPage = total;
                }
        
                renderData()
                renderPagination()
                modal.hide()
            };
        }

        logOut.addEventListener("click", (e) => {
            // e.preventDefault()
            localStorage.removeItem("isLoggedIn")
            localStorage.removeItem("currentUser")
            window.location.href = "../pages/login.html"
        });

        testManagement.addEventListener("click", (e) => {
            // e.preventDefault()
            // localStorage.getItem("isLoggeIn")
            window.location.href = "../pages/testManagement1.html"
        })

        categoryManagement.addEventListener("click", (e) => {
            // e.preventDefault()
            // localStorage.getItem("isLoggeIn")
            window.location.href = "../pages/categoryManagement.html"
        })
        renderData()
        renderPagination()