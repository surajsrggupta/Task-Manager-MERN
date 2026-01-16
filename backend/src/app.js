import express from "express";
import cors from "cors";
import taskRoutes from "../routes/taskRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const app = express();


//middleware
app.use(cors());



app.use(express.json())





    
//route
app.get("/", (req, res) => {
  res.send("Hello World cors!");
});

app.use("/api/task",authMiddleware,taskRoutes);


app.use("/user", userRoutes);








export default app;