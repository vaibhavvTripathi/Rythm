// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db-connect";
import UserModel from "@/models/UserModel";
const jwt = require("jsonwebtoken");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jwtTokenString = req.body.jwtToken;

  const secretKey = process.env.SERVER_SECRET;
  console.log("fdsfs",jwtTokenString)
  try {
    jwt.verify(jwtTokenString, secretKey, async (err: any, decode: any) => {
      if (err) {
        res.json("you are not authorized to access this app");
      } else {
        await dbConnect();

        const test = await UserModel.findOneAndUpdate(
          { email: req.body.email },
          {
            $addToSet: { playLists: { name: req.body.name, id: req.body.id } },
          },
          { upsert: true, new: true }
        );

        res.status(200).json(test);
      }
    });
  } catch (err) {
    res.status(404).json(err);
  }
}
