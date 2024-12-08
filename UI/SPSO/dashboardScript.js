const setActiveSideBar = () => {
    const sideBarContainer = document.querySelector("aside");

    const buttons = sideBarContainer.getElementsByClassName("side-button");

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
}

const openModelAdd = () => {
    const form = document.querySelector(".add-printer");
    form.style.display = "flex";
}

const closeModelAdd = () => {
    const form = document.querySelector(".add-printer");
    form.style.display = "none";
    form.reset();
}

const validateForm = (event) => {
    const form = document.getElementById("info");

    // Check if the form is valid
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();

        return false;
    }

    // If the form is valid, close the modal
    closeModelAdd();
    return true;
};