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
    window.location.reload(true);
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

const savePrinterData = (event) => {
    event.preventDefault();

    const printerName = document.getElementById('printer-name').value;
    const currentPaper = document.getElementById('current-paper').value;
    const maxPaper = document.getElementById('max-paper').value;
    const color = document.getElementById('colors').value === 'with-color' ? 'With Color' : 'Without Color';
    const side = document.getElementById('sides').value === 'side-1' ? '1 Sided' : '2 Sided';
    const direction = document.getElementById('directions').value;

    const newPrinter = {
        id: Date.now(),
        name: printerName,
        currentPaper: parseInt(currentPaper),
        maxPaper: parseInt(maxPaper),
        color: color,
        side: side,
        direction: direction
    };

    console.log('New Printer:', newPrinter);

    const printers = JSON.parse(localStorage.getItem('printers')) || [];
    printers.push(newPrinter);
    localStorage.setItem('printers', JSON.stringify(printers));

    console.log('Updated Printers:', printers);

    renderPrinters(printers);
    renderCurrentPrinter(printers);
};