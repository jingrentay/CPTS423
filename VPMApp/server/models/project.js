import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    projectName: String,
    projDescription: String,
    projectID: Number,
    projectTimeUnits: String,
    predictedCompletion: Date,
    projectStartDate: Date, 
    projectDuration: Number,
    projectStage: Number,               // in planning (0), in progress (1), archive (2)
    tasks: [],
    completedTasks: [],
    numTasks: Number,
    chartData: [ { x: 0, y: 0 } ],
    lastKnownCompletion: {},
    projectStatus: String,              // red, green, black 
    projectDateCreated: Date,   
    dateCompleted: Date,
});

const Project = mongoose.model('Project', projectSchema);

export default Project;