const canv = document.getElementById('canvas'),
north = canv.getContext('2d');


canv.width = window.innerWidth;
canv.height = window.innerHeight;


const x = canv.width / 2, 
y = canv.height * (85 / 100);



// arrowN

north.beginPath();
north.strokeStyle = '#0000ff';
north.moveTo(x, y);
north.lineTo(x, y - 60);
north.stroke();


let rotateDegrees = 60;

rotateArrow();


const P = document.getElementById('p');
if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function(event) { 
    	
        rotateDegrees = event.alpha; 
       	P.textContent = rotateDegrees;
  		rotateArrow(rotateDegrees);
    });
}



function rotateArrow(rotateD) {

var a = (-1 * rotateD) * (Math.PI/180);

north.beginPath();
north.strokeStyle = '#0000ff';
north.moveTo(x, y);
north.lineTo(x - Math.sin(a)*60, y - Math.cos(a)*60);
north.stroke();

}