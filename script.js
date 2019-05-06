const canv = document.getElementById('canvas'),
north = canv.getContext('2d');


canv.width =  Math.sqrt( 2 * Math.pow(window.innerHeight, 2));
canv.height = Math.sqrt( 2 * Math.pow(window.innerHeight, 2));


const x = canv.width / 2, 
y = canv.height / 2;


north.translate(x, y);









    

    

  		if ('ondeviceorientationabsolute' in window) { 

		
		window.ondeviceorientationabsolute = function(event) { 

	
       	

       	north.clearRect(0, 0, canv.width, canv.height);
       

       	let a = (-1 *  event.alpha) * (Math.PI/180);
       
       	north.rotate(a); 

       	north.beginPath();
		north.fillStyle = '#ff0000'	
		north.arc(0, 0, 3, 0, Math.PI *2);
		north.fill();

		north.beginPath();
		north.fillStyle = '#0000ff'	
		north.arc(0, 0 - 60, 5, 0, Math.PI *2);
		north.fill();

		

		
		};
		
		} 
		else if ('ondeviceorientation' in window) { 
			
			window.ondeviceorientationabsolute = function(event) { 

		
       	

       	north.clearRect(0, 0, canv.width, canv.height);
       

       	let a = (-1 *  event.alpha) * (Math.PI/180);

        north.rotate(a); 

       	north.beginPath();
		north.fillStyle = '#ff0000'	
		north.arc(0, 0, 3, 0, Math.PI *2);
		north.fill();

		north.beginPath();
		north.fillStyle = '#0000ff'	
		north.arc(0, 0 - 60, 5, 0, Math.PI *2);
		north.fill();



		};
		

		}

		else{
		alert("f2");
		}
    



