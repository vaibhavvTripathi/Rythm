import axios, { AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { Box, Card, Container, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { WebPlayerContext } from "@/context/WebPlayerContext";
import { colors } from "@/theme/AppThemeProvider";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const SinglePlaylist = (props: any) => {
  const router = useRouter();
  const { setSong } = useContext(WebPlayerContext);
  const tracks = props.tracks;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);

  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 
  const[isOpen,setIsOpen] = useState<boolean>(false)
  const toggle = () => {
    setIsOpen(!isOpen)
    handleClose();
  }
  if (tracks === undefined || tracks.length == 0) {
    return (
      <>
        <Typography
          variant="h4"
          sx={{ color: colors.greyAccent[700], my: 2, textAlign: "center" }}
        >
          There are no songs to display
        </Typography>
      </>
    );
  }
  return (
    <>
      <Container>
        <Box sx={{display:"flex",gap:3}}>
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
            <IconButton onClick={e=>handleClick(e)}>
              <MoreVertIcon sx={{fontSize:"1.5em"}} />
            </IconButton>
          </Typography>
        </Box>

        <Typography variant="h4" sx={{ color: colors.greyAccent[700], mb: 2 }}>
          List of songs :
        </Typography>
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
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Card>
          );
        })}
        <Typography
          variant="h4"
          sx={{ color: colors.greyAccent[700], my: 2, textAlign: "center" }}
        >
          Copyright @2023
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
            Add to Playlist
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Like this Song
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
export async function getServerSideProps({
  query,
}: {
  query: { token: string; songs: Array<string> };
}) {
  try {
    const songs: Array<string> = query.songs;
    const token: string = query.token;
    const songQueries = songs.join(",");
    const apiResponse = await axios.get(
      "https://api.spotify.com/v1/tracks?ids=" + songQueries,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log("hi");
    return {
      props: apiResponse.data,
    };
  } catch (err) {
    return {
      props: {},
    };
  }
}

export default SinglePlaylist;
