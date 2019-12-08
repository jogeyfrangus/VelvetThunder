// Load google charts
google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(getWaterLog);

// Reading the information stored inside the "Water" document
function getWaterLog() {
    setTimeout(function () {
        let dailyWaterLogPromise = getCurrentWater(currentDate());
        let currentWaterGoalPromise = getCurrentWaterGoal(currentDate());
        let dailyWaterLog;
        let currentWaterGoal;
        dailyWaterLogPromise.then(function (waterOutput) {
                dailyWaterLog = waterOutput;
            }
        ).catch(function () {
            console.log('Error: dailyWaterLogPromise not fulfilled')
        });
        currentWaterGoalPromise.then(function (waterGoalOutput) {
                currentWaterGoal = waterGoalOutput;
            }
        ).catch(function () {
            console.log('Error: currentWaterGoalPromise not fulfilled')
        });
        let checkInterval = setInterval(function () {
            if (dailyWaterLog !== undefined && currentWaterGoal !== undefined) {
                clearInterval(checkInterval);
                console.log('Drawing chart...');  // temporary, for debugging
                drawChart(dailyWaterLog, currentWaterGoal);
            }
        }, 50);
    }, 1000);
}

// Draw the chart and set the chart values
function drawChart(water, waterGoal) {
    var data = google.visualization.arrayToDataTable([
        ['Daily Log', 'Litres'],
        ['Water Consumed', water],
        ['Remaining Goal', waterGoal - water]
    ]);

    // Optional; add a title and set the width and height of the chart
    var options = {
        chartArea: {
            width: '100%',
        },
        legend: {
            alignment: 'center',
            position: 'top',
        },
        colors: ['#A7EEF8', '#8AB2ED']
    };

    // Redraw chart based on size of window
    $(window).resize(function () {
        if (this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function () {
            $(this).trigger('resizeEnd');
        }, 100)
    });
    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
    // Resize the window based on if the window size has changed
    $(window).on('resizeEnd', function () {
        chart.draw(data, options);
    });

    removeLoadingSymbol();
}
