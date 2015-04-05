var gujratiNumerals = new Array('૦','૧','૨','૩','૪','૫','૬','૭','૮','૯');
var hindiNumerals = new Array('०','१','२','३','४','५','६','७','८','९');

function containerResize()
{ 
	var scaleFactor = 1;
	var scaleFactor1 = 0;
	var scaleFactor2 = 0;
	if(window.innerHeight < $("#container").height()) {
		scaleFactor1 = parseFloat(window.innerHeight/$("#container").height()); 
	}
	else
		scaleFactor1 = 1 ;									

	if(window.innerWidth < $("#container").width()) {
		scaleFactor2 = parseFloat(window.innerWidth/$("#container").width());
	}
	else
		scaleFactor2 = 1 ;									

	if(scaleFactor1 < scaleFactor2)
		scaleFactor = scaleFactor1;
	else
		scaleFactor = scaleFactor2;	
	$("#container").css({"-webkit-transform": "scale("+scaleFactor+")"});
	$("#container").css({"-moz-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"-o-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"-ms-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"transform": "scale("+scaleFactor+")"});		
}

function changeLanguage(str,numberLanguage)
{
		if(numberLanguage == "")
			numberLanguage = "english";
		str = "" + str;
		var newStr = '';
		var i;		
		if(numberLanguage == "english"){return str;}
		else if(numberLanguage == "gujarati"){
			for( i = 0 ; i < str.length ; i++){
				
				newStr += gujratiNumerals[parseInt(str[i])];
			}
		}
		else{
			for( i = 0 ; i < str.length ; i++){
				newStr += hindiNumerals[parseInt(str[i])];
			}
		}
	return newStr;	
}

function replaceNumerals(str,numberLanguage)
{
	str = ""+str;
	var pattern=/\b([\d]+)\b(?![;"'])/ig;
	var newValue = str.replace(pattern,function($1){return changeLanguage($1,numberLanguage);});
	
	return newValue;
}

function replaceDynamicText(str,numberLanguage,classObjName)
{
	str = ""+str;
	var pattern=/#([a-zA-Z0-9_]+)#/ig;
	var newValue = str.replace(pattern,	function($1)
										{	
											var temp = $1;
											temp = temp.replace(/#/ig,"");
											var val = "";
											if(classObjName != "")
											{
												val  = eval(classObjName+"."+temp);
												if(typeof val =="undefined")
													val  = eval(temp);
											}													
											else
												val  = eval(temp);
										
											return val;
										});
	newValue = replaceNumerals(newValue,numberLanguage)									
	
	return newValue;
}


function getURLParameters() {
	var parameters = new Object();
	var id = document.URL.indexOf('?');
	if (id != -1) {
		var keyValuePair = document.URL.substring(id+1, document.URL.length).split('&');
		for (var i=0; i<keyValuePair.length; i++) {
			keyValue = keyValuePair[i].split('=');
			parameters[keyValue[0]] = decodeURIComponent((keyValue[1]+'').replace(/\+/g, '%20'));
		}
	}
	return parameters;
}

//This file includes all common functions that can be used across game.

function hasItoccuredBefore(value,arr)//if flag==1 that means value already exists in arr
{
	var flag = 0;
	
	for(i=0; i<arr.length; i++)
	{
		if(arr[i].toString()==value.toString())
		{
			flag = 1;
		}
	} 
	
	return flag;
}


function arrayShuffle(oldArray) { //shuffle the aray
	var newArray = oldArray.slice();
 	var len = newArray.length;
	var i = len;
	 while (i--) {
	 	var p = parseInt(Math.random()*len);
		var t = newArray[i];
  		newArray[i] = newArray[p];
	  	newArray[p] = t;
 	}
	return newArray; 
};

function calculateDistanceBetween2Points(sX,sY,dX,dY) //calculates distance between centers of two equal circles.
{
	var d = Math.sqrt(Math.pow((dX-sX),2)+Math.pow((dY-sY),2));
	
	return d;	
}

function  svgAnimateAttributes (target,attributeName,begin,to,dur,ifFreeze,repeatCount) {
    // create the fade animation
    var animation = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animation.setAttributeNS(null, 'attributeName', attributeName);
    animation.setAttributeNS(null, 'begin', begin);
    animation.setAttributeNS(null, 'to', to);
    animation.setAttributeNS(null, 'dur', dur);
    if(ifFreeze=='yes')
    	animation.setAttributeNS(null, 'fill', 'freeze');
    animation.setAttributeNS(null, 'repeatCount', repeatCount);
    // link the animation to the target
    target.appendChild(animation);
    // start the animation
    animation.beginElement();
}

function osDetection(){
	
    return ( 
        (navigator.userAgent.indexOf("iPhone") != -1) ||
        (navigator.userAgent.indexOf("iPod") != -1) || (navigator.userAgent.indexOf("iPad") != -1) || (navigator.userAgent.indexOf("Android") != -1)
    );
}

function removeByElement(arrayName,arrayElement)
 {
	  for(var i=0; i<arrayName.length;i++ )
	  { 
	  	if(arrayName[i]==arrayElement)
	  		arrayName.splice(i,1); 
	  } 
	  return arrayName;
 } 
 
function in_array( what, where )
{
	var a=false;
    for(var i=0;i<where.length;i++)
	{
	    if(what == where[i])
		{
	    	a=true;
	    	break;
	    }
	}
	return a;
}

function implode (glue, pieces) {
    // Joins array elements placing glue string between items and return one string  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/implode
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Waldo Malqui Silva
    // +   improved by: Itsacon (http://www.itsacon.net/)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'Kevin van Zonneveld'
    // *     example 2: implode(' ', {first:'Kevin', last: 'van Zonneveld'});
    // *     returns 2: 'Kevin van Zonneveld'
    var i = '',
        retVal = '',
        tGlue = '';
    if (arguments.length === 1) {
        pieces = glue;
        glue = '';
    }
    if (typeof(pieces) === 'object') {
        if (Object.prototype.toString.call(pieces) === '[object Array]') {
            return pieces.join(glue);
        } 
        for (i in pieces) {
            retVal += tGlue + pieces[i];
            tGlue = glue;
        }
        return retVal;
    }
    return pieces;
} 
 
function getRandomFromArray(items){
	return(items[Math.floor(Math.random()*items.length)]);
}

function toRadians(deg) {
	return deg * Math.PI / 180
}

function toDegrees(rad) {
	return rad * 180 / Math.PI
}

function getRandomInt (minimum, maximum) {
	return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function intersectArrays(a, b) {
    var d = {};
    var results = [];
    for (var i = 0; i < b.length; i++) {
        d[b[i]] = true;
    }
    for (var j = 0; j < a.length; j++) {
        if (d[a[j]]) 
            results.push(a[j]);
    }
    return results;
}