import React, { memo } from "react";
import QueueMusic from "@mui/icons-material/QueueMusic";
import Close from "@mui/icons-material/Close";
import PlayListItem from "./PlayListItem";
import classNames from "classnames";
import "./PlayList.scss";
import SortableList from "@billy-fe/sortable-list";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentIndex,
  updatePlayList,
} from "../../store/musicPlayerReducer";

const PlayList = ({ showPlayList, setshowPlayList }) => {
  const playList = useSelector((state) => state.playList);
  const dispatch = useDispatch();
  const onClickClose = () => {
    setshowPlayList(false); // close 버튼 클릭시 setshowPlayList false로 초기화 (곡 리스트 닫힘)
  };

  const onClickItem = (index) => {
    dispatch(setCurrentIndex(index));
  };

  const onDropItem = (newPlayList) => {
    dispatch(updatePlayList(newPlayList));
  };

  const renderItem = (item, index) => (
    <PlayListItem item={item} index={index} />
  );
  return (
    <div className={classNames("play-list", { show: showPlayList })}>
      <div className="header">
        <div className="row">
          <QueueMusic className="list" />
          <span>Play list</span>
        </div>
        <Close
          className="close"
          sx={{ fontSize: 22, cursor: "pointer" }}
          onClick={onClickClose}
        />
      </div>
      <SortableList
        data={playList}
        onDropItem={onDropItem}
        onClickItem={onClickItem}
        renderItem={renderItem}
      />
    </div>
  );
};

export default memo(PlayList);
