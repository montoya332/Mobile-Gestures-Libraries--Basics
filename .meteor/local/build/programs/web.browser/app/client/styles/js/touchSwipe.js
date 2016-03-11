(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/styles/js/touchSwipe.js                                      //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
 * @fileOverview TouchSwipe - jQuery Plugin                            //
 * @version 1.6.14                                                     //
 *                                                                     //
 * @author Matt Bryson http://www.github.com/mattbryson                //
 * @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin         //
 * @see http://labs.rampinteractive.co.uk/touchSwipe/                  //
 * @see http://plugins.jquery.com/project/touchSwipe                   //
 *                                                                     //
 * Copyright (c) 2010-2015 Matt Bryson                                 //
 * Dual licensed under the MIT or GPL Version 2 licenses.              //
 *                                                                     //
 */                                                                    //
                                                                       //
/*                                                                     //
 *                                                                     //
 * Changelog                                                           //
 * $Date: 2010-12-12 (Wed, 12 Dec 2010) $                              //
 * $version: 1.0.0                                                     //
 * $version: 1.0.1 - removed multibyte comments                        //
 *                                                                     //
 * $Date: 2011-21-02 (Mon, 21 Feb 2011) $                              //
 * $version: 1.1.0 	- added allowPageScroll property to allow swiping and scrolling of page
 *					- changed handler signatures so one handler can be used for multiple events
 * $Date: 2011-23-02 (Wed, 23 Feb 2011) $                              //
 * $version: 1.2.0 	- added click handler. This is fired if the user simply clicks and does not swipe. The event object and click target are passed to handler.
 *					- If you use the http://code.google.com/p/jquery-ui-for-ipad-and-iphone/ plugin, you can also assign jQuery mouse events to children of a touchSwipe object.
 * $version: 1.2.1 	- removed console log!                             //
 *                                                                     //
 * $version: 1.2.2 	- Fixed bug where scope was not preserved in callback methods.
 *                                                                     //
 * $Date: 2011-28-04 (Thurs, 28 April 2011) $                          //
 * $version: 1.2.4 	- Changed licence terms to be MIT or GPL inline with jQuery. Added check for support of touch events to stop non compatible browsers erroring.
 *                                                                     //
 * $Date: 2011-27-09 (Tues, 27 September 2011) $                       //
 * $version: 1.2.5 	- Added support for testing swipes with mouse on desktop browser (thanks to https://github.com/joelhy)
 *                                                                     //
 * $Date: 2012-14-05 (Mon, 14 May 2012) $                              //
 * $version: 1.2.6 	- Added timeThreshold between start and end touch, so user can ignore slow swipes (thanks to Mark Chase). Default is null, all swipes are detected
 *                                                                     //
 * $Date: 2012-05-06 (Tues, 05 June 2012) $                            //
 * $version: 1.2.7 	- Changed time threshold to have null default for backwards compatibility. Added duration param passed back in events, and refactored how time is handled.
 *                                                                     //
 * $Date: 2012-05-06 (Tues, 05 June 2012) $                            //
 * $version: 1.2.8 	- Added the possibility to return a value like null or false in the trigger callback. In that way we can control when the touch start/move should take effect or not (simply by returning in some cases return null; or return false;) This effects the ontouchstart/ontouchmove event.
 *                                                                     //
 * $Date: 2012-06-06 (Wed, 06 June 2012) $                             //
 * $version: 1.3.0 	- Refactored whole plugin to allow for methods to be executed, as well as exposed defaults for user override. Added 'enable', 'disable', and 'destroy' methods
 *                                                                     //
 * $Date: 2012-05-06 (Fri, 05 June 2012) $                             //
 * $version: 1.3.1 	- Bug fixes  - bind() with false as last argument is no longer supported in jQuery 1.6, also, if you just click, the duration is now returned correctly.
 *                                                                     //
 * $Date: 2012-29-07 (Sun, 29 July 2012) $                             //
 * $version: 1.3.2	- Added fallbackToMouseEvents option to NOT capture mouse events on non touch devices.
 * 			- Added "all" fingers value to the fingers property, so any combination of fingers triggers the swipe, allowing event handlers to check the finger count
 *                                                                     //
 * $Date: 2012-09-08 (Thurs, 9 Aug 2012) $                             //
 * $version: 1.3.3	- Code tidy prep for minefied version               //
 *                                                                     //
 * $Date: 2012-04-10 (wed, 4 Oct 2012) $                               //
 * $version: 1.4.0	- Added pinch support, pinchIn and pinchOut         //
 *                                                                     //
 * $Date: 2012-11-10 (Thurs, 11 Oct 2012) $                            //
 * $version: 1.5.0	- Added excludedElements, a jquery selector that specifies child elements that do NOT trigger swipes. By default, this is one select that removes all form, input select, button and anchor elements.
 *                                                                     //
 * $Date: 2012-22-10 (Mon, 22 Oct 2012) $                              //
 * $version: 1.5.1	- Fixed bug with jQuery 1.8 and trailing comma in excludedElements
 *					- Fixed bug with IE and eventPreventDefault()                   //
 * $Date: 2013-01-12 (Fri, 12 Jan 2013) $                              //
 * $version: 1.6.0	- Fixed bugs with pinching, mainly when both pinch and swipe enabled, as well as adding time threshold for multifinger gestures, so releasing one finger beofre the other doesnt trigger as single finger gesture.
 *					- made the demo site all static local HTML pages so they can be run locally by a developer
 *					- added jsDoc comments and added documentation for the plugin   //
 *					- code tidy                                                     //
 *					- added triggerOnTouchLeave property that will end the event when the user swipes off the element.
 * $Date: 2013-03-23 (Sat, 23 Mar 2013) $                              //
 * $version: 1.6.1	- Added support for ie8 touch events                //
 * $version: 1.6.2	- Added support for events binding with on / off / bind in jQ for all callback names.
 *                   - Deprecated the 'click' handler in favour of tap.
 *                   - added cancelThreshold property                  //
 *                   - added option method to update init options at runtime
 * $version 1.6.3    - added doubletap, longtap events and longTapThreshold, doubleTapThreshold property
 *                                                                     //
 * $Date: 2013-04-04 (Thurs, 04 April 2013) $                          //
 * $version 1.6.4    - Fixed bug with cancelThreshold introduced in 1.6.3, where swipe status no longer fired start event, and stopped once swiping back.
 *                                                                     //
 * $Date: 2013-08-24 (Sat, 24 Aug 2013) $                              //
 * $version 1.6.5    - Merged a few pull requests fixing various bugs, added AMD support.
 *                                                                     //
 * $Date: 2014-06-04 (Wed, 04 June 2014) $                             //
 * $version 1.6.6 	- Merge of pull requests.                           //
 *    				- IE10 touch support                                         //
 *    				- Only prevent default event handling on valid swipe         //
 *    				- Separate license/changelog comment                         //
 *    				- Detect if the swipe is valid at the end of the touch event.
 *    				- Pass fingerdata to event handlers.                         //
 *    				- Add 'hold' gesture                                         //
 *    				- Be more tolerant about the tap distance                    //
 *    				- Typos and minor fixes                                      //
 *                                                                     //
 * $Date: 2015-22-01 (Thurs, 22 Jan 2015) $                            //
 * $version 1.6.7    - Added patch from https://github.com/mattbryson/TouchSwipe-Jquery-Plugin/issues/206 to fix memory leak
 *                                                                     //
 * $Date: 2015-2-2 (Mon, 2 Feb 2015) $                                 //
 * $version 1.6.8    - Added preventDefaultEvents option to proxy events regardless.
 *					- Fixed issue with swipe and pinch not triggering at the same time
 *                                                                     //
 * $Date: 2015-9-6 (Tues, 9 June 2015) $                               //
 * $version 1.6.9    - Added PR from jdalton/hybrid to fix pointer events
 *					- Added scrolling demo                                          //
 *					- Added version property to plugin                              //
 *                                                                     //
 * $Date: 2015-1-10 (Wed, 1 October 2015) $                            //
 * $version 1.6.10    - Added PR from beatspace to fix tap events      //
 * $version 1.6.11    - Added PRs from indri-indri ( Doc tidyup), kkirsche ( Bower tidy up ), UziTech (preventDefaultEvents fixes )
 *					 - Allowed setting multiple options via .swipe("options", options_hash) and more simply .swipe(options_hash) or exisitng instances
 * $version 1.6.12    - Fixed bug with multi finger releases above 2 not triggering events
 *                                                                     //
 * $Date: 2015-12-18 (Fri, 18 December 2015) $                         //
 * $version 1.6.13    - Added PRs                                      //
 *                    - Fixed #267 allowPageScroll not working correctly
 * $version 1.6.14    - Fixed #220 / #248 doubletap not firing with swipes, #223 commonJS compatible
 * $version 1.6.15    - More bug fixes                                 //
 */                                                                    //
                                                                       //
/**                                                                    //
 * See (http://jquery.com/).                                           //
 * @name $                                                             //
 * @class                                                              //
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */                                                                    //
                                                                       //
(function (factory) {                                                  // 143
  if (typeof define === 'function' && define.amd && define.amd.jQuery) {
    // AMD. Register as anonymous module.                              //
    define(['jquery'], factory);                                       // 146
  } else if (typeof module !== 'undefined' && module.exports) {        //
    // CommonJS Module                                                 //
    factory(require("jquery"));                                        // 149
  } else {                                                             //
    // Browser globals.                                                //
    factory(jQuery);                                                   // 152
  }                                                                    //
})(function ($) {                                                      //
  "use strict";                                                        // 155
                                                                       //
  //Constants                                                          //
  var VERSION = "1.6.15",                                              // 158
      LEFT = "left",                                                   //
      RIGHT = "right",                                                 //
      UP = "up",                                                       //
      DOWN = "down",                                                   //
      IN = "in",                                                       //
      OUT = "out",                                                     //
      NONE = "none",                                                   //
      AUTO = "auto",                                                   //
      SWIPE = "swipe",                                                 //
      PINCH = "pinch",                                                 //
      TAP = "tap",                                                     //
      DOUBLE_TAP = "doubletap",                                        //
      LONG_TAP = "longtap",                                            //
      HOLD = "hold",                                                   //
      HORIZONTAL = "horizontal",                                       //
      VERTICAL = "vertical",                                           //
      ALL_FINGERS = "all",                                             //
      DOUBLE_TAP_THRESHOLD = 10,                                       //
      PHASE_START = "start",                                           //
      PHASE_MOVE = "move",                                             //
      PHASE_END = "end",                                               //
      PHASE_CANCEL = "cancel",                                         //
      SUPPORTS_TOUCH = ('ontouchstart' in window),                     //
      SUPPORTS_POINTER_IE10 = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled && !SUPPORTS_TOUCH,
      SUPPORTS_POINTER = (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && !SUPPORTS_TOUCH,
      PLUGIN_NS = 'TouchSwipe';                                        //
                                                                       //
  /**                                                                  //
  * The default configuration, and available options to configure touch swipe with.
  * You can set the default values by updating any of the properties prior to instantiation.
  * @name $.fn.swipe.defaults                                          //
  * @namespace                                                         //
  * @property {int} [fingers=1] The number of fingers to detect in a swipe. Any swipes that do not meet this requirement will NOT trigger swipe handlers.
  * @property {int} [threshold=75] The number of pixels that the user must move their finger by before it is considered a swipe.
  * @property {int} [cancelThreshold=null] The number of pixels that the user must move their finger back from the original swipe direction to cancel the gesture.
  * @property {int} [pinchThreshold=20] The number of pixels that the user must pinch their finger by before it is considered a pinch.
  * @property {int} [maxTimeThreshold=null] Time, in milliseconds, between touchStart and touchEnd must NOT exceed in order to be considered a swipe.
  * @property {int} [fingerReleaseThreshold=250] Time in milliseconds between releasing multiple fingers.  If 2 fingers are down, and are released one after the other, if they are within this threshold, it counts as a simultaneous release.
  * @property {int} [longTapThreshold=500] Time in milliseconds between tap and release for a long tap
  * @property {int} [doubleTapThreshold=200] Time in milliseconds between 2 taps to count as a double tap
  * @property {function} [swipe=null] A handler to catch all swipes. See {@link $.fn.swipe#event:swipe}
  * @property {function} [swipeLeft=null] A handler that is triggered for "left" swipes. See {@link $.fn.swipe#event:swipeLeft}
  * @property {function} [swipeRight=null] A handler that is triggered for "right" swipes. See {@link $.fn.swipe#event:swipeRight}
  * @property {function} [swipeUp=null] A handler that is triggered for "up" swipes. See {@link $.fn.swipe#event:swipeUp}
  * @property {function} [swipeDown=null] A handler that is triggered for "down" swipes. See {@link $.fn.swipe#event:swipeDown}
  * @property {function} [swipeStatus=null] A handler triggered for every phase of the swipe. See {@link $.fn.swipe#event:swipeStatus}
  * @property {function} [pinchIn=null] A handler triggered for pinch in events. See {@link $.fn.swipe#event:pinchIn}
  * @property {function} [pinchOut=null] A handler triggered for pinch out events. See {@link $.fn.swipe#event:pinchOut}
  * @property {function} [pinchStatus=null] A handler triggered for every phase of a pinch. See {@link $.fn.swipe#event:pinchStatus}
  * @property {function} [tap=null] A handler triggered when a user just taps on the item, rather than swipes it. If they do not move, tap is triggered, if they do move, it is not.
  * @property {function} [doubleTap=null] A handler triggered when a user double taps on the item. The delay between taps can be set with the doubleTapThreshold property. See {@link $.fn.swipe.defaults#doubleTapThreshold}
  * @property {function} [longTap=null] A handler triggered when a user long taps on the item. The delay between start and end can be set with the longTapThreshold property. See {@link $.fn.swipe.defaults#longTapThreshold}
  * @property (function) [hold=null] A handler triggered when a user reaches longTapThreshold on the item. See {@link $.fn.swipe.defaults#longTapThreshold}
  * @property {boolean} [triggerOnTouchEnd=true] If true, the swipe events are triggered when the touch end event is received (user releases finger).  If false, it will be triggered on reaching the threshold, and then cancel the touch event automatically.
  * @property {boolean} [triggerOnTouchLeave=false] If true, then when the user leaves the swipe object, the swipe will end and trigger appropriate handlers.
  * @property {string|undefined} [allowPageScroll='auto'] How the browser handles page scrolls when the user is swiping on a touchSwipe object. See {@link $.fn.swipe.pageScroll}.  <br/><br/>
  									<code>"auto"</code> : all undefined swipes will cause the page to scroll in that direction. <br/>
  									<code>"none"</code> : the page will not scroll when user swipes. <br/>
  									<code>"horizontal"</code> : will force page to scroll on horizontal swipes. <br/>
  									<code>"vertical"</code> : will force page to scroll on vertical swipes. <br/>
  * @property {boolean} [fallbackToMouseEvents=true] If true mouse events are used when run on a non touch device, false will stop swipes being triggered by mouse events on non tocuh devices.
  * @property {string} [excludedElements="button, input, select, textarea, a, .noSwipe"] A jquery selector that specifies child elements that do NOT trigger swipes. By default this excludes all form, input, select, button, anchor and .noSwipe elements.
  * @property {boolean} [preventDefaultEvents=true] by default default events are cancelled, so the page doesn't move.  You can dissable this so both native events fire as well as your handlers.
   */                                                                  //
  var defaults = {                                                     // 236
    fingers: 1,                                                        // 237
    threshold: 75,                                                     // 238
    cancelThreshold: null,                                             // 239
    pinchThreshold: 20,                                                // 240
    maxTimeThreshold: null,                                            // 241
    fingerReleaseThreshold: 250,                                       // 242
    longTapThreshold: 500,                                             // 243
    doubleTapThreshold: 200,                                           // 244
    swipe: null,                                                       // 245
    swipeLeft: null,                                                   // 246
    swipeRight: null,                                                  // 247
    swipeUp: null,                                                     // 248
    swipeDown: null,                                                   // 249
    swipeStatus: null,                                                 // 250
    pinchIn: null,                                                     // 251
    pinchOut: null,                                                    // 252
    pinchStatus: null,                                                 // 253
    click: null, //Deprecated since 1.6.2                              // 254
    tap: null,                                                         // 255
    doubleTap: null,                                                   // 256
    longTap: null,                                                     // 257
    hold: null,                                                        // 258
    triggerOnTouchEnd: true,                                           // 259
    triggerOnTouchLeave: false,                                        // 260
    allowPageScroll: "auto",                                           // 261
    fallbackToMouseEvents: true,                                       // 262
    excludedElements: "label, button, input, select, textarea, a, .noSwipe",
    preventDefaultEvents: true                                         // 264
  };                                                                   //
                                                                       //
  /**                                                                  //
   * Applies TouchSwipe behaviour to one or more jQuery objects.       //
   * The TouchSwipe plugin can be instantiated via this method, or methods within
   * TouchSwipe can be executed via this method as per jQuery plugin architecture.
   * An existing plugin can have its options changed simply by re calling .swipe(options)
   * @see TouchSwipe                                                   //
   * @class                                                            //
   * @param {Mixed} method If the current DOMNode is a TouchSwipe object, and <code>method</code> is a TouchSwipe method, then
   * the <code>method</code> is executed, and any following arguments are passed to the TouchSwipe method.
   * If <code>method</code> is an object, then the TouchSwipe class is instantiated on the current DOMNode, passing the
   * configuration properties defined in the object. See TouchSwipe    //
   *                                                                   //
   */                                                                  //
  $.fn.swipe = function (method) {                                     // 282
    var $this = $(this),                                               // 283
        plugin = $this.data(PLUGIN_NS);                                //
                                                                       //
    //Check if we are already instantiated and trying to execute a method
    if (plugin && typeof method === 'string') {                        // 287
      if (plugin[method]) {                                            // 288
        return plugin[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else {                                                         //
        $.error('Method ' + method + ' does not exist on jQuery.swipe');
      }                                                                //
    }                                                                  //
                                                                       //
    //Else update existing plugin with new options hash                //
    else if (plugin && typeof method === 'object') {                   //
        plugin['option'].apply(this, arguments);                       // 297
      }                                                                //
                                                                       //
      //Else not instantiated and trying to pass init object (or nothing)
      else if (!plugin && (typeof method === 'object' || !method)) {   //
          return init.apply(this, arguments);                          // 302
        }                                                              //
                                                                       //
    return $this;                                                      // 305
  };                                                                   //
                                                                       //
  /**                                                                  //
   * The version of the plugin                                         //
   * @readonly                                                         //
   */                                                                  //
  $.fn.swipe.version = VERSION;                                        // 312
                                                                       //
  //Expose our defaults so a user could override the plugin defaults   //
  $.fn.swipe.defaults = defaults;                                      // 317
                                                                       //
  /**                                                                  //
   * The phases that a touch event goes through.  The <code>phase</code> is passed to the event handlers.
   * These properties are read only, attempting to change them will not alter the values passed to the event handlers.
   * @namespace                                                        //
   * @readonly                                                         //
   * @property {string} PHASE_START Constant indicating the start phase of the touch event. Value is <code>"start"</code>.
   * @property {string} PHASE_MOVE Constant indicating the move phase of the touch event. Value is <code>"move"</code>.
   * @property {string} PHASE_END Constant indicating the end phase of the touch event. Value is <code>"end"</code>.
   * @property {string} PHASE_CANCEL Constant indicating the cancel phase of the touch event. Value is <code>"cancel"</code>.
   */                                                                  //
  $.fn.swipe.phases = {                                                // 329
    PHASE_START: PHASE_START,                                          // 330
    PHASE_MOVE: PHASE_MOVE,                                            // 331
    PHASE_END: PHASE_END,                                              // 332
    PHASE_CANCEL: PHASE_CANCEL                                         // 333
  };                                                                   //
                                                                       //
  /**                                                                  //
   * The direction constants that are passed to the event handlers.    //
   * These properties are read only, attempting to change them will not alter the values passed to the event handlers.
   * @namespace                                                        //
   * @readonly                                                         //
   * @property {string} LEFT Constant indicating the left direction. Value is <code>"left"</code>.
   * @property {string} RIGHT Constant indicating the right direction. Value is <code>"right"</code>.
   * @property {string} UP Constant indicating the up direction. Value is <code>"up"</code>.
   * @property {string} DOWN Constant indicating the down direction. Value is <code>"cancel"</code>.
   * @property {string} IN Constant indicating the in direction. Value is <code>"in"</code>.
   * @property {string} OUT Constant indicating the out direction. Value is <code>"out"</code>.
   */                                                                  //
  $.fn.swipe.directions = {                                            // 348
    LEFT: LEFT,                                                        // 349
    RIGHT: RIGHT,                                                      // 350
    UP: UP,                                                            // 351
    DOWN: DOWN,                                                        // 352
    IN: IN,                                                            // 353
    OUT: OUT                                                           // 354
  };                                                                   //
                                                                       //
  /**                                                                  //
   * The page scroll constants that can be used to set the value of <code>allowPageScroll</code> option
   * These properties are read only                                    //
   * @namespace                                                        //
   * @readonly                                                         //
   * @see $.fn.swipe.defaults#allowPageScroll                          //
   * @property {string} NONE Constant indicating no page scrolling is allowed. Value is <code>"none"</code>.
   * @property {string} HORIZONTAL Constant indicating horizontal page scrolling is allowed. Value is <code>"horizontal"</code>.
   * @property {string} VERTICAL Constant indicating vertical page scrolling is allowed. Value is <code>"vertical"</code>.
   * @property {string} AUTO Constant indicating either horizontal or vertical will be allowed, depending on the swipe handlers registered. Value is <code>"auto"</code>.
   */                                                                  //
  $.fn.swipe.pageScroll = {                                            // 368
    NONE: NONE,                                                        // 369
    HORIZONTAL: HORIZONTAL,                                            // 370
    VERTICAL: VERTICAL,                                                // 371
    AUTO: AUTO                                                         // 372
  };                                                                   //
                                                                       //
  /**                                                                  //
   * Constants representing the number of fingers used in a swipe.  These are used to set both the value of <code>fingers</code> in the
   * options object, as well as the value of the <code>fingers</code> event property.
   * These properties are read only, attempting to change them will not alter the values passed to the event handlers.
   * @namespace                                                        //
   * @readonly                                                         //
   * @see $.fn.swipe.defaults#fingers                                  //
   * @property {string} ONE Constant indicating 1 finger is to be detected / was detected. Value is <code>1</code>.
   * @property {string} TWO Constant indicating 2 fingers are to be detected / were detected. Value is <code>2</code>.
   * @property {string} THREE Constant indicating 3 finger are to be detected / were detected. Value is <code>3</code>.
   * @property {string} FOUR Constant indicating 4 finger are to be detected / were detected. Not all devices support this. Value is <code>4</code>.
   * @property {string} FIVE Constant indicating 5 finger are to be detected / were detected. Not all devices support this. Value is <code>5</code>.
   * @property {string} ALL Constant indicating any combination of finger are to be detected.  Value is <code>"all"</code>.
   */                                                                  //
  $.fn.swipe.fingers = {                                               // 389
    ONE: 1,                                                            // 390
    TWO: 2,                                                            // 391
    THREE: 3,                                                          // 392
    FOUR: 4,                                                           // 393
    FIVE: 5,                                                           // 394
    ALL: ALL_FINGERS                                                   // 395
  };                                                                   //
                                                                       //
  /**                                                                  //
   * Initialise the plugin for each DOM element matched                //
   * This creates a new instance of the main TouchSwipe class for each DOM element, and then
   * saves a reference to that instance in the elements data property.
   * @internal                                                         //
   */                                                                  //
  function init(options) {                                             // 404
    //Prep and extend the options                                      //
    if (options && (options.allowPageScroll === undefined && (options.swipe !== undefined || options.swipeStatus !== undefined))) {
      options.allowPageScroll = NONE;                                  // 407
    }                                                                  //
                                                                       //
    //Check for deprecated options                                     //
    //Ensure that any old click handlers are assigned to the new tap, unless we have a tap
    if (options.click !== undefined && options.tap === undefined) {    // 412
      options.tap = options.click;                                     // 413
    }                                                                  //
                                                                       //
    if (!options) {                                                    // 416
      options = {};                                                    // 417
    }                                                                  //
                                                                       //
    //pass empty object so we dont modify the defaults                 //
    options = $.extend({}, $.fn.swipe.defaults, options);              // 421
                                                                       //
    //For each element instantiate the plugin                          //
    return this.each(function () {                                     // 424
      var $this = $(this);                                             // 425
                                                                       //
      //Check we havent already initialised the plugin                 //
      var plugin = $this.data(PLUGIN_NS);                              // 428
                                                                       //
      if (!plugin) {                                                   // 430
        plugin = new TouchSwipe(this, options);                        // 431
        $this.data(PLUGIN_NS, plugin);                                 // 432
      }                                                                //
    });                                                                //
  }                                                                    //
                                                                       //
  /**                                                                  //
   * Main TouchSwipe Plugin Class.                                     //
   * Do not use this to construct your TouchSwipe object, use the jQuery plugin method $.fn.swipe(); {@link $.fn.swipe}
   * @private                                                          //
   * @name TouchSwipe                                                  //
   * @param {DOMNode} element The HTML DOM object to apply to plugin to
   * @param {Object} options The options to configure the plugin with.  @link {$.fn.swipe.defaults}
   * @see $.fh.swipe.defaults                                          //
   * @see $.fh.swipe                                                   //
   * @class                                                            //
   */                                                                  //
  function TouchSwipe(element, options) {                              // 448
                                                                       //
    //take a local/instacne level copy of the options - should make it this.options really...
    var options = $.extend({}, options);                               // 451
                                                                       //
    var useTouchEvents = SUPPORTS_TOUCH || SUPPORTS_POINTER || !options.fallbackToMouseEvents,
        START_EV = useTouchEvents ? SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? 'MSPointerDown' : 'pointerdown' : 'touchstart' : 'mousedown',
        MOVE_EV = useTouchEvents ? SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? 'MSPointerMove' : 'pointermove' : 'touchmove' : 'mousemove',
        END_EV = useTouchEvents ? SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? 'MSPointerUp' : 'pointerup' : 'touchend' : 'mouseup',
        LEAVE_EV = useTouchEvents ? SUPPORTS_POINTER ? 'mouseleave' : null : 'mouseleave',
        //we manually detect leave on touch devices, so null event here
    CANCEL_EV = SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? 'MSPointerCancel' : 'pointercancel' : 'touchcancel';
                                                                       //
    //touch properties                                                 //
    var distance = 0,                                                  // 463
        direction = null,                                              //
        currentDirection = null,                                       //
        duration = 0,                                                  //
        startTouchesDistance = 0,                                      //
        endTouchesDistance = 0,                                        //
        pinchZoom = 1,                                                 //
        pinchDistance = 0,                                             //
        pinchDirection = 0,                                            //
        maximumsMap = null;                                            //
                                                                       //
    //jQuery wrapped element for this instance                         //
    var $element = $(element);                                         // 477
                                                                       //
    //Current phase of th touch cycle                                  //
    var phase = "start";                                               // 480
                                                                       //
    // the current number of fingers being used.                       //
    var fingerCount = 0;                                               // 483
                                                                       //
    //track mouse points / delta                                       //
    var fingerData = {};                                               // 486
                                                                       //
    //track times                                                      //
    var startTime = 0,                                                 // 489
        endTime = 0,                                                   //
        previousTouchEndTime = 0,                                      //
        fingerCountAtRelease = 0,                                      //
        doubleTapStartTime = 0;                                        //
                                                                       //
    //Timeouts                                                         //
    var singleTapTimeout = null,                                       // 496
        holdTimeout = null;                                            //
                                                                       //
    // Add gestures to all swipable areas if supported                 //
    try {                                                              // 500
      $element.bind(START_EV, touchStart);                             // 501
      $element.bind(CANCEL_EV, touchCancel);                           // 502
    } catch (e) {                                                      //
      $.error('events not supported ' + START_EV + ',' + CANCEL_EV + ' on jQuery.swipe');
    }                                                                  //
                                                                       //
    //                                                                 //
    //Public methods                                                   //
    //                                                                 //
                                                                       //
    /**                                                                //
     * re-enables the swipe plugin with the previous configuration     //
     * @function                                                       //
     * @name $.fn.swipe#enable                                         //
     * @return {DOMNode} The Dom element that was registered with TouchSwipe
     * @example $("#element").swipe("enable");                         //
     */                                                                //
    this.enable = function () {                                        // 518
      $element.bind(START_EV, touchStart);                             // 519
      $element.bind(CANCEL_EV, touchCancel);                           // 520
      return $element;                                                 // 521
    };                                                                 //
                                                                       //
    /**                                                                //
     * disables the swipe plugin                                       //
     * @function                                                       //
     * @name $.fn.swipe#disable                                        //
     * @return {DOMNode} The Dom element that is now registered with TouchSwipe
     * @example $("#element").swipe("disable");                        //
     */                                                                //
    this.disable = function () {                                       // 531
      removeListeners();                                               // 532
      return $element;                                                 // 533
    };                                                                 //
                                                                       //
    /**                                                                //
     * Destroy the swipe plugin completely. To use any swipe methods, you must re initialise the plugin.
     * @function                                                       //
     * @name $.fn.swipe#destroy                                        //
     * @example $("#element").swipe("destroy");                        //
     */                                                                //
    this.destroy = function () {                                       // 542
      removeListeners();                                               // 543
      $element.data(PLUGIN_NS, null);                                  // 544
      $element = null;                                                 // 545
    };                                                                 //
                                                                       //
    /**                                                                //
     * Allows run time updating of the swipe configuration options.    //
     * @function                                                       //
     * @name $.fn.swipe#option                                         //
     * @param {String} property The option property to get or set, or a has of multiple options to set
     * @param {Object} [value] The value to set the property to        //
     * @return {Object} If only a property name is passed, then that property value is returned. If nothing is passed the current options hash is returned.
     * @example $("#element").swipe("option", "threshold"); // return the threshold
     * @example $("#element").swipe("option", "threshold", 100); // set the threshold after init
     * @example $("#element").swipe("option", {threshold:100, fingers:3} ); // set multiple properties after init
     * @example $("#element").swipe({threshold:100, fingers:3} ); // set multiple properties after init - the "option" method is optional!
     * @example $("#element").swipe("option"); // Return the current options hash
     * @see $.fn.swipe.defaults                                        //
     *                                                                 //
     */                                                                //
    this.option = function (property, value) {                         // 564
                                                                       //
      if (typeof property === 'object') {                              // 566
        options = $.extend(options, property);                         // 567
      } else if (options[property] !== undefined) {                    //
        if (value === undefined) {                                     // 569
          return options[property];                                    // 570
        } else {                                                       //
          options[property] = value;                                   // 572
        }                                                              //
      } else if (!property) {                                          //
        return options;                                                // 575
      } else {                                                         //
        $.error('Option ' + property + ' does not exist on jQuery.swipe.options');
      }                                                                //
                                                                       //
      return null;                                                     // 580
    };                                                                 //
                                                                       //
    //                                                                 //
    // Private methods                                                 //
    //                                                                 //
                                                                       //
    //                                                                 //
    // EVENTS                                                          //
    //                                                                 //
    /**                                                                //
     * Event handler for a touch start event.                          //
     * Stops the default click event from triggering and stores where we touched
     * @inner                                                          //
     * @param {object} jqEvent The normalised jQuery event object.     //
     */                                                                //
    function touchStart(jqEvent) {                                     // 598
                                                                       //
      //If we already in a touch event (a finger already in use) then ignore subsequent ones..
      if (getTouchInProgress()) {                                      // 601
        return;                                                        // 602
      }                                                                //
                                                                       //
      //Check if this element matches any in the excluded elements selectors,  or its parent is excluded, if so, DON'T swipe
      if ($(jqEvent.target).closest(options.excludedElements, $element).length > 0) {
        return;                                                        // 607
      }                                                                //
                                                                       //
      //As we use Jquery bind for events, we need to target the original event object
      //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
      var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
                                                                       //
      var ret,                                                         // 614
          touches = event.touches,                                     //
          evt = touches ? touches[0] : event;                          //
                                                                       //
      phase = PHASE_START;                                             // 618
                                                                       //
      //If we support touches, get the finger count                    //
      if (touches) {                                                   // 621
        // get the total number of fingers touching the screen         //
        fingerCount = touches.length;                                  // 623
      }                                                                //
      //Else this is the desktop, so stop the browser from dragging content
      else if (options.preventDefaultEvents !== false) {               //
          jqEvent.preventDefault(); //call this on jq event so we are cross browser
        }                                                              //
                                                                       //
      //clear vars..                                                   //
      distance = 0;                                                    // 631
      direction = null;                                                // 632
      currentDirection = null;                                         // 633
      pinchDirection = null;                                           // 634
      duration = 0;                                                    // 635
      startTouchesDistance = 0;                                        // 636
      endTouchesDistance = 0;                                          // 637
      pinchZoom = 1;                                                   // 638
      pinchDistance = 0;                                               // 639
      maximumsMap = createMaximumsData();                              // 640
      cancelMultiFingerRelease();                                      // 641
                                                                       //
      //Create the default finger data                                 //
      createFingerData(0, evt);                                        // 644
                                                                       //
      // check the number of fingers is what we are looking for, or we are capturing pinches
      if (!touches || (fingerCount === options.fingers || options.fingers === ALL_FINGERS) || hasPinches()) {
        // get the coordinates of the touch                            //
        startTime = getTimeStamp();                                    // 649
                                                                       //
        if (fingerCount == 2) {                                        // 651
          //Keep track of the initial pinch distance, so we can calculate the diff later
          //Store second finger data as start                          //
          createFingerData(1, touches[1]);                             // 654
          startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start);
        }                                                              //
                                                                       //
        if (options.swipeStatus || options.pinchStatus) {              // 658
          ret = triggerHandler(event, phase);                          // 659
        }                                                              //
      } else {                                                         //
        //A touch with more or less than the fingers we are looking for, so cancel
        ret = false;                                                   // 663
      }                                                                //
                                                                       //
      //If we have a return value from the users handler, then return and cancel
      if (ret === false) {                                             // 667
        phase = PHASE_CANCEL;                                          // 668
        triggerHandler(event, phase);                                  // 669
        return ret;                                                    // 670
      } else {                                                         //
        if (options.hold) {                                            // 672
          holdTimeout = setTimeout($.proxy(function () {               // 673
            //Trigger the event                                        //
            $element.trigger('hold', [event.target]);                  // 675
            //Fire the callback                                        //
            if (options.hold) {                                        // 677
              ret = options.hold.call($element, event, event.target);  // 678
            }                                                          //
          }, this), options.longTapThreshold);                         //
        }                                                              //
                                                                       //
        setTouchInProgress(true);                                      // 683
      }                                                                //
                                                                       //
      return null;                                                     // 686
    };                                                                 //
                                                                       //
    /**                                                                //
     * Event handler for a touch move event.                           //
     * If we change fingers during move, then cancel the event         //
     * @inner                                                          //
     * @param {object} jqEvent The normalised jQuery event object.     //
     */                                                                //
    function touchMove(jqEvent) {                                      // 697
                                                                       //
      //As we use Jquery bind for events, we need to target the original event object
      //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
      var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
                                                                       //
      //If we are ending, cancelling, or within the threshold of 2 fingers being released, don't track anything..
      if (phase === PHASE_END || phase === PHASE_CANCEL || inMultiFingerRelease()) return;
                                                                       //
      var ret,                                                         // 707
          touches = event.touches,                                     //
          evt = touches ? touches[0] : event;                          //
                                                                       //
      //Update the  finger data                                        //
      var currentFinger = updateFingerData(evt);                       // 713
      endTime = getTimeStamp();                                        // 714
                                                                       //
      if (touches) {                                                   // 716
        fingerCount = touches.length;                                  // 717
      }                                                                //
                                                                       //
      if (options.hold) clearTimeout(holdTimeout);                     // 720
                                                                       //
      phase = PHASE_MOVE;                                              // 723
                                                                       //
      //If we have 2 fingers get Touches distance as well              //
      if (fingerCount == 2) {                                          // 726
                                                                       //
        //Keep track of the initial pinch distance, so we can calculate the diff later
        //We do this here as well as the start event, in case they start with 1 finger, and the press 2 fingers
        if (startTouchesDistance == 0) {                               // 730
          //Create second finger if this is the first time...          //
          createFingerData(1, touches[1]);                             // 732
                                                                       //
          startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start);
        } else {                                                       //
          //Else just update the second finger                         //
          updateFingerData(touches[1]);                                // 737
                                                                       //
          endTouchesDistance = calculateTouchesDistance(fingerData[0].end, fingerData[1].end);
          pinchDirection = calculatePinchDirection(fingerData[0].end, fingerData[1].end);
        }                                                              //
                                                                       //
        pinchZoom = calculatePinchZoom(startTouchesDistance, endTouchesDistance);
        pinchDistance = Math.abs(startTouchesDistance - endTouchesDistance);
      }                                                                //
                                                                       //
      if (fingerCount === options.fingers || options.fingers === ALL_FINGERS || !touches || hasPinches()) {
                                                                       //
        //The overall direction of the swipe. From start to now.       //
        direction = calculateDirection(currentFinger.start, currentFinger.end);
                                                                       //
        //The immediate direction of the swipe, direction between the last movement and this one.
        currentDirection = calculateDirection(currentFinger.last, currentFinger.end);
                                                                       //
        //Check if we need to prevent default event (page scroll / pinch zoom) or not
        validateDefaultEvent(jqEvent, currentDirection);               // 756
                                                                       //
        //Distance and duration are all off the main finger            //
        distance = calculateDistance(currentFinger.start, currentFinger.end);
        duration = calculateDuration();                                // 760
                                                                       //
        //Cache the maximum distance we made in this direction         //
        setMaxDistance(direction, distance);                           // 763
                                                                       //
        //Trigger status handler                                       //
        ret = triggerHandler(event, phase);                            // 766
                                                                       //
        //If we trigger end events when threshold are met, or trigger events when touch leaves element
        if (!options.triggerOnTouchEnd || options.triggerOnTouchLeave) {
                                                                       //
          var inBounds = true;                                         // 772
                                                                       //
          //If checking if we leave the element, run the bounds check (we can use touchleave as its not supported on webkit)
          if (options.triggerOnTouchLeave) {                           // 775
            var bounds = getbounds(this);                              // 776
            inBounds = isInBounds(currentFinger.end, bounds);          // 777
          }                                                            //
                                                                       //
          //Trigger end handles as we swipe if thresholds met or if we have left the element if the user has asked to check these..
          if (!options.triggerOnTouchEnd && inBounds) {                // 781
            phase = getNextPhase(PHASE_MOVE);                          // 782
          }                                                            //
          //We end if out of bounds here, so set current phase to END, and check if its modified
          else if (options.triggerOnTouchLeave && !inBounds) {         //
              phase = getNextPhase(PHASE_END);                         // 786
            }                                                          //
                                                                       //
          if (phase == PHASE_CANCEL || phase == PHASE_END) {           // 789
            triggerHandler(event, phase);                              // 790
          }                                                            //
        }                                                              //
      } else {                                                         //
        phase = PHASE_CANCEL;                                          // 794
        triggerHandler(event, phase);                                  // 795
      }                                                                //
                                                                       //
      if (ret === false) {                                             // 798
        phase = PHASE_CANCEL;                                          // 799
        triggerHandler(event, phase);                                  // 800
      }                                                                //
    }                                                                  //
                                                                       //
    /**                                                                //
     * Event handler for a touch end event.                            //
     * Calculate the direction and trigger events                      //
     * @inner                                                          //
     * @param {object} jqEvent The normalised jQuery event object.     //
     */                                                                //
    function touchEnd(jqEvent) {                                       // 813
      //As we use Jquery bind for events, we need to target the original event object
      //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
      var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent,
          touches = event.touches;                                     //
                                                                       //
      //If we are still in a touch with the device wait a fraction and see if the other finger comes up
      //if it does within the threshold, then we treat it as a multi release, not a single release and end the touch / swipe
      if (touches) {                                                   // 821
        if (touches.length && !inMultiFingerRelease()) {               // 822
          startMultiFingerRelease(event);                              // 823
          return true;                                                 // 824
        } else if (touches.length && inMultiFingerRelease()) {         //
          return true;                                                 // 826
        }                                                              //
      }                                                                //
                                                                       //
      //If a previous finger has been released, check how long ago, if within the threshold, then assume it was a multifinger release.
      //This is used to allow 2 fingers to release fractionally after each other, whilst maintaining the event as containing 2 fingers, not 1
      if (inMultiFingerRelease()) {                                    // 832
        fingerCount = fingerCountAtRelease;                            // 833
      }                                                                //
                                                                       //
      //Set end of swipe                                               //
      endTime = getTimeStamp();                                        // 837
                                                                       //
      //Get duration incase move was never fired                       //
      duration = calculateDuration();                                  // 840
                                                                       //
      //If we trigger handlers at end of swipe OR, we trigger during, but they didnt trigger and we are still in the move phase
      if (didSwipeBackToCancel() || !validateSwipeDistance()) {        // 843
        phase = PHASE_CANCEL;                                          // 844
        triggerHandler(event, phase);                                  // 845
      } else if (options.triggerOnTouchEnd || options.triggerOnTouchEnd == false && phase === PHASE_MOVE) {
        //call this on jq event so we are cross browser                //
        if (options.preventDefaultEvents !== false) {                  // 848
          jqEvent.preventDefault();                                    // 849
        }                                                              //
        phase = PHASE_END;                                             // 851
        triggerHandler(event, phase);                                  // 852
      }                                                                //
      //Special cases - A tap should always fire on touch end regardless,
      //So here we manually trigger the tap end handler by itself      //
      //We dont run trigger handler as it will re-trigger events that may have fired already
      else if (!options.triggerOnTouchEnd && hasTap()) {               //
          //Trigger the pinch events...                                //
          phase = PHASE_END;                                           // 859
          triggerHandlerForGesture(event, phase, TAP);                 // 860
        } else if (phase === PHASE_MOVE) {                             //
          phase = PHASE_CANCEL;                                        // 862
          triggerHandler(event, phase);                                // 863
        }                                                              //
                                                                       //
      setTouchInProgress(false);                                       // 866
                                                                       //
      return null;                                                     // 868
    }                                                                  //
                                                                       //
    /**                                                                //
     * Event handler for a touch cancel event.                         //
     * Clears current vars                                             //
     * @inner                                                          //
     */                                                                //
    function touchCancel() {                                           // 878
      // reset the variables back to default values                    //
      fingerCount = 0;                                                 // 880
      endTime = 0;                                                     // 881
      startTime = 0;                                                   // 882
      startTouchesDistance = 0;                                        // 883
      endTouchesDistance = 0;                                          // 884
      pinchZoom = 1;                                                   // 885
                                                                       //
      //If we were in progress of tracking a possible multi touch end, then re set it.
      cancelMultiFingerRelease();                                      // 888
                                                                       //
      setTouchInProgress(false);                                       // 890
    }                                                                  //
                                                                       //
    /**                                                                //
     * Event handler for a touch leave event.                          //
     * This is only triggered on desktops, in touch we work this out manually
     * as the touchleave event is not supported in webkit              //
     * @inner                                                          //
     */                                                                //
    function touchLeave(jqEvent) {                                     // 900
      //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
      var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
                                                                       //
      //If we have the trigger on leave property set....               //
      if (options.triggerOnTouchLeave) {                               // 905
        phase = getNextPhase(PHASE_END);                               // 906
        triggerHandler(event, phase);                                  // 907
      }                                                                //
    }                                                                  //
                                                                       //
    /**                                                                //
     * Removes all listeners that were associated with the plugin      //
     * @inner                                                          //
     */                                                                //
    function removeListeners() {                                       // 915
      $element.unbind(START_EV, touchStart);                           // 916
      $element.unbind(CANCEL_EV, touchCancel);                         // 917
      $element.unbind(MOVE_EV, touchMove);                             // 918
      $element.unbind(END_EV, touchEnd);                               // 919
                                                                       //
      //we only have leave events on desktop, we manually calculate leave on touch as its not supported in webkit
      if (LEAVE_EV) {                                                  // 922
        $element.unbind(LEAVE_EV, touchLeave);                         // 923
      }                                                                //
                                                                       //
      setTouchInProgress(false);                                       // 926
    }                                                                  //
                                                                       //
    /**                                                                //
     * Checks if the time and distance thresholds have been met, and if so then the appropriate handlers are fired.
     */                                                                //
    function getNextPhase(currentPhase) {                              // 933
                                                                       //
      var nextPhase = currentPhase;                                    // 935
                                                                       //
      // Ensure we have valid swipe (under time and over distance  and check if we are out of bound...)
      var validTime = validateSwipeTime();                             // 938
      var validDistance = validateSwipeDistance();                     // 939
      var didCancel = didSwipeBackToCancel();                          // 940
                                                                       //
      //If we have exceeded our time, then cancel                      //
      if (!validTime || didCancel) {                                   // 943
        nextPhase = PHASE_CANCEL;                                      // 944
      }                                                                //
      //Else if we are moving, and have reached distance then end      //
      else if (validDistance && currentPhase == PHASE_MOVE && (!options.triggerOnTouchEnd || options.triggerOnTouchLeave)) {
          nextPhase = PHASE_END;                                       // 948
        }                                                              //
        //Else if we have ended by leaving and didn't reach distance, then cancel
        else if (!validDistance && currentPhase == PHASE_END && options.triggerOnTouchLeave) {
            nextPhase = PHASE_CANCEL;                                  // 952
          }                                                            //
                                                                       //
      return nextPhase;                                                // 955
    }                                                                  //
                                                                       //
    /**                                                                //
     * Trigger the relevant event handler                              //
     * The handlers are passed the original event, the element that was swiped, and in the case of the catch all handler, the direction that was swiped, "left", "right", "up", or "down"
     * @param {object} event the original event object                 //
     * @param {string} phase the phase of the swipe (start, end cancel etc) {@link $.fn.swipe.phases}
     * @inner                                                          //
     */                                                                //
    function triggerHandler(event, phase) {                            // 966
                                                                       //
      var ret,                                                         // 970
          touches = event.touches;                                     //
                                                                       //
      // SWIPE GESTURES                                                //
      if (didSwipe() || hasSwipes()) {                                 // 974
        ret = triggerHandlerForGesture(event, phase, SWIPE);           // 975
      }                                                                //
                                                                       //
      // PINCH GESTURES (if the above didn't cancel)                   //
      if ((didPinch() || hasPinches()) && ret !== false) {             // 979
        ret = triggerHandlerForGesture(event, phase, PINCH);           // 980
      }                                                                //
                                                                       //
      // CLICK / TAP (if the above didn't cancel)                      //
      if (didDoubleTap() && ret !== false) {                           // 984
        //Trigger the tap events...                                    //
        ret = triggerHandlerForGesture(event, phase, DOUBLE_TAP);      // 986
      }                                                                //
                                                                       //
      // CLICK / TAP (if the above didn't cancel)                      //
      else if (didLongTap() && ret !== false) {                        //
          //Trigger the tap events...                                  //
          ret = triggerHandlerForGesture(event, phase, LONG_TAP);      // 992
        }                                                              //
                                                                       //
        // CLICK / TAP (if the above didn't cancel)                    //
        else if (didTap() && ret !== false) {                          //
            //Trigger the tap event..                                  //
            ret = triggerHandlerForGesture(event, phase, TAP);         // 998
          }                                                            //
                                                                       //
      // If we are cancelling the gesture, then manually trigger the reset handler
      if (phase === PHASE_CANCEL) {                                    // 1002
        if (hasSwipes()) {                                             // 1003
          ret = triggerHandlerForGesture(event, phase, SWIPE);         // 1004
        }                                                              //
                                                                       //
        if (hasPinches()) {                                            // 1007
          ret = triggerHandlerForGesture(event, phase, PINCH);         // 1008
        }                                                              //
        touchCancel(event);                                            // 1010
      }                                                                //
                                                                       //
      // If we are ending the gesture, then manually trigger the reset handler IF all fingers are off
      if (phase === PHASE_END) {                                       // 1014
        //If we support touch, then check that all fingers are off before we cancel
        if (touches) {                                                 // 1016
          if (!touches.length) {                                       // 1017
            touchCancel(event);                                        // 1018
          }                                                            //
        } else {                                                       //
          touchCancel(event);                                          // 1021
        }                                                              //
      }                                                                //
                                                                       //
      return ret;                                                      // 1025
    }                                                                  //
                                                                       //
    /**                                                                //
     * Trigger the relevant event handler                              //
     * The handlers are passed the original event, the element that was swiped, and in the case of the catch all handler, the direction that was swiped, "left", "right", "up", or "down"
     * @param {object} event the original event object                 //
     * @param {string} phase the phase of the swipe (start, end cancel etc) {@link $.fn.swipe.phases}
     * @param {string} gesture the gesture to trigger a handler for : PINCH or SWIPE {@link $.fn.swipe.gestures}
     * @return Boolean False, to indicate that the event should stop propagation, or void.
     * @inner                                                          //
     */                                                                //
    function triggerHandlerForGesture(event, phase, gesture) {         // 1039
                                                                       //
      var ret;                                                         // 1041
                                                                       //
      //SWIPES....                                                     //
      if (gesture == SWIPE) {                                          // 1044
        //Trigger status every time..                                  //
        $element.trigger('swipeStatus', [phase, direction || null, distance || 0, duration || 0, fingerCount, fingerData, currentDirection]);
                                                                       //
        if (options.swipeStatus) {                                     // 1048
          ret = options.swipeStatus.call($element, event, phase, direction || null, distance || 0, duration || 0, fingerCount, fingerData, currentDirection);
          //If the status cancels, then dont run the subsequent event handlers..
          if (ret === false) return false;                             // 1051
        }                                                              //
                                                                       //
        if (phase == PHASE_END && validateSwipe()) {                   // 1054
                                                                       //
          //Cancel any taps that were in progress...                   //
          clearTimeout(singleTapTimeout);                              // 1057
          clearTimeout(holdTimeout);                                   // 1058
                                                                       //
          $element.trigger('swipe', [direction, distance, duration, fingerCount, fingerData, currentDirection]);
                                                                       //
          if (options.swipe) {                                         // 1062
            ret = options.swipe.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection);
            //If the status cancels, then dont run the subsequent event handlers..
            if (ret === false) return false;                           // 1065
          }                                                            //
                                                                       //
          //trigger direction specific event handlers                  //
          switch (direction) {                                         // 1069
            case LEFT:                                                 // 1070
              $element.trigger('swipeLeft', [direction, distance, duration, fingerCount, fingerData, currentDirection]);
                                                                       //
              if (options.swipeLeft) {                                 // 1073
                ret = options.swipeLeft.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection);
              }                                                        //
              break;                                                   // 1076
                                                                       //
            case RIGHT:                                                // 1078
              $element.trigger('swipeRight', [direction, distance, duration, fingerCount, fingerData, currentDirection]);
                                                                       //
              if (options.swipeRight) {                                // 1081
                ret = options.swipeRight.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection);
              }                                                        //
              break;                                                   // 1084
                                                                       //
            case UP:                                                   // 1084
              $element.trigger('swipeUp', [direction, distance, duration, fingerCount, fingerData, currentDirection]);
                                                                       //
              if (options.swipeUp) {                                   // 1089
                ret = options.swipeUp.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection);
              }                                                        //
              break;                                                   // 1092
                                                                       //
            case DOWN:                                                 // 1094
              $element.trigger('swipeDown', [direction, distance, duration, fingerCount, fingerData, currentDirection]);
                                                                       //
              if (options.swipeDown) {                                 // 1097
                ret = options.swipeDown.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection);
              }                                                        //
              break;                                                   // 1100
          }                                                            // 1100
        }                                                              //
      }                                                                //
                                                                       //
      //PINCHES....                                                    //
      if (gesture == PINCH) {                                          // 1107
        $element.trigger('pinchStatus', [phase, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]);
                                                                       //
        if (options.pinchStatus) {                                     // 1110
          ret = options.pinchStatus.call($element, event, phase, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData);
          //If the status cancels, then dont run the subsequent event handlers..
          if (ret === false) return false;                             // 1113
        }                                                              //
                                                                       //
        if (phase == PHASE_END && validatePinch()) {                   // 1116
                                                                       //
          switch (pinchDirection) {                                    // 1118
            case IN:                                                   // 1119
              $element.trigger('pinchIn', [pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]);
                                                                       //
              if (options.pinchIn) {                                   // 1122
                ret = options.pinchIn.call($element, event, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData);
              }                                                        //
              break;                                                   // 1125
                                                                       //
            case OUT:                                                  // 1125
              $element.trigger('pinchOut', [pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]);
                                                                       //
              if (options.pinchOut) {                                  // 1130
                ret = options.pinchOut.call($element, event, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData);
              }                                                        //
              break;                                                   // 1133
          }                                                            // 1133
        }                                                              //
      }                                                                //
                                                                       //
      if (gesture == TAP) {                                            // 1138
        if (phase === PHASE_CANCEL || phase === PHASE_END) {           // 1139
                                                                       //
          clearTimeout(singleTapTimeout);                              // 1141
          clearTimeout(holdTimeout);                                   // 1142
                                                                       //
          //If we are also looking for doubelTaps, wait incase this is one...
          if (hasDoubleTap() && !inDoubleTap()) {                      // 1145
            doubleTapStartTime = getTimeStamp();                       // 1146
                                                                       //
            //Now wait for the double tap timeout, and trigger this single tap
            //if its not cancelled by a double tap                     //
            singleTapTimeout = setTimeout($.proxy(function () {        // 1150
              doubleTapStartTime = null;                               // 1151
              $element.trigger('tap', [event.target]);                 // 1152
                                                                       //
              if (options.tap) {                                       // 1154
                ret = options.tap.call($element, event, event.target);
              }                                                        //
            }, this), options.doubleTapThreshold);                     //
          } else {                                                     //
            doubleTapStartTime = null;                                 // 1160
            $element.trigger('tap', [event.target]);                   // 1161
            if (options.tap) {                                         // 1162
              ret = options.tap.call($element, event, event.target);   // 1163
            }                                                          //
          }                                                            //
        }                                                              //
      } else if (gesture == DOUBLE_TAP) {                              //
        if (phase === PHASE_CANCEL || phase === PHASE_END) {           // 1168
          clearTimeout(singleTapTimeout);                              // 1169
          clearTimeout(holdTimeout);                                   // 1170
          doubleTapStartTime = null;                                   // 1171
          $element.trigger('doubletap', [event.target]);               // 1172
                                                                       //
          if (options.doubleTap) {                                     // 1174
            ret = options.doubleTap.call($element, event, event.target);
          }                                                            //
        }                                                              //
      } else if (gesture == LONG_TAP) {                                //
        if (phase === PHASE_CANCEL || phase === PHASE_END) {           // 1179
          clearTimeout(singleTapTimeout);                              // 1180
          doubleTapStartTime = null;                                   // 1181
                                                                       //
          $element.trigger('longtap', [event.target]);                 // 1183
          if (options.longTap) {                                       // 1184
            ret = options.longTap.call($element, event, event.target);
          }                                                            //
        }                                                              //
      }                                                                //
                                                                       //
      return ret;                                                      // 1190
    }                                                                  //
                                                                       //
    //                                                                 //
    // GESTURE VALIDATION                                              //
    //                                                                 //
                                                                       //
    /**                                                                //
     * Checks the user has swipe far enough                            //
     * @return Boolean if <code>threshold</code> has been set, return true if the threshold was met, else false.
     * If no threshold was set, then we return true.                   //
     * @inner                                                          //
     */                                                                //
    function validateSwipeDistance() {                                 // 1204
      var valid = true;                                                // 1205
      //If we made it past the min swipe distance..                    //
      if (options.threshold !== null) {                                // 1207
        valid = distance >= options.threshold;                         // 1208
      }                                                                //
                                                                       //
      return valid;                                                    // 1211
    }                                                                  //
                                                                       //
    /**                                                                //
     * Checks the user has swiped back to cancel.                      //
     * @return Boolean if <code>cancelThreshold</code> has been set, return true if the cancelThreshold was met, else false.
     * If no cancelThreshold was set, then we return true.             //
     * @inner                                                          //
     */                                                                //
    function didSwipeBackToCancel() {                                  // 1220
      var cancelled = false;                                           // 1221
      if (options.cancelThreshold !== null && direction !== null) {    // 1222
        cancelled = getMaxDistance(direction) - distance >= options.cancelThreshold;
      }                                                                //
                                                                       //
      return cancelled;                                                // 1226
    }                                                                  //
                                                                       //
    /**                                                                //
     * Checks the user has pinched far enough                          //
     * @return Boolean if <code>pinchThreshold</code> has been set, return true if the threshold was met, else false.
     * If no threshold was set, then we return true.                   //
     * @inner                                                          //
     */                                                                //
    function validatePinchDistance() {                                 // 1235
      if (options.pinchThreshold !== null) {                           // 1236
        return pinchDistance >= options.pinchThreshold;                // 1237
      }                                                                //
      return true;                                                     // 1239
    }                                                                  //
                                                                       //
    /**                                                                //
     * Checks that the time taken to swipe meets the minimum / maximum requirements
     * @return Boolean                                                 //
     * @inner                                                          //
     */                                                                //
    function validateSwipeTime() {                                     // 1247
      var result;                                                      // 1248
      //If no time set, then return true                               //
      if (options.maxTimeThreshold) {                                  // 1250
        if (duration >= options.maxTimeThreshold) {                    // 1251
          result = false;                                              // 1252
        } else {                                                       //
          result = true;                                               // 1254
        }                                                              //
      } else {                                                         //
        result = true;                                                 // 1257
      }                                                                //
                                                                       //
      return result;                                                   // 1260
    }                                                                  //
                                                                       //
    /**                                                                //
     * Checks direction of the swipe and the value allowPageScroll to see if we should allow or prevent the default behaviour from occurring.
     * This will essentially allow page scrolling or not when the user is swiping on a touchSwipe object.
     * @param {object} jqEvent The normalised jQuery representation of the event object.
     * @param {string} direction The direction of the event. See {@link $.fn.swipe.directions}
     * @see $.fn.swipe.directions                                      //
     * @inner                                                          //
     */                                                                //
    function validateDefaultEvent(jqEvent, direction) {                // 1273
                                                                       //
      //If the option is set, allways allow the event to bubble up (let user handle weirdness)
      if (options.preventDefaultEvents === false) {                    // 1276
        return;                                                        // 1277
      }                                                                //
                                                                       //
      if (options.allowPageScroll === NONE) {                          // 1280
        jqEvent.preventDefault();                                      // 1281
      } else {                                                         //
        var auto = options.allowPageScroll === AUTO;                   // 1283
                                                                       //
        switch (direction) {                                           // 1285
          case LEFT:                                                   // 1286
            if (options.swipeLeft && auto || !auto && options.allowPageScroll != HORIZONTAL) {
              jqEvent.preventDefault();                                // 1288
            }                                                          //
            break;                                                     // 1290
                                                                       //
          case RIGHT:                                                  // 1290
            if (options.swipeRight && auto || !auto && options.allowPageScroll != HORIZONTAL) {
              jqEvent.preventDefault();                                // 1294
            }                                                          //
            break;                                                     // 1296
                                                                       //
          case UP:                                                     // 1296
            if (options.swipeUp && auto || !auto && options.allowPageScroll != VERTICAL) {
              jqEvent.preventDefault();                                // 1300
            }                                                          //
            break;                                                     // 1302
                                                                       //
          case DOWN:                                                   // 1302
            if (options.swipeDown && auto || !auto && options.allowPageScroll != VERTICAL) {
              jqEvent.preventDefault();                                // 1306
            }                                                          //
            break;                                                     // 1308
        }                                                              // 1308
      }                                                                //
    }                                                                  //
                                                                       //
    // PINCHES                                                         //
    /**                                                                //
     * Returns true of the current pinch meets the thresholds          //
     * @return Boolean                                                 //
     * @inner                                                          //
     */                                                                //
    function validatePinch() {                                         // 1321
      var hasCorrectFingerCount = validateFingers();                   // 1322
      var hasEndPoint = validateEndPoint();                            // 1323
      var hasCorrectDistance = validatePinchDistance();                // 1324
      return hasCorrectFingerCount && hasEndPoint && hasCorrectDistance;
    }                                                                  //
                                                                       //
    /**                                                                //
     * Returns true if any Pinch events have been registered           //
     * @return Boolean                                                 //
     * @inner                                                          //
     */                                                                //
    function hasPinches() {                                            // 1334
      //Enure we dont return 0 or null for false values                //
      return !!(options.pinchStatus || options.pinchIn || options.pinchOut);
    }                                                                  //
                                                                       //
    /**                                                                //
     * Returns true if we are detecting pinches, and have one          //
     * @return Boolean                                                 //
     * @inner                                                          //
     */                                                                //
    function didPinch() {                                              // 1344
      //Enure we dont return 0 or null for false values                //
      return !!(validatePinch() && hasPinches());                      // 1346
    }                                                                  //
                                                                       //
    // SWIPES                                                          //
    /**                                                                //
     * Returns true if the current swipe meets the thresholds          //
     * @return Boolean                                                 //
     * @inner                                                          //
     */                                                                //
    function validateSwipe() {                                         // 1358
      //Check validity of swipe                                        //
      var hasValidTime = validateSwipeTime();                          // 1360
      var hasValidDistance = validateSwipeDistance();                  // 1361
      var hasCorrectFingerCount = validateFingers();                   // 1362
      var hasEndPoint = validateEndPoint();                            // 1363
      var didCancel = didSwipeBackToCancel();                          // 1364
                                                                       //
      // if the user swiped more than the minimum length, perform the appropriate action
      // hasValidDistance is null when no distance is set              //
      var valid = !didCancel && hasEndPoint && hasCorrectFingerCount && hasValidDistance && hasValidTime;
                                                                       //
      return valid;                                                    // 1370
    }                                                                  //
                                                                       //
    /**                                                                //
     * Returns true if any Swipe events have been registered           //
     * @return Boolean                                                 //
     * @inner                                                          //
     */                                                                //
    function hasSwipes() {                                             // 1378
      //Enure we dont return 0 or null for false values                //
      return !!(options.swipe || options.swipeStatus || options.swipeLeft || options.swipeRight || options.swipeUp || options.swipeDown);
    }                                                                  //
                                                                       //
    /**                                                                //
     * Returns true if we are detecting swipes and have one            //
     * @return Boolean                                                 //
     * @inner                                                          //
     */                                                                //
    function didSwipe() {                                              // 1389
      //Enure we dont return 0 or null for false values                //
      return !!(validateSwipe() && hasSwipes());                       // 1391
    }                                                                  //
                                                                       //
    /**                                                                //
     * Returns true if we have matched the number of fingers we are looking for
     * @return Boolean                                                 //
     * @inner                                                          //
     */                                                                //
    function validateFingers() {                                       // 1399
      //The number of fingers we want were matched, or on desktop we ignore
      return fingerCount === options.fingers || options.fingers === ALL_FINGERS || !SUPPORTS_TOUCH;
    }                                                                  //
                                                                       //
    /**                                                                //
     * Returns true if we have an end point for the swipe              //
     * @return Boolean                                                 //
     * @inner                                                          //
     */                                                                //
    function validateEndPoint() {                                      // 1409
      //We have an end value for the finger                            //
      return fingerData[0].end.x !== 0;                                // 1411
    }                                                                  //
                                                                       //
    // TAP / CLICK                                                     //
    /**                                                                //
     * Returns true if a click / tap events have been registered       //
     * @return Boolean                                                 //
     * @inner                                                          //
     */                                                                //
    function hasTap() {                                                // 1420
      //Enure we dont return 0 or null for false values                //
      return !!options.tap;                                            // 1422
    }                                                                  //
                                                                       //
    /**                                                                //
     * Returns true if a double tap events have been registered        //
     * @return Boolean                                                 //
     * @inner                                                          //
     */                                                                //
    function hasDoubleTap() {                                          // 1430
      //Enure we dont return 0 or null for false values                //
      return !!options.doubleTap;                                      // 1432
    }                                                                  //
                                                                       //
    /**                                                                //
     * Returns true if any long tap events have been registered        //
     * @return Boolean                                                 //
     * @inner                                                          //
     */                                                                //
    function hasLongTap() {                                            // 1440
      //Enure we dont return 0 or null for false values                //
      return !!options.longTap;                                        // 1442
    }                                                                  //
                                                                       //
    /**                                                                //
     * Returns true if we could be in the process of a double tap (one tap has occurred, we are listening for double taps, and the threshold hasn't past.
     * @return Boolean                                                 //
     * @inner                                                          //
     */                                                                //
    function validateDoubleTap() {                                     // 1450
      if (doubleTapStartTime == null) {                                // 1451
        return false;                                                  // 1452
      }                                                                //
      var now = getTimeStamp();                                        // 1454
      return hasDoubleTap() && now - doubleTapStartTime <= options.doubleTapThreshold;
    }                                                                  //
                                                                       //
    /**                                                                //
     * Returns true if we could be in the process of a double tap (one tap has occurred, we are listening for double taps, and the threshold hasn't past.
     * @return Boolean                                                 //
     * @inner                                                          //
     */                                                                //
    function inDoubleTap() {                                           // 1463
      return validateDoubleTap();                                      // 1464
    }                                                                  //
                                                                       //
    /**                                                                //
     * Returns true if we have a valid tap                             //
     * @return Boolean                                                 //
     * @inner                                                          //
     */                                                                //
    function validateTap() {                                           // 1473
      return (fingerCount === 1 || !SUPPORTS_TOUCH) && (isNaN(distance) || distance < options.threshold);
    }                                                                  //
                                                                       //
    /**                                                                //
     * Returns true if we have a valid long tap                        //
     * @return Boolean                                                 //
     * @inner                                                          //
     */                                                                //
    function validateLongTap() {                                       // 1482
      //slight threshold on moving finger                              //
      return duration > options.longTapThreshold && distance < DOUBLE_TAP_THRESHOLD;
    }                                                                  //
                                                                       //
    /**                                                                //
     * Returns true if we are detecting taps and have one              //
     * @return Boolean                                                 //
     * @inner                                                          //
     */                                                                //
    function didTap() {                                                // 1492
      //Enure we dont return 0 or null for false values                //
      return !!(validateTap() && hasTap());                            // 1494
    }                                                                  //
                                                                       //
    /**                                                                //
     * Returns true if we are detecting double taps and have one       //
     * @return Boolean                                                 //
     * @inner                                                          //
     */                                                                //
    function didDoubleTap() {                                          // 1503
      //Enure we dont return 0 or null for false values                //
      return !!(validateDoubleTap() && hasDoubleTap());                // 1505
    }                                                                  //
                                                                       //
    /**                                                                //
     * Returns true if we are detecting long taps and have one         //
     * @return Boolean                                                 //
     * @inner                                                          //
     */                                                                //
    function didLongTap() {                                            // 1513
      //Enure we dont return 0 or null for false values                //
      return !!(validateLongTap() && hasLongTap());                    // 1515
    }                                                                  //
                                                                       //
    // MULTI FINGER TOUCH                                              //
    /**                                                                //
     * Starts tracking the time between 2 finger releases, and keeps track of how many fingers we initially had up
     * @inner                                                          //
     */                                                                //
    function startMultiFingerRelease(event) {                          // 1526
      previousTouchEndTime = getTimeStamp();                           // 1527
      fingerCountAtRelease = event.touches.length + 1;                 // 1528
    }                                                                  //
                                                                       //
    /**                                                                //
     * Cancels the tracking of time between 2 finger releases, and resets counters
     * @inner                                                          //
     */                                                                //
    function cancelMultiFingerRelease() {                              // 1535
      previousTouchEndTime = 0;                                        // 1536
      fingerCountAtRelease = 0;                                        // 1537
    }                                                                  //
                                                                       //
    /**                                                                //
     * Checks if we are in the threshold between 2 fingers being released
     * @return Boolean                                                 //
     * @inner                                                          //
     */                                                                //
    function inMultiFingerRelease() {                                  // 1545
                                                                       //
      var withinThreshold = false;                                     // 1547
                                                                       //
      if (previousTouchEndTime) {                                      // 1549
        var diff = getTimeStamp() - previousTouchEndTime;              // 1550
        if (diff <= options.fingerReleaseThreshold) {                  // 1551
          withinThreshold = true;                                      // 1552
        }                                                              //
      }                                                                //
                                                                       //
      return withinThreshold;                                          // 1556
    }                                                                  //
                                                                       //
    /**                                                                //
     * gets a data flag to indicate that a touch is in progress        //
     * @return Boolean                                                 //
     * @inner                                                          //
     */                                                                //
    function getTouchInProgress() {                                    // 1565
      //strict equality to ensure only true and false are returned     //
      return !!($element.data(PLUGIN_NS + '_intouch') === true);       // 1567
    }                                                                  //
                                                                       //
    /**                                                                //
     * Sets a data flag to indicate that a touch is in progress        //
     * @param {boolean} val The value to set the property to           //
     * @inner                                                          //
     */                                                                //
    function setTouchInProgress(val) {                                 // 1575
                                                                       //
      //If destroy is called in an event handler, we have no el, and we have already cleaned up, so return.
      if (!$element) {                                                 // 1578
        return;                                                        // 1578
      }                                                                //
                                                                       //
      //Add or remove event listeners depending on touch status        //
      if (val === true) {                                              // 1581
        $element.bind(MOVE_EV, touchMove);                             // 1582
        $element.bind(END_EV, touchEnd);                               // 1583
                                                                       //
        //we only have leave events on desktop, we manually calcuate leave on touch as its not supported in webkit
        if (LEAVE_EV) {                                                // 1586
          $element.bind(LEAVE_EV, touchLeave);                         // 1587
        }                                                              //
      } else {                                                         //
                                                                       //
        $element.unbind(MOVE_EV, touchMove, false);                    // 1591
        $element.unbind(END_EV, touchEnd, false);                      // 1592
                                                                       //
        //we only have leave events on desktop, we manually calcuate leave on touch as its not supported in webkit
        if (LEAVE_EV) {                                                // 1595
          $element.unbind(LEAVE_EV, touchLeave, false);                // 1596
        }                                                              //
      }                                                                //
                                                                       //
      //strict equality to ensure only true and false can update the value
      $element.data(PLUGIN_NS + '_intouch', val === true);             // 1602
    }                                                                  //
                                                                       //
    /**                                                                //
     * Creates the finger data for the touch/finger in the event object.
     * @param {int} id The id to store the finger data under (usually the order the fingers were pressed)
     * @param {object} evt The event object containing finger data     //
     * @return finger data object                                      //
     * @inner                                                          //
     */                                                                //
    function createFingerData(id, evt) {                               // 1613
      var f = {                                                        // 1614
        start: {                                                       // 1615
          x: 0,                                                        // 1616
          y: 0                                                         // 1617
        },                                                             //
        last: {                                                        // 1619
          x: 0,                                                        // 1620
          y: 0                                                         // 1621
        },                                                             //
        end: {                                                         // 1623
          x: 0,                                                        // 1624
          y: 0                                                         // 1625
        }                                                              //
      };                                                               //
      f.start.x = f.last.x = f.end.x = evt.pageX || evt.clientX;       // 1628
      f.start.y = f.last.y = f.end.y = evt.pageY || evt.clientY;       // 1629
      fingerData[id] = f;                                              // 1630
      return f;                                                        // 1631
    }                                                                  //
                                                                       //
    /**                                                                //
     * Updates the finger data for a particular event object           //
     * @param {object} evt The event object containing the touch/finger data to upadte
     * @return a finger data object.                                   //
     * @inner                                                          //
     */                                                                //
    function updateFingerData(evt) {                                   // 1640
      var id = evt.identifier !== undefined ? evt.identifier : 0;      // 1641
      var f = getFingerData(id);                                       // 1642
                                                                       //
      if (f === null) {                                                // 1644
        f = createFingerData(id, evt);                                 // 1645
      }                                                                //
                                                                       //
      f.last.x = f.end.x;                                              // 1648
      f.last.y = f.end.y;                                              // 1649
                                                                       //
      f.end.x = evt.pageX || evt.clientX;                              // 1651
      f.end.y = evt.pageY || evt.clientY;                              // 1652
                                                                       //
      return f;                                                        // 1654
    }                                                                  //
                                                                       //
    /**                                                                //
     * Returns a finger data object by its event ID.                   //
     * Each touch event has an identifier property, which is used      //
     * to track repeat touches                                         //
     * @param {int} id The unique id of the finger in the sequence of touch events.
     * @return a finger data object.                                   //
     * @inner                                                          //
     */                                                                //
    function getFingerData(id) {                                       // 1665
      return fingerData[id] || null;                                   // 1666
    }                                                                  //
                                                                       //
    /**                                                                //
     * Sets the maximum distance swiped in the given direction.        //
     * If the new value is lower than the current value, the max value is not changed.
     * @param {string}  direction The direction of the swipe           //
     * @param {int}  distance The distance of the swipe                //
     * @inner                                                          //
     */                                                                //
    function setMaxDistance(direction, distance) {                     // 1677
      distance = Math.max(distance, getMaxDistance(direction));        // 1678
      maximumsMap[direction].distance = distance;                      // 1679
    }                                                                  //
                                                                       //
    /**                                                                //
     * gets the maximum distance swiped in the given direction.        //
     * @param {string}  direction The direction of the swipe           //
     * @return int  The distance of the swipe                          //
     * @inner                                                          //
     */                                                                //
    function getMaxDistance(direction) {                               // 1688
      if (maximumsMap[direction]) return maximumsMap[direction].distance;
      return undefined;                                                // 1690
    }                                                                  //
                                                                       //
    /**                                                                //
     * Creats a map of directions to maximum swiped values.            //
     * @return Object A dictionary of maximum values, indexed by direction.
     * @inner                                                          //
     */                                                                //
    function createMaximumsData() {                                    // 1698
      var maxData = {};                                                // 1699
      maxData[LEFT] = createMaximumVO(LEFT);                           // 1700
      maxData[RIGHT] = createMaximumVO(RIGHT);                         // 1701
      maxData[UP] = createMaximumVO(UP);                               // 1702
      maxData[DOWN] = createMaximumVO(DOWN);                           // 1703
                                                                       //
      return maxData;                                                  // 1705
    }                                                                  //
                                                                       //
    /**                                                                //
     * Creates a map maximum swiped values for a given swipe direction
     * @param {string} The direction that these values will be associated with
     * @return Object Maximum values                                   //
     * @inner                                                          //
     */                                                                //
    function createMaximumVO(dir) {                                    // 1714
      return {                                                         // 1715
        direction: dir,                                                // 1716
        distance: 0                                                    // 1717
      };                                                               //
    }                                                                  //
                                                                       //
    //                                                                 //
    // MATHS / UTILS                                                   //
    //                                                                 //
                                                                       //
    /**                                                                //
     * Calculate the duration of the swipe                             //
     * @return int                                                     //
     * @inner                                                          //
     */                                                                //
    function calculateDuration() {                                     // 1731
      return endTime - startTime;                                      // 1732
    }                                                                  //
                                                                       //
    /**                                                                //
     * Calculate the distance between 2 touches (pinch)                //
     * @param {point} startPoint A point object containing x and y co-ordinates
     * @param {point} endPoint A point object containing x and y co-ordinates
     * @return int;                                                    //
     * @inner                                                          //
     */                                                                //
    function calculateTouchesDistance(startPoint, endPoint) {          // 1742
      var diffX = Math.abs(startPoint.x - endPoint.x);                 // 1743
      var diffY = Math.abs(startPoint.y - endPoint.y);                 // 1744
                                                                       //
      return Math.round(Math.sqrt(diffX * diffX + diffY * diffY));     // 1746
    }                                                                  //
                                                                       //
    /**                                                                //
     * Calculate the zoom factor between the start and end distances   //
     * @param {int} startDistance Distance (between 2 fingers) the user started pinching at
     * @param {int} endDistance Distance (between 2 fingers) the user ended pinching at
     * @return float The zoom value from 0 to 1.                       //
     * @inner                                                          //
     */                                                                //
    function calculatePinchZoom(startDistance, endDistance) {          // 1756
      var percent = endDistance / startDistance * 1;                   // 1757
      return percent.toFixed(2);                                       // 1758
    }                                                                  //
                                                                       //
    /**                                                                //
     * Returns the pinch direction, either IN or OUT for the given points
     * @return string Either {@link $.fn.swipe.directions.IN} or {@link $.fn.swipe.directions.OUT}
     * @see $.fn.swipe.directions                                      //
     * @inner                                                          //
     */                                                                //
    function calculatePinchDirection() {                               // 1768
      if (pinchZoom < 1) {                                             // 1769
        return OUT;                                                    // 1770
      } else {                                                         //
        return IN;                                                     // 1772
      }                                                                //
    }                                                                  //
                                                                       //
    /**                                                                //
     * Calculate the length / distance of the swipe                    //
     * @param {point} startPoint A point object containing x and y co-ordinates
     * @param {point} endPoint A point object containing x and y co-ordinates
     * @return int                                                     //
     * @inner                                                          //
     */                                                                //
    function calculateDistance(startPoint, endPoint) {                 // 1784
      return Math.round(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)));
    }                                                                  //
                                                                       //
    /**                                                                //
     * Calculate the angle of the swipe                                //
     * @param {point} startPoint A point object containing x and y co-ordinates
     * @param {point} endPoint A point object containing x and y co-ordinates
     * @return int                                                     //
     * @inner                                                          //
     */                                                                //
    function calculateAngle(startPoint, endPoint) {                    // 1795
      var x = startPoint.x - endPoint.x;                               // 1796
      var y = endPoint.y - startPoint.y;                               // 1797
      var r = Math.atan2(y, x); //radians                              // 1798
      var angle = Math.round(r * 180 / Math.PI); //degrees             // 1799
                                                                       //
      //ensure value is positive                                       //
      if (angle < 0) {                                                 // 1802
        angle = 360 - Math.abs(angle);                                 // 1803
      }                                                                //
                                                                       //
      return angle;                                                    // 1806
    }                                                                  //
                                                                       //
    /**                                                                //
     * Calculate the direction of the swipe                            //
     * This will also call calculateAngle to get the latest angle of swipe
     * @param {point} startPoint A point object containing x and y co-ordinates
     * @param {point} endPoint A point object containing x and y co-ordinates
     * @return string Either {@link $.fn.swipe.directions.LEFT} / {@link $.fn.swipe.directions.RIGHT} / {@link $.fn.swipe.directions.DOWN} / {@link $.fn.swipe.directions.UP}
     * @see $.fn.swipe.directions                                      //
     * @inner                                                          //
     */                                                                //
    function calculateDirection(startPoint, endPoint) {                // 1818
      var angle = calculateAngle(startPoint, endPoint);                // 1819
                                                                       //
      if (angle <= 45 && angle >= 0) {                                 // 1821
        return LEFT;                                                   // 1822
      } else if (angle <= 360 && angle >= 315) {                       //
        return LEFT;                                                   // 1824
      } else if (angle >= 135 && angle <= 225) {                       //
        return RIGHT;                                                  // 1826
      } else if (angle > 45 && angle < 135) {                          //
        return DOWN;                                                   // 1828
      } else {                                                         //
        return UP;                                                     // 1830
      }                                                                //
    }                                                                  //
                                                                       //
    /**                                                                //
     * Returns a MS time stamp of the current time                     //
     * @return int                                                     //
     * @inner                                                          //
     */                                                                //
    function getTimeStamp() {                                          // 1840
      var now = new Date();                                            // 1841
      return now.getTime();                                            // 1842
    }                                                                  //
                                                                       //
    /**                                                                //
     * Returns a bounds object with left, right, top and bottom properties for the element specified.
     * @param {DomNode} The DOM node to get the bounds for.            //
     */                                                                //
    function getbounds(el) {                                           // 1851
      el = $(el);                                                      // 1852
      var offset = el.offset();                                        // 1853
                                                                       //
      var bounds = {                                                   // 1855
        left: offset.left,                                             // 1856
        right: offset.left + el.outerWidth(),                          // 1857
        top: offset.top,                                               // 1858
        bottom: offset.top + el.outerHeight()                          // 1859
      };                                                               //
                                                                       //
      return bounds;                                                   // 1862
    }                                                                  //
                                                                       //
    /**                                                                //
     * Checks if the point object is in the bounds object.             //
     * @param {object} point A point object.                           //
     * @param {int} point.x The x value of the point.                  //
     * @param {int} point.y The x value of the point.                  //
     * @param {object} bounds The bounds object to test                //
     * @param {int} bounds.left The leftmost value                     //
     * @param {int} bounds.right The righttmost value                  //
     * @param {int} bounds.top The topmost value                       //
     * @param {int} bounds.bottom The bottommost value                 //
     */                                                                //
    function isInBounds(point, bounds) {                               // 1877
      return point.x > bounds.left && point.x < bounds.right && point.y > bounds.top && point.y < bounds.bottom;
    };                                                                 //
  }                                                                    //
                                                                       //
  /**                                                                  //
   * A catch all handler that is triggered for all swipe directions.   //
   * @name $.fn.swipe#swipe                                            //
   * @event                                                            //
   * @default null                                                     //
   * @param {EventObject} event The original event object              //
   * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
   * @param {int} distance The distance the user swiped                //
   * @param {int} duration The duration of the swipe in milliseconds   //
   * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
   * @param {object} fingerData The coordinates of fingers in event    //
   * @param {string} currentDirection The current direction the user is swiping.
   */                                                                  //
                                                                       //
  /**                                                                  //
   * A handler that is triggered for "left" swipes.                    //
   * @name $.fn.swipe#swipeLeft                                        //
   * @event                                                            //
   * @default null                                                     //
   * @param {EventObject} event The original event object              //
   * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
   * @param {int} distance The distance the user swiped                //
   * @param {int} duration The duration of the swipe in milliseconds   //
   * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
   * @param {object} fingerData The coordinates of fingers in event    //
   * @param {string} currentDirection The current direction the user is swiping.
   */                                                                  //
                                                                       //
  /**                                                                  //
   * A handler that is triggered for "right" swipes.                   //
   * @name $.fn.swipe#swipeRight                                       //
   * @event                                                            //
   * @default null                                                     //
   * @param {EventObject} event The original event object              //
   * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
   * @param {int} distance The distance the user swiped                //
   * @param {int} duration The duration of the swipe in milliseconds   //
   * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
   * @param {object} fingerData The coordinates of fingers in event    //
   * @param {string} currentDirection The current direction the user is swiping.
   */                                                                  //
                                                                       //
  /**                                                                  //
   * A handler that is triggered for "up" swipes.                      //
   * @name $.fn.swipe#swipeUp                                          //
   * @event                                                            //
   * @default null                                                     //
   * @param {EventObject} event The original event object              //
   * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
   * @param {int} distance The distance the user swiped                //
   * @param {int} duration The duration of the swipe in milliseconds   //
   * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
   * @param {object} fingerData The coordinates of fingers in event    //
   * @param {string} currentDirection The current direction the user is swiping.
   */                                                                  //
                                                                       //
  /**                                                                  //
   * A handler that is triggered for "down" swipes.                    //
   * @name $.fn.swipe#swipeDown                                        //
   * @event                                                            //
   * @default null                                                     //
   * @param {EventObject} event The original event object              //
   * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
   * @param {int} distance The distance the user swiped                //
   * @param {int} duration The duration of the swipe in milliseconds   //
   * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
   * @param {object} fingerData The coordinates of fingers in event    //
   * @param {string} currentDirection The current direction the user is swiping.
   */                                                                  //
                                                                       //
  /**                                                                  //
   * A handler triggered for every phase of the swipe. This handler is constantly fired for the duration of the pinch.
   * This is triggered regardless of swipe thresholds.                 //
   * @name $.fn.swipe#swipeStatus                                      //
   * @event                                                            //
   * @default null                                                     //
   * @param {EventObject} event The original event object              //
   * @param {string} phase The phase of the swipe event. See {@link $.fn.swipe.phases}
   * @param {string} direction The direction the user swiped in. This is null if the user has yet to move. See {@link $.fn.swipe.directions}
   * @param {int} distance The distance the user swiped. This is 0 if the user has yet to move.
   * @param {int} duration The duration of the swipe in milliseconds   //
   * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
   * @param {object} fingerData The coordinates of fingers in event    //
   * @param {string} currentDirection The current direction the user is swiping.
   */                                                                  //
                                                                       //
  /**                                                                  //
   * A handler triggered for pinch in events.                          //
   * @name $.fn.swipe#pinchIn                                          //
   * @event                                                            //
   * @default null                                                     //
   * @param {EventObject} event The original event object              //
   * @param {int} direction The direction the user pinched in. See {@link $.fn.swipe.directions}
   * @param {int} distance The distance the user pinched               //
   * @param {int} duration The duration of the swipe in milliseconds   //
   * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
   * @param {int} zoom The zoom/scale level the user pinched too, 0-1.
   * @param {object} fingerData The coordinates of fingers in event    //
   */                                                                  //
                                                                       //
  /**                                                                  //
   * A handler triggered for pinch out events.                         //
   * @name $.fn.swipe#pinchOut                                         //
   * @event                                                            //
   * @default null                                                     //
   * @param {EventObject} event The original event object              //
   * @param {int} direction The direction the user pinched in. See {@link $.fn.swipe.directions}
   * @param {int} distance The distance the user pinched               //
   * @param {int} duration The duration of the swipe in milliseconds   //
   * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
   * @param {int} zoom The zoom/scale level the user pinched too, 0-1.
   * @param {object} fingerData The coordinates of fingers in event    //
   */                                                                  //
                                                                       //
  /**                                                                  //
   * A handler triggered for all pinch events. This handler is constantly fired for the duration of the pinch. This is triggered regardless of thresholds.
   * @name $.fn.swipe#pinchStatus                                      //
   * @event                                                            //
   * @default null                                                     //
   * @param {EventObject} event The original event object              //
   * @param {int} direction The direction the user pinched in. See {@link $.fn.swipe.directions}
   * @param {int} distance The distance the user pinched               //
   * @param {int} duration The duration of the swipe in milliseconds   //
   * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
   * @param {int} zoom The zoom/scale level the user pinched too, 0-1.
   * @param {object} fingerData The coordinates of fingers in event    //
   */                                                                  //
                                                                       //
  /**                                                                  //
   * A click handler triggered when a user simply clicks, rather than swipes on an element.
   * This is deprecated since version 1.6.2, any assignment to click will be assigned to the tap handler.
   * You cannot use <code>on</code> to bind to this event as the default jQ <code>click</code> event will be triggered.
   * Use the <code>tap</code> event instead.                           //
   * @name $.fn.swipe#click                                            //
   * @event                                                            //
   * @deprecated since version 1.6.2, please use {@link $.fn.swipe#tap} instead
   * @default null                                                     //
   * @param {EventObject} event The original event object              //
   * @param {DomObject} target The element clicked on.                 //
   */                                                                  //
                                                                       //
  /**                                                                  //
   * A click / tap handler triggered when a user simply clicks or taps, rather than swipes on an element.
   * @name $.fn.swipe#tap                                              //
   * @event                                                            //
   * @default null                                                     //
   * @param {EventObject} event The original event object              //
   * @param {DomObject} target The element clicked on.                 //
   */                                                                  //
                                                                       //
  /**                                                                  //
   * A double tap handler triggered when a user double clicks or taps on an element.
   * You can set the time delay for a double tap with the {@link $.fn.swipe.defaults#doubleTapThreshold} property.
   * Note: If you set both <code>doubleTap</code> and <code>tap</code> handlers, the <code>tap</code> event will be delayed by the <code>doubleTapThreshold</code>
   * as the script needs to check if its a double tap.                 //
   * @name $.fn.swipe#doubleTap                                        //
   * @see  $.fn.swipe.defaults#doubleTapThreshold                      //
   * @event                                                            //
   * @default null                                                     //
   * @param {EventObject} event The original event object              //
   * @param {DomObject} target The element clicked on.                 //
   */                                                                  //
                                                                       //
  /**                                                                  //
   * A long tap handler triggered once a tap has been release if the tap was longer than the longTapThreshold.
   * You can set the time delay for a long tap with the {@link $.fn.swipe.defaults#longTapThreshold} property.
   * @name $.fn.swipe#longTap                                          //
   * @see  $.fn.swipe.defaults#longTapThreshold                        //
   * @event                                                            //
   * @default null                                                     //
   * @param {EventObject} event The original event object              //
   * @param {DomObject} target The element clicked on.                 //
   */                                                                  //
                                                                       //
  /**                                                                  //
   * A hold tap handler triggered as soon as the longTapThreshold is reached
   * You can set the time delay for a long tap with the {@link $.fn.swipe.defaults#longTapThreshold} property.
   * @name $.fn.swipe#hold                                             //
   * @see  $.fn.swipe.defaults#longTapThreshold                        //
   * @event                                                            //
   * @default null                                                     //
   * @param {EventObject} event The original event object              //
   * @param {DomObject} target The element clicked on.                 //
   */                                                                  //
});                                                                    //
/**                                                                    //
 * See (http://jquery.com/)                                            //
 * @name fn                                                            //
 * @class                                                              //
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf $                                                         //
 */                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
