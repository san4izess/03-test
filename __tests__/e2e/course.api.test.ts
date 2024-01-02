import request from 'supertest'
import {app} from "../../src";
describe('/course',()=>{

    beforeAll(async ()=>{
        await request(app).delete('/__test__/data')
    })

    it('should return 200 and empty array',async () =>{
        await request(app)
            .get('/courses')
            .expect(200,[])
    })

    it('should return 404 for not existing course',async () =>{
        await request(app)
            .get('/courses/1')
            .expect(404)
    })

    it('shouldnt create course with incorrect input data', async ()=>{
        await request(app)
            .post('/courses')
            .send({title: ''})
            .expect(400)

        await request(app)
            .get('/courses')
            .expect(200,[])
    })

    let createdCourse1: any = null;
    it('should create course with correct input data', async ()=>{
        const createResponse = await request(app)
            .post('/courses')
            .send({title: 'san4izess course'})
            .expect(201)

        createdCourse1 = createResponse.body

        expect(createdCourse1).toEqual({
            id: expect.any(Number),
            title: 'san4izess course'
        })

        await request(app)
            .get('/courses')
            .expect(200,[createdCourse1])
    })
    let createdCourse2: any = null;
    it('create one more course', async ()=>{
        const createResponse = await request(app)
            .post('/courses')
            .send({title: 'san4izess course 2'})
            .expect(201)

        createdCourse2 = createResponse.body

        expect(createdCourse2).toEqual({
            id: expect.any(Number),
            title: 'san4izess course 2'
        })

        await request(app)
            .get('/courses')
            .expect(200,[createdCourse1, createdCourse2])
    })

    it('shouldnt update course with incorrect input data', async ()=>{
         await request(app)
            .put(`/courses/` + createdCourse1.id)
            .send({title: ''})
            .expect(400)

        await request(app)
            .get('/courses/' + createdCourse1.id)
            .expect(200, createdCourse1)
    })

    it('shouldnt update course that not exist', async ()=>{
        await request(app)
            .put(`/courses/` + -100)
            .send({title: 'good title'})
            .expect(404)
    })

    it('should update course with correct input data', async ()=>{
        await request(app)
            .put(`/courses/` + createdCourse1.id)
            .send({title: 'good new title'})
            .expect(204) // тут посмотреть после рефакторинга на 204

        await request(app)
            .get('/courses/' + createdCourse1.id)
            .expect(200,{
                ...createdCourse1,
                title: 'good new title'
            })

        await request(app)
            .get('/courses/' + createdCourse2.id)
            .expect(200, createdCourse2)
    })

    it('should delete both courses', async ()=>{
        await request(app)
            .delete(`/courses/` + createdCourse1.id)
            .expect(204)

        await request(app)
            .get('/courses/' + createdCourse1.id)
            .expect(404)

        await request(app)
            .delete(`/courses/` + createdCourse2.id)
            .expect(204)

        await request(app)
            .get('/courses/' + createdCourse2.id)
            .expect(404)

        await request(app)
            .get('/courses')
            .expect(200, [])
    })









































    // let createdCourse1 : any = null;
    // it('should create course with correct input data', async ()=>{
    //     const createResponse = await request(app)
    //         .post('/courses')
    //         .send({title: 'san4izess'})
    //         .expect(201)
    //
    //     createdCourse1 = createResponse.body
    //
    //     expect(createdCourse1).toEqual({
    //         id: expect.any(Number),
    //         title: 'san4izess'
    //     })
    //
    //     await request(app)
    //         .get('/courses')
    //         .expect(200, [createdCourse1])
    // })
    //
    // let createdCourse2 : any = null;
    // it('create one more course', async ()=>{
    //     const createResponse = await request(app)
    //         .post('/courses')
    //         .send({title: 'san4izess 2'})
    //         .expect(201)
    //
    //     createdCourse2 = createResponse.body
    //
    //     expect(createdCourse2).toEqual({
    //         id: expect.any(Number),
    //         title: 'san4izess 2'
    //     })
    //
    //     await request(app)
    //         .get('/courses')
    //         .expect(200, [createdCourse1, createdCourse2])
    // })
    //
    // it('shouldnt update course with incorrect input data', async ()=>{
    //     await request(app)
    //         .put(`/courses/` + createdCourse1.id)
    //         .send({title: ''})
    //         .expect(400)
    //
    //     await request(app)
    //         .get('/courses/' + createdCourse1.id)
    //         .expect(200, [createdCourse1])
    // })
    //
    // it('shouldnt update course that not exist', async ()=>{
    //     await request(app)
    //         .put(`/courses/` + -100)
    //         .send({title: 'good title'})
    //         .expect(404)
    // })
    //
    // it('should update course with incorrect input data', async ()=>{
    //     await request(app)
    //         .put(`/courses/` + createdCourse1.id)
    //         .send({title: 'good new title'})
    //         .expect(204)
    //
    //     await request(app)
    //         .get(`/courses` + createdCourse2.id)
    //         .expect(200, {
    //             ...createdCourse1,
    //             title: 'good new title'
    //         })
    //
    // })
    //
    // it('should delete both courses', async ()=>{
    //     await request(app)
    //         .delete(`/courses/` + createdCourse1.id)
    //         .expect(204)
    //
    //     await request(app)
    //         .get(`/courses` + createdCourse1.id)
    //         .expect(404)
    //
    //     await request(app)
    //         .delete(`/courses/` + createdCourse2.id)
    //         .expect(204)
    //
    //     await request(app)
    //         .get(`/courses` + createdCourse2.id)
    //         .expect(404)
    //
    //
    //
    //
    //     await request(app)
    //         .get(`/courses`)
    //         .expect(200, [])
    // })






})


