var square;
var circle;
var radius;
var estimatedArea;
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



function calculateArea() {
    $(".dot").remove();
    var totalPoints = 1000;
    var pointsInside = 0;
    for (i = 0; i < totalPoints; i++) {
        var x = Math.floor((Math.random() * (radius * 2)));
        var y = Math.floor((Math.random() * (radius * 2)));
        var el = $('<div></div>');
        el.addClass('dot');
        el.css('left', x + 'px');
        el.css('top', y + 'px');
        square.append(el);
        var centre = {left: radius, top: radius};
        var point = el.position();
        var distance = Math.sqrt(Math.pow((point.left - centre.left), 2) + Math.pow((point.top - centre.top), 2));
        if (distance <= radius) {
            pointsInside++;
        }
    }
    estimatedArea = pointsInside / totalPoints * Math.pow(radius * 2, 2);
    actualArea = Math.PI * Math.pow(radius, 2);
    console.log("Estimated area: " + estimatedArea + "cm2");
    console.log("Actual area: " + Math.floor(actualArea) + "cm2");
    console.log("Out by: " + Math.floor(Math.abs(actualArea - estimatedArea)) + "cm2");
    console.log("");
}
