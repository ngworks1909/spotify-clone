import React, { memo, useEffect, useState } from 'react'
import Card from '../handlers/Card'
import '../css/CardList.css'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CardState } from '../states/CardState';
import { Host } from '../states/Host';

const CardList = memo(function CardList() {
  const [playlists, setPlaylists] = useState(null);
  const loading = useRecoilValue(CardState);
  const setLoading = useSetRecoilState(CardState);
  const host = useRecoilValue(Host);
  const fetchPlay = async() => {
    const response = await fetch(`http://${host}:3001/api/playlists/fetchPlaylists`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                }
    });
    const {success, data} = await response.json();
    if(success){
      setPlaylists(data);
    }
    setLoading(false);
  }

  useEffect(()=>{
    fetchPlay();
    return ()=>{
      fetchPlay();
    }
    // eslint-disable-next-line
  },[])
  return (
    <>
    { <div className='card-list display-flex flex-column gap-1'>
    <div className="card-list-title color-white">Playlists</div>
     <div className="card-group">
     {loading ? <>
     <Card />
     <Card />
     <Card />
     <Card />
     <Card />
     <Card />
     <Card />
     <Card />
     <Card />
     <Card />
     <Card />
     <Card />
     </> : <>{playlists?.map((playlist) => {
      return <Card key={playlist._id} id = {playlist._id} baseImg = {playlist.baseImg} name = {playlist.name} description = {playlist.description} />
     })}
     </>}
     </div>
    </div>}
    </>
  )
}
)
export default CardList
