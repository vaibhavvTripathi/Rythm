import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { colors } from "@/theme/AppThemeProvider";
import { PlaylistContext } from "@/context/PlaylistContext";
import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
import { motion } from "framer-motion";

interface propType {
  isOpen: boolean;
  toggle: (newVal: boolean) => void;
  songId: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ListPopup = ({ isOpen, toggle, songId }: propType) => {
  const { addSong, Playlist } = useContext(PlaylistContext);
  const [name, setName] = useState<string>("");
  const uuid: string = crypto.randomUUID().toString();
  const handleClose = () => {
    setName("");
    toggle(!isOpen);
  };
  const handleAdd = async (playlistId: string, songId: string) => {
    await addSong(playlistId, songId);
    handleClose();
  };
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
      sx={{ p: 3,pb:2 }}
    >
      <Container sx={{ width: "500px", height: "500px", px: 0 }}>
        <Typography
          variant="h2"
          sx={{ fontWeight: 600, textAlign: "center", my: 2 }}
        >
          Select Playlist
        </Typography>
        {Playlist.playlists.map((item, index) => {
          return (
            <motion.div 
            whileHover={{scale : 1.025,marginBottom:"1.75em",marginTop:"1.75em"}}
            style ={{marginBottom:"1.2em"}}
            key={index}>
              <Paper
                elevation={3}
                sx={{ width: "100%", p: 2, cursor: "pointer" }}
              >
                <Typography
                  onClick={() => handleAdd(item.id, songId)}
                  sx={{}}
                  variant="h5"
                >
                  {index + 1}
                  {"."} {item.name}
                </Typography>
              </Paper>
            </motion.div>
          );
        })}
        <Typography variant="subtitle1" sx={{color:colors.greyAccent[500],fontWeight:600,textAlign:"center"}}>
            Copyright @2022
        </Typography>
      </Container>
    </Dialog>
  );
};

export default ListPopup;
