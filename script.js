let video = document.querySelector("video");
let recordBtnCont = document.querySelector(".record-btn-cont");
let recordBtn = document.querySelector(".record-btn");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let caotureBtn = document.querySelector(".capture-btn");

let recordFlag = false;
let recorder;


let constraints = {
	video : true,
	audio : true
}

// navigator-> global Object(Tells Browser Info)
// mediaDevices -> helps us to connect to our hardware. (Interface)
navigator.mediaDevices.getUserMedia(constraints)
.then((stream) => {
	video.srcObject = stream;

	// API to record. What to record -> Stream
	recorder = new MediaRecorder(stream);
})


recordBtnCont.addEventListener("click", (e) => {
	if(!recorder) return;

	recordFlag = !recordFlag;
	
	if(recordFlag){
		//start
		recorder.start();
		recordBtn.classList.add("scale-record");
	}else{
		//stop
		recorder.stop();
		recordBtn.classList.remove("scale-record");
	}

})