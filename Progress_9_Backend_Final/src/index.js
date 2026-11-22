const express = require('express')
const app = express();
require('dotenv').config();
const main =  require('./config/db')
const cookieParser =  require('cookie-parser');
const authRouter = require("./routes/userAuth");
const redisClient = require('./config/redis');
const problemRouter = require("./routes/problemCreator");
const submitRouter = require("./routes/submit")


app.use(express.json());
app.use(cookieParser());

app.use('/user',authRouter);
app.use('/problem',problemRouter);
app.use('/submission',submitRouter);


const InitalizeConnection = async ()=>{
    try{
        if (!process.env.PORT) {
            throw new Error("Missing PORT");
        }
        if (!process.env.DB_CONNECT_STRING) {
            throw new Error("Missing DB_CONNECT_STRING");
        }
        if (!process.env.JWT_KEY) {
            throw new Error("Missing JWT_KEY");
        }
        if (!process.env.RAPIDAPI_KEY) {
            throw new Error("Missing RAPIDAPI_KEY");
        }
        await Promise.all([main(),redisClient.connect()]);
        console.log("DB Connected");
        
        app.listen(process.env.PORT, ()=>{
            console.log("Server listening at port number: "+ process.env.PORT);
        })

    }
    catch(err){
        console.log("Error: "+err);
        process.exit(1);
    }
}


InitalizeConnection();

