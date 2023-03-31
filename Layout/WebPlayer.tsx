import { Box, Paper } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import Cookies from "js-cookie";
import { WebPlayerContext } from "@/context/WebPlayerContext";
import CircularIndeterminate from "@/components/Circular";

const WebPlayer = () => {
  const { currSong } = useContext(WebPlayerContext);
  console.log("inside webplayer", currSong);
  const webplayerStyles = {
    width: "100%",
    height: "50px",
    borderRadius: "5px",
    padding: "10px",
    margin: 0,
    
  };
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      console.log("hi");
      audioRef.current.play();
    }
  }, [currSong]);
  if (currSong === "") {
    <Paper variant="outlined" sx={{ padding: 0 }}>
      <audio style={webplayerStyles} controls />
    </Paper>;
  }
  return (
    <Paper variant="outlined" sx={{ padding: 0 }}>
      <audio ref={audioRef} src={currSong} style={webplayerStyles} controls />
    </Paper>
  );
};

export default WebPlayer;
