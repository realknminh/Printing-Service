// Function to render printers
function renderPrinters(printerData) {
    const printerList = document.querySelector(".bottom-right-part").querySelector(".printer-list");
    const noPrinter = document.querySelector(".no-printer");

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

function numberOfPrinter(printerLength) {
    const numberOfPrinter = document.querySelector(".number-of-printer");
    numberOfPrinter.textContent = printerLength;
}

// Fetch JSON data from a file
fetch("/UI/user.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

        if (!loggedInUser) {
            window.location.href = "/UI/Login/login.html";
            return;
        }

        const user = data.find(user => user.id === loggedInUser.id);

        if (!user) {
            window.location.href = "/UI/Login/login.html";
            return;
        }

        if (user.printers && user.printers.length >= 0)  {
            renderPrinters(user.printers);
            numberOfPrinter(user.printers.length);
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });