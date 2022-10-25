import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    projectName: String,
    projDescription: String,
});

const Project = mongoose.model('Project', projectSchema);

export default Project;