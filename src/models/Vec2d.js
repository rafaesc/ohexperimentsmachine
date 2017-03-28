class Vec2d {
	constructor( x , y ) {
		this._x = x || 1;
		this._y = y || 0;
	}

	getY(){
		return this._y
	}

	setY(value){
		this._y = value;
	}

	getX(){
		return this._x;
	}

	setX(value){
		this._x = value;
	}

	setXY( x , y ){
		this._x = x;
		this._y = y;
	}

	getLength(){
		return Math.sqrt(this._x * this._x + this._y * this._y);
	}

	setLength(length){
		let angle;

		angle = this.getAngle();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	}

	getAngle() {
		return Math.atan2(this._y, this._x);
	}

	setAngle(angle){
		let length;

		length = this.getLength();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	}

	add(vector) {
		this._x += vector.getX();
		this._y += vector.getY();
	}

	sub(vector) {
		this._x -= vector.getX();
		this._y -= vector.getY();
	}

	mul(value) {
		this._x *= value;
		this._y *= value;
	}

	div(value) {
		this._x /= value;
		this._y /= value;
	}
}

export { Vec2d as default }
