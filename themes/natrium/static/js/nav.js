$(document).ready(function() {
  $(window).scroll(function() {
    showAsideNavIfNotTop()
    scrollPane()
  })
});

function showAsideNavIfNotTop() {
  if (window.pageYOffset > 10) {
    $('.left-pane-nav').fadeIn()
  } else {
    $('.left-pane-nav').fadeOut()
  }
}

function scrollPane() {
  var topStart = 128; // should be the same as in `pane.css`
  var topEnd = 20;
  var topRange = topStart - topEnd;

  var yStart = 100;
  var yEnd = window.innerHeight;
  var yRange = (yEnd - yStart);

  var y = window.pageYOffset;

  if (yStart < y && y < yEnd) {
    var delta = topRange * (y - yStart) / (yEnd - yStart);
    var top = topStart - delta;

    Array.from(document.getElementsByClassName('aside-pane')).forEach(function(item) {
      item.style.marginTop = top + 'px';
    })
  }

}
