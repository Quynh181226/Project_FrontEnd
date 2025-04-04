// register.js
let users = JSON.parse(localStorage.getItem("user")) || [];

// Tạo admin mặc định nếu chưa có
const defaultAdmin = {
    id: 0,
    fullName: "Admin",
    email: "admin@example.com",
    password: "admin123",
    role: "admin"
};

if (!users.some(user => user.role === "admin")) {
    users.push(defaultAdmin);
    localStorage.setItem("user", JSON.stringify(users));
}

const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");
        const usernameError = document.getElementById("usernameError");
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const confirmPasswordError = document.getElementById("confirmPasswordError");

        if (!username || !email || !password || !confirmPassword) {
            console.error("One or more form elements are missing!");
            return;
        }

        let isValid = true;
        usernameError.style.display = "none";
        emailError.style.display = "none";
        passwordError.style.display = "none";
        confirmPasswordError.style.display = "none";

        if (!username.value.trim()) {
            usernameError.style.display = "block";
            isValid = false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
            emailError.style.display = "block";
            isValid = false;
        }
        if (!password.value.trim() || password.value.trim().length < 8) {
            passwordError.style.display = "block";
            isValid = false;
        }
        if (!confirmPassword.value.trim() || confirmPassword.value.trim() !== password.value.trim()) {
            confirmPasswordError.style.display = "block";
            isValid = false;
        }

        if (isValid) {
            const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
            const newUser = {
                id: newId,
                fullName: username.value.trim(),
                email: email.value.trim(),
                password: password.value.trim(),
                role: "user" // Mặc định role là "user"
            };
            users.push(newUser);
            localStorage.setItem("user", JSON.stringify(users));
            username.value = "";
            email.value = "";
            password.value = "";
            confirmPassword.value = "";
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", JSON.stringify(newUser));
            window.location.href = "../pages/dashboard.html"; // Chuyển hướng đến trang dashboard.html
        }
    });
}