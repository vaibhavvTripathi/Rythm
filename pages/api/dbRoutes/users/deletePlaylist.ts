import dbConnect from "@/lib/db-connect";
import UserModel from "@/models/UserModel";
import type { NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.query.email;
  const id = req.query.id;
  const jwtTokenString = req.body.jwtToken;
  const secretKey = req.query.secretKey;

  try {
    jwt.verify(jwtTokenString, secretKey, async (err: any, decode: any) => {
      if (err) {
        res.json("authorizationError");
      } else {
        await dbConnect();
        const removePlaylist = await UserModel.findOneAndUpdate(
          { email: email },
          { $pull: { playLists: { id: id } } },
          { new: true }
        );
        res.json(removePlaylist);
      }
    });
  } catch (err) {
    res.json(err);
  }
}
