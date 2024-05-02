import express from 'express'
import cors from 'cors'
import path from 'path'

import usersRoutes from './routes/usersRoutes'
import productsRoutes from './routes/productsRoutes'
import partnersRoutes from './routes/partnersRoutes'
import categoriesRoutes from './routes/categoriesRoutes'

const app = express()
const port = 3333

const __dirname = path.resolve()

app.use(express.json())
app.use(cors())

app.use('/users', usersRoutes)
app.use('/products', productsRoutes)
app.use('/partners', partnersRoutes)
app.use('/categories', categoriesRoutes)

app.use('/tmp/uploads', express.static(path.join(__dirname, 'tmp/uploads')))

app.listen(port, () => {
  console.log(`Servidor em execução em http://localhost:${port}`)
})

