import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    projectName: String,
    taskName: String,
    taskDescription: String,
    duration: Number,
    assignee: String,
    completionDate: {
        type: Date,
        default: new Date()
    },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;