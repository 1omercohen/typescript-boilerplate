import express from "express";
import * as HealthController from "../../controllers/health"
const router = express.Router()

router.route("/").get(HealthController.getStatus)

export { router }