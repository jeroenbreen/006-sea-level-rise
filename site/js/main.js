$(window).ready(function(){

    var startYear = 2017,
        minYear = 1900,
        endYear = 2300,
        yearDiv = $('#time-slider-year'),
        metersDiv = $('#time-slider-slr-nr');
    window.app = new App();

    app.goto('cases', true);

    $("#time-slider").slider({
        orientation: "horizontal",
        range: "min",
        min: minYear,
        max: endYear,
        value: startYear,
        slide: function(event, ui){
            updateSlider(ui.value);
        },
        create: function(event, ui){
            updateSlider(startYear);
        }
    });

    function updateSlider(year) {
        var meters = yearToMeters(year);
        yearDiv.html(year);
        metersDiv.html('+' + meters + 'm');
        app.slide(yearToPercentage(year));
    }

    function yearToPercentage(year) {
        return (year - minYear) / (endYear - startYear);
    }

});




function yearToMeters(year) {
    var startYear = 1900;
    return (Math.pow((year - startYear), 4.5) / 25000000000).toFixed(2);
}