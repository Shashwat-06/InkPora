import bcrypt, { hash } from "bcryptjs";
import { User } from "../models/user.js";
import { generateTokenAndSetCookies } from "../utils/generateTokenAndSetCookies.js";
import { verificationMail, welcomeEmail } from "../resend/resend.config.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All Fields are required!");
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      verificationToken: verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24hrs
    });

    await user.save();

    generateTokenAndSetCookies(res, user._id);
    await verificationMail(user.email, verificationToken);

    res
      .status(200)
      .json({ success: true, message: "User Created Successfully" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const verifyMail = async (req, res) => {
  const { code } = req.body;
  try {
    if (!code) {
      throw new Error("All Fields are required!");
    }
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      res.status(400).json({ success: false, message: "user not found" });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    user.save();

    await welcomeEmail(user.email, user.name);

    res
      .status(200)
      .json({ success: true, message: "User Verified Successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
    console.log(error);
  }
};
