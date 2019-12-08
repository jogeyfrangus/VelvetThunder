/// Sitewide javascript functions


function currentDate() {
    let today = new Date();
    let dateToday = today.getFullYear() + '-' + String(Number(today.getMonth()) + 1) + '-' + today.getDate();
    return dateToday.toString();
}

function removeLoadingSymbol() {
    // Remove loading symbol
    try {
        document.getElementById('loadingGifWrapper').remove();
    } catch(error) {
        console.log("Error removing loading symbol: ");
        console.log(error);
    }
}

function getCurrentWaterGoal(givenDate) {
    let goalRef;
    let waterGoal;  // No default value set, so that the code can check when the computation finishes
    try {
        goalRef = db.collection("Users").doc(currentUser.uid).collection("Goals").doc("Water");
        goalRef.get() // Grabbing the data from the document
            .then(function (doc) {
                waterGoal = doc.data()[givenDate];  // Get the goal for the requested date (this used to be ...[currentDate()])
                if (waterGoal !== 0 && !waterGoal) {
                    let waterGoalDates = Object.keys(doc.data());  // Get all dates for water goals (object keys)
                    waterGoalDates.sort(function(a, b){return b - a});  // Sort the dates in descending order
                    while (waterGoalDates[0] > givenDate) {  // Remove largest (newest) date until the given date is reached
                        waterGoalDates.shift();  // removes first-index item
                    }
                    waterGoal = doc.data()[waterGoalDates[0]];  // Set the goal to the most recent goal
                }
            });
    } catch(error) {
        console.log('Error getting current water goal:');
        console.log(error);
        waterGoal = 2;  // default value set here so that the code knows that the computation is done
    }
    let tempPromise = new Promise(function(resolve, reject) {  // Create a temporary promise that only resolves when waterGoal is defined
        let checkInterval = setInterval(function() {
            if (waterGoal !== undefined) {
                clearInterval(checkInterval);
                console.log('The current goal is ' + String(waterGoal) + 'L');  // temporary, for debugging
                resolve(waterGoal);
            }
        }, 50);
    });
    return tempPromise
}

function getCurrentWater(givenDate) {
    let waterRef;
    let currentWater;
    try {
        waterRef = db.collection("Users").doc(currentUser.uid).collection("Log").doc("Water");
        waterRef.get() // Grabbing the data from the document
            .then(function (doc) {
                currentWater = doc.data()[givenDate];
                if (!currentWater) {
                    currentWater = 0;
                }
            });
    } catch(error) {
        console.log('Error getting current water log:');
        console.log(error);
    }
    let tempPromise = new Promise(function (resolve, reject) {
        let checkInterval = setInterval(function () {
            if (currentWater !== undefined) {
                clearInterval(checkInterval);
                resolve(currentWater);
            }
        }, 50);
    });
    return tempPromise
}

