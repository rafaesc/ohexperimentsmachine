class PathLoader {
  constructor( el ){
    this.el = el;
    this.el.style.strokeDasharray = this.el.style.strokeDashoffset = this.el.getTotalLength();
  }

  _draw( val ){
    this.el.style.strokeDashoffset = this.el.getTotalLength() * ( 1 - val );
  }

  setProgress( val, callback ){
    this._draw(val);
		if( callback && typeof callback === 'function' ) {
			setTimeout( callback, 200 );
		}
  }

  setProgressFn( fn ){
    if( typeof fn === 'function' ) { fn( this ); }
  }
}

export { PathLoader as default }