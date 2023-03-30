//change icon color if mouse over
$(document).on("mouseenter", ".tweetIcon", function() {
  // Change color mouseover
    $(this).css({ 'color': '#F1C40F' });
});
$(document).on("mouseleave", ".tweetIcon", function() {
  // Change color back if mouseout
    $(this).css({ 'color': '#4056A1' });
});

//box shade effect if mouseover
$(document).on("mouseenter", ".tweet-outline", function() {
  // Change color mouseover
    $(this).css({ 'box-shadow': '10px 10px #AFAFAF' });
});
$(document).on("mouseleave", ".tweet-outline", function() {
  // Change color back if mouseout
    $(this).css({ 'box-shadow': 'none' });
});