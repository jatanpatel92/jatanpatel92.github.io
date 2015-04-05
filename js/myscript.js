$(document).ready(function(e) {
    $(function(){
		$('.container').hide();
		var imageArray = new Array('aeroplane.png','android.png','bt-next.png','bt-prev.png','database.png','fb.png','ln.png','git.png','top.png','library.jpg','nims.png','placement.png','unicode.jpg','me.jpg','ei.jpg');
		var loader = new PxLoader(); 	
		$.each(imageArray,function(key,value1){
			var pxImage = new PxLoaderImage('img/'+value1); 
			loader.add(pxImage); 
		}); 
			
			loader.addCompletionListener(function() { 
				$('#if1').on("load", function() {
				
							$("#loader").hide();
							$('.container').show();
							var charArray = [];
							var canvas = document.getElementById('matrix');
							var context = canvas.getContext("2d");
								for (var i = 0; i < 50; i++)
							{
								var temp = [];
								var yspeed = Math.random() * 10;
								var xspacing = 25;//+10*getRandomInt(0,10);
								var fontSize = 20;//+getRandomInt(0,10);
								var charlengh = 10+getRandomInt(0,10);
								for (var j = 0; j < charlengh; j++) {
									//creating array of random length 'temp' with randomly created char objects.
									//each char object in temp array have same x coordinate. Only y-coordinate increases.
									temp.push(new create_chars(i * 25 + xspacing, j * 20+20, yspeed, j, fontSize));
								}
								charArray.push(temp);
							}
							function Draw()
							{
								//context.globalCompositeOperation = "source-over";
								canvas.height = canvas.height;
								context.fillStyle = "#000000";
								context.fillRect(0, 0, canvas.width, canvas.height);
								//context.globalCompositeOperation = "lighter";
								for (var k = 0; k < charArray.length; k++)
								{
									for (var m = 0; m < charArray[k].length; m++)
									{
										var charObject = charArray[k][m];
										context.fillStyle = charObject.color;
										context.font = ""+charObject.fontSize+"px Times New Roman";
										context.fillText(charObject.text, charObject.x, charObject.y);
										//context.strokeText(charObject.text, charObject.x, charObject.y);
										context.fill();
										//incrementing the y-ccordinate for next frame. Which gives the moving effect.
										charObject.y += charObject.dy;
										 
										//redrawing the array once it goes out of the canvas.
										if (charObject.y > canvas.height) { charObject.y = 0; }
									}
								}
							}
							matrix = setInterval(Draw, 50);
							function create_chars(xloc, yloc, yspeed, j, fontSize) 
							{
								this.text = getRandomInt(0,1);
								this.x = xloc;
								this.y = -yloc;
								this.dy = yspeed;
								this.fontSize = fontSize;
								//if(j==0)
								this.color = "white";
								//else
								//this.color = "lime";
							}
						});
						
					});
		loader.start();
	});		
});
function loadSkills()
{
	
/*
        setInterval(function() {
          data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
          chart.draw(data, options);
        }, 13000);
        setInterval(function() {
          data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
          chart.draw(data, options);
        }, 5000);
        setInterval(function() {
          data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
          chart.draw(data, options);
        }, 26000);
		*/
}
$("#lnProfile").mouseover(function ()
{
	console.log("hello");
	$("#lnProfile").css({'cursor':'pointer'});
});
$("skills").click(function ()
{
	console.log("skills");
	//$("#lnProfile").css({'cursor':'pointer'});
});
function getRandomInt (minimum, maximum) {
	return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}