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







const P = document.getElementById('p');
if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function(event) { 

        var rotateDegrees = event.alpha; 
       

       	P.textContent = rotateDegrees;
  		
    });
}

/*
function rotateArrow {


}*/