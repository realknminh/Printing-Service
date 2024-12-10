async function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const warning = document.querySelector(".warning");

    // fetch user account for JSON file
    const response = await fetch("/UI/user.json");
    const data = await response.json();

    try {   
        const user = data.find(user => user.username === username && user.password === password);
        if (user) {
            // login successful
            warning.textContent = "Login successfull";
            warning.style.color = "green"
            sessionStorage.setItem("loggedInUser", JSON.stringify(user));
            setTimeout(() => {
                if (user.role === "user") {
                    window.location.href = "/UI/User/dashboard.html";
                } else if (user.role === "admin") {
                    window.location.href = "/UI/SPSO/dashboard.html";
                }
            }, 1000);
        } 
    
        else {
            // login failed
            warning.textContent = "Invalid username or password";
            warning.style.color = "red";
        }
    } catch(error) {
        warning.textContent = "An error occurred. Please try again later.";
        warning.style.color = "red";
    }
}

const toggleShow = () => {
    const eye = document.querySelector('.eye i')
    const password = document.getElementById('password');

    if (password.type === 'password') {
        eye.classList.remove('fa-eye-slash');
        eye.classList.add('fa-eye');
        password.type = 'text';
    } else {
        eye.classList.remove('fa-eye');
        eye.classList.add('fa-eye-slash');
        password.type = 'password';
    }
}