import React, { memo, useCallback } from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPrevious from "@mui/icons-material/SkipPrevious";
import PlayArrow from "@mui/icons-material/PlayArrow";
import SkipNext from "@mui/icons-material/SkipNext";
import QueueMusic from "@mui/icons-material/QueueMusic";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import "./Controls.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  nextMusic,
  prevMusic,
  setRepeat,
} from "../../store/musicPlayerReducer";

// 재생모드 컴포넌트
const RepeatButton = memo(({ repeat, ...props }) => {
  switch (repeat) {
    case "ALL": // 재생모드 전체반복일때
      return <RepeatIcon sx={{ fontSize: 30, cursor: "pointer" }} {...props} />;
    case "ONE": // 재생모드 한 곡 반복일때
      return (
        <RepeatOneIcon sx={{ fontSize: 30, cursor: "pointer" }} {...props} />
      );
    case "SHUFFLE": // 재생모드 랜덤일때
      return (
        <ShuffleIcon sx={{ fontSize: 30, cursor: "pointer" }} {...props} />
      );
    default:
      return null;
  }
});

const Controls = ({
  showPlayList,
  setshowPlayList,
  resetDuration,
  play,
  pause,
  changeVolume,
}) => {
  const playing = useSelector((state) => state.playing);
  const repeat = useSelector((state) => state.repeat);
  const dispatch = useDispatch();
  const onClickPlay = useCallback(() => {
    play();
  }, [play]);
  const onClickPause = useCallback(() => {
    pause();
  }, [pause]);

  const onChangeVolume = useCallback(
    (event) => {
      changeVolume(event.target.value);
    },
    [changeVolume]
  );
  const onClickPrevious = () => {
    dispatch(prevMusic());
  };
  const onClicknext = () => {
    dispatch(nextMusic());
  };
  const onClickRepeat = () => {
    dispatch(setRepeat());
  };
  const onClickShowPlayList = () => {
    setshowPlayList(true);
  };

  return (
    <div className="control-area">
      <QueueMusic
        sx={{ fontSize: 30, cursor: "pointer" }}
        className="ic-btn"
        onClick={onClickShowPlayList}
      />
      <RepeatButton
        repeat={repeat}
        onClick={onClickRepeat}
        className="ic-btn"
      />
      <SkipPrevious
        sx={{ fontSize: 30, cursor: "pointer" }}
        onClick={onClickPrevious}
        className="ic-btn"
      />
      {playing ? (
        <PauseIcon
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick={onClickPause}
          className="ic-btn"
        />
      ) : (
        <PlayArrow
          className="play ic-btn"
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick={onClickPlay}
        />
      )}
      <SkipNext
        sx={{ fontSize: 30, cursor: "pointer" }}
        onClick={onClicknext}
        className="ic-btn"
      />
      <div className="volume-container">
        <VolumeUpIcon sx={{ fontSize: 20 }} />
        <input
          type="range"
          style={{ cursor: "pointer" }}
          defaultValue={1}
          onChange={onChangeVolume}
          min="0"
          max="1"
          step="0.1"
        />
      </div>
    </div>
  );
};

export default memo(Controls);
