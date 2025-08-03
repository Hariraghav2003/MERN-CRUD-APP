const express = require("express");
const router = express.Router();
const userController = require("../controller/Usercontrollermongo");

router.post("/createuser", userController.addUser);
router.get("/getallusers", userController.getUser);
router.get("/getuser/:id", userController.getUserById);
router.put("/updateuser/:id", userController.updateUser);
router.delete("/deleteuser/:id", userController.deleteUser);

module.exports = router;
