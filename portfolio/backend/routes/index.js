import { Router } from 'express';
import { health } from '../controllers/healthController.js';
import { createContact } from '../controllers/contactController.js';
import { getGithubStats } from '../controllers/githubController.js';
import { contactRules, handleValidation } from '../middleware/validate.js';
import { contactLimiter } from '../middleware/rateLimiters.js';

const router = Router();

router.get('/health', health);
router.get('/github', getGithubStats);
router.post('/contact', contactLimiter, contactRules, handleValidation, createContact);

export default router;
