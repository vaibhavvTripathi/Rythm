import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Container, Paper } from "@mui/material";
import { Avatar } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { colors } from "@/theme/AppThemeProvider";
const numeral = require("numeral");
import Link from "next/link";

const ArtistPage = () => {
  const router = useRouter();
  const { artistId } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [artistData, setArtistData] = useState<any>({});
  console.log(artistData);
  useEffect(() => {
    const token = Cookies.get("access_token");
    const getArtist = async () => {
      const result = await axios.post("../api/artistsPage/getArtist", {
        token,
        artistId,
      });
      setArtistData(result.data);
      setIsLoading(false);
    };
    getArtist();
  }, []);
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
      </Container>
    </>
  );
};

export default ArtistPage;
