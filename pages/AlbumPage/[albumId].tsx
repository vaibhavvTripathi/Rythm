import AlbumBanner from "@/components/AlbumBanner";
import { colors } from "@/theme/AppThemeProvider";
import {
  Box,
  Card,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Paper } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { WebPlayerContext } from "@/context/WebPlayerContext";
import AlbumCard from "@/components/AlbumCard";
import AlbumSkeleton from "@/components/skeleton/AlbumSkeleton";
import ListPopup from "@/components/ListPopup";
import { motion } from "framer-motion";

const AlbumPage = () => {
  const router = useRouter();
  const { albumId } = router.query;
  console.log(router.query);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [albumObj, setAlbumObj] = useState<any>({});
  const [tracksArray, setTracksArray] = useState([]);
  const [artistAlbum, setArtistAlbum] = useState([]);
  const { setSong } = useContext(WebPlayerContext);

  useEffect(() => {
    setIsLoading(true);
    const token = Cookies.get("access_token");
    const getAlbum = async () => {
      const albumResponse = await axios.post("../api/albumPage/getAlbum", {
        token: token,
        id: albumId,
      });

      console.log(albumObj);
      await getArtistAlbum(albumResponse.data.artists[0].id);
      setAlbumObj(albumResponse.data);
      setTracksArray(albumResponse.data.tracks.items);
      setIsLoading(false);
    };
    const getArtistAlbum = async (id: string) => {
      const result = await axios.post("../api/artistsPage/getArtistAlbums", {
        id: id,
        market: "IN",
        limit: 10,
        offset: 0,
        token,
      });
      setArtistAlbum(result.data);
    };
    getAlbum();
  }, [router]);
  const [selectedSong, setSelectedSong] = useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedSong(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => {
    setIsOpen(!isOpen);
    handleClose();
  };
  if (isLoading) return <AlbumSkeleton />;
  return (
    <div>
      <Container>
        <ListPopup
          songId={selectedSong}
          isOpen={isOpen}
          toggle={(newVal: boolean) => setIsOpen(newVal)}
        />
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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: "0.125" }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          whileHover={{ scale: 1.02 }}
        >
          <Paper sx={{ display: "flex", gap: 2 }}>
            <img
              src={albumObj.images[0].url}
              style={{ display: "block", height: 350, width: 400 }}
              alt=""
            />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <Typography variant="h6" sx={{ color: colors.greyAccent[700] }}>
                {albumObj.album_type?.toUpperCase()}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography
                  variant="h1"
                  sx={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    width: "14em",
                    fontWeight: 600,
                  }}
                >
                  {albumObj.name}
                </Typography>
                <Typography
                  sx={{ color: colors.greyAccent[600], fontWeight: 600, mb: 2 }}
                >
                  {albumObj.label}
                </Typography>
                <Typography
                  sx={{ color: colors.greyAccent[700], fontWeight: 600 }}
                >
                  Artists :{" "}
                  {albumObj.artists.map((item: any) => item.name).toString()}
                </Typography>

                <Typography
                  sx={{ color: colors.greyAccent[700], fontWeight: 600 }}
                >
                  Release Date : {albumObj.release_date}
                </Typography>
                <Typography
                  sx={{ color: colors.greyAccent[700], fontWeight: 600 }}
                >
                  Total Tracks : {albumObj.total_tracks}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    mt: 1,
                    color: colors.greyAccent[700],
                    mb: 2,
                    pb: 2,
                  }}
                >
                  <a
                    href={albumObj.uri}
                    style={{
                      fontWeight: 700,
                      color: colors.greenAccent[500],
                      textDecoration: "none",
                    }}
                  >
                    Spotify Link
                  </a>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </motion.div>

        <Typography
          variant="h3"
          sx={{ color: colors.primary[600], fontWeight: 700, my: 5 }}
        >
          📙 All tracks of {albumObj.name} :
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mt: 3,
            pb: 5,
            borderBottom: `1px solid ${colors.greyAccent[300]}`,
          }}
        >
          {tracksArray.map((track: any, index) => {
            const artists = track.artists
              .map((item: any, index: number) => {
                return item.name;
              })
              .toString();
            return (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                transition={{ duration: "0.125" }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                whileHover={{ scale: 1.02 }}
                key={index}
              >
                <Card sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <img
                      src={albumObj.images[0].url}
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
                        setSong(track.preview_url);
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: colors.greyAccent[800] }}
                      >
                        {track.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: colors.greyAccent[600] }}
                      >
                        {artists}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton
                    onClick={(e) => handleClick(e, track.id as string)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Card>
              </motion.div>
            );
          })}
        </Box>
        <Typography
          variant="h3"
          sx={{ color: colors.primary[600], fontWeight: 700, my: 5 }}
        >
          🎸More albums from {albumObj.artists[0].name} :
        </Typography>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: "0.125" }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          whileHover={{ scale: 1.02 }}
        >
          <Box
            sx={{
              overflowX: "scroll",
              whiteSpace: "nowrap",
              "&::-webkit-scrollbar": {
                height: 0,
              },

              width: "100%",
              mx: "auto",
              p: 1,
              borderRadius: "10px",
              border: `1px solid ${colors.greyAccent[400]}`,
            }}
          >
            {artistAlbum.map((item: any, index: number) => {
              return <AlbumCard prop={item} key={index} />;
            })}
          </Box>
        </motion.div>

        <Typography
          variant="h5"
          sx={{
            mt: 4,
            pb: 1,
            fontWeight: 600,
            color: colors.primary[700],
            pt: 5,
            fontStyle: "italic",
            textAlign: "center",
            borderTop: `1px solid ${colors.greyAccent[200]}`,
          }}
        >
          &quot;Music is the wine that fills the cup of silence.&quot;
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            pb: 1,
            fontWeight: 600,
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          - Robert Fripp
        </Typography>
      </Container>
    </div>
  );
};

export default AlbumPage;
