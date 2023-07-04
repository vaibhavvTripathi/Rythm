import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function topTracks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.body.token
  const url = `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=6&offset=0`;
 
  const options = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
 console.log(token)
  try {
    const response = await fetch(url, options);
    const data = await response.json();
   console.log(data);
    
    const topTracks = data.items.map((item: any, index: number) => {
      const artists = item.album.artists.map((item: any, index: number) => {
        return item.name;
      });
      return {
        name: item.name,
        artists: artists.toString(),
        image: item.album.images[0].url,
        preview : item.preview_url,
        id : item.id
      };
    });
   res.json(topTracks)
    
  } catch (err) {
     res.status(404);
  }
}
