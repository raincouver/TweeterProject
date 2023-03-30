//Show or hide form on click
$(document).ready(function() {
  $("#formToggle").on("click", function() {
    $('.new-tweet').slideToggle("fast");
  }); 
});
