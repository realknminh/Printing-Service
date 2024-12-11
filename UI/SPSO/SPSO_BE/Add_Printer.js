document.querySelector('.form-add').addEventListener('submit', addPrinter);

function openModelAdd() {
    document.querySelector('.add-printer').style.display = 'flex';
}

function closeModelAdd() {
    document.querySelector('.add-printer').style.display = 'none';
    window.location.reload(true);
}

async function addPrinter(event) {
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

    try {
        const response = await fetch('/UI/printer.json');
        const printers = await response.json();
        printers.push(newPrinter);

        await fetch('/UI/printer.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(printers)
        });

        location.reload();
    } catch (error) {
        console.error('Error adding printer:', error);
    }
}
