import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PrefixRoutes } from './types';
import * as AuthRoutes from "./routes/auth"
import * as TodoRoutes from "./routes/todo"
import * as HealthRoutes from "./routes/health"
import { errorHandler } from './middlewares/errorHandler';


const app = express();

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(PrefixRoutes.AUTH, AuthRoutes.router)
app.use(PrefixRoutes.TODO, TodoRoutes.router)
app.use(PrefixRoutes.HEALTH, HealthRoutes.router) 

app.use(errorHandler)


export { app }