// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
     
    try {
        const token = req.body.token 
        const response = await fetch(`https://api.spotify.com/v1/me?access_token=${token}`)
        const data = await response.json()
        const payload = {email : data.email}
        const secret = process.env.SERVER_SECRET
        const jwtToken = jwt.sign(payload,secret)
        res.status(200).json({jwtToken,email:data.email})
    }
    catch(err) {
        res.status(404)
    }
}
