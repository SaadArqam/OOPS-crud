import express from "express";
import mongoose from "mongoose";
import {useRoutes} from "./controller/todo.controller"

interface APP_Interface{
    startServer():void;
    ConnectDatabase():void;
    initaializeRoutes():void;
}

export class App implements APP_Interface{

    PORT:number;
    app:express.Application;

    constructor(){
        this.PORT = 4000;
        this.app=express()
        this.startServer()
        this.initaializeRoutes()
    }


    startServer():void{
        this.app.listen(this.PORT,()=>{
            console.log("Server running!!!");
        })
    }

    async ConnectDatabase():Promise<void>{
        try{
            await mongoose.connect("")
            console.log("Database Connected")
        }
        catch(err){
            console.log("URL not found")
        }
    }

    initaializeRoutes():void{
        console.log("Routes Initialized");
    }
}