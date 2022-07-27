const { doesNotMatch } = require('assert')
const asserts = require('assert')
const { expect } = require('chai')
const { assert } = require('chai')
const req = require('supertest')
const app = require("../server.js")
const { moneyParser } = require('../utils/helperFunctions.js')


describe("Envelope", () => {
    describe("GET", () => {
        it("returns envelopes", async () => {
            const res = await req(app).
                get("/envelopes")


            assert.notEqual(res, null)
        })
        it("returns 200 status if req is valid", async () => {
            const res = await req(app).
                get("/envelopes")

            assert.equal(res.status, 200)
        })
    })
    describe("POST", () => {


        it("throws error if id is empty", async () => {

            const res = await req(app).
                post("/envelopes").
                send({
                    id: '',
                    name: 'test',
                    budget: '1000'
                })

            assert.equal(res.text, "Wrong id input")

        })
        it("throws error if id has invalid input", async () => {

            const res = await req(app).
                post("/envelopes").
                send({
                    id: 'dsa',
                    name: 'test',
                    budget: '1000'
                })

            assert.equal(res.text, "Wrong id input")

        })
        it("throws error name is empty", async () => {

            const res = await req(app).
                post("/envelopes").
                send({
                    id: '50',
                    name: '',
                    budget: '1000'
                })

            assert.equal(res.text, "Wrong name input")

        })
        it("throws error if name has invalid input", async () => {

            const res = await req(app).
                post("/envelopes").
                send({
                    id: '50',
                    name: '1',
                    budget: '1000'
                })

            assert.equal(res.text, "Wrong name input")

        })
        it("throws if budget is empty", async () => {

            const res = await req(app).
                post("/envelopes").
                send({
                    id: '50',
                    name: 'test',
                    budget: ''
                })

            assert.equal(res.text, "Wrong budget input")

        })
        it("throws if budget  has invalid input", async () => {

            const res = await req(app).
                post("/envelopes").
                send({
                    id: '50',
                    name: 'test',
                    budget: 'one thousand'
                })

            assert.equal(res.text, "Wrong budget input")

        })
        it("posts correct envelope object", async () => {

            const res = await req(app).
                post("/envelopes").
                send({
                    id: '50',
                    name: 'test',
                    budget: '1000'
                })
            const testRes = await req(app).
                get("/envelopes/50")



            assert.equal(JSON.parse(testRes.text)[0].id, 50)
            assert.equal(JSON.parse(testRes.text)[0].name, "test")
            assert.equal(moneyParser(JSON.parse(testRes.text)[0].budget), 1000)

            const deleteRes = await req(app).
                delete("/envelopes/50")
        })
        it("sends 201 status if request is correct", async () => {

            const res = await req(app).
                post("/envelopes").
                send({
                    id: '50',
                    name: 'test',
                    budget: '1000'
                })




            assert.equal(res.status, 201)

            const deleteRes = await req(app).
                delete("/envelopes/50")
        })
        it("sends 400 status if request is in correct", async () => {

            const res = await req(app).
                post("/envelopes").
                send({
                    id: 'hhh',
                    name: 'test',
                    budget: '1000'
                })




            assert.equal(res.status, 400)


        })
    })
    describe("PUT", () => {
        it("correctly transfer budget", async () => {
            const testResOne = await req(app).
                post("/envelopes").
                send({
                    id: '50',
                    name: 'test',
                    budget: '1000'
                })
            const testResTwo = await req(app).
                post("/envelopes").
                send({
                    id: '51',
                    name: 'test',
                    budget: '1000'
                })


            const res = await req(app).
                put("/envelopes").
                send({
                    startId: "50",
                    destId: "51",
                    budget: "500"
                })

            const testGetRes = await req(app).
                get("/envelopes/50")

            const testGetResTwo = await req(app).
                get("/envelopes/51")

            assert.equal(JSON.parse(testGetRes.text)[0].budget, "500,00 zł")
            assert.equal(moneyParser(JSON.parse(testGetResTwo.text)[0].budget), 1500)

            const deleteRes = await req(app).
                delete("/envelopes/50")

            const deleteResTwo = await req(app).
                delete("/envelopes/51")


        })
    })
})
describe("envelope/:ID", () => {
    describe("PUT", () => {
        it("correctly changes parmeters", async () => {
            const postRes = await req(app).
                post("/envelopes").
                send({
                    id: '50',
                    name: 'test',
                    budget: '1000'
                })
            const res = await req(app).
                put("/envelopes/50").
                send({
                    name: "test2",
                    budget: "500"
                })
            const testGetRes = await req(app).
                get("/envelopes/50")

            assert.equal(JSON.parse(testGetRes.text)[0].budget, "500,00 zł")
            assert.equal(JSON.parse(testGetRes.text)[0].name, "test2")

            const deleteRes = await req(app).
                delete("/envelopes/50")
        })
    })
    describe("DELETE", () => {
        it("successfuly deletes envelope", async () => {
            const postRes = await req(app).
                post("/envelopes").
                send({
                    id: '50',
                    name: 'test',
                    budget: '1000'
                })
            const res = await req(app).
                delete("/envelopes/50")

            const testGetRes = await req(app).
                get("/envelopes/50")

            assert.equal(testGetRes.text, "[]")


        })
    })
    describe("GET", () => {
        it("succesfully retrieves one envelope", async () => {
            const postRes = await req(app).
                post("/envelopes").
                send({
                    id: '50',
                    name: 'test',
                    budget: '500'
                })

            const res = await req(app).
                get("/envelopes/50")

            assert.equal(JSON.parse(res.text)[0].budget, "500,00 zł")
            assert.equal(JSON.parse(res.text)[0].id, 50)
            assert.equal(JSON.parse(res.text)[0].name, "test")

            const deleteRes = await req(app).
                delete("/envelopes/50")
        })
    })
})

