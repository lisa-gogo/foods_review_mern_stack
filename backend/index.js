import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import FoodsDAO from "./dao/foodsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"


dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.FOODSTASTE_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)
.catch(err=>{
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await FoodsDAO.injectDB(client)// this is we get initial reference to database
    await ReviewsDAO.injectDB(client)
    app.listen(port, ()=>{
        console.log(`listening on port ${port}`)
    })
})