// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '@/lib/db-connect';
import CustomPlaylistModel from '@/models/CustomPlaylist';
import type { NextApiRequest, NextApiResponse } from 'next'
import { CustomPlaylistType } from './type';
const jwt = require('jsonwebtoken')



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CustomPlaylistType | string>
) {
    try {
      const jwtTokenString = req.headers.authorization?.split(" ")[1];
      const secretKey = process.env.SERVER_SECRET;
      const handleGet = async (err:any, decode : any) => {
          if(err) {
            res.json("user is unauthorized");
          }
          else {
            await dbConnect();
            const email = decode.email;
            const response = await CustomPlaylistModel.find({email : email});
            const defaultResponse : CustomPlaylistType = {
              email : email,
              playlists :[],
            } 
            res.json(response[0]?response[0]:defaultResponse);
          }
      }
      jwt.verify(jwtTokenString,secretKey,handleGet);
    }
    catch(err) {
      res.json("internal server error");
    }
}
