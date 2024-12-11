// Function to render printers
const renderPrinters = (printerData) => {
    console.log('Rendering Printers:', printerData);
    const printerList = document.querySelector(".bottom-right-part").querySelector(".printer-list");
    const noPrinter = document.querySelector(".bottom-right-part").querySelector(".printer-list").querySelector(".no-printer");

    if (printerData.length == 0) {
        noPrinter.style.display = "block";
    }

    else {
        noPrinter.style.display = "none";
        printerData.forEach(printer => {
            const printerDiv = document.createElement("div");
            printerDiv.classList.add("printer-info");
    
            printerDiv.innerHTML = `
                <div class="printer-name">
                    <p>${printer.name}</p>
                    <p>${printer.currentPaper > 10 ? `${printer.currentPaper}/${printer.maxPaper}` : `<span>${printer.currentPaper}</span>/${printer.maxPaper}`}</p>
                </div>
                <div class="${printer.color === 'With Color' ? 'color' : 'without-color'}">
                    <p>${printer.color}</p>
                </div>
                <div class="${printer.side === '1 Sided' ? 'side-1' : 'side-2'}">
                    <p>${printer.side}</p>
                </div>
                <div class="direction">
                    <p>${printer.direction}</p>
                    <i class="fa-solid fa-location-dot"></i>
                </div>
            `;
            printerList.appendChild(printerDiv);
        });
    }
}

const numberOfPrinter = (printerLength) => {
    const numberOfPrinter = document.querySelector(".number-of-printer");
    numberOfPrinter.textContent = printerLength;
}

const totalPaper = (printerData) => {
    const totalPaper = document.querySelector(".total-paper");
    let total = 0;

    printerData.forEach(printer => {
        total += printer.currentPaper;
    });

    totalPaper.textContent = total;
}

document.addEventListener('DOMContentLoaded', () => {
    const printers = JSON.parse(localStorage.getItem('printers')) || [];
    renderPrinters(printers);
    numberOfPrinter(printers.length);
    totalPaper(printers);
});