import jwt from "jsonwebtoken";

const JWT_SECRET = "AAYUSH_IS_THE_BEST";

const fetchUser = (req, res, next) => {
  //Get the user from JWT token and add id to req object
  const token = req.header("auth-token");

  if (!token) {
    res.status(401).send({
      error: "Please authenticate using a valid token",
    });
  }
  try {
    const string = jwt.verify(token, JWT_SECRET);
    req.user = string.user;
    next();
  } catch (error) {
    res.status(401).send({
      error: "Please authenticate using a valid token",
    });
  }
};
export default fetchUser;
