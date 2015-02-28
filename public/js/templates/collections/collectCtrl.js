var app = angular.module('gather');

app.controller('collectCtrl', function ($scope, mainService, populateCollection, $route) {

$scope.title = $route.current.params.id;

$scope.populateCollection = populateCollection.data;
console.log($scope.populateCollection);
console.log($scope.populateCollection.tags);


window.onload = function() {

  // Video
  var video = document.getElementById("video");

  // Buttons
  var playButton = document.getElementById("play-pause");
  var muteButton = document.getElementById("mute");
  var fullScreenButton = document.getElementById("full-screen");

  // Event listener for the play/pause button
  
playButton.addEventListener("click", function() {
  if (video.paused == true) {
    // Play the video
    video.play();

    // Update the button text to 'Pause'
    playButton.innerHTML = "Pause";
  } else {
    // Pause the video
    video.pause();

    // Update the button text to 'Play'
    playButton.innerHTML = "Play";
  }
});

// Event listener for the full-screen button
fullScreenButton.addEventListener("click", function() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen(); // Firefox
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen(); // Chrome and Safari
  }
});

  // Sliders
  // var seekBar = document.getElementById("seek-bar");
  // var volumeBar = document.getElementById("volume-bar");

}

});