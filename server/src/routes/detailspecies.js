import express from "express";
import * as detailspeciesController from '../controllers/detailspecies.js'

const router = express.Router();

router.post('/create', detailspeciesController.createDetailspecies);
// router.post('/login', userController.login);
router.get('/all', detailspeciesController.getAllDetailSpecies);
// router.put('/update-user', userController.updateUser)
// router.delete('/delete-user', userController.deleteUser)
export default router;