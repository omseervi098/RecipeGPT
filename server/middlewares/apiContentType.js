export const apiContent = function (req, res, next) {
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    if (!req.is("application/json")) {
      return res.status(400).json({
        message: "Content-Type must be application/json",
      });
    } else {
      next();
    }
  } else {
    next();
  }
};
