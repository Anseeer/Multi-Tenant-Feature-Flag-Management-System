import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config()

export const DBconection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("DB Conected SuccessFully...");
    } catch (error) {
        console.log("DB Faild to Connect");
        process.exit(1);
    }
}