import {
  Box,
  Button,
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

interface props {
  isOpen: boolean;
  toggle: (newVal: boolean) => void;
}
interface userObj {
    display_name : string;
    email : string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PlaylistPopup = ({ isOpen, toggle }: props) => {

  const {createPlaylist} = useContext(PlaylistContext)
  const[name,setName] = useState<string>("");
  const uuid : string = crypto.randomUUID().toString();
  const handleClose = () => {
    setName("")
    toggle(!isOpen);
  };
 const handleCreate = async (playlistName : string) => {
   await createPlaylist(playlistName)
    handleClose()
  }
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
      >
        <Paper sx={{ p: 1, minWidth: 400 }}>
          <Typography variant="h2" sx={{ fontWeight: 600 ,mb: 2,
              pb: 1,
              borderBottom: `1px solid ${colors.greyAccent[400]}`,}}>
            👶 Create Playlists...
          </Typography>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="h4" sx={{ color: colors.greyAccent[800] }}>
              🎸 Name the playlist :
              </Typography>
              <TextField value={name} onChange={(e)=>setName(e.target.value)} sx={{ p: 0 }}></TextField>
            </Box>
          </Box>
          <Button onClick={()=>handleCreate(name)} variant="contained" sx={{ p: 1, mt: 2, fontSize: "1.2em" }} >
            + Create Playlist
          </Button>
          <Typography
            variant="subtitle2"
            sx={{ color: colors.greyAccent[600], textAlign: "center",mt:2 }}
          >
            Cpoyright @2022.
          </Typography>
        </Paper>
      </Dialog>
    </>
  );
};

export default PlaylistPopup;
