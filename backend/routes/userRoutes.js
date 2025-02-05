const express = require("express");
const { registerUser, loginUser, getUsers, deleteUser, updateUser } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);


module.exports = router;
