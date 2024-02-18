import React from 'react'
import '../css/Card.css'
import { useRecoilValue } from 'recoil';
import { CardState } from '../states/CardState';
import { NavState } from '../states/NavState';
import { useNavigate } from 'react-router-dom';
import PlayIcon from '../logos/PlayIcon';

export default function Card({id,baseImg, name , description}) {
  const loading = useRecoilValue(CardState);
  const close = useRecoilValue(NavState);
  const navigate = useNavigate();
  
  return (
      <div className={`card display-flex flex-column cursor-pointer ${close && 'close'}`} onClick={(e)=>{
        e.preventDefault();
        const data = id + ',' + baseImg + ',' + name + ',' + description
        localStorage.setItem('data', data);
        navigate('/playlist');
      }} >
      {loading? <>
        <div className="card-skeleton-image skeleton"></div>
        <div className="card-content card-skeleton-content display-flex flex-column">
          <span className="skeleton-card-title skeleton"></span>
          <div className="card-break display-flex flex-column">
          <span className="skeleton-card-text skeleton"></span>
          <span className="skeleton-card-text skeleton"></span>
          </div>
        </div>
      </>:
      <><input type="image" src={baseImg} className='card-image' alt="" />
      <div className="card-content display-flex flex-column">
          <span className="card-title color-white">{name}</span>
          <span className="card-text">{description}</span>
      </div>
      <div className="card-play-button hover-translate">
        <PlayIcon/>
      </div>
      </>}
        
    </div>
  )
}
