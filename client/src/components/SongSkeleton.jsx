import React from 'react'
import '../css/SongSkeleton.css'

export default function SongSkeleton() {
  return (
    <div className='song-skeleton-grid'>
          <div className="skeleton-song-number-block display-flex align-center">
          <div className="skeleton-song-number skeleton"></div>
          </div>
        <div className="skeleton-song-container display-flex gap-10">
            <div className="skeleton-song-image skeleton"></div>
            <div className="skeleton-song-wrapper display-flex flex-column gap-10">
                <div className="skeleton-song-name skeleton"></div>
                <div className="skeleton-song-singer skeleton"></div>
            </div>
        </div>
        <div className="song-skeleton-album-block display-flex align-center">
        <div className="skeleton-song-album skeleton"></div>
        </div>
        <div className="song-skeleton-duration-block display-flex align-center">
        <div className="skeleton-song-duration skeleton"></div>
        </div>
    </div>
  )
}
