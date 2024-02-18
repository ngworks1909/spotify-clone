import React from 'react'
import SongTop from './SongTop'
import SongList from './SongList'
import '../css/SongContainer.css'

export default function SongContainer() {
  return (
    <div className='song-container flex-column flex-1'>
      <SongTop/>
      <SongList/>
    </div>
  )
}
