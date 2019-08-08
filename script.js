const video = document.getElementById('video');
const ctx = settingEl.canvas.getContext('2d');
const error = document.getElementById('error');
let front = false;
let descriptionClick = 0;
let settingClick = 0;
let viewingAngle = 10;
StartCanvasRotateAngle(); //starting angle of view
//I get latitude and longitude
navigator.geolocation.getCurrentPosition(function(position) {
	MyPosition.lat = position.coords.latitude;
	MyPosition.lng = position.coords.longitude;
	error.style.display = "none";
}, function(error) {
	if (error.PERMISSION_DENIED) {
		//alert("Browser doesn't support geolocation");
		error.style.display = "block";
	}
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
	navigator.mediaDevices.getUserMedia(myConstraints)
	.then(function(stream) {
		//video.src = window.URL.createObjectURL(stream);
		video.srcObject = stream;
		video.play();
		error.style.display = "none";
	})
	.catch(function(err) {
  	//alert('vidio error');
  	error.style.display = "block";
	});
}
//getting azimuth
if ('ondeviceorientationabsolute' in window) {
	window.ondeviceorientationabsolute = throttle((event) => {
		// Check how far the user has scrolled
		let cornerAz = 360 - event.alpha;
		mountainInFrontOfMe(cornerAz);
		error.style.display = "none";
	}, 30);
} else if ('ondeviceorientation' in window) {
	window.ondeviceorientationabsolute = throttle((event) => {
		// Check how far the user has scrolled
		let cornerAz = 360 - event.alpha;
		mountainInFrontOfMe(cornerAz);
		error.style.display = "none";
	}, 30);

} else {
	//alert("Browser doesn't support device orientation");
	error.style.display = "block";
}

function mountainInFrontOfMe(az) {
	//Compare azimuth to mountain and current azimuth.
	let distanceMountain;
	let finalMountain;
	for (let dataMountain of dataMountains) {
		if (Math.abs(az - getAngleBetweenObjects(MyPosition, dataMountain)) < viewingAngle) {
			if (distanceMountain) {
				if (getDistanceBetweenObjectsn(MyPosition, dataMountain) < distanceMountain) {
					distanceMountain = getDistanceBetweenObjectsn(MyPosition, dataMountain);
					finalMountain = dataMountain;
				}
			} else {
				finalMountain = dataMountain;
				distanceMountain = getDistanceBetweenObjectsn(MyPosition, dataMountain);
			}
		}
	}
	displayInformationAboutMountain(finalMountain);
}

function displayInformationAboutMountain(dataMountain) {
	if (dataMountain) {
		descriptionMountainEl.name.textContent = dataMountain.name;
		descriptionMountainEl.contentInDescription.textContent = dataMountain.description;
		descriptionMountainEl.nameInDescription.textContent = dataMountain.name;
	} else {
		descriptionMountainEl.name.textContent = '_____';
		descriptionMountainEl.contentInDescription.textContent = '_____';
		descriptionMountainEl.nameInDescription.textContent = '_____';
	}
}

function getDistanceBetweenObjectsn(myPosition, mountainPosition) {
	const f1 = myPosition.lat / 180 * Math.PI;
	const l1 = myPosition.lng / 180 * Math.PI;
	const f2 = mountainPosition.lat / 180 * Math.PI;
	const l2 = mountainPosition.lng / 180 * Math.PI;

	const a = Math.pow(Math.sin((f2 - f1) / 2), 2) + Math.cos(f1) * Math.cos(f2) * Math.pow(Math.sin((l2 - l1) / 2), 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = 6371 * c; //equator 6371
	return d;
}
//checks what mountain i look at
function getAngleBetweenObjects(myPosition, mountainPosition) {
	let angle;

	const f1 = myPosition.lat / 180 * Math.PI;
	const l1 = myPosition.lng / 180 * Math.PI;
	const f2 = mountainPosition.lat / 180 * Math.PI;
	const l2 = mountainPosition.lng / 180 * Math.PI;

	angle = Math.atan2((Math.sin(l2 - l1) * Math.cos(f2)), (Math.cos(f1) * Math.sin(f2) - Math.sin(f1) * Math.cos(f2) * Math.cos(l2 - l1)));
	angle = angle / Math.PI * 180;

	angle = ((angle + 360) % 360);

	//degree check with upside down screen 
	if (window.orientation == 90 || window.orientation == -90) {
		angle = angle - 90;
		if (angle < 0) {
			angle = 360 - angle;
		}
	}
	return angle;
}

function StartCanvasRotateAngle() {
	const a = 5 * Math.PI / 180;
	let radrot = settingEl.canvas.height - (settingEl.canvas.height / 100) * 10;

	const xCStart = settingEl.canvas.width / 2;
	const yCStart = settingEl.canvas.height;

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
	const a = e.target.value / 2 * Math.PI / 180;
	let radrot = settingEl.canvas.height - (settingEl.canvas.height / 100) * 10;

	const xCStart = settingEl.canvas.width / 2;
	const yCStart = settingEl.canvas.height;

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