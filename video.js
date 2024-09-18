const size = 128;

var video = document.createElement('video');
/* var video = document.getElementById('video'); */
video.setAttribute('playsinline', '');
video.setAttribute('autoplay', '');
video.setAttribute('muted', '');
video.style.width = `${size}px`;
video.style.height = `${size}px`;

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
canvas.style.width = `${size}px`;
canvas.style.height = `${size}px`;

var text = document.getElementById('text')

var snap = () => {
    var ctx = preview.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, size, size);

    var vw = video.videoWidth
    var vh = video.videoHeight
    var w = size;
    var h = size;
    var xoff = 0;
    var yoff = 0;
    if (vw > vh) {
        h = size * vh / vw;
        yoff = (size - h) / 2;
    } else {
        w = size * vw / vh;
        xoff = (size - w) / 2;
    }
    preview.getContext('2d').drawImage(video, xoff, yoff, w, h);
    preview.toBlob((blob) => {
        blob.text().then((blobtext) => {
        });
    });
}


document.getElementById('div1').appendChild(video);
