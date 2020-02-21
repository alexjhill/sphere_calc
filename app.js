// TODO:
// add params including:
//     frequency of points on chart
//     size of circle
//     number of total points
// add stats including end distance, average distance, lowest distance etc.

var square;
var circle;
var radius;
var approxArea;
var actualArea;

$(window).on("load resize", function () {
    var width = $('#square').width();
    radius = width / 2;
    $('#square').css('height', width + 'px');
    loadAreaChart();
    loadPiChart();
});

function loadAreaChart() {
    var ctx = document.getElementById('area-chart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            datasets: [{
                label: 'Approximated Area',
                backgroundColor: 'tomato',
                fill: false,
                borderColor: 'tomato'
            }, {
                label: 'Actual Area',
                backgroundColor: 'lightgreen',
                fill: false,
                borderColor: 'lightgreen'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Area (cm2)'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'No. of Points'
                    }
                }]
            },
            title: {
                display: true,
                text: 'Approximated Area of the Circle Compared to the Actual Area of the Circle'
            }
        }
    });
    return chart;
}
function loadPiChart() {
    var ctx = document.getElementById('pi-chart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            datasets: [{
                label: 'Approximated value of π',
                backgroundColor: 'tomato',
                fill: false,
                borderColor: 'tomato'
            }, {
                label: 'Actual value of π',
                backgroundColor: 'lightgreen',
                fill: false,
                borderColor: 'lightgreen'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Value of π'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'No. of Points'
                    }
                }]
            },
            title: {
                display: true,
                text: 'Approximated Value of π Compared to the Actual Value of π'
            }
        }
    });
    return chart;
}


function placeDot () {
    var x = Math.floor((Math.random() * (radius * 2)));
    var y = Math.floor((Math.random() * (radius * 2)));
    var el = $('<div></div>');
    el.addClass('dot');
    el.css('left', x + 'px');
    el.css('top', y + 'px');
    $('#square').append(el);
    return el.position();
}

function addData(chart, label, approx, actual) {
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(approx);
    chart.data.datasets[1].data.push(actual);
    chart.update();
}


$( "#run" ).click( async function runSim() {
    $(".dot").remove();
    $("#area-chart").remove();
    $("#pi-chart").remove();
    $("#chart-container").append('<canvas id="area-chart" width="400" height="200"></canvas>');
    $("#chart-container").append('<canvas id="pi-chart" width="400" height="200"></canvas>');

    var totalPoints = $('#number-of-points').val();
    var chartGranularity = $('#chart-granularity').val();

    var areaChart = loadAreaChart();
    var piChart = loadPiChart();

    var pointsInside = 0;

    var lowestAreaDifference;
    var finalAreaDifference;
    var x;
    var lowestPiDifference;
    var finalPiDifference;
    var y;

    for (var i = 0; i < totalPoints; i++) {
        setTimeout(function(i) {
            var centre = {left: radius, top: radius};
            var point = placeDot();
            var distance = Math.sqrt(Math.pow((point.left - centre.left), 2) + Math.pow((point.top - centre.top), 2));
            if (distance <= radius) {
                pointsInside++;
            }
            approxArea = pointsInside / i * Math.pow(radius * 2, 2);
            actualArea = Math.PI * Math.pow(radius, 2);
            approxPi = (pointsInside / i) * 4;
            actualPi = Math.PI;

            if ((i + 1) % chartGranularity == 0) {
                x = Math.abs(actualArea - approxArea);
                if (x < lowestAreaDifference || lowestAreaDifference == undefined) {
                    lowestAreaDifference = x;
                }
                y = Math.abs(actualPi - approxPi);
                if (y < lowestPiDifference || lowestPiDifference == undefined) {
                    lowestPiDifference = y;
                }
                addData(areaChart, i + 1 + " points", approxArea, actualArea);
                addData(piChart, i + 1 + " points", approxPi, actualPi);
            }

            if (i + 1 == totalPoints) {
                lowestAreaDifference = Math.round(lowestAreaDifference);
                finalAreaDifference = Math.round(Math.abs(actualArea - approxArea));

                lowestPiDifference = lowestPiDifference.toFixed(10);
                finalPiDifference = Math.abs(actualPi - approxPi).toFixed(10);

                $("#output-info").html("<b>Area</b><br>Lowest difference: " + lowestAreaDifference + "cm2" + "<br>" + "Final difference: " + finalAreaDifference + "cm2<br><b>PI</b><br>Lowest difference: " + lowestPiDifference + "<br>" + "Final difference: " + finalPiDifference);
            }
        },1 * i,i);
    }

});
