function App() {
    this.view = {
        texture: true,
        camera: false
    };
    this.tiles = [];
    this.slider = null;
    this.timer = null;
    this.status = {
        intro: true,
        playing: true
    };
    this.graphs = {
        ppm: null,
        greenland: null
    };
    this.init();
}

App.prototype.init = function() {
    var self = this;
    this.domActions();
    for (var i = 0, l = tiles.length; i < l; i++) {
        var tile = new Tile(this, tiles[i], i, false, $('#tiles'));
        this.tiles.push(tile);
    }
    this.slider = new Slider(this);
    this.graphs.ppm = new PpmGraph(document.getElementById('ppm-graph'));
    //this.graphs.greenland = new Tile(this, greenland, 999, true, $('#tile-greenland'))
};

App.prototype.domActions = function() {
    var introText = $('#intro-text');
    introText.css('height', introText.outerHeight(true))
};


// navigation

App.prototype.openChapter = function(chapter, fast) {
    var self = this,
        timeout = 0;
    if (this.status.intro) {
        this.collapseMenu();
        timeout = 1000;
    }
    if (fast) {
        timeout = 0;
    }
    setTimeout(function(){
        self._setChapter(chapter);
    }, timeout);
};

App.prototype._setChapter = function(chapter) {
    $('.chapter').each(function(){
        if ($(this).attr('id') === 'chapter-' + chapter) {
            $(this).addClass('current-chapter');
        } else {
            $(this).removeClass('current-chapter');
        }
    });

    $('.menu-button').each(function(){
        if ($(this).attr('id') === 'menu-' + chapter) {
            $(this).addClass('current-menu');
        } else {
            $(this).removeClass('current-menu');
        }
    })
};

App.prototype.jumpToTile = function(tileNr) {
    var self = this;
    this._setChapter('cases');
    setTimeout(function(){
        self.slider.slideTo(tileNr);
    }, 500);

};

App.prototype.collapseMenu = function() {
    var introText = $('#intro-text');
    introText.css('height', 0);
    setTimeout(function(){
        $('body').addClass('active');
        introText.hide();
    }, 500);
    this.status.intro = false;
};





// babylon

App.prototype.stop = function(value) {
    this.status.playing = false;
    for (var i = 0, l = this.tiles.length; i < l; i++) {
        this.tiles[i].stop();
    }
};

App.prototype.play = function(value) {
    this.status.playing = true;
    for (var i = 0, l = this.tiles.length; i < l; i++) {
        this.tiles[i].run();
    }
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

App.prototype.setCamera = function(type) {
    if (type === 'ortho') {
        if (!this.view.camera) {
            $('#camera-ortho').addClass('current');
            $('#camera-perspective').removeClass('current');
            this.toggleCamera()
        }
    } else {
        if (this.view.camera) {
            $('#camera-ortho').removeClass('current');
            $('#camera-perspective').addClass('current');
            this.toggleCamera()
        }
    }
};

App.prototype.toggleCamera = function() {
    this.play();
    this.view.camera = !this.view.camera;
    for (var i = 0, l = this.tiles.length; i < l; i++) {
        this.tiles[i].setCamera(this.view.camera);
    }
    this.delayStop();
};

App.prototype.setTexture = function(type) {
    if (type === 'full') {
        if (!this.view.texture) {
            $('#texture-full').addClass('current');
            $('#texture-mono').removeClass('current');
            this.toggleTexture()
        }
    } else {
        if (this.view.texture) {
            $('#texture-full').removeClass('current');
            $('#texture-mono').addClass('current');
            this.toggleTexture()
        }
    }
};

App.prototype.toggleTexture = function() {
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