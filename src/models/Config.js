import listAudio from './ListAudio';
let config;

for (let audio in listAudio){
  listAudio[audio].id = 1 * audio + 1;
}

config = {
  waitToStop: false,
  debugEnabled: false,
  buttons : listAudio,
  maxAtATime: {
    sounds: 3,
    bass: 1,
    drum: 1
  },
  sharing: {
    text: "Check out the mix I made with [USER]'s Adventure Machine",
    appId: "lol",
    user: {
      twitter: "madeon",
      facebook: "Madeon"
    },
    description: "I just made this mix with Madeons Adventure Machine, can you make a better one?",
    image: window.shareImage
  }
};

module.exports= config;