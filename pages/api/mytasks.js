import { asyncError, errorHandler } from "../../middlewares/error";
import { connectDB, checkAuth } from "../../utils/features";
import { Task } from "../../models/task";

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET")
    return errorHandler(res, 400, "GET method is allowed !");

  await connectDB();
  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 401, "Please log in !");

  let tasks = await Task.find({ user: user._id });

  res.status(200).json({
    success: true,
    tasks,
  });
});

export default handler;
