import express from 'express'
import { login, register } from '../controllers/authController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', register)
router.post('/login', login)
router.get('/home', protect, (req, res) => {
    res.status(200).json({message:`Welcome ${req.user.username}`})
})

export default router