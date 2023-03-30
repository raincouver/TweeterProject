//Show or hide form on click
$(document).ready(function() {
  $("#formToggle").on("click", function() {
    $('.new-tweet').slideToggle("fast");
  });

  $("#buttonTop").on("click", function() {
    $("html, body").animate({
      scrollTop: 0
    }, 1000);
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() < 250) {
      $('#buttonTop').hide(1000);
    }
    else {
      $('#buttonTop').show(1000);
    }
  });
});

