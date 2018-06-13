// Media recorder states
// https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/state
const STATES = {
  inactive: "inactive",
  recording: "recording",
  paused: "paused"
};

function MediaRecorder(stream, options) {
  this.nativeMediaStream = stream;
  this.state = STATES.inactive;
}

MediaRecorder.prototype._getStorageFile = function() {
  let captureFolder = null;
  let storageLibrary = Windows.Storage.StorageLibrary.getLibraryAsync;
  let knownPictureLibrary = Windows.Storage.KnownLibraryId.pictures;
  return storageLibrary
    .getLibraryAsync(knownPictureLibrary)
    .then(pictureLibrary => {
      captureFolder =
        pictureLibrary.saveFolder ||
        Windows.Storage.ApplicationData.current.localFolder;
      return captureFolder.createFileAsync(
        "PWAVideo.mp4",
        Windows.Storage.CreationCollisionOption.generateUniqueName
      );
    });
};

MediaRecorder.prototype.start = function() {
  this._getStorageFile().then(file => {
    let encodingProfile = Windows.Media.MediaProperties.MediaEncodingProfile.createMp4(
      Windows.Media.MediaProperties.VideoEncodingQuality.auto
    );
    // @TODO: catch promise errors
    this.nativeMediaStream
      .startRecordToStorageFileAsync(encodingProfile, file)
      .then(() => {
        this.state = STATES.recording;
      });
  });
};

MediaRecorder.prototype.stop = function() {
  this.nativeMediaStream.stopRecordAsync().then(() => {
    this.state = STATES.inactive;
  });
};

MediaRecorder.prototype.pause = function() {
  this.nativeMediaStream.pauseRecordAsync().then(() => {
    this.state = STATES.paused;
  });
};

MediaRecorder.prototype.resume = function() {
  this.nativeMediaStream.resumeRecordAsync().then(() => {
    this.state = STATES.recording;
  });
};

export default MediaRecorder;
