/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const createTweetElement = function(tweet) {
  // $( '.all-tweets' )
  let tweetArticle = $( '<article>' );
  let tweetHeader = $( '<header>' );
  let tweetFooter = $( '<footer>' );
  tweetHeader.append($( '<img>' ).attr("src", tweet.user.avatars));
  tweetHeader.append($( '<span>' ).text( tweet.user.name ));
  tweetHeader.append($( '<span>' ).addClass( 'hover-class' ).text( tweet.user.handle ));
  tweetArticle.append($(tweetHeader));
  tweetArticle.append($( '<div>' ).text( tweet.content.text ));
  tweetFooter.append($( '<div>' ));
  console.log(tweetArticle[0]);
  return tweetArticle;
}

const renderTweets = function(tweets) {

  const tweetsContainer = $( '.all-tweets' );
  console.log(tweets);
  console.log(tweetsContainer[0])
  tweetsContainer.append(createTweetElement(tweets[0]));
}

$(document).ready(() => {
  $('.form-class').submit((event) =>  {
    event.preventDefault();
    let text = $('#new-tweet-textarea').val();
    console.log(text);
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
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  renderTweets(data);
});

