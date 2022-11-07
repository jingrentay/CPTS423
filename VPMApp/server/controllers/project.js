import mongoose from 'mongoose'
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

// Get one project by ID
export const getProject = async (req, res) => {
    const { id } = req.params
    try {
        const project = await Project.find({ projectID: id})
        res.status(200).json(project)
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

// Update a single project
export const updateProject = async (req, res) => {
    const { id} = req.params
    const project = req.body
    try {
        console.log(id)
        console.log(req.body)
        const updatedProject = await Project.findOneAndUpdate(id,project)
        res.status(201).json(updatedProject);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}
