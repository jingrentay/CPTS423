import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    projectName: String,
    projDescription: String,
    projectID: Number,
});

const Project = mongoose.model('Project', projectSchema);

export default Project;