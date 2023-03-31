import { NextApiRequest,NextApiResponse } from "next";

export default async function(req:NextApiRequest,res:NextApiResponse) {
  
    const token = req.body.token
    const url =   `https://api.spotify.com/v1/me/player/recently-played?limit=10&after=1484811043508`
    const options = {
        headers : {
            Authorization : "Bearer " + token
        }
    }
    try {
       const response = await fetch(url,options)
       const data = await response.json()
        console.log("recent",data)
       const recentTracks = data.items.map((item:any,index:number)=> {
          const artists = item.track.artists.map((item:any,index:number)=> {
                return item.name
          }).toString()
         return {
            artists : artists,
            id : item.track.id,
            name : item.track.name,
            type : item.track.type,
            img : item.track.album.images[0].url
         }
       })
       res.json(data)
    }
    catch(err) {
       res.status(404)
    }
}