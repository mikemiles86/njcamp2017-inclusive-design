Reveal.addEventListener('slidechanged', function(event) {
  var gifs = event.currentSlide.getElementsByClassName("reload-gif");
  for (var g = 0;g < gifs.length; g++) {
    if (gifs[g].hasAttribute('src')) {
      gifs[g].src = gifs[g].src + "?" + new Date().getTime();
    }
  }
})
