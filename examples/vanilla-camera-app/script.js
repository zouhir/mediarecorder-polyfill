(function() {
  let videoCameraElm = document.getElementById("camera");
  let recordButton = document.getElementById("record-btn");
  let recordingClassName = "record-stop-btn record";
  let stoppedClassName = "record-stop-btn stop";

  if (typeof window.Windows !== "undefined") {
    navigator.mediaDevices
      .getNativeUserMedia({ video: true, audio: true })
      .then(
        function(stream) {
          playStream(videoCameraElm, stream);
          var myMediaRecorder = new MediaRecorder(stream);
          window.myMediaRecorder = myMediaRecorder;
          console.log(mediaRecorder.state);
          mediaRecorder.start();
        },
        function(err) {
          console.log(err);
        }
      );
  } else {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function(stream) {
        playStream(videoCameraElm, stream);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  function playStream(vidElm, stream) {
    vidElm.src = URL.createObjectURL(stream);
    vidElm.play();
  }
})();
