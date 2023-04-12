// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const token = req.body.token
    const id = req.body.id 

    const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${id}`
    const options = {
        method : 'PUT',
        headers : {
            Authorization: 'Bearer ' + token
        }
    }
    try {
       const response = await fetch(url,options)
       res.json("success !")
    }
    catch (err) {
       console.log(err)
       res.json(err)
    }
}