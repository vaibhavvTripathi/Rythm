// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
   const token = req.body.token
   const url = `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=8&offset=5`
   const options = {
    headers: {
      Authorization: "Bearer " + token,
    },
  }
  try {
    const response = await fetch(url,options)
    const data = await response.json()
    console.log(data.items)
    const artistData = data.items.map((item:any,index:number)=> {
         return (
          {
            name : item.name,
            id : item.id,
            image : item.images[0].url,
            type : item.type
          }
         )
    })
 
    res.json(artistData)
  }
  catch(err) {
    console.log(err)
    res.send(404)
  }
   
}
