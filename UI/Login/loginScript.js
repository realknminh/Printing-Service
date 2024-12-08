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
};

const validateLogin = (event) => {
    const form = document.getElementById("login");

    // Check if the form is valid
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();

        return false;
    }

    return true;
};