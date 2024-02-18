const zod = require("zod");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const nameSchema = zod.string().min(3);
const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(5);

const validateUser = (req, res, next) => {
  const username = req.body["username"];
  const email = req.body["email"];
  const password = req.body["password"];
  const nameResult = nameSchema.safeParse(username);
  const emailResult = emailSchema.safeParse(email);
  const passwordResult = passwordSchema.safeParse(password);

  if (nameResult.success && emailResult.success && passwordResult.success) {
    next();
  } else {
    next({ status: 400, success: false, error: "Invalid username or password" });
  }
};

const validateCredentials = (req, res, next) => {
  const email = req.body["email"];
  const password = req.body["password"];
  const emailResult = emailSchema.safeParse(email);
  const passwordResult = zod.string().min(1).safeParse(password);
  if (emailResult.success && passwordResult.success) {
    next();
  } else {
    // const errors = {
    //     email: emailResult.error?.message,
    //     password: passwordResult.error?.message,
    //   };
    //   next({ status: 400, message: 'Invalid inputs', errors });
    next({ status: 400, success: false, error: "Invalid username or password" });
  }
};

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(400)
      .json({ error: "Please validate using valid auth token..." });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(400).json({ error: "Please authenticate using valid token..." });
  }
};

module.exports = { validateUser, validateCredentials, fetchUser};
