import jwt from "jsonwebtoken";
import db from "../db.js";

export default async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.staus(401).json({ message: "Not Auth" });
    }
    const decode = jwt.verify(token, "SECRET_KEY");

    console.log(decode);

    req.user = await db.user.findUnique({ where: { id: decode.id } });
    next();
  } catch (error) {
    res.staus(401).json({ message: "Not Auth" });
  }
}
