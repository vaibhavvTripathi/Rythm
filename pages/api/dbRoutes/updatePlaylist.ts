// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "@/lib/db-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { CustomPlaylistType } from "./type";
import CustomPlaylistModel from "@/models/CustomPlaylist";
const jwt = require('jsonwebtoken')

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const jwtTokenString = req.headers.authorization?.split(" ")[1];
    const secretKey = process.env.SERVER_SECRET;
    const newPlaylistModel: CustomPlaylistType = req.body;
    const handleUpsert = async (err: any, decode: any) => {
      if (err) {
        res.json("user is unauthorized");
      } else {
        await dbConnect();
        const email = decode.email;
        newPlaylistModel.email = email;
        const upsert = await CustomPlaylistModel.findOneAndUpdate(
          { email },
          newPlaylistModel,
          { upsert: true, new: true }
        );
        res.json(upsert);
      }
    };
    jwt.verify(jwtTokenString,secretKey,handleUpsert);
  } catch (err) {
    res.status(404).json(err);
  }
}
