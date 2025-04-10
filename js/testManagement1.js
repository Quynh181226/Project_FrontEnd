// // //create data tren local
//     let testList = JSON.parse(localStorage.getItem("testList")) || [];
//     //list test include cac bai test ....
//     const testListEl = document.getElementById("test-list");
//     //vari de loc lua chon by name test
//     const selectOp = document.querySelector("#select-op");
//     const inputSearch = document.getElementById("inputSearch");
//     const btnAdd = document.getElementById("btnAdd");

// // Modal Edit
// const editModal = new bootstrap.Modal(document.getElementById("edit-modal"));
// const editTestName = document.getElementById("editTestName");
// const editTestCategory = document.getElementById("editTestCategory");
// const editTestQuestions = document.getElementById("editTestQuestions");
// const editTestTime = document.getElementById("editTestTime");

// // const btnDel = document.getElementById("btn-del");
//     // //la variable de edit khi ma bam vao 2 button # nhau ///sai day la code cu
//     // const modalTitle = document.getElementById("testModalLabel");
// //////////

// function saveLocal() {
//     localStorage.setItem("testList", JSON.stringify(testList));
// }

// // //function validate cac data (.) trg nhap lieu
// // function valiTest(name, cate, ques, time) {
// //     //ktra dkien xem name add co empty, >50, ... hay ko
// //     if (!name || name.length === null || name.length > 50) {
// //         return;
// //         //  "Test name cannot be longer than 50 characters"
// //     }
// //     //find(element)=some(boolean)
// //     //duyet qua mang testList de xem name da ton tai hay chua
// //     for (let i = 0; i < testList.length; i++) {
// //         if (testList[i].name === name) {
// //             return;
// //         }
// //     }
// //     //ktra xem co phai cate hay ko
// //     if (!cate) {
// //         return;
// //         //  "Empty category."
// //     }
// //     //ktra ques trg cai testList mk tao ms xem co phai co it nhat 1 cau hoi hay ko neu ko thi tao ques ra de lm j
// //     if (!ques || ques < 1) {
// //         return;
// //     }
// //     //ktra tgian hop le nguyen duong
// //     if (!time || time < 1) {
// //         return;
// //     }
// //     return"sssssssssssssssssssssssss";
// // }

// //function renderCate
// function renderCategory(el) {
//         const categories = JSON.parse(localStorage.getItem("arrCategories") || "[]");
//         let htmls = '<option value="" disabled selected>Select category</option>';
//         for (let i = 0; i < categories.length; i++) {
//             htmls += `
//             <option value="${categories[i].id}">
//                 ${categories[i].emoji} ${categories[i].name}
//             </option>
//         `;
//         }
//         el.innerHTML = htmls;
// }

// //function render test
// //logic 1. sap xep name bai test theo ttu tang dan
// //      2. find bai test by name
// //      3. render ra list test
// inputSearch.addEventListener("input", renderTest);
// selectOp.addEventListener("change", renderTest);


// function renderTest() {
//     //1 (search)
//     let searchTest = testList.filter(
//         nameTest =>
//             nameTest.name.toLowerCase().includes(
//                 inputSearch.value.toLocaleLowerCase().trim()
//             )
//     )
//     //2 (sort by name test and play time)
//     //khi sort all tuc la status mdinh
//     //=> SORT VALUE 1
//     if (selectOp.value === "1") {
//         searchTest.sort(a.name.localeCompare(b.name))
//         // searchTest.sort((a, b) => a.name-b.name)
//     } else  if (selectOp.value === "2") {
//         searchTest.sort((a,b)=>a.time-b.time)
//     }
//     testListEl.innerHTML = searchTest.map(
//         test =>
//             `<tr>
//         <td>${test.id}</td>
//         <td>${test.name}</td>
//         <td>${test.cate}</td>
//         <td>${test.ques}</td>
//         <td>${test.time} min</td>
//         <td>
//             <button class="btn btn-warning btn-sm btn-edit" onclick="openEditModal(${test.id})">Edit</button>
//             <button class="btn btn-danger btn-sm btn-delete" onclick="openDeleteModal(${test.id})">Delete</button>
//         </td>
//         </tr>`
//     ).join("")
// }


// //function add test
// function addTest() {
//     // valiTest()
//     let check = true
   



//     // Modal Add
// //vari de mo model = thu vien
// const addModal = new bootstrap.Modal(document.getElementById("add-modal"));
// const name = document.getElementById("addTestName").value?.trim()
// const cate = document.getElementById("addTestCategory").value
// const ques = document.getElementById("addTestQuestions").value
// const time = document.getElementById("addTestTime").value
    

//         name.value = ""
//         renderCategory(cate);
//         ques.value = "";
//         time.value = "";
//         addModal.show();

//     //validate
//     //name
//     // const exist = testList.find((test, index) => test.name === name && index !== editIndex);
//     // if (exist) return"abc"
//     if (!name) {
//         document.getElementById("name-error1").style.display = "block"
//         check = false
//     } else {
//         document.getElementById("name-error1").style.display = "none"
//     }
//     //cate
//      if (!cate) {
//         document.getElementById("cate-error1").style.display = "block"
//         check = false
//     } else {
//         document.getElementById("cate-error1").style.display = "none"
//     }
//     //ques
//     //!ques || ques < 1 || isNaN(ques)=!ques.value.trim() || +ques.value < 1
//     if (!ques || +ques.value < 1) {
//         document.getElementById("ques-error1").style.display = "block"
//         check = false
//     } else {
//         document.getElementById("ques-error1").style.display = "none"
//     }
//     //time
//     if (!time|| +time.value < 1) {
//         document.getElementById("time-error1").style.display = "block"
//         check = false
//     } else {
//         document.getElementById("time-error1").style.display = "none"
//     }
//     //add test new
//     //?????
//     // let addId = testList.length > 0;
//     const newTest = {
//         // id: addId[addId.length - 1].id + 1,
//         // id: searchTest[i].id+1,
//         id: testList[testList.length - 1].id + 1,
//         name,
//         cate,
//         ques,
//         time
//     };
//     testList.push(newTest);
//     saveLocal()
//     addModal.hide()
//     renderTest()
//     console.log(JSON.parse(localStorage.getItem("arrCategories")));
//     console.log(JSON.parse(localStorage.getItem("testList")));
// }
// //function edit test
// function editTest() {
//     // valiTest()
//     let check = true;
//     // const editModal = document.getElementById("edit-modal")
//     const name = editTestName.value?.trim()
//     const cate = editTestCategory.value
//     const ques = editTestQuestions.value
//     const time = editTestTime.value
//     //name
//     if (!name.trim()||name.length===0) {
//         document.getElementById("name-error2").classList.remove("d-none")
//         check = false;
//     } else {
//         document.getElementById("name-error2").classList.add("d-none")
//     }
//     //category
//     if (!cate.value.trim()||name.length>50) {
//         document.getElementById("cate-error2").classList.remove("d-none")
//         check = false;
//     } else {
//         document.getElementById("cate-error2").classList.add("d-none")
//     }
//     //number question
//     if (!ques.value.trim() || +ques.value < 1) {
//         document.getElementById("ques-error2").classList.remove("d-none")
//         check = false;
//     } else {
//         document.getElementById("ques-error2").classList.add("d-none")
//     }
//     //time
//     if (!time.value.trim() || +time.value < 1) {
//         document.getElementById("time-error2").classList.remove("d-none")
//         check = false;
//     } else {
//         document.getElementById("time-error2").classList.add("d-none")
//     }
//     testList[editIndex] = {
//         id: testList[editIndex].id,
//         name,
//         cate,
//         ques,
//         time
//     };
//     saveLocal()
//     // closeModal()
//     editModal.hide();
//     renderTest()
// }
// const btnDelete = document.querySelectorAll(".btn-delete");
//         btnDelete.forEach((btn, i) => {
//             btn.addEventListener("click", () => {
//                 const modal = new bootstrap.Modal(document.getElementById("delete-modal"));
//                 modal.show();
//                 modal._element.querySelector(".btn-danger").onclick = () => {
//                     testList.splice(i, 1);
//                     saveLocal();
//                     modal.hide();
//                     renderTest();
//                 };
//             });
//         });
// //close modal = boostrap
// //function confirm bai test
// document.getElementById("delete-modal").addEventListener("click", () => {
//     const deleteModal=document.querySelector("#delete-modal")
//     if (editIndex < 0) return
//     else {
//         testList.splice(deleteIndex, 1)
//         // deleteIndex = null
//         saveLocal()
//         deleteModal.hide()
//         renderTest()
//     }
// })
// //gan skien cho button edit and delete
// //return ve nostList
// const btnEdit = document.querySelectorAll(".btn-edit")
// const btnDel = document.querySelectorAll(".btn-delete")
// function btnEdits() {
//     for (let i = 0; i < btnEdit.length; i++) {
//     btnEdit[i].addEventListener("click", () => {
//         editIndex = i;
//         openEditModal()
//     });
// }
// }

// //function open modal edit
// //gan data vao form edit
// //display modal edit
// const openEditModal = (id) => {
//     // editIndex = testList.findIndex(test => test.id === id);
//     for (let i = 0; i < testList.length; i++){
//         if (testList[i].id === id) {
//             editTestName.value = testList[i].name
//             editTestCategory.value=testList[i].cate
//             editTestQuestions.value = testList[i].ques
//             editTestTime.value = testList[i].time
//             editModal.show()
//             break
//         }
//     }
// }

// renderTest()

