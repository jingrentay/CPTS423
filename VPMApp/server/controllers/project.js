import Task from '../models/task.js'
import Project from '../models/project.js'

// Get all projects 
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find()
        res.status(200).json(projects)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// Create a single project
export const createProject = async (req, res) => {
    const project = req.body
    const newProject = new Project(project)
    try {
        await newProject.save()
        res.status(201).json(newProject);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

// Get all tasks 
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// Create a single task 
export const createTask = async (req, res) => {
    const task = req.body
    const newTask = new Task(task)
    try {
        await newTask.save()
        res.status(201).json(newTask);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}