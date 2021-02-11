(function($, Drupal, drupalSettings){
'use strict';

 Drupal.behaviors.drsneolimp = {
   attach: function(context) {

  // Remove TID's onload.
  // Drupal.drsneolimp.remove_tid();

  // Remove TID's onchange.
  jQuery('body').find('#views-exposed-form-sport-kinds-page-1').find('.form-autocomplete').on('autocompleteclose', function() {
    Drupal.drsneolimp.remove_tid();
    $('.js-form-submit').click();
  });
}
};

Drupal.drsneolimp = {
  remove_tid: function () {
    let field_autocomplete = jQuery('body').find('.form-autocomplete');
    let autocomplete_tid_stripped = field_autocomplete.val().split(' ');
    console.log(autocomplete_tid_stripped);
    autocomplete_tid_stripped.pop();
    let clear = autocomplete_tid_stripped.join(' ');
    field_autocomplete.val(clear);
  },
};

})(jQuery, Drupal, drupalSettings);
