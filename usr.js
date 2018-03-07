// User defined code goes here
var slideNumberNode = document.createElement("div"),
	enlargeButtonNode = document.createElement("div"),
	progressBarObject = document.createElement("div"),
	emailButtonNode = document.createElement("a"),
	nextButtonNode,
	controlNode,
	menuCollectionNodes = document.getElementsByClassName('cs-listitem'),
	slideNumberNode = document.createElement("div"),
	globalCurrentSlide = 1,
	globalPreviousSlide,
	globalCheckOnce = false,
	tempSlide = 1,
	prevSlide = -1,
	initInterval = setInterval(init, 1000),
	email = 'learning@gadventures.com',
	emailsubject = '%20',
	emailbody = 'What was the slide number of the issue?'+'%0A'+'What was the issue?';

function init(){
	//if this element on the player exist initialize controlNode variable
	if (document.getElementsByClassName("controls-group control-bar cs-seekcontrol progress-control")[0] != undefined){
		controlNode = document.getElementsByClassName("controls-group control-bar cs-seekcontrol progress-control")[0].childNodes[0];
	} 
	// if controlNode is not selected, don't append elements from menu
	if(controlNode){
		controlNode.appendChild(enlargeButtonNode);	
		controlNode.appendChild(emailButtonNode);
		controlNode.appendChild(slideNumberNode);
		controlNode.appendChild(progressBarObject);
		// once init function runs delete		
		clearInterval(initInterval);
	}
	// adding properties to email button
	emailButtonNode.href = 'mailto:'+email+'?subject='+emailsubject+'&body='+emailbody;
	enlargeButtonNode.id = 'enlargeIcon';
	emailButtonNode.id = 'emailIcon';
	emailButtonNode.target = ' ';
	progressBarObject.id = 'courseProgressBar';
	slideNumberNode.id = 'slideNumber';
	// find out which one is active slide
	findActiveSlide();
	// add listeners toenlarge button and find out which slide we are
	enlargeButtonNode.addEventListener('click', enlargeScreen);
	document.addEventListener("mousemove", findAndUpdate);
}

//checks all slides in menu and finds which one is the selected one
function findActiveSlide(){
	for (var i = 1; i < menuCollectionNodes.length; i++) {
	    if( menuCollectionNodes[i].classList.contains('cs-selected')){
	    	tempSlide = i;
	    } 
	}
	if(prevSlide !== undefined && prevSlide > 0){
		if(prevSlide !== tempSlide){
			globalPreviousSlide = prevSlide;
			globalCurrentSlide = tempSlide;
		}
	}
	prevSlide = tempSlide;
	return tempSlide;
}

// the math for the progress bar
function updateProgress(){
	completePercentage = findActiveSlide() / Number(menuCollectionNodes.length - 1);
	userProgress(completePercentage);
}

// listener that triggers progress bar function
function findAndUpdate(e){
	findActiveSlide();
	updateProgress();
}

// this function moves progress bar image
function userProgress(progressPercentage){
	if(progressPercentage < 0.2){
		progressBarObject.style.backgroundPosition = "0px 0px";
	}else if(progressPercentage < 0.4){
		progressBarObject.style.backgroundPosition = "-45px 0px";
	}
	else if(progressPercentage < 0.6){
		progressBarObject.style.backgroundPosition = "-90px 0px";
	}
	else if(progressPercentage < 0.8){
		progressBarObject.style.backgroundPosition = "-135px 0px";
		
	}else if(progressPercentage < 1){
		progressBarObject.style.backgroundPosition = "-180px 0px";
	}else{
		progressBarObject.style.backgroundPosition = "-225px 0px";
	}
}

// enlarges module screen 
function enlargeScreen(){
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    var docElm = document.documentElement;
    if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}
