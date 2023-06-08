const { hashPassword, comparePassword } = require("../helper/auth.helper");
const User = require("../model/users.model");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    // 1.destructure name, email, password from req.body
    const { name, email, password } = req.body;
    // 2. all fields require validation
    if (!name.trim()) {
      return res.json({ error: "Name is Required" });
    }
    if (!email) {
      return res.json({ error: "Email is Required" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }
    // 3. check if email is taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "Email is Taken" });
    }
    // 4. hash password
    const hashedPassword = await hashPassword(password);
    // 5. register user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    // 6. create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    // 7. send response
    res.json({
      status: "Success",
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    // 1. Destructure email and password
    const { email, password } = req.body;
    // 2. User validation
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }
    // 3. Check if email is taken
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    // 4. compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "Invali email or password" });
    }
    // 5. create login jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    // 6. send response
    res.json({
      status: "success",
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(err);
  }
};

exports.authCheck = async (req, res) => {
  res.json({ status: "success" });
};

exports.adminCheck = async (req, res) => {
  res.json({ ok: true });
};

exports.getSecret = async (req, res) => {
  res.json({ currentUser: req.user });
};

exports.Updateprofile = async (req, res) => {
  try {
    const { name, password, address } = req.body;
    const user = await User.findById(req.user._id);
    // check password length
    if (password && password.length < 6) {
      return res.json({
        error: "password is required and must be at least 6 charecters long",
      });
    }
    // hashed password
    const hashedPassword = password ? await hashPassword(password) : undefined;

    //update user
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        pasword: hashedPassword || user.password,
        address: address || user.address,
      },
      { new: true }
    );
    updated.password = undefined;
    res.json({ status: "success", data: updated });
  } catch (error) {
    console.log(error);
  }
};
