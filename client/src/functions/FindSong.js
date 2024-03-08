export const FindSong = async({songId, host}) =>{
    const response = await fetch(`https://${host}/api/playlists/fetchTrack/${songId}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                }
    });
    const {success, url} = await response.json();
    if(success){
        return url;
    }
    return '';
}