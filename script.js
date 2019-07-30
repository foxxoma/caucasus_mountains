const video = document.getElementById('video');
const rangeFontSize = document.getElementById('range_fontSize');
const rangeAngle = document.getElementById('range_angle');

let ctx = settingEl.canvas.getContext('2d');

let front = false;
let descriptionClick = 0;
let settingClick = 0;
let viewingAngle = 10;

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
	let myConstraints = {
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
	}, 30);

} else if ('ondeviceorientation' in window) {
	window.ondeviceorientationabsolute = throttle((event) => {
		// Check how far the user has scrolled
		let cornerAz = 360 - event.alpha;
		angleComparison(cornerAz);
	}, 30);

} else {
	alert("error");
}

function angleComparison(az) {

	descriptionMountainEl.name.textContent = az;
	descriptionMountainEl.contentInDescription.textContent = az;
	descriptionMountainEl.nameInDescription.textContent = az;

	for (let f = 0; f < MXYND.length; f++) {
		if (Math.abs(az - getAngle(MyPosition.lat, MyPosition.lng, MXYND[f].lat, MXYND[f].lng)) < viewingAngle) {
			if (lookMountain) {
				if (distanceComparison(MyPosition.lat, MyPosition.lng, MXYND[f].lat, MXYND[f].lng) < distanceMountain) {
					distanceMountain = distanceComparison(MyPosition.lat, MyPosition.lng, MXYND[f].lat, MXYND[f].lng);
					descriptionMountainEl.name.textContent = MXYND[f].name;
					descriptionMountainEl.contentInDescription.textContent = MXYND[f].description;
					descriptionMountainEl.nameInDescription.textContent = MXYND[f].name;
				}
			} else {
					descriptionMountainEl.name.textContent = MXYND[f].name;
					descriptionMountainEl.contentInDescription.textContent = MXYND[f].description;
					descriptionMountainEl.nameInDescription.textContent = MXYND[f].name;
				lookMountain = true;
				distanceMountain = distanceComparison(MyPosition.lat, MyPosition.lng, MXYND[f].lat, MXYND[f].lng);
			}
		} else {
			lookMountain = false;
			distanceMountain = 0;
		}
	}
}

function distanceComparison(lat1, lng1, lat2, lng2) {

	let f1 = lat1 / 180 * Math.PI;
	let f2 = lat2 / 180 * Math.PI;
	let l1 = lng1 / 180 * Math.PI;
	let l2 = lng2 / 180 * Math.PI;

	let a = Math.pow(Math.sin((f2 - f1) / 2), 2) + Math.cos(f1) * Math.cos(f2) * Math.pow(Math.sin((l2 - l1) / 2), 2);
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	let d = 6371 * c;
	return d;
}

//checks what mountain i look at
function getAngle(lat1, lng1, lat2, lng2) {
	let azimuth;

	let f1 = lat1 / 180 * Math.PI;
	let f2 = lat2 / 180 * Math.PI;
	let l1 = lng1 / 180 * Math.PI;
	let l2 = lng2 / 180 * Math.PI;

	azimuth = (Math.atan2((Math.sin(l2 - l1) * Math.cos(f2)), (Math.cos(f1) * Math.sin(f2) - Math.sin(f1) * Math.cos(f2) * Math.cos(l2 - l1))));
	azimuth = azimuth / Math.PI * 180;

	if (azimuth < 0) {
		azimuth = 360 - azimuth;
	}

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
	let radrot = settingEl.canvas.height - (settingEl.canvas.height / 100) * 10;

	if (radrot * 2 > settingEl.canvas.width) {
		radrot = settingEl.canvas.width - (settingEl.canvas.width / 100) * 10;
	}

	let xCStart = settingEl.canvas.width / 2;
	let yCStart = settingEl.canvas.height;

	ctx.clearRect(0, 0, settingEl.canvas.width, settingEl.canvas.height);
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
	let radrot = settingEl.canvas.height - (settingEl.canvas.height / 100) * 10;

	if (radrot * 2 > settingEl.canvas.width) {
		radrot = settingEl.canvas.width - (settingEl.canvas.width / 100) * 10;
	}

	let xCStart = settingEl.canvas.width / 2;
	let yCStart = settingEl.canvas.height;

	ctx.clearRect(0, 0, settingEl.canvas.width, settingEl.canvas.height);
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
	settingEl.body.style.fontSize = rangeFontSize.value + 'px';
	descriptionMountainEl.contentInDescription.style.fontSize = rangeFontSize.value + 'px';
};

settingEl.icon.addEventListener('click', function(e) {
	if (settingClick  == 0) {
		settingEl.interfase.style.display = "block";
		settingClick  = 1;
	} else {
		settingEl.interfase.style.display = "none";
		settingClick  = 0;
	}
});

//open and close description
descriptionMountainEl.icon.addEventListener('click', function(e) {
	if (descriptionClick == 0) {
		descriptionMountainEl.description.style.display = "table";
		descriptionClick = 1;
	} else {
		descriptionMountainEl.description.style.display = "none";
		descriptionClick = 0;
	}
});