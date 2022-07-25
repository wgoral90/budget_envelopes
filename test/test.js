const { doesNotMatch } = require('assert')
const assert = require('assert')
const { expect } = require('chai')

const req = require('supertest')
const app = require("../server.js")


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
                    id: 'dfs',
                    name: 'test',
                    budget: '1000'
                }).
                expect(400).
                then(response => {
                    assert(response.body, "Wrong idsss input")

                })
            console.log(res.body)


        })
    })
})

/*it("throws error if body.params are empty", async ()=>{
    req(app).
    get("/envelopes")
*/