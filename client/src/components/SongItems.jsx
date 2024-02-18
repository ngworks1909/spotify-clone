import React, { useEffect, useState } from "react";
import Song from "./Song";
import "../css/SongItems.css";
import { useRecoilValue } from "recoil";
import { Host } from "../states/Host";
import SongSkeleton from '../components/SongSkeleton'

export default function SongItems() {
  const host = useRecoilValue(Host);
  const [songs, setSongs] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // fetchSongs(id, host);
    const data = localStorage.getItem("data");
    const items = data.split(",");
    const id = items[0];
    fetch(`http://${host}:3001/api/playlists/fetchSongs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        const { success, songlist } = data;
        console.log(success, songlist);
        if (success) {
          setSongs(songlist);
        }
        setLoading(false);
      });
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="song-items display-flex flex-column gap-10">
      {!loading &&
        songs.map((song) => {
          return (
            <Song
              key={song.songId}
              songId={song.songId}
              number={song.number}
              name={song.name}
              songImg={song.songImg}
              singer={song.singer}
              album={song.album}
              duration={song.duration}
            />
          );
        })}
        {loading && <>
         <SongSkeleton/>
         <SongSkeleton/>
         <SongSkeleton/>
         <SongSkeleton/>
         <SongSkeleton/>
         <SongSkeleton/>
         <SongSkeleton/>
         <SongSkeleton/>
         <SongSkeleton/>
         <SongSkeleton/>
        </>}
    </div>
  );
}
