import { asyncError, errorHandler } from "../../../middlewares/error";
import { User } from "../../../models/user";
import { connectDB, genarateToken, setCookies } from "../../../utils/features";
import bcrypt from "bcrypt";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "Post method is allowed !");

  const { email, password } = req.body;
  if (!email || !password)
    return errorHandler(res, 400, "Please Enter all the fields !");

  await connectDB();

  const user = await User.findOne({ email }).select("+password");
  if (!user) return errorHandler(res, 404, "Invalid login credentials !");

  //check for the hashed password & entered password
  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) return errorHandler(res, 400, "Invalid login credentials !");

  const token = genarateToken(user._id);
  setCookies(res, token, true);

  res.status(201).json({
    success: true,
    message: `Welcome back, ${user.name}`,
    user,
  });
});

export default handler;
