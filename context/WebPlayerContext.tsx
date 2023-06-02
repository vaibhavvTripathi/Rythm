import React from "react";
import { createContext, useState } from "react";



export const WebPlayerContext = createContext({
  currSong: "",
  currImg : "", 
  currSongTitle : "",
  currArtist : "",
  setSong : (newSongLink : string,newImg : string,newSongTitle : string,newArtist:string)=> {}
});

export default function WebPlayerProvider({children}:{ children: React.ReactNode }) {
      
  const [currSong,setCurrSong] = useState<string>("");
  const [currImg,setCurrImg] = useState<string>("");
  const [currTitle,setCurrTitle] = useState<string>("");
  const [currArtist, setCurrArtist] = useState<string>("")
  function setSong(newSongLink: string,newImg : string,newSongTitle: string,newArtist : string) : void {
      if(newSongLink===null || undefined || "") {
        alert("Song for this link is not provided by Spotify Api")
        return;
      }
       setCurrSong(newSongLink);
       setCurrImg(newImg);
       setCurrTitle(newSongTitle);
       setCurrArtist(newArtist);
  } 
  const contextVal = {
    currSong : currSong,
    currImg : currImg,
    currSongTitle : currTitle,
    currArtist : currArtist,
    setSong : setSong
  }
  return (
    <WebPlayerContext.Provider value={contextVal}>
      {children}
    </WebPlayerContext.Provider>
  )
}