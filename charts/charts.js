// Load google charts
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(setDates);


function dateSubtract(date, num) {
    let dateSplit = date.split('-');
    for (let i = 0; i < dateSplit.length; i++) {
        dateSplit[i] = Number(dateSplit[i]);
    }
    for (let i = num; i > 0; i--) {
        dateSplit[2]--;
        if (dateSplit[2] <= 0) {
            if (dateSplit[1] === 1) {
                dateSplit[0]--;
                dateSplit[1] = 12;
                dateSplit[2] = 31;
            } else if (dateSplit[1] === 3) {
                dateSplit[1]--;
                dateSplit[2] = 28;
            } else if ([5, 7, 10, 12].includes(dateSplit[1])) {
                dateSplit[1]--;
                dateSplit[2] = 30;
            } else if ([2, 4, 6, 7, 8, 11].includes(dateSplit[1])) {
                dateSplit[1]--;
                dateSplit[2] = 31;
            }
        }
    }
    return dateSplit.join('-');
}

function setDates() {
    let currentDateValue = currentDate();
    let currentDateSplit = currentDateValue.split('-');
    for (let i = 0; i < currentDateSplit.length; i++) {
        if (currentDateSplit[i].length === 1) {
            currentDateSplit[i] = "0" + currentDateSplit[i];
        }
    }
    let initialDateValue = dateSubtract(currentDate(), 7);
    let initialDateSplit = initialDateValue.split('-');
    for (let i = 0; i < initialDateSplit.length; i++) {
        if (initialDateSplit[i].length === 1) {
            initialDateSplit[i] = "0" + initialDateSplit[i];
        }
    }
    document.getElementById('initialDate').value = initialDateSplit.join('-');
    document.getElementById('finalDate').value = currentDateSplit.join('-');
    setTimeout(drawChart, 1500);
}

// Draw the chart and set the chart values
function drawChart() {
    let initial = document.getElementById('initialDate').value;
    let final = document.getElementById('finalDate').value;
    let allDates = getDatesInRange(initial, final);
    let goals = [];
    let logs = [];
    for (let i = 0; i < allDates.length; i++) {
        getCurrentWaterGoal(allDates[i]).then(function (value) {
            goals[i] = Number(value);
        });
        getCurrentWater(allDates[i]).then(function (value) {
            logs[i] = Number(value);
        });
    }
    let checkInterval = setInterval(function () {
        if (logs.length === allDates.length && goals.length === allDates.length) {
            clearInterval(checkInterval);
            console.log('Drawing chart...');  // temporary, for debugging

            let customChartData = [['Date', 'Goal', 'Water']];
            for (let i = 0; i < allDates.length; i++) {
                customChartData.push([allDates[i], goals[i], logs[i]]);
            }

            var data = google.visualization.arrayToDataTable(customChartData);

            // Optional; add a title and set the width and height of the chart
            var options = {
                width: '120%',
                height: 500,
                colors: ['#A7EEF8', '#8AB2ED'],
                animation: {
                    duration: 1000,
                    startup: true,
                    easing: 'inAndOut'
                }
            };

            // Redraw chart based on size of window
            $(window).resize(function () {
                if (this.resizeTO) clearTimeout(this.resizeTO);
                this.resizeTO = setTimeout(function () {
                    $(this).trigger('resizeEnd');
                }, 100)
            });

            // Display the chart inside the <div> element with id="lineChart"
            var chart = new google.visualization.SteppedAreaChart(document.getElementById('lineChart'));
            chart.draw(data, options);
            $(window).on('resizeEnd', function () {
                chart.draw(data, options);
            });

            removeLoadingSymbol();
        }
    }, 50);
}

function getDatesInRange(start, end) {  // Start and end are properly formatted dates, with start being less than end
    let dates = [start];
    let date = start;
    while (true) {
        let dateSplitString = date.split('-');
        let dateSplit = [];
        for (let i = 0; i < dateSplitString.length; i++) {
            dateSplit.push(Number(dateSplitString[i]));
        }
        let endSplitString = end.split('-');
        let endSplit = [];
        for (let i = 0; i < endSplitString.length; i++) {
            endSplit.push(Number(endSplitString[i]));
        }
        dateSplit[2] ++;
        if (dateSplit[1] === 1 && dateSplit[2] >= 29) {
            dateSplit[2] = 1;
            dateSplit[1] ++;
        } else if ([1, 3, 5, 7, 8, 10, 12].includes(dateSplit[1]) && dateSplit[2] >= 32) {
            dateSplit[2] = 1;
            dateSplit[1] ++;
        } else if ([2, 4, 6, 9, 11].includes(dateSplit[1]) && dateSplit[2] >= 31) {
            dateSplit[2] = 1;
            dateSplit[1] ++;
        }
        if (dateSplit[1] >= 13) {
            dateSplit[0] ++;
            dateSplit[1] = 1;
        }
        date = dateSplit.join('-');
        dates.push(date);
        if (dateSplit[0] >= endSplit[0] && dateSplit[1] >= endSplit[1] && dateSplit[2] >= endSplit[2]) {
            break;
        }
    }
    return dates
}
