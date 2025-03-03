import mongoose from "mongoose";


export const connectdb = async () => {
    try {
        await mongoose.connect("mongodb+srv://vikassharma:KtZ997f6Z0HOEZ9t@cluster0.8vxsrkt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("connected to database");
    } catch (error) {
        console.log(error);
    }
}