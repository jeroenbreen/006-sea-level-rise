var settings = {
    tile: {
        size: 10,

        slider: {
            year: {
                start: 2017,
                short: {
                    min: 2000,
                    max: 2100
                },
                long: {
                    min: 2000,
                    max: 2300
                }
            }
        }
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
        closed: 36,
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