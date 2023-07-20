const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../app");
chai.use(chaiHttp);
const expect = chai.expect;
const { getToken } = require("../other/JWT");
const { HospitalData } = require("../testData");

const searchHospitalTest = async () => {
  describe("Search Hospital Test", () => {
    it(" Should Search Hospital Test", (done) => {
      chai
        .request(app)
        .get(`/api/search/text?text=${HospitalData.name}`)
        .set("Authorization", `Bearer ${getToken()}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("hospitalList");
          done();
        });
    });
  });
};
module.exports = { searchHospitalTest };
