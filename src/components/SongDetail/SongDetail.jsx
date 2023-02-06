import React, { memo } from "react";
import "./SongDetail.scss";
import { useSelector } from "react-redux";
function SongDetail() {
  // useSelector를 이용하여 playing, playList, currentIndex를 불러온다.
  const playing = useSelector((state) => state.playing);
  const playList = useSelector((state) => state.playList);
  const currentIndex = useSelector((state) => state.currentIndex);
  return (
    <>
      <div className="header">
        <span>{playing ? "재생중" : "일시정지"}</span>
      </div>
      <div className="img-area">
        <img
          src={playList[currentIndex].img}
          alt={playList[currentIndex].name}
        />
      </div>
      <div className="music-info">
        <p className="song">{playList[currentIndex].name}</p>
        <p className="artist">{playList[currentIndex].artist}</p>
      </div>
    </>
  );
}

export default memo(SongDetail);
