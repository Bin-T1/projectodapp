import express from 'express';
import tasksRoute from './routes/tasksRouters.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();

const PORT  = process.env.PORT || 5001;

const app = express();


//MiddelWares
app.use(cors({origin:"http://localhost:5173"})) 
app.use(express.json());// Dòng này kiểm tra là middel wel 
app.use("/api/tasks",tasksRoute);

connectDB().then(()=>{
app.listen(PORT,()=>{
    console.log(`Server đang chạy trên cổng ${PORT}`);
});


});

