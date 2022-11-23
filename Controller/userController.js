import db from "../db.js";
import jwt from "jsonwebtoken";
import bycrpt from "bcrypt";

export default class AuthController {
  _generateAccessToken(payload) {
    return jwt.sign(payload, "SECRET_KEY", { expiresIn: 60 * 60 });
  }

  _generateRefreshToken(payload) {
    return jwt.sign(payload, "SECRET_KEY", { expiresIn: "30d" });
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const candidate = await db.User.findUnique({ where: { email } });

      if (!candidate) {
        res.status(404).json({ messeage: "This user doesn't exist" });
      }

      const isValidPassword = await bycrpt.compare(
        password,
        candidate.password
      );

      if (!isValidPassword) {
        res.status(401).json({ messeage: "This password isn't compare" });
      }

      const refreshToken = this._generateRefreshToken({ id: candidate.id });
      const accessToken = this._generateAccessToken({
        id: candidate.id,
        email: candidate.email,
      });

      res.cookie("token_cookie", refreshToken, {
        sameSite: "lax",
        httpOnly: true,
        path: "/",
        maxAge: 86400,
      });

      res.status(200).json({ data: accessToken });
    } catch (error) {}
  }

  async register(req, res) {
    try {
      const { email, name, password } = req.body;

      const candidate = await db.User.findUnique({ where: { email } });

      if (candidate) {
        res.status(401).json({ messeage: "This user already exist" });
      }

      const hashPassword = await bycrpt.hash(password, 8);

      const user = await db.User.create({
        data: {
          ...req.body,
          password: hashPassword,
        },
      });

      const refreshToken = this._generateRefreshToken({ id: user.id });
      const accessToken = this._generateAccessToken({
        id: user.id,
        email: user.email,
        password: user.password,
      });

      res.cookie("token_cookie", refreshToken, {
        sameSite: "lax",
        httpOnly: true,
        path: "/",
        maxAge: 86400,
      });

      res.status(200).json({ data: accessToken });
    } catch (error) {
      console.log(error);
    }
  }

  async auth(req, res) {
    console.log(req.cookies);
    const cookieToken = req.cookies?.token_cookie;

    if (!cookieToken)
      return res.status(404).json({ message: "Cookies is empty" });

    const decode = jwt.verify(cookieToken, "SECRET_KEY");
    console.log(decode);
    const user = await db.user.findUnique({ where: { id: decode.id } });
    console.log("user", user);

    if (!user) {
      res.status(404).json({ message: "Error" });
    }

    const token = this._generateAccessToken({
      email: user.email,
      id: user.id,
      password: user.password,
    });
    const refreshToken = this._generateRefreshToken({ id: user.id });

    res.cookie("token_cookie", refreshToken, {
      sameSite: "lax",
      httpOnly: true,
      path: "/",
      maxAge: 3600 * 24 * 30,
    });
    res.status(200).json({ data: token });
  }
}
