import React, { useState } from "react";
import { Box } from "@mui/system";
import { motion } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { Button, DialogTitle, Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import MenuIcon from "@mui/icons-material/Menu";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { colors } from "@/theme/AppThemeProvider";
import Slide from '@mui/material/Slide';
import { TransitionProps } from "@mui/material/transitions";
import PlaylistPopup from "./PlaylistPopup";

const routes = [
  {
    path: "/",
    name: "Home",
    icon: <HomeIcon sx={{ fontSize: 30 }} />,
  },
  {
    path: "/Search/Search",
    name: "Search",
    icon: <SearchIcon sx={{ fontSize: 30 }} />,
  },
  {
    path: "/Libraries/Libraries",
    name: "Libraries",
    icon: <CollectionsBookmarkIcon sx={{ fontSize: 30 }} />,
  },
];

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Sidebar = () => {
 
const[isOpen,setIsOpen] = useState<boolean>(false)
const toggle = () => {
  setIsOpen(!isOpen)
}

  return (
    <motion.div
      animate={{ width: "250px" }}
      style={{ borderRight: "1px solid grey" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <IconButton sx={{ color: colors.primary[500] }}>
          <MenuIcon sx={{ fontSize: 35 }} />
        </IconButton>
      </Box>

      <Box sx={{ ml: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        {routes.map((item, index) => {
          return (
            <Box key={index}>
              <Link
                href={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  textDecoration: "none",
                  fontSize: 20,
                  color: colors.primary[700],
                  fontWeight: 600,
                }}
              >
                {item.icon} {item.name}
              </Link>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          mx: 1,
          mt: 5,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          pb: 2,
          borderBottom: "1px solid rgb(202, 197, 197)",
        }}
      >
        <Link
          href={"#"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            textDecoration: "none",
            fontSize: 20,
            color: colors.primary[600],
            fontWeight : 600
          }}
        >
          <FavoriteIcon />
          Liked Songs
        </Link>
        <Button
          sx={{
            pl: 0,
            width: "fit-content",
            display: "flex",
            alignItems: "start",
            fontSize: 18,
            fontWeight : 600
          }}
          onClick = {()=> toggle()}
        >
          <AddIcon sx={{ position: "relative", top: "6px" }} />
          Create Playlist
        </Button>
        <PlaylistPopup isOpen={isOpen} toggle={(newVal:boolean)=>setIsOpen(newVal)}/>
      </Box>
      
    </motion.div>
  );
};

export default Sidebar;
