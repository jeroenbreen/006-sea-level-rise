function App() {
    this.view = {
        texture: true,
        camera: true
    };
    this.tiles = [];
    this.init();
}

App.prototype.init = function() {
    for (var i = 0, l = tiles.length; i < l; i++) {
        var tile = new Tile(this, tiles[i]);
        this.tiles.push(tile);
    }
};

App.prototype.slide = function(value) {
    for (var i = 0, l = this.tiles.length; i < l; i++) {
        this.tiles[i].slide(value);
    }
};



// styling

App.prototype.toggleCamera = function() {
    this.view.camera = !this.view.camera;
    for (var i = 0, l = this.tiles.length; i < l; i++) {
        this.tiles[i].setCamera(this.view.camera);
    }
};

App.prototype.toggleView = function() {
    this.view.texture = !this.view.texture;
    for (var i = 0, l = this.tiles.length; i < l; i++) {
        this.tiles[i].setView(this.view.texture);
    }
};

App.prototype.updateColor = function(type) {
    var color = hexToRgb(pickers[type].toString());
    for (var i = 0, l = this.tiles.length; i < l; i++) {
        this.tiles[i].setColor(type, color);
    }
};