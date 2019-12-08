// This is when a user inputs a new water log (new date)
function logCreation(date, waterInput) {
    let waterRef = db.collection("Users").doc(currentUser.uid).collection("Log").doc("Water");
    waterRef.set({ [date]: waterInput }, {merge: true}) // Logging the date as the key and the inputted water as the value
        .then(function () {
            alert(`Successfully updated water log for ${date} to ${waterInput} litres.`); // Successful log
            location.reload();
        })
        .catch(function () {
            alert("Water log unsuccessful.") // Unsuccessful log
        });
}

function createLog() {
    let userInput = document.getElementById("waterInputValue").value;
    if (!isNaN(userInput)) {
        if (confirm('Are you sure?')) {
            logCreation(currentDate(), Number(userInput));
        }
    } else {
        alert('Not a valid number.')
    }
}

document.getElementById('waterInputConfirm').onclick = createLog;

function drawLogs() {
    let logsTable = document.createElement('table');
    let tableHeader = document.createElement('tr');
    let datesHead = document.createElement('th');
    let logsHead = document.createElement('th');
    datesHead.innerHTML = 'Date';
    logsHead.innerHTML = 'Water Consumed (L)';
    tableHeader.appendChild(datesHead);
    tableHeader.appendChild(logsHead);
    logsTable.appendChild(tableHeader);
    logsTable.style.margin = "auto";
    logsTable.style.width = "90%";
    logsTable.style.filter = "drop-shadow(0.2em 0.2em 0.05em grey)";
    logsTable.style.textAlign = "center";
    logsTable.style.fontSize = "110%";
    logsTable.style.transform = "translateY(10%)";
    // read from database
    let waterRef;
    try {
        waterRef = db.collection("Users").doc(currentUser.uid).collection("Log").doc("Water");
    } catch {
        console.log('Current water log is empty.')
    }
    let logs;
    try {
        waterRef.get() // Grabbing the data from the document
            .then(function (doc) {
                try {
                    logs = doc.data();
                    let j = 0;
                    let logsSorted = [];
                    for (let logDate in logs) {
                        logsSorted[j] = [logDate, logs[logDate]];
                        j++;
                    }
                    logsSorted.sort().reverse();
                    for (let i = 0; i < logsSorted.length && i < 10; i++) {
                        let rowI = document.createElement('tr');
                        let datesCell = document.createElement('td');
                        let logsCell = document.createElement('td');
                        datesCell.innerHTML = logsSorted[i][0];
                        logsCell.innerHTML = logsSorted[i][1];
                        rowI.appendChild(datesCell);
                        rowI.appendChild(logsCell);
                        logsTable.appendChild(rowI);
                    }
                    document.body.appendChild(document.createElement('br'));
                    document.body.appendChild(logsTable);
                    removeLoadingSymbol();
                } catch(error) {
                    console.log(error)
                }
            })
            .catch(function () {
                console.log("Could not get today's water log."); // If the water log cannot be loaded/no data for the day
            })
    } catch {
        console.log('Water get error');
    }
}

setTimeout(drawLogs, 2000);
