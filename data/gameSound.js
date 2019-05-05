window.sounds={
    "background": new Audio("sound/background.mp3"),
    "selected": new Audio("sound/selected.wav"),
    "error": new Audio("sound/error.wav"),
    "failed": new Audio("sound/failed.mp3"),
    "win": new Audio("sound/win.mp3")
}

/* make the background sound loop all the time, it will add a event listenner 
to this sound, it will replay when it ends
URL:https://stackoverflow.com/questions/3273552/html5-audio-looping*/
sounds.background.addEventListener(
    "ended",
    function() {
      this.currentTime = 0;
      this.play();
    },
    false
  );