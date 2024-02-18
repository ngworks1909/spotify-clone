const uri = 'https://firebasestorage.googleapis.com/v0/b/spotify-a2696.appspot.com/o/1%2FIsolate%20-%20Mystery%20Ark.m4a?alt=media&token=169199c4-d1b0-402a-975e-bed0f044a3a7';
let curSong = new Audio(uri);
export const PlaySong = async({url,setPlay}) =>{
    if(curSong){
        curSong.pause()
    }
    if(!url) return;
    const song = new Audio(url);
    await song.play();
    setPlay(true);
    curSong = song;
}

export const pauseCurrent = async() => {
    if(curSong){
        await curSong.pause();
    }
}

export const playCurrent = async() =>{
    if(curSong){
        await curSong.play();
    }
}