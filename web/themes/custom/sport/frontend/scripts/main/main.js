"use strict";
import initSlider from "./sliders";

(function ($) {
  initSlider();

  $(".map-collapse").on("shown.bs.collapse", function (e) {
    let mapInited = parseInt($(e.target).attr("data-map-inited"));

    const params = {
      el: $(e.target).find(".modal-map").get(0),
      coordinates: $(e.target).attr("data-coordinates").split(","),
      iconImageHref: "images/svg/map-tip.svg",
    };

    !mapInited && initMap(params);
  });

  function initMap(obj) {
    const {
      coordinates,
      el,
      iconImageHref,
      zoom = 12,
      iconImageSize = [36, 36],
      iconImageOffset = [-18, 0],
    } = obj;

    ymaps.ready(function () {
      let map = new ymaps.Map(
        el,
        {
          center: coordinates,
          zoom,
        },
        {
          searchControlProvider: "yandex#search",
        }
      );

      let myPlacemark = new ymaps.Placemark(
        coordinates,
        {
          hintContent: "",
          balloonContent: "",
          iconContent: "",
        },
        {
          iconLayout: "default#imageWithContent",
          iconImageHref,
          iconImageSize,
          iconImageOffset,
          iconContentOffset: [0, 0],
          hideIconOnBalloonOpen: false,
        }
      );

      map.geoObjects.add(myPlacemark);
      $(el).parents(".map-collapse").attr("data-map-inited", 1);
    });
  }

  if ($("#yandex-map-trainers").length) {
    ymaps.ready(function () {
      let placemarkObject;
      let myMap;
      let placemarksCoordinates = [
        [43.245784838545, 76.94864294071115],
        [43.223342794696485, 76.95543649999995],
        [43.243519548700874, 76.94079119629849],
      ];
      myMap = new ymaps.Map(
        "yandex-map-trainers",
        {
          center: [43.223342794696485, 76.95543649999995],
          zoom: 12,
        },
        { searchControlProvider: "yandex#search" }
      );

      // Создаём макет содержимого.
      let MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      );

      placemarkObject = new Map();

      for (let i = 0; i < placemarksCoordinates.length; i++) {
        placemarkObject.set(
          "placemark" + i,
          new ymaps.Placemark(
            placemarksCoordinates[i],
            {
              hintContent: "",
              balloonContent: "",
              iconContent: "",
            },
            {
              iconLayout: "default#imageWithContent",
              iconImageHref: "images/svg/map-tip.svg",
              iconImageSize: [36, 36],
              iconImageOffset: [-18, 0],
              // Смещение слоя с содержимым относительно слоя с картинкой.
              iconContentOffset: [0, 0],
              // Макет содержимого.
              iconContentLayout: MyIconContentLayout,
              hideIconOnBalloonOpen: false,
            }
          )
        );

        const currentPlacemark = placemarkObject.get("placemark" + i);
        myMap.geoObjects.add(currentPlacemark);
      }
    });
  }

  const yandexMapContacts = $("#yandex-map-contacts");
  if (yandexMapContacts.length) {
    let coordinates = yandexMapContacts.attr("data-coordinates").split(",");

    const params = {
      el: yandexMapContacts.get(0),
      coordinates: yandexMapContacts.attr("data-coordinates").split(","),
      iconImageHref: "images/svg/map-tip-main.svg",
      zoom: 13,
      iconImageSize: [54, 54],
      iconImageOffset: [-27, 0],
    };

    coordinates.length && initMap(params);
  }

  //mobile burger start
  $(".js-hamburger").on("click", function () {
    $(this).toggleClass("active");
    $("body, html").toggleClass("no-scroll");
    $(".mobile-menu").toggleClass("active");
  });

  function onResize() {
    let docHeight = $(window).outerHeight();
    const headerHeight = $(".header").outerHeight();
    $(".mobile-menu").css({
      height: docHeight - headerHeight,
      top: headerHeight,
    });
  }

  onResize();
  $(window).on("resize", onResize);
  //mobile burger end

  //select start
  $('#select-1').multiselect({
    onChange: function (option, checked, select) {
    },
    onDropdownShow: function(event) {

    },
    onDropdownHide: function(event) {

    },
    buttonText: function(options, select) {
      if (options.length == 0) {
        return this.nonSelectedText;
      } else {
        if (options.length > this.numberDisplayed) {
          return options.length + ' ' + this.nSelectedText;
        } else {
          var selected = '';
          options.each(function() {
            var label = ($(this).attr('label') !== undefined) ? $(this).attr('label') : $(this).html();

            selected += label + ', ';
          });
          return selected.substr(0, selected.length - 2);
        }
      }
    },
    nSelectedText: 'выбрано',
    nonSelectedText : '',
    maxHeight: 320
  });
  //select end
}(jQuery));
