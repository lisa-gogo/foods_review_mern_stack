import express from "express"
import cors from "cors"
import foods from './api/foods.route.js'

const app = express()

app.use(cors()) //middle-ware
app.use(express.json()) 

app.use("/api/v1/foods",foods)
app.use("*",(req,res)=>res.status(404).json({error:"not found"}))

export default app // import to the file that get access to database
