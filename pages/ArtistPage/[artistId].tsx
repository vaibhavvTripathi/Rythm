import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Container, Menu, MenuItem, Paper } from "@mui/material";
import { Avatar } from "@mui/material";
import { Box } from "@mui/material";
import { colors } from "@/theme/AppThemeProvider";
const numeral = require("numeral");
import Link from "next/link";
import { Card, Typography, CardMedia } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { WebPlayerContext } from "@/context/WebPlayerContext";
import ArtistCard from "@/components/ArtistCard";
import RelatedArtistCard from "@/components/RelatedArtistCard";
import AlbumCard from "@/components/AlbumCard";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { ArtistPageContext } from "@/context/ArtistPageContext";
import ArtistSkeleton from "@/components/skeleton/ArtistSkeleton";
import ListPopup from "@/components/ListPopup";
import { motion } from "framer-motion";

const ArtistPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [artistData, setArtistData] = useState<any>({});
  const [topTracksArtist, setTopTracksArtist] = useState([]);
  const [releatedArtistData, setReleatedArtistData] = useState([]);
  const [isRefreshed, setIsRefreshed] = useState<boolean>(false);
  const [artistAlbum, setArtistAlbum] = useState([]);
  const { setSong } = useContext(WebPlayerContext);
  const { isFollowed, checkIsFollowed, followArtist, unFollowArtist } =
    useContext(ArtistPageContext);
  const [selectedSong, setSelectedSong] = useState<string>("");
  const handleToggle = () => {
    setIsRefreshed((prev) => !prev);
  };
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
  const router = useRouter();
  const { artistId } = router.query;
  useEffect(() => {
    checkIsFollowed(artistId as string);
  }, [router]);
  useEffect(() => {
    setIsLoading(true);
    const token = Cookies.get("access_token");
    const getArtist = async () => {
      const result = await axios.post("../api/artistsPage/getArtist", {
        token,
        artistId,
      });
      setArtistData(result.data);
    };
    const topTracksArtist = async () => {
      const result = await axios.post("../api/artistsPage/getSpecifiedArtist", {
        token,
        id: artistId,
      });
      setTopTracksArtist(result.data.tracks);
    };
    const getRelatedArtist = async () => {
      const result = await axios.post("../api/artistsPage/getRelatedArtists", {
        token,
        id: artistId,
      });
      setReleatedArtistData(result.data);
    };

    const getArtistAlbum = async () => {
      const result = await axios.post("../api/artistsPage/getArtistAlbums", {
        id: artistId,
        market: "IN",
        limit: 10,
        offset: 0,
        token,
      });
      setArtistAlbum(result.data);
    };

    const stack = async () => {
      await getArtist();
      await topTracksArtist();
      await getRelatedArtist();
      await getArtistAlbum();
      setIsLoading(false);
    };
    stack();
  }, [router]);
  if (isLoading) return <ArtistSkeleton />;
  return (
    <>
      <Container sx={{}}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: "0.125" }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          whileHover={{ scale: 1.02 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
            <Avatar
              src={artistData?.images[0].url}
              sx={{ height: 150, width: 150 }}
            />
            {isFollowed ? (
              <Button
                sx={{
                  display: "block",
                  mx: "auto",
                  color: colors.greenAccent[500],
                  border: `1px solid ${colors.greenAccent[500]}`,
                  mt: 2,
                  mb: 0,
                  "&:hover": { backgroundColor: "white" },
                }}
                onClick={() => unFollowArtist(artistId as string)}
              >
                <Typography variant="h6">FOLLOWING</Typography>
              </Button>
            ) : (
              <Button
                sx={{
                  display: "block",
                  mx: "auto",
                  color: colors.greenAccent[500],
                  border: `1px solid ${colors.greenAccent[500]}`,
                  mt: 2,
                  mb: 0,
                  "&:hover": { backgroundColor: "white" },
                }}
                onClick={() => followArtist(artistId as string)}
              >
                <Typography variant="h6">FOLLOW</Typography>
              </Button>
            )}
          </Box>
        </motion.div>

        <Typography
          variant="h4"
          sx={{ mt: 2, fontWeight: 600, textAlign: "center" }}
        >
          {artistData.name}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{ textAlign: "center", color: colors.greyAccent[700], mt: 1 }}
        >
          👥 Followers :{" "}
          <span style={{ fontWeight: 700 }}>
            {numeral(artistData.followers.total).format("0.0a")}
          </span>
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ textAlign: "center", color: colors.greyAccent[700] }}
        >
          ⛏ Type :{" "}
          <span style={{ fontWeight: 700 }}>
            {artistData.type.toUpperCase()}
          </span>
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            color: colors.greyAccent[700],
            borderBottom: `1px solid ${colors.greyAccent[200]}`,
            mb: 2,
            pb: 2,
          }}
        >
          🔗 Link :{" "}
          <a
            href={artistData.uri}
            style={{
              fontWeight: 700,
              color: colors.greenAccent[500],
              textDecoration: "none",
            }}
          >
            Spotify Link
          </a>
        </Typography>

        <Typography
          variant="h3"
          sx={{ color: colors.primary[700], fontWeight: 700, mt: 2 }}
        >
          🧢 Top Tracks of {artistData.name}
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
          {topTracksArtist.map((track: any, index) => {
            const artists = track.artists
              .map((item: any, index: number) => {
                return item.name;
              })
              .toString();
            return (
              <motion.div
                initial={{ opacity: 0, x: 50, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: "0.125",
                }}
                whileHover={{ scale: 1.03 }}
                key={index}
              >
                <Card sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <img
                      src={track.album.images[0].url}
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
                        setSong(track.preview_url,track.album.images[0].url,track.name);
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
          sx={{ color: colors.primary[700], fontWeight: 700, mt: 2, mb: 2 }}
        >
          💽 Albums
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
          variant="h3"
          sx={{ color: colors.primary[700], fontWeight: 700, mt: 4, mb: 2 }}
        >
          👪 Related Artists
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
            {releatedArtistData.map((item, index) => {
              return (
                <RelatedArtistCard
                  // refreshFunction={handleToggle}
                  item={item}
                  key={index}
                />
              );
            })}
          </Box>
        </motion.div>
      </Container>
    </>
  );
};

export default ArtistPage;
