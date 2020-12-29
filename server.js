import app from "./app"
import mongoose from "mongoose"

require('dotenv').config()

mongoose.connect(process.env.DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:true
}).then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log("failed to connect to db")
})

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`server running on port $(PORT)`)
})