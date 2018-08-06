$(function() {
  $('nav').on('click', 'a', function(e) {
    e.preventDefault();
    var $e = $(e.target);
    var index = $e.attr('href');

    switchPage(index);
    history.pushState({index: index}, $e.text(), location.pathname + index);
  });

  $(window).on('popstate', function(e) {
    var state = e.originalEvent.state;

    switchPage(state === null ? '#page_1' : state.index);
  });

  if (location.hash) {
    switchPage(location.hash);
  }

  function switchPage(index) {
    $('.active').removeClass('active');
    $("nav a[href='" + index + "']").addClass('active');
    $('article').hide().filter(index).show();
  }
});
