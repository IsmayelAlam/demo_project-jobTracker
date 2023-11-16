import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/token.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");

  try {
    const { userId } = verifyJWT(token);
    req.user = { userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};
