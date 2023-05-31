import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { CustomPlaylistType, SinglePlaylistModel } from "@/pages/api/dbRoutes/type";
import { useRouter } from "next/router";

 
const defaultPlaylist : CustomPlaylistType = {
  email : "",
  playlists : []
}

export const PlaylistContext = createContext({
  Playlist : defaultPlaylist,
  getPlaylist: async () => {},
  deletePlaylist: async ( id: string) => {},
  createPlaylist: async (playlistName : string) => {},
  getSongsbyPlaylistId: (playListId: string) => {},
  addSong: async ( playListId: string,songId: string) => {},
  deleteSong: async (playListId: string, songId: string) => {},
});

const BASE_URL = '/api/dbRoutes'

export default function PlaylistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
 
  const[Playlist,setPlaylist] = useState<CustomPlaylistType>(defaultPlaylist)
  const router = useRouter();
  const stack = async () => {
    await getJwtToken();
    await getPlaylist();
  }
  useEffect(()=> {   
     stack()
  },[])
  const getJwtToken = async() => {
    const token = Cookies.get("access_token");
    const data: AxiosResponse<{ jwtToken: string; email: string }> =
        await axios.post("/api/userName", {
          token: token,
        });
    const jwt = data.data.jwtToken;
    Cookies.set("jwtToken",jwt);
  }
  const getPlaylist = async () => {
    try {
      const jwt = Cookies.get("jwtToken");
        const getPlaylists = await axios.get(`${BASE_URL}/getPlaylist`,{
          headers : {
            Authorization : 'Bearer '+ jwt
          }
        })
        setPlaylist(getPlaylists.data)
    }
    catch(err) {
        console.log(err)
    }
  };
  const deletePlaylist = async (id: string) => {
     try {
         const jwt = Cookies.get("jwtToken");
         const updatedPlaylistArray = Playlist.playlists.filter((item,index)=> {
              return item.id !== id
         })
         const updatedPlaylist = {...Playlist,playlists:updatedPlaylistArray}
         const updatedPlaylists : AxiosResponse<CustomPlaylistType> = await axios.post(`${BASE_URL}/updatePlaylist`,updatedPlaylist,{
          headers : {
            Authorization : 'Bearer ' + jwt
          }
         })
         console.log("playlist deleted successfully")
         router.push("/")
         setPlaylist(updatedPlaylists.data)
     }
     catch(err) {
        console.log(err)
     }
  };
  const createPlaylist = async (playlistName : string) => {
    const jwt = Cookies.get("jwtToken");
    const newPlaylist = {
      id : self.crypto.randomUUID(),
      name : playlistName,
      songs : []
    }
    const updatedPlayListArray = [...Playlist.playlists,newPlaylist];
    const updatedPlaylist = {...Playlist,playlists : updatedPlayListArray};
    const updatedPlaylists : AxiosResponse<CustomPlaylistType> = await axios.post(`${BASE_URL}/updatePlaylist`,updatedPlaylist,{
      headers : {
        Authorization : 'Bearer ' + jwt
      }
     })
     setPlaylist(updatedPlaylists.data)
  };
  const getSongsbyPlaylistId =  (playListId: string) => {
     const songs : SinglePlaylistModel  = Playlist.playlists.find((item)=> {
          return playListId === item.id
     }) ?? {id : "",name : "",songs : []}

     return songs;
  };
  const addSong = async (playlistId : string, songId : string ) => {
       const jwt = Cookies.get("jwtToken");
       const playlist  = Playlist.playlists.find((item)=> {
         return playlistId === item.id
       })
       if(playlist!==undefined) {
         const oldSongArray : Array<string> = playlist.songs;
         if(playlist.songs.includes(songId)==true) {
            return;
         }
         const newSongArray : Array<string> = [...oldSongArray,songId];
         const newPlaylists = Playlist.playlists.map((item)=> {
              if(item.id===playlistId) {
                return {...item,songs : newSongArray}
              }
              return item;
         }) 
         const updatedObject = {...Playlist,playlists : newPlaylists}
         const updatedPlaylists : AxiosResponse<CustomPlaylistType> = await axios.post(`${BASE_URL}/updatePlaylist`,updatedObject,{
          headers : {
            Authorization : 'Bearer ' + jwt
          }
         })
         console.log(updatedPlaylists.data)
         setPlaylist(updatedPlaylists.data)
       }
  }
  const deleteSong = async (songId: string, playlistId: string) => {
    const jwt = Cookies.get("jwtToken");
    console.log("hoi")
    const playlist  = Playlist.playlists.find((item)=> {
      return playlistId === item.id
    })
    console.log(playlist)
    if(playlist!==undefined) {

      if(playlist.songs.includes(songId)==false) {
         return;
      }
      const newSongArray : Array<string> = playlist.songs.filter((item)=> {
        return item !== songId
      })
      const newPlaylists = Playlist.playlists.map((item)=> {
           if(item.id===playlistId) {
             return {...item,songs : newSongArray}
           }
           return item;
      }) 
      const updatedObject = {...Playlist,playlists : newPlaylists}
      const updatedPlaylists : AxiosResponse<CustomPlaylistType> = await axios.post(`${BASE_URL}/updatePlaylist`,updatedObject,{
       headers : {
         Authorization : 'Bearer ' + jwt
       }
      })
      router.push({pathname : `/Libraries/${playlist.name}`,
      query : {
       token : Cookies.get("access_token"),
       songs : newSongArray,
       id : playlist.id
      }})
      console.log(updatedPlaylists.data)
      setPlaylist(updatedPlaylists.data)
      // location.reload();
    }
  };
 
  const contextVal = {
    Playlist,
    getPlaylist,
    deletePlaylist,
    createPlaylist,
    getSongsbyPlaylistId,
    addSong,
    deleteSong,
  };

  return (
    <PlaylistContext.Provider value={contextVal}>
      {children}
    </PlaylistContext.Provider>
  );
}
