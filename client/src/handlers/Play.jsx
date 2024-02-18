import React from 'react'
import '../css/Play.css'
import { FaPlay , FaPause} from "react-icons/fa";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { SongState } from '../states/SongState';
import { pauseCurrent, playCurrent } from '../functions/PlaySong';


export default function Play() {
    const play = useRecoilValue(SongState)
    const setPlay = useSetRecoilState(SongState);
  return (
    <div className='play cursor-pointer' style={{zIndex:'1'}} onClick={async(e) => {
      e.preventDefault();
      if(!play){
        await playCurrent();
        setPlay(true);
      }
      else{
        await pauseCurrent();
        setPlay(false);
      }
      }}>
      {play ? <FaPause className='play-icon'/> : <FaPlay className='play-icon play-song-icon'/> }
    </div>
  )
}
