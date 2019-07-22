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
let MeLat;
let MeLng;

StartCanvasRotateAngle(); //starting angle of view

//I get latitude and longitude
navigator.geolocation.getCurrentPosition(function(position) {
	MeLat = position.coords.latitude;
	MeLng = position.coords.longitude;
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
		cornerAz = cornerAz.toFixed(0);
		angleComparison(cornerAz);
	}, 20);

} else if ('ondeviceorientation' in window) {
	window.ondeviceorientationabsolute = throttle((event) => {
		// Check how far the user has scrolled
		let cornerAz = 360 - event.alpha;
		cornerAz = cornerAz.toFixed(0);
		angleComparison(cornerAz);
	}, 20);

} else {
	alert("error");
}

function angleComparison(az) {
	for (let f = 0; f < MXYND.length; f++) {
		if (Math.abs(az - getAngle(MXYND[f].lat, MXYND[f].lng, MeLat, MeLng)) < viewingAngle) {
			descriptionNameMountain.textContent = MXYND[f].name;
			descriptionTextrea.textContent = MXYND[f].description;
			nameMountain.textContent = MXYND[f].name;
		}
	}
}

//checks what mountain i look at
function getAngle(yM, xM, y, x) {
	let corner1, corner2;
	let aMe, bMe, cMe;
	bMe = x;
	cMe = 90 - y;
	aMe = Math.sqrt(Math.pow(bMe, 2) + Math.pow(cMe, 2));
	corner1 = Math.acos((Math.pow(aMe, 2) + Math.pow(cMe, 2) - Math.pow(bMe, 2)) / (2 * aMe * cMe)) * (180 / Math.PI);

	let aM, bM, cM;
	let s;

	if (yM > y && xM > x) {

		aM = yM - y;
		bM = xM - x;
		cM = Math.sqrt(Math.pow(bM, 2) + Math.pow(aM, 2));
		corner2 = Math.acos((Math.pow(aM, 2) + Math.pow(cM, 2) - Math.pow(bM, 2)) / (2 * aM * cM)) * (180 / Math.PI);

		s = corner1 + corner2;

	} else if (yM < y && xM > x) {


		bM = y - yM;
		aM = xM - x;
		cM = Math.sqrt(Math.pow(bM, 2) + Math.pow(aM, 2));
		corner2 = Math.acos((Math.pow(aM, 2) + Math.pow(cM, 2) - Math.pow(bM, 2)) / (2 * aM * cM)) * (180 / Math.PI);

		s = corner1 + 90 + corner2;

	} else if (yM < y && xM < x) {


		aM = y - yM;
		bM = x - xM;
		cM = Math.sqrt(Math.pow(bM, 2) + Math.pow(aM, 2));
		corner2 = Math.acos((Math.pow(aM, 2) + Math.pow(cM, 2) - Math.pow(bM, 2)) / (2 * aM * cM)) * (180 / Math.PI);

		s = corner1 + 90 + 90 + corner2;

	} else if (yM > y && xM < x) {


		bM = yM - y;
		aM = x - xM;
		cM = Math.sqrt(Math.pow(bM, 2) + Math.pow(aM, 2));
		corner2 = Math.acos((Math.pow(aM, 2) + Math.pow(cM, 2) - Math.pow(bM, 2)) / (2 * aM * cM)) * (180 / Math.PI);

		s = corner1 + 90 + 90 + 90 + corner2;

		if (s > 360) {
			s = s - 360;
		}
	}

	//degree check with upside down screen 
	if (window.orientation == 90 || window.orientation == -90) {
		s = s - 90;
		if (s < 0) {
			s = 360 - s;
		}
	}

	s = s.toFixed(0);
	return s;

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