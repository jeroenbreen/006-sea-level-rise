function App() {
    this.tiles = [];
    this.collapses = [];
    this.carrousel = null;

    this.init();
}

App.prototype.init = function() {
    for (var i = 0, l = tiles.length; i < l; i++) {
        var tile = new Tile(this, tiles[i], i, false, $('#tiles'));
        this.tiles.push(tile);
    }
    this.carrousel = new Carrousel(this);
    this.initCollapses();
};

App.prototype.initCollapses = function() {
    var self = this;
    $('.collapse').each(function(){
        var collapse = new Collapse(self, $(this));
        self.collapses.push(collapse);
    })
};




// navigation

App.prototype.jumpToTile = function(tileNr) {
    // var self = this;
    // this._setChapter('cases');
    // setTimeout(function(){
    //     self.slider.slideTo(tileNr);
    // }, 500);

};
