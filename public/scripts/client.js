/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.


$(document).ready(() => {

  const createTweetElement = function(tweetData) {

    const $tweet = $(`
      <article class="tweet-outline">
      <header class="tweetHeader">
        <div class="tweetUserBox">
          <!-- user avatar -->
          <img class="tweetAvatar" src=${tweetData.user.avatars}>
          <!-- username -->
          <span class="tweetName">${escape(tweetData.user.name)}</span>
        </div>
        <!-- usertag -->
        <span class="tweetTag">${escape(tweetData.user.handle)}</span>
      </header>
      
      <div class="tweetBox">
        <!-- Tweet Text -->
        <span class="tweet-message"><strong>${escape(tweetData.content.text)}</strong></span>
      </div>
      <!-- Tweet Line -->
      <hr class="tweet-line">
      
      <footer class="tweetFooter">
        <!-- 10 days ago -->
        <span class="tweetTime">${timeago.format(tweetData.created_at)}</span>
        <div class="tweetIconBox">
          <!-- like comment icons -->
          <button class="tweetIcon" type="submit">
            <i class="fa-solid fa-flag"></i>
          </button>
          <button class="tweetIcon" type="submit">
            <i class="fa-sharp fa-solid fa-retweet"></i>
          </button>
          <button class="tweetIcon" type="submit">
            <i class="fa-sharp fa-solid fa-heart"></i>
          </button>
        </div>
      </footer>
      </article>
    `);

    return $tweet;
  };

  const renderTweets = function(tweets) {

    //empty the tweet canvas before fetch
    $tweetCanvas.empty();

    //loop through tweets
    for (const tweet of tweets) {
      //calls createTweetElements for each tweet
      const $tweet = createTweetElement(tweet);
      //take returns and appends it to the tweets container
      $tweetCanvas.prepend($tweet);
    }
  };

  const loadtweets = (function() {

    $.ajax({
      method: 'GET',
      url: '/tweets',
    }).then((tweets) => {
      renderTweets(tweets);
    });

  });

  //Preventing XSS with Escaping
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createWaring = function(type) {

    const $waringOverLimit = $(`
      <div id="newTweetWarning">
        <i class="fa-solid fa-circle-exclamation" id="warnIcon"></i>
        <span id="warningMessage">Warning: You have exceeded the maximum text limit. Please limit your entry to 140 characters or less.</span>
      </div>
    `);

    const $waringUnderLimit = $(`
      <div id="newTweetWarning">
        <i class="fa-solid fa-circle-exclamation" id="warnIcon"></i>
        <span id="warningMessage">Warning: Sorry, but you haven't entered anything. Please enter a valid input.</span>
      </div>
    `);

    //empty the warning before fetch
    $('#newTweetWarning').empty();

    //warn if over limit
    if (type === 'over') {
      $('#newTweetWarning').append($waringOverLimit);
      $("#newTweetWarning").css({ 'border': 'solid 2px red' });
      //add animation to notify user
      setInterval(function() {
        $("#warnIcon").fadeIn(1000).fadeOut(1000);
      }, 1000);
    }
    //warn if under limit
    if (type === 'under') {
      $('#newTweetWarning').append($waringUnderLimit);
      $("#newTweetWarning").css({ 'border': 'solid 2px red' });
      //add animation to notify user
      setInterval(function() {
        $("#warnIcon").fadeIn(1000).fadeOut(1000);
      }, 1000);

    }
  };

  //grab the tweet canvas section in the DOM
  const $tweetCanvas = $('.tweetCanvas');

  //fetch the tweets on the initial load
  loadtweets();

  //grab the form from the DOM
  const $form = $('form');

  //aadd a submit event handler to the form
  $form.on('submit', (event) => {
    event.preventDefault();
    console.log('the form has submitted');

    //validate user input before posted: alert if over 140 chars
    if ($('#tweet-text').val().length > 140) {
      createWaring('over');
      return;
    }

    //validate user input before posted: alert if empty
    if ($('#tweet-text').val().length === 0) {
      createWaring('under');
      return;
    }

    //remove warining if last tweet tweeted successfully
    $('#newTweetWarning').empty();
    $("#newTweetWarning").css({ 'border': 'none' });


    
    console.log($('#tweet-text').val());
    const urlencoded = $form.serialize();
    console.log(urlencoded);

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: urlencoded
    }).then((newTweet) => {
      console.log(newTweet);
      //fetch the tweets again
      loadtweets();

      //empty tweet input area after tweet posted successfully
      $('#tweet-text').val('');    
      $("#tweetCounter").text(140 - $('#tweet-text').val().length);
    });
  });
});