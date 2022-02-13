let video = document.querySelector("video");



let constraints = {
	video : true,
	audio : true
}

// navigator-> global Object(Tells Browser Info)
// mediaDevices -> helps us to connect to our hardware. (Interface)
navigator.mediaDevices.getUserMedia(constraints)
.then((stream) => {
	video.srcObject = stream;
})