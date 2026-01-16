import mongoose, {Schema,model} from "mongoose";

// yeh schema bann gya 
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

// model bnana hai

const TaskModel = new model("Task", taskSchema);

export default TaskModel;