$(window).ready(function(){
    sizeSections();
    initModels();
});


function sizeSections() {
    var height = $(window).outerHeight();
    $('.intro').css('min-height', height);
}

function initModels() {
    window.physics = new Physics();
}