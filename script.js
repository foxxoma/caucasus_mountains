var lat;
var lng;
var cornerAz;
navigator.geolocation.getCurrentPosition(function(position) {

        // Текущие координаты.
        lat = position.coords.latitude;
       lng = position.coords.longitude;
       

 });



const canv = document.getElementById('canvas'),
north = canv.getContext('2d');


const p = document.getElementById('p');
canv.width =  Math.sqrt( 2 * Math.pow(window.innerHeight, 2));
canv.height = Math.sqrt( 2 * Math.pow(window.innerHeight, 2));


const x = canv.width / 2, 
y = canv.height / 2;

let aC;
let rad;

north.translate(x, y);



		north.beginPath();
		north.fillStyle = '#ff0000'	
		north.arc(0, 0, 3, 0, Math.PI *2);
		north.fill();

		north.beginPath();
		north.fillStyle = '#0000ff'	
		north.arc(0, -60, 5, 0, Math.PI *2);
		north.fill();



  		if ('ondeviceorientationabsolute' in window) { 
		
			window.ondeviceorientationabsolute = function(event) {
				rad = event.alpha;
				cornerAz = 360 - event.alpha;
				//rad = rad.toFixed(0);
       			let a = rad * (Math.PI/180);

        
        north.clearRect(-70, -70, 80, 80);
        north.rotate(-1*aC);
		north.rotate(a);

		north.beginPath();
		north.fillStyle = '#ff0000'	
		north.arc(0, 0, 3, 0, Math.PI *2);
		north.fill();

		north.beginPath();
		north.fillStyle = '#0000ff'	
		north.arc(0, -60, 5, 0, Math.PI *2);
		north.fill();

		aC = a;
		

			};
		
		} 

		else if ('ondeviceorientation' in window) { 
			
			window.ondeviceorientationabsolute = function(event) {

       			rad = event.alpha;
       			cornerAz = 360 - event.alpha;
				//rad = rad.toFixed(0);
       			let a = rad * (Math.PI/180);

        				
        north.clearRect(-70, -70, 80, 80);
		north.rotate(-1*aC);
		north.rotate(a);

		north.beginPath();
		north.fillStyle = '#ff0000'	
		north.arc(0, 0, 3, 0, Math.PI *2);
		north.fill();

		north.beginPath();
		north.fillStyle = '#0000ff'	
		north.arc(0, -60, 5, 0, Math.PI *2);
		north.fill();
		
		aC = a;
		
		};
		

		}

		else{
				alert("f2");
		}


setInterval(function() {
	checkNavigation(lat, lng, cornerAz)
}, 10);
    
let i = 0;

function checkNavigation(y, x, az){
	let corner1, corner2;
	let a, b, c;
	b = x;
	c = 90 - y;
	a = Math.sqrt( Math.pow(b,2) + Math.pow(c,2) );
	corner1 = Math.acos( (Math.pow(a,2) + Math.pow(c,2) - Math.pow(b,2)) / (2*a*c)) *(180/Math.PI);
	
let yM, xM ,aM, bM, cM;
yM = [42.9391, 42.9034];
xM = [44.59806, 43.97759];

let s;


if (yM[i] > y && xM[i] > x){


aM = yM[i] - y;
bM = xM[i] - x;
cM = Math.sqrt( Math.pow(bM,2) + Math.pow(aM,2) );
corner2 = Math.acos( (Math.pow(aM,2) + Math.pow(cM,2) - Math.pow(bM,2)) / (2*aM*cM)) *(180/Math.PI);

 s = corner1 + corner2;
s = s.toFixed(0);
az = az.toFixed(0);
}

else if (yM[i] < y && xM[i] > x){


bM = y - yM[i];
aM = xM[i] - x;
cM = Math.sqrt( Math.pow(bM,2) + Math.pow(aM,2) );
corner2 = Math.acos( (Math.pow(aM,2) + Math.pow(cM,2) - Math.pow(bM,2)) / (2*aM*cM)) *(180/Math.PI);

 s = corner1 + 90 + corner2;
s = s.toFixed(0);
az = az.toFixed(0);
}

else if (yM[i] < y && xM[i] < x){


aM = y - yM[i];
bM = x - xM[i];
cM = Math.sqrt( Math.pow(bM,2) + Math.pow(aM,2) );
corner2 = Math.acos( (Math.pow(aM,2) + Math.pow(cM,2) - Math.pow(bM,2)) / (2*aM*cM)) *(180/Math.PI);

 s = corner1 + 90 + 90 + corner2;
s = s.toFixed(0);
az = az.toFixed(0);
}

else if (yM[i] > y && xM[i] < x){


bM = yM[i] - y;
aM = x - xM[i];
cM = Math.sqrt( Math.pow(bM,2) + Math.pow(aM,2) );
corner2 = Math.acos( (Math.pow(aM,2) + Math.pow(cM,2) - Math.pow(bM,2)) / (2*aM*cM)) *(180/Math.PI);

 s = corner1 + 90 + 90 + 90 + corner2;

if(s > 360) 
{
	s = s - 360;
}

s = s.toFixed(0);
az = az.toFixed(0);
}

if(az == s && i == 0){
	p.textContent = "0"; i = 1;

}

else if(az == s && i == 1){
	p.textContent = "1"; i = 0;

}
else {i=1;}



}