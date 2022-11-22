import db from "../db.js";

export default class FavouritesController {
  async addFavourites(req, res) {
    try {
      const { id } = req.body;
      const userId = req.user.id;

      const user = await db.user.update({
        where: { id: userId },
        data: {
          favourites: { connectOrCreate: { where: { id }, create: { id } } },
        },
        include: {
          favourites: true,
        },
      });

      console.log(user.favourites);

      res.status(200).json({ data: user.favourites });
    } catch (error) {
      console.log(error);
    }
  }

  async removeFavourites(req, res) {
    try {
      const { id } = req.body;
      const userId = req.user.id;

      const user = await db.user.update({
        where: { id: userId },
        data: {
          favourites: {
            disconnect: {
              id,
            },
          },
        },
        include: {
          favourites: true,
        },
      });
      res.status(200).json({ data: user });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllFavourites(req, res) {
    try {
      const userId = req.user.id;
      const allFavourites = await db.favourite.findMany({ where: { userId } });
      allFavourites
        ? res.status(200).json({ data: allFavourites })
        : res.status(404).json({ message: "Not Found" });
    } catch (error) {}
  }
}
