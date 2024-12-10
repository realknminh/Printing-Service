const signout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem('currentSubmitForm');
    window.location.href = "/UI/Login/login.html";
}