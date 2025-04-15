// register.js
let users = JSON.parse(localStorage.getItem("user")) || [
    {
    id: 0,
    fullName: "Admin",
    email: "admin@example.com",
    password: "admin123",
    role: "admin"
}
];
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
            return;
        }

        let check = true;
        usernameError.style.display = "none";
        emailError.style.display = "none";
        passwordError.style.display = "none";
        confirmPasswordError.style.display = "none";

        if (!username.value.trim()) {
            usernameError.style.display = "block";
            check = false;
        }
        //Use regex de validate empty, character
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
        if (!email.value.trim() || !regexEmail.test(email.value.trim())) {
            emailError.style.display = "block";
            check = false;
        }
        if (!password.value.trim() || password.value.trim().length < 8) {
            passwordError.style.display = "block";
            check = false;
        }
        if (!confirmPassword.value.trim() || confirmPassword.value.trim() !== password.value.trim()) {
            confirmPasswordError.style.display = "block";
            check = false;
        }

        if (check) {

            const newUser = {
                id: users[users.length-1].id+1,
                fullName: username.value?.trim(),
                email: email.value?.trim(),
                password: password.value?.trim(),
                role: "user" 
            };

            users.push(newUser);
            localStorage.setItem("user", JSON.stringify(users));

            username.value = "";
            email.value = "";
            password.value = "";
            confirmPassword.value = "";

            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", JSON.stringify(newUser));
            window.location.href = "../pages/login.html";
        }
    });
}