import express from 'express';
import { getProject, createProject, updateProject, deleteProject, getPlanningProjects, getProgressProjects, getArchivedProjects, completeTask, updateProjectTask } from '../controllers/project.js'

const router = express.Router();

router.get('/inplanning/:organization', getPlanningProjects)
router.get('/inprogress/:organization', getProgressProjects)
router.get('/archived/:organization', getArchivedProjects)

router.get('/:id', getProject)
router.post('/', createProject)
router.patch('/:id', updateProject)
router.delete('/:id', deleteProject)

router.patch('/task/:id', completeTask)
router.patch('/edit/task/:id', updateProjectTask)

export default router;