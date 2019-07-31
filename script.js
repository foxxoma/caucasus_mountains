const video = document.getElementById('video');

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
	MyPosition.lat = position.coords.latitude / 180 * Math.PI;
	MyPosition.lng = position.coords.longitude / 180 * Math.PI;
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
	//Compare azimuth to mountain and current azimuth.
	descriptionMountainEl.name.textContent = '_____';
	descriptionMountainEl.contentInDescription.textContent = '_____';
	descriptionMountainEl.nameInDescription.textContent = '_____';

	for (let f = 0; f < dataMountains.length; f++) {
		if (Math.abs(az - getAzimuthToMountain(MyPosition.lat, MyPosition.lng, dataMountains[f].lat, dataMountains[f].lng)) < viewingAngle) {
			if (lookMountain) {
				if (distanceComparison(MyPosition.lat, MyPosition.lng, dataMountains[f].lat, dataMountains[f].lng) < distanceMountain) {
					distanceMountain = distanceComparison(MyPosition.lat, MyPosition.lng, dataMountains[f].lat, dataMountains[f].lng);
					descriptionMountainEl.name.textContent = dataMountains[f].name;
					descriptionMountainEl.contentInDescription.textContent = dataMountains[f].description;
					descriptionMountainEl.nameInDescription.textContent = dataMountains[f].name;
				}
			} else {
				descriptionMountainEl.name.textContent = dataMountains[f].name;
				descriptionMountainEl.contentInDescription.textContent = dataMountains[f].description;
				descriptionMountainEl.nameInDescription.textContent = dataMountains[f].name;
				lookMountain = true;
				distanceMountain = distanceComparison(MyPosition.lat, MyPosition.lng, dataMountains[f].lat, dataMountains[f].lng);
			}
		} else {
			lookMountain = false;
			distanceMountain = 0;
		}
	}
}

function distanceComparison(f1, l1, lat2, lng2) {

	let f2 = lat2 / 180 * Math.PI;
	let l2 = lng2 / 180 * Math.PI;

	let a = Math.pow(Math.sin((f2 - f1) / 2), 2) + Math.cos(f1) * Math.cos(f2) * Math.pow(Math.sin((l2 - l1) / 2), 2);
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	let d = 6371 * c;
	return d;
}

//checks what mountain i look at
function getAzimuthToMountain(f1, l1, lat2, lng2) {
	let azimuth;

	let f2 = lat2 / 180 * Math.PI;
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

settingEl.range.angle.oninput = function(e) {
	viewingAngle = e.target.value / 2;
	let a = e.target.value / 2 * Math.PI / 180;
	let radrot = settingEl.canvas.height - (settingEl.canvas.height / 100) * 10;

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

settingEl.range.fontSize.oninput = function(e) {
	settingEl.body.style.fontSize = e.target.value + 'px';
	descriptionMountainEl.contentInDescription.style.fontSize = e.target.value + 'px';
};

settingEl.icon.addEventListener('click', function(e) {
	if (settingClick == 0) {
		settingEl.interfase.style.display = "block";
		settingClick = 1;
	} else {
		settingEl.interfase.style.display = "none";
		settingClick = 0;
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