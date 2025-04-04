// home.js
const currentPage = window.location.pathname.split('/').pop();
if (localStorage.getItem("isLoggedIn") !== "true" && currentPage !== "login.html") {
    window.location.href = "../pages/login.html";
}

// Xử lý đăng xuất
const logoutLink = document.getElementById("logoutLink");
if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");
        window.location.href = "../pages/login.html";
    });
}
////hình như là trang dashboard