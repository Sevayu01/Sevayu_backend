const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const { getId, getToken } = require("../other/JWT");
const app = require("../../src/app");
const { Doctors } = require("../testData");

let doctorId;
const doctorsTest = describe("Doctor Api Test", () => {
  //  Register a new doctor
  it("should register a new doctor", async () => {
    const newDoctorData = {
      Doctor: Doctors,
      hospitalid: getId(),
    };

    const res = await chai
      .request(app)
      .post("/api/doctor")
      .set("Authorization", `Bearer ${getToken()}`)
      .send(newDoctorData);
    doctorId = res.body.doctors[0]._id;
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.have.property("doctors");
  });

  //  Get doctors by hospital ID
  it("should get doctors by hospital ID", async () => {
    const res = await chai
      .request(app)
      .get(`/api/doctor/${getId()}`)
      .set("Authorization", `Bearer ${getToken()}`);

    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.have.property("doctors");
  });

  // update doctor

  it("should update  doctor", async () => {
    const newDoctorData = {
      ...Doctors,
      name: "updated name",
      hospitalid: getId(),
      doctorid: doctorId,
    };
    const res = await chai
      .request(app)
      .put("/api/doctor")
      .set("Authorization", `Bearer ${getToken()}`)
      .send(newDoctorData);

    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.have.property("doctors");
  });

  // delete doctor

  it("should delete  doctor", async () => {
    const res = await chai
      .request(app)
      .delete(`/api/doctor/${doctorId}`)
      .set("Authorization", `Bearer ${getToken()}`)
      .send({ hospitalid: getId() });

    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.have.property("msg");
  });
});
module.exports = { doctorsTest };
