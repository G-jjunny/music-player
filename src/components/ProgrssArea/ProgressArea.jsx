import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import "./ProgressArea.scss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  nextMusic,
  playMusic,
  stopMusic,
} from "../../store/musicPlayerReducer";
import { useState } from "react";

function ProgressArea(props, ref) {
  const audio = useRef();
  const progressBar = useRef();
  const dispatch = useDispatch();
  const { playList, currentIndex, repeat } = useSelector(
    (state) => ({
      playList: state.playList,
      currentIndex: state.currentIndex,
      repeat: state.repeat,
    }),
    shallowEqual
  );
  const [currentTime, setcurrentTime] = useState("00:00");
  const [duration, setduration] = useState("00:00");

  useImperativeHandle(ref, () => ({
    play: () => {
      audio.current.play();
    },
    pause: () => {
      audio.current.pause();
    },
    changeVolume: (volume) => {
      audio.current.volume = volume;
    },
    // 한 곡 반복시 currentTime을 초기화 시켜서 넘겨줌
    resetDuration: () => {
      audio.current.currentTime = 0;
    },
  }));

  const onPlay = () => {
    dispatch(playMusic()); //재생
  };

  const getTime = (time) => {
    const minute = `0${parseInt(time / 60, 10)}`;
    const seconds = `0${parseInt(time % 60)}`;
    return `${minute}:${seconds.slice(-2)}`;
  };

  // progress 클릭시 해당 구간으로 이동
  const onClickProgress = (event) => {
    const progressWidth = event.currentTarget.clientWidth;
    const offsetX = event.nativeEvent.offsetX;
    const duration = audio.current.duration;
    audio.current.currentTime = (offsetX / progressWidth) * duration;
  };

  const onTimeUpdate = (event) => {
    if (event.target.readyState === 0) return;
    const currentTime = event.target.currentTime;
    const duration = event.target.duration;
    const progressBarWidth = (currentTime / duration) * 100;
    progressBar.current.style.width = `${progressBarWidth}%`;
    setcurrentTime(getTime(currentTime));
    setduration(getTime(duration));
  };

  const onPause = () => {
    dispatch(stopMusic()); //일시정지
  };
  const onEnded = useCallback(() => {
    if (repeat === "ONE") {
      // repeat모드가 ONE일때
      setTimeout(() => {
        //2초 딜레이를 주고
        audio.current.currentTime = 0; //currentTime을 0으로 초기화
        audio.current.play(); //다시 실행
      }, 2000);
    } else dispatch(nextMusic()); // 다른모드일때는 nextMusix
  }, [repeat, dispatch]);
  return (
    <div className="progress-area" onMouseDown={onClickProgress}>
      <div className="progress-bar" ref={progressBar}>
        <audio
          autoPlay
          onEnded={onEnded}
          ref={audio}
          src={playList[currentIndex].src}
          onPlay={onPlay}
          onPause={onPause}
          onTimeUpdate={onTimeUpdate}
        ></audio>
      </div>
      <div className="music-timer">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
    </div>
  );
}

export default forwardRef(ProgressArea);
