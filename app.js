import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectDB.js'
import userRoutes from './routes/userRoutes.js'
import bodyParser  from 'body-parser'



dotenv.config()
const app = express()
const port = process.env.PORT ? process.env.PORT : 8000 
const dbURL = process.env.dbURL; 



app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




app.use('/api/users',userRoutes)
connectDB(dbURL)






app.listen(port,()=>console.log('Port listening at ',port))