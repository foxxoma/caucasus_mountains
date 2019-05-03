const canv = document.getElementById('canvas'),
ctxN = canv.getContext('2d'),
ctxS = canv.getContext('2d'),
arc = canv.getContext('2d');

canv.width = window.innerWidth;
canv.height = window.innerHeight;


const x = canv.width / 2, 
y = canv.height * (85 / 100);

// circle

arc.fillStyle = '#fff';
arc.arc(x, y, 70, 0, Math.PI * 2);
arc.fill();
arc.lineWidth = 5;
arc.strokeStyle = 'green';
arc.stroke();

// arrowN

ctxN.beginPath();
ctxN.strokeStyle = '#0000ff';
ctxN.moveTo(x, y);
ctxN.lineTo(x, y - 60);
ctxN.stroke();


// arrowS

ctxS.beginPath();
ctxS.strokeStyle = '#ff0000';
ctxS.moveTo(x, y);
ctxS.lineTo(x, y + 60);
ctxS.stroke();

/*if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function(event) { 

        var rotateDegrees = event.alpha; 

  		
    });
}*/


   