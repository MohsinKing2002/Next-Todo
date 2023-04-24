import { asyncError, errorHandler } from "../../../middlewares/error";
import { checkAuth, connectDB } from "../../../utils/features";

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET")
    return errorHandler(res, 400, "Get method is allowed !");

  await connectDB();

  let user = await checkAuth(req);
  if (!user) return errorHandler(res, 401, "Please login !");

  res.status(201).json({
    success: true,
    user,
  });
});

export default handler;
