
navigator.geolocation.getCurrentPosition(function(position) {

        // Текущие координаты.
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
       

 });



const canv = document.getElementById('canvas'),
north = canv.getContext('2d');



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
		checkNavigation(lat, lng, event.alpha);

			};
		
		} 

		else if ('ondeviceorientation' in window) { 
			
			window.ondeviceorientationabsolute = function(event) {

       			rad = event.alpha;
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
		checkNavigation(lat, lng, event.alpha);
		};
		

		}

		else{
				alert("f2");
		}

    
function checkNavigation(y, x, az){
	let corner1, corner2;
	let a, b, c;
	b = x;
	c = 90 - y;
	a = Math.sqrt( Math.pow(b,2) + Math.pow(c,2) );
	corner1 = Math.acos( (Math.pow(a,2) + Math.pow(c,2) - Math.pow(b,2)) / (2*a*c)) *(180/Math.PI);
	

//задаем ш и д горы и если гора в первой четверти относительно нашего местоположения
let yM, xM ,aM, bM, cM;
ym = 44.9391;
xM = 45.59806;

aM = ym - y;
bM = xM - x;
cM = Math.sqrt( Math.pow(bM,2) + Math.pow(aM,2) );
corner2 = Math.acos( (Math.pow(aM,2) + Math.pow(cM,2) - Math.pow(bM,2)) / (2*aM*cM)) *(180/Math.PI);

let s = corner1 + corner2;
s = s.toFixed(0);
az = az.toFixed(0);
if(az == s){
	alert("вы смотрите на этот оъект");
}






}