import express from 'express';
import { getTasks, createTask, getProjects, createProject } from '../controllers/project.js'

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.get('/', getProjects);
router.post('/', createProject)

export default router;