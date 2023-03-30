/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.


$(document).ready(() => {
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };
  const createTweetElement = function(tweetData) {
    // $(() => {

    const $tweet = $(`
  <article class="tweet-outline">
  <header class="tweetHeader">
    <div class="tweetUserBox">
      <!-- user avatar -->
      <img class="tweetAvatar" src=${tweetData.user.avatars}>
      <!-- username -->
      <span class="tweetName">${tweetData.user.name}</span>
    </div>
    <!-- usertag -->
    <span class="tweetTag">${tweetData.user.handle}</span>
  </header>
  
  <div class="tweetBox">
    <!-- Tweet Text -->
    <span class="tweet-message"><strong>${tweetData.content.text}</strong></span>
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
  // date(tweetData.created_at)
    return $tweet;
  };

  const renderTweets = function(tweets) {
    //loop through tweets
    for (const tweet of tweets) {
      //calls createTweetElements for each tweet
      const $tweet = createTweetElement(tweet);
      //take returns and appends it to the tweets container
      $tweetCanvas.prepend($tweet);
    }
  };

  const $loadtweets = $(function() {

    const $button = $('#styledButton');

    $button.on('click', function() {
      console.log('Button clicked, performing ajax call...');
      $.ajax({
        method: 'GET',
        url: '/tweets' 
      }).then((tweets) => {
        renderTweets(tweets)});
    });
  });

 
  //grab the tweet canvas section in the DOM
  const $tweetCanvas = $('.tweetCanvas');

  // loadtweets();

  $.ajax({
    method: 'GET',
    url: '/tweets',
  }).then((tweets) => {
    renderTweets(tweets);
  });


  //grab the form from the DOM
  const $form = $('form');

  //aadd a submit event handler to the form
  $form.on('submit', (event) => {
    event.preventDefault();
    console.log('the form has submitted');

    const urlencoded = $form.serialize();
    console.log(urlencoded);


    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: urlencoded
    }).then((newTweet) => {
      console.log(newTweet);
    });

  });
});


// const $tweet = createTweetElement(tweetData);

// $tweetCanvas.prepend($tweet);


const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]








// const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.