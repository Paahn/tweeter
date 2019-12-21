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
  tweetArticle.append($('<p>').addClass('stay-inside-text').text(tweet.content.text));
  tweetFooter.append($('<div>').addClass('time'));
  tweetFooter.append($('<span>')).text(`${timeSinceTweeted(new Date(), new Date(tweet.created_at))}`);
  tweetArticle.append($(tweetFooter));

  return tweetArticle;
};

const timeSinceTweeted = function(current, previous) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return "about " + Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return "about " + Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return "about " + Math.round(elapsed / msPerYear) + " years ago";
  }
};



// shows tweets on app page
const renderTweets = function(tweet) {
  const tweetsContainer = $('.all-tweets');
  tweetsContainer.empty();
  tweet.forEach((tweet) => {
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
  toggleComposeTweet();
  loadTweets();
});

