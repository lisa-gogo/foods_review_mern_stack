import express from "express"
import cors from "cors"
import foods from './api/foods.route.js'
import path from "path"



const app = express()

app.use(cors()) //middle-ware
app.use(express.json()) 

app.use("/api/v1/foods",foods)
app.use("*",(req,res)=>res.status(404).json({error:"not found"}))

/*-- DEPLOYMENT -*/

const __dirname=path.resolve()
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname, "/frontend/build")));
    app.get('*',(req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")))
}else{
    console.log(process.env.NODE_ENV)
    app.get("/", (req, res) => {
        res.send("API is running..");
      }); 
}


//-------------------



export default app // import to the file that get access to database
