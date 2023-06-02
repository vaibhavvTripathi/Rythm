import ArtistCard from "@/components/ArtistCard";
import FollowedArtistsContainer from "@/components/FollowedArtistsContainer";
import TopCharts from "@/components/TopCharts";
import useDebounce from "@/hooks/useDebounce";
import { colors } from "@/theme/AppThemeProvider";
import { Box, Card, Container, IconButton, Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { WebPlayerContext } from "@/context/WebPlayerContext";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { PlaylistContext } from "@/context/PlaylistContext";
import ListPopup from "@/components/ListPopup";
import { motion } from "framer-motion";
import SearchSkeleton from "@/components/skeleton/SearchSkeleton";

const Search = () => {
  const { setSong } = useContext(WebPlayerContext);
  const [searchInput, setSearchInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>([]);
  const [page, setPage] = useState<number>(0);
  const debounceString = useDebounce(searchInput, 500);
  const { addSong } = useContext(PlaylistContext);
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
  console.log(loading);
  useEffect(() => {
    const token = Cookies.get("access_token");
    setLoading(true);
    const getSearchedSong = async (query: string): Promise<void> => {
      if (query === "") {
        setLoading(false);
        setSearchResult(undefined);

        return;
      }
      const data = await axios.post("../api/search/getSearchedItem", {
        token: token,
        query: query,
        offset: page,
      });
      setSearchResult(data.data.tracks?.items);
      setLoading(false);
      console.log(searchResult);
    };
    getSearchedSong(debounceString);
  }, [debounceString, page]);
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };
  const handlePageChangeForward = () => {
    setPage((prev) => prev + 10);
  };
  const handlePageChangeBackWards = () => {
    if (page >= 10) setPage((prev) => prev - 10);
  };
  if (loading) {
    return (
      <Container>
        <Typography
          variant="h2"
          sx={{ fontWeight: 600, color: colors.primary[700], my: 1 }}
        >
          🕵️‍♂️ Search Your Favourite Music Here ...
        </Typography>
        <input
          className={"customInput"}
          placeholder="Search Your Music Here.."
          type="text"
          value={searchInput}
          onChange={handleSearch}
        />
        <Typography
          variant="h5"
          sx={{ color: colors.greyAccent[600], my: 2, ml: 1, mb: 2 }}
        >
          {" "}
          Search Results for {debounceString} :
        </Typography>
        <SearchSkeleton />
      </Container>
    );
  }
  return (
    <>
      <Container sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography
          variant="h2"
          sx={{ fontWeight: 600, color: colors.primary[700], my: 1 }}
        >
          🕵️‍♂️ Search Your Favourite Music Here ...
        </Typography>
        <input
          className={"customInput"}
          placeholder="Search Your Music Here.."
          type="text"
          value={searchInput}
          onChange={handleSearch}
        />
        {!searchResult ? (
          <Typography
            variant="h5"
            sx={{ color: colors.greyAccent[500], textAlign: "center", mt: 2 }}
          >
            Type something in the search...
          </Typography>
        ) : (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h5"
                sx={{ color: colors.greyAccent[600], my: 1 }}
              >
                {" "}
                Search Results for {debounceString} :
              </Typography>
              <Box>
                <IconButton onClick={handlePageChangeBackWards}>
                  <ArrowBackIosIcon />
                </IconButton>
                {page / 10 + 1}
                <IconButton onClick={handlePageChangeForward}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            </Box>

            {searchResult.map((track: any, index: number) => {
              const artists = track.artists
                .map((item: any, index: number) => {
                  return item.name;
                })
                .join(", ");
              return (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: "0.125" }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card
                      key={index}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
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
                            setSong(
                              track.preview_url,
                              track.album.images[0].url,
                              track.name,
                              artists
                            );
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: colors.greyAccent[800],
                            }}
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
                </>
              );
            })}
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
              &quot;Without music, life would be a mistake. But with my singing,
              life would be a mistake too. 😅 !&quot;
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
          </>
        )}
      </Container>
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
      </Menu>
    </>
  );
};

export default Search;
