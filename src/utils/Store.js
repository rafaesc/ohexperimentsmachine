const STORAGE = window.localStorage;

let Store = {
	set(key, value) {
		if (key && typeof value !== 'undefined') {
			STORAGE[key] = JSON.stringify(value);
		}
	},
	get(key) {
		let value = STORAGE[key];

		return value ? JSON.parse(value) : undefined;
	},
	remove(key) {
		if (STORAGE.hasOwnProperty(key)) {
			delete STORAGE[key];
		}
	},
	empty() {
		for(let a in STORAGE){
			delete STORAGE[a]
		}
	}
};

module.exports = Store;
