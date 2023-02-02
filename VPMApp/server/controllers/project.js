import mongoose from 'mongoose'
import Project from '../models/project.js'

import { taskCalculations } from './task.js'

// Get all projects 
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find()
        res.status(200).json(projects)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// Get all projects "in planning"
export const getPlanningProjects = async (req, res) => {
    try {
        const projects = await Project.find({ projectStage: 0 })
        res.status(200).json(projects)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
} 

// Get all projects "in progress"
export const getProgressProjects = async (req, res) => {
    try {
        const projects = await Project.find({ projectStage: 1 })
        res.status(200).json(projects)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// Get all archived projects
export const getArchivedProjects = async (req, res) => {
    try {
        const projects = await Project.find({ projectStage: 2 })
        res.status(200).json(projects)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// Get one project by ID
export const getProject = async (req, res) => {
    const { id } = req.params
    try {
        const project = await Project.findOne({ projectID: id })
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
    const { id } = req.params
    const project = req.body
    try {
        const updatedProject = await Project.findOneAndUpdate({ projectID: id }, project)
        res.status(201).json(updatedProject);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

// Complete a task
export const completeTask = async (req, res) => {
    const { id } = req.params
    const { project, task, timeDifference } = req.body

    const updatedProject = await taskCalculations(project, task, timeDifference)

    try {
        const data = await Project.findOneAndUpdate({ projectID: id }, updatedProject)
        console.log('project', updatedProject)
        res.status(201).json(data);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

// Delete a project
export const deleteProject = async (req, res) => {
    const { id } = req.params
    try {
        const deletedProject = await Project.findByIdAndDelete(id)
        res.status(201).json(deletedProject);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}
