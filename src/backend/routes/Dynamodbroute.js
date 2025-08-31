const express = require("express");
const router = express.Router();
const userController = require("../controller/Dynamodbcontroller");

router.post("/createuser", userController.createUser);
router.get("/getallusers", userController.getUsers);
router.get("/getuser/:id", userController.getUserById);
router.put("/updateuser/:id", userController.updateUser);
router.delete("/deleteuser/:id", userController.deleteUser);

module.exports = router;
