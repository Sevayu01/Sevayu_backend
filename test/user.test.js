const { userData } = require("./testData");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const app = require("../src/app");

const userTest = describe("User API Test", () => {
  it("should create a new User", async () => {
    const res = await chai
      .request(app)
      .post("/api/auth/user/register")
      .send(userData);
    expect(res).to.have.status(200);
    expect(res).to.be.json;
  });

  it("should login User", async () => {
    const res = await chai
      .request(app)
      .post("/api/auth/user/login")
      .send({ email: userData.email, password: userData.password });
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.have.property("user");
  });
});

module.exports = { userTest };
