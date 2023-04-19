import dbConnect from "@/lib/db-connect";
import UserModel from "@/models/UserModel";
import type { NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.query.email;
  const jwtTokenString = req.body.jwtToken;
  const secretKey = req.query.secretKey;

  try {

    jwt.verify(jwtTokenString,secretKey,async (err:any,decode:any)=> {
      if(err) {
         res.json("authorizationError")
      }
      else {
        await dbConnect();
        const response = await UserModel.find({ email: email });
        res.json(response);
      }

    })
   
  } catch (err) {
    res.status(404).json(err);
  }
}
