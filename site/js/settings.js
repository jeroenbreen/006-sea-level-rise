var settings = {
    tile: {
        size: 10
    },
    city: {
        size: 0.3,
        color: 'fff'
    },
    color: {
        land: 'EBFFD9',
        water: '3ad',
        tile: 'fff'
    },
    collapse: {
        menu: 50,
        closed: 50,
        n: 3
    }
};

var pickers = {};




function addColorPicker(type) {
    var set = $('<div class="color-set"></div>'),
        string = "app.updateColor('" + type + "')",
        input = $('<input onchange="' + string + '">'),
        label = '<span>Color ' + type + '</span>',
        picker = new jscolor(input[0]);
    set.append(input);
    set.append(label);
    pickers[type] = picker;
    picker.fromString(settings.color[type]);
    $('.colors-sets').append(set);
}