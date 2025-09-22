import mongoose from "mongoose";

export const connectDB = async () => {
   try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("Kết nối databasse thành công");
} catch (error) {
    console.error("Connect error:",error);
    process.error(1); //exit with error
}
}