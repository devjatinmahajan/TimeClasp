import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    subTasks: [
        {
            id: { type: Number },
            task: { type: String }
        }
    ],
    taskType: {
        type: Number,
    },
    priority: {
        type: String
    },
    dueDate: {
        type: Date,
    },
    repeat: {
        type: String
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    timeWorked: {
        type: Number,
        default: 0
    },
    allocatedTime: {
        type: Number,
    }
})

const taskModel = mongoose.models.taskModel || mongoose.model("taskModel", taskSchema);
export default taskModel;