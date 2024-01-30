import express from "express";
import * as userController from '../controllers/user.js'
import verifyToken from '../middlewares/verifyToken'

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
// router.get('/all', userController.getUser);
router.use(verifyToken)
router.get('/get-current', userController.getUserCurrent);
router.put('/update-user', userController.updateUser)
router.delete('/delete-user', userController.deleteUser)
export default router;