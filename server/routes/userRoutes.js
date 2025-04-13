import express from 'express';
import { createUser, getAllUsers } from '../controllers/streakController.js';

const router = express.Router();

// User routes
router.post('/', createUser);
router.get('/', getAllUsers);

export default router; 