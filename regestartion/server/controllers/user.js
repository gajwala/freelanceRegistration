import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";
import configSchema from "../models/config.js";

const secret = "test";

export const config = async (req, res) => {
  const { firstName, lastName, gender, dob, id } = req.body;
  let result;
  try {
    if (id) {
      result = await configSchema.findOneAndUpdate(
        { _id: id },
        {
          firstName,
          lastName,
          dob,
          gender,
        },
        { new: true }
      );
    } else {
      result = await configSchema.create({
        firstName,
        lastName,
        dob,
        gender,
      });
    }

    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getConfig = async (req, res) => {
  try {
    const result = await configSchema.find({});
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, gender, dob } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      dob,
      gender,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};
