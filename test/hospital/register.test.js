const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../app");
chai.use(chaiHttp);
const { HospitalData } = require("../testData");
const expect = chai.expect;

const registerTest = it("should create a new hospital", (done) => {
  chai
    .request(app)
    .post("/api/auth/hospital/register")
    .send(HospitalData)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.have.property("accessToken");
      done();
    });
});
module.exports = { registerTest };
