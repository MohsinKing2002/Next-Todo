import { asyncError, errorHandler } from "../../../middlewares/error";
import { setCookies } from "../../../utils/features";

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET")
    return errorHandler(res, 400, "GET method is allowed !");

  setCookies(res, null, false);

  res.status(201).json({
    success: true,
    message: "User Logged out !",
  });
});

export default handler;
