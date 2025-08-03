const User = require("../model/Usercollection");

exports.addUser = async (req, res) => {
  const payload = req.body;
  try {
    const user = await User.findOne({
      Email: payload.Email,
    });
    if (user) {
      return res.status(409).json({ message: "Email already exists" });
    } else {
      const user = await User.create(payload);
      return res.status(201).send("User Created in Mongo DB!!");
    }
  } catch (error) {
    console.log("Error in Mongo DB user creation", error);
    return res.status(500).send(error.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.find().sort({ id: -1 });
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in get all Mongo", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (user) return res.status(200).json(user);
    else res.status(404).json({ error: "User not found" });
  } catch (error) {
    console.log("Error in get by ID mongo", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const payload = req.body;
    await User.findByIdAndUpdate(id, payload);
    return res.status(204).send("User updated");
  } catch (error) {
    console.log("Error in update user Mongo", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    return res.status(204).send("User deleted");
  } catch (error) {
    console.log("Error in delete Mongo", error);
    return res.status(500).json({ error: error.message });
  }
};
