const router = require("express").Router();
const { getuser } = require("../controllers/getUser");
const { verifyUserAuth } = require("../middleware/userAuth");

router.get("/:id", verifyUserAuth, getuser);

module.exports = router;
