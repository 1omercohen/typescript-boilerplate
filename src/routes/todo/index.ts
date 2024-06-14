import express from 'express'
import * as TodoController from '../../controllers/todo'
import * as AuthMiddleware from '../../middlewares/auth'

const router = express.Router()

router.route('/').post(AuthMiddleware.authentication, TodoController.createTask)

export { router }
