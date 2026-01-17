
import dotenv from "dotenv";
dotenv.config();
import connectDB from "../config/db.js";
import app from "./app.js"





//mongoose se connection establish
connectDB();


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
});

