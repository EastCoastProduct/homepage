//js for team container actions
$(document).ready(function() {
  var lastFocus;
  $('.bio').attr('aria-hidden', 'true');
  $('.open-bio').removeAttr('tabIndex');
  $('.open-bio').on('click', function(e) {
    var bioHeight = $(this).nextAll('.bio').height();
    e.preventDefault();
    if ( $(this).closest('.alumnus').hasClass('is-active') ) {
      $(this).nextAll('.bio').fadeOut(200, function(){
        $(this).removeAttr('style').closest('.alumnus').removeClass('is-active').removeAttr('style');
        $(this).attr('aria-hidden', 'true');
      });
      lastFocus.focus();
    } else {
      $('.alumnus').removeClass('is-active').removeAttr('style');
      $(this).closest('.alumnus').addClass('is-active').css('margin-bottom', (bioHeight+73) + 'px');
      $('.bio').attr('aria-hidden', 'true');
      $(this).nextAll('.bio').attr('aria-hidden', 'false');
      lastFocus = document.activeElement;
    }
  });
  $(window).on('resize', function(){
    var bioHeightNew = $('.alumnus.is-active .bio').height();
    $('.alumnus.is-active').css('margin-bottom', (bioHeightNew+73) + 'px')
  });
  $('.close-bio').click(function(e) {
    e.preventDefault();
    $(this).closest('.bio').fadeOut(200, function(){
      $(this).removeAttr('style').closest('.alumnus').removeClass('is-active').removeAttr('style');
      $(this).attr('aria-hidden', 'true');
    });
    lastFocus.focus();
  });
  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      $('.alumnus.is-active .bio').fadeOut(200, function(){
        $(this).removeAttr('style').closest('.alumnus').removeClass('is-active').removeAttr('style');
        $(this).attr('aria-hidden', 'true');
      });
      lastFocus.focus();
    }
  });
});