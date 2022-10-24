import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    projectID: Number,
    projectName: String,
    projectDescription: String,
    timeunits: Number,
    completionDate: {
        type: Date,
        default: new Date()
    },
});

const Project = mongoose.model('Project', projectSchema);

export default Project;