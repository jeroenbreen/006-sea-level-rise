function Collapse(app, element) {
    this.app = app;
    this.element  = element;
    this.body = element.find('.collapse-body');
    this.head = element.find('.collapse-head');
    this.height = 0;
    this.isOpen = element.hasClass('collapse--open') ? true : false;
    this.init();
}

Collapse.prototype.init = function() {
    var self = this;
    this.height = this._getHeight();

    this.head.click(function(){
        if (!self.isOpen) {
            self.open();
        }
    });

    if (this.isOpen) {
        this.doOpen();
    } else {
        this.doClose();
    }
};

Collapse.prototype._getHeight = function() {
    return $(window).outerHeight() - settings.collapse.menu - (settings.collapse.n * settings.collapse.closed);
};


Collapse.prototype.open = function() {
    for (var i = 0, l = this.app.collapses.length; i < l; i++) {
        var collapse = this.app.collapses[i];
        if (collapse === this) {
            collapse.doOpen();
        } else {
            collapse.doClose();
        }
    }
};

Collapse.prototype.doOpen = function() {
    this.element.addClass('collapse--open');
    this.body.css('height', this.height);
    this.isOpen = true;
};

Collapse.prototype.doClose = function() {
    this.element.removeClass('collapse--open');
    this.body.css('height', 0);
    this.isOpen = false;
};