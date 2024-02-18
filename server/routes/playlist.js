const express = require("express");
const router = express.Router();
const { db} = require("../firebase");

const { collection, getDocs, getDoc, doc } = require("firebase/firestore");



router.get('/fetchPlaylists', async(req, res) => {
    let success = true;
    try {
        const response = await getDocs(collection(db, "playlists"));
        const data = [];
        response.forEach((document) => {
            data.push(document.data())
          });
        res.json({success, data})
    } catch (error) {
        success = false
        res.status(500).json({success, error: 'Internal server error...'})
    }

})

router.get('/fetchSongs/:id', async(req, res) => {
    let success = true;
    try {
        const response = await(getDoc(doc(db, 'songItems', req.params.id)));
        let songlist = [];
        if(response.exists()){
           const data = response.data();
           for(let key in data){
            songlist.push(data[key]);
           }
        }
        res.json({success, songlist});
    } catch (error) {
        success = false
        res.status(500).json({success, error: 'Internal server error...'})
    }
});

router.get('/fetchTrack/:id', async(req, res) => {
    let success = true;
    const response = await(getDoc(doc(db, 'songs', `${req.params.id}`)));
    if(response.exists()){
        const data = response.data();
        const url = data.url;
        res.json({success, url});
    }
    else{
        success = false;
        res.status(500).json({success, error: 'Internal server error...'});
    }
})

module.exports = router;