import React from 'react'
import { FaPlay } from "react-icons/fa";
import '../css/PlayIcon.css'

export default function PlayIcon() {
  return (
    <>
    <div className="playlist-play-icon display-flex cursor-pointer align-center justify-center">
          <FaPlay size={18} className='move-left'/>
    </div> 
    </>
  )
}
