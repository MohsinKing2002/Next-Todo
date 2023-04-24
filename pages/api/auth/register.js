import { asyncError, errorHandler } from "../../../middlewares/error";
import { User } from "../../../models/user";
import { connectDB, genarateToken, setCookies } from "../../../utils/features";
import bcrypt from "bcrypt";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "Post method is allowed !");

  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return errorHandler(res, 400, "Please Enter all the fields !");

  await connectDB();

  let user = await User.findOne({ email });
  if (user) return errorHandler(res, 400, "Email already exists !");

  //hashed user password
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashedPassword });

  const token = genarateToken(user._id);
  setCookies(res, token, true);

  res.status(201).json({
    success: true,
    message: "User Created !",
    user,
  });
});

export default handler;
