import express from "express";
import { createUser, loginUser } from "./DBhelper.js";
import bcrypt from "bcrypt";

const router = express.Router();

const passGen = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

router.post("/signup", async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  const { adminKey } = req.body;

  const isUserExists = await loginUser(email);
  if (isUserExists)
    return res.status(404).send({ message: "User already exists" });

  const hashedPassword = await passGen(password);
  const newUser = adminKey
    ? await createUser({ email, password: hashedPassword, adminKey })
    : await createUser({ email, password: hashedPassword });
  res.send(newUser);
});

router.post("/login", async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  const { adminKey } = req.body;

  const isUserExists = await loginUser(email);
  if (!isUserExists)
    return res.status(404).send({ message: "User doesn't exists" });

  const hashedPassword = await bcrypt.compare(password, isUserExists.password);

  if (hashedPassword) {
    if (adminKey) {
      if (adminKey !== isUserExists.adminKey) {
        return res.status(403).send({ message: "Invalid admin key" });
      } else {
        return res.send(isUserExists);
      }
    } else {
      return res.send(isUserExists);
    }
  } else {
    res.status(404).send({ message: "Invalid Credentials" });
  }
});

export const userRouter = router;
