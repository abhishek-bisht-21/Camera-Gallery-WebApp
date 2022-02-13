let video = document.querySelector("video");
let recordBtnCont = document.querySelector(".record-btn-cont");
let recordBtn = document.querySelector(".record-btn");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let caotureBtn = document.querySelector(".capture-btn");

let recordFlag = false;
let recorder;
let chunks  = []; // Media Data in Chucks


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

	// Task to perfrom when we are starting recording
	recorder.addEventListener("start", (e) => {
		// We want to record multiple times. Therefore we have to empty
		// our chunks array time and again.
		chunks = [];
	})

	// Download the Stream
	recorder.addEventListener("dataavailable", (e) => {
		chunks.push(e.data);
	})

	// Task to perform when we are stopping recording
	recorder.addEventListener("stop", (e) =>{
		// Conversion of Media chunks data to Video
		let blob = new Blob(chunks, {type:"video/mp4"});
		let videoURL = URL.createObjectURL(blob);

		let a  = document.createElement("a");
		a.href = videoURL;
		a.download = "stream.mp4";
		a.click();
	})
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