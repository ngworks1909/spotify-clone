import { useRecoilValue, useSetRecoilState } from 'recoil';
import '../css/SongTop.css'
import React, { useEffect } from 'react'
import { PlayState } from '../states/PlayState';
import design from '../assets/spdesign.png'

export default function SongTop() {
    const play = useRecoilValue(PlayState);
    const setPlay = useSetRecoilState(PlayState);
    useEffect(()=>{
        const data = localStorage.getItem('data');
        const items = data.split(',');
        setPlay({id:items[0],baseImg: items[1], name: items[2], description: items[3]});
        // eslint-disable-next-line
    },[])
  return (
    <div className={`song-top display-flex song-top-${play.id}`}>
      {/* {play.baseImg} {play.name} {play.description} */}
      <div className="image-box display-flex flex-column">
       <input type="image" src={play.baseImg} className='song-top-image' alt="" />
      </div>
      <div className="song-top-contents display-flex flex-column">
        <span className='color-white playlist-text'>Playlist</span>
        <h1 className='color-white song-top-name'>{play.name}</h1>
        <span className='song-top-description'>{play.description}</span>
        <div className="song-top-bottom display-flex align-center gap-5">
          <input type="image" className='song-top-design' src={design} alt="" />
          <span className='song-top-final-text color-white'>Spotify . 10 songs</span>
        </div>
      </div>
    </div>
  )
}

