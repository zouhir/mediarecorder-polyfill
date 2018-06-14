# MediaRecoder API Edge PWAs Polyfill

<h5 align="center">Demo of The Vanilla JavaScript Camera App Example Recorderd in Edge</h5>

<p align="center">
  <img src="https://raw.githubusercontent.com/zouhir/mediarecorder-polyfill/master/.github/demo1.PNG" width="80%">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/zouhir/mediarecorder-polyfill/master/.github/demo2.PNG" width="80%">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/zouhir/mediarecorder-polyfill/master/.github/demo3.PNG" width="80%">
</p>

## The Problem

Since FireFox and Chrome has already shipped [MediaStream Recording API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API), developers tend to direct people to native apps in iOS \ iPad case or use flash, in Edge on Windows 10 case.

## The Solution Idea

Instead of writing a native Windows app that allows captruing the media stream through the paltform's native libraries, adding the website to the Microsoft apps store as a PWA (Progressive Web Apps) will give the web app's JavaScript code an access to a big amount of Windows Runtime APIs, which what this solution is based on, you can learn more about other available namespaces on [here](https://docs.microsoft.com/en-us/uwp/api/).

```
FAQ: Do I need ServiceWorker or other progressive app features to get WinRT APIs?
Answer: No, just have icons for the store.
```

## About This Solution

This is a 900bytes JavaScript polyfill that provides you an access to MediaCapture Windows Runtime namespace and uses it to create MediaRecorder constructor function that matches in behaviour and methods the Web Standard one. so you shouldn't need to change much in your JavaScript code to get MediaRecording out of the box in your Web App running in Edge as a PWA.

## Differences from standard web implementation

#### getNativeUserMedia method

The web standard one is

```
navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(function(stream) {
        // now you have a stream, set it to video source, play the video or record it
    })
```

The method in this polyfill is called _getNativeUserMedia_

```
navigator.mediaDevices
    .getNativeUserMedia({ video: true, audio: false })
    .then(function(stream) {
        // now you have a stream, set it to video source, play the video or record it
        // whatever you to the previous stream, you can do to this one
        // example: videoElement.src = URL.createObjectURL(stream) will work like magic!
    })
```

## API (existing & on the TODO list):

#### Navigator.getNativeUserMedia

- [x] returns promise with stream

- [ ] accepts mimeType option

- [ ] accepts video option

- [ ] accepts audio option

#### Media Recorder: Methods

- [x] mediaRecorder.play()

- [x] mediaRecorder.pause()

- [x] mediaRecorder.resume()

- [x] mediaRecorder.stop()

#### Media Recorder: properties

- [x] mediaRecorder.state

- [ ] mediaRecorder.onplay

- [ ] mediaRecorder.onstop

- [ ] mediaRecorder.onresume

- [ ] mediaRecorder.onpause

- [ ] mediaRecorder.onerror

- [ ] mediaRecorder.onwarning

#### Media Recorder: events

- [ ] start

- [ ] stop

- [ ] dataavailable

- [ ] pause

- [ ] resume

- [ ] error
