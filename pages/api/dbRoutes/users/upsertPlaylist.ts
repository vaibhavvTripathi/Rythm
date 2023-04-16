// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db-connect";
import UserModel from "@/models/UserModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
   const test =  await UserModel.findOneAndUpdate(
    {email :req.body.email},
    {$addToSet : {playLists : {name : req.body.name,id: req.body.id}}},
    {upsert:true,new : true},
    )
    res.status(200).json(test);
  } catch (err) {
    res.status(404).json(err);
  }
}
