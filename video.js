var video = document.createElement('video');
/* var video = document.getElementById('video'); */
video.setAttribute('playsinline', '');
video.setAttribute('autoplay', '');
video.setAttribute('muted', '');
video.style.width = '200px';
video.style.height = '200px';

/* Setting up the constraint */
var facingMode = "user"; // Can be 'user' or 'environment' to access back or front camera (NEAT!)
var constraints = {
  audio: false,
  video: {
   facingMode: facingMode
  }
};

/* Stream it to video element */
navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
  video.srcObject = stream;
});

var canvas = document.createElement("canvas");
canvas.style.width = '200px';
canvas.style.height = '200px';

var text = document.getElementById('text')

var snap = () => {
    var vw = video.videoWidth
    var vh = video.videoHeight
    var w = 200;
    var h = 200;
    if (vw > vh) {
        h = 200 * vh / vw;
    } else {
        w = 200 * vw / vh;
    }
//  canvas.getContext('2d').drawImage(video, 0, 0, w, h);
//  preview.getContext('2d').drawImage(canvas, 0, 0, 200, 200);
    preview.getContext('2d').drawImage(video, 0, 0, w, h);
//    text.innerHTML = `${vw}x${vh}, ${w}x${h}`;
//    text.innerHTML = 'test3';
//    console.log('here3')
    preview.toBlob((blob) => {
//      const url = URL.createObjectURL(blob);
//        text.innerHTML = 'test2';
//        console.log('here')
        blob.text().then((blobtext) => {
//            text.innerHTML = 'test';
//            console.log('here2');
//            console.log(blobtext);
        });
    });
}


document.getElementById('div1').appendChild(video);
