const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../app");
chai.use(chaiHttp);
const { setToken } = require("../other/JWT");
const { HospitalData } = require("../testData");
const expect = chai.expect;
const loginTest =
  describe("Hospital Api Tests", () => {
    it("should login a hospital", (done) => {
      chai
        .request(app)
        .post("/api/auth/hospital/login")
        .send({ email: HospitalData.email, password: HospitalData.password })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property("accessToken");
          setToken(res.body.accessToken);
          done();
        });
    });
  });

module.exports = { loginTest };
