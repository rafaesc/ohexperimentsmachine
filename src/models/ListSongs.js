import myAudio from './MyAudio';
import { getAudioExtension } from '../utils/Utils';

const EXTENSION = getAudioExtension();
const AUDIO_LOCATION = 'dist/assets/audio';

export let listSongs = [
	{
		title: 'Drums',
		active: false
	},
	{
		title: 'Good Life',
		active: false
	},
	{
		title: 'Bozza',
		active: false
	},
	{
		title: 'Gecko',
		active: false
	},
	{
		title: 'Koala',
		active: false
	},
	{
		title: 'Koala 2',
		active: false
	},
	{
		title: 'Melody',
		active: false
	},
	{
		title: 'Melody2',
		active: false
	},
	{
		title: 'Flamingo',
		active: false
	},
	{
		title: 'Flamingo 2',
		active: false
	},
	{
		title: 'Waiting',
		active: false
	},
	{
		title: 'Bunnydance',
		active: false
	},
	{
		title: 'WTF',
		active: false
	},
	{
		title: 'WTF2',
		active: false
	}
];

export let listTransition = [
	{
		init: 1.887,
		audio : new myAudio(`${AUDIO_LOCATION}/transition.${EXTENSION}`, false)
	},
	{
		init: 1.911,
		audio : new myAudio(`${AUDIO_LOCATION}/transition2.${EXTENSION}`, false)
	},
	{
		init: 0.958,
		audio : new myAudio(`${AUDIO_LOCATION}/transition3.${EXTENSION}`, false)
	},
	{
		init: 0.959,
		audio : new myAudio(`${AUDIO_LOCATION}/transition4.${EXTENSION}`, false)
	}
];

export let listButtons = [
	{
		idxSong: 1,
		type: 'sounds',
		active: false,
		loops: 2,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/sound1.${EXTENSION}`),
		shape: 'up'
	},
	{
		idxSong: 1,
		type: 'sounds',
		active: false,
		loops: 2,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/sound2.${EXTENSION}`),
		shape: 'down'
	},
	{
		idxSong: 0,
		type: 'drum',
		active: false,
		loops: 1,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/drum1.${EXTENSION}`),
		shape: 'up'
	},
	{
		idxSong: 1,
		type: 'sounds',
		active: false,
		loops: 2,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/bass1.${EXTENSION}`),
		shape: 'down'
	},
	{
		idxSong: 2,
		type: 'sounds',
		active: false,
		loops: 2,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/sound4.${EXTENSION}`),
		shape: 'up'
	},
	{
		idxSong: 13,
		type: 'sounds',
		active: false,
		loops: 2,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/bass2.${EXTENSION}`),
		shape: 'up'
	},
	{
		idxSong: 3,
		type: 'sounds',
		active: false,
		loops: 2,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/sound5.${EXTENSION}`),
		shape: 'down'
	},
	{
		idxSong: 0,
		type: 'drum',
		active: false,
		loops: 1,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/drum2.${EXTENSION}`),
		shape: 'up'
	},
	{
		idxSong: 0,
		type: 'drum',
		active: false,
		loops: 1,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/drum3.${EXTENSION}`),
		shape: 'down'
	},
	{
		idxSong: 0,
		type: 'drum',
		active: false,
		loops: 1,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/drum4.${EXTENSION}`),
		shape: 'up'
	},
	{
		idxSong: 4,
		type: 'sounds',
		active: false,
		loops: 2,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/sound7.${EXTENSION}`),
		shape: 'down'
	},
	{
		idxSong: 12,
		type: 'sounds',
		active: false,
		loops: 2,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/sound15.${EXTENSION}`),
		shape: 'up'
	},
	{
		idxSong: 5,
		type: 'sounds',
		active: false,
		loops: 2,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/sound6.${EXTENSION}`),
		shape: 'down'
	},
	{
		idxSong: 6,
		type: 'sounds',
		active: false,
		loops: 2,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/sound10.${EXTENSION}`),
		shape: 'up'
	},
	{
		idxSong: 0,
		type: 'drum',
		active: false,
		loops: 1,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/drum5.${EXTENSION}`),
		shape: 'down'
	},
	{
		idxSong: 0,
		type: 'drum',
		active: false,
		loops: 1,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/drum9.${EXTENSION}`),
		shape: 'up'
	},
	{
		idxSong: 0,
		type: 'drum',
		active: false,
		loops: 1,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/drum8.${EXTENSION}`),
		shape: 'down'
	},
	{
		idxSong: 7,
		type: 'sounds',
		active: false,
		loops: 2,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/sound8.${EXTENSION}`),
		shape: 'up'
	},
	{
		idxSong: 7,
		type: 'sounds',
		active: false,
		loops: 2,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/sound9.${EXTENSION}`),
		shape: 'down'
	},
	{
		idxSong: 8,
		type: 'sounds',
		active: false,
		loops: 2,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/sound11.${EXTENSION}`),
		shape: 'down'
	},
	{
		idxSong: 9,
		type: 'sounds',
		active: false,
		loops: 2,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/sound12.${EXTENSION}`),
		shape: 'up'
	},
	{
		idxSong: 0,
		type: 'drum',
		active: false,
		loops: 1,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/drum7.${EXTENSION}`),
		shape: 'down'
	},
	{
		idxSong: 11,
		type: 'sounds',
		active: false,
		loops: 2,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/sound14.${EXTENSION}`),
		shape: 'up'
	},
	{
		idxSong: 10,
		type: 'sounds',
		active: false,
		loops: 2,
		waiting: false,
		audio: new myAudio(`${AUDIO_LOCATION}/sound13.${EXTENSION}`),
		shape: 'down'
	}
];


