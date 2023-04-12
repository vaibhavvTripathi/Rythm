import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Container, Paper } from "@mui/material";
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

const ArtistPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [artistData, setArtistData] = useState<any>({});
  const [topTracksArtist, setTopTracksArtist] = useState([]);
  const [releatedArtistData, setReleatedArtistData] = useState([]);
  const [isRefreshed, setIsRefreshed] = useState<boolean>(false);
  const [artistAlbum, setArtistAlbum] = useState([]);
  const { setSong } = useContext(WebPlayerContext);
  const { isFollowed, checkIsFollowed,followArtist,unFollowArtist} = useContext(ArtistPageContext);
  console.log("fdsfdfsfsufbhsuofsdhbf", isFollowed);
  const handleToggle = () => {
    setIsRefreshed((prev) => !prev);
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
  if (isLoading) return <>Loading...</>;
  return (
    <>
      <Container sx={{}}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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
              onClick={()=>unFollowArtist(artistId as string)}
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
              onClick={()=>followArtist(artistId as string)}
            >
              <Typography variant="h6">FOLLOW</Typography>
            </Button>
          )}
        </Box>
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
              <Card
                key={index}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
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
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Card>
            );
          })}
        </Box>
        <Typography
          variant="h3"
          sx={{ color: colors.primary[700], fontWeight: 700, mt: 2, mb: 2 }}
        >
          💽 Albums
        </Typography>
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
        <Typography
          variant="h3"
          sx={{ color: colors.primary[700], fontWeight: 700, mt: 4, mb: 2 }}
        >
          👪 Related Artists
        </Typography>
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
      </Container>
    </>
  );
};

export default ArtistPage;
