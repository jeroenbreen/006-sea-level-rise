$(window).ready(function(){

    var yearDiv = $('#time-slider-year'),
        metersDiv = $('#time-slider-slr-nr');


    window.app = new App();





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


