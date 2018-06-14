(function() {
  let videoCameraElm = document.getElementById("camera");

  let myMediaRecorder = null;
  let stream = null;
  if (typeof window.Windows !== "undefined") {
    /**
     * If On Edge && PWA \ UWP
     **/
    navigator.mediaDevices
      .getNativeUserMedia({ video: true, audio: true })
      .then(
        function(nativeStream) {
          stream = nativeStream;
          playStream(videoCameraElm, stream);
          myMediaRecorder = new MediaRecorder(stream);
          // button click has start & stop
          registerRecordBtnClick();
        },
        function(err) {
          console.log(err);
        }
      );
  } else {
    /**
     * If On
     * Chrome, FF
     **/
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function(stream) {
        playStream(videoCameraElm, stream);
        /**
         * Do the recording same as above!
         **/
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  function playStream(vidElm, stream) {
    vidElm.src = URL.createObjectURL(stream);
    vidElm.play();
  }
  function registerRecordBtnClick() {
    let recordingClassName = "record-stop-btn record";
    let stoppedClassName = "record-stop-btn stop";
    let recordButton = document.getElementById("record-btn");
    recordButton.addEventListener("click", function() {
      console.log("eee");
      if (myMediaRecorder === null) {
        return;
      }
      if (myMediaRecorder.state === "inactive") {
        // has to have callback
        myMediaRecorder.start();
        recordButton.className = recordingClassName;
      }
      if (myMediaRecorder.state === "recording") {
        // has to have callback
        myMediaRecorder.stop();
        recordButton.className = stoppedClassName;
      }
    });
  }
})();
