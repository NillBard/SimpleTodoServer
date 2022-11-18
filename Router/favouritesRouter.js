import { Router } from "express";
import FavouritesController from "../Controller/favouritesController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const favouritesController = new FavouritesController();
const router = new Router();

router.post(
  "/add",
  authMiddleware,
  favouritesController.addFavourites.bind(favouritesController)
);
router.delete(
  "/remove",
  authMiddleware,
  favouritesController.removeFavourites.bind(favouritesController)
);
router.get(
  "/",
  authMiddleware,
  favouritesController.getAllFavourites.bind(favouritesController)
);

export default router;
