$(window).ready(function(){

    var startYear = 2017,
        minYear = 1900,
        endYear = 2300,
        yearDiv = $('#time-slider-year'),
        metersDiv = $('#time-slider-slr-nr');
    window.app = new App();

    app.openChapter('context', true);

    $("#time-slider").slider({
        orientation: "horizontal",
        range: "min",
        min: minYear,
        max: endYear,
        value: startYear,
        slide: function(event, ui){
            updateTimeSlider(ui.value);
        },
        create: function(event, ui){
            updateTimeSlider(startYear);
        }
    });

    $("#carbon-slider").slider({
        orientation: "horizontal",
        range: "min",
        min: 1870,
        max: 2017,
        value: 1870,
        slide: function(event, ui){
            $('#carbon-slider-year').html(ui.value);
        },
        create: function(event, ui){
            $('#carbon-slider-year').html(1870);
        }
    });

    function updateCarbonSlider(year) {
        yearDiv.html(year);
        metersDiv.html('+' + meters + 'm');
        app.slide(yearToPercentage(year));
    }

    function updateTimeSlider(year) {
        var meters = yearToMeters(year);
        yearDiv.html(year);
        metersDiv.html('+' + meters + 'm');
        app.slide(yearToPercentage(year));
    }

    function yearToPercentage(year) {
        return (year - minYear) / (endYear - startYear);
    }

    listenHelpers();

});

function listenHelpers() {
    $('.helper-close').click(function(){

        var helper = $(this).parent();
        helper.fadeOut(100);

    });
}


function yearToMeters(year) {
    var startYear = 1900;
    return (Math.pow((year - startYear), 4.5) / 25000000000).toFixed(2);
}