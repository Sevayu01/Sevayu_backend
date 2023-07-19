const loginTest = require("./hospital/login.test");
const registerTest = require("./hospital/register.test");
const { departments } = require("./hospital/Departments.test");
const { doctorsTest } = require("./doctor/doctor.test");
const end = require("./hospital/end.test");
const { bloodBankTest } = require("./bloodBank/bloodBank.test");
const {LabTestTest} = require("./labTest/labTest.test");

async function runTests() {
  await registerTest.registerTest();
  await loginTest.loginTest();
  await doctorsTest();
  await departments();
  await bloodBankTest();
  await LabTestTest();
  await end.end();
}
runTests();
