import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB Connected")
        });

        connection.on("error", (err) => {
            console.log("MongoDB Connection error, please make sure db is up and running: "+ err);
            process.exit(1);
        });

    } catch (error) {
        console.log('Something went wrong in connecting to DB');
        console.log(error);
        process.exit(1);
        
    }
}