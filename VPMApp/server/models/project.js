import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    projectName: String,
    projDescription: String,
    projectID: Number,
    projectManager: String,
    projectDateCreated: Date,
    projectStartDate: Date,
    predictedCompletion: Date,
    tasks: [], 
    projectDuration: Number,
    projectTimeUnits: String,
    projectStatus: String,              // red, green, black     
    projectStage: String,               // in planning, in progress, archive
});

const Project = mongoose.model('Project', projectSchema);

export default Project;