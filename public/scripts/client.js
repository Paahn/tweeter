/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweet) {
  let tweetArticle = $( '<article>' );
  let tweetHeader = $( '<header>' );
  let tweetFooter = $( '<footer>' );
  tweetHeader.append($( '<img src="/images/profile-hex.png">' ));
  tweetHeader.append($( '<span>' ).text( 'name' ));
  tweetHeader.append($( '<span>' ).text( '@userhandle' ));
  tweetArticle.append($(tweetHeader));
  tweetArticle.append($( '<div>' ).text( 'this is my tweet. boom.' ));
  tweetFooter.append($( '<div>' ));
}


// Test / driver code (temporary). Eventually will get this from the server.
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
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
