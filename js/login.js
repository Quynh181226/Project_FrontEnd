//login.js
//Ctrl+fn+f2: chon nhieu dong giong nhau(nho boi den phan do trc)
//get gtri cua user tren local
let users = JSON.parse(localStorage.getItem("user")) || [];
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailElement = document.getElementById('email1');
        const passwordElement = document.getElementById('password1');
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('pass-error');
        const loginError = document.getElementById('login-error');
        // if (!emailElement || !passwordElement) {
        //     return;
        // }
        const email = emailElement.value?.trim();
        const password = passwordElement.value?.trim();

        emailError.style.display = "none";
        passwordError.style.display = "none";
        loginError.style.display = "none";

        if (!email) {
            emailError.style.display = "block";
        }
        if (!password) {
            passwordError.style.display = "block"; 
        }
        if (!email && !password) {
            loginError.style.display = "block";
            emailError.style.display = "none";
            passwordError.style.display = "none"; 
            return;
        }
       //Ktra ttin dang nhap co ton tai ko
        const user = users.find(function (item) {
            return item.email === email;
            // && item.password === password
        });
        
        if (!user) {
            loginError.textContent = "User or admin not yet register"
            loginError.style.display = "block";
            return;
        }

        if (user) {
            emailElement.value = '';
            passwordElement.value = '';
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", JSON.stringify(user));

            if (user.role === "admin") {
                window.location.href = "../pages/categoryManagement.html"; 
            } else {
                window.location.href = "../pages/dashboard.html"; 
            }
        }
        
    });
}