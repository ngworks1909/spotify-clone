import React from 'react'
import '../css/Bottom.css'
import {RiShuffleFill,RiForward10Fill,RiReplay10Fill} from 'react-icons/ri'
import {FiRepeat} from 'react-icons/fi'
import Play from '../handlers/Play'
import { useRecoilValue } from 'recoil'
import { Player } from '../states/Player'

export default function Bottom() {
  const player = useRecoilValue(Player);
  return (
    <>
    <div className='bottom display-flex align-center justify-center'>
    <div className="bottom-song-display display-flex align-center gap-10">
        <input type="image" src={player.songImg} className='bottom-song-image' alt="" />
        <div className="bottom-song-content-display display-flex flex-column">
          <span className='color-white bottom-song-content-name'>{player.name}</span>
          <span className='bottom-song-content-singer'>{player.singer}</span>
        </div>
    </div>
      <div className="bottom-block bg-transparent display-flex align-center justify-center">
        <RiShuffleFill className='color-white bottom-icon cursor-pointer' size={27}/>
        <RiReplay10Fill className='color-white bottom-icon cursor-pointer' size={27}/>
        <Play/>
        <RiForward10Fill className='color-white bottom-icon cursor-pointer' size={27}/>
        <FiRepeat className='color-white bottom-icon cursor-pointer' size={27}/>
      </div>
    </div>
    </>
  )
}
