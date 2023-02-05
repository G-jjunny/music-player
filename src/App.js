import "./App.scss";
import Controls from "./components/Controls/Controls";
import PlayList from "./components/PlayList/PlayList";
import ProgressArea from "./components/ProgrssArea/ProgressArea";
import SongDetail from "./components/SongDetail/SongDetail";
import React, { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const playList = useSelector((state) => state.playList);
  const currentIndex = useSelector((state) => state.currentIndex);
  const bg = playList[currentIndex].img;
  const audioRef = useRef();
  const [showPlayList, setshowPlayList] = useState(false);
  const onPlay = useCallback(() => {
    audioRef.current.play();
  }, []);
  const onPause = useCallback(() => {
    audioRef.current.pause();
  }, []);
  const changeVolume = useCallback((volume) => {
    audioRef.current.changeVolume(volume);
  }, []);
  const resetDuration = useCallback(() => {
    audioRef.current.resetDuration();
  }, []);
  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <div className="blur"></div>
      <div className="container">
        <SongDetail />
        <ProgressArea ref={audioRef} />
        <Controls
          setshowPlayList={setshowPlayList}
          play={onPlay}
          pause={onPause}
          changeVolume={changeVolume}
          resetDuration={resetDuration}
        />
        <PlayList
          setshowPlayList={setshowPlayList}
          showPlayList={showPlayList}
        />
      </div>
      {/* <img
        className="bg"
        src={playList[currentIndex].img}
        alt={playList[currentIndex].name}
      /> */}
    </div>
  );
}

export default App;
