import express from "express";
import TaskModel from "../models/TaskModel.js";

const router = express.Router();

router.post("/",async(req,res)=>{
    const {title, description} = req.body;

    try {
        const task = await TaskModel.create({title,description});
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

router.get('/',async(req,res)=>{
    try {
        const task = await TaskModel.find({}).sort({createdAt: -1});
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.delete("/:id",async(req,res)=>{
    const {id} = req.params;

    try {
        const task = await TaskModel.findOneAndDelete({_id:id});
        if(!task){
            return res.status(404).json({error: "yeh task nahi hai mila"});
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({error: "invalid id hai bhai"});
    }
})


//update

router.put("/:id",async(req,res)=>{
  try {
      const {status} = req.body;
  
      const updatedTask = await TaskModel.findByIdAndUpdate(req.params.id, {status:status},{new: true});
  
      res.json(updatedTask);
    //   console.log(`heyyy ${updatedTask}`);
      
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})





export default router;