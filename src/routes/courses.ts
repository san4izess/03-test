import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from "../types";
import {GetQueryCoursesModel} from "../models/GetQueryCoursesModel";
import {Express, Response} from "express";
import {ViewCourseModel} from "../models/ViewCourseModel";
import {URLParamsCourseIdModel} from "../models/URLParamsCourseIdModel";
import {CreateCourseModel} from "../models/CreateCourseModel";
import {UpdateCourseModel} from "../models/UpdateCourseModel";
import {CourseType, db, DBType} from "../db/db";


const status = {
    "Created": 204,
    'NotFound': 404
}

export const mapDBCourseToViewModel = (dbCourse: CourseType): ViewCourseModel => {
    return {
        id: dbCourse.id,
        title: dbCourse.title
    }
}



export const addCoursesRoutes = (app: Express, db: DBType) =>{
    app.get("/courses", (req: RequestWithQuery<GetQueryCoursesModel>,
                         res: Response<ViewCourseModel[]>) =>{
        let foundCourses = db.courses;
        if(req.query.title){
            foundCourses = foundCourses
                .filter(c => c.title.indexOf(req.query.title)> -1)
        }

        // if(!foundCourses.length){
        //     res.sendStatus(404)
        //     return
        // }

        res.json(foundCourses.map(mapDBCourseToViewModel))
    });

    app.get("/courses/:id", (req: RequestWithParams<URLParamsCourseIdModel>,
                             res: Response<ViewCourseModel>) =>{
        const foundCourses =db.courses.find(c => c.id === +req.params.id)

        if (!foundCourses){
            res.sendStatus(404)
            return
        }

        res.json(mapDBCourseToViewModel(foundCourses))
    });

    app.post("/courses", (req: RequestWithBody<CreateCourseModel>,
                          res: Response<ViewCourseModel>) =>{

        if (!req.body.title){
            res.sendStatus(400)
            return
        }

        const createdCourse: CourseType = {
            id: +(new Date()),
            title: req.body.title,
            studentsCount: 0
        }
        db.courses.push(createdCourse)

        res
            .status(201)
            .json(mapDBCourseToViewModel(createdCourse))
    })

    app.delete("/courses/:id", (req: RequestWithParams<URLParamsCourseIdModel>,
                                res) =>{
        db.courses = db.courses.filter(c=> c.id !== +req.params.id)
        //const founder = db.courses.find(c => c.id !== +req.params.id)

        res.sendStatus(204)

        // res.json(founder)
    });

    app.put("/courses/:id", (req: RequestWithParamsAndBody<URLParamsCourseIdModel, UpdateCourseModel>,
                             res) =>{

        if(!req.body.title){
            res.sendStatus(400)
            return
        }

        const foundCourse = db.courses.find(c => c.id === +req.params.id)

        if (!foundCourse){
            res.sendStatus(404)
            return
        }

        foundCourse.title = req.body.title

        res.sendStatus(204)
    });


    app.get("/", (req,
                  res) => res.send("Hello!!!"));

    app.get("/san4i", (req,
                       res) => res.send("Hello San4i!"));
}