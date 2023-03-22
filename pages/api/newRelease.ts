import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const token = req.body.token;
  const url = `https://api.spotify.com/v1/browse/new-releases?country=SE&limit=10&offset=5`;
  const options = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const response = await fetch(url,options)
    const data = await response.json()
    const newRelease = data.albums.items.map((item:any,index:number)=> {
       return {
        albumGroup : item.album_group,
        albumType : item.album_type,
        artists : item.artists,
        name : item.name,
        date : item.release_date,
        totalTracks : item.total_tracks,
        id : item.id,
        image : item.images[0].url,
        type : item.type
       }
    })
    res.json(newRelease)
  }
  catch (err) {
    res.status(404).send(err)
  }
 

}
