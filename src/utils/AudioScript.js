let audioId = 0;
let audiaObjectsCache = {};
let addAudiaObject = function(object){
  let id = ++audioId;
  audiaObjectsCache[id] = object;

  return id;
}
let hasWebAudio = Boolean(audioContext);

let buffersCache = {};
let loadAudioFile = function(object, urlParam) {

  let onLoad = function(buffer) {
    object.dispatchEvent("load");

  }

  if(urlParam in buffersCache){
    onLoad(buffersCache[urlParam])
  } else{
    let xhr = new XMLHttpRequest;
    xhr.open("GET", urlParam, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function(){
      audioContext.decodeAudioData(xhr.response, function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        buffersCache[urlParam] = buffer;
        onLoad(buffer)
      })
    };
    xhr.onerror = function() {
      console.error('BufferLoader: XHR error');
    }
    xhr.send();
  }
}

let refreshBufferSource = function(object){
  object.bufferSource = audioContext.createBufferSource();

  object.bufferSource.buffer = buffersCache[object.src];

  object.bufferSource.connect(object.gainNode);

  object.bufferSource.loop = object._loop;
}

if (!audioContext.createGain)
  audioContext.createGain = audioContext.createGainNode;
if (!audioContext.createDelay)
  audioContext.createDelay = audioContext.createDelayNode;
if (!audioContext.createScriptProcessor)
  audioContext.createScriptProcessor = audioContext.createJavaScriptNode;


let gainNode = audioContext.createGain();
gainNode.gain.value = 1;
gainNode.connect(audioContext.destination);


class AudioScript {
  constructor(src){

    this.id = addAudiaObject(this);

    this._listenerId = 0;
    this._listeners = {};

    this._duration = NaN;
    this._loop = true;
    this._src = "";

    this.gainNode = audioContext.createGain();

    this.gainNode.connect(gainNode);


    if (src !== undefined) {
      this.src = src;
    }
  }

  load(){
    this._src && loadAudioFile(this, this._src);
  }

  play( startAtTime ){
    startAtTime = startAtTime || 0;
    refreshBufferSource(this);
    this.bufferSource[this.bufferSource.start ? 'start' : 'noteOn'](startAtTime);
  }

  stop( stopAtTime ){
    stopAtTime = stopAtTime || 0;
    this.bufferSource[this.bufferSource.stop ? 'stop' : 'noteOff'](stopAtTime)
  }

  addEventListener( eventName, callback ) {
    this._listeners[++this._listenerId] = {
      eventName: eventName,
      callback: callback
    };
  }

  dispatchEvent( eventName, args ) {
    for (let id in this._listeners) {
      let listener = this._listeners[id];
      if (listener.eventName == eventName) {
        listener.callback && listener.callback.apply(listener.callback, args);
      }
    }
  }

  removeEventListener( eventName, callback ) {
    let listenerId = null;
    for (let id in this._listeners) {
      let listener = this._listeners[id];
      if (listener.eventName === eventName) {
        if (listener.callback === callback) {
          listenerId = id;
          break;
        }
      }
    }

    if (listenerId !== null) {
      delete this._listeners[listenerId];
    }
  }

  get loop() {
      return this._loop;
  }

  set loop(value) {
      if (this._loop === value) { return; }
      this._loop = value;
  }

  get src() {
      return this._src;
  }

  set src(value) {
      this._src = value;
      loadAudioFile(this, value);
  }
}

export default AudioScript;
