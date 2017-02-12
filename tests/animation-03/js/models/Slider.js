function Slider(app) {
    this.app = app;
    this.element = $('#tiles');
    this.width = $('.tile').outerWidth() + parseInt($('.tile').css('margin-right'));
    this.length = this.app.tiles.length;
    this.current = 0;
    this.init();
}

Slider.prototype.init = function() {
    this.element.css('width', (this.width * this.length));
    this.goto();
};

Slider.prototype.goto = function() {
    var offset = (this.current + 0.5) * this.width,
        left = 'calc(50% - ' + offset + 'px)';
    this.element.css('left', left);
};

Slider.prototype.next = function() {
    this.current++;
    if (this.current >= this.length) {
        this.current = 0;
    }
    this.goto();
};

Slider.prototype.prev = function() {
    this.current--;
    if (this.current < 0) {
        this.current = this.length;
    }
    this.goto();
};