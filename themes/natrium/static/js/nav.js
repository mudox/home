var sidebarMenu;
var seeAlso;
var shown = '';

$(document).ready(function() {
  sidebarMenu = $('.sidebar-menu').detach();
  sidebarMenu.css('display', 'initial');
  seeAlso = $('.related-article-list');
  seeAlso.css('display', 'initial');

  $(window).scroll(function() {
    showHideLeftSidebarSections()
    scrollPanes()
  })
});

var lastWindowScrollY = 0;

function showHideLeftSidebarSections() {
  let stage = $('.left-sidebar .stage1')
  let lastY = lastWindowScrollY;
  let y = window.scrollY
  lastWindowScrollY = y;

  if (y > lastY) {
    if (shown != 'sidebarMenu') {
      shown = 'sidebarMenu';
      stage.fadeOut('fast', function() {
        stage.empty();
        stage.append(sidebarMenu);
        stage.fadeIn('fast');
      })
    }
  } else {
    if (shown != 'seeAlso') {
      shown = 'seeAlso';
      stage.fadeOut('fast', function() {
        stage.empty();
        stage.append(seeAlso);
        stage.fadeIn('fast');
      })
    }
  }
}

function scrollPanes() {
  var topStart = 128; // should be the same as in `pane.css`
  var topEnd = 50;
  var topRange = topStart - topEnd;

  var yStart = 100;
  var yEnd = window.innerHeight;
  var yRange = (yEnd - yStart);

  var y = window.scrollY;

  var newTop;
  if (y < yStart) {
    newTop = topStart;
  } else if (yStart < y && y < yEnd) {
    var delta = topRange * (y - yStart) / (yEnd - yStart);
    newTop = topStart - delta;
  } else {
    newTop = topEnd;
  }

  Array.from(document.getElementsByClassName('sidebar')).forEach(function(item) {
    item.style.marginTop = newTop + 'px';
  })
}
