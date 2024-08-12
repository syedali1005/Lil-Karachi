import Users from "../models/userModel.js";

// login user
export const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await Users.findOne({ userId, password, verified: true });
    if (user) {
      res.status(200).send(user);
    } else {
      res.json({
        message: "Login Fail",
        user,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//register
export const registerController = async (req, res) => {
  try {
    const newUser = new Users({ ...req.body, verified: true });
    await newUser.save();
    res.status(201).send("new User added Successfully!");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};


