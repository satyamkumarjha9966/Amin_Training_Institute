import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://shivam:JHNozh8NivXVN24z@cluster0.j6du8te.mongodb.net/?retryWrites=true&w=majority";

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