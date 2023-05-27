import dbConnect from "@/lib/db-connect";
import PlaylistModel from "@/models/PlaylistModel";
import type { NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const playListId = req.query.playListId;
  const jwtTokenString = req.headers.authorization?.split(" ")[1];
  const secretKey = process.env.SERVER_SECRET;
  try {
    jwt.verify(jwtTokenString,secretKey, async (err: any, decode: any) => {
      if (err) {
        res.json("authorizationError");
      } else {
        await dbConnect();
        
        const response = await PlaylistModel.find({ playListId: playListId });
        res.json(response[0]);
      
      }
    });
  } catch (err) {
    res.json(err);
  }
}
