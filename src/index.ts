import express,{Request,Response,NextFunction,Application} from "express";

let app:Application = express()
app.use(express.json())

app.get("/home",(req:Request,res:Response)=>{
    let data = req.body
    res.json({
        "hello":"world"
    })
})

app.listen(5000,()=>{
    console.log("Started Node JS server")
})