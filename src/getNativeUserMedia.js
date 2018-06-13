/**
 * Find us the webcam or the input device information used to capture the video
 * @param {Windows.Devices.Enumeration.Panel} panel - where the camera is located,
 *  7 options allowed for camera location, readmore:
 *  https://docs.microsoft.com/en-us/uwp/api/Windows.Devices.Enumeration.Panel
 *
 *  @returns a promoise with null or input device
 */
function _findCameraDeviceByPanelAsync(panel) {
  let myDeviceInfo = null;
  let deviceInformationCls = Windows.Devices.Enumeration.DeviceInformation;
  let devicesEnum = Windows.Devices.Enumeration.DeviceClass;

  // Get available devices for capturing video & pictures
  return deviceInformationCls
    .findAllAsync(devicesEnum.videoCapture)
    .then(devices => {
      devices.forEach(cameraDeviceInfo => {
        if (
          cameraDeviceInfo.enclosureLocation != null &&
          cameraDeviceInfo.enclosureLocation.panel === panel
        ) {
          myDeviceInfo = cameraDeviceInfo;
          console.log("[STATUS]", "Found a camera device: ", myDeviceInfo);
          return myDeviceInfo;
        }
      });
      // Nothing matched, just return the first
      if (!myDeviceInfo && devices.length > 0) {
        myDeviceInfo = devices.getAt(0);
      }
      console.log("[STATUS]", "fallback to camera: " + myDeviceInfo.name);
      return deviceInfo;
    });
}

/**
 * getNativeUserMedia
 * @param {object} options
 * - audi: boolean
 * - video: boolean
 * - mimeType: string
 *   @TODO: implement the options
 *
 * returns nativeStream
 */
function getNativeUserMedia(/* ignored for now */ options) {
  let panel = Windows.Devices.Enumeration.Panel.back;
  _findCameraDeviceByPanelAsync(panel)
    .then(panel)
    .then(myDeviceInfo => {
      let captureModes = Windows.Media.Capture.StreamingCaptureMode;
      let _mediaCapture = new Windows.Media.Capture.MediaCapture();

      _mediaCapture.addEventListener("recordlimitationexceeded", () => {
        console.error("[ERROR]", "Record limit exceeded");
      });

      _mediaCapture.addEventListener("failed", () => {
        console.error("[ERROR]", "failed to record");
      });

      let settings = new Windows.Media.Capture.MediaCaptureInitializationSettings();
      settings.videoDeviceId = myDeviceInfo.id;
      settings.streamingCaptureMode = captureModes.audioAndVideo;

      return new Promise((resolve, reject) => {
        return _mediaCapture
          .initializeAsync(settings)
          .then(() => {
            return resolve(_mediaCapture);
          })
          .catch(err => reject(err));
      });
    });
}

export default getNativeUserMedia;
