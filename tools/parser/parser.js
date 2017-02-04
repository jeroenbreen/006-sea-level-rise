function init() {
    w3IncludeHTML();

}

function parse() {
    var paths = $('path'),
        lastX,
        lastY,
        string = 'var world = [';
    for (var i = 0, l = paths.length; i < l; i++) {
        var path = paths[i],
            segList = path.pathSegList;
        console.log(segList);
        string += '[';
        for (var j = 0, jl = segList.length; j < jl; j++) {
            var c = segList[j],
                type = c.pathSegTypeAsLetter;
            //console.log(type);
            if (type !== 'z') {
                var x, y;
                if (type !== 'L' && type !== 'M' && type !== 'z' && type !== 'S' && type !== 'C') {
                    x = c.x + lastX;
                    y = c.y + lastY;
                } else {
                    x = c.x;
                    y = c.y;
                }
                string += '[' + x + ',' + y + ']';
                if (segList[j + 1] && segList[j + 1].pathSegTypeAsLetter !== 'z') {
                    string += ',';
                }
            }
            lastX = x;
            lastY = y;
        }
        string += ']';
        if (paths[i + 1]) {
            string += ',';
        }
    }
    string += '];';
    $('#text-out').val(string);
}

init();