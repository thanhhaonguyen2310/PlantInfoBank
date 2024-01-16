import express from "express";
import * as distributionController from "../controllers/distribution.js";

const router = express.Router();

router.post("/create", distributionController.createDistribution);
router.get("/get/:id", distributionController.getAllDistribution);
// router.get('/all', userController.getUser);
router.put("/update-user", distributionController.updateDistribution);
router.delete("/delete-user", distributionController.deleteDistribution);
export default router;
