import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import morgan from 'morgan'
import shoppingListRoutes from './routes/shoppingListRoutes'
import specs from './lib/swagger'

// sever config
const app = express()
const PORT = process.env.PORT || 3333

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(
  '/api/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }),
)

// routes
app.use('/api/shopping-list', shoppingListRoutes)

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
