import Store from '../utils/Store';
import {
	DONE_TUTORIAL_STORE
} from '../utils/Variables';
import UrlHelper from  '../utils/UrlHelper';

let haveSongSaved = ( UrlHelper.get() ) ? true : false;
if ( haveSongSaved ) {
	Store.set(DONE_TUTORIAL_STORE, true);
}

export const state = {
	stepTutorial: 1,
	doneTutorial: Store.get(DONE_TUTORIAL_STORE) || false,
	doneLoad: false,
	machine: false,
	looper: false
};

export const mutations = {
	nextTutorial ( state ) {
		state.stepTutorial++;
	},
	completeTutorial( state ) {
		state.doneTutorial = true;
	},
	completeLoad( state ) {
		state.doneLoad = true;
	},
	reviewBrowser( state ) {
		state.machine = true;
	},
	activeLooper( state ) {
		state.looper = true;
	},
	inactiveLooper( state ) {
		state.looper = false;
	}

};
