const { Router } = require("express");
const router = Router();
const { getUsers, postUsers, deleteUsers, putUsers, patchUsers } = require('../controllers/users');

router.get("/", getUsers);
router.put("/:id", putUsers);
router.post("/", postUsers);
router.delete("/", deleteUsers);
router.patch("/", patchUsers)

module.exports = router;