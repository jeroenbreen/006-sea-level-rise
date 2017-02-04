function App() {
    this.locations = [];
    this.settings = settings;
    this.init();
}

App.prototype.init = function() {
    this.initZoom();
    for (var i = 0, l = locations.length; i < l; i++) {
        var location = locations[i];
        this.locations.push(
            new Location(this, location, i)
        );
    }

};

App.prototype.initZoom = function() {
    var self = this,
        container = $('<div class="zoom-container"></div>');
    this.zoom = $('<input type="number" value="' + settings.zoom + '">');
    container.append(this.zoom);
    $('body').append(container);
    $(container).append($('<button onclick="app.log()">log</button>'))
    this.zoom.change(function(){
        self.settings.zoom = parseInt($(this).val());
        self.updateZoom();
    })
};

App.prototype.updateZoom = function(callerId) {
    for (var i = 0, l = this.locations.length; i < l; i++) {
        var location = this.locations[i];
        if (i !== callerId) {
            location.updateZoom();
        }
    }
};

App.prototype.log = function(callerId) {
    var string = 'var locations = [';
    for (var i = 0, l = this.locations.length; i < l; i++) {
        var location = this.locations[i];
        string += '{title: "' + location.title + '",coordinates: ' + JSON.stringify(location.coordinates) + '}, ';
    }
    string += '];';
    window.alert(string);
};