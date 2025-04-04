 document.addEventListener("DOMContentLoaded", function () {
    let testList = [
        { id: 1, name: "History", category: "📚 History", questions: 15, time: "10", status: "1" },
        { id: 2, name: "Programming", category: "💻 Programming", questions: 20, time: "15", status: "2" },
        { id: 3, name: "Life", category: "🏠 Life", questions: 10, time: "5", status: "1" },
        { id: 4, name: "Programming", category: "💻 Programming", questions: 10, time: "5", status: "1" },
        { id: 5, name: "Geography", category: "🗺️ Geography", questions: 10, time: "5", status: "1" },
        { id: 6, name: "Mathematics", category: "🔢 Mathematics", questions: 10, time: "5", status: "2" },
        { id: 7, name: "Life", category: "🏠 Life", questions: 10, time: "5", status: "1" },
        { id: 8, name: "Science", category: "🧪 Science", questions: 10, time: "5", status: "2" },
    ];

    const testListEl = document.getElementById("test-list");
    const btnAdd = document.getElementById("btnAdd");
    const statusFilter = document.getElementById("statusFilter");
    const inputSearch = document.getElementById("inputSearch");
    const testModal = new bootstrap.Modal(document.getElementById("testModal"));
    const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
    const modalError = document.getElementById("modal-error");
    const testNameInput = document.getElementById("testName");
    const testCategoryInput = document.getElementById("testCategory");
    const testQuestionsInput = document.getElementById("testQuestions");
    const testTimeInput = document.getElementById("testTime");
    const modalTitle = document.getElementById("testModalLabel");

    let editIndex = null;
    let deleteIndex = null;

    function renderTests() {
        let filteredTests = testList;

        const status = statusFilter.value;
        if (status) {
            filteredTests = filteredTests.filter(test => test.status === status);
        }

        const searchText = inputSearch.value.trim().toLowerCase();
        if (searchText) {
            filteredTests = filteredTests.filter(test => test.name.toLowerCase().includes(searchText));
        }

        testListEl.innerHTML = "";
        filteredTests.forEach(test => {
            const row = `
                <tr>
                    <td>${test.id}</td>
                    <td>${test.name}</td>
                    <td>${test.category}</td>
                    <td>${test.questions}</td>
                    <td>${test.time} min</td>
                    <td>
                        <button class="btn yellow" onclick="openEditModal(${test.id})">Sửa</button>
                        <button class="btn red" onclick="openDeleteModal(${test.id})">Xóa</button>
                    </td>
                </tr>
            `;
            testListEl.innerHTML += row;
        });
    }

    function validateTest(name, category, questions, time) {
        if (!name || name.length === null || name.length > 50) {
            return "Test name cannot be longer than 50 characters";
        }
        //find(element)==some(boolean)
        if (testList.some((test, idx) => test.name === name && idx !== editIndex)) {
            return "Test name exist.";
        }
        if (!category) {
            return "Empty category.";
        }
        // if (!questions || questions < 1) {
        //     return "Question number must be greater than 0.";
        // }
        // if (!time || time < 1) {
        //     return "Time must be greater than 0.";
        // }
        return "";
    }

    btnAdd.addEventListener("click", () => {
        editIndex = null;
        modalTitle.textContent = "Thêm bài test";
        testNameInput.value = "";
        testCategoryInput.value = "";
        testQuestionsInput.value = "";
        testTimeInput.value = "";
        modalError.style.display = "none";
        testModal.show();
    });

    window.openEditModal = function (id) {
        editIndex = testList.findIndex(test => test.id === id);
        const test = testList[editIndex];
        modalTitle.textContent = "Sửa bài test";
        testNameInput.value = test.name;
        testCategoryInput.value = test.category;
        testQuestionsInput.value = test.questions;
        testTimeInput.value = test.time;
        modalError.style.display = "none";
        testModal.show();
    };

    window.saveTest = function () {
        const name = testNameInput.value.trim();
        const category = testCategoryInput.value;
        const questions = parseInt(testQuestionsInput.value);
        const time = parseInt(testTimeInput.value);

        const error = validateTest(name, category, questions, time);
        if (error) {
            modalError.textContent = error;
            modalError.style.display = "block";
            return;
        }

        if (editIndex === null) {
            const newTest = {
                id: testList.length > 0 ? testList[testList.length - 1].id + 1 : 1,
                name,
                category,
                questions,
                time
            };
            testList.push(newTest);
        } else {
            testList[editIndex] = {
                id: testList[editIndex].id,
                name,
                category,
                questions,
                time
            };
        }

        testModal.hide();
        renderTests();
    };

    window.openDeleteModal = function (id) {
        deleteIndex = testList.findIndex(test => test.id === id);
        deleteModal.show();
    };

    window.confirmDelete = function () {
        testList.splice(deleteIndex, 1);
        deleteModal.hide();
        renderTests();
    };

    statusFilter.addEventListener("change", renderTests);

    inputSearch.addEventListener("input", renderTests);

    renderTests();
});