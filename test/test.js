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


            console.log(`ID: ${JSON.parse(testRes.text)}`)
            assert.equal(JSON.parse(testRes.text)[0].id, 50)
            assert.equal(JSON.parse(testRes.text)[0].name, "test")
            assert.equal(moneyParser(JSON.parse(testRes.text)[0].budget), 1000)

            const deleteRes = await req(app).
                delete("/envelopes/50")
        })
    })
})


/*it("throws error if body.params are empty", async ()=>{
    req(app).
    get("/envelopes")
*/