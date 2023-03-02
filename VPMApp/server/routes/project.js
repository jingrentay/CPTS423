import express from 'express';
import { getProject, createProject, updateProject, deleteProject, getPlanningProjects, getProgressProjects, getArchivedProjects, completeTask } from '../controllers/project.js'

const router = express.Router();

router.get('/inplanning', getPlanningProjects)
router.get('/inprogress', getProgressProjects)
router.get('/archived', getArchivedProjects)

router.get('/:id', getProject)
router.post('/', createProject)
router.patch('/:id', updateProject)
router.delete('/:id', deleteProject)

router.patch('/task/:id', completeTask)

export default router;