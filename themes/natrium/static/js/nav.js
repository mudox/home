$(document).ready(function() {
  $(window).scroll(function() {
    showPaneNavIfNotTop()
    scrollPanes()
  })
});

function showPaneNavIfNotTop() {
  // 70 here ~= height of header
  if (window.pageYOffset > 70) {
    $('.pane-nav').fadeIn()
  } else {
    $('.pane-nav').fadeOut()
  }
}

function scrollPanes() {
  var topStart = 128; // should be the same as in `pane.css`
  var topEnd = 20;
  var topRange = topStart - topEnd;

  var yStart = 100;
  var yEnd = window.innerHeight;
  var yRange = (yEnd - yStart);

  var y = window.pageYOffset;

  var newTop;
  if (y < yStart) {
    newTop = topStart;
  } else if (yStart < y && y < yEnd) {
    var delta = topRange * (y - yStart) / (yEnd - yStart);
    newTop = topStart - delta;
  } else {
    newTop = topEnd;
  }

  Array.from(document.getElementsByClassName('aside-pane')).forEach(function(item) {
    item.style.marginTop = newTop + 'px';
  })
}
