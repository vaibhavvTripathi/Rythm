import dbConnect from "@/lib/db-connect";
import UserModel from "@/models/UserModel";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.body.email;
  try {
   
    await dbConnect();
    console.log("searching..."+email);
    const response = await UserModel.find({ email: email });
     console.log("searchComplete")
    res.json(response);
  } catch (err) {
    res.status(404).json(err);
  }
}
