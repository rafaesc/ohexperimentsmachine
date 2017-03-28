let RAFTimeout = function() {
  let now, launch, data, execute, lastDigest, push;

  if( typeof lastDigest === 'undefined' ) {
    lastDigest = 0;
  }


  data = [];

  execute = function(){
    for (let idx in data ) {
      if( data[idx].end < currentTime() ){
        data[idx].cb();
        data.splice(idx, 1);
      }
    }
    if( lastDigest+16 < currentTime() ){
      lastDigest = currentTime();
    }
    requestAnimFrame(execute);
  };

  push = function(cb, delay){
    now = currentTime();
    delay = delay || 1;
    launch = now + delay;
    data.push({
      end: launch,
      cb: cb
    });
  };

  execute();
  return push;

};

export { RAFTimeout as default}
