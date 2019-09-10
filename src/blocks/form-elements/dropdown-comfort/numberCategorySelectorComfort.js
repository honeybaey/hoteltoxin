/*
 * numbercategoryselector.js
 * Author & copyright (c) 2017: Sakri Koskimies
 *
 * MIT license
 */
(function ($) {

  $.fn.comfort = function (options) {

      $input = $(this);
      $originalPlaceholder = $input.attr("placeholder");

      var settings = $.extend({
          // Defaults.
          categoryNames: ["Adults", "Children"],
          categoryValues: false,
          minValue: 0,
          maxValue: 10,
          closeOnOutsideClick: true,
          showText: true,
          delimiter: ", ",
          align: "left",
          fade: true,
          useDisplay: true,
          showZero: false,
          callback: function(values){}
      }, options);

      if (!settings.categoryValues) {
          settings.categoryValues = newFilledArray(settings.categoryNames.length, 0);
      }

      $parent = createHTML();

      if (settings.closeOnOutsideClick) {
          $(document).mouseup(function (e) {
              if (!$input.is(e.target) && !$parent.is(e.target) && $parent.has(e.target).length === 0 && !$("div.comfort.display").is(e.target) && $("div.comfort.display").has(e.target).length === 0) {
                  if (settings.fade) {
                      $parent.fadeOut(200);
                  } else {
                      $parent.hide();
                  }
              }
          });
      }

      $(this).click(function () {
          switchSelector();
      });

      $(window).resize(function () {
          setPositions();

      });

      function doCallback() {
          if (typeof options.callback == 'function') {
              var callbackResult = {};
              for ($i = 0; $i < settings.categoryNames.length; $i++) {
                  callbackResult[settings.categoryNames[$i]] = settings.categoryValues[$i];
              }
              options.callback.call(this, callbackResult);
          }
      }

      function setPositions() {
          switch (settings.align) {
              case "left":
                  $parent.css("top", $input.position().top + $input.outerHeight());
                  $parent.css("left", $input.position().left);
                  break;
              
          }
          if (settings.useDisplay) {
              $display = $("div.comfort.display");
              $display.css("top", $input.position().top + 1);
              $display.css("left", $input.position().left + 1);
              $display.css("width", $input.width() - 1);
              $display.css("height", $input.height() - 1);
          }
      }

      $("a.comfort.button.plus").click(function () {
          $category = $(this).attr("category");
          if (settings.categoryValues[$category] < settings.maxValue) {
              settings.categoryValues[$category]++;
              $num = settings.categoryValues[$category];
              $("div.comfort.value[category='" + $category + "']").text($num);
              doCallback();
              if(settings.categoryValues[$category] == settings.maxValue){
                  $(this).addClass("inactive");
              }else{
                  $(this).removeClass("inactive");
              }
              if(settings.categoryValues[$category] > settings.minValue){
                  $("a.comfort.button.minus[category='"+$category+"']").removeClass("inactive");
              }else{
                  $("a.comfort.button.minus[category='"+$category+"']").addClass("inactive");
              }
          }
          if (settings.showText) {
              if (!settings.useDisplay) {
                  updateText();
              } else {
                  updateElement();
              }
          }
          return false;
      });

      $("a.comfort.button.minus").click(function () {
          $category = $(this).attr("category");
          if (settings.categoryValues[$category] > settings.minValue) {
              settings.categoryValues[$category]--;
              $num = settings.categoryValues[$category];
              $("div.comfort.value[category='" + $category + "']").text($num);
              doCallback();
              if(settings.categoryValues[$category] == settings.minValue){
                  $(this).addClass("inactive");
              }else{
                  $(this).removeClass("inactive");
              }
              if(settings.categoryValues[$category] < settings.maxValue){
                  $("a.comfort.button.plus[category='"+$category+"']").removeClass("inactive");
              }else{
                  $("a.comfort.button.plus[category='"+$category+"']").addClass("inactive");
              }
          }
          if (settings.showText) {
              if (!settings.useDisplay) {
                  updateText();
              } else {
                  updateElement();
              }
          }
          return false;
      });

      function updateElement() {
          $input.val("");
          $display = $("div.comfort.inlinedisplay");
          $display.empty();
          $displayelements = 0;
          for ($i = 0; $i < settings.categoryNames.length; $i++) {
              if (settings.categoryValues[$i] != 0 || settings.showZero) {
                  $displayelement = $("<div class='comfort displayelement'></div>").appendTo($display);
                  $displayelement.text(settings.categoryValues[$i] + " " + settings.categoryNames[$i] + ", ");
                  $displayelements++;
              }
          }
          if ($displayelements == 0) {
              $input.attr("placeholder", $originalPlaceholder)
          } else {
              $input.attr("placeholder", "")
          }
          updateText();
      }

      function updateText() {
          $text = "";
          $added = 0;
          $sum = 0;
          for ($i = 0; $i < settings.categoryNames.length; $i++) {
              if (settings.categoryValues[$i] != 0 || settings.showZero) {
                  if ($added != 0) {
                      $text += settings.delimiter;
                  }
                  $text += settings.categoryValues[$i] + " " + settings.categoryNames[$i];
                  $added++;
              }
          }
          $input.val($text);

        //   if ($sum == 0) {
        //     $input.val($originalPlaceholder); 
        //     $(".NCSG.reset").show();
        // } else {
        //     $input.val($text);
        //     $(".NCSG.reset").hide();
        // }
      }


      function createHTML() {

          $input.attr("type", "text");
          if (settings.useDisplay) {

              $input.attr("placeholder", "");

              $display = $("<div class='comfort display'></div>").prependTo("body");
              $display.css("top", $input.position().top + 1);
              $display.css("left", $input.position().left + 1);
              $display.css("width", $input.width() - 1);
              $display.css("height", $input.height() - 1);

              $("<div class='comfort inlinedisplay'></div>").prependTo($display);

              $display.click(function () {
                  switchSelector();
              });
          }


          $parent = $("<div class='comfort parent'></div>").prependTo("body").hide();

          switch (settings.align) {
              case "left":
                  $parent.css("top", $input.position().top + $input.outerHeight());
                  $parent.css("left", $input.position().left);
                  break;
              
          }

          for ($i = 0; $i < settings.categoryNames.length; $i++) {
              $category = $("<div class='comfort category'></div>").appendTo($parent);
              $text = $("<div class='comfort text'></div>").appendTo($category);
              $name = $("<div class='comfort name' category='" + $i + "'>&nbsp;" + settings.categoryNames[$i] + "</div>").appendTo($text);
              $buttons = $("<div class='comfort buttons'></div>").appendTo($category);
              $button_minus = $("<a href='' class='comfort button minus' category='" + $i + "'>&#8211;</a>").appendTo($buttons);
              $value = $("<div class='comfort value' category='" + $i + "'>" + settings.categoryValues[$i] + "</div>").appendTo($buttons);
              $button_plus = $("<a href='' class='comfort button plus' category='" + $i + "'>&#43;</a>").appendTo($buttons);

              if(settings.categoryValues[$i] == settings.maxValue){
                  $button_plus.addClass("inactive");
              }

              if(settings.categoryValues[$i] == settings.minValue){
                  $button_minus.addClass("inactive");
              }
          }
          $close = $("<div class='NCSG room'></div><a class='NCSG close' href=''>Применить</a>").appendTo($parent);
          $close.click(function () {
              if (settings.fade) {
                  $parent.fadeOut(200);
              } else {
                  $parent.hide();
              }
              return false;
          });
          $zero = $("<div class='NCSG room'></div><a class='NCSG reset' href=''>Очистить</a>").appendTo($parent);
          $zero.click(function() {
          for ($i = 0; $i < settings.categoryNames.length; $i++) {
              if (settings.categoryValues[$i] != 0 || settings.showZero) {
                  settings.categoryValues[$i] = 0;
                  $("div.comfort.value[category='" + $i + "']").text("0");
                  $(".comfort.button.minus").addClass("inactive");
                  doCallback();
              }
          }
          updateText();
          return false;
      });

          if (settings.showText) {
              if (!settings.useDisplay) {
                  updateText();
              } else {
                  updateElement();
              }
          }

          if (settings.useDisplay) {
              $input.css("color", "transparent");
          }

          return $parent;
      }

      function switchSelector() {
          if (settings.fade) {
              $parent.fadeToggle(200);
          } else {
              $parent.toggle();
          }
      }

      function newFilledArray(len, val) {
          var rv = new Array(len);
          while (--len >= 0) {
              rv[len] = val;
          }
          return rv;
      }

  }
  ;

}(jQuery)
)
;