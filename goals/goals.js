let goalInput = document.getElementById("goalInput");
let goalInputConfirm = document.getElementById("goalInputConfirm");

function currentDate() {
    let today = new Date();
    let dateToday = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    return dateToday.toString();
}

function goalCreation(date, newGoalInput) {
    let goalRef = db.collection("Users").doc(currentUser.uid).collection("Goals").doc("Water");
    goalRef.set({ [date]: newGoalInput }, {merge: true})
        .then(function () {
            alert(`Successfully updated goal log for ${date} to ${newGoalInput} litres.`); // Successful log
            location.reload();
        })
        .catch(function () {
            alert("Goal log unsuccessful.") // Unsuccessful log
        });
}

function createGoal() {
    let userInput = goalInput.value;
    if (!isNaN(userInput)) {
        if (confirm('Are you sure?')) {
            goalCreation(currentDate(), Number(userInput));
        }
    } else {
        alert('Not a valid number.')
    }
}

goalInputConfirm.onclick = createGoal;


function drawGoals() {
    let goalsTable = document.createElement('table');
    let tableHeader = document.createElement('tr');
    let datesHead = document.createElement('th');
    let goalsHead = document.createElement('th');
    datesHead.innerHTML = 'Date';
    goalsHead.innerHTML = 'Water Consumed (L)';
    tableHeader.appendChild(datesHead);
    tableHeader.appendChild(goalsHead);
    goalsTable.appendChild(tableHeader);
    goalsTable.style.margin = "auto";
    goalsTable.style.width = "90%";
    goalsTable.style.filter = "drop-shadow(0.2em 0.2em 0.05em grey)";
    goalsTable.style.textAlign = "center";
    goalsTable.style.fontSize = "110%";
    goalsTable.style.transform = "translateY(30%)";
    // read from database
    let waterRef;
    try {
        waterRef = db.collection("Users").doc(currentUser.uid).collection("Goals").doc("Water");
    } catch {
        console.log('Current water goal is empty.')
    }
    let goals;
    try {
        waterRef.get() // Grabbing the data from the document
            .then(function (doc) {
                try {
                    goals = doc.data();
                    let j = 0;
                    let goalsSorted = [];
                    for (let goalDate in goals) {
                        goalsSorted[j] = [goalDate, goals[goalDate]];
                        j++;
                    }
                    goalsSorted.sort().reverse();
                    for (let i = 0; i < goalsSorted.length && i < 10; i++) {
                        let rowI = document.createElement('tr');
                        let datesCell = document.createElement('td');
                        let goalsCell = document.createElement('td');
                        datesCell.innerHTML = goalsSorted[i][0];
                        goalsCell.innerHTML = goalsSorted[i][1];
                        rowI.appendChild(datesCell);
                        rowI.appendChild(goalsCell);
                        goalsTable.appendChild(rowI);
                    }
                    document.body.appendChild(goalsTable);
                    // Remove loading symbol
                    try {
                        document.getElementById('loadingGifWrapper').remove();
                    } catch(error) {
                        console.log("Error removing loading symbol: ");
                        console.log(error);
                    }
                } catch(error) {
                    console.log(error)
                }
            })
            .catch(function () {
                console.log("Could not get today's water goal."); // If the water goal cannot be loaded/no data for the day
            })
    } catch {
        console.log('Water get error');
    }
}

setTimeout(drawGoals, 2000);
