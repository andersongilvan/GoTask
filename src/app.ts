import express from 'express'
import { errorHandler } from './http/middlewares/error-handler'
import { routes } from './http/routes'

const app = express()

app.use(express.json())

app.use(routes)
app.use(errorHandler)

export { app }
