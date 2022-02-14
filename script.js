let video = document.querySelector("video");
let recordBtnCont = document.querySelector(".record-btn-cont");
let recordBtn = document.querySelector(".record-btn");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let caotureBtn = document.querySelector(".capture-btn");
let transparentColor = "transparent";

let recordFlag = false;
let recorder;
let chunks = []; // Media Data in Chucks

let constraints = {
  video: true,
  audio: true,
};

// navigator-> global Object(Tells Browser Info)
// mediaDevices -> helps us to connect to our hardware. (Interface)
navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
  video.srcObject = stream;

  // API to record. What to record -> Stream
  recorder = new MediaRecorder(stream);

  // Task to perfrom when we are starting recording
  recorder.addEventListener("start", (e) => {
    // We want to record multiple times. Therefore we have to empty
    // our chunks array time and again.
    chunks = [];
  });

  // Download the Stream
  recorder.addEventListener("dataavailable", (e) => {
    chunks.push(e.data);
  });

  // Task to perform when we are stopping recording
  recorder.addEventListener("stop", (e) => {
    // Conversion of Media chunks data to Video
    let blob = new Blob(chunks, { type: "video/mp4" });
    let videoURL = URL.createObjectURL(blob);

    if(db){
       let videoID  = shortId();
       let dbTransaction = db.transaction("image", "readwrite");
       let videoStore = dbTransaction.objectStore("video");
       let videoEntry = {
         id:videoID,
         blobData : blob
       }
       videoStore.add(videoEntry);
    }

    // let a = document.createElement("a");
    // a.href = videoURL;
    // a.download = "stream.mp4";
    // a.click();
  });
});

recordBtnCont.addEventListener("click", (e) => {
  if (!recorder) return;

  recordFlag = !recordFlag;

  if (recordFlag) {
    //start
    recorder.start();
    recordBtn.classList.add("scale-record");
    startTimer();
  } else {
    //stop
    recorder.stop();
    recordBtn.classList.remove("scale-record");
    stopTimer();
  }
});


captureBtnCont.addEventListener("click", (e) => {
	let canvas = document.createElement("canvas");
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;

	let tool = canvas.getContext("2d");
	tool.drawImage(video,0,0,canvas.width,canvas.height);

	// Filtering 
 	tool.fillStyle = transparentColor;
  	tool.fillRect(0, 0, canvas.width, canvas.height);

	let imageURL = canvas.toDataURL();

	let a = document.createElement("a");
   	a.href = imageURL;
    	a.download = "image.jpg";
    	a.click();
})

let timerID;
let counter = 0; // Represents Total Seconds
let timer = document.querySelector(".timer");
function startTimer() {
  timer.style.display = "block";
  function displayTimer() {
    let totalSeconds = counter;

    let hours = Number.parseInt(totalSeconds / 3600);
    totalSeconds = totalSeconds % 3600; // remaining value

    let minutes = Number.parseInt(totalSeconds / 60);
    totalSeconds = totalSeconds % 60; // remaining value

    let seconds = totalSeconds;

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    timer.innerText = `${hours}:${minutes}:${seconds}`;

    counter++;
  }
  timerID = setInterval(displayTimer, 1000);
}

function stopTimer() {
  clearInterval(timerID);
  timer.innerText = "00:00:00";
  timer.style.display = "none";
}


// Filtering Logic
let filterLayer = document.querySelector(".filter-layer");
let allFilters = document.querySelectorAll(".filter");
allFilters.forEach((filterElem) => {
    filterElem.addEventListener("click", (e) => {
        // Get style
        transparentColor = getComputedStyle(filterElem).getPropertyValue("background-color");
	      // Set style
        filterLayer.style.backgroundColor = transparentColor;
    })
})