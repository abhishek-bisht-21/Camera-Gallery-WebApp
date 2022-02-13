let video = document.querySelector("video");



let constraints = {
	video : true,
	audio : true
}

navigator.mediaDevices.getUserMedia(constraints)
.then((stream) => {

})