import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const resgister = async (req, res) => {
  // check if the username, email & password is !empty
  // check if email aready exist
  // hash the password with bcryptjs
  // save the newUser data

  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "All Fields Are Required" });

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User Email Already Exist" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User successfully registered" });
  } catch (error) {
    res.status(500).json({ message: " Error at Register", error });
    console.log(error);
  }
};

export const login = async (req, res) => {
  // check if the email & password has values
  // chech if email exists
  // use bcryptjs to compare the password if its a match
  // generate a token with userId which expires in 1hr
  // send a cookie response to the client side which contain the token generated
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(401).json({ message: "All fields Are Required " });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid Credentials " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Credentials " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    res
      .cookie("token", token, { httpOnly: true })
      .json({ message: "Login successful", username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Error form Login" });
    console.log(error);
  }
};

export const logout = (req, res) => {
  // clearcookie and send a response to the client
  res.clearCookie("token").json({ message: "Logout successful" });
};

export const user = async (req, res) => {
  // find by id from req.user.id
  // send user to client side
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (user) return res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error from User side" });
    console.log(error);
  }
};
