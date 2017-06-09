function Carrousel(app) {
    this.app = app;
    this.element = $('#tiles');
    this.width = $('.tile').outerWidth() + parseInt($('.tile').css('margin-right'));
    this.length = this.app.tiles.length;
    this.current = 0;
    this.init();
}

Carrousel.prototype.init = function() {
    this.element.css('width', ((this.width * this.length) + this.element.css('padding-left')));
    this._moveSlider();
    $('.slider-button-prev').hide();
};

Carrousel.prototype.slideTo = function(n) {
    this.current = n;
    this._moveSlider();
};

Carrousel.prototype._moveSlider = function() {
    var self = this,
        left = ' -' + (this.current * this.width) + 'px';
    this.element.css('left', left);
    $('.tile').each(function(){
        if (this === $('#tile-' + self.current)[0]) {
            $(this).addClass('current');
        } else {
            $(this).removeClass('current');
        }
    });

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

Carrousel.prototype.next = function() {
    this.current++;
    if (this.current >= this.length) {
        this.current = 0;
    }
    this._moveSlider();
};

Carrousel.prototype.prev = function() {
    this.current--;
    if (this.current < 0) {
        this.current = this.length - 1;
    }
    this._moveSlider();
};