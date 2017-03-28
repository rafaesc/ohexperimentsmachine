class Loader {

  constructor(){
    let _this;

    _this = this;
    _this.toLoad = 0;
    _this.loaded = 0;
    _this.done = false;

    setTimeout(function() {
      _this.done || (_this.done = !0, _this.onfinish())
    }, 2e4)
  }

  onfinish(){
  }

  onLoaded( loaded, toLoad ) {

  }

  listener(beforeLoad){
    let _this;

    _this = this;
    _this.toLoad++;
    beforeLoad(function() {
      _this.loaded++;
      _this.onLoaded( _this.loaded, _this.toLoad )
      _this.checkLoaded()
    })
  }

  checkLoaded(){
    this.loaded !== this.toLoad || this.done || (this.onfinish(),
      this.done = !0);
  }
}

export let loader = new Loader();

