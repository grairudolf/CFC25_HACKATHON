import express from 'express';
import { submitFeedback } from '../controllers/feedback.controller.js';

const router = express.Router();

// Route to submit feedback
// POST /api/feedback
router.post('/', submitFeedback);

export default router;
