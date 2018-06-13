import getNativeUserMedia from "./getNativeUserMedia";
import MediaRecorder from "./mediarecorder";

if (typeof window.Windows !== "undefined") {
  navigator.mediaDevices.getNativeUserMedia = getNativeUserMedia;
  window.MediaRecorder = MediaRecorder;
}
