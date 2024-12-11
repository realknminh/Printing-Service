const renderCurrentPrinter = (currentPrinterData) => {
    console.log('Rendering Current Printers:', currentPrinterData);
    const currentPrinterList = document.querySelector(".middle-right-part").querySelector(".printer-list");
    const noCurrentPrinter = document.querySelector(".middle-right-part").querySelector(".printer-list").querySelector(".no-current-printer");

    if (currentPrinterData.length === 0) {
        noCurrentPrinter.style.display = "block";
    }

    else {
        noCurrentPrinter.style.display = "none";
        currentPrinterData.forEach(currentPrinter => {
            const currentPrinterDiv = document.createElement("div");
            currentPrinterDiv.classList.add("printer-action");
    
            currentPrinterDiv.innerHTML = `
                <div class="printer-info">
                    <i class="printer-list-icon fa-solid fa-print"></i>
                    <div class="printer-name">
                        <p>${currentPrinter.name}</p>
                        <p>${currentPrinter.direction}</p>
                    </div>
                </div>
                <div class="printer-status">
                    <p>Printing</p>
                    <p class=${currentPrinter.status === "Printing" ? "process" : currentPrinter.status === "Done" ? "done" : "wait"}>
                        ${currentPrinter.status === "Printing" ? `${currentPrinter.currentPaper}/${currentPrinter.maxPaper}` : currentPrinter.status === "Done" ? "Done" : "Waiting"}
                    </p>
                </div>
            `;
            currentPrinterList.appendChild(currentPrinterDiv);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const printers = JSON.parse(localStorage.getItem('printers')) || [];
    renderCurrentPrinter(printers);
});