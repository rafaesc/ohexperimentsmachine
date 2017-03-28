const WIN = window;

function canPlayAudio(extension) {

	let audio = document.createElement("audio");
	return !(!audio.canPlayType || !audio.canPlayType("audio/" + extension + ";").replace(/no/, ""));
}

export let getAudioExtension = function(){
	let extension;
	extension = "wav";

	if ( canPlayAudio("ogg") ) {
		extension = "ogg";
	} else {
		if ( canPlayAudio("mp3") ){
			extension = "mp3";
		} else {
			if ( canPlayAudio("aac") ){
				extension = "aac";
			} else {
				if ( canPlayAudio("mp4") ){
					extension = "m4a";
				}
			}
		}
	}
	return extension;
};

export let audioContextSupported = function(){

	let support;

	support = undefined !== WIN.AudioContext || undefined !== WIN.webkitAudioContext;
	return support;
};

export let audioTime = function(){
	return audioContextSupported() && void 0 !== audioContext ? audioContext.currentTime : Date.now() / 1e3
};

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
export let isNotIE = function () {

	var ua = window.navigator.userAgent;

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return false;
		//return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return false;
		//return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		return true;
		//return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
	}

	// other browser
	return true;
};

export let isIE = function () {
	return !isNotIE();
};

export let isNotMobile = function() {
	return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export let isMobile = function () {
	return !isNotMobile();
};

export let isChrome = function() {
	return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
};

export let isNotChrome = function () {
	return !isChrome();
};

export let isIOs = function () {
	return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
};

export let isNotIOs = function() {
	return !isIOs();
}
