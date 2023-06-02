import { Box, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import Cookies from "js-cookie";
import { WebPlayerContext } from "@/context/WebPlayerContext";
import CircularIndeterminate from "@/components/Circular";
import { colors } from "@/theme/AppThemeProvider";

const WebPlayer = () => {
  const { currSong,currImg,currSongTitle,currArtist} = useContext(WebPlayerContext);
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
 console.log("rererererere",currImg)
  return (
    <Paper variant="outlined" sx={{ padding: 0,display:"flex",alignItems:"center" }}>
      <img src={(currImg==""? "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Solid_grey.svg/2048px-Solid_grey.svg.png":currImg)} style={{width:100,height:100,borderRadius:"2px"}} alt="" />
      <Box sx={{width:"100%"}}>
       <Typography variant="h5" sx={{fontWeight:600,ml:3,mt:1,color:colors.greyAccent[800],p:0}}>
         {currSongTitle===""?"--Select the song--":currSongTitle}
       </Typography>
       <Typography variant="subtitle1" sx={{ml:3,color:colors.greyAccent[600],p:0}}>
         {currArtist===""?"--artist name--":currArtist}
       </Typography>
       <audio ref={audioRef} src={currSong} style={webplayerStyles} controls />
      </Box>
   
    </Paper>
  );
};

export default WebPlayer;
