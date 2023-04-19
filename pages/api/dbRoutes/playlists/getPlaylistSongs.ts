import dbConnect from "@/lib/db-connect";
import PlaylistModel from "@/models/PlaylistModel";
import type { NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const playListId = req.query.playListId;
  const jwtTokenString = req.body.jwtToken;
  const secretKey = req.query.secretKey;
  try {
    jwt.verify(jwtTokenString, async (err: any, decode: any) => {
      if (err) {
        res.json("authorizationError");
      } else {
        await dbConnect();
        const response = await PlaylistModel.find({ playListId: playListId });
        res.json(response);
      }
    });
  } catch (err) {
    res.json(err);
  }
}
