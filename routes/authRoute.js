import express from 'express'
import { login, logout, register } from '../controllers/authController.js';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js'
import {protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', register)
router.post('/login', login)
router.get('/home', protect, (req, res) => {
    res.status(200).json({message:`Welcome ${req.user.username}`})
})

router.get('/profile', protect, getUserProfile);
router.put('/profile',protect,updateUserProfile)
router.post('/logout',logout)
export default router