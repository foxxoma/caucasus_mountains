const canv = document.getElementById('canvas'),
north = canv.getContext('2d');


canv.width = window.innerWidth;
canv.height = window.innerHeight;


const x = canv.width / 2, 
y = canv.height / 2;



// arrowN




const P = document.getElementById('p');


    

    

  		if ('ondeviceorientationabsolute' in window) { 

		
		window.ondeviceorientationabsolute = function(event) { 

		P.textContent = event.alpha;
       	

       	north.clearRect(0, 0, canv.width, canv.height);
       

       	let a = (-1 *  event.alpha) * (Math.PI/180);
       
       	north.beginPath();
		north.strokeStyle = '#ff0000';
		north.moveTo(x,  y - 1);
		north.lineTo(x + 1, y);
		north.lineTo(x, y+1);
		north.lineTo(x-1, y-1);
		north.lineTo(x, y-1);
		north.stroke();

		north.beginPath();
		north.fillStyle = '#0000ff'	
		north.arc(x - Math.sin(a)*60, y - Math.cos(a)*60, 5, 0, Math.PI *2);
		north.fill();


		};
		
		} 
		else if ('ondeviceorientation' in window) { 
			
			window.ondeviceorientationabsolute = function(event) { 

		P.textContent = event.alpha;
       	

       	north.clearRect(0, 0, canv.width, canv.height);
       

       	let a = (-1 *  event.alpha) * (Math.PI/180);
       	north.beginPath();
		north.strokeStyle = '#ff0000';
		north.moveTo(x,  y - 1);
		north.lineTo(x + 1, y);
		north.lineTo(x, y+1);
		north.lineTo(x-1, y-1);
		north.lineTo(x, y-1);
		north.stroke();

		north.beginPath();
		north.fillStyle = '#0000ff'	
		north.arc(x - Math.sin(a)*60, y - Math.cos(a)*60, 5, 0, Math.PI *2);
		north.fill();


		};
		

		}

		else{
		P.textContent = "f2";
		}
    



