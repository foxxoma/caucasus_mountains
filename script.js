const descriptionTextrea = document.getElementById('description_textrea');
const descriptionNameMountain = document.getElementById('description_name_mountain');
const nameMountain = document.getElementById('name_mountain');
const description = document.getElementById("description");
const descriptionMenu = document.getElementById("description_menu");
const video = document.getElementById('video');
const rangeCanvasAngle = document.getElementById('range_canvas_angle');
const settingContent = document.getElementById('settings_content');
const settingsIcon = document.getElementById('settings_icon');
const body = document.getElementById('window');
const rangeFontSize = document.getElementById('range_fontSize');
const rangeAngle = document.getElementById('range_angle');

let ctx = rangeCanvasAngle.getContext('2d');
let front = false;
let MDcheck = 0;
let MScheck = 0;
let viewingAngle = 10;
let MyPosition = {};
let lookMountain = false;
let distanceMountain;

StartCanvasRotateAngle(); //starting angle of view

//I get latitude and longitude
navigator.geolocation.getCurrentPosition(function(position) {
	MyPosition.lat = position.coords.latitude;
	MyPosition.lng = position.coords.longitude;
});

function throttle(callback, delay) {
	let params = null;
	let timeout = null;

	const invoke = () => {
		callback.apply(this, params);
		timeout = null;
	}

	return function() {
		params = arguments;

		if (!timeout) {
			timeout = setTimeout(invoke, delay);
		}
	}
}

// Get access to the camera!
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	var myConstraints = {
		video: {
			facingMode: (front ? "user" : "environment")
		}
	};
	// Not adding `{ audio: true }` since we only want video now
	navigator.mediaDevices.getUserMedia(myConstraints).then(function(stream) {
		//video.src = window.URL.createObjectURL(stream);
		video.srcObject = stream;
		video.play();
	});
}

//getting azimuth
if ('ondeviceorientationabsolute' in window) {
	window.ondeviceorientationabsolute = throttle((event) => {
		// Check how far the user has scrolled
		let cornerAz = 360 - event.alpha;
		angleComparison(cornerAz);
	}, 20);

} else if ('ondeviceorientation' in window) {
	window.ondeviceorientationabsolute = throttle((event) => {
		// Check how far the user has scrolled
		let cornerAz = 360 - event.alpha;
		angleComparison(cornerAz);
	}, 20);

} else {
	alert("error");
}

function angleComparison(az) {

	descriptionNameMountain.textContent = az;
	descriptionTextrea.textContent = az;
	nameMountain.textContent = az;

	for (let f = 0; f < MXYND.length; f++) {
		if (Math.abs(az - getAngle(MyPosition.lat, MyPosition.lng, MXYND[f].lat, MXYND[f].lng)) < viewingAngle) {
			if(lookMountain){
				if(distanceComparison(MyPosition.lat, MyPosition.lng, MXYND[f].lat, MXYND[f].lng) < distanceMountain){
					distanceMountain = distanceComparison(MyPosition.lat, MyPosition.lng, MXYND[f].lat, MXYND[f].lng);
					descriptionNameMountain.textContent = MXYND[f].name;
					descriptionTextrea.textContent = MXYND[f].description;
					nameMountain.textContent = MXYND[f].name;
				}
			}
			else{
				descriptionNameMountain.textContent = MXYND[f].name;
				descriptionTextrea.textContent = MXYND[f].description;
				nameMountain.textContent = MXYND[f].name;
				lookMountain = true;
				distanceMountain = distanceComparison(MyPosition.lat, MyPosition.lng, MXYND[f].lat, MXYND[f].lng);
			}	
		}
		else {
			lookMountain = false;
			distanceMountain = 0;
		}
	}
}

function distanceComparison(f1, l1, f2, l2){
	let a  = Math.pow(Math.sin((f2-f1)/2),2) + Math.cos(f1) * Math.cos(f2) * Math.pow(Math.sin((l2-l1)/2),2);
    let c  = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
	let d = 6371 * c;
	return d;
}

//checks what mountain i look at
function getAngle(f1, l1, f2, l2) {
	let azimuth;
	azimuth = Math.atan2((Math.sin(l2-l1) * Math.cos(f2)), (Math.cos(f1) * Math.sin(f2) - Math.sin(f1) * Math.cos(f2)  * Math.cos(l2-l1))) *  (180 / Math.PI);

	//degree check with upside down screen 
	if (window.orientation == 90 || window.orientation == -90) {
		azimuth = azimuth - 90;
		if (azimuth < 0) {
			azimuth = 360 - azimuth;
		}
	}

	return azimuth;

}

function StartCanvasRotateAngle() {
	let a = 5 * Math.PI / 180;
	let radrot = rangeCanvasAngle.height - (rangeCanvasAngle.height / 100) * 10;

	if (radrot * 2 > rangeCanvasAngle.width) {
		radrot = rangeCanvasAngle.width - (rangeCanvasAngle.width / 100) * 10;
	}

	let xCStart = rangeCanvasAngle.width / 2;
	let yCStart = rangeCanvasAngle.height;

	ctx.clearRect(0, 0, rangeCanvasAngle.width, rangeCanvasAngle.height);
	ctx.fillStyle = 'magenta';
	ctx.beginPath();
	ctx.moveTo(xCStart, yCStart);
	ctx.lineTo(xCStart - Math.sin(a) * radrot, yCStart - Math.cos(a) * radrot);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(xCStart, yCStart);
	ctx.lineTo(xCStart + Math.sin(a) * radrot, yCStart - Math.cos(a) * radrot);
	ctx.stroke();
}

rangeAngle.oninput = function() {
	viewingAngle = rangeAngle.value / 2;
	let a = rangeAngle.value / 2 * Math.PI / 180;
	let radrot = rangeCanvasAngle.height - (rangeCanvasAngle.height / 100) * 10;

	if (radrot * 2 > rangeCanvasAngle.width) {
		radrot = rangeCanvasAngle.width - (rangeCanvasAngle.width / 100) * 10;
	}

	let xCStart = rangeCanvasAngle.width / 2;
	let yCStart = rangeCanvasAngle.height;

	ctx.clearRect(0, 0, rangeCanvasAngle.width, rangeCanvasAngle.height);
	ctx.fillStyle = 'magenta';
	ctx.beginPath();
	ctx.moveTo(xCStart, yCStart);
	ctx.lineTo(xCStart - Math.sin(a) * radrot, yCStart - Math.cos(a) * radrot);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(xCStart, yCStart);
	ctx.lineTo(xCStart + Math.sin(a) * radrot, yCStart - Math.cos(a) * radrot);
	ctx.stroke();
}

rangeFontSize.oninput = function() {
	body.style.fontSize = rangeFontSize.value + 'px';
	descriptionTextrea.style.fontSize = rangeFontSize.value + 'px';
};



settingsIcon.addEventListener('click', function(e) {
	if (MScheck == 0) {
		settingContent.style.display = "block";
		MScheck = 1;
	} else {
		settingContent.style.display = "none";
		MScheck = 0;
	}
});

//open and close description
descriptionMenu.addEventListener('click', function(e) {
	if (MDcheck == 0) {
		description.style.display = "table";
		MDcheck = 1;
	} else {
		description.style.display = "none";
		MDcheck = 0;
	}
});