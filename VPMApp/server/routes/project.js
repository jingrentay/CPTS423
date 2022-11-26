import express from 'express';
import { getProjects, getProject, createProject, updateProject, deleteProject, getPlanningProjects, getProgressProjects, getArchivedProjects } from '../controllers/project.js'

const router = express.Router();

router.get('/', getProjects)
router.get('/inplanning', getPlanningProjects)
router.get('/inprogress', getProgressProjects)
router.get('/archived', getArchivedProjects)

router.get('/:id', getProject)
router.post('/', createProject)
router.patch('/:id', updateProject)
router.delete('/:id', deleteProject)

export default router;