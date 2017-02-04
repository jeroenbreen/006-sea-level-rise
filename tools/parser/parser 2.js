function parseText() {
    var text = $('#text-in').val(),
        paths = findPaths(text),
        textOut = '';
    for (var i = 0, l = paths.length; i < l; i++) {
        var pathString = cleanPath(paths[i]),
            properties = getProperties(pathString),
            path = getCoordinates(properties, i);
        textOut += path;
    }
    textOut = textOut.substr(0, textOut.length - 2);
    $('#text-out').val('var paths = [' + textOut + '];');
}

function getCoordinates(properties, counter) {

    for (var i = 0, l = properties.length; i < l; i++) {
        var path,
            set = properties[i].split('=');
        if (set.length > 1) {
            var value = set[1];

            // strip hyphens
            if (value[0] === '"') {
                value = value.substr(1, value.length);
            }
            if (value[value.length - 1] === '"') {
                value = value.substr(0, value.length - 1);
            }
            // check if it is a path
            if (set[0] === 'd') {
                path = set[1];
            }
        }
    }
    if (path) {
        return pathTolPolyline(path);
    }
    return '';
}

function pathTolPolyline(path) {
    var poly = path.split(/c| /);
    console.log(poly);
    return poly;

}

function getProperties(path) {
    return path.split('" ');

}

function findPaths(string) {
    var newString = polyToPath(string),
        paths = newString.split('<path ');
    return paths;
}

function polyToPath(string) {
    var newString = replace(string, 'polyline', 'path');
    newString = replace(newString, 'points="', 'd="M');
    return newString;
}




function cleanPath(pathRaw) {
    var path = pathRaw.split('/>')[0];
    path = removeBreaks(path);
    path = removeTabs(path);
    path = removeSpaces(path);
    return path;
}

function removeBreaks(text) {
    var chunks = text.split('\n');
    while (chunks.length > 1) {
        var text = mergeChunks(chunks);
        chunks = text.split('\n');
    }
    return text;
}

function removeTabs(text) {
    var chunks = text.split('\t');
    while (chunks.length > 1) {
        var text = mergeChunks(chunks);
        chunks = text.split('\t');
    }
    return text;
}

function removeSpaces(text) {
    var chunks = text.split('  ');
    while (chunks.length > 1) {
        var text = mergeChunks(chunks);
        chunks = text.split('  ');
    }
    return text;
}

function mergeChunks(chunks) {
    var text ='';
    for (var i = 0, l = chunks.length; i < l; i++) {
        if (chunks[i].length) {
            text += chunks[i] + ' ';
        }
    }
    return text;
}

function replace(string, search, replacement) {
    return string.split(search).join(replacement);
}