import express from "express";
import cors from "cors";
import taskRoutes from "../routes/taskRoutes.js";

const app = express();


//middleware
app.use(cors());
app.use(express.json())



    
//route
app.get("/", (req, res) => {
  res.send("Hello World cors!");
});

app.use("/api/task", taskRoutes);








export default app;