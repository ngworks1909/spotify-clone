import React from 'react'
import '../css/SongList.css'
import { FiHeart } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import SongItems from './SongItems';
import { MdAccessTime } from "react-icons/md";
import PlayIcon from '../logos/PlayIcon';
import { useRecoilValue } from 'recoil';
import { PlayState } from '../states/PlayState';


export default function SongList() {
  const {id} = useRecoilValue(PlayState);
  return (
    <div className={`songlist songlist-${id}`}>
      <div className="song-keys display-flex align-center">
        <PlayIcon/>
        <FiHeart size={30} className='song-symbols'/>
        <HiDotsHorizontal size={30} className='song-symbols'/>
      </div>
      <div className="display-songs">
        <span className='display-flex align-center hash-sign'>#</span>
        <span className='display-flex align-center'>Title</span>
        <span className='display-flex align-center album-sign'>Album</span>
        <span className='display-flex align-center duration-sign'><MdAccessTime size={20}/></span>
      </div>
      <SongItems/>
    </div>
  )
}
