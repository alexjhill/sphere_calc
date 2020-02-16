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

function getRadius() {
    square = $('#square');
    circle = $('#circle');

    radius = $("#radius").val();

    $(".dot").remove();

    square.css('width', radius * 2 + 'px');
    square.css('height', radius * 2 + 'px');
    circle.css('width', radius * 2 + 'px');
    circle.css('height', radius * 2 + 'px');
}


function placeDot (i) {
    var x = Math.floor((Math.random() * (radius * 2)));
    var y = Math.floor((Math.random() * (radius * 2)));
    var el = $('<div></div>');
    el.addClass('dot');
    el.css('left', x + 'px');
    el.css('top', y + 'px');
    square.append(el);
    return el.position();
}

function addData(chart, label, approxArea, actualArea) {
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(approxArea);
    chart.data.datasets[1].data.push(actualArea);
    chart.update();
}


$( "#run" ).click( async function runSim() {
    $(".dot").remove();
    $("#chart").remove();
    $("#chart-container").append('<canvas id="chart" width="400" height="200"></canvas>');


    var ctx = document.getElementById('chart').getContext('2d');
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
            }
        }
    });

    var pointsInside = 0;
    var totalPoints = 10000;

    for (var i = 0; i < totalPoints; i++) {
        setTimeout(function(i) {
            var centre = {left: radius, top: radius};
            var point = placeDot(i);
            var distance = Math.sqrt(Math.pow((point.left - centre.left), 2) + Math.pow((point.top - centre.top), 2));
            if (distance <= radius) {
                pointsInside++;
            }
            approxArea = pointsInside / i * Math.pow(radius * 2, 2);
            actualArea = Math.PI * Math.pow(radius, 2);
            if (i % 100 == 0) {
                addData(chart, "Point " + i, approxArea, actualArea);
            }
        },1 * i,i);
    }

});
