// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'



export  default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("hi")
  const query = req.body.query  
  const token = req.body.token
  const offset = req.body.offset
  const url = `https://api.spotify.com/v1/search?q=${query}&type=track&market=ES&limit=10&offset=${offset}`
  const options = {
    headers : {
        Authorization : 'Bearer ' + token
    }
  }
  try {
     const response = await fetch(url,options) 
     const data = await response.json()
     res.json(data)
  }
  catch (err) {
    console.log(err)
    res.status(404).json(err)
  }
}
