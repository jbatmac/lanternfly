const size = 128;

var video = document.getElementById('video');
video.setAttribute('playsinline', '');
video.setAttribute('autoplay', '');
video.setAttribute('muted', '');
video.style.width = `${size}px`;
video.style.height = `${size}px`;

var snap = () => {
}

var facingMode = "user"; // Can be 'user' or 'environment' to access back or front camera

var getUserMedia = (direction) => {
    var constraints = {
      audio: false,
      video: {
       facingMode: direction
      }
    };
    
    navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
        video.srcObject = stream;
      });
}
getUserMedia(facingMode);

var toggle = () => {
    if (facingMode == 'user') {
        facingMode = 'environment';
    } else {
        facingMode = 'user';
    }
    getUserMedia(facingMode);
}

var text = document.getElementById('text')

var interval = setInterval(function() {
    if (typeof cv !== 'undefined' && typeof cv.Mat !== 'undefined') {
        clearInterval(interval);  // Stop checking once it's available
        let src = new cv.Mat(size, size, cv.CV_8UC4);
        snap = () => {
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
            previewContext = preview.getContext('2d');
            previewContext.drawImage(video, xoff, yoff, w, h);

            src.data.set(previewContext.getImageData(0, 0, size, size).data);
            brightnessSum = 0;
            for (let i = 0; i < size; i++) {
                for (let j = 0 ; j < size ; j++) {
                    blue = src.data[i * size * 4 + j * 4];
                    green = src.data[i * size * 4 + j * 4 + 1];
                    red = src.data[i * size * 4 + j * 4 + 2];
                    brightness = (blue + green + red) / 3;
                    brightnessSum += brightness;
                }
            }
            text.innerHTML = `average brightness: ${brightnessSum / size / size}`
            // preview.toBlob((blob) => {
            //     blob.text().then((blobtext) => {
            //     });
            // });
            video.requestVideoFrameCallback(snap)
        }
        snap()
    }
}, 100);
