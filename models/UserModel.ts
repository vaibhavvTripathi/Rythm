import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  playLists:{
    type : [{
    name: String,
    id : String
  }],

  default : []
},
});

const UserModel =
  models.UserModel || model("UserModel", userSchema, "users");

export default UserModel;
