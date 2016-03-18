$(function() {
    /* Hammer */
    var $hammerContainer = $('#hammer-gesture');

    $hammerContainer.hammer({}).bind("panleft panright panup tap press",
         function(ev) {
        var text = 'Hammer ' + ev.type + ' gesture detected. ';
        print(ev.target, text )
    });

    /* Touch Swipe */
    $('#touch-swipe-gesture').swipe({
        swipeStatus: function(event, phase, direction, distance, duration, fingers, fingerData) {
            if (phase == $.fn.swipe.phases.PHASE_START) {
            	print( $(this) , 'moving...');
            }
            if (phase == $.fn.swipe.phases.PHASE_CANCEL) {
            	print( $(this) , 'swipe cancelled (due to finger count) ');
            }
        },
        swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
        	print( $(this) , 'You swiped ' + direction + ' with ' + fingerCount + ' fingers' );
        },
        threshold: 0,
        fingers: 2
    });

    
    /* Jquery Pep JS */
    $('#jquery-pep-gesture').pep({
    	axis: 'x',
    	constrainTo: 'parent'
    }).parent().css('height','60px');  





});



function print(elm, txt) {
    var $container 	= $(elm).closest( '.panel' );
    $container.find( '.panel-body' ).text( txt )
    console.log( txt )
}