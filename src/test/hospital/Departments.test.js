const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../app");
chai.use(chaiHttp);
const expect = chai.expect;
const { getId, getToken } = require("../other/JWT");

const departments = describe("Departments Api Tests", () => {
  it("should get all departments", (done) => {
    chai
      .request(app)
      .get(`/api/hospital/${getId()}/departments`)
      .set("Authorization", `Bearer ${getToken()}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        if (res.body.departments.message) {
          expect(res.body.departments.message).to.equal("No Departments found");
        } else expect(res.body.departments).to.be.an("array");
        done();
      });
  });
});
module.exports = { departments };
