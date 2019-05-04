const canv = document.getElementById('canvas'),
north = canv.getContext('2d');


canv.width = window.innerWidth;
canv.height = window.innerHeight;


const x = canv.width / 2, 
y = canv.height * (85 / 100);




function compassHeading(alpha, beta, gamma) {

  // Convert degrees to radians
  var alphaRad = alpha * (Math.PI / 180);
  var betaRad = beta * (Math.PI / 180);
  var gammaRad = gamma * (Math.PI / 180);

  // Calculate equation components
  var cA = Math.cos(alphaRad);
  var sA = Math.sin(alphaRad);
  var cB = Math.cos(betaRad);
  var sB = Math.sin(betaRad);
  var cG = Math.cos(gammaRad);
  var sG = Math.sin(gammaRad);

  // Calculate A, B, C rotation components
  var rA = - cA * sG - sA * sB * cG;
  var rB = - sA * sG + cA * sB * cG;
  var rC = - cB * cG;

  // Calculate compass heading
  var compassHeading = Math.atan(rA / rB);

  // Convert from half unit circle to whole unit circle
  if(rB < 0) {
    compassHeading += Math.PI;
  }else if(rA < 0) {
    compassHeading += 2 * Math.PI;
  }

  // Convert radians to degrees
  compassHeading *= 180 / Math.PI;

  return compassHeading;

}

window.addEventListener('deviceorientation', function(evt) {

  var heading = null;

  if(evt.absolute === true && evt.alpha !== null) {
    heading = compassHeading(evt.alpha, evt.beta, evt.gamma);
  }

  // Do something with 'heading'...
  		let a = (-1 * heading ) * (Math.PI/180);
  		north.beginPath();
		north.strokeStyle = '#0000ff';
		north.moveTo(x, y);
		north.lineTo(x - Math.sin(a)*60, y - Math.cos(a)*60);
		north.stroke();

		north.beginPath();
		north.fillStyle = '#0000ff'	
		north.arc(x - Math.sin(a)*60, y - Math.cos(a)*60, 5, 0, Math.PI *2);
		north.fill();

}, false);
