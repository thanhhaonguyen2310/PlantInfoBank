import express from "express";
import * as propertiesController from '../controllers/properties.js'

const router = express.Router();

router.post('/create', propertiesController.createProperties);
// router.post('/login', userController.login);
// router.get('/all', userController.getUser);
// router.put('/update-user', userController.updateUser)
// router.delete('/delete-user', userController.deleteUser)
export default router;