// global.js
let arr = JSON.parse(localStorage.getItem("user")) || []; // Đổi key thành "user"
const localSet = () => localStorage.setItem("user", JSON.stringify(arr)); // Đổi key thành "user"

// Kiểm tra trạng thái đăng nhập và điều hướng nếu chưa đăng nhập
function checkLoginStatus() {
    const currentPage = window.location.pathname.split('/').pop();
    if (localStorage.getItem("isLoggedIn") !== "true" && currentPage !== "login.html") {
        window.location.href = "../pages/login.html";
    }
}

checkLoginStatus();

// Xử lý đăng nhập
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const emailElement = document.getElementById('email1');
        const passwordElement = document.getElementById('password1');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        const loginError = document.getElementById('loginError');

        if (!emailElement || !passwordElement) {
            console.error("Email or password input not found in the DOM.");
            return;
        }

        const email = emailElement.value.trim();
        const password = passwordElement.value.trim();

        let isValid = true;
        emailError.style.display = "none";
        passwordError.style.display = "none";
        loginError.style.display = "none";

        if (!email) {
            emailError.style.display = "block";
            isValid = false;
        }
        if (!password) {
            passwordError.style.display = "block";
            isValid = false;
        }

        if (isValid) {
            const user = arr.find(function (item) {
                return item.email === email && item.password === password; // Đổi pass thành password
            });

            if (user) {
                emailElement.value = '';
                passwordElement.value = '';
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("currentUser", JSON.stringify(user));

                if (user.role === "admin") {
                    window.location.href = "../pages/admin.html";
                } else {
                    window.location.href = "../pages/home.html";
                }
            } else {
                loginError.style.display = "block";
            }
        }
    });
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