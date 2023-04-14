import mongoose from "mongoose";

const dbConnect = async() => {

    const user = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;
    const database = process.env.MONGODB_DATABASE;

    const connectionString = `mongodb+srv://${user}:${password}@cluster0.99kgr3r.mongodb.net/${database}?retryWrites=true&w=majority`;
    mongoose.connect(connectionString)
}

export default dbConnect