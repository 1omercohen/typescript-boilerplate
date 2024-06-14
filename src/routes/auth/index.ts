import express from 'express'
import * as AuthController from '../../controllers/auth'
import { validation } from '../../middlewares/validation'
import { ZLoginSchema, ZRegisterSchema } from '../../validations/auth'

const router = express.Router()

router.route('/login').post(validation(ZLoginSchema), AuthController.loginUser)
router
    .route('/register')
    .post(validation(ZRegisterSchema), AuthController.registerUser)

export { router }
