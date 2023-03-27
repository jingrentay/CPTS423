import express from 'express';
import { createAccount, authUser, createOrganization, changeOrganization, getOrganization, editRole } from '../controllers/account.js'

const router = express.Router();

router.get('/:orgName', getOrganization);

router.post('/', createAccount);
router.post('/authuser', authUser);
router.post('/createOrganization', createOrganization);
router.post('/changeOrganization', changeOrganization);
router.post('/editRole', editRole);

export default router;