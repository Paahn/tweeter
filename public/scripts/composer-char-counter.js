const updateCounter = (counterPassed) => {
  $( 'span.counter ').text(140 - counterPassed);
}

$(document).ready(function() {
  let charCounter = 0;
  $( '.new-tweet textarea' ).on('keypress', function() {
    charCounter++ ;
    updateCounter(charCounter);
    if (charCounter > 140){
      $( ' span.counter ').addClass(' over-limit ');
    } else {
      $(' span.counter ').removeClass(' over-limit ');
    }
  })
});

