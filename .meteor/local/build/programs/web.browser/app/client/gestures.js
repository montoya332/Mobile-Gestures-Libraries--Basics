(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/gestures.js                                                  //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
$(function () {                                                        // 1
    /* Hammer */                                                       //
    var hammerContainer = document.getElementById('hammer-gesture'),   // 3
        $hammerContainer = $(hammerContainer);                         //
                                                                       //
    var mc = new Hammer(hammerContainer);                              // 6
                                                                       //
    mc.on("panleft panright tap press", function (ev) {                // 8
        var text = 'Hammer ' + ev.type + ' gesture detected. ';        // 9
        print(ev.target, text);                                        // 10
    });                                                                //
                                                                       //
    /* Touch Swipe */                                                  //
    $('#touch-swipe-gesture').swipe({                                  // 14
        swipeStatus: function (event, phase, direction, distance, duration, fingers, fingerData) {
            if (phase == $.fn.swipe.phases.PHASE_START) {              // 16
                print($(this), 'moving...');                           // 17
            }                                                          //
            if (phase == $.fn.swipe.phases.PHASE_CANCEL) {             // 19
                print($(this), 'swipe cancelled (due to finger count) ');
            }                                                          //
        },                                                             //
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            print($(this), 'You swiped ' + direction + ' with ' + fingerCount + ' fingers');
        },                                                             //
        threshold: 0,                                                  // 26
        fingers: 2                                                     // 27
    });                                                                //
                                                                       //
    /* Jquery Pep JS */                                                //
    $('#jquery-pep-gesture').pep({                                     // 32
        axis: 'x',                                                     // 33
        constrainTo: 'parent'                                          // 34
    }).parent().css('height', '60px');                                 //
});                                                                    //
                                                                       //
function print(elm, txt) {                                             // 45
    var $container = $(elm).closest('.panel');                         // 46
    $container.find('.panel-body').text(txt);                          // 47
    console.log(txt);                                                  // 48
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
