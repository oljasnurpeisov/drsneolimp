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
