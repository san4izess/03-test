import {app} from "../app";
import {db, DBType} from "../db/db";
import express, {Express} from "express";

export const getTestsRouter = (db: DBType) => {

    const router = express.Router()

    router.delete('/data',(req,
                                                res)=>{
        db.courses = [];
        res.sendStatus(204)
    })
    return router
}