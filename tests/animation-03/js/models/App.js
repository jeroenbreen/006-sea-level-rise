function App() {
    this.view = {
        texture: true,
        camera: true
    };
    this.tiles = [];
    this.slider = null;
    this.timer = null;
    this.status = {
        playing: true
    };
    this.init();
}

App.prototype.init = function() {
    var self = this;
    for (var i = 0, l = tiles.length; i < l; i++) {
        var tile = new Tile(this, tiles[i]);
        this.tiles.push(tile);
    }
    this.slider = new Slider(this);
    setTimeout(function(){
        self.stop();
    }, 2000);
};

App.prototype.stop = function(value) {
    this.status.playing = false;
    for (var i = 0, l = this.tiles.length; i < l; i++) {
        this.tiles[i].stop();
    }
    console.log('stop');
};

App.prototype.play = function(value) {
    this.status.playing = true;
    for (var i = 0, l = this.tiles.length; i < l; i++) {
        this.tiles[i].run();
    }
    console.log('play');
};

App.prototype.delayStop = function() {
    var self = this;
    this.timer = setTimeout(function(){
        self.stop();
    }, 500)
};

App.prototype.slide = function(value) {
    var self = this;
    if (this.timer) {
        clearTimeout(this.timer);
    }
    if (!this.status.playing) {
        this.play();
    }
    for (var i = 0, l = this.tiles.length; i < l; i++) {
        this.tiles[i].slide(value);
    }
    this.timer = setTimeout(function(){
        self.stop();
    }, 500)
};



// styling

App.prototype.toggleCamera = function() {
    this.play();
    this.view.camera = !this.view.camera;
    for (var i = 0, l = this.tiles.length; i < l; i++) {
        this.tiles[i].setCamera(this.view.camera);
    }
    this.delayStop();
};

App.prototype.toggleView = function() {
    this.play();
    this.view.texture = !this.view.texture;
    for (var i = 0, l = this.tiles.length; i < l; i++) {
        this.tiles[i].setView(this.view.texture);
    }
    this.delayStop();
};

App.prototype.toggleSize = function() {
    this.play();
    $('.wrapper').toggleClass('minimized');
    for (var i = 0, l = this.tiles.length; i < l; i++) {
        this.tiles[i].resize();
    }
    this.delayStop();
};

App.prototype.updateColor = function(type) {
    var color = hexToRgb(pickers[type].toString());
    for (var i = 0, l = this.tiles.length; i < l; i++) {
        this.tiles[i].setColor(type, color);
    }
};