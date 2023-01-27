import express from "express"
import cors from "cors"
import foods from './api/foods.route.js'




const app = express() // higher middle-ware 

app.use(cors({
    origin: "*",
    methods: ["GET","PUT","POST","DELETE"]
})) //middle-ware
app.use(express.json()) // equal to body parse 

app.use("/api/v1/foods",foods)
app.use("*",(req,res)=>res.status(404).json({error:"not found here"}))
export default app // import to the file that get access to database
