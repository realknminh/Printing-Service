const renderCurrentPrinter = (currentPrinterData) => {
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

        if (user.currentPrinters && user.currentPrinters.length >= 0)  {
            renderCurrentPrinter(user.currentPrinters);
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });