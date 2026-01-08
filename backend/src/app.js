import express from "express";
import cors from "cors";

const app = express();


//middleware
app.use(cors());
app.use(express.json())

    
//route
app.get("/", (req, res) => {
  res.send("Hello World cors!");
});

export default app;