import express from 'express'
import { connectToDatabase } from './database/connectiontodatabase.js'
import dotenv from "dotenv"
import authRoutes from './routes/auth-route.js'
dotenv.config()

const app = express()


const port = 3000
app.use(express.json())
connectToDatabase();


app.use('/api/auth', authRoutes)

app.listen(port, () =>{
    console.log('Server is running port 3000')
})