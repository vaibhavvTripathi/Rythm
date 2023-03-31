import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = req.body.token;
    const url = `https://api.spotify.com/v1/playlists/6UeSakyzhiEt4NB3UAd6NQ/tracks`;
    const options = {
        headers : {
            Authorization: 'Bearer ' + token
        }
    }
    const response = await fetch(url,options)
    const result = await response.json()
    const recommendations = result.items.filter((item:any,index:number)=>index<10).map((item:any)=> {
        const artists = item.track.artists.map((artist:any)=> {
            return artist.name
        }).toString()
      return {
         artists : artists,
         id : item.track.id,
         preview : item.track.preview_url,
         name : item.track.name,
         img : item.track.album.images[0].url
      }
    })
    res.json(recommendations)
  } catch (err) {
    console.log(err)
    res.send("error in fetching playlist")
  }
}
