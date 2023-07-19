const chai = require('chai')
const chaiHttp = require('chai-http');
chai.use(chaiHttp)
const expect = chai.expect;
const { getId, getToken } = require("../other/JWT");
const app = require('../../app');
const {BloodBank} = require('../testData')

let BloodBankId;

const bloodBankTest =
    describe("BloodBank Api Test", () => {
        it("should register a new BloodBank", async () => {
            const newBloodBankData = {
                BloodBank: BloodBank,
                hospitalid: getId(),
            };

            const res = await chai
                .request(app)
                .post("/api/bloodbank")
                .set("Authorization", `Bearer ${getToken()}`)
                .send(newBloodBankData);
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.property("msg");
        });

        it("should get BloodBank by hospital ID", async () => {
            const res = await chai
                .request(app)
                .get(`/api/bloodbank/${getId()}`)
                .set("Authorization", `Bearer ${getToken()}`);
                BloodBankId = res.body.BloodBank[0]._id;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.property("BloodBank");
        });

        it("should update  BloodBank", async () => {
            const newBloodBankData = {
                ...BloodBank,
                type: "updated type",
                hospitalid: getId(),
                BloodBankid: BloodBankId,
            };
            const res = await chai
                .request(app)
                .put("/api/bloodbank")
                .set("Authorization", `Bearer ${getToken()}`)
                .send(newBloodBankData);

            expect(res).to.have.status(200);
            expect(res).to.be.json;
            // expect(res.body).to.have.property("bloodBank");
        });

        it("should delete BloodBank", async () => {
            const res = await chai
                .request(app)
                .delete(`/api/bloodbank/${BloodBankId}`)
                .set("Authorization", `Bearer ${getToken()}`)
                .send({ hospitalid: getId() });

            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.property("message");
        }
        );
    }
    );

    module.exports = {bloodBankTest}