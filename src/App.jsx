// App.jsx

import { useState, useEffect } from 'react';
import './App.css';

const phrases = [
  "Will you be my valentine? (press no for funsies)",
  "Are you sure?",
  "Really sure?",
  "Angry angry angry",
  "Aw man :(",
  "Do you even love? :((((((",
  "Bai forever :(((((",
];

const startingGif = "https://media.tenor.com/kgQfUEjcSdgAAAAi/milk-and-mocha.gif"; // spinning chair

const sadSong = new Audio("/seasons.mp3");
const happySong = new Audio("/lovely.wav");

const gifs = [
  "https://media.tenor.com/u5d9lGeg3FsAAAAi/milk-and-mocha.gif", // spit out coffee
  "https://media.tenor.com/kZBpoYdWf0sAAAAi/wtf.gif", // angry 1
  "https://media.tenor.com/Nrat0z9GMbwAAAAi/milk-and-mocha.gif", // angry 2
  "https://media.tenor.com/CSuzjNZCugAAAAAj/milk-and-mocha.gif", // break heart
];

function App() {
  const [yesPressed, setYesPressed] = useState(false);
  const [noCount, setNoCount] = useState(0); 

  const yesButtonSize = noCount * 20 + 16; 

  useEffect(() => {
    if (yesPressed) {
      sadSong.pause();
      sadSong.currentTime = 0;
      happySong.loop = true;
      happySong.play();
    } else if (noCount > 0) {
      happySong.pause();
      happySong.currentTime = 0;
      sadSong.loop = true;
      sadSong.play();
    }
  }, [yesPressed, noCount]);

  function handleNoClick() {
    setNoCount(noCount + 1);
  }

  function getNoQuestion() {
    return phrases[Math.min(noCount, phrases.length - 1)];
  }

  function getNoGif() {
    return noCount === 0 ? startingGif : gifs[Math.min(noCount - 1, gifs.length - 1)];
  }

  return (
    <div className="valentine-container">
      {yesPressed ? (
        <>
          <img
            alt="bears kissing"
            src="https://media.tenor.com/1yMk3DxkhToAAAAj/play-fight.gif"
          />
          <div className="text">YAY !!!!! BELLO LOVE OF MY LIFE </div>
        </>
      ) : (
        <>
          <img
            alt="reaction gif"
            src={getNoGif()}
          />
          <div class = "caption">{getNoQuestion()}</div>
          <div>
            <button
              className="yesButton"
              style={{ fontSize: yesButtonSize }}
              onClick={() => setYesPressed(true)}
            >
              Yes
            </button>
            <button onClick={handleNoClick} className="noButton">
              No
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;