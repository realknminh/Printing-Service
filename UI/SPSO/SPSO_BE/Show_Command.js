const renderCommands = (commandData) => {
    const commandList = document.querySelector(".bottom-middle-part").querySelector(".command-list");
    const noCommand = document.querySelector(".no-command");

    if (commandData.length === 0) {
        noCommand.style.display = "block";
    }

    else {
        noCommand.style.display = "none";
        commandData.forEach(command => {
            const commandDiv = document.createElement('div');
            commandDiv.classList.add('command');

            commandDiv.innerHTML = `
                <i class="fa-regular fa-file-lines"></i>
                <div class="printing-info">
                    <div class="document">
                        <p>${command.fileName}</p>
                        <p>${command.numPage} page - ${command.date}</p>
                    </div>
                    <div class=${command.color === "With Color" ? "color" : "without-color"}>
                        <p>${command.color}</p>
                    </div>
                    <div class=${command.side === "1 Sided" ? "side-1" : "side-2"}>
                        <p>${command.side}</p>
                    </div>
                </div>
                <p class="user">Printed By ${command.studentName}</p>
            `

            commandList.appendChild(commandDiv);
        });
    }
}

const numberOfCommand = (commandLength) => {
    const numberOfCommand = document.querySelector(".number-of-command");
    numberOfCommand.textContent = commandLength;
}

// Fetch JSON data from a file
fetch("/UI/command.json")
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

        if (data && data.length >= 0) {
            renderCommands(data);
            numberOfCommand(data.length);
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });