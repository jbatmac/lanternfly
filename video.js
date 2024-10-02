const size = 256;

var video = document.getElementById('video');
video.setAttribute('playsinline', '');
video.setAttribute('autoplay', '');
video.setAttribute('muted', '');
video.style.width = `${size}px`;
video.style.height = `${size}px`;
var preview = document.getElementById('preview');
preview.setAttribute('width', `${size}`);
preview.setAttribute('height', `${size}`);
preview.style.width = `${size}px`;
preview.style.height = `${size}px`;

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
var src

var interval = setInterval(function() {
    if (typeof cv !== 'undefined' && typeof cv.Mat !== 'undefined' && typeof axios !== 'undefined') {
        clearInterval(interval);  // Stop checking once it's available
        src = new cv.Mat(size, size, cv.CV_8UC4);
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
            previewContext.drawImage(video, 0, 0, vw, vh, xoff, yoff, w, h);
            dataURL = preview.toDataURL();
            encodedString = dataURL.toString().replace(/^data:(.*,)?/, '');
            
            // text.innerHTML = encodedString;
            // Create a JSON object                                                                                                                                                                                                                                     
            const imageJson = {
                image_name: "liveImage.png",
                image_data: encodedString
            };

            // Convert JSON object to string                                                                                                                                                                                                                            
            const jsonString = JSON.stringify(imageJson);

            const url = 'https://azuremlwesteur-htudl.westeurope.inference.ml.azure.com/score';
            // text.innerHTML = apiKey.value

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey.value}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, Origin, X-Requested-With",
            };

            axios.post(url, jsonString, { headers: headers })
                .then(response => {
                    console.log(response.data);
                    text.innerHTML = response.data
                })
                .catch(error => {
                    console.error('failed:', error)
                });
            setTimeout(snap, 1000);  // call back in 1 second
        }
        snap()
    }
}, 100);
