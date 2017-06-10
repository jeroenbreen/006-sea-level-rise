function Slider(app, tile) {
    this.app = app;
    this.tile = tile;
    this.status = {
        term: 'short',
        ratio: this.getRatio(),
        current: 0
    };
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
    var subdivision = 12;
    this.element.main = $('<div class="tile-slider"></div>');
    this.element.wrapper = $('<div class="tile-slider-wrapper"></div>');
    this.element.axis = $('<div class="tile-slider-axis"></div>');

    this.element.axis.css('width', (this.status.ratio * 100) + '%');

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
    this.status.current = this.yearToPercentage(settings.tile.slider.year.start) * 100;
    this.element.main.slider({
        orientation: 'horizontal',
        min: 0,
        max: 100,
        value: self.status.current,
        slide: function(event, ui){
            var percentage = ui.value / 100;
            if (self.status.term === 'long') {
                percentage *= self.status.ratio;
            }
            self.tile.update(percentage, self.percentageToYear(ui.value / 100));
            self.status.current = Number(ui.value);
        },
        create: function(event, ui){
            self.tile.update(self.yearToPercentage(settings.tile.slider.year.start), settings.tile.slider.year.start);
        }
    });
};


// toggle

Slider.prototype.setLength = function(setting) {
    if (setting !== this.status.term) {
        this.status.term = setting;

        if (this.status.term === 'long') {
            this.element.axis.css('width', '100%');
            this.status.current /= this.status.ratio;
            this.element.main.slider('value', this.status.current);
            this.tile.element.tools.slider.shortTerm.removeClass('tile-canvas-tool-slider-button--active');
            this.tile.element.tools.slider.longTerm.addClass('tile-canvas-tool-slider-button--active');
        } else {
            this.element.axis.css('width', (this.status.ratio * 100) + '%');
            this.status.current *= this.status.ratio;
            if (this.status.current > 100) {
                this.status.current = 100;
                this.tile.update(1, this.percentageToYear(1));
            }
            this.element.main.slider('value', this.status.current);
            this.tile.element.tools.slider.shortTerm.addClass('tile-canvas-tool-slider-button--active');
            this.tile.element.tools.slider.longTerm.removeClass('tile-canvas-tool-slider-button--active');
        }
    }
};


// helpers

Slider.prototype.yearToPercentage = function(year) {
    return (year - settings.tile.slider.year[this.status.term].min) / (settings.tile.slider.year[this.status.term].max - settings.tile.slider.year[this.status.term].min);
};

Slider.prototype.percentageToYear = function(percentage) {
    return (settings.tile.slider.year[this.status.term].max - settings.tile.slider.year[this.status.term].min) * percentage + settings.tile.slider.year[this.status.term].min;
};

Slider.prototype.getRatio = function() {
    return (settings.tile.slider.year.long.max - settings.tile.slider.year.long.min) / (settings.tile.slider.year.short.max - settings.tile.slider.year.short.min);
};




