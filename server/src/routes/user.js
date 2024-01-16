import express from "express";
import * as userController from '../controllers/user.js'

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/all', userController.getUser);
router.put('/update-user', userController.updateUser)
router.delete('/delete-user', userController.deleteUser)
export default router;