import { atom } from "recoil";

export const Player = atom({
    key: 'Player',
    default: {songImg: 'https://i.scdn.co/image/ab67616d00004851ae10485d194d9990c83734ae', name: 'Isolate', singer: 'Mystery Ark'}
})