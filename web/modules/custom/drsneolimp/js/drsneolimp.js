(function($, Drupal, drupalSettings){
'use strict';

  Drupal.behaviors.drsneolimp = {
    attach: function(context, settings) {
      jQuery('body').find('#views-exposed-form-trainers-page-1').find('.form-autocomplete').on('autocompleteclose', function() {
        $('.js-form-submit').click();
      });
      // Remove TID's onchange.
      jQuery('body').find('#views-exposed-form-sport-kinds-page-1').find('.form-autocomplete').on('autocompleteclose', function() {
        Drupal.drsneolimp.remove_tid();
        $('.js-form-submit').click();
      });
      // Change select value on sport kinds filter
      jQuery('body').find('#sport-kinds-filter').find('.change_value').once('change_value').on('click', function() {
        var tid = $(this).attr("tid");
        var selected = $('select[name="field_sport_kinds_target_id"]').val();
        $('div[id="tid' + selected +'"]').removeClass('active');
        if (tid == selected) {
          tid = 'All';
        }
        else {
          $(this).addClass('active');
        }
        $('select[name="field_sport_kinds_target_id"]').val(tid).change();
      });
      // Get node by id
      jQuery('body').find('.get-trainer').once().on('click', function() {
        var nid = $(this).attr("data-history-node-id");
        $.ajax({
          url: '/api/v1/get-trainer/' + nid + '/' + drupalSettings.path.currentLanguage,
          type: 'GET',
          dataType: 'json',
          data: {
            '_format': 'json',
          },
          success: response => {
            $('.map-collapse').attr('data-coordinates', response.field_coordinates.length !== 0 ? response.field_coordinates[0].value : '');
            $('.modal-body').find('.avatar-icon').find('img').attr('src', $(this).find('img').attr('src'));
            $('.modal-body').find('.trainer-name-modal').html($(this).find(".trainer-name span").html());
            $('.modal-body').find('.sport-kind').html($(this).find(".sport-kind").html());
            $('.modal-body').find('.bullets').html($(this).find(".bullets").html());
            $('.modal-body').find('.senior').html($(this).find(".senior").html());
            $('.modal-body').find('.details-row__phone').html((response.field_phone.length !== 0) ? response.field_phone[0].value : '');
            $('.modal-body').find('.body').html((response.body.length !== 0) ? response.body[0].value : '');
            $('.modal-body').find('.modal-address').html((response.field_address.length !== 0) ? '<span>' + Drupal.t('Адрес') + ':</span> ' + response.field_address[0].value : '');
            $('#modal--trainer').modal('show');
          },
          error: response => {
            console.log(response.respononseText);
          },
        });
      });

      jQuery('body').find('#modal--trainer').once().on('hide.bs.modal', function(e) {
        $('.map-collapse').attr('data-coordinates', '');
        $('.map-collapse').collapse('hide');
        $('.map-collapse').attr('data-map-inited', 0);
        $('.map-collapse').find('.modal-map').html('');
        $('.modal-body').find('.avatar-icon').find('img').attr('src', '');
        $('.modal-body').find('.trainer-name-modal').html('');
        $('.modal-body').find('.sport-kind').html('');
        $('.modal-body').find('.bullets').html('');
        $('.modal-body').find('.senior').html('');
        $('.modal-body').find('.details-row__phone').html('');
        $('.modal-body').find('.body').html('');
        $('.modal-body').find('.modal-address').html('');
			});

      if ($("#yandex-map-trainers").once().length) {
        ymaps.ready(function () {
          let placemarkObject;
          let myMap;
          let trainers = drupalSettings.trainers;
          console.log(trainers);
          myMap = new ymaps.Map(
            "yandex-map-trainers",
            {
              center: [51.143969, 71.435801],
              zoom: 12,
            },
            { searchControlProvider: "yandex#search" }
          );

          // Создаём макет содержимого.
          let MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
          );

          placemarkObject = new Map();

          for (let i = 0; i < trainers.length; i++) {
            placemarkObject.set(
              "placemark" + i,
              new ymaps.Placemark(
                trainers[i].coordinates,
                {
                  hintContent: "",
                  balloonContent: "",
                  iconContent: "",
                },
                {
                  iconLayout: "default#imageWithContent",
                  iconImageHref: "/themes/custom/sport/web/images/svg/map-tip.svg",
                  iconImageSize: [36, 36],
                  iconImageOffset: [-18, 0],
                  // Смещение слоя с содержимым относительно слоя с картинкой.
                  iconContentOffset: [0, 0],
                  // Макет содержимого.
                  iconContentLayout: MyIconContentLayout,
                  draggable: true,
                  hideIconOnBalloonOpen: false,
                }
              )
            );

            const currentPlacemark = placemarkObject.get("placemark" + i);
            currentPlacemark.events.add('click', function (e) {
              // $('#' + e.get('target').options._options.id).modal()
              $("figure[data-history-node-id='" + trainers[i].id +"']").click();
            });

            myMap.geoObjects.add(currentPlacemark);
          }
        });
      }

      $("div.nav-tabs > a").on("shown.bs.tab", function(e) {
        localStorage.setItem('activeTab', $(e.target).attr('href'));
      });
      // on load of the page: switch to the currently selected tab
      var activeTab = localStorage.getItem('activeTab');
      if(activeTab){
          $('div.nav-tabs a[href="' + activeTab + '"]').tab('show');
      }

    }
  };

  Drupal.drsneolimp = {
    remove_tid: function () {
      let field_autocomplete = jQuery('body').find('.form-autocomplete');
      let autocomplete_tid_stripped = field_autocomplete.val().split(' ');
      autocomplete_tid_stripped.pop();
      let clear = autocomplete_tid_stripped.join(' ');
      field_autocomplete.val(clear);
    },
  };
})(jQuery, Drupal,drupalSettings);
