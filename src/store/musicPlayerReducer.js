import img1 from "../images/music-1.jpg";
import img2 from "../images/music-2.jpg";
import img3 from "../images/music-3.jpg";
import img4 from "../images/music-4.jpg";
import img5 from "../images/music-5.jpg";
import img6 from "../images/music-6.jpg";
import img7 from "../images/music-7.jpg";
import img8 from "../images/music-8.jpg";
import img9 from "../images/music-9.jpg";
import img10 from "../images/music-10.jpg";

import music1 from "../music/music-1.mp3";
import music2 from "../music/music-2.mp3";
import music3 from "../music/music-3.mp3";
import music4 from "../music/music-4.mp3";
import music5 from "../music/music-5.mp3";
import music6 from "../music/music-6.mp3";
import music7 from "../music/music-7.mp3";
import music8 from "../music/music-8.mp3";
import music9 from "../music/music-9.mp3";
import music10 from "../music/music-10.mp3";

const playList = [
  {
    name: "Relax And Sleep",
    artist: "Anton Vlasov",
    img: img1,
    src: music1,
    id: 1,
  },
  {
    name: "Don't You Think Lose",
    artist: "Anton Vlasov",
    img: img2,
    src: music2,
    id: 2,
  },
  {
    name: "The Cradle of Your Soul",
    artist: "lemonmusicstudio",
    img: img3,
    src: music3,
    id: 3,
  },
  {
    name: "Spirit Blossom",
    artist: "RomanBelov",
    img: img4,
    src: music4,
    id: 4,
  },
  {
    name: "Everything Feels New",
    artist: "EvgenyBardyuzha",
    img: img5,
    src: music5,
    id: 5,
  },
  {
    name: "Awaken",
    artist: "OYStudio",
    img: img6,
    src: music6,
    id: 6,
  },
  {
    name: "Something About You",
    artist: "MarilynFord",
    img: img7,
    src: music7,
    id: 7,
  },
  {
    name: "Powerful Beat",
    artist: "penguinmusic",
    img: img8,
    src: music8,
    id: 8,
  },
  {
    name: "Weekends",
    artist: "DayFox",
    img: img9,
    src: music9,
    id: 9,
  },
  {
    name: "Drop It",
    artist: "Coma-Media",
    img: img10,
    src: music10,
    id: 10,
  },
];

const initialState = {
  playList,
  currentMusicId: playList[0].id,
  currentIndex: 0,
  playing: false,
  repeat: "ALL", //ONE SHUFFLE
};

// action ??????
const repeatMode = ["ONE", "ALL", "SHUFFLE"];
const PLAY_MUSIC = "musicPlayer/PLAY_MUSIC";
const STOP_MUSIC = "musicPlayer/STOP_MUSIC";
const NEXT_MUSIC = "musicPlayer/NEXT_MUSIC";
const PREV_MUSIC = "musicPlayer/PREV_MUSIC";
const SET_REPEAT = "musicPlayer/SET_REPEAT";
const SET_CURRENT_INDEX = "musicPlayer/SET_CURRENT_INDEX";
const UPDATE_PLAY_LIST = "musicPlayer/UPDATE_PLAY_LIST";

// action function
export const playMusic = () => ({ type: PLAY_MUSIC });
export const stopMusic = () => ({ type: STOP_MUSIC });
export const nextMusic = () => ({ type: NEXT_MUSIC });
export const prevMusic = () => ({ type: PREV_MUSIC });
export const setRepeat = () => ({ type: SET_REPEAT });
export const setCurrentIndex = (index) => ({ type: SET_CURRENT_INDEX, index });
export const updatePlayList = (newPlayList) => ({
  type: UPDATE_PLAY_LIST,
  newPlayList,
});

// ????????? ????????? ???????????? randomNum
const getRandomNum = (arr, excludeNum) => {
  // ????????????
  const randomNum = Math.floor(Math.random() * arr.length); //????????? ????????????
  return arr[randomNum] === excludeNum
    ? getRandomNum(arr, excludeNum)
    : arr[randomNum];
};

export default function musicPlayerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY_MUSIC:
      return {
        ...state,
        playing: true,
      };
    case STOP_MUSIC:
      return {
        ...state,
        playing: false,
      };
    case SET_CURRENT_INDEX:
      return {
        ...state,
        currentIndex: action.index,
        currentMusicId: state.playList[action.index].id,
      };
    case NEXT_MUSIC:
      const nextIndex =
        state.repeat === "SHUFFLE"
          ? getRandomNum(
              Array.from(Array(playList.length).keys()),
              state.currentIndex
            )
          : (state.currentIndex + 1) % state.playList.length;

      return {
        ...state,
        currentIndex: nextIndex,
        currentMusicId: state.playList[nextIndex].id,
      };
    case PREV_MUSIC:
      const prevIndex =
        state.repeat === "SHUFFLE"
          ? getRandomNum(
              Array.from(Array(playList.length).keys()),
              state.currentIndex
            )
          : (state.currentIndex - 1 + state.playList.length) %
            state.playList.length;
      return {
        ...state,
        currentIndex: prevIndex,
        currentMusicId: state.playList[prevIndex].id,
      };
    case SET_REPEAT:
      return {
        ...state,
        repeat:
          repeatMode[
            (repeatMode.indexOf(state.repeat) + 1) % repeatMode.length
          ],
      };
    case UPDATE_PLAY_LIST:
      const { newPlayList } = action;
      return {
        ...state,
        playList: newPlayList,
        currentIndex: newPlayList.findIndex(
          (music) => music.id === state.currentMusicId
        ),
      };
    default:
      return state;
  }
}
