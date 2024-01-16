import express from "express";
import * as speciesController from '../controllers/species.js'

const router = express.Router();

router.post('/create', speciesController.createSpecies);
router.get('/get/:id', speciesController.getAllProperty);
// router.get('/all', userController.getUser);
// router.put('/update-user', userController.updateUser)
// router.delete('/delete-user', userController.deleteUser)
export default router;