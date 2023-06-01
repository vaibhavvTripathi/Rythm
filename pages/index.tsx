import Head from "next/head";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Cookie, Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import TrackCard from "@/components/TrackCard";
import { Box } from "@mui/system";
import { Menu, MenuItem, Typography } from "@mui/material";
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
import { PlaylistContext } from "@/context/PlaylistContext";
import IndexSkelton from "@/components/skeleton/IndexSkeleton";
import ListPopup from "@/components/ListPopup";
import { motion } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });
type topTrack = {
  name: string;
  artists: string;
  image: string;
  preview: string;
  id: string;
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
  const [selectedSong, setSelectedSong] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
    console.log("hi");
    setIsOpen(!isOpen);
    handleClose();
  };

  const getId = (id: string): void => {
    setSelectedSong(id);
    toggle();
  };
  const router = useRouter();

  var currentTime = new Date().getTime();

  useEffect(() => {
    const token = Cookies.get("access_token");

    const getTopTracks = async () => {
      const response = await axios.post("/api/topTracks", {
        token,
      });
      console.log(response.data);
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
    console.log("running/...");
    const stack = async () => {
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

  if (loading) return <IndexSkelton />;

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
            borderBottom: `1px solid ${colors.greyAccent[400]}`,
          }}
        >
          <PlayCircleIcon
            sx={{
              fontSize: 30,
              mr: 1,
              color: colors.secondary[500],
            }}
          />
          Latest Releases 🤰
        </Typography>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          transition={{ duration: "0.125" }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
        >
          <TopChartCarousel props={newReleases} />
        </motion.div>

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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: "0.125" }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
        >
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
                  preview={item.preview}
                  id={item.id}
                />
              );
            })}
          </Box>
        </motion.div>

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
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          transition={{ duration: "0.125" }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
        >
          <Box
            sx={{
              overflowX: "scroll",
              whiteSpace: "nowrap",
              "&::-webkit-scrollbar": {
                height: 0,
              },
              width: "85vw",
              mx: "auto",
            }}
          >
            {followedArtists.map((item, index) => {
              return <FollowedArtistCard item={item} key={index} />;
            })}
          </Box>
        </motion.div>

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
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          transition={{ duration: "0.125" }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
        >
          <Box
            sx={{
              overflowX: "scroll",
              whiteSpace: "nowrap",
              "&::-webkit-scrollbar": {
                height: 0,
              },
              width: "85vw",
              mx: "auto",
            }}
          >
            {recentPlay.map((item: any, index: number) => {
              return (
                <SongCard
                  handleId={getId}
                  setAcnh={setAnchorEl}
                  prop={item}
                  key={index}
                />
              );
            })}
          </Box>
        </motion.div>

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
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          transition={{ duration: "0.125" }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
        >
          <Box
            sx={{
              overflowX: "scroll",
              whiteSpace: "nowrap",
              "&::-webkit-scrollbar": {
                height: 0,
              },

              width: "85vw",
              mx: "auto",
            }}
          >
            {topArtists.map((item, index) => {
              return <ArtistCard item={item} key={index} />;
            })}
          </Box>
        </motion.div>

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
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          transition={{ duration: "0.125" }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
        >
          <Box
            sx={{
              overflowX: "scroll",
              whiteSpace: "nowrap",
              "&::-webkit-scrollbar": {
                height: 0,
              },
              width: "85vw",
              mx: "auto",
            }}
          >
            {recommendedPlay.map((item: any, index: number) => {
              return (
                <SongCard
                  handleId={getId}
                  toggle={toggle}
                  prop={item}
                  key={index}
                />
              );
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
          &quot;Good music doesn&apos;t have an expiration date, so let the funk
          play on 👄 !&quot;
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
      </Box>
    </>
  );
}
