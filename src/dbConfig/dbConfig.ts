import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("MongoDB Connected");
        })

        connection.on("error", (err) => {
            console.log("MongoDB Connection error, please make sure db is up and running: "+ err);
            process.exit();
        })
    } catch (error) {
        console.log('Something went wrong in connecting to DB');
        console.log(error);
        
    }
}