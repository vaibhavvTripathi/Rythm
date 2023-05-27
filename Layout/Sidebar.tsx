import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { motion } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { Button, DialogTitle, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import MenuIcon from "@mui/icons-material/Menu";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { colors } from "@/theme/AppThemeProvider";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import PlaylistPopup from "./PlaylistPopup";
import { PlaylistContext } from "@/context/PlaylistContext";
import Cookies from "js-cookie";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useRouter } from "next/router";

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
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Sidebar = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mobile, setMobile] = useState<boolean>(false);
  const { getUsersPlaylist, playlistArray } = useContext(PlaylistContext);
  const router = useRouter();
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const path = router.pathname;
    if (path === "/Libraries/Libraries") {
      setCurrentTab(2);
    } else if (path === "/Search/Search") {
      setCurrentTab(1);
    } else {
      setCurrentTab(0);
    }
  }, [router]);

  return (
    <motion.div
      animate={{ width: !mobile ? "200px" : "50px" }}
      style={{
        borderRight: `1px solid ${colors.greyAccent[300]}`,
        height: "100vh",
        overflow: "scroll",
      }}
      className="scrollbar"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <IconButton
          sx={{ color: colors.greyAccent[800] }}
          onClick={() => setMobile(!mobile)}
        >
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
                  color: "black",
                  fontWeight: 600,
                  borderRight: index === currentTab ? "4px solid black" : "",
                  borderBottom: "1px solid #d6d6d6",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  borderRadius: "5px",
                }}
              >
                {item.icon} {!mobile && item.name}
              </Link>
            </Box>
          );
        })}
       
      </Box>
      <PlaylistPopup
          isOpen={isOpen}
          toggle={(newVal: boolean) => setIsOpen(newVal)}
        />
      {/* <Box
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
        <Button
          sx={{
            p: 0,
            width: "50px",
            display: "flex",
            alignItems: "start",
            fontSize: 18,
            fontWeight: 600,
            color: "black",
            border:"1px solid black"
          }}
          onClick={() => toggle()}
        >
          <AddIcon sx={{color: "black",mx:"auto" }} />
          {!mobile && "Create Playlist"}
        </Button>
       
      </Box> */}
      <Typography
        sx={{
          textAlign: "left",
          fontWeight: 600,
          ml: 1,
          mt: 5,
          display: !mobile ? "flex" : "none",
        }}
        variant="h4"
      >
        #My Playlists
      </Typography>
      <Box
        sx={{
          display: !mobile ? "flex" : "none",
          alignItems: "center",
          flexDirection: "column",
          gap: 1,
          mt: 1,
          mb: 1,
        }}
      >
        {playlistArray?.map((item: any, index: any) => {
          const playlistId = item.id;
          return (
            <Link
              key={index}
              href={`/playlistPage/${playlistId}`}
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textDecoration: "none",
                fontSize: 15,
                color: colors.greyAccent[800],

                width: "90%",
              }}
            >
              <PlayArrowIcon sx={{ position: "relative", top: "6px" }} />{" "}
              {item.name}
            </Link>
          );
        })}
      </Box>
    </motion.div>
  );
};

export default Sidebar;
