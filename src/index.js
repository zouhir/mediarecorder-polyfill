import getNativeUserMedia from "./getNativeUserMedia";
import MediaRecorder from "./mediarecorder";

if (
  document.documentMode ||
  (/Edge/.test(navigator.userAgent) && typeof window.Windows !== "undefined")
) {
  window.navigator.getNativeUserMedia = getNativeUserMedia;
  window.MediaRecorder = MediaRecorder;
}
