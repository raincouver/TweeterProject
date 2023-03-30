//change icon color if mouse over
$(document).ready(function(){
  $(".tweetIcon").on("mouseover", function(){
      // Change color mouseover
      $(this).css({'color':'#F1C40F'});
  });
  $(".tweetIcon").on("mouseout", function(){
    // Change color back if mouseout
    $(this).css({'color':'#4056A1'});
});
});

//box shade effect if mouseover
$(document).ready(function(){
  $(".tweet-outline").on("mouseover", function(){
      // Change color mouseover
      $(this).css({'box-shadow':'10px 10px #AFAFAF'});
  });
  $(".tweet-outline").on("mouseout", function(){
    // Change color back if mouseout
    $(this).css({'box-shadow':'none'});
});
});