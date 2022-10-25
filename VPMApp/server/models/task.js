import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    taskProjectName: String,
    taskProjectID: String,
    taskName: String,
    taskDescription: String,
});

const Task = mongoose.model('Task', taskSchema);

export default Task;