// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
   const token = req.body.token;
   const url = 'https://api.spotify.com/v1/me/shows?offset=0&limit=20'
   const options = {
    headers : {
        Authorization : "Bearer " + token 
    }
   }
   try {
    const response = await fetch(url,options)
    const data = await response.json();
    res.json(data)
   }
   catch (err) {
    console.log(err)
    res.status(404)
   }
}
