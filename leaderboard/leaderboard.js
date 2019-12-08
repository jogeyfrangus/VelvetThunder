function drawLeaderboard() {
    let lbTable = document.createElement('table');
    let tableHeader = document.createElement('tr');
    let positionHead = document.createElement('th');
    let usersHead = document.createElement('th');
    let waterHead = document.createElement('th');
    positionHead.innerHTML = 'Position';
    usersHead.innerHTML = 'Name';
    waterHead.innerHTML = 'Water Consumed (L)';
    tableHeader.appendChild(positionHead);
    tableHeader.appendChild(usersHead);
    tableHeader.appendChild(waterHead);
    lbTable.appendChild(tableHeader);
    lbTable.style.margin = "auto";
    lbTable.style.width = "90%";
    lbTable.style.filter = "drop-shadow(0.2em 0.2em 0.05em grey)";
    lbTable.style.textAlign = "center";
    lbTable.style.fontSize = "110%";
    lbTable.style.transform = "translateY(10%)";
    // read from database
    let lbRef;
    try {
        lbRef = db.collection("Daily");
    } catch(error) {
        console.log(error)
    }
    try {
        lbRef.where("Date", "==", currentDate()).orderBy("Water", "desc").limit(10).get() // Grabbing the data from the document
            .then(function (querySnapshot) {
                try {
                    let i = 1;
                    querySnapshot.forEach(function(doc) {
                        let user = doc.data();
                        let rowI = document.createElement('tr');
                        let positionCell = document.createElement('td');
                        let userCell = document.createElement('td');
                        let waterCell = document.createElement('td');
                        positionCell.innerHTML = i.toString();
                        userCell.innerHTML = user["Name"];
                        waterCell.innerHTML = user["Water"];
                        rowI.appendChild(positionCell);
                        rowI.appendChild(userCell);
                        rowI.appendChild(waterCell);
                        lbTable.appendChild(rowI);
                        i++;
                    });
                    document.body.appendChild(document.createElement('br'));
                    document.body.appendChild(lbTable);
                    removeLoadingSymbol();
                } catch(error) {
                    console.log(error)
                }
            })
            .catch(function (error) {
                console.log("Query error:");
                console.log(error);
            })
    } catch {
        console.log('Water get error');
    }
}

setTimeout(drawLeaderboard, 2000);
