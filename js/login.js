// login.js
let users = JSON.parse(localStorage.getItem("user")) || [];

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
            const user = users.find(function (item) {
                return item.email === email && item.password === password;
            });

            if (user) {
                emailElement.value = '';
                passwordElement.value = '';
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("currentUser", JSON.stringify(user));

                if (user.role === "admin") {
                    window.location.href = "../pages/categoryManagement.html"; // Admin -> codelai.html
                } else {
                    window.location.href = "../pages/dashboard.html"; // User -> dashboard.html
                }
            } else {
                loginError.style.display = "block"; // Hiển thị lỗi nếu đăng nhập sai
            }
        }
    });
}