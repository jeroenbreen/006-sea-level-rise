function Slider(app, tile) {
    this.app = app;
    this.tile = tile;
    this.element = {
        main: null,
        wrapper: null,
        axis: null
    };
    this.init();
}

Slider.prototype.init = function() {
    this.create();
    this.addListeners();
};

Slider.prototype.create = function() {
    var subdivision = 12, ratio = this.getRatio();
    this.element.main = $('<div class="tile-slider"></div>');
    this.element.wrapper = $('<div class="tile-slider-wrapper"></div>');
    this.element.axis = $('<div class="tile-slider-axis"></div>');

    this.element.axis.css('width', (ratio * 100) + '%');

    this.element.wrapper.append(this.element.axis);
    this.element.main.append(this.element.wrapper);

    for (var i = 0, l = subdivision + 1; i < l; i++) {
        var perc = (i / (l - 1)) * 100,
            year = (settings.tile.slider.year.long.max - settings.tile.slider.year.long.min) / subdivision * i + settings.tile.slider.year.long.min,
            div = $('<div class="slider-station" style="left: ' + perc + '%;"><div class="slider-station-label">' + year + '</div></div></div>');
        this.element.axis.append(div);
    }


    this.element.main.insertBefore(this.tile.element.tileLeft.find('.tile-canvas-tools'));
};

Slider.prototype.addListeners = function() {
    var self = this;

    this.element.main.slider({
        orientation: 'horizontal',
        min: settings.tile.slider.year.short.min,
        max: settings.tile.slider.year.short.max,
        value: settings.tile.slider.year.start,
        slide: function(event, ui){
            self.tile.update(self.yearToPercentage(ui.value), ui.value);
        },
        create: function(event, ui){
            self.tile.update(self.yearToPercentage(settings.tile.slider.year.start), settings.tile.slider.year.start);
        }
    });
};


// helpers

Slider.prototype.yearToPercentage = function(year) {
    return (Number(year) - settings.tile.slider.year.short.min) / (settings.tile.slider.year.short.max - settings.tile.slider.year.short.min);
};

Slider.prototype.getRatio = function() {
    return (settings.tile.slider.year.long.max - settings.tile.slider.year.long.min) / (settings.tile.slider.year.short.max - settings.tile.slider.year.short.min);
};




