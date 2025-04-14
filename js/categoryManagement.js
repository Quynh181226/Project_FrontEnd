//B1: Dlieu gia lap - Cate
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
//B2: Lay cac ptu HTML can thao tac
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
//B3: Khoi tao cac bien cho phan trang
//sai vi trang htai thi ko dc dung const vi chung se bi gan lai va thay doi
        let currentPage = 1
//so ban ghi tren 1 trang
        const totalPerpage = 4
//hien thi ra danh sach trang (button)
//tinh tong so trang
//tong so trang = totalRecord/totalPerpage= 11 cate/4 = 3 page    
        const getTotalPage = () => Math.ceil(arrCategories.length / totalPerpage);
//B4: function hthi dlieu trg bang
        function renderData() {
//B5.3: Tinh vtri bdau va kthuc cua dlieu trg trang htai
            //Vtri bdau trg tung trang
            //(Trang htai - 1)*So ban ghi/trang
            const start = (currentPage - 1) * totalPerpage
            //vtri kthuc ko vuot qua do dai mang
            const end = start + totalPerpage
            const result = arrCategories.slice(start, end)
            // console.log("result:", result);
            //clear ndung cu trg tbody
            categoryList.innerHTML = ""
            //hien thi table
            //chuyen dlieu thanh HTML (tao cac hang <tr> cho bang)
            //data nay la bien gia dinh
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
            //noi cac hang thanh bang va them vao chuoi
            categoryList.innerHTML = arrData.join("")
        }
//B5: function hthi nut phan trang va cap nhat dlieu
        function renderPagination() {
            //cap nhat tong so trang vi arr... co the thay doi sau khi add
            const totalPage = getTotalPage()
            const btnPagesEl = document.querySelector("#btnPages")
            const btnPrevEl = document.querySelector("#btnPrev")
            const btnNextEl = document.querySelector("#btnNext")
//B5.1: Clear, lm rong kqua trc day di - xoa cac nut trang cu
            btnPagesEl.innerHTML = "";
//B5.2: Tao nut cho tung trang
            for (let i = 1; i <= totalPage; i++) {
                const btnEl = document.createElement("button")
//gan tieu de cho button - so trang cho nut
                btnEl.textContent = i
                //active cho button dc chon (trang htai)
                //neu la trang htai add class btn-active de lm noi bat
                if (currentPage === i) btnEl.classList.add("btn-active");
                //lang nghe skien khi click vao tung button
                //gan skien click cho tung nut trang
                btnEl.addEventListener("click", function () {
                    //cap nhat trang htai
                    //gan lai trang htai la gtri ma nut bam vao
                    currentPage = i
                    //B5.4: Hthi dlieu trg bang
                    renderData()
                    //goi lai de cap nhat giao dien
                    renderPagination()
                });
                //them nut vao container
                btnPagesEl.appendChild(btnEl)
            }
//B5.5: Vo hieu hoa nut prev, next neu o trang dau cuoi
            //disable di cac button prev, next khi dk ko tman
            btnPrevEl.disabled = currentPage === 1
            btnNextEl.disabled = currentPage === totalPage
            // console.log("currentPage:", currentPage, "totalPage:", getTotalPage())
        }
//B7: Gan skien click cho nut prev
        document.querySelector("#btnPrev").addEventListener("click", function () {
             //Giam trang htai di 1
            //dkien de giam: trang htai > 1
            //chi giam neu ko o trang dau
            if (currentPage > 1) {
                currentPage--
                renderData()
                renderPagination()
            }
        });
//B6: Gan skien click cho nut next
        //Lang nghe skien khi click vao thi chuyen trang
        //De chuyen trang dc ta phai tao 1 cai bien luu tru
        //xem hien tai dang o trang nao thi ms chuyen dc
        document.querySelector("#btnNext").addEventListener("click", function () {
            // const totalPage = getTotalPage();
            //tang trang htai len 1
            //dk de tiep tuc tang: trang htai phải nhỏ hơn tổng số trang
            //chi tang neu chua o trang cuoi
            if (currentPage < getTotalPage()) {
                //sau do ms tang trang htai len 1 dvi
                currentPage++
                //cap nhat giao dien
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
//logic cua phan add/edit+validate: 
//1.if/else: de mode status
//if: mode=edit=>display value+index
//else: mode=add=>empty
//2.show modal
//3.call fun vali
//=> if is index of value or cate j day 
//=> local=>arr=>index....

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
                        // let Id = +localStorage.getItem("arrCategoryId") || arrCategories.length;
                        // Id++;
                        arrCategories.push({
                            // id: Id.toString(),
                            id: (arrCategories.length + 1).toString(),
                            name,
                            emoji
                        });
                        // localStorage.setItem("arrCategoryId", Id.toString());

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
                //dat lai currentPage ve 1 de hthi tu dau or mdinh khi length=0.... curr...=page"1"
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