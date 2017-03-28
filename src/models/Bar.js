import Vec2d from './Vec2d';

function toRadians (angle) {
	return angle * (Math.PI / 180);
}

class Bar {
	constructor( circleWidth, center, grade, side ){

		this.circleWidth = circleWidth;
		this.center = center;
		this.side = side;
		this.grade = grade;
		this.color = '#ffffff';
		this.height = 1;
		this.size = 1;
		this.pos = new Vec2d(0, 0);
		this.posEnd = new Vec2d(0, 0);
		this.rotation = 0;
		this.update();
	}

	rotate(){
		this.rotation += 0.02
	}

	update(){
		this.rotate();
		this.pos.setX(
			this.center.getX()+
			Math.cos(toRadians(this.grade+this.rotation))*this.circleWidth
		);
		this.pos.setY(
			this.center.getY()+
			Math.sin(toRadians(this.grade+this.rotation))*this.circleWidth
		);

		this.posEnd.setX(
			this.pos.getX()+
			(Math.cos(toRadians(this.grade+this.rotation))*this.height
			*this.side)
		);
		this.posEnd.setY(
			this.pos.getY()+
			(Math.sin(toRadians(this.grade+this.rotation))*this.height
			*this.side)
		);
	}

	remove(){
		this.height -= 0.5;
		if(this.height < 1) this.height = 1;
	}
}

export { Bar as default }