import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    projectName: String,
    projDescription: String,
    projectID: Number,
    projectTimeUnits: String,
    predictedCompletion: Date,
    projectDuration: Number,
    projectStage: Number,               // in planning, in progress, archive
    tasks: [],
    chartData: [ { x: 0, y: 0 } ],

    projectManager: String,             // todo 
    projectDateCreated: Date,
    projectStartDate: Date,
    projectStatus: String,              // red, green, black     
});

const Project = mongoose.model('Project', projectSchema);

export default Project;