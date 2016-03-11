(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/styles/js/jqueryPep.js                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
 *         ________                                                            ________
 *         ______(_)_____ ____  __________________  __ _____________________   ______(_)_______
 *         _____  /_  __ `/  / / /  _ \_  ___/_  / / / ___  __ \  _ \__  __ \  _____  /__  ___/
 *         ____  / / /_/ // /_/ //  __/  /   _  /_/ /____  /_/ /  __/_  /_/ /______  / _(__  )
 *         ___  /  \__, / \__,_/ \___//_/    _\__, /_(_)  .___/\___/_  .___/_(_)__  /  /____/
 *         /___/     /_/                     /____/    /_/          /_/        /___/
 *                                                                     //
 *        http://pep.briangonzalez.org                                 //
 *        Kinetic drag for mobile/desktop.                             //
 *                                                                     //
 *        Copyright (c) 2014 Brian Gonzalez                            //
 *        Licensed under the MIT license.                              //
 *                                                                     //
 *        Title generated using "Speed" @                              //
 *        http://patorjk.com/software/taag/#p=display&f=Speed&t=jquery.pep.js
 */                                                                    //
                                                                       //
;(function ($, window, undefined) {                                    // 19
                                                                       //
  "use strict";                                                        // 21
                                                                       //
  //  create the defaults once                                         //
  var pluginName = 'pep';                                              // 24
  var defaults = {                                                     // 25
                                                                       //
    // Options                                                         //
    // ----------------------------------------------------------------------------------------------
    // See ** https://github.com/briangonzalez/jquery.pep.js ** for fully documented options.
    // It was too hard to manage options here and in the readme.       //
    // ----------------------------------------------------------------------------------------------
    initiate: function () {},                                          // 32
    start: function () {},                                             // 33
    drag: function () {},                                              // 34
    stop: function () {},                                              // 35
    easing: null,                                                      // 36
    rest: function () {},                                              // 37
    moveTo: false,                                                     // 38
    callIfNotStarted: ['stop', 'rest'],                                // 39
    startThreshold: [0, 0],                                            // 40
    grid: [1, 1],                                                      // 41
    debug: false,                                                      // 42
    activeClass: 'pep-active',                                         // 43
    multiplier: 1,                                                     // 44
    velocityMultiplier: 2.5,                                           // 45
    shouldPreventDefault: true,                                        // 46
    allowDragEventPropagation: true,                                   // 47
    stopEvents: '',                                                    // 48
    hardwareAccelerate: true,                                          // 49
    useCSSTranslation: true,                                           // 50
    disableSelect: true,                                               // 51
    cssEaseString: "cubic-bezier(0.190, 1.000, 0.220, 1.000)",         // 52
    cssEaseDuration: 1000,                                             // 53
    shouldEase: true,                                                  // 54
    droppable: false,                                                  // 55
    droppableActiveClass: 'pep-dpa',                                   // 56
    overlapFunction: false,                                            // 57
    constrainTo: false,                                                // 58
    removeMargins: true,                                               // 59
    place: true,                                                       // 60
    deferPlacement: false,                                             // 61
    axis: null,                                                        // 62
    forceNonCSS3Movement: false,                                       // 63
    elementsWithInteraction: 'input',                                  // 64
    revert: false,                                                     // 65
    revertAfter: 'stop',                                               // 66
    revertIf: function () {                                            // 67
      return true;                                                     // 67
    },                                                                 //
    ignoreRightClick: true,                                            // 68
    startPos: {                                                        // 69
      left: null,                                                      // 70
      top: null                                                        // 71
    }                                                                  //
  };                                                                   //
                                                                       //
  //  ---------------------------------                                //
  //  -----  Our main Pep object  -----                                //
  //  ---------------------------------                                //
  function Pep(el, options) {                                          // 78
                                                                       //
    this.name = pluginName;                                            // 80
                                                                       //
    // reference to our DOM object                                     //
    // and it's jQuery equivalent.                                     //
    this.el = el;                                                      // 84
    this.$el = $(el);                                                  // 85
                                                                       //
    //  merge in defaults                                              //
    this.options = $.extend({}, defaults, options);                    // 88
                                                                       //
    // store document/body so we don't need to keep grabbing them      //
    // throughout the code                                             //
    this.$document = $(this.$el[0].ownerDocument);                     // 92
    this.$body = this.$document.find('body');                          // 93
                                                                       //
    //  Create our triggers based on touch/click device                //
    this.moveTrigger = "MSPointerMove touchmove mousemove";            // 96
    this.startTrigger = "MSPointerDown touchstart mousedown";          // 97
    this.stopTrigger = "MSPointerUp touchend mouseup";                 // 98
    this.startTriggerArray = this.startTrigger.split(' ');             // 99
    this.moveTriggerArray = this.moveTrigger.split(' ');               // 100
    this.stopTriggerArray = this.stopTrigger.split(' ');               // 101
    this.stopEvents = [this.stopTrigger, this.options.stopEvents].join(' ');
                                                                       //
    if (this.options.constrainTo === 'window') this.$container = this.$document;else if (this.options.constrainTo && this.options.constrainTo !== 'parent') this.$container = $(this.options.constrainTo);else this.$container = this.$el.parent();
                                                                       //
    // IE need this                                                    //
    if (this.isPointerEventCompatible()) this.applyMSDefaults();       // 112
                                                                       //
    this.CSSEaseHash = this.getCSSEaseHash();                          // 115
    this.scale = 1;                                                    // 116
    this.started = false;                                              // 117
    this.disabled = false;                                             // 118
    this.activeDropRegions = [];                                       // 119
    this.resetVelocityQueue();                                         // 120
                                                                       //
    this.init();                                                       // 122
    return this;                                                       // 123
  }                                                                    //
                                                                       //
  //  init();                                                          //
  //    initialization logic                                           //
  //    you already have access to the DOM el and the options via the instance,
  //    e.g., this.el and this.options                                 //
  Pep.prototype.init = function () {                                   // 130
                                                                       //
    if (this.options.debug) this.buildDebugDiv();                      // 132
                                                                       //
    if (this.options.disableSelect) this.disableSelect();              // 135
                                                                       //
    // position the parent & place the object, if necessary.           //
    if (this.options.place && !this.options.deferPlacement) {          // 139
      this.positionParent();                                           // 140
      this.placeObject();                                              // 141
    }                                                                  //
                                                                       //
    this.ev = {}; // to store our event movements                      // 144
    this.pos = {}; // to store positions                               // 145
    this.subscribe();                                                  // 146
  };                                                                   //
                                                                       //
  //  subscribe();                                                     //
  //    useful in the event we want to programmatically                //
  //    interact with our Pep object.                                  //
  //      e.g.:     $('#pep').trigger('stop')                          //
  Pep.prototype.subscribe = function () {                              // 153
    var self = this;                                                   // 154
                                                                       //
    // Subscribe to our start event                                    //
    this.onStartEvent = function (ev) {                                // 157
      self.handleStart(ev);                                            // 157
    };                                                                 //
    this.$el.on(this.startTrigger, this.onStartEvent);                 // 158
                                                                       //
    // Prevent start events from being gobbled by elements that should allow user interaction
    this.onStartEventOnElementsWithInteraction = function (ev) {       // 161
      ev.stopPropagation();                                            // 161
    };                                                                 //
    this.$el.on(this.startTrigger, this.options.elementsWithInteraction, this.onStartEventOnElementsWithInteraction);
                                                                       //
    // Subscribe to our stop event                                     //
    this.onStopEvents = function (ev) {                                // 169
      self.handleStop(ev);                                             // 169
    };                                                                 //
    this.$document.on(this.stopEvents, this.onStopEvents);             // 170
                                                                       //
    // Subscribe to our move event                                     //
    this.onMoveEvents = function (ev) {                                // 173
      self.moveEvent = ev;                                             // 173
    };                                                                 //
    this.$document.on(this.moveTrigger, this.onMoveEvents);            // 174
  };                                                                   //
                                                                       //
  Pep.prototype.unsubscribe = function () {                            // 177
    this.$el.off(this.startTrigger, this.onStartEvent);                // 178
    this.$el.off(this.startTrigger, this.options.elementsWithInteraction, this.onStartEventOnElementsWithInteraction);
    this.$document.off(this.stopEvents, this.onStopEvents);            // 184
    this.$document.off(this.moveTrigger, this.onMoveEvents);           // 185
  };                                                                   //
                                                                       //
  //  handleStart();                                                   //
  //    once this.startTrigger occurs, handle all of the logic         //
  //    that must go on. This is where Pep's heavy lifting is done.    //
  Pep.prototype.handleStart = function (ev) {                          // 191
    var self = this;                                                   // 192
                                                                       //
    // only continue chugging if our start event is a valid move event.
    if (this.isValidMoveEvent(ev) && !this.disabled) {                 // 195
                                                                       //
      if (!(this.options.ignoreRightClick && ev.which === 3)) {        // 197
                                                                       //
        // IE10 Hack. Me not happy.                                    //
        if (this.isPointerEventCompatible() && ev.preventManipulation) ev.preventManipulation();
                                                                       //
        // normalize event                                             //
        ev = this.normalizeEvent(ev);                                  // 204
                                                                       //
        // position the parent & place the object, if necessary.       //
        if (this.options.place && this.options.deferPlacement) {       // 207
          this.positionParent();                                       // 208
          this.placeObject();                                          // 209
        }                                                              //
                                                                       //
        // log it                                                      //
        this.log({ type: 'event', event: ev.type });                   // 213
                                                                       //
        // hardware accelerate, if necessary.                          //
        if (this.options.hardwareAccelerate && !this.hardwareAccelerated) {
          this.hardwareAccelerate();                                   // 217
          this.hardwareAccelerated = true;                             // 218
        }                                                              //
                                                                       //
        // fire user's initiate event.                                 //
        var shouldContinue = this.options.initiate.call(this, ev, this);
        if (shouldContinue === false) return;                          // 223
                                                                       //
        // cancel the rest timeout                                     //
        clearTimeout(this.restTimeout);                                // 228
                                                                       //
        // add active class and reset css animation, if necessary      //
        this.$el.addClass(this.options.activeClass);                   // 231
        this.removeCSSEasing();                                        // 232
                                                                       //
        // store event's x & y values for later use                    //
        this.startX = this.ev.x = ev.pep.x;                            // 235
        this.startY = this.ev.y = ev.pep.y;                            // 236
                                                                       //
        // store initial offset.                                       //
        this.initialPosition = this.initialPosition || this.$el.position();
                                                                       //
        // store the initial touch/click event, used to calculate the inital delta values.
        this.startEvent = this.moveEvent = ev;                         // 242
                                                                       //
        // make object active, so watchMoveLoop starts looping.        //
        this.active = true;                                            // 245
                                                                       //
        // preventDefault(), is necessary                              //
        if (this.options.shouldPreventDefault) ev.preventDefault();    // 248
                                                                       //
        // allow / disallow event bubbling                             //
        if (!this.options.allowDragEventPropagation) ev.stopPropagation();
                                                                       //
        // animation loop to ensure we don't fire                      //
        // too many unneccessary repaints                              //
        (function () {                                                 // 257
          function watchMoveLoop() {                                   // 257
            if (!self.active) return;                                  // 258
            self.handleMove();                                         // 259
            self.requestAnimationFrame(watchMoveLoop);                 // 260
          }                                                            //
                                                                       //
          return watchMoveLoop;                                        //
        })()();                                                        //
                                                                       //
        (function () {                                                 // 263
          function watchEasingLoop() {                                 // 263
            if (!self.options.easing) return;                          // 264
            if (self.easing) self.options.easing.call(self, null, self);
            self.requestAnimationFrame(watchEasingLoop);               // 266
          }                                                            //
                                                                       //
          return watchEasingLoop;                                      //
        })()();                                                        //
      }                                                                //
    }                                                                  //
  };                                                                   //
                                                                       //
  //  handleMove();                                                    //
  //    the logic for when the move events occur                       //
  Pep.prototype.handleMove = function () {                             // 274
                                                                       //
    // setup our event object                                          //
    if (typeof this.moveEvent === 'undefined') return;                 // 277
                                                                       //
    // get our move event's x & y                                      //
    var ev = this.normalizeEvent(this.moveEvent);                      // 281
    var curX = window.parseInt(ev.pep.x / this.options.grid[0]) * this.options.grid[0];
    var curY = window.parseInt(ev.pep.y / this.options.grid[1]) * this.options.grid[1];
                                                                       //
    // last in, first out (LIFO) queue to help us manage velocity      //
    this.addToLIFO({ time: ev.timeStamp, x: curX, y: curY });          // 286
                                                                       //
    // calculate values necessary to moving                            //
    var dx, dy;                                                        // 289
                                                                       //
    if ($.inArray(ev.type, this.startTriggerArray) > -1) {             // 291
      dx = 0;                                                          // 292
      dy = 0;                                                          // 293
    } else {                                                           //
      dx = curX - this.ev.x;                                           // 295
      dy = curY - this.ev.y;                                           // 296
    }                                                                  //
                                                                       //
    this.dx = dx;                                                      // 299
    this.dy = dy;                                                      // 300
    this.ev.x = curX;                                                  // 301
    this.ev.y = curY;                                                  // 302
                                                                       //
    // no movement in either direction -- so return                    //
    if (dx === 0 && dy === 0) {                                        // 305
      this.log({ type: 'event', event: '** stopped **' });             // 306
      return;                                                          // 307
    }                                                                  //
                                                                       //
    // check if object has moved past X/Y thresholds                   //
    // if so, fire users start event                                   //
    var initialDx = Math.abs(this.startX - curX);                      // 312
    var initialDy = Math.abs(this.startY - curY);                      // 313
    if (!this.started && (initialDx > this.options.startThreshold[0] || initialDy > this.options.startThreshold[1])) {
      this.started = true;                                             // 315
      this.$el.addClass('pep-start');                                  // 316
      this.options.start.call(this, this.startEvent, this);            // 317
    }                                                                  //
                                                                       //
    // Calculate our drop regions                                      //
    if (this.options.droppable) {                                      // 321
      this.calculateActiveDropRegions();                               // 322
    }                                                                  //
                                                                       //
    // fire user's drag event.                                         //
    var continueDrag = this.options.drag.call(this, ev, this);         // 326
                                                                       //
    if (continueDrag === false) {                                      // 328
      this.resetVelocityQueue();                                       // 329
      return;                                                          // 330
    }                                                                  //
                                                                       //
    // log the move trigger & event position                           //
    this.log({ type: 'event', event: ev.type });                       // 334
    this.log({ type: 'event-coords', x: this.ev.x, y: this.ev.y });    // 335
    this.log({ type: 'velocity' });                                    // 336
                                                                       //
    this.doMoveTo(dx, dy);                                             // 338
  };                                                                   //
                                                                       //
  Pep.prototype.doMoveTo = function (dx, dy) {                         // 341
    var hash = this.handleConstraint(dx, dy);                          // 342
    var xOp, yOp;                                                      // 343
                                                                       //
    // if using not using CSS transforms, move object via absolute position
    if (typeof this.options.moveTo === 'function') {                   // 346
      xOp = dx >= 0 ? "+=" + Math.abs(dx / this.scale) * this.options.multiplier : "-=" + Math.abs(dx / this.scale) * this.options.multiplier;
      yOp = dy >= 0 ? "+=" + Math.abs(dy / this.scale) * this.options.multiplier : "-=" + Math.abs(dy / this.scale) * this.options.multiplier;
                                                                       //
      if (this.options.constrainTo) {                                  // 350
        xOp = hash.x !== false ? hash.x : xOp;                         // 351
        yOp = hash.y !== false ? hash.y : yOp;                         // 352
      }                                                                //
                                                                       //
      // only move along single axis, if necessary                     //
      if (this.options.axis === 'x') yOp = hash.y;                     // 356
      if (this.options.axis === 'y') xOp = hash.x;                     // 357
                                                                       //
      this.options.moveTo.call(this, xOp, yOp);                        // 359
    } else if (!this.shouldUseCSSTranslation()) {                      //
      xOp = dx >= 0 ? "+=" + Math.abs(dx / this.scale) * this.options.multiplier : "-=" + Math.abs(dx / this.scale) * this.options.multiplier;
      yOp = dy >= 0 ? "+=" + Math.abs(dy / this.scale) * this.options.multiplier : "-=" + Math.abs(dy / this.scale) * this.options.multiplier;
                                                                       //
      if (this.options.constrainTo) {                                  // 364
        xOp = hash.x !== false ? hash.x : xOp;                         // 365
        yOp = hash.y !== false ? hash.y : yOp;                         // 366
      }                                                                //
                                                                       //
      // only move along single axis, if necessary                     //
      if (this.options.axis === 'x') yOp = hash.y;                     // 370
      if (this.options.axis === 'y') xOp = hash.x;                     // 371
                                                                       //
      this.moveTo(xOp, yOp);                                           // 373
    } else {                                                           //
                                                                       //
      dx = dx / this.scale * this.options.multiplier;                  // 377
      dy = dy / this.scale * this.options.multiplier;                  // 378
                                                                       //
      if (this.options.constrainTo) {                                  // 380
        dx = hash.x === false ? dx : 0;                                // 381
        dy = hash.y === false ? dy : 0;                                // 382
      }                                                                //
                                                                       //
      // only move along single axis, if necessary                     //
      if (this.options.axis === 'x') dy = 0;                           // 386
      if (this.options.axis === 'y') dx = 0;                           // 387
                                                                       //
      this.moveToUsingTransforms(dx, dy);                              // 389
    }                                                                  //
  };                                                                   //
                                                                       //
  //  handleStop();                                                    //
  //    the logic for when the stop events occur                       //
  Pep.prototype.handleStop = function (ev) {                           // 395
                                                                       //
    // no need to handle stop event if we're not active                //
    if (!this.active) return;                                          // 398
                                                                       //
    // log it                                                          //
    this.log({ type: 'event', event: ev.type });                       // 402
                                                                       //
    // make object inactive, so watchMoveLoop returns                  //
    this.active = false;                                               // 405
                                                                       //
    // make object easing.                                             //
    this.easing = true;                                                // 408
                                                                       //
    // remove our start class                                          //
    this.$el.removeClass('pep-start').addClass('pep-ease');            // 411
                                                                       //
    // Calculate our drop regions                                      //
    if (this.options.droppable) {                                      // 415
      this.calculateActiveDropRegions();                               // 416
    }                                                                  //
                                                                       //
    // fire user's stop event.                                         //
    if (this.started || !this.started && $.inArray('stop', this.options.callIfNotStarted) > -1) {
      this.options.stop.call(this, ev, this);                          // 421
    }                                                                  //
                                                                       //
    // ease the object, if necessary.                                  //
    if (this.options.shouldEase) {                                     // 425
      this.ease(ev, this.started);                                     // 426
    } else {                                                           //
      this.removeActiveClass();                                        // 428
    }                                                                  //
                                                                       //
    if (this.options.revert && (this.options.revertAfter === 'stop' || !this.options.shouldEase) && (this.options.revertIf && this.options.revertIf.call(this))) {
      this.revert();                                                   // 432
    }                                                                  //
                                                                       //
    // this must be set to false after                                 //
    // the user's stop event is called, so the dev                     //
    // has access to it.                                               //
    this.started = false;                                              // 438
                                                                       //
    // reset the velocity queue                                        //
    this.resetVelocityQueue();                                         // 441
  };                                                                   //
                                                                       //
  //  ease();                                                          //
  //    used in conjunction with the LIFO queue                        //
  //    to ease the object after stop                                  //
  Pep.prototype.ease = function (ev, started) {                        // 448
                                                                       //
    var pos = this.$el.position();                                     // 450
    var vel = this.velocity();                                         // 451
    var dt = this.dt;                                                  // 452
    var x = vel.x / this.scale * this.options.multiplier;              // 453
    var y = vel.y / this.scale * this.options.multiplier;              // 454
                                                                       //
    var hash = this.handleConstraint(x, y, true);                      // 456
                                                                       //
    // ✪  Apply the CSS3 animation easing magic  ✪                     //
    if (this.cssAnimationsSupported()) this.$el.css(this.getCSSEaseHash());
                                                                       //
    var xOp = vel.x > 0 ? "+=" + x : "-=" + Math.abs(x);               // 462
    var yOp = vel.y > 0 ? "+=" + y : "-=" + Math.abs(y);               // 463
                                                                       //
    if (this.options.constrainTo) {                                    // 465
      xOp = hash.x !== false ? hash.x : xOp;                           // 466
      yOp = hash.y !== false ? hash.y : yOp;                           // 467
    }                                                                  //
                                                                       //
    if (this.options.axis === 'x') yOp = "+=0";                        // 470
    if (this.options.axis === 'y') xOp = "+=0";                        // 471
                                                                       //
    // ease it via JS, the last true tells it to animate.              //
    var jsAnimateFallback = !this.cssAnimationsSupported() || this.options.forceNonCSS3Movement;
    if (typeof this.options.moveTo === 'function') {                   // 475
      this.options.moveTo.call(this, xOp, yOp);                        // 476
    } else {                                                           //
      this.moveTo(xOp, yOp, jsAnimateFallback);                        // 478
    }                                                                  //
                                                                       //
    // when the rest occurs, remove active class and call              //
    // user's rest event.                                              //
    var self = this;                                                   // 483
    this.restTimeout = setTimeout(function () {                        // 484
                                                                       //
      // Calculate our drop regions                                    //
      if (self.options.droppable) {                                    // 487
        self.calculateActiveDropRegions();                             // 488
      }                                                                //
                                                                       //
      self.easing = false;                                             // 491
                                                                       //
      // call users rest event.                                        //
      if (started || !started && $.inArray('rest', self.options.callIfNotStarted) > -1) {
        self.options.rest.call(self, ev, self);                        // 495
      }                                                                //
                                                                       //
      // revert thy self!                                              //
      if (self.options.revert && (self.options.revertAfter === 'ease' && self.options.shouldEase) && (self.options.revertIf && self.options.revertIf.call(self))) {
        self.revert();                                                 // 500
      }                                                                //
                                                                       //
      // remove active class                                           //
      self.removeActiveClass();                                        // 504
    }, this.options.cssEaseDuration);                                  //
  };                                                                   //
                                                                       //
  // normalizeEvent()                                                  //
  Pep.prototype.normalizeEvent = function (ev) {                       // 511
    ev.pep = {};                                                       // 512
                                                                       //
    if (this.isPointerEventCompatible() || !this.isTouch(ev)) {        // 514
                                                                       //
      if (ev.pageX) {                                                  // 516
        ev.pep.x = ev.pageX;                                           // 517
        ev.pep.y = ev.pageY;                                           // 518
      } else {                                                         //
        ev.pep.x = ev.originalEvent.pageX;                             // 520
        ev.pep.y = ev.originalEvent.pageY;                             // 521
      }                                                                //
                                                                       //
      ev.pep.type = ev.type;                                           // 524
    } else {                                                           //
      ev.pep.x = ev.originalEvent.touches[0].pageX;                    // 528
      ev.pep.y = ev.originalEvent.touches[0].pageY;                    // 529
      ev.pep.type = ev.type;                                           // 530
    }                                                                  //
                                                                       //
    return ev;                                                         // 533
  };                                                                   //
                                                                       //
  // resetVelocityQueue()                                              //
  //                                                                   //
  Pep.prototype.resetVelocityQueue = function () {                     // 538
    this.velocityQueue = new Array(5);                                 // 539
  };                                                                   //
                                                                       //
  //  moveTo();                                                        //
  //    move the object to an x and/or y value                         //
  //    using jQuery's .css function -- this fxn uses the              //
  //    .css({top: "+=20", left: "-=30"}) syntax                       //
  Pep.prototype.moveTo = function (x, y, animate) {                    // 546
                                                                       //
    this.log({ type: 'delta', x: x, y: y });                           // 548
    if (animate) {                                                     // 549
      this.$el.animate({ top: y, left: x }, 0, 'easeOutQuad', { queue: false });
    } else {                                                           //
      this.$el.stop(true, false).css({ top: y, left: x });             // 552
    }                                                                  //
  };                                                                   //
                                                                       //
  //  moveToUsingTransforms();                                         //
  //    move the object to an x and/or y value                         //
  Pep.prototype.moveToUsingTransforms = function (x, y) {              // 559
                                                                       //
    // Check for our initial values if we don't have them.             //
    var matrixArray = this.matrixToArray(this.matrixString());         // 562
    if (!this.cssX) this.cssX = this.xTranslation(matrixArray);        // 563
                                                                       //
    if (!this.cssY) this.cssY = this.yTranslation(matrixArray);        // 566
                                                                       //
    // CSS3 transforms are additive from current position              //
    this.cssX = this.cssX + x;                                         // 570
    this.cssY = this.cssY + y;                                         // 571
                                                                       //
    this.log({ type: 'delta', x: x, y: y });                           // 573
                                                                       //
    matrixArray[4] = this.cssX;                                        // 575
    matrixArray[5] = this.cssY;                                        // 576
                                                                       //
    this.translation = this.arrayToMatrix(matrixArray);                // 578
    this.transform(this.translation);                                  // 579
  };                                                                   //
                                                                       //
  Pep.prototype.transform = function (value) {                         // 582
    this.$el.css({                                                     // 583
      '-webkit-transform': value,                                      // 584
      '-moz-transform': value,                                         // 585
      '-ms-transform': value,                                          // 586
      '-o-transform': value,                                           // 587
      'transform': value });                                           // 588
  };                                                                   //
                                                                       //
  Pep.prototype.xTranslation = function (matrixArray) {                // 591
    matrixArray = matrixArray || this.matrixToArray(this.matrixString());
    return parseInt(matrixArray[4], 10);                               // 593
  };                                                                   //
                                                                       //
  Pep.prototype.yTranslation = function (matrixArray) {                // 596
    matrixArray = matrixArray || this.matrixToArray(this.matrixString());
    return parseInt(matrixArray[5], 10);                               // 598
  };                                                                   //
                                                                       //
  // 3 helper functions for working with the                           //
  // objects CSS3 transforms                                           //
  // matrixString                                                      //
  // matrixToArray                                                     //
  // arrayToMatrix                                                     //
  Pep.prototype.matrixString = function () {                           // 607
                                                                       //
    var validMatrix = function (o) {                                   // 609
      return !(!o || o === 'none' || o.indexOf('matrix') < 0);         // 610
    };                                                                 //
                                                                       //
    var matrix = "matrix(1, 0, 0, 1, 0, 0)";                           // 613
                                                                       //
    if (validMatrix(this.$el.css('-webkit-transform'))) matrix = this.$el.css('-webkit-transform');
                                                                       //
    if (validMatrix(this.$el.css('-moz-transform'))) matrix = this.$el.css('-moz-transform');
                                                                       //
    if (validMatrix(this.$el.css('-ms-transform'))) matrix = this.$el.css('-ms-transform');
                                                                       //
    if (validMatrix(this.$el.css('-o-transform'))) matrix = this.$el.css('-o-transform');
                                                                       //
    if (validMatrix(this.$el.css('transform'))) matrix = this.$el.css('transform');
                                                                       //
    return matrix;                                                     // 630
  };                                                                   //
                                                                       //
  Pep.prototype.matrixToArray = function (str) {                       // 633
    return str.split('(')[1].split(')')[0].split(',');                 // 634
  };                                                                   //
                                                                       //
  Pep.prototype.arrayToMatrix = function (array) {                     // 637
    return "matrix(" + array.join(',') + ")";                          // 638
  };                                                                   //
                                                                       //
  //  addToLIFO();                                                     //
  //    a Last-In/First-Out array of the 5 most recent                 //
  //    velocity points, which is used for easing                      //
  Pep.prototype.addToLIFO = function (val) {                           // 644
    // last in, first out                                              //
    var arr = this.velocityQueue;                                      // 646
    arr = arr.slice(1, arr.length);                                    // 647
    arr.push(val);                                                     // 648
    this.velocityQueue = arr;                                          // 649
  };                                                                   //
                                                                       //
  //  velocity();                                                      //
  //    using the LIFO, calculate velocity and return                  //
  //    velocity in each direction (x & y)                             //
  Pep.prototype.velocity = function () {                               // 655
    var sumX = 0;                                                      // 656
    var sumY = 0;                                                      // 657
                                                                       //
    for (var i = 0; i < this.velocityQueue.length - 1; i++) {          // 659
      if (this.velocityQueue[i]) {                                     // 660
        sumX += this.velocityQueue[i + 1].x - this.velocityQueue[i].x;
        sumY += this.velocityQueue[i + 1].y - this.velocityQueue[i].y;
        this.dt = this.velocityQueue[i + 1].time - this.velocityQueue[i].time;
      }                                                                //
    }                                                                  //
                                                                       //
    // return velocity in each direction.                              //
    return { x: sumX * this.options.velocityMultiplier, y: sumY * this.options.velocityMultiplier };
  };                                                                   //
                                                                       //
  Pep.prototype.revert = function () {                                 // 671
    if (this.shouldUseCSSTranslation()) {                              // 672
      this.moveToUsingTransforms(-this.xTranslation(), -this.yTranslation());
    }                                                                  //
                                                                       //
    this.moveTo(this.initialPosition.left, this.initialPosition.top);  // 676
  };                                                                   //
                                                                       //
  //  requestAnimationFrame();                                         //
  //    requestAnimationFrame Polyfill                                 //
  //    More info:                                                     //
  //    http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  Pep.prototype.requestAnimationFrame = function (callback) {          // 683
    return window.requestAnimationFrame && window.requestAnimationFrame(callback) || window.webkitRequestAnimationFrame && window.webkitRequestAnimationFrame(callback) || window.mozRequestAnimationFrame && window.mozRequestAnimationFrame(callback) || window.oRequestAnimationFrame && window.mozRequestAnimationFrame(callback) || window.msRequestAnimationFrame && window.msRequestAnimationFrame(callback) || window.setTimeout(callback, 1000 / 60);
  };                                                                   //
                                                                       //
  //  positionParent();                                                //
  //    add the right positioning to the parent object                 //
  Pep.prototype.positionParent = function () {                         // 694
                                                                       //
    if (!this.options.constrainTo || this.parentPositioned) return;    // 696
                                                                       //
    this.parentPositioned = true;                                      // 699
                                                                       //
    // make `relative` parent if necessary                             //
    if (this.options.constrainTo === 'parent') {                       // 702
      this.$container.css({ position: 'relative' });                   // 703
    } else if (this.options.constrainTo === 'window' && this.$container.get(0).nodeName !== "#document" && this.$container.css('position') !== 'static') {
      this.$container.css({ position: 'static' });                     // 708
    }                                                                  //
  };                                                                   //
                                                                       //
  //  placeObject();                                                   //
  //    add the right positioning to the object                        //
  Pep.prototype.placeObject = function () {                            // 715
                                                                       //
    if (this.objectPlaced) return;                                     // 717
                                                                       //
    this.objectPlaced = true;                                          // 720
                                                                       //
    this.offset = this.options.constrainTo === 'parent' || this.hasNonBodyRelative() ? this.$el.position() : this.$el.offset();
                                                                       //
    // better to leave absolute position alone if                      //
    // it already has one.                                             //
    if (parseInt(this.$el.css('left'), 10)) this.offset.left = this.$el.css('left');
                                                                       //
    if (typeof this.options.startPos.left === "number") this.offset.left = this.options.startPos.left;
                                                                       //
    if (parseInt(this.$el.css('top'), 10)) this.offset.top = this.$el.css('top');
                                                                       //
    if (typeof this.options.startPos.top === "number") this.offset.top = this.options.startPos.top;
                                                                       //
    if (this.options.removeMargins) this.$el.css({ margin: 0 });       // 739
                                                                       //
    this.$el.css({                                                     // 742
      position: 'absolute',                                            // 743
      top: this.offset.top,                                            // 744
      left: this.offset.left                                           // 745
    });                                                                //
  };                                                                   //
                                                                       //
  //  hasNonBodyRelative()                                             //
  //    returns true if any parent other than the body                 //
  //    has relative positioning                                       //
  Pep.prototype.hasNonBodyRelative = function () {                     // 753
    return this.$el.parents().filter(function () {                     // 754
      var $this = $(this);                                             // 755
      return $this.is('body') || $this.css('position') === 'relative';
    }).length > 1;                                                     //
  };                                                                   //
                                                                       //
  //  setScale()                                                       //
  //    set the scale of the object being moved.                       //
  Pep.prototype.setScale = function (val) {                            // 762
    this.scale = val;                                                  // 763
  };                                                                   //
                                                                       //
  //  setMultiplier()                                                  //
  //    set the multiplier of the object being moved.                  //
  Pep.prototype.setMultiplier = function (val) {                       // 768
    this.options.multiplier = val;                                     // 769
  };                                                                   //
                                                                       //
  //  removeCSSEasing();                                               //
  //    remove CSS easing properties, if necessary                     //
  Pep.prototype.removeCSSEasing = function () {                        // 774
    if (this.cssAnimationsSupported()) this.$el.css(this.getCSSEaseHash(true));
  };                                                                   //
                                                                       //
  //  disableSelect();                                                 //
  //    add the property which causes the object                       //
  //    to not be selected user drags over text areas                  //
  Pep.prototype.disableSelect = function () {                          // 782
                                                                       //
    this.$el.css({                                                     // 784
      '-webkit-touch-callout': 'none',                                 // 785
      '-webkit-user-select': 'none',                                   // 786
      '-khtml-user-select': 'none',                                    // 787
      '-moz-user-select': 'none',                                      // 788
      '-ms-user-select': 'none',                                       // 789
      'user-select': 'none'                                            // 790
    });                                                                //
  };                                                                   //
                                                                       //
  // removeActiveClass()                                               //
  //  Removes the active class.                                        //
  Pep.prototype.removeActiveClass = function () {                      // 797
    this.$el.removeClass([this.options.activeClass, 'pep-ease'].join(' '));
  };                                                                   //
                                                                       //
  //  handleConstraint();                                              //
  //    returns a hash of where to move to                             //
  //    when we constrain to parent/window                             //
  Pep.prototype.handleConstraint = function (dx, dy, accountForTranslation) {
    var pos = this.$el.position();                                     // 805
    this.pos.x = pos.left;                                             // 806
    this.pos.y = pos.top;                                              // 807
                                                                       //
    var hash = { x: false, y: false };                                 // 809
                                                                       //
    var upperYLimit, upperXLimit, lowerXLimit, lowerYLimit;            // 811
                                                                       //
    // log our positions                                               //
    this.log({ type: "pos-coords", x: this.pos.x, y: this.pos.y });    // 814
                                                                       //
    if ($.isArray(this.options.constrainTo)) {                         // 816
                                                                       //
      if (this.options.constrainTo[3] !== undefined && this.options.constrainTo[1] !== undefined) {
        upperXLimit = this.options.constrainTo[1] === false ? Infinity : this.options.constrainTo[1];
        lowerXLimit = this.options.constrainTo[3] === false ? -Infinity : this.options.constrainTo[3];
      }                                                                //
      if (this.options.constrainTo[0] !== false && this.options.constrainTo[2] !== false) {
        upperYLimit = this.options.constrainTo[2] === false ? Infinity : this.options.constrainTo[2];
        lowerYLimit = this.options.constrainTo[0] === false ? -Infinity : this.options.constrainTo[0];
      }                                                                //
                                                                       //
      // is our object trying to move outside lower X & Y limits?      //
      if (this.pos.x + dx < lowerXLimit) hash.x = lowerXLimit;         // 828
      if (this.pos.y + dy < lowerYLimit) hash.y = lowerYLimit;         // 829
    } else if (typeof this.options.constrainTo === 'string') {         //
      lowerXLimit = 0;                                                 // 832
      lowerYLimit = 0;                                                 // 833
      upperXLimit = this.$container.width() - this.$el.outerWidth();   // 834
      upperYLimit = this.$container.height() - this.$el.outerHeight();
                                                                       //
      // is our object trying to move outside lower X & Y limits?      //
      if (this.pos.x + dx < 0) hash.x = 0;                             // 838
      if (this.pos.y + dy < 0) hash.y = 0;                             // 839
    }                                                                  //
                                                                       //
    // is our object trying to move outside upper X & Y limits?        //
    if (this.pos.x + dx > upperXLimit) hash.x = upperXLimit;           // 843
    if (this.pos.y + dy > upperYLimit) hash.y = upperYLimit;           // 844
                                                                       //
    // Account for translation, which makes movement a little tricky.  //
    if (this.shouldUseCSSTranslation() && accountForTranslation) {     // 847
      if (hash.x === lowerXLimit && this.xTranslation()) hash.x = lowerXLimit - this.xTranslation();
      if (hash.x === upperXLimit && this.xTranslation()) hash.x = upperXLimit - this.xTranslation();
                                                                       //
      if (hash.y === lowerYLimit && this.yTranslation()) hash.y = lowerYLimit - this.yTranslation();
      if (hash.y === upperYLimit && this.yTranslation()) hash.y = upperYLimit - this.yTranslation();
    }                                                                  //
                                                                       //
    return hash;                                                       // 855
  };                                                                   //
                                                                       //
  //  getCSSEaseHash();                                                //
  //    returns a hash of params used in conjunction                   //
  //    with this.options.cssEaseString                                //
  Pep.prototype.getCSSEaseHash = function (reset) {                    // 861
    if (typeof reset === 'undefined') reset = false;                   // 862
                                                                       //
    var cssEaseString;                                                 // 864
    if (reset) {                                                       // 865
      cssEaseString = '';                                              // 866
    } else if (this.CSSEaseHash) {                                     //
      return this.CSSEaseHash;                                         // 868
    } else {                                                           //
      cssEaseString = ['all', this.options.cssEaseDuration + 'ms', this.options.cssEaseString].join(' ');
    }                                                                  //
                                                                       //
    return {                                                           // 873
      '-webkit-transition': cssEaseString, // chrome, safari, etc.     // 874
      '-moz-transition': cssEaseString, // firefox                     // 875
      '-ms-transition': cssEaseString, // microsoft                    // 876
      '-o-transition': cssEaseString, // opera                         // 877
      'transition': cssEaseString // future                            // 878
    };                                                                 //
  };                                                                   //
                                                                       //
  // calculateActiveDropRegions()                                      //
  //    sets parent droppables of this.                                //
  Pep.prototype.calculateActiveDropRegions = function () {             // 884
    var self = this;                                                   // 885
    this.activeDropRegions.length = 0;                                 // 886
                                                                       //
    $.each($(this.options.droppable), function (idx, el) {             // 888
      var $el = $(el);                                                 // 889
      if (self.isOverlapping($el, self.$el)) {                         // 890
        $el.addClass(self.options.droppableActiveClass);               // 891
        self.activeDropRegions.push($el);                              // 892
      } else {                                                         //
        $el.removeClass(self.options.droppableActiveClass);            // 894
      }                                                                //
    });                                                                //
  };                                                                   //
                                                                       //
  //  isOverlapping();                                                 //
  //    returns true if element a over                                 //
  Pep.prototype.isOverlapping = function ($a, $b) {                    // 902
                                                                       //
    if (this.options.overlapFunction) {                                // 904
      return this.options.overlapFunction($a, $b);                     // 905
    }                                                                  //
                                                                       //
    var rect1 = $a[0].getBoundingClientRect();                         // 908
    var rect2 = $b[0].getBoundingClientRect();                         // 909
                                                                       //
    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
  };                                                                   //
                                                                       //
  //  isTouch();                                                       //
  //    returns whether or not event is a touch event                  //
  Pep.prototype.isTouch = function (ev) {                              // 919
    return ev.type.search('touch') > -1;                               // 920
  };                                                                   //
                                                                       //
  // isPointerEventCompatible();                                       //
  //    return whether or note our device is pointer                   //
  //    event compatible; typically means where on a                   //
  //    touch Win8 device                                              //
  Pep.prototype.isPointerEventCompatible = function () {               // 927
    return "MSPointerEvent" in window;                                 // 928
  };                                                                   //
                                                                       //
  // applyMSDefaults();                                                //
  Pep.prototype.applyMSDefaults = function (first_argument) {          // 932
    this.$el.css({                                                     // 933
      '-ms-touch-action': 'none',                                      // 934
      'touch-action': 'none',                                          // 935
      '-ms-scroll-chaining': 'none',                                   // 936
      '-ms-scroll-limit': '0 0 0 0'                                    // 937
    });                                                                //
  };                                                                   //
                                                                       //
  //  isValidMoveEvent();                                              //
  //    returns true if we're on a non-touch device -- or --           //
  //    if the event is **single** touch event on a touch device       //
  Pep.prototype.isValidMoveEvent = function (ev) {                     // 944
    return !this.isTouch(ev) || this.isTouch(ev) && ev.originalEvent && ev.originalEvent.touches && ev.originalEvent.touches.length === 1;
  };                                                                   //
                                                                       //
  //  shouldUseCSSTranslation();                                       //
  //    return true if we should use CSS transforms for move the object
  Pep.prototype.shouldUseCSSTranslation = function () {                // 950
                                                                       //
    if (this.options.forceNonCSS3Movement) return false;               // 952
                                                                       //
    if (typeof this.useCSSTranslation !== "undefined") return this.useCSSTranslation;
                                                                       //
    var useCSSTranslation = false;                                     // 958
                                                                       //
    if (!this.options.useCSSTranslation || typeof Modernizr !== "undefined" && !Modernizr.csstransforms) {
      useCSSTranslation = false;                                       // 961
    } else {                                                           //
      useCSSTranslation = true;                                        // 964
    }                                                                  //
                                                                       //
    this.useCSSTranslation = useCSSTranslation;                        // 967
    return useCSSTranslation;                                          // 968
  };                                                                   //
                                                                       //
  //  cssAnimationsSupported():                                        //
  //    returns true if the browser supports CSS animations            //
  //    which are used for easing..                                    //
  Pep.prototype.cssAnimationsSupported = function () {                 // 974
                                                                       //
    if (typeof this.cssAnimationsSupport !== "undefined") {            // 976
      return this.cssAnimationsSupport;                                // 977
    }                                                                  //
                                                                       //
    // If the page has Modernizr, let them do the heavy lifting.       //
    if (typeof Modernizr !== "undefined" && Modernizr.cssanimations) {
      this.cssAnimationsSupport = true;                                // 982
      return true;                                                     // 983
    }                                                                  //
                                                                       //
    var animation = false,                                             // 986
        elm = document.createElement('div'),                           //
        animationstring = 'animation',                                 //
        keyframeprefix = '',                                           //
        domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),              //
        pfx = '';                                                      //
                                                                       //
    if (elm.style.animationName) {                                     // 993
      animation = true;                                                // 993
    }                                                                  //
                                                                       //
    if (animation === false) {                                         // 995
      for (var i = 0; i < domPrefixes.length; i++) {                   // 996
        if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
          pfx = domPrefixes[i];                                        // 998
          animationstring = pfx + 'Animation';                         // 999
          keyframeprefix = '-' + pfx.toLowerCase() + '-';              // 1000
          animation = true;                                            // 1001
          break;                                                       // 1002
        }                                                              //
      }                                                                //
    }                                                                  //
                                                                       //
    this.cssAnimationsSupport = animation;                             // 1007
    return animation;                                                  // 1008
  };                                                                   //
                                                                       //
  //  hardwareAccelerate();                                            //
  //    add fool-proof CSS3 hardware acceleration.                     //
  Pep.prototype.hardwareAccelerate = function () {                     // 1013
    this.$el.css({                                                     // 1014
      '-webkit-perspective': 1000,                                     // 1015
      'perspective': 1000,                                             // 1016
      '-webkit-backface-visibility': 'hidden',                         // 1017
      'backface-visibility': 'hidden'                                  // 1018
    });                                                                //
  };                                                                   //
                                                                       //
  //  getMovementValues();                                             //
  //    returns object pos, event position, and velocity in each direction.
  Pep.prototype.getMovementValues = function () {                      // 1024
    return { ev: this.ev, pos: this.pos, velocity: this.velocity() };  // 1025
  };                                                                   //
                                                                       //
  //  buildDebugDiv();                                                 //
  //    Create a little div in the lower right corner of the window    //
  //    for extra info about the object currently moving               //
  Pep.prototype.buildDebugDiv = function () {                          // 1031
                                                                       //
    // Build the debugDiv and it's inner HTML -- if necessary          //
    var $debugDiv;                                                     // 1034
    if ($('#pep-debug').length === 0) {                                // 1035
      $debugDiv = $('<div></div>');                                    // 1036
      $debugDiv.attr('id', 'pep-debug').append("<div style='font-weight:bold; background: red; color: white;'>DEBUG MODE</div>").append("<div id='pep-debug-event'>no event</div>").append("<div id='pep-debug-ev-coords'>event coords: <span class='pep-x'>-</span>, <span class='pep-y'>-</span></div>").append("<div id='pep-debug-pos-coords'>position coords: <span class='pep-x'>-</span>, <span class='pep-y'>-</span></div>").append("<div id='pep-debug-velocity'>velocity: <span class='pep-x'>-</span>, <span class='pep-y'>-</span></div>").append("<div id='pep-debug-delta'>&Delta; movement: <span class='pep-x'>-</span>, <span class='pep-y'>-</span></div>").css({
        position: 'fixed',                                             // 1046
        bottom: 5,                                                     // 1047
        right: 5,                                                      // 1048
        zIndex: 99999,                                                 // 1049
        textAlign: 'right',                                            // 1050
        fontFamily: 'Arial, sans',                                     // 1051
        fontSize: 10,                                                  // 1052
        border: '1px solid #DDD',                                      // 1053
        padding: '3px',                                                // 1054
        background: 'white',                                           // 1055
        color: '#333'                                                  // 1056
      });                                                              //
    }                                                                  //
                                                                       //
    var self = this;                                                   // 1060
    setTimeout(function () {                                           // 1061
      self.debugElements = {                                           // 1062
        $event: $("#pep-debug-event"),                                 // 1063
        $velocityX: $("#pep-debug-velocity .pep-x"),                   // 1064
        $velocityY: $("#pep-debug-velocity .pep-y"),                   // 1065
        $dX: $("#pep-debug-delta .pep-x"),                             // 1066
        $dY: $("#pep-debug-delta .pep-y"),                             // 1067
        $evCoordsX: $("#pep-debug-ev-coords .pep-x"),                  // 1068
        $evCoordsY: $("#pep-debug-ev-coords .pep-y"),                  // 1069
        $posCoordsX: $("#pep-debug-pos-coords .pep-x"),                // 1070
        $posCoordsY: $("#pep-debug-pos-coords .pep-y")                 // 1071
      };                                                               //
    }, 0);                                                             //
                                                                       //
    $('body').append($debugDiv);                                       // 1075
  };                                                                   //
                                                                       //
  // log()                                                             //
  Pep.prototype.log = function (opts) {                                // 1079
    if (!this.options.debug) return;                                   // 1080
                                                                       //
    switch (opts.type) {                                               // 1082
      case "event":                                                    // 1083
        this.debugElements.$event.text(opts.event);                    // 1084
        break;                                                         // 1085
      case "pos-coords":                                               // 1086
        this.debugElements.$posCoordsX.text(opts.x);                   // 1087
        this.debugElements.$posCoordsY.text(opts.y);                   // 1088
        break;                                                         // 1089
      case "event-coords":                                             // 1090
        this.debugElements.$evCoordsX.text(opts.x);                    // 1091
        this.debugElements.$evCoordsY.text(opts.y);                    // 1092
        break;                                                         // 1093
      case "delta":                                                    // 1093
        this.debugElements.$dX.text(opts.x);                           // 1095
        this.debugElements.$dY.text(opts.y);                           // 1096
        break;                                                         // 1097
      case "velocity":                                                 // 1097
        var vel = this.velocity();                                     // 1099
        this.debugElements.$velocityX.text(Math.round(vel.x));         // 1100
        this.debugElements.$velocityY.text(Math.round(vel.y));         // 1101
        break;                                                         // 1102
    }                                                                  // 1102
  };                                                                   //
                                                                       //
  // toggle()                                                          //
  //  toggle the pep object                                            //
  Pep.prototype.toggle = function (on) {                               // 1108
    if (typeof on === "undefined") {                                   // 1109
      this.disabled = !this.disabled;                                  // 1110
    } else {                                                           //
      this.disabled = !on;                                             // 1113
    }                                                                  //
  };                                                                   //
                                                                       //
  //  *** Special Easings functions ***                                //
  //    Used for JS easing fallback                                    //
  //    We can use any of these for a                                  //
  //    good intertia ease                                             //
  $.extend($.easing, {                                                 // 1121
    easeOutQuad: function (x, t, b, c, d) {                            // 1123
      return -c * (t /= d) * (t - 2) + b;                              // 1124
    },                                                                 //
    easeOutCirc: function (x, t, b, c, d) {                            // 1126
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;               // 1127
    },                                                                 //
    easeOutExpo: function (x, t, b, c, d) {                            // 1129
      return t === d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    }                                                                  //
  });                                                                  //
                                                                       //
  //  wrap it                                                          //
  //    A really lightweight plugin wrapper around the constructor,    //
  //    preventing against multiple instantiations.                    //
  $.fn[pluginName] = function (options) {                              // 1137
    return this.each(function () {                                     // 1138
      if (!$.data(this, 'plugin_' + pluginName)) {                     // 1139
        var pepObj = new Pep(this, options);                           // 1140
        $.data(this, 'plugin_' + pluginName, pepObj);                  // 1141
        $.pep.peps.push(pepObj);                                       // 1142
      }                                                                //
    });                                                                //
  };                                                                   //
                                                                       //
  //  The   _   ___ ___                                                //
  //       /_\ | _ \_ _|                                               //
  //      / _ \|  _/| |                                                //
  //     /_/ \_\_| |___|                                               //
  //                                                                   //
  $.pep = {};                                                          // 1152
  $.pep.peps = [];                                                     // 1153
  $.pep.toggleAll = function (on) {                                    // 1154
    $.each(this.peps, function (index, pepObj) {                       // 1155
      pepObj.toggle(on);                                               // 1156
    });                                                                //
  };                                                                   //
                                                                       //
  $.pep.unbind = function ($obj) {                                     // 1160
    var pep = $obj.data('plugin_' + pluginName);                       // 1161
                                                                       //
    if (typeof pep === 'undefined') return;                            // 1163
                                                                       //
    pep.toggle(false);                                                 // 1166
    pep.unsubscribe();                                                 // 1167
    $obj.removeData('plugin_' + pluginName);                           // 1168
  };                                                                   //
})(jQuery, window);                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
