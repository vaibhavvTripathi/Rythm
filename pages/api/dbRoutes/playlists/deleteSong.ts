import dbConnect from "@/lib/db-connect";
import PlaylistModel from "@/models/PlaylistModel";
import type { NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const songId = req.query.songId;
  const playListId = req.query.playListId;
  const jwtTokenString = req.body.jwtToken;
  const secretKey = req.query.secretKey;

  try {
    jwt.verify(jwtTokenString, secretKey, async (err: any, decode: any) => {
      if (err) {
        res.json("authenticationError");
      } else {
        await dbConnect();
        const removeSong = await PlaylistModel.findOneAndUpdate(
          { playListId: playListId },
          { $pull: { songIds: songId } },
          { new: true }
        );

        res.json(removeSong);
      }
    });
  } catch (err) {
    res.json(err);
  }
}
