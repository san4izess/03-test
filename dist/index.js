"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
const status = {
    "Created": 204,
    'NotFound': 404
};
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "connect-src 'self' http://localhost:3000");
    next();
});
const db = {
    courses: [
        { id: 1, title: 'front end' },
        { id: 2, title: 'back end' },
        { id: 3, title: 'qa' },
        { id: 4, title: 'dev ops' }
    ]
};
app.get("/courses", (req, res) => {
    let foundCourses = db.courses;
    if (req.query.title) {
        foundCourses = foundCourses
            .filter(c => c.title.indexOf(req.query.title) > -1);
    }
    if (!foundCourses.length) {
        res.sendStatus(404);
        return;
    }
    res.json(foundCourses);
});
app.get("/courses/:id", (req, res) => {
    const founder = db.courses.find(c => c.id === +req.params.id);
    if (!founder) {
        res.sendStatus(status.NotFound);
        return;
    }
    res.json(founder);
});
app.post("/courses", (req, res) => {
    if (!req.body.title) {
        res.sendStatus(400);
        return;
    }
    const createdCourse = {
        id: +(new Date()),
        title: req.body.title
    };
    db.courses.push(createdCourse);
    res
        .status(201)
        .json(createdCourse);
});
app.delete("/courses/:id", (req, res) => {
    const founder = db.courses.find(c => c.id !== +req.params.id);
    res.sendStatus(204);
    res.json(founder);
});
app.put("/courses/:id", (req, res) => {
    if (!req.body.title) {
        res.sendStatus(400);
        return;
    }
    const founder = db.courses.find(c => c.id === +req.params.id);
    if (!founder) {
        res.sendStatus(404);
        return;
    }
    founder.title = req.body.title;
    res.json(founder);
});
app.get("/", (req, res) => res.send("Hello!!!"));
app.get("/san4i", (req, res) => res.send("Hello San4i!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
