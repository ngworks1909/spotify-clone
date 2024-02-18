import React from 'react'
import Top from './Top'
import SongContainer from './SongContainer'
import '../css/SongMain.css'

export default function SongMain() {
  return (
    <> 
    <div className="songmain display-flex flex-column flex-1">
        <Top/>
        <SongContainer/>
    </div>
      
    </>
  )
}
