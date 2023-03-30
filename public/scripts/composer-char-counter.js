$(document).ready(function(){
  $("#tweet-text").on("input", function(){
      // Print remaining length in counter
      $("#tweetCounter").text(140 - $(this).val().length);
      // Change color to red if input is longger than 140
      if ($(this).val().length > 140) {
        $("#tweetCounter").css({'color':'red'});
        //add animation to notify user
        setInterval(function() {
          $("#tweetCounter").fadeIn(500).fadeOut(500);
        }, 500);
      }
      // Change color back to normal if input is below 140 again
      if ($(this).val().length <= 140) {
        $("#tweetCounter").css({'color':'#545149'});
      }
  });
});
