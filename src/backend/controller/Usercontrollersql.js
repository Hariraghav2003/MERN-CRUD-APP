const User = require("../model/Usermodel");

exports.createUser = async (req, res) => {
  const payload = req.body;
  try {
    // Check if email already exists
    const existingUser = await User.findOne({
      where: { Email: payload.Email },
    });

    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Create new user only if no duplicate found
    await User.create(payload);
    res.status(201).send("User created in SQL!!");
  } catch (err) {
    console.log("Error in SQL DB user creation", err);
    return res.status(400).json({ error: err.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["ID", "DESC"]],
    });

    res.json(users);
  } catch (error) {
    console.log("Error in get all SQL", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) res.json(user);
    else res.status(404).json({ error: "User not found" });
  } catch (error) {
    console.log("Error in get by ID SQL", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const result = await User.update(req.body, {
      where: { ID: req.params.id },
    });
    res.json({ message: "User updated", result });
  } catch (error) {
    console.log("Error in update user SQL", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { ID: req.params.id } });
    res.json({ message: "User deleted" });
  } catch (error) {
    console.log("Error in delete user SQL", error);
    return res.status(500).json({ error: error.message });
  }
};
