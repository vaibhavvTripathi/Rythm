import Head from "next/head";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Cookie, Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import TrackCard from "@/components/TrackCard";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { colors } from "@/theme/AppThemeProvider";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Circular from "@/components/Circular";
import ArtistCard from "@/components/ArtistCard";
import FollowedArtistsContainer from "@/components/FollowedArtistsContainer";
import TopCharts from "@/components/TopCharts";
import TopChartCarousel from "@/components/TopChartCarousel";
import SongCard from "@/components/SongCard";
import recentTracks from "./api/recentTracks";
import FollowedArtistCard from "@/components/FollowedArtistComponent";

const inter = Inter({ subsets: ["latin"] });
type topTrack = {
  name: string;
  artists: string;
  image: string;
};

type topArtists = {
  id: string;
  image: string;
  name: string;
  type: string;
};

type followedArtist = {
  followers: number;
  genres: string;
  id: string;
  image: string;
  name: string;
  type: string;
};

export default function Home({ code }: { code: string }) {
  
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<string>("");
  const [topTracksArray, setTracksArray] = useState<topTrack[]>([]);
  const [topArtists, setTopArtists] = useState<topArtists[]>([]);
  const [followedArtists, setFollowedArtists] = useState<followedArtist[]>([]);
  const [newReleases, setNewReleases] = useState([]);
  const [recentPlay, setRecentPlay] = useState([]);
  const [recommendedPlay, setRecommendedPlay] = useState([]);

  const router = useRouter();

  var currentTime = new Date().getTime();


  useEffect(() => {
    const token = Cookies.get("access_token");

    const getJwt = async () => {
      console.log(token);
      const data : AxiosResponse<{jwtToken:string}> = await axios.post("/api/userName", {
        token: token,
      });
      const jwt = data.data.jwtToken
      Cookies.set("jwt_token",jwt)
    };

    const getTopTracks = async () => {
      const response = await axios.post("/api/topTracks", {
        token,
      });
      setTracksArray(response.data);
    };
    const getTopArtists = async () => {
      const response = await axios.post("/api/topArtists", {
        token,
      });
      setTopArtists(response.data);
    };

    const getFollowedArtist = async () => {
      const response = await axios.post("/api/followedArtists", {
        token,
      });
      setFollowedArtists(response.data);
    };

    const getNewRelease = async () => {
      const response = await axios.post("/api/newRelease", {
        token,
      });
      setNewReleases(response.data);
    };

    const getRecentTracks = async () => {
      const response = await axios.post("/api/recentTracks", {
        token,
      });
      setRecentPlay(response.data);
    };
    const getRecommended = async () => {
      const response = await axios.post("/api/billBoard", {
        token,
      });
    
      setRecommendedPlay(response.data);
    };
   console.log("running/...")
    const stack = async () => {
      await getJwt();
      await getTopTracks();
      await getTopArtists();
      await getFollowedArtist();
      await getNewRelease();
      await getRecentTracks();
      await getRecommended();

      setLoading(false);
    };
    stack();
  }, []);


  if (loading) return <Circular></Circular>;

  return (
    <>
    
      <Box>
        <Typography
          variant="h1"
          sx={{
            mb: 2,
            mt: 2,
            pb: 1,
            fontWeight: 600,
            color: colors.greyAccent[800],
            borderBottom : `1px solid ${colors.greyAccent[400]}`
          }}
        >
          <PlayCircleIcon
            sx={{
              fontSize:30,
              mr: 1,
              color: colors.secondary[500],
            }}
          />
        Latest Releases 🤰
        </Typography>
        <TopChartCarousel props={newReleases} />
        <Typography
          variant="h3"
          sx={{
            my: 3,
            borderBottom: `1px solid ${colors.greyAccent[300]}`,
            pb: 1,
            fontWeight: 600,
            color: colors.primary[700],
            mt: 5,
          }}
        >
          <PlayCircleIcon
            sx={{
              position: "relative",
              top: "3px",
              mr: 1,
              color: colors.secondary[500],
            }}
          />
          Your most listened tracks 🎧
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            columnGap: 1,
            rowGap: 2,
            mr: 4,
          }}
        >
          {topTracksArray.map((item: topTrack, index: number) => {
            return (
              <TrackCard
                key={index}
                name={item.name}
                artist={item.artists}
                image={item.image}
              />
            );
          })}
        </Box>
        <Typography
          variant="h3"
          sx={{
            my: 3,
            borderBottom: `1px solid ${colors.greyAccent[300]}`,
            pb: 1,
            fontWeight: 600,
            color: colors.primary[700],
            mt: 8,
          }}
        >
          <PlayCircleIcon
            sx={{
              position: "relative",
              top: "3px",
              mr: 1,
              color: colors.secondary[500],
            }}
          />
          Followed Artists 👓
        </Typography>
        <Box
          sx={{
            overflowX: "scroll",
            whiteSpace: "nowrap",
            "&::-webkit-scrollbar": {
              height: 0,
            },

            width: "85vw",
          }}
        >
          {followedArtists.map((item, index) => {
            return <FollowedArtistCard item={item} key={index} />;
          })}
        </Box>

        <Typography
          variant="h3"
          sx={{
            my: 3,
            borderBottom: `1px solid ${colors.greyAccent[300]}`,
            pb: 1,
            fontWeight: 600,
            color: colors.primary[700],
            mt: 8,
          }}
        >
          <PlayCircleIcon
            sx={{
              position: "relative",
              top: "3px",
              mr: 1,
              color: colors.secondary[500],
            }}
          />
          Recently Listened Tracks 🚶‍♂️
        </Typography>
        <Box
          sx={{
            overflowX: "scroll",
            whiteSpace: "nowrap",
            "&::-webkit-scrollbar": {
              height: 0,
            },
            width: "85vw",
          }}
        >
          {recentPlay.map((item: any, index: number) => {
            return <SongCard prop={item} key={index} />;
          })}
        </Box>
        <Typography
          variant="h3"
          sx={{
            my: 3,
            borderBottom: `1px solid ${colors.greyAccent[300]}`,
            pb: 1,
            fontWeight: 600,
            color: colors.primary[700],
            mt: 8,
          }}
        >
          <PlayCircleIcon
            sx={{
              position: "relative",
              top: "3px",
              mr: 1,
              color: colors.secondary[500],
            }}
          />
          Most visited artists 🤓
        </Typography>
        <Box
          sx={{
            overflowX: "scroll",
            whiteSpace: "nowrap",
            "&::-webkit-scrollbar": {
              height: 0,
            },

            width: "85vw",
          }}
        >
          {topArtists.map((item, index) => {
            return <ArtistCard item={item} key={index} />;
          })}
        </Box>

        <Typography
          variant="h3"
          sx={{
            my: 3,
            borderBottom: `1px solid ${colors.greyAccent[300]}`,
            pb: 1,
            fontWeight: 600,
            color: colors.primary[700],
            mt: 8,
          }}
        >
          <PlayCircleIcon
            sx={{
              position: "relative",
              top: "3px",
              mr: 1,
              color: colors.secondary[500],
            }}
          />
          Hot Tracks 🔥
        </Typography>
        <Box
          sx={{
            overflowX: "scroll",
            whiteSpace: "nowrap",
            "&::-webkit-scrollbar": {
              height: 0,
            },
            width: "85vw",
          }}
        >
          {recommendedPlay.map((item: any, index: number) => {
            return <SongCard prop={item} key={index} />;
          })}
        </Box>
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
          &quot;Good music doesn&apos;t have an expiration date, so let the funk play on
          👄 !&quot;
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
          - Chat GPT
        </Typography>
      </Box>
    </>
  );
}
