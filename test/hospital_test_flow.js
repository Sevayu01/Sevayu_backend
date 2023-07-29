const { loginTest } = require("./hospital/login.test");
const { registerTest } = require("./hospital/register.test");
const { departments } = require("./hospital/Departments.test");
const { doctorsTest } = require("./doctor/doctor.test");
const { end } = require("./hospital/end.test");
const { bloodBankTest } = require("./bloodBank/bloodBank.test");
const { LabTestTest } = require("./labTest/labTest.test");
const { searchHospitalTest } = require("./other/search.test");
const { userTest } = require("./user.test");
const logger = require("../src/utils/logger");

async function runTests() {
  try {
    await registerTest();
    await loginTest();
    await doctorsTest();
    await departments();
    await bloodBankTest();
    await LabTestTest();
    await searchHospitalTest();
    await userTest();
  } catch (err) {
    logger.info("Error in running tests" + err.message);
  }
}
const hospitaltests = async function runTests1() {
  await runTests();
  end();
};
hospitaltests;
