function Location(app, location, i) {
    this.index = i;
    this.app = app;
    this.title = location.title;
    this.coordinates = location.coordinates;
    this.map = null;
    this.rect = null;
    this.input = {};
    this.dim = false;
    this.init();
}

Location.prototype.init = function() {
    this.create();
    this.loadMap();
    this.addListeners();
};

Location.prototype.create = function () {
    var container = $('<div id="container-' + this.index + '" class="container"></div>'),
        canvas = $('<div id="canvas-' + this.index + '" class="canvas"></div>'),
        info =  $('<div class="info"></div>'),
        title = $('<h3>' + this.title + '</h3>');
    this.input.lat = $('<input value="' + this.coordinates.lat + '">');
    this.input.lng = $('<input value="' + this.coordinates.lng + '">');
    info.append(title);
    info.append(this.input.lat);
    info.append(this.input.lng);
    container.append(canvas);
    container.append(info);
    $('body').append(container);
};

Location.prototype.loadMap = function() {
    this.map = new google.maps.Map(document.getElementById('canvas-' + this.index), {
        center: this.coordinates,
        zoom: this.app.settings.zoom,
        scrollwheel: false,
        disableDefaultUI: true
    });
};

Location.prototype.addListeners = function() {
    var self = this;
    this.map.addListener('center_changed', function() {
        var center = self.map.getCenter().toJSON();
        self.coordinates = center;
        self.updateInputs();
    });
};



// actions



Location.prototype.updateZoom = function() {
    var self = this;
    this.dim = true;
    this.map.setZoom(this.app.settings.zoom);
    setTimeout(function(){
        self.dim = false;
    }, 1000)
};

Location.prototype.updateInputs = function() {
    this.input.lat.val(this.coordinates.lat);
    this.input.lng.val(this.coordinates.lng);
};

