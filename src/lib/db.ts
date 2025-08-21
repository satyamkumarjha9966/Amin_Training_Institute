import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI as string;

export async function connectDB() {
    try {
        const connection = await mongoose.connect(MONGODB_URI,  {dbName: "Amin_Data"});

        if (connection) {
            console.log(`Connected to ${connection.connection.host}`)
        }
    } catch (error) {
        console.log(error)
    }
}