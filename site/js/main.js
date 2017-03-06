$(window).ready(function(){

    var canvas = document.getElementById('tile-egypt');
    window.app = new App(canvas);

    $("#time-slider").slider({
        slide: function(event, ui){
            app.slide(ui.value);
        }
    });

});
