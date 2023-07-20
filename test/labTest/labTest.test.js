const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const { getId, getToken } = require("../other/JWT");
const app = require("../../app");
const { Test } = require("../testData");

let testId;
const LabTestTest = describe("Test Api Test", () => {
  //  create a labtest
  it("should create a new labtest", async () => {
    const newTestData = {
      Test: Test,
      hospitalId: getId(),
    };

    const res = await chai
      .request(app)
      .post("/api/labtest")
      .set("Authorization", `Bearer ${getToken()}`)
      .send(newTestData);
    testId = res.body.test[0]._id;
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.have.property("test");
  });

  //  Get test by hospital ID
  it("should get test by hospital ID", async () => {
    const res = await chai
      .request(app)
      .get(`/api/labtest/${getId()}`)
      .set("Authorization", `Bearer ${getToken()}`);
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.have.property("test");
  });

  // update test

  it("should update  test", async () => {
    const newTestData = {
      ...Test,
      name: "updated name",
      hospitalId: getId(),
      testId: testId,
    };
    const res = await chai
      .request(app)
      .put("/api/labtest")
      .set("Authorization", `Bearer ${getToken()}`)
      .send(newTestData);

    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.have.property("updatedTest");
  });

  // delete test

  it("should delete test", async () => {
    const res = await chai
      .request(app)
      .delete(`/api/labtest/${testId}`)
      .set("Authorization", `Bearer ${getToken()}`)
      .send({ hospitalId: getId() });

    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.have.property("message");
  });
});
module.exports = { LabTestTest };
