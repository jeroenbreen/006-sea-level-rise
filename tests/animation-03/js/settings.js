var settings = {
    water: {
        size: 10
    },
    steps: 200,
    color: {
        land: 'EBFFD9',
        water: '3ad',
        tile: '000'
    }
};

var pickers = {};
settings.water.current = settings.water.min;
settings.water.delta = (settings.water.max - settings.water.min) / settings.steps;

$(window).load(function(){
    addColorPicker('land');
    addColorPicker('water');
    addColorPicker('tile');
});

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