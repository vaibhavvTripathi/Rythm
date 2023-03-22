// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    try {
        const token = req.body.token
     

        const response = await fetch(`https://api.spotify.com/v1/me?access_token=${token}`)
        const data = await response.json()
    
        res.status(200).json(data.display_name)
    }
    catch(err) {
        res.status(404)
    }
}
