import { asyncError, errorHandler } from "../../middlewares/error";
import { Task } from "../../models/task";
import { checkAuth, connectDB } from "../../utils/features";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only POST Method is allowed !");
  await connectDB();

  const { title, description } = req.body;
  if (!title || !description)
    return errorHandler(res, 400, "Please Enter All the fields !");

  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 401, "Please login !");

  await Task.create({
    title,
    description,
    user: user._id,
  });

  res.json({
    success: true,
    message: "Task created !",
  });
});

export default handler;
