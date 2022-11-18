import db from "../db.js";

export default class FavouritesController {
  async addFavourites(req, res) {
    try {
      const body = req.body;
      const userId = req.user.id;
      console.log(body);
      console.log(userId);

      const location = body.location.name;
      const origin = body.origin.name;

      const favourite = await db.favourite.create({
        data: {
          ...body,
          location,
          origin,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      console.log("favourites", favourite);

      res.status(200).json({ data: favourite });
    } catch (error) {
      console.log(error);
    }
  }

  async removeFavourites(req, res) {
    try {
      const body = req.body;
      const userId = req.user.id;

      const user = await db.user.update({
        where: { id: userId },
        data: {
          favourites: {
            disconnect: {
              id: body.id,
            },
          },
        },
      });
      res.status(200).json({ data: user });
    } catch (error) {}
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
