document.addEventListener("scroll", function(){ // add scroll event listener to document
  var matches = document.querySelectorAll('.img-parallax'); // obtain all images

  for (var i = 0; i < matches.length; i++){
    var img = matches[i];
    var imgParent = img.parentElement;
    var speed = img.getAttribute('data-speed'); // Obtain rate of img movement
    var imgTopY = imgParent.offsetTop; // The starting point of the image (Y-Axis)
    var parentHeight = imgParent.clientHeight; // The viewable height of the image container

    var winCurrentTopY = window.pageYOffset; // The current Y-Axis coord for the top of window
    var winHeight = window.screen.height; // The height of the device screen
    var winCurrentBottomY = winCurrentTopY + winHeight; // The current Y-Axis coord for the bottom of window

    // If block is shown on screen
    if (winCurrentBottomY > imgTopY && winCurrentTopY < imgTopY + parentHeight) {
      // Number of pixels shown after block appear
      var imgBottom = ((winCurrentBottomY - imgTopY) * speed);
      // Max number of pixels until block disappear
      var imgTop = winHeight + parentHeight;
      // Porcentage between start showing until disappearing
      var imgPercent = ((imgBottom / imgTop) * 100) + (50 - (speed * 50));
    }
    img.style.top = `${imgPercent}%`;
    img.style.transform = `translate(-50%, -${imgPercent}%)`;
  }
});
