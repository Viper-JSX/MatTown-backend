import mongoose from "mongoose";

async function connectToDB(){
    try {
        const connection = await mongoose.connect(process.env.MONGO_DB_URI, { dbName: process.env.DB_NAME });
        //console.log("Connected", `${process.env.MONGO_DB_URI}/${process.env.DB_NAME}`);

    } catch (err) {
         console.log(err)
        throw new Error("Cannot connect to a database");
    }
}


export default connectToDB;