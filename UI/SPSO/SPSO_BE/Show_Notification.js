const renderNotification = (notiData) => {
    const notiList = document.querySelector(".top-right-part").querySelector(".list-noti");
    const noNoti = document.querySelector(".top-right-part").querySelector(".list-noti").querySelector(".no-noti");

    if (notiData.length === 0) {
        noNoti.style.display = "block";
    }

    else {
        noNoti.style.display = "none";

        notiData.forEach(noti => {
            const notiDiv = document.createElement("div");
            notiDiv.classList.add("noti");

            notiDiv.innerHTML = `
                <i class="fa-solid fa-circle-info"></i>
                <p>${noti.printerName} is ${noti.status}</p>
            `;
            notiList.appendChild(notiDiv);
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

        if (user.notifications && user.notifications.length >= 0)  {
            renderNotification(user.notifications);
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });