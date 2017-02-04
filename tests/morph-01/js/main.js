var svg = d3.select('svg'),
    paths = [],
    origin = world,
    totalL = getL(),
    usedPoints = 0;

scale(origin);
origin = orderSets(origin);
append();
init();

function init() {
    for (var i = 0, l = origin.length; i < l; i++) {
        var a = origin[i].slice(0),
            b = getDestination(a.length, totalL, usedPoints, 1000, 200).slice(0);
        usedPoints += a.length - 1;
        paths[i].attr('points', join(b));
    }
}


function draw() {
    var t = d3.transition().duration(1200);
    for (var i = 0, l = origin.length; i < l; i++) {
        var a = origin[i].slice(0);
        paths[i].transition(t).attr('points', join(a));
    }
}


function scale(origin) {
    var scale = 2,
        x = 0,
        y = 0;
    for (var i = 0, l = origin.length; i < l; i++) {
        var piece = origin[i];

        for (var j = 0, jl = piece.length; j < jl; j++) {
            piece[j][0] = piece[j][0] / scale + x;
            piece[j][1] = piece[j][1] / scale + y;
        }
    }
}

function orderSets(origin) {
    // put the sets from left to right
    var min = 30,
        compareArray = [],
        newOrder = [];
    for (var i = 0, l = origin.length; i < l; i++) {
        var piece = origin[i],
            avg = getAverage(piece);
        compareArray.push({
            piece: piece,
            avg: avg
        });
    }
    var ordered = sort(compareArray, 'avg', true);
    for (var j = 0, jl = ordered.length; j < jl; j++) {
        if (ordered[j].piece.length > min) {
            newOrder.push(ordered[j].piece);
        }
    }
    return newOrder;

}

function sort(set, property, asc) {
    function compare(a, b) {
        if (a[property] < b[property])
            return asc ?  -1 : 1;
        else if (a[property] > b[property])
            return asc ?  1 : -1;
        else
            return 0;
    }
    return set.sort(compare);
}

function getAverage(piece) {
    var total = 0;
    for (var i = 0, l = piece.length; i < l; i++) {
        total += piece[i][0];
    }
    return total / l;
}

function getL() {
    var totalL = 0;
    for (var i = 0, l = origin.length; i < l; i++) {
        totalL += origin[i].length;
    }
    return totalL;
}

function append() {
    for (var i = 0, l = origin.length; i < l; i++) {
        paths[i] = svg.append('polyline');
    }
}


function join(d) {
    return d.join(' ');
}

function getDestination(thisLength, totalLength, position, width, y) {
    var step = width / totalLength,
        x = position * step,
        destination = [];
    for (var i = 0; i < thisLength; i++) {
        destination.push(x, y);
        x += step;
    }
    return destination;
}
