import { audioContextSupported, isNotMobile, isNotIE } from '../utils/Utils';
import Audia from '../utils/Audia';
import { loader } from '../utils/Loader';

class myAudio {
  constructor(url, loop){
		
    let _this;

    if ( typeof loop === 'undefined' ){
      loop = true;
    }

    _this = this;

    _this.isPlaying = false;
    _this.startedPlaying = 0;
    _this.analyser;
    _this.audio;
    _this.dataArray;

		if ( isNotIE() ) {

			if( audioContextSupported() ) {
				
				this.audio = new Audia;

				if ( isNotMobile() ) {
					let frequencyBinCount;
					this.analyser = this.audio.gainNode.context.createAnalyser();
					this.analyser.fftSize = 2048;
					this.audio.gainNode.connect(this.analyser);
				}

				loader.listener(function(endLoad) {
					_this.audio.addEventListener("load", function() {
						endLoad();
					})
				})
			} else {
				this.audio = new Audio;
				loader.listener(function(endLoad) {
					_this.audio.addEventListener("canplay", function() {
						endLoad()
					})
				});
			}
			
			this.audio.src = url;
			
			this.audio.loop = loop;
		}

  }

  duration(){
    return this.audio.duration;
  }

  play(time){
		

    this.isPlaying || !audioContextSupported() && time > 0 || (this.isPlaying = !0, this.startedPlaying = (new Date).getTime(), this.audio.play(time))


  }

  stop(stopAtTime){
		
    if(this.isPlaying){
      this.isPlaying = false;
      this.audio.pause(stopAtTime);
    }
  }
}

export { myAudio as default}
