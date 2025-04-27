import express from 'express'
import { admin, protect } from '../middlewares/authMiddleware.js';
import { deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/adminController.js';


const router = express.Router();

router.get('/users',protect,admin,getAllUsers)
router.get('/user/:id',protect,admin,getUserById)
router.delete('/users/:id', protect, admin, deleteUser)
router.put('/users/:id', protect, admin, updateUser)

export default router;