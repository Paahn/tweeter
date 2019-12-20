/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// creating tweet template. 
// note that since I am receiving the input inside the text(), I am not vulnerable to script inputs ^^
const createTweetElement = function(tweet) {
  let tweetArticle = $('<article>');
  let tweetHeader = $('<header>');
  let tweetFooter = $('<footer>');
  tweetHeader.append($('<img>').attr("src", tweet.user.avatars));
  tweetHeader.append($('<span>').text(tweet.user.name));
  tweetHeader.append($('<span>').addClass('hover-class').text(tweet.user.handle));
  tweetArticle.append($(tweetHeader));
  tweetArticle.append($('<div>').text(tweet.content.text));
  tweetFooter.append($('<div>'));

  return tweetArticle;
};

// shows tweets on app page
const renderTweets = function(tweet) {
  tweet.forEach((tweet) => {
    const tweetsContainer = $('.all-tweets');
    tweetsContainer.prepend(createTweetElement(tweet));
  });
};
// gets the tweets from the /tweets to pass them to render
const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function(tweetyTweets) {
      renderTweets(tweetyTweets);
    }
  });
};

// Toggle the compose tweet textarea on and off
const toggleComposeTweet = function() {
  $(".compose").click( (event) => {
    event.stopPropagation();
    $(".new-tweet").toggle(100, () => {
      $("#new-tweet-textarea").focus();
    });
  });
};


$(document).ready(() => {
  $('.form-class').submit((event) => {
    event.preventDefault();
    $(".new-tweet .display-error").css("visibility", "hidden");
    let text = $('#new-tweet-textarea').val();
    const tweetLength = text.length;
// performing validation for input
    if (!text) {
      $(".new-tweet .display-error").html("No tweet content!");
      $(".new-tweet .display-error").css("visibility", "visible").addClass("danger-colour");
      return; // block form submission when no content
    }
    if (tweetLength > 140) {
      $(".new-tweet .display-error").html("Tweet over the character limit!");
      $(".new-tweet .display-error").css("visibility", "visible").addClass("danger-colour");
      return; // block form submission when content over limit
    }


    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: $('#new-tweet-textarea').serialize()
    })
    .then((res) => {
      loadTweets();
    });

  });

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
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  loadTweets();
});

