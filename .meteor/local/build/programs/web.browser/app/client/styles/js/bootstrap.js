(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/styles/js/bootstrap.js                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*!                                                                    //
 * Bootstrap v3.3.1 (http://getbootstrap.com)                          //
 * Copyright 2011-2014 Twitter, Inc.                                   //
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */                                                                    //
                                                                       //
if (typeof jQuery === 'undefined') {                                   // 7
  throw new Error('Bootstrap\'s JavaScript requires jQuery');          // 8
}                                                                      //
                                                                       //
+(function ($) {                                                       // 11
  var version = $.fn.jquery.split(' ')[0].split('.');                  // 12
  if (version[0] < 2 && version[1] < 9 || version[0] == 1 && version[1] == 9 && version[2] < 1) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher');
  }                                                                    //
})(jQuery);                                                            //
                                                                       //
/* ========================================================================
 * Bootstrap: transition.js v3.3.1                                     //
 * http://getbootstrap.com/javascript/#transitions                     //
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.                                   //
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
                                                                       //
+(function ($) {                                                       // 27
  'use strict';                                                        // 28
                                                                       //
  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)      //
  // ============================================================      //
                                                                       //
  function transitionEnd() {                                           // 33
    var el = document.createElement('bootstrap');                      // 34
                                                                       //
    var transEndEventNames = {                                         // 36
      WebkitTransition: 'webkitTransitionEnd',                         // 37
      MozTransition: 'transitionend',                                  // 38
      OTransition: 'oTransitionEnd otransitionend',                    // 39
      transition: 'transitionend'                                      // 40
    };                                                                 //
                                                                       //
    for (var name in babelHelpers.sanitizeForInObject(transEndEventNames)) {
      if (el.style[name] !== undefined) {                              // 44
        return { end: transEndEventNames[name] };                      // 45
      }                                                                //
    }                                                                  //
                                                                       //
    return false; // explicit for ie8 (  ._.)                          // 49
  }                                                                    //
                                                                       //
  // http://blog.alexmaccaw.com/css-transitions                        //
  $.fn.emulateTransitionEnd = function (duration) {                    // 53
    var called = false;                                                // 54
    var $el = this;                                                    // 55
    $(this).one('bsTransitionEnd', function () {                       // 56
      called = true;                                                   // 56
    });                                                                //
    var callback = function () {                                       // 57
      if (!called) $($el).trigger($.support.transition.end);           // 57
    };                                                                 //
    setTimeout(callback, duration);                                    // 58
    return this;                                                       // 59
  };                                                                   //
                                                                       //
  $(function () {                                                      // 62
    $.support.transition = transitionEnd();                            // 63
                                                                       //
    if (!$.support.transition) return;                                 // 65
                                                                       //
    $.event.special.bsTransitionEnd = {                                // 67
      bindType: $.support.transition.end,                              // 68
      delegateType: $.support.transition.end,                          // 69
      handle: function (e) {                                           // 70
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
      }                                                                //
    };                                                                 //
  });                                                                  //
})(jQuery);                                                            //
                                                                       //
/* ========================================================================
 * Bootstrap: alert.js v3.3.1                                          //
 * http://getbootstrap.com/javascript/#alerts                          //
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.                                   //
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
                                                                       //
+(function ($) {                                                       // 87
  'use strict';                                                        // 88
                                                                       //
  // ALERT CLASS DEFINITION                                            //
  // ======================                                            //
                                                                       //
  var dismiss = '[data-dismiss="alert"]';                              // 93
  var Alert = function (el) {                                          // 94
    $(el).on('click', dismiss, this.close);                            // 95
  };                                                                   //
                                                                       //
  Alert.VERSION = '3.3.1';                                             // 98
                                                                       //
  Alert.TRANSITION_DURATION = 150;                                     // 100
                                                                       //
  Alert.prototype.close = function (e) {                               // 102
    var $this = $(this);                                               // 103
    var selector = $this.attr('data-target');                          // 104
                                                                       //
    if (!selector) {                                                   // 106
      selector = $this.attr('href');                                   // 107
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }                                                                  //
                                                                       //
    var $parent = $(selector);                                         // 111
                                                                       //
    if (e) e.preventDefault();                                         // 113
                                                                       //
    if (!$parent.length) {                                             // 115
      $parent = $this.closest('.alert');                               // 116
    }                                                                  //
                                                                       //
    $parent.trigger(e = $.Event('close.bs.alert'));                    // 119
                                                                       //
    if (e.isDefaultPrevented()) return;                                // 121
                                                                       //
    $parent.removeClass('in');                                         // 123
                                                                       //
    function removeElement() {                                         // 125
      // detach from parent, fire event then clean up data             //
      $parent.detach().trigger('closed.bs.alert').remove();            // 127
    }                                                                  //
                                                                       //
    $.support.transition && $parent.hasClass('fade') ? $parent.one('bsTransitionEnd', removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement();
  };                                                                   //
                                                                       //
  // ALERT PLUGIN DEFINITION                                           //
  // =======================                                           //
                                                                       //
  function Plugin(option) {                                            // 141
    return this.each(function () {                                     // 142
      var $this = $(this);                                             // 143
      var data = $this.data('bs.alert');                               // 144
                                                                       //
      if (!data) $this.data('bs.alert', data = new Alert(this));       // 146
      if (typeof option == 'string') data[option].call($this);         // 147
    });                                                                //
  }                                                                    //
                                                                       //
  var old = $.fn.alert;                                                // 151
                                                                       //
  $.fn.alert = Plugin;                                                 // 153
  $.fn.alert.Constructor = Alert;                                      // 154
                                                                       //
  // ALERT NO CONFLICT                                                 //
  // =================                                                 //
                                                                       //
  $.fn.alert.noConflict = function () {                                // 160
    $.fn.alert = old;                                                  // 161
    return this;                                                       // 162
  };                                                                   //
                                                                       //
  // ALERT DATA-API                                                    //
  // ==============                                                    //
                                                                       //
  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close);
})(jQuery);                                                            //
                                                                       //
/* ========================================================================
 * Bootstrap: button.js v3.3.1                                         //
 * http://getbootstrap.com/javascript/#buttons                         //
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.                                   //
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
                                                                       //
+(function ($) {                                                       // 182
  'use strict';                                                        // 183
                                                                       //
  // BUTTON PUBLIC CLASS DEFINITION                                    //
  // ==============================                                    //
                                                                       //
  var Button = function (element, options) {                           // 188
    this.$element = $(element);                                        // 189
    this.options = $.extend({}, Button.DEFAULTS, options);             // 190
    this.isLoading = false;                                            // 191
  };                                                                   //
                                                                       //
  Button.VERSION = '3.3.1';                                            // 194
                                                                       //
  Button.DEFAULTS = {                                                  // 196
    loadingText: 'loading...'                                          // 197
  };                                                                   //
                                                                       //
  Button.prototype.setState = function (state) {                       // 200
    var d = 'disabled';                                                // 201
    var $el = this.$element;                                           // 202
    var val = $el.is('input') ? 'val' : 'html';                        // 203
    var data = $el.data();                                             // 204
                                                                       //
    state = state + 'Text';                                            // 206
                                                                       //
    if (data.resetText == null) $el.data('resetText', $el[val]());     // 208
                                                                       //
    // push to event loop to allow forms to submit                     //
    setTimeout($.proxy(function () {                                   // 211
      $el[val](data[state] == null ? this.options[state] : data[state]);
                                                                       //
      if (state == 'loadingText') {                                    // 214
        this.isLoading = true;                                         // 215
        $el.addClass(d).attr(d, d);                                    // 216
      } else if (this.isLoading) {                                     //
        this.isLoading = false;                                        // 218
        $el.removeClass(d).removeAttr(d);                              // 219
      }                                                                //
    }, this), 0);                                                      //
  };                                                                   //
                                                                       //
  Button.prototype.toggle = function () {                              // 224
    var changed = true;                                                // 225
    var $parent = this.$element.closest('[data-toggle="buttons"]');    // 226
                                                                       //
    if ($parent.length) {                                              // 228
      var $input = this.$element.find('input');                        // 229
      if ($input.prop('type') == 'radio') {                            // 230
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false;else $parent.find('.active').removeClass('active');
      }                                                                //
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change');
    } else {                                                           //
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'));
    }                                                                  //
                                                                       //
    if (changed) this.$element.toggleClass('active');                  // 239
  };                                                                   //
                                                                       //
  // BUTTON PLUGIN DEFINITION                                          //
  // ========================                                          //
                                                                       //
  function Plugin(option) {                                            // 246
    return this.each(function () {                                     // 247
      var $this = $(this);                                             // 248
      var data = $this.data('bs.button');                              // 249
      var options = typeof option == 'object' && option;               // 250
                                                                       //
      if (!data) $this.data('bs.button', data = new Button(this, options));
                                                                       //
      if (option == 'toggle') data.toggle();else if (option) data.setState(option);
    });                                                                //
  }                                                                    //
                                                                       //
  var old = $.fn.button;                                               // 259
                                                                       //
  $.fn.button = Plugin;                                                // 261
  $.fn.button.Constructor = Button;                                    // 262
                                                                       //
  // BUTTON NO CONFLICT                                                //
  // ==================                                                //
                                                                       //
  $.fn.button.noConflict = function () {                               // 268
    $.fn.button = old;                                                 // 269
    return this;                                                       // 270
  };                                                                   //
                                                                       //
  // BUTTON DATA-API                                                   //
  // ===============                                                   //
                                                                       //
  $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    var $btn = $(e.target);                                            // 279
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn');            // 280
    Plugin.call($btn, 'toggle');                                       // 281
    e.preventDefault();                                                // 282
  }).on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type));
  });                                                                  //
})(jQuery);                                                            //
                                                                       //
/* ========================================================================
 * Bootstrap: carousel.js v3.3.1                                       //
 * http://getbootstrap.com/javascript/#carousel                        //
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.                                   //
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
                                                                       //
+(function ($) {                                                       // 299
  'use strict';                                                        // 300
                                                                       //
  // CAROUSEL CLASS DEFINITION                                         //
  // =========================                                         //
                                                                       //
  var Carousel = function (element, options) {                         // 305
    this.$element = $(element);                                        // 306
    this.$indicators = this.$element.find('.carousel-indicators');     // 307
    this.options = options;                                            // 308
    this.paused = this.sliding = this.interval = this.$active = this.$items = null;
                                                                       //
    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this));
                                                                       //
    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element.on('mouseenter.bs.carousel', $.proxy(this.pause, this)).on('mouseleave.bs.carousel', $.proxy(this.cycle, this));
  };                                                                   //
                                                                       //
  Carousel.VERSION = '3.3.1';                                          // 322
                                                                       //
  Carousel.TRANSITION_DURATION = 600;                                  // 324
                                                                       //
  Carousel.DEFAULTS = {                                                // 326
    interval: 5000,                                                    // 327
    pause: 'hover',                                                    // 328
    wrap: true,                                                        // 329
    keyboard: true                                                     // 330
  };                                                                   //
                                                                       //
  Carousel.prototype.keydown = function (e) {                          // 333
    if (/input|textarea/i.test(e.target.tagName)) return;              // 334
    switch (e.which) {                                                 // 335
      case 37:                                                         // 336
        this.prev();break;                                             // 336
      case 39:                                                         // 337
        this.next();break;                                             // 337
      default:                                                         // 337
        return;                                                        // 338
    }                                                                  // 338
                                                                       //
    e.preventDefault();                                                // 341
  };                                                                   //
                                                                       //
  Carousel.prototype.cycle = function (e) {                            // 344
    e || (this.paused = false);                                        // 345
                                                                       //
    this.interval && clearInterval(this.interval);                     // 347
                                                                       //
    this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
                                                                       //
    return this;                                                       // 353
  };                                                                   //
                                                                       //
  Carousel.prototype.getItemIndex = function (item) {                  // 356
    this.$items = item.parent().children('.item');                     // 357
    return this.$items.index(item || this.$active);                    // 358
  };                                                                   //
                                                                       //
  Carousel.prototype.getItemForDirection = function (direction, active) {
    var delta = direction == 'prev' ? -1 : 1;                          // 362
    var activeIndex = this.getItemIndex(active);                       // 363
    var itemIndex = (activeIndex + delta) % this.$items.length;        // 364
    return this.$items.eq(itemIndex);                                  // 365
  };                                                                   //
                                                                       //
  Carousel.prototype.to = function (pos) {                             // 368
    var that = this;                                                   // 369
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'));
                                                                       //
    if (pos > this.$items.length - 1 || pos < 0) return;               // 372
                                                                       //
    if (this.sliding) return this.$element.one('slid.bs.carousel', function () {
      that.to(pos);                                                    // 374
    }); // yes, "slid"                                                 //
    if (activeIndex == pos) return this.pause().cycle();               // 375
                                                                       //
    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos));
  };                                                                   //
                                                                       //
  Carousel.prototype.pause = function (e) {                            // 380
    e || (this.paused = true);                                         // 381
                                                                       //
    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end);                 // 384
      this.cycle(true);                                                // 385
    }                                                                  //
                                                                       //
    this.interval = clearInterval(this.interval);                      // 388
                                                                       //
    return this;                                                       // 390
  };                                                                   //
                                                                       //
  Carousel.prototype.next = function () {                              // 393
    if (this.sliding) return;                                          // 394
    return this.slide('next');                                         // 395
  };                                                                   //
                                                                       //
  Carousel.prototype.prev = function () {                              // 398
    if (this.sliding) return;                                          // 399
    return this.slide('prev');                                         // 400
  };                                                                   //
                                                                       //
  Carousel.prototype.slide = function (type, next) {                   // 403
    var $active = this.$element.find('.item.active');                  // 404
    var $next = next || this.getItemForDirection(type, $active);       // 405
    var isCycling = this.interval;                                     // 406
    var direction = type == 'next' ? 'left' : 'right';                 // 407
    var fallback = type == 'next' ? 'first' : 'last';                  // 408
    var that = this;                                                   // 409
                                                                       //
    if (!$next.length) {                                               // 411
      if (!this.options.wrap) return;                                  // 412
      $next = this.$element.find('.item')[fallback]();                 // 413
    }                                                                  //
                                                                       //
    if ($next.hasClass('active')) return this.sliding = false;         // 416
                                                                       //
    var relatedTarget = $next[0];                                      // 418
    var slideEvent = $.Event('slide.bs.carousel', {                    // 419
      relatedTarget: relatedTarget,                                    // 420
      direction: direction                                             // 421
    });                                                                //
    this.$element.trigger(slideEvent);                                 // 423
    if (slideEvent.isDefaultPrevented()) return;                       // 424
                                                                       //
    this.sliding = true;                                               // 426
                                                                       //
    isCycling && this.pause();                                         // 428
                                                                       //
    if (this.$indicators.length) {                                     // 430
      this.$indicators.find('.active').removeClass('active');          // 431
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
      $nextIndicator && $nextIndicator.addClass('active');             // 433
    }                                                                  //
                                                                       //
    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }); // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {     // 437
      $next.addClass(type);                                            // 438
      $next[0].offsetWidth; // force reflow                            // 439
      $active.addClass(direction);                                     // 440
      $next.addClass(direction);                                       // 441
      $active.one('bsTransitionEnd', function () {                     // 442
        $next.removeClass([type, direction].join(' ')).addClass('active');
        $active.removeClass(['active', direction].join(' '));          // 445
        that.sliding = false;                                          // 446
        setTimeout(function () {                                       // 447
          that.$element.trigger(slidEvent);                            // 448
        }, 0);                                                         //
      }).emulateTransitionEnd(Carousel.TRANSITION_DURATION);           //
    } else {                                                           //
      $active.removeClass('active');                                   // 453
      $next.addClass('active');                                        // 454
      this.sliding = false;                                            // 455
      this.$element.trigger(slidEvent);                                // 456
    }                                                                  //
                                                                       //
    isCycling && this.cycle();                                         // 459
                                                                       //
    return this;                                                       // 461
  };                                                                   //
                                                                       //
  // CAROUSEL PLUGIN DEFINITION                                        //
  // ==========================                                        //
                                                                       //
  function Plugin(option) {                                            // 468
    return this.each(function () {                                     // 469
      var $this = $(this);                                             // 470
      var data = $this.data('bs.carousel');                            // 471
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option);
      var action = typeof option == 'string' ? option : options.slide;
                                                                       //
      if (!data) $this.data('bs.carousel', data = new Carousel(this, options));
      if (typeof option == 'number') data.to(option);else if (action) data[action]();else if (options.interval) data.pause().cycle();
    });                                                                //
  }                                                                    //
                                                                       //
  var old = $.fn.carousel;                                             // 482
                                                                       //
  $.fn.carousel = Plugin;                                              // 484
  $.fn.carousel.Constructor = Carousel;                                // 485
                                                                       //
  // CAROUSEL NO CONFLICT                                              //
  // ====================                                              //
                                                                       //
  $.fn.carousel.noConflict = function () {                             // 491
    $.fn.carousel = old;                                               // 492
    return this;                                                       // 493
  };                                                                   //
                                                                       //
  // CAROUSEL DATA-API                                                 //
  // =================                                                 //
                                                                       //
  var clickHandler = function (e) {                                    // 500
    var href;                                                          // 501
    var $this = $(this);                                               // 502
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7
    if (!$target.hasClass('carousel')) return;                         // 504
    var options = $.extend({}, $target.data(), $this.data());          // 505
    var slideIndex = $this.attr('data-slide-to');                      // 506
    if (slideIndex) options.interval = false;                          // 507
                                                                       //
    Plugin.call($target, options);                                     // 509
                                                                       //
    if (slideIndex) {                                                  // 511
      $target.data('bs.carousel').to(slideIndex);                      // 512
    }                                                                  //
                                                                       //
    e.preventDefault();                                                // 515
  };                                                                   //
                                                                       //
  $(document).on('click.bs.carousel.data-api', '[data-slide]', clickHandler).on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler);
                                                                       //
  $(window).on('load', function () {                                   // 522
    $('[data-ride="carousel"]').each(function () {                     // 523
      var $carousel = $(this);                                         // 524
      Plugin.call($carousel, $carousel.data());                        // 525
    });                                                                //
  });                                                                  //
})(jQuery);                                                            //
                                                                       //
/* ========================================================================
 * Bootstrap: collapse.js v3.3.1                                       //
 * http://getbootstrap.com/javascript/#collapse                        //
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.                                   //
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
                                                                       //
+(function ($) {                                                       // 540
  'use strict';                                                        // 541
                                                                       //
  // COLLAPSE PUBLIC CLASS DEFINITION                                  //
  // ================================                                  //
                                                                       //
  var Collapse = function (element, options) {                         // 546
    this.$element = $(element);                                        // 547
    this.options = $.extend({}, Collapse.DEFAULTS, options);           // 548
    this.$trigger = $(this.options.trigger).filter('[href="#' + element.id + '"], [data-target="#' + element.id + '"]');
    this.transitioning = null;                                         // 550
                                                                       //
    if (this.options.parent) {                                         // 552
      this.$parent = this.getParent();                                 // 553
    } else {                                                           //
      this.addAriaAndCollapsedClass(this.$element, this.$trigger);     // 555
    }                                                                  //
                                                                       //
    if (this.options.toggle) this.toggle();                            // 558
  };                                                                   //
                                                                       //
  Collapse.VERSION = '3.3.1';                                          // 561
                                                                       //
  Collapse.TRANSITION_DURATION = 350;                                  // 563
                                                                       //
  Collapse.DEFAULTS = {                                                // 565
    toggle: true,                                                      // 566
    trigger: '[data-toggle="collapse"]'                                // 567
  };                                                                   //
                                                                       //
  Collapse.prototype.dimension = function () {                         // 570
    var hasWidth = this.$element.hasClass('width');                    // 571
    return hasWidth ? 'width' : 'height';                              // 572
  };                                                                   //
                                                                       //
  Collapse.prototype.show = function () {                              // 575
    if (this.transitioning || this.$element.hasClass('in')) return;    // 576
                                                                       //
    var activesData;                                                   // 578
    var actives = this.$parent && this.$parent.find('> .panel').children('.in, .collapsing');
                                                                       //
    if (actives && actives.length) {                                   // 581
      activesData = actives.data('bs.collapse');                       // 582
      if (activesData && activesData.transitioning) return;            // 583
    }                                                                  //
                                                                       //
    var startEvent = $.Event('show.bs.collapse');                      // 586
    this.$element.trigger(startEvent);                                 // 587
    if (startEvent.isDefaultPrevented()) return;                       // 588
                                                                       //
    if (actives && actives.length) {                                   // 590
      Plugin.call(actives, 'hide');                                    // 591
      activesData || actives.data('bs.collapse', null);                // 592
    }                                                                  //
                                                                       //
    var dimension = this.dimension();                                  // 595
                                                                       //
    this.$element.removeClass('collapse').addClass('collapsing')[dimension](0).attr('aria-expanded', true);
                                                                       //
    this.$trigger.removeClass('collapsed').attr('aria-expanded', true);
                                                                       //
    this.transitioning = 1;                                            // 606
                                                                       //
    var complete = function () {                                       // 608
      this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('');
      this.transitioning = 0;                                          // 612
      this.$element.trigger('shown.bs.collapse');                      // 613
    };                                                                 //
                                                                       //
    if (!$.support.transition) return complete.call(this);             // 617
                                                                       //
    var scrollSize = $.camelCase(['scroll', dimension].join('-'));     // 619
                                                                       //
    this.$element.one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
  };                                                                   //
                                                                       //
  Collapse.prototype.hide = function () {                              // 626
    if (this.transitioning || !this.$element.hasClass('in')) return;   // 627
                                                                       //
    var startEvent = $.Event('hide.bs.collapse');                      // 629
    this.$element.trigger(startEvent);                                 // 630
    if (startEvent.isDefaultPrevented()) return;                       // 631
                                                                       //
    var dimension = this.dimension();                                  // 633
                                                                       //
    this.$element[dimension](this.$element[dimension]())[0].offsetHeight;
                                                                       //
    this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded', false);
                                                                       //
    this.$trigger.addClass('collapsed').attr('aria-expanded', false);  // 642
                                                                       //
    this.transitioning = 1;                                            // 646
                                                                       //
    var complete = function () {                                       // 648
      this.transitioning = 0;                                          // 649
      this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse');
    };                                                                 //
                                                                       //
    if (!$.support.transition) return complete.call(this);             // 656
                                                                       //
    this.$element[dimension](0).one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION);
  };                                                                   //
                                                                       //
  Collapse.prototype.toggle = function () {                            // 664
    this[this.$element.hasClass('in') ? 'hide' : 'show']();            // 665
  };                                                                   //
                                                                       //
  Collapse.prototype.getParent = function () {                         // 668
    return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function (i, element) {
      var $element = $(element);                                       // 672
      this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
    }, this)).end();                                                   //
  };                                                                   //
                                                                       //
  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in');                              // 679
                                                                       //
    $element.attr('aria-expanded', isOpen);                            // 681
    $trigger.toggleClass('collapsed', !isOpen).attr('aria-expanded', isOpen);
  };                                                                   //
                                                                       //
  function getTargetFromTrigger($trigger) {                            // 687
    var href;                                                          // 688
    var target = $trigger.attr('data-target') || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); // strip for ie7
                                                                       //
    return $(target);                                                  // 692
  }                                                                    //
                                                                       //
  // COLLAPSE PLUGIN DEFINITION                                        //
  // ==========================                                        //
                                                                       //
  function Plugin(option) {                                            // 699
    return this.each(function () {                                     // 700
      var $this = $(this);                                             // 701
      var data = $this.data('bs.collapse');                            // 702
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option);
                                                                       //
      if (!data && options.toggle && option == 'show') options.toggle = false;
      if (!data) $this.data('bs.collapse', data = new Collapse(this, options));
      if (typeof option == 'string') data[option]();                   // 707
    });                                                                //
  }                                                                    //
                                                                       //
  var old = $.fn.collapse;                                             // 711
                                                                       //
  $.fn.collapse = Plugin;                                              // 713
  $.fn.collapse.Constructor = Collapse;                                // 714
                                                                       //
  // COLLAPSE NO CONFLICT                                              //
  // ====================                                              //
                                                                       //
  $.fn.collapse.noConflict = function () {                             // 720
    $.fn.collapse = old;                                               // 721
    return this;                                                       // 722
  };                                                                   //
                                                                       //
  // COLLAPSE DATA-API                                                 //
  // =================                                                 //
                                                                       //
  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this = $(this);                                               // 730
                                                                       //
    if (!$this.attr('data-target')) e.preventDefault();                // 732
                                                                       //
    var $target = getTargetFromTrigger($this);                         // 734
    var data = $target.data('bs.collapse');                            // 735
    var option = data ? 'toggle' : $.extend({}, $this.data(), { trigger: this });
                                                                       //
    Plugin.call($target, option);                                      // 738
  });                                                                  //
})(jQuery);                                                            //
                                                                       //
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.1                                       //
 * http://getbootstrap.com/javascript/#dropdowns                       //
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.                                   //
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
                                                                       //
+(function ($) {                                                       // 752
  'use strict';                                                        // 753
                                                                       //
  // DROPDOWN CLASS DEFINITION                                         //
  // =========================                                         //
                                                                       //
  var backdrop = '.dropdown-backdrop';                                 // 758
  var toggle = '[data-toggle="dropdown"]';                             // 759
  var Dropdown = function (element) {                                  // 760
    $(element).on('click.bs.dropdown', this.toggle);                   // 761
  };                                                                   //
                                                                       //
  Dropdown.VERSION = '3.3.1';                                          // 764
                                                                       //
  Dropdown.prototype.toggle = function (e) {                           // 766
    var $this = $(this);                                               // 767
                                                                       //
    if ($this.is('.disabled, :disabled')) return;                      // 769
                                                                       //
    var $parent = getParent($this);                                    // 771
    var isActive = $parent.hasClass('open');                           // 772
                                                                       //
    clearMenus();                                                      // 774
                                                                       //
    if (!isActive) {                                                   // 776
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus);
      }                                                                //
                                                                       //
      var relatedTarget = { relatedTarget: this };                     // 782
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));
                                                                       //
      if (e.isDefaultPrevented()) return;                              // 785
                                                                       //
      $this.trigger('focus').attr('aria-expanded', 'true');            // 787
                                                                       //
      $parent.toggleClass('open').trigger('shown.bs.dropdown', relatedTarget);
    }                                                                  //
                                                                       //
    return false;                                                      // 796
  };                                                                   //
                                                                       //
  Dropdown.prototype.keydown = function (e) {                          // 799
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;
                                                                       //
    var $this = $(this);                                               // 802
                                                                       //
    e.preventDefault();                                                // 804
    e.stopPropagation();                                               // 805
                                                                       //
    if ($this.is('.disabled, :disabled')) return;                      // 807
                                                                       //
    var $parent = getParent($this);                                    // 809
    var isActive = $parent.hasClass('open');                           // 810
                                                                       //
    if (!isActive && e.which != 27 || isActive && e.which == 27) {     // 812
      if (e.which == 27) $parent.find(toggle).trigger('focus');        // 813
      return $this.trigger('click');                                   // 814
    }                                                                  //
                                                                       //
    var desc = ' li:not(.divider):visible a';                          // 817
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc);
                                                                       //
    if (!$items.length) return;                                        // 820
                                                                       //
    var index = $items.index(e.target);                                // 822
                                                                       //
    if (e.which == 38 && index > 0) index--; // up                     // 824
    if (e.which == 40 && index < $items.length - 1) index++; // down   // 825
    if (! ~index) index = 0;                                           // 826
                                                                       //
    $items.eq(index).trigger('focus');                                 // 828
  };                                                                   //
                                                                       //
  function clearMenus(e) {                                             // 831
    if (e && e.which === 3) return;                                    // 832
    $(backdrop).remove();                                              // 833
    $(toggle).each(function () {                                       // 834
      var $this = $(this);                                             // 835
      var $parent = getParent($this);                                  // 836
      var relatedTarget = { relatedTarget: this };                     // 837
                                                                       //
      if (!$parent.hasClass('open')) return;                           // 839
                                                                       //
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));
                                                                       //
      if (e.isDefaultPrevented()) return;                              // 843
                                                                       //
      $this.attr('aria-expanded', 'false');                            // 845
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget);
    });                                                                //
  }                                                                    //
                                                                       //
  function getParent($this) {                                          // 850
    var selector = $this.attr('data-target');                          // 851
                                                                       //
    if (!selector) {                                                   // 853
      selector = $this.attr('href');                                   // 854
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }                                                                  //
                                                                       //
    var $parent = selector && $(selector);                             // 858
                                                                       //
    return $parent && $parent.length ? $parent : $this.parent();       // 860
  }                                                                    //
                                                                       //
  // DROPDOWN PLUGIN DEFINITION                                        //
  // ==========================                                        //
                                                                       //
  function Plugin(option) {                                            // 867
    return this.each(function () {                                     // 868
      var $this = $(this);                                             // 869
      var data = $this.data('bs.dropdown');                            // 870
                                                                       //
      if (!data) $this.data('bs.dropdown', data = new Dropdown(this));
      if (typeof option == 'string') data[option].call($this);         // 873
    });                                                                //
  }                                                                    //
                                                                       //
  var old = $.fn.dropdown;                                             // 877
                                                                       //
  $.fn.dropdown = Plugin;                                              // 879
  $.fn.dropdown.Constructor = Dropdown;                                // 880
                                                                       //
  // DROPDOWN NO CONFLICT                                              //
  // ====================                                              //
                                                                       //
  $.fn.dropdown.noConflict = function () {                             // 886
    $.fn.dropdown = old;                                               // 887
    return this;                                                       // 888
  };                                                                   //
                                                                       //
  // APPLY TO STANDARD DROPDOWN ELEMENTS                               //
  // ===================================                               //
                                                                       //
  $(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form', function (e) {
    e.stopPropagation();                                               // 897
  }).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api', '[role="menu"]', Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api', '[role="listbox"]', Dropdown.prototype.keydown);
})(jQuery);                                                            //
                                                                       //
/* ========================================================================
 * Bootstrap: modal.js v3.3.1                                          //
 * http://getbootstrap.com/javascript/#modals                          //
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.                                   //
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
                                                                       //
+(function ($) {                                                       // 914
  'use strict';                                                        // 915
                                                                       //
  // MODAL CLASS DEFINITION                                            //
  // ======================                                            //
                                                                       //
  var Modal = function (element, options) {                            // 920
    this.options = options;                                            // 921
    this.$body = $(document.body);                                     // 922
    this.$element = $(element);                                        // 923
    this.$backdrop = this.isShown = null;                              // 924
    this.scrollbarWidth = 0;                                           // 926
                                                                       //
    if (this.options.remote) {                                         // 928
      this.$element.find('.modal-content').load(this.options.remote, $.proxy(function () {
        this.$element.trigger('loaded.bs.modal');                      // 932
      }, this));                                                       //
    }                                                                  //
  };                                                                   //
                                                                       //
  Modal.VERSION = '3.3.1';                                             // 937
                                                                       //
  Modal.TRANSITION_DURATION = 300;                                     // 939
  Modal.BACKDROP_TRANSITION_DURATION = 150;                            // 940
                                                                       //
  Modal.DEFAULTS = {                                                   // 942
    backdrop: true,                                                    // 943
    keyboard: true,                                                    // 944
    show: true                                                         // 945
  };                                                                   //
                                                                       //
  Modal.prototype.toggle = function (_relatedTarget) {                 // 948
    return this.isShown ? this.hide() : this.show(_relatedTarget);     // 949
  };                                                                   //
                                                                       //
  Modal.prototype.show = function (_relatedTarget) {                   // 952
    var that = this;                                                   // 953
    var e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget });
                                                                       //
    this.$element.trigger(e);                                          // 956
                                                                       //
    if (this.isShown || e.isDefaultPrevented()) return;                // 958
                                                                       //
    this.isShown = true;                                               // 960
                                                                       //
    this.checkScrollbar();                                             // 962
    this.setScrollbar();                                               // 963
    this.$body.addClass('modal-open');                                 // 964
                                                                       //
    this.escape();                                                     // 966
    this.resize();                                                     // 967
                                                                       //
    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));
                                                                       //
    this.backdrop(function () {                                        // 971
      var transition = $.support.transition && that.$element.hasClass('fade');
                                                                       //
      if (!that.$element.parent().length) {                            // 974
        that.$element.appendTo(that.$body); // don't move modals dom position
      }                                                                //
                                                                       //
      that.$element.show().scrollTop(0);                               // 978
                                                                       //
      if (that.options.backdrop) that.adjustBackdrop();                // 982
      that.adjustDialog();                                             // 983
                                                                       //
      if (transition) {                                                // 985
        that.$element[0].offsetWidth; // force reflow                  // 986
      }                                                                //
                                                                       //
      that.$element.addClass('in').attr('aria-hidden', false);         // 989
                                                                       //
      that.enforceFocus();                                             // 993
                                                                       //
      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget });
                                                                       //
      transition ? that.$element.find('.modal-dialog') // wait for modal to slide in
      .one('bsTransitionEnd', function () {                            //
        that.$element.trigger('focus').trigger(e);                     // 1000
      }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger('focus').trigger(e);
    });                                                                //
  };                                                                   //
                                                                       //
  Modal.prototype.hide = function (e) {                                // 1007
    if (e) e.preventDefault();                                         // 1008
                                                                       //
    e = $.Event('hide.bs.modal');                                      // 1010
                                                                       //
    this.$element.trigger(e);                                          // 1012
                                                                       //
    if (!this.isShown || e.isDefaultPrevented()) return;               // 1014
                                                                       //
    this.isShown = false;                                              // 1016
                                                                       //
    this.escape();                                                     // 1018
    this.resize();                                                     // 1019
                                                                       //
    $(document).off('focusin.bs.modal');                               // 1021
                                                                       //
    this.$element.removeClass('in').attr('aria-hidden', true).off('click.dismiss.bs.modal');
                                                                       //
    $.support.transition && this.$element.hasClass('fade') ? this.$element.one('bsTransitionEnd', $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal();
  };                                                                   //
                                                                       //
  Modal.prototype.enforceFocus = function () {                         // 1035
    $(document).off('focusin.bs.modal') // guard against infinite focus loop
    .on('focusin.bs.modal', $.proxy(function (e) {                     //
      if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
        this.$element.trigger('focus');                                // 1040
      }                                                                //
    }, this));                                                         //
  };                                                                   //
                                                                       //
  Modal.prototype.escape = function () {                               // 1045
    if (this.isShown && this.options.keyboard) {                       // 1046
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide();                                  // 1048
      }, this));                                                       //
    } else if (!this.isShown) {                                        //
      this.$element.off('keydown.dismiss.bs.modal');                   // 1051
    }                                                                  //
  };                                                                   //
                                                                       //
  Modal.prototype.resize = function () {                               // 1055
    if (this.isShown) {                                                // 1056
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this));
    } else {                                                           //
      $(window).off('resize.bs.modal');                                // 1059
    }                                                                  //
  };                                                                   //
                                                                       //
  Modal.prototype.hideModal = function () {                            // 1063
    var that = this;                                                   // 1064
    this.$element.hide();                                              // 1065
    this.backdrop(function () {                                        // 1066
      that.$body.removeClass('modal-open');                            // 1067
      that.resetAdjustments();                                         // 1068
      that.resetScrollbar();                                           // 1069
      that.$element.trigger('hidden.bs.modal');                        // 1070
    });                                                                //
  };                                                                   //
                                                                       //
  Modal.prototype.removeBackdrop = function () {                       // 1074
    this.$backdrop && this.$backdrop.remove();                         // 1075
    this.$backdrop = null;                                             // 1076
  };                                                                   //
                                                                       //
  Modal.prototype.backdrop = function (callback) {                     // 1079
    var that = this;                                                   // 1080
    var animate = this.$element.hasClass('fade') ? 'fade' : '';        // 1081
                                                                       //
    if (this.isShown && this.options.backdrop) {                       // 1083
      var doAnimate = $.support.transition && animate;                 // 1084
                                                                       //
      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').prependTo(this.$element).on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return;                      // 1089
        this.options.backdrop == 'static' ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this);
      }, this));                                                       //
                                                                       //
      if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow    // 1095
                                                                       //
      this.$backdrop.addClass('in');                                   // 1097
                                                                       //
      if (!callback) return;                                           // 1099
                                                                       //
      doAnimate ? this.$backdrop.one('bsTransitionEnd', callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
    } else if (!this.isShown && this.$backdrop) {                      //
      this.$backdrop.removeClass('in');                                // 1108
                                                                       //
      var callbackRemove = function () {                               // 1110
        that.removeBackdrop();                                         // 1111
        callback && callback();                                        // 1112
      };                                                               //
      $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one('bsTransitionEnd', callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
    } else if (callback) {                                             //
      callback();                                                      // 1121
    }                                                                  //
  };                                                                   //
                                                                       //
  // these following methods are used to handle overflowing modals     //
                                                                       //
  Modal.prototype.handleUpdate = function () {                         // 1127
    if (this.options.backdrop) this.adjustBackdrop();                  // 1128
    this.adjustDialog();                                               // 1129
  };                                                                   //
                                                                       //
  Modal.prototype.adjustBackdrop = function () {                       // 1132
    this.$backdrop.css('height', 0).css('height', this.$element[0].scrollHeight);
  };                                                                   //
                                                                       //
  Modal.prototype.adjustDialog = function () {                         // 1138
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;
                                                                       //
    this.$element.css({                                                // 1141
      paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    });                                                                //
  };                                                                   //
                                                                       //
  Modal.prototype.resetAdjustments = function () {                     // 1147
    this.$element.css({                                                // 1148
      paddingLeft: '',                                                 // 1149
      paddingRight: ''                                                 // 1150
    });                                                                //
  };                                                                   //
                                                                       //
  Modal.prototype.checkScrollbar = function () {                       // 1154
    this.bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight;
    this.scrollbarWidth = this.measureScrollbar();                     // 1156
  };                                                                   //
                                                                       //
  Modal.prototype.setScrollbar = function () {                         // 1159
    var bodyPad = parseInt(this.$body.css('padding-right') || 0, 10);  // 1160
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
  };                                                                   //
                                                                       //
  Modal.prototype.resetScrollbar = function () {                       // 1164
    this.$body.css('padding-right', '');                               // 1165
  };                                                                   //
                                                                       //
  Modal.prototype.measureScrollbar = function () {                     // 1168
    // thx walsh                                                       //
    var scrollDiv = document.createElement('div');                     // 1169
    scrollDiv.className = 'modal-scrollbar-measure';                   // 1170
    this.$body.append(scrollDiv);                                      // 1171
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    this.$body[0].removeChild(scrollDiv);                              // 1173
    return scrollbarWidth;                                             // 1174
  };                                                                   //
                                                                       //
  // MODAL PLUGIN DEFINITION                                           //
  // =======================                                           //
                                                                       //
  function Plugin(option, _relatedTarget) {                            // 1181
    return this.each(function () {                                     // 1182
      var $this = $(this);                                             // 1183
      var data = $this.data('bs.modal');                               // 1184
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option);
                                                                       //
      if (!data) $this.data('bs.modal', data = new Modal(this, options));
      if (typeof option == 'string') data[option](_relatedTarget);else if (options.show) data.show(_relatedTarget);
    });                                                                //
  }                                                                    //
                                                                       //
  var old = $.fn.modal;                                                // 1193
                                                                       //
  $.fn.modal = Plugin;                                                 // 1195
  $.fn.modal.Constructor = Modal;                                      // 1196
                                                                       //
  // MODAL NO CONFLICT                                                 //
  // =================                                                 //
                                                                       //
  $.fn.modal.noConflict = function () {                                // 1202
    $.fn.modal = old;                                                  // 1203
    return this;                                                       // 1204
  };                                                                   //
                                                                       //
  // MODAL DATA-API                                                    //
  // ==============                                                    //
                                                                       //
  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this);                                               // 1212
    var href = $this.attr('href');                                     // 1213
    var $target = $($this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7
    var option = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());
                                                                       //
    if ($this.is('a')) e.preventDefault();                             // 1217
                                                                       //
    $target.one('show.bs.modal', function (showEvent) {                // 1219
      if (showEvent.isDefaultPrevented()) return; // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {                     // 1221
        $this.is(':visible') && $this.trigger('focus');                // 1222
      });                                                              //
    });                                                                //
    Plugin.call($target, option, this);                                // 1225
  });                                                                  //
})(jQuery);                                                            //
                                                                       //
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.1                                        //
 * http://getbootstrap.com/javascript/#tooltip                         //
 * Inspired by the original jQuery.tipsy by Jason Frame                //
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.                                   //
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
                                                                       //
+(function ($) {                                                       // 1240
  'use strict';                                                        // 1241
                                                                       //
  // TOOLTIP PUBLIC CLASS DEFINITION                                   //
  // ===============================                                   //
                                                                       //
  var Tooltip = function (element, options) {                          // 1246
    this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null;
                                                                       //
    this.init('tooltip', element, options);                            // 1254
  };                                                                   //
                                                                       //
  Tooltip.VERSION = '3.3.1';                                           // 1257
                                                                       //
  Tooltip.TRANSITION_DURATION = 150;                                   // 1259
                                                                       //
  Tooltip.DEFAULTS = {                                                 // 1261
    animation: true,                                                   // 1262
    placement: 'top',                                                  // 1263
    selector: false,                                                   // 1264
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',                                            // 1266
    title: '',                                                         // 1267
    delay: 0,                                                          // 1268
    html: false,                                                       // 1269
    container: false,                                                  // 1270
    viewport: {                                                        // 1271
      selector: 'body',                                                // 1272
      padding: 0                                                       // 1273
    }                                                                  //
  };                                                                   //
                                                                       //
  Tooltip.prototype.init = function (type, element, options) {         // 1277
    this.enabled = true;                                               // 1278
    this.type = type;                                                  // 1279
    this.$element = $(element);                                        // 1280
    this.options = this.getOptions(options);                           // 1281
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport);
                                                                       //
    var triggers = this.options.trigger.split(' ');                    // 1284
                                                                       //
    for (var i = triggers.length; i--;) {                              // 1286
      var trigger = triggers[i];                                       // 1287
                                                                       //
      if (trigger == 'click') {                                        // 1289
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
      } else if (trigger != 'manual') {                                //
        var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin';   // 1292
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';
                                                                       //
        this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this));
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this));
      }                                                                //
    }                                                                  //
                                                                       //
    this.options.selector ? this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' }) : this.fixTitle();
  };                                                                   //
                                                                       //
  Tooltip.prototype.getDefaults = function () {                        // 1305
    return Tooltip.DEFAULTS;                                           // 1306
  };                                                                   //
                                                                       //
  Tooltip.prototype.getOptions = function (options) {                  // 1309
    options = $.extend({}, this.getDefaults(), this.$element.data(), options);
                                                                       //
    if (options.delay && typeof options.delay == 'number') {           // 1312
      options.delay = {                                                // 1313
        show: options.delay,                                           // 1314
        hide: options.delay                                            // 1315
      };                                                               //
    }                                                                  //
                                                                       //
    return options;                                                    // 1319
  };                                                                   //
                                                                       //
  Tooltip.prototype.getDelegateOptions = function () {                 // 1322
    var options = {};                                                  // 1323
    var defaults = this.getDefaults();                                 // 1324
                                                                       //
    this._options && $.each(this._options, function (key, value) {     // 1326
      if (defaults[key] != value) options[key] = value;                // 1327
    });                                                                //
                                                                       //
    return options;                                                    // 1330
  };                                                                   //
                                                                       //
  Tooltip.prototype.enter = function (obj) {                           // 1333
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);
                                                                       //
    if (self && self.$tip && self.$tip.is(':visible')) {               // 1337
      self.hoverState = 'in';                                          // 1338
      return;                                                          // 1339
    }                                                                  //
                                                                       //
    if (!self) {                                                       // 1342
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
      $(obj.currentTarget).data('bs.' + this.type, self);              // 1344
    }                                                                  //
                                                                       //
    clearTimeout(self.timeout);                                        // 1347
                                                                       //
    self.hoverState = 'in';                                            // 1349
                                                                       //
    if (!self.options.delay || !self.options.delay.show) return self.show();
                                                                       //
    self.timeout = setTimeout(function () {                            // 1353
      if (self.hoverState == 'in') self.show();                        // 1354
    }, self.options.delay.show);                                       //
  };                                                                   //
                                                                       //
  Tooltip.prototype.leave = function (obj) {                           // 1358
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);
                                                                       //
    if (!self) {                                                       // 1362
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
      $(obj.currentTarget).data('bs.' + this.type, self);              // 1364
    }                                                                  //
                                                                       //
    clearTimeout(self.timeout);                                        // 1367
                                                                       //
    self.hoverState = 'out';                                           // 1369
                                                                       //
    if (!self.options.delay || !self.options.delay.hide) return self.hide();
                                                                       //
    self.timeout = setTimeout(function () {                            // 1373
      if (self.hoverState == 'out') self.hide();                       // 1374
    }, self.options.delay.hide);                                       //
  };                                                                   //
                                                                       //
  Tooltip.prototype.show = function () {                               // 1378
    var e = $.Event('show.bs.' + this.type);                           // 1379
                                                                       //
    if (this.hasContent() && this.enabled) {                           // 1381
      this.$element.trigger(e);                                        // 1382
                                                                       //
      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
      if (e.isDefaultPrevented() || !inDom) return;                    // 1385
      var that = this;                                                 // 1386
                                                                       //
      var $tip = this.tip();                                           // 1388
                                                                       //
      var tipId = this.getUID(this.type);                              // 1390
                                                                       //
      this.setContent();                                               // 1392
      $tip.attr('id', tipId);                                          // 1393
      this.$element.attr('aria-describedby', tipId);                   // 1394
                                                                       //
      if (this.options.animation) $tip.addClass('fade');               // 1396
                                                                       //
      var placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
                                                                       //
      var autoToken = /\s?auto?\s?/i;                                  // 1402
      var autoPlace = autoToken.test(placement);                       // 1403
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top';
                                                                       //
      $tip.detach().css({ top: 0, left: 0, display: 'block' }).addClass(placement).data('bs.' + this.type, this);
                                                                       //
      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
                                                                       //
      var pos = this.getPosition();                                    // 1414
      var actualWidth = $tip[0].offsetWidth;                           // 1415
      var actualHeight = $tip[0].offsetHeight;                         // 1416
                                                                       //
      if (autoPlace) {                                                 // 1418
        var orgPlacement = placement;                                  // 1419
        var $container = this.options.container ? $(this.options.container) : this.$element.parent();
        var containerDim = this.getPosition($container);               // 1421
                                                                       //
        placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top' : placement == 'top' && pos.top - actualHeight < containerDim.top ? 'bottom' : placement == 'right' && pos.right + actualWidth > containerDim.width ? 'left' : placement == 'left' && pos.left - actualWidth < containerDim.left ? 'right' : placement;
                                                                       //
        $tip.removeClass(orgPlacement).addClass(placement);            // 1429
      }                                                                //
                                                                       //
      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
                                                                       //
      this.applyPlacement(calculatedOffset, placement);                // 1436
                                                                       //
      var complete = function () {                                     // 1438
        var prevHoverState = that.hoverState;                          // 1439
        that.$element.trigger('shown.bs.' + that.type);                // 1440
        that.hoverState = null;                                        // 1441
                                                                       //
        if (prevHoverState == 'out') that.leave(that);                 // 1443
      };                                                               //
                                                                       //
      $.support.transition && this.$tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
    }                                                                  //
  };                                                                   //
                                                                       //
  Tooltip.prototype.applyPlacement = function (offset, placement) {    // 1454
    var $tip = this.tip();                                             // 1455
    var width = $tip[0].offsetWidth;                                   // 1456
    var height = $tip[0].offsetHeight;                                 // 1457
                                                                       //
    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10);              // 1460
    var marginLeft = parseInt($tip.css('margin-left'), 10);            // 1461
                                                                       //
    // we must check for NaN for ie 8/9                                //
    if (isNaN(marginTop)) marginTop = 0;                               // 1464
    if (isNaN(marginLeft)) marginLeft = 0;                             // 1465
                                                                       //
    offset.top = offset.top + marginTop;                               // 1467
    offset.left = offset.left + marginLeft;                            // 1468
                                                                       //
    // $.fn.offset doesn't round pixel values                          //
    // so we use setOffset directly with our own function B-0          //
    $.offset.setOffset($tip[0], $.extend({                             // 1472
      using: function (props) {                                        // 1473
        $tip.css({                                                     // 1474
          top: Math.round(props.top),                                  // 1475
          left: Math.round(props.left)                                 // 1476
        });                                                            //
      }                                                                //
    }, offset), 0);                                                    //
                                                                       //
    $tip.addClass('in');                                               // 1481
                                                                       //
    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth = $tip[0].offsetWidth;                             // 1484
    var actualHeight = $tip[0].offsetHeight;                           // 1485
                                                                       //
    if (placement == 'top' && actualHeight != height) {                // 1487
      offset.top = offset.top + height - actualHeight;                 // 1488
    }                                                                  //
                                                                       //
    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
                                                                       //
    if (delta.left) offset.left += delta.left;else offset.top += delta.top;
                                                                       //
    var isVertical = /top|bottom/.test(placement);                     // 1496
    var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight';
                                                                       //
    $tip.offset(offset);                                               // 1500
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
  };                                                                   //
                                                                       //
  Tooltip.prototype.replaceArrow = function (delta, dimension, isHorizontal) {
    this.arrow().css(isHorizontal ? 'left' : 'top', 50 * (1 - delta / dimension) + '%').css(isHorizontal ? 'top' : 'left', '');
  };                                                                   //
                                                                       //
  Tooltip.prototype.setContent = function () {                         // 1510
    var $tip = this.tip();                                             // 1511
    var title = this.getTitle();                                       // 1512
                                                                       //
    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
    $tip.removeClass('fade in top bottom left right');                 // 1515
  };                                                                   //
                                                                       //
  Tooltip.prototype.hide = function (callback) {                       // 1518
    var that = this;                                                   // 1519
    var $tip = this.tip();                                             // 1520
    var e = $.Event('hide.bs.' + this.type);                           // 1521
                                                                       //
    function complete() {                                              // 1523
      if (that.hoverState != 'in') $tip.detach();                      // 1524
      that.$element.removeAttr('aria-describedby').trigger('hidden.bs.' + that.type);
      callback && callback();                                          // 1528
    }                                                                  //
                                                                       //
    this.$element.trigger(e);                                          // 1531
                                                                       //
    if (e.isDefaultPrevented()) return;                                // 1533
                                                                       //
    $tip.removeClass('in');                                            // 1535
                                                                       //
    $.support.transition && this.$tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
                                                                       //
    this.hoverState = null;                                            // 1543
                                                                       //
    return this;                                                       // 1545
  };                                                                   //
                                                                       //
  Tooltip.prototype.fixTitle = function () {                           // 1548
    var $e = this.$element;                                            // 1549
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
    }                                                                  //
  };                                                                   //
                                                                       //
  Tooltip.prototype.hasContent = function () {                         // 1555
    return this.getTitle();                                            // 1556
  };                                                                   //
                                                                       //
  Tooltip.prototype.getPosition = function ($element) {                // 1559
    $element = $element || this.$element;                              // 1560
                                                                       //
    var el = $element[0];                                              // 1562
    var isBody = el.tagName == 'BODY';                                 // 1563
                                                                       //
    var elRect = el.getBoundingClientRect();                           // 1565
    if (elRect.width == null) {                                        // 1566
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top });
    }                                                                  //
    var elOffset = isBody ? { top: 0, left: 0 } : $element.offset();   // 1570
    var scroll = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() };
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null;
                                                                       //
    return $.extend({}, elRect, scroll, outerDims, elOffset);          // 1574
  };                                                                   //
                                                                       //
  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2 } : placement == 'top' ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } : placement == 'left' ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
    /* placement == 'right' */{ top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width };
  };                                                                   //
                                                                       //
  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 };                                   // 1586
    if (!this.$viewport) return delta;                                 // 1587
                                                                       //
    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
    var viewportDimensions = this.getPosition(this.$viewport);         // 1590
                                                                       //
    if (/right|left/.test(placement)) {                                // 1592
      var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
      if (topEdgeOffset < viewportDimensions.top) {                    // 1595
        // top overflow                                                //
        delta.top = viewportDimensions.top - topEdgeOffset;            // 1596
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
        // bottom overflow                                             //
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
      }                                                                //
    } else {                                                           //
      var leftEdgeOffset = pos.left - viewportPadding;                 // 1601
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth;  // 1602
      if (leftEdgeOffset < viewportDimensions.left) {                  // 1603
        // left overflow                                               //
        delta.left = viewportDimensions.left - leftEdgeOffset;         // 1604
      } else if (rightEdgeOffset > viewportDimensions.width) {         //
        // right overflow                                              //
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
      }                                                                //
    }                                                                  //
                                                                       //
    return delta;                                                      // 1610
  };                                                                   //
                                                                       //
  Tooltip.prototype.getTitle = function () {                           // 1613
    var title;                                                         // 1614
    var $e = this.$element;                                            // 1615
    var o = this.options;                                              // 1616
                                                                       //
    title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title);
                                                                       //
    return title;                                                      // 1621
  };                                                                   //
                                                                       //
  Tooltip.prototype.getUID = function (prefix) {                       // 1624
    do prefix += ~ ~(Math.random() * 1000000); while (document.getElementById(prefix));
    return prefix;                                                     // 1627
  };                                                                   //
                                                                       //
  Tooltip.prototype.tip = function () {                                // 1630
    return this.$tip = this.$tip || $(this.options.template);          // 1631
  };                                                                   //
                                                                       //
  Tooltip.prototype.arrow = function () {                              // 1634
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow');
  };                                                                   //
                                                                       //
  Tooltip.prototype.enable = function () {                             // 1638
    this.enabled = true;                                               // 1639
  };                                                                   //
                                                                       //
  Tooltip.prototype.disable = function () {                            // 1642
    this.enabled = false;                                              // 1643
  };                                                                   //
                                                                       //
  Tooltip.prototype.toggleEnabled = function () {                      // 1646
    this.enabled = !this.enabled;                                      // 1647
  };                                                                   //
                                                                       //
  Tooltip.prototype.toggle = function (e) {                            // 1650
    var self = this;                                                   // 1651
    if (e) {                                                           // 1652
      self = $(e.currentTarget).data('bs.' + this.type);               // 1653
      if (!self) {                                                     // 1654
        self = new this.constructor(e.currentTarget, this.getDelegateOptions());
        $(e.currentTarget).data('bs.' + this.type, self);              // 1656
      }                                                                //
    }                                                                  //
                                                                       //
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self);   // 1660
  };                                                                   //
                                                                       //
  Tooltip.prototype.destroy = function () {                            // 1663
    var that = this;                                                   // 1664
    clearTimeout(this.timeout);                                        // 1665
    this.hide(function () {                                            // 1666
      that.$element.off('.' + that.type).removeData('bs.' + that.type);
    });                                                                //
  };                                                                   //
                                                                       //
  // TOOLTIP PLUGIN DEFINITION                                         //
  // =========================                                         //
                                                                       //
  function Plugin(option) {                                            // 1675
    return this.each(function () {                                     // 1676
      var $this = $(this);                                             // 1677
      var data = $this.data('bs.tooltip');                             // 1678
      var options = typeof option == 'object' && option;               // 1679
      var selector = options && options.selector;                      // 1680
                                                                       //
      if (!data && option == 'destroy') return;                        // 1682
      if (selector) {                                                  // 1683
        if (!data) $this.data('bs.tooltip', data = {});                // 1684
        if (!data[selector]) data[selector] = new Tooltip(this, options);
      } else {                                                         //
        if (!data) $this.data('bs.tooltip', data = new Tooltip(this, options));
      }                                                                //
      if (typeof option == 'string') data[option]();                   // 1689
    });                                                                //
  }                                                                    //
                                                                       //
  var old = $.fn.tooltip;                                              // 1693
                                                                       //
  $.fn.tooltip = Plugin;                                               // 1695
  $.fn.tooltip.Constructor = Tooltip;                                  // 1696
                                                                       //
  // TOOLTIP NO CONFLICT                                               //
  // ===================                                               //
                                                                       //
  $.fn.tooltip.noConflict = function () {                              // 1702
    $.fn.tooltip = old;                                                // 1703
    return this;                                                       // 1704
  };                                                                   //
})(jQuery);                                                            //
                                                                       //
/* ========================================================================
 * Bootstrap: popover.js v3.3.1                                        //
 * http://getbootstrap.com/javascript/#popovers                        //
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.                                   //
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
                                                                       //
+(function ($) {                                                       // 1718
  'use strict';                                                        // 1719
                                                                       //
  // POPOVER PUBLIC CLASS DEFINITION                                   //
  // ===============================                                   //
                                                                       //
  var Popover = function (element, options) {                          // 1724
    this.init('popover', element, options);                            // 1725
  };                                                                   //
                                                                       //
  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js');   // 1728
                                                                       //
  Popover.VERSION = '3.3.1';                                           // 1730
                                                                       //
  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',                                                // 1733
    trigger: 'click',                                                  // 1734
    content: '',                                                       // 1735
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  });                                                                  //
                                                                       //
  // NOTE: POPOVER EXTENDS tooltip.js                                  //
  // ================================                                  //
                                                                       //
  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);
                                                                       //
  Popover.prototype.constructor = Popover;                             // 1745
                                                                       //
  Popover.prototype.getDefaults = function () {                        // 1747
    return Popover.DEFAULTS;                                           // 1748
  };                                                                   //
                                                                       //
  Popover.prototype.setContent = function () {                         // 1751
    var $tip = this.tip();                                             // 1752
    var title = this.getTitle();                                       // 1753
    var content = this.getContent();                                   // 1754
                                                                       //
    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);
    $tip.find('.popover-content').children().detach().end()[// we use append for html objects to maintain js events
    this.options.html ? typeof content == 'string' ? 'html' : 'append' : 'text'](content);
                                                                       //
    $tip.removeClass('fade top bottom left right in');                 // 1761
                                                                       //
    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.                         //
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide();
  };                                                                   //
                                                                       //
  Popover.prototype.hasContent = function () {                         // 1768
    return this.getTitle() || this.getContent();                       // 1769
  };                                                                   //
                                                                       //
  Popover.prototype.getContent = function () {                         // 1772
    var $e = this.$element;                                            // 1773
    var o = this.options;                                              // 1774
                                                                       //
    return $e.attr('data-content') || (typeof o.content == 'function' ? o.content.call($e[0]) : o.content);
  };                                                                   //
                                                                       //
  Popover.prototype.arrow = function () {                              // 1782
    return this.$arrow = this.$arrow || this.tip().find('.arrow');     // 1783
  };                                                                   //
                                                                       //
  Popover.prototype.tip = function () {                                // 1786
    if (!this.$tip) this.$tip = $(this.options.template);              // 1787
    return this.$tip;                                                  // 1788
  };                                                                   //
                                                                       //
  // POPOVER PLUGIN DEFINITION                                         //
  // =========================                                         //
                                                                       //
  function Plugin(option) {                                            // 1795
    return this.each(function () {                                     // 1796
      var $this = $(this);                                             // 1797
      var data = $this.data('bs.popover');                             // 1798
      var options = typeof option == 'object' && option;               // 1799
      var selector = options && options.selector;                      // 1800
                                                                       //
      if (!data && option == 'destroy') return;                        // 1802
      if (selector) {                                                  // 1803
        if (!data) $this.data('bs.popover', data = {});                // 1804
        if (!data[selector]) data[selector] = new Popover(this, options);
      } else {                                                         //
        if (!data) $this.data('bs.popover', data = new Popover(this, options));
      }                                                                //
      if (typeof option == 'string') data[option]();                   // 1809
    });                                                                //
  }                                                                    //
                                                                       //
  var old = $.fn.popover;                                              // 1813
                                                                       //
  $.fn.popover = Plugin;                                               // 1815
  $.fn.popover.Constructor = Popover;                                  // 1816
                                                                       //
  // POPOVER NO CONFLICT                                               //
  // ===================                                               //
                                                                       //
  $.fn.popover.noConflict = function () {                              // 1822
    $.fn.popover = old;                                                // 1823
    return this;                                                       // 1824
  };                                                                   //
})(jQuery);                                                            //
                                                                       //
/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.1                                      //
 * http://getbootstrap.com/javascript/#scrollspy                       //
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.                                   //
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
                                                                       //
+(function ($) {                                                       // 1838
  'use strict';                                                        // 1839
                                                                       //
  // SCROLLSPY CLASS DEFINITION                                        //
  // ==========================                                        //
                                                                       //
  function ScrollSpy(element, options) {                               // 1844
    var process = $.proxy(this.process, this);                         // 1845
                                                                       //
    this.$body = $('body');                                            // 1847
    this.$scrollElement = $(element).is('body') ? $(window) : $(element);
    this.options = $.extend({}, ScrollSpy.DEFAULTS, options);          // 1849
    this.selector = (this.options.target || '') + ' .nav li > a';      // 1850
    this.offsets = [];                                                 // 1851
    this.targets = [];                                                 // 1852
    this.activeTarget = null;                                          // 1853
    this.scrollHeight = 0;                                             // 1854
                                                                       //
    this.$scrollElement.on('scroll.bs.scrollspy', process);            // 1856
    this.refresh();                                                    // 1857
    this.process();                                                    // 1858
  }                                                                    //
                                                                       //
  ScrollSpy.VERSION = '3.3.1';                                         // 1861
                                                                       //
  ScrollSpy.DEFAULTS = {                                               // 1863
    offset: 10                                                         // 1864
  };                                                                   //
                                                                       //
  ScrollSpy.prototype.getScrollHeight = function () {                  // 1867
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
  };                                                                   //
                                                                       //
  ScrollSpy.prototype.refresh = function () {                          // 1871
    var offsetMethod = 'offset';                                       // 1872
    var offsetBase = 0;                                                // 1873
                                                                       //
    if (!$.isWindow(this.$scrollElement[0])) {                         // 1875
      offsetMethod = 'position';                                       // 1876
      offsetBase = this.$scrollElement.scrollTop();                    // 1877
    }                                                                  //
                                                                       //
    this.offsets = [];                                                 // 1880
    this.targets = [];                                                 // 1881
    this.scrollHeight = this.getScrollHeight();                        // 1882
                                                                       //
    var self = this;                                                   // 1884
                                                                       //
    this.$body.find(this.selector).map(function () {                   // 1886
      var $el = $(this);                                               // 1889
      var href = $el.data('target') || $el.attr('href');               // 1890
      var $href = /^#./.test(href) && $(href);                         // 1891
                                                                       //
      return $href && $href.length && $href.is(':visible') && [[$href[offsetMethod]().top + offsetBase, href]] || null;
    }).sort(function (a, b) {                                          //
      return a[0] - b[0];                                              // 1898
    }).each(function () {                                              //
      self.offsets.push(this[0]);                                      // 1900
      self.targets.push(this[1]);                                      // 1901
    });                                                                //
  };                                                                   //
                                                                       //
  ScrollSpy.prototype.process = function () {                          // 1905
    var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
    var scrollHeight = this.getScrollHeight();                         // 1907
    var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height();
    var offsets = this.offsets;                                        // 1909
    var targets = this.targets;                                        // 1910
    var activeTarget = this.activeTarget;                              // 1911
    var i;                                                             // 1912
                                                                       //
    if (this.scrollHeight != scrollHeight) {                           // 1914
      this.refresh();                                                  // 1915
    }                                                                  //
                                                                       //
    if (scrollTop >= maxScroll) {                                      // 1918
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
    }                                                                  //
                                                                       //
    if (activeTarget && scrollTop < offsets[0]) {                      // 1922
      this.activeTarget = null;                                        // 1923
      return this.clear();                                             // 1924
    }                                                                  //
                                                                       //
    for (i = offsets.length; i--;) {                                   // 1927
      activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i]);
    }                                                                  //
  };                                                                   //
                                                                       //
  ScrollSpy.prototype.activate = function (target) {                   // 1935
    this.activeTarget = target;                                        // 1936
                                                                       //
    this.clear();                                                      // 1938
                                                                       //
    var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
                                                                       //
    var active = $(selector).parents('li').addClass('active');         // 1944
                                                                       //
    if (active.parent('.dropdown-menu').length) {                      // 1948
      active = active.closest('li.dropdown').addClass('active');       // 1949
    }                                                                  //
                                                                       //
    active.trigger('activate.bs.scrollspy');                           // 1954
  };                                                                   //
                                                                       //
  ScrollSpy.prototype.clear = function () {                            // 1957
    $(this.selector).parentsUntil(this.options.target, '.active').removeClass('active');
  };                                                                   //
                                                                       //
  // SCROLLSPY PLUGIN DEFINITION                                       //
  // ===========================                                       //
                                                                       //
  function Plugin(option) {                                            // 1967
    return this.each(function () {                                     // 1968
      var $this = $(this);                                             // 1969
      var data = $this.data('bs.scrollspy');                           // 1970
      var options = typeof option == 'object' && option;               // 1971
                                                                       //
      if (!data) $this.data('bs.scrollspy', data = new ScrollSpy(this, options));
      if (typeof option == 'string') data[option]();                   // 1974
    });                                                                //
  }                                                                    //
                                                                       //
  var old = $.fn.scrollspy;                                            // 1978
                                                                       //
  $.fn.scrollspy = Plugin;                                             // 1980
  $.fn.scrollspy.Constructor = ScrollSpy;                              // 1981
                                                                       //
  // SCROLLSPY NO CONFLICT                                             //
  // =====================                                             //
                                                                       //
  $.fn.scrollspy.noConflict = function () {                            // 1987
    $.fn.scrollspy = old;                                              // 1988
    return this;                                                       // 1989
  };                                                                   //
                                                                       //
  // SCROLLSPY DATA-API                                                //
  // ==================                                                //
                                                                       //
  $(window).on('load.bs.scrollspy.data-api', function () {             // 1996
    $('[data-spy="scroll"]').each(function () {                        // 1997
      var $spy = $(this);                                              // 1998
      Plugin.call($spy, $spy.data());                                  // 1999
    });                                                                //
  });                                                                  //
})(jQuery);                                                            //
                                                                       //
/* ========================================================================
 * Bootstrap: tab.js v3.3.1                                            //
 * http://getbootstrap.com/javascript/#tabs                            //
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.                                   //
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
                                                                       //
+(function ($) {                                                       // 2014
  'use strict';                                                        // 2015
                                                                       //
  // TAB CLASS DEFINITION                                              //
  // ====================                                              //
                                                                       //
  var Tab = function (element) {                                       // 2020
    this.element = $(element);                                         // 2021
  };                                                                   //
                                                                       //
  Tab.VERSION = '3.3.1';                                               // 2024
                                                                       //
  Tab.TRANSITION_DURATION = 150;                                       // 2026
                                                                       //
  Tab.prototype.show = function () {                                   // 2028
    var $this = this.element;                                          // 2029
    var $ul = $this.closest('ul:not(.dropdown-menu)');                 // 2030
    var selector = $this.data('target');                               // 2031
                                                                       //
    if (!selector) {                                                   // 2033
      selector = $this.attr('href');                                   // 2034
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }                                                                  //
                                                                       //
    if ($this.parent('li').hasClass('active')) return;                 // 2038
                                                                       //
    var $previous = $ul.find('.active:last a');                        // 2040
    var hideEvent = $.Event('hide.bs.tab', {                           // 2041
      relatedTarget: $this[0]                                          // 2042
    });                                                                //
    var showEvent = $.Event('show.bs.tab', {                           // 2044
      relatedTarget: $previous[0]                                      // 2045
    });                                                                //
                                                                       //
    $previous.trigger(hideEvent);                                      // 2048
    $this.trigger(showEvent);                                          // 2049
                                                                       //
    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return;
                                                                       //
    var $target = $(selector);                                         // 2053
                                                                       //
    this.activate($this.closest('li'), $ul);                           // 2055
    this.activate($target, $target.parent(), function () {             // 2056
      $previous.trigger({                                              // 2057
        type: 'hidden.bs.tab',                                         // 2058
        relatedTarget: $this[0]                                        // 2059
      });                                                              //
      $this.trigger({                                                  // 2061
        type: 'shown.bs.tab',                                          // 2062
        relatedTarget: $previous[0]                                    // 2063
      });                                                              //
    });                                                                //
  };                                                                   //
                                                                       //
  Tab.prototype.activate = function (element, container, callback) {   // 2068
    var $active = container.find('> .active');                         // 2069
    var transition = callback && $.support.transition && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length);
                                                                       //
    function next() {                                                  // 2074
      $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', false);
                                                                       //
      element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', true);
                                                                       //
      if (transition) {                                                // 2088
        element[0].offsetWidth; // reflow for transition               // 2089
        element.addClass('in');                                        // 2090
      } else {                                                         //
        element.removeClass('fade');                                   // 2092
      }                                                                //
                                                                       //
      if (element.parent('.dropdown-menu')) {                          // 2095
        element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', true);
      }                                                                //
                                                                       //
      callback && callback();                                          // 2104
    }                                                                  //
                                                                       //
    $active.length && transition ? $active.one('bsTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next();
                                                                       //
    $active.removeClass('in');                                         // 2113
  };                                                                   //
                                                                       //
  // TAB PLUGIN DEFINITION                                             //
  // =====================                                             //
                                                                       //
  function Plugin(option) {                                            // 2120
    return this.each(function () {                                     // 2121
      var $this = $(this);                                             // 2122
      var data = $this.data('bs.tab');                                 // 2123
                                                                       //
      if (!data) $this.data('bs.tab', data = new Tab(this));           // 2125
      if (typeof option == 'string') data[option]();                   // 2126
    });                                                                //
  }                                                                    //
                                                                       //
  var old = $.fn.tab;                                                  // 2130
                                                                       //
  $.fn.tab = Plugin;                                                   // 2132
  $.fn.tab.Constructor = Tab;                                          // 2133
                                                                       //
  // TAB NO CONFLICT                                                   //
  // ===============                                                   //
                                                                       //
  $.fn.tab.noConflict = function () {                                  // 2139
    $.fn.tab = old;                                                    // 2140
    return this;                                                       // 2141
  };                                                                   //
                                                                       //
  // TAB DATA-API                                                      //
  // ============                                                      //
                                                                       //
  var clickHandler = function (e) {                                    // 2148
    e.preventDefault();                                                // 2149
    Plugin.call($(this), 'show');                                      // 2150
  };                                                                   //
                                                                       //
  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler).on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler);
})(jQuery);                                                            //
                                                                       //
/* ========================================================================
 * Bootstrap: affix.js v3.3.1                                          //
 * http://getbootstrap.com/javascript/#affix                           //
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.                                   //
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
                                                                       //
+(function ($) {                                                       // 2168
  'use strict';                                                        // 2169
                                                                       //
  // AFFIX CLASS DEFINITION                                            //
  // ======================                                            //
                                                                       //
  var Affix = function (element, options) {                            // 2174
    this.options = $.extend({}, Affix.DEFAULTS, options);              // 2175
                                                                       //
    this.$target = $(this.options.target).on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this)).on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this));
                                                                       //
    this.$element = $(element);                                        // 2181
    this.affixed = this.unpin = this.pinnedOffset = null;              // 2182
                                                                       //
    this.checkPosition();                                              // 2186
  };                                                                   //
                                                                       //
  Affix.VERSION = '3.3.1';                                             // 2189
                                                                       //
  Affix.RESET = 'affix affix-top affix-bottom';                        // 2191
                                                                       //
  Affix.DEFAULTS = {                                                   // 2193
    offset: 0,                                                         // 2194
    target: window                                                     // 2195
  };                                                                   //
                                                                       //
  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop = this.$target.scrollTop();                          // 2199
    var position = this.$element.offset();                             // 2200
    var targetHeight = this.$target.height();                          // 2201
                                                                       //
    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false;
                                                                       //
    if (this.affixed == 'bottom') {                                    // 2205
      if (offsetTop != null) return scrollTop + this.unpin <= position.top ? false : 'bottom';
      return scrollTop + targetHeight <= scrollHeight - offsetBottom ? false : 'bottom';
    }                                                                  //
                                                                       //
    var initializing = this.affixed == null;                           // 2210
    var colliderTop = initializing ? scrollTop : position.top;         // 2211
    var colliderHeight = initializing ? targetHeight : height;         // 2212
                                                                       //
    if (offsetTop != null && colliderTop <= offsetTop) return 'top';   // 2214
    if (offsetBottom != null && colliderTop + colliderHeight >= scrollHeight - offsetBottom) return 'bottom';
                                                                       //
    return false;                                                      // 2217
  };                                                                   //
                                                                       //
  Affix.prototype.getPinnedOffset = function () {                      // 2220
    if (this.pinnedOffset) return this.pinnedOffset;                   // 2221
    this.$element.removeClass(Affix.RESET).addClass('affix');          // 2222
    var scrollTop = this.$target.scrollTop();                          // 2223
    var position = this.$element.offset();                             // 2224
    return this.pinnedOffset = position.top - scrollTop;               // 2225
  };                                                                   //
                                                                       //
  Affix.prototype.checkPositionWithEventLoop = function () {           // 2228
    setTimeout($.proxy(this.checkPosition, this), 1);                  // 2229
  };                                                                   //
                                                                       //
  Affix.prototype.checkPosition = function () {                        // 2232
    if (!this.$element.is(':visible')) return;                         // 2233
                                                                       //
    var height = this.$element.height();                               // 2235
    var offset = this.options.offset;                                  // 2236
    var offsetTop = offset.top;                                        // 2237
    var offsetBottom = offset.bottom;                                  // 2238
    var scrollHeight = $('body').height();                             // 2239
                                                                       //
    if (typeof offset != 'object') offsetBottom = offsetTop = offset;  // 2241
    if (typeof offsetTop == 'function') offsetTop = offset.top(this.$element);
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element);
                                                                       //
    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);
                                                                       //
    if (this.affixed != affix) {                                       // 2247
      if (this.unpin != null) this.$element.css('top', '');            // 2248
                                                                       //
      var affixType = 'affix' + (affix ? '-' + affix : '');            // 2250
      var e = $.Event(affixType + '.bs.affix');                        // 2251
                                                                       //
      this.$element.trigger(e);                                        // 2253
                                                                       //
      if (e.isDefaultPrevented()) return;                              // 2255
                                                                       //
      this.affixed = affix;                                            // 2257
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null;  // 2258
                                                                       //
      this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace('affix', 'affixed') + '.bs.affix');
    }                                                                  //
                                                                       //
    if (affix == 'bottom') {                                           // 2266
      this.$element.offset({                                           // 2267
        top: scrollHeight - height - offsetBottom                      // 2268
      });                                                              //
    }                                                                  //
  };                                                                   //
                                                                       //
  // AFFIX PLUGIN DEFINITION                                           //
  // =======================                                           //
                                                                       //
  function Plugin(option) {                                            // 2277
    return this.each(function () {                                     // 2278
      var $this = $(this);                                             // 2279
      var data = $this.data('bs.affix');                               // 2280
      var options = typeof option == 'object' && option;               // 2281
                                                                       //
      if (!data) $this.data('bs.affix', data = new Affix(this, options));
      if (typeof option == 'string') data[option]();                   // 2284
    });                                                                //
  }                                                                    //
                                                                       //
  var old = $.fn.affix;                                                // 2288
                                                                       //
  $.fn.affix = Plugin;                                                 // 2290
  $.fn.affix.Constructor = Affix;                                      // 2291
                                                                       //
  // AFFIX NO CONFLICT                                                 //
  // =================                                                 //
                                                                       //
  $.fn.affix.noConflict = function () {                                // 2297
    $.fn.affix = old;                                                  // 2298
    return this;                                                       // 2299
  };                                                                   //
                                                                       //
  // AFFIX DATA-API                                                    //
  // ==============                                                    //
                                                                       //
  $(window).on('load', function () {                                   // 2306
    $('[data-spy="affix"]').each(function () {                         // 2307
      var $spy = $(this);                                              // 2308
      var data = $spy.data();                                          // 2309
                                                                       //
      data.offset = data.offset || {};                                 // 2311
                                                                       //
      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom;
      if (data.offsetTop != null) data.offset.top = data.offsetTop;    // 2314
                                                                       //
      Plugin.call($spy, data);                                         // 2316
    });                                                                //
  });                                                                  //
})(jQuery);                                                            //
/////////////////////////////////////////////////////////////////////////

}).call(this);
