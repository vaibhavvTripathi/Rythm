import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { createContext, useState } from "react";

export const PlaylistContext = createContext({
  playlistArray: [],
  songArray: [],
  getUsersPlaylist: async (email: string) => {},
  deleteUserPlaylist: async (email: string, id: string) => {},
  upsertUserPlaylist: async (email: string, name: string, id: string) => {},
  getSong: async (playListId: string) => {},
  deleteSong: async (songId: string, playListId: string) => {},
  upsertSong: async (playListId: string, songId: string) => {},
});

export default function PlaylistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const URL = `http://localhost:3000`;
  const [playlistArray, setPlayListArray] = useState([]);
  const [songArray, setSongArray] = useState([]);

  const getUsersPlaylist = async (email: string) => {
    const response = await axios.get(
      `${URL}/api/dbRoutes/users/getUserPlayLists?email=${email}`
    );
    console.log(response);
  };
  const deleteUserPlaylist = async (email: string, id: string) => {
    const response = await axios.delete(
      `/api/dbRoutes/users/deletePlaylist?email=${email}&id=${id}`
    );
    console.log(response);
  };
  const upsertUserPlaylist = async (
    email: string,
    name: string,
    id: string
  ) => {
    const jwtToken = Cookies.get("jwt_token")+"ds";

    const response = await axios.post(
      `/api/dbRoutes/users/upsertPlaylist`,
      {
        name,
        id,
        email,
        jwtToken
      }
    );

  };
  const getSong = async (playListId: string) => {
    const response = await axios.get(
      `${URL}/api/dbRoutes/playlists/getPlayListSongs?playListId=${playListId}`
    );
    console.log(response);
  };
  const deleteSong = async (songId: string, playListId: string) => {
    const response = await axios.delete(
      `${URL}/api/dbRoutes/playlists/deleteSong?songId=${songId}&playListId=${playListId}`
    );
    console.log(response);
  };
  const upsertSong = async (playListId: string, songId: string) => {
   
    const response = await axios.post(
      `${URL}/api/dbRoutes/playlists/upsertSong`,
      {
        playListId,
        songId
      }
    );
    console.log(response);
  };
  const contextVal = {
    playlistArray,
    songArray,
    getUsersPlaylist,
    deleteUserPlaylist,
    upsertUserPlaylist,
    getSong,
    deleteSong,
    upsertSong,
  };

  return (
    <PlaylistContext.Provider value={contextVal}>
      {children}
    </PlaylistContext.Provider>
  );
}
