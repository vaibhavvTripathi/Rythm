import React from "react";
import { createContext, useState } from "react";



export const WebPlayerContext = createContext({
  currSong: "",
  currImg : "", 
  currSongTitle : "",
  setSong : (newSongLink : string,newImg : string,newSongTitle : string)=> {}
});

export default function WebPlayerProvider({children}:{ children: React.ReactNode }) {
      
  const [currSong,setCurrSong] = useState<string>("");
  const [currImg,setCurrImg] = useState<string>("");
  const [currTitle,setCurrTitle] = useState<string>("");

  function setSong(newSongLink: string,newImg : string,newSongTitle: string) : void {
      if(newSongLink===null || undefined || "") {
        alert("Song for this link is not provided by Spotify Api")
        return;
      }
       setCurrSong(newSongLink);
       setCurrImg(newImg);
       setCurrTitle(newSongTitle);
  } 
  const contextVal = {
    currSong : currSong,
    currImg : currImg,
    currSongTitle : currTitle,
    setSong : setSong
  }
  return (
    <WebPlayerContext.Provider value={contextVal}>
      {children}
    </WebPlayerContext.Provider>
  )
}