import React from "react";
import { createContext, useState } from "react";



export const WebPlayerContext = createContext({
  currSong: "",
  setSong : (newSong : string)=> {}
});

export default function WebPlayerProvider({children}:{ children: React.ReactNode }) {
      
  const [currSong,setCurrSong] = useState<string>("");
  const [currImg,setCurrImg] = useState<string>("");

  function setSong(newSongLink: string) : void {
       setCurrSong(newSongLink);
  }
  const contextVal = {
    currSong : currSong,
    setSong : setSong
  }
 console.log(currSong)
  return (
    <WebPlayerContext.Provider value={contextVal}>
      {children}
    </WebPlayerContext.Provider>
  )
}