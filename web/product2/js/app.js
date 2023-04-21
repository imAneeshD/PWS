var btn = document.getElementById('button');

window.scroll(function() {
  if (window.scrollTop() > 300) {
    btn.classList.add('show')
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});

