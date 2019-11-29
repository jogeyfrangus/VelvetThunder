function getCurrentWaterGoal(givenDate) {
    let goalRef;
    try {
        goalRef = db.collection("Users").doc(currentUser.uid).collection("Goals").doc("Water");
    } catch {
        console.log('Current water log is empty.')
    }
    let waterGoal;  // No default value set, so that the code can check when the computation finishes
    try {
        goalRef.get() // Grabbing the data from the document
            .then(function (doc) {
                waterGoal = doc.data()[givenDate];  // Get the goal for the requested date (this used to be ...[currentDate()])
                if (waterGoal !== 0) {
                    if (!waterGoal) {
                        let waterGoalDates = Object.keys(doc.data());  // Get all dates for water goals (object keys)
                        waterGoalDates.sort(function(a, b){return b - a});  // Sort the dates in descending order
                        while (waterGoalDates[0] > givenDate) {  // Remove largest (newest) date until the given date is reached
                            waterGoalDates.shift();  // removes first-index item
                        }
                        try {
                            waterGoal = doc.data()[waterGoalDates[0]];  // Set the goal to the most recent goal
                        } catch {
                            console.log("Error: No water goals found!");
                            waterGoal = 2.5;  // default value set here so that the code knows that the computation is done
                        }
                    }
                }
            })
            .catch(function () {
                console.log("Could not get current goal."); // If the water log cannot be loaded/no data for the day
                waterGoal = 2.5;  // default value set here so that the code knows that the computation is done
            })
    } catch {
        console.log('Goal get error');
        waterGoal = 2.5;  // default value set here so that the code knows that the computation is done
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
    try {
        waterRef = db.collection("Users").doc(currentUser.uid).collection("Log").doc("Water");
    } catch {
        console.log('Current water log is empty.')
    }
    let currentWater;
    try {
        waterRef.get() // Grabbing the data from the document
            .then(function (doc) {
                currentWater = doc.data()[givenDate];
                if (!currentWater) {
                    currentWater = 0;
                }
            })
            .catch(function () {
                console.log("Could not get today's water log."); // If the water log cannot be loaded/no data for the day
                currentWater = 0;
            })
    } catch {
        console.log('Water get error');
        currentWater = 0;
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
