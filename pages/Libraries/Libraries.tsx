import React, { useContext, useState } from "react";
import PlaylistPopup from "@/Layout/PlaylistPopup";
import { Box, Button, Container, Typography } from "@mui/material";
import ArtistSkeleton from "@/components/skeleton/ArtistSkeleton";
import AlbumSkeleton from "@/components/skeleton/AlbumSkeleton";
import IndexSkelton from "@/components/skeleton/IndexSkeleton";
import ListPopup from "@/components/ListPopup";
import PlaylistCard from "@/components/PlaylistCard";
import { PlaylistContext } from "@/context/PlaylistContext";
import { colors } from "@/theme/AppThemeProvider";
import Cookies from "js-cookie";

type PlaylistCardProps = {
  name: string;
  totalSongs: number;
  id: string;
  songs : string;
};

const Libraries = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { Playlist } = useContext(PlaylistContext);
  const[inputSearch, setInputSearch] = useState<string>("")
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Container>
       <Typography variant="h1" sx={{my:3,pb:1,borderBottom:`1px solid ${colors.greyAccent[400]}`,fontWeight:600}}>
       🎺 Your playlists
      </Typography>
      <input
          className={"customInput"}
          placeholder="Search Your Playlist Here.."
          type="text"
          value={inputSearch}
          onChange={(e)=>setInputSearch(e.target.value)}
        />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 ,mx:"auto",my:2}}>
        {Playlist?.playlists.filter((item,index)=>item.name.includes(inputSearch)).map((item, index) => {
          const name = item.name;
          const totalSongs = item.songs.length;
          const id = item.id;
          const songs = item.songs.join(",");
          const obj: PlaylistCardProps = { name, totalSongs, id,songs };
          return <PlaylistCard metaInfo={obj} key={index} />;
        })}
      </Box>
    </Container>
  );
};

export default Libraries;
