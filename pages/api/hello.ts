// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const url = `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=6&offset=0`;
 
  const options = {
    headers: {
      Authorization: "Bearer " + "BQAjskkhsuVyjEYw4BNAxtzgbsDSHO5J2b7LBLEYyrtsnuRZKxZHJAYTmxkd9oobyhLsqckL_pVLKmsL7VwRXlxB4uLBwfdLf9mw4g0kXxeOnAwKWBvI_U3pL3EDd496hKHHri_IBBhdBbDm6VYB7FmguersWOMfN9dhobMs4Zwy2kGi-kB6Gz00RDe4eFdhlrgPfjX6A_qPtAoTnqnrrq_5lufAuEqdUDrM9oE_vGAJiK-BHaQXKEkSgeAh0ItH70DcIGc",
    },
  };

  try {
  //   const response = await fetch(url, options);
  //   const data = await response.json();
  //  console.log(data);
    
  //   const topTracks = data.items.map((item: any, index: number) => {
  //     const artists = item.album.artists.map((item: any, index: number) => {
  //       return item.name;
  //     });
  //     return {
  //       name: item.name,
  //       artists: artists.toString(),
  //       image: item.album.images[0].url,
  //       preview : item.preview_url,
  //       id : item.id
  //     };
  //   });
     res.json("pong")
     res.status(200).end();
  } catch (err) {
     res.status(404);
  }
}
