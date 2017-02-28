function Slider(app) {
    this.app = app;
    this.element = $('#tiles');
    this.width = $('.tile').outerWidth() + parseInt($('.tile').css('margin-right'));
    this.length = this.app.tiles.length;
    this.current = 0;
    this.init();
}

Slider.prototype.init = function() {
    this.element.css('width', ((this.width * this.length) + this.element.css('padding-left')));
    this.goto();
    $('.slider-button-prev').hide();
};

Slider.prototype.goto = function() {
    var left = ' -' + (this.current * this.width) + 'px';
    this.element.css('left', left);

    if (this.current === 0) {
        $('.slider-button-prev').fadeOut(200);
    } else {
        $('.slider-button-prev').fadeIn(200);
    }

    if (this.current === (this.length - 1)) {
        $('.slider-button-next').fadeOut(200);
    } else {
        $('.slider-button-next').fadeIn(200);
    }
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
        this.current = this.length - 1;
    }
    this.goto();
};