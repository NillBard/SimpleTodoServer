import db from "../db.js";

export default class FavouritesController {
  async addFavourites(req, res) {
    try {
      const { id } = req.body;
      const userId = req.user.id;
      console.log(id);
      const user = await db.user.update({
        where: { id: userId },
        data: {
          favourites: {
            connectOrCreate: {
              where: {
                id,
              },
              create: { id },
            },
          },
        },
      });

      const characters = await db.Favourites.findUnique({ where: { id } });

      res.status(200).json({ data: characters });
    } catch (error) {
      console.log(error);
    }
  }

  async removeFavourites(req, res) {
    try {
      const { id } = req.body;
      const userId = req.user.id;

      const user = await db.user.findUnique({
        where: { id: userId },
      });

      const updateUser = await db.user.update({
        where: { id: userId },
        data: {
          favourites: {
            disconnect: { id },
          },
        },
      });
      const characters = await db.Favourites.findUnique({ where: { id } });

      res.status(200).json({ data: characters });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllFavourites(req, res) {
    try {
      const userId = req.user.id;
      const favourites = await db.Favourites.findMany({
        where: {
          user: {
            some: {
              id: userId,
            },
          },
        },
      });
      favourites
        ? res.status(200).json({ data: favourites })
        : res.status(404).json({ message: "Not Found" });
    } catch (error) {
      console.log(error);
    }
  }
}
