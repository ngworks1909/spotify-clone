import React, { memo} from 'react'
import SongMain from './SongMain';
import Bottom from './Bottom';
import Sidebar from './Sidebar';


const Songbar = memo( function SongBar() {
  return (
    <>
    <div className="home">
       <div className="subHome display-flex flex-column gap-10">
       <div className="subContainer display-flex">
       <div className="navibar"><Sidebar/></div>
       <div className="mein display-flex flex-column">
         <SongMain/>
       </div>
       </div>
       <div className="bottomContainer"><Bottom/></div>
       </div>
    </div>
    </>
  )
}
)
export default Songbar;
