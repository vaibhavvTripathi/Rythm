import axios, { AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  Box,
  Card,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { WebPlayerContext } from "@/context/WebPlayerContext";
import { colors } from "@/theme/AppThemeProvider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { PlaylistContext } from "@/context/PlaylistContext";

const SinglePlaylist = (props: any) => {
  const router = useRouter();
  const { setSong } = useContext(WebPlayerContext);
  const tracks = props.tracks;
  const { Playlist,deletePlaylist,deleteSong } = useContext(PlaylistContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("toggle")
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(props.id);
  const playlistId = router.query.id as string
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => {
    setIsOpen(!isOpen);
    console.log(props.id);
    deletePlaylist(playlistId);
    handleClose();
    
  };

  if (
    tracks === undefined ||
    tracks === null ||
    tracks.length == 0 ||
    tracks[0] === null
  ) {
    return (
      <>
        <Box sx={{ display: "flex", }}>
          <Typography
            variant="h2"
            sx={{
              my: 3,
              fontWeight: 600,
              textAlign: "center",
              pb: 1,
              width: "fit-content",
              mx: "auto",
              borderBottom : `1px solid ${colors.greyAccent[400]}`
            }}
          >
            🎵 {router.query.playlistid}
           
          </Typography>
        </Box>
        <Typography
          variant="h4"
          sx={{ color: colors.greyAccent[700], my: 2, textAlign: "center" }}
        >
          {"No songs available :("}{" "}
        </Typography>
      </>
    );
  }
  return (
    <>
      <Container>
        <Box sx={{ display: "flex", }}>
          <Typography
            variant="h2"
            sx={{
              my: 3,
              fontWeight: 600,
              textAlign: "center",
              pb: 1,
              width: "fit-content",
              mx: "auto",
            }}
          >
            🎵 {router.query.playlistid}
         
          </Typography>
          <IconButton onClick={(e) => handleClick(e)}>
              <MoreVertIcon sx={{ fontSize: "1.5em" }} />
            </IconButton>
        </Box>

        {tracks && (
          <Typography
            variant="h4"
            sx={{ color: colors.greyAccent[700], mb: 2 }}
          >
            List of songs :
          </Typography>
        )}

        {tracks?.map((item: any, index: number) => {
          const artists = item.artists
            .map((item: any, index: number) => {
              return item.name;
            })
            .join(", ");
          return (
            <Card
              key={index}
              sx={{ display: "flex", justifyContent: "space-between", my: 1 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <img
                  src={item.album.images[0].url}
                  style={{
                    backgroundColor: "grey",
                    objectFit: "cover",
                    height: 60,
                    width: 60,
                  }}
                  alt="artist"
                />
                <Box
                  style={{ textDecoration: "none", cursor: "pointer" }}
                  onClick={() => {
                    setSong(item.preview_url);
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: colors.greyAccent[800],
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: colors.greyAccent[600] }}
                  >
                    {artists}
                  </Typography>
                </Box>
              </Box>
              <IconButton onClick={()=>deleteSong(item.id,playlistId)}>
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Card>
          );
        })}
        <Typography
          variant="h4"
          sx={{ color: colors.greyAccent[700], my: 2, textAlign: "center" }}
        >
          {tracks ? "Copyright @2023" : "No songs available :("}{" "}
        </Typography>
      </Container>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={toggle}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Delete this playlist
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
export async function getServerSideProps({
  query,
}: {
  query: { token: string; songs: string; id: string };
}) {
  try {
    const songs = query.songs;
    const token: string = query.token;

    const apiResponse = await axios.get(
      "https://api.spotify.com/v1/tracks?ids=" + songs,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return {
      props: apiResponse.data,
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
}

export default SinglePlaylist;
