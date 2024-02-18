import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import "../css/Song.css";
import { FindSong } from "../functions/FindSong";
import { PlaySong } from "../functions/PlaySong";
import { SongState } from "../states/SongState";
import { Host } from "../states/Host";
import { Player } from "../states/Player";

export default function Song({
  songId,
  number,
  name,
  songImg,
  singer,
  album,
  duration
}) {
  const setPlay = useSetRecoilState(SongState);
  const host = useRecoilValue(Host);
  const setPlayer = useSetRecoilState(Player);
  return (
    <>
    <div
      className="song color-white cursor-pointer"
      onClick={async (e) => {
        e.preventDefault();
        const info = { host, songId };
        const url = await FindSong(info);
        const items = {url, setPlay}
        PlaySong(items);
        setPlayer({songImg: songImg, name: name, singer: singer});
      }}
    >
      <span className="display-flex align-center song-number">{number}</span>
      <div className="display-flex align-center gap-1">
        <input type="image" className={`song-image`} src={songImg} alt="" />
        <div className="song-details display-flex flex-column">
          <span className="song-name">{name}</span>
          <span className="song-singer">{singer}</span>
        </div>
      </div>
      <div className="display-flex align-center song-album-block">
        <span className="song-album">{album}</span>
      </div>
      <div className="display-flex align-center song-duration-block">
        <span className="song-duration display-flex align-center">
          {duration}
        </span>
      </div>
    </div>
    </>
  );
}
