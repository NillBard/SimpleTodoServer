import db from "./db.js";

export default class TodoController {
  async getTodos(_, res) {
    const todos = await db.TodoItem.findMany();
    todos
      ? res.json({ status: 200, data: todos })
      : res.json({ status: 404, data: "List not found" });
  }

  async addTodo(req, res) {
    try {
      const { text, state } = req.body;
      const newTodo = await db.TodoItem.create({
        data: {
          text,
          state: state ?? false,
        },
      });

      res.json({ status: 200, data: newTodo });
    } catch (error) {
      console.log(error);
    }
  }

  async updateTodo(req, res) {
    const { text, state } = req.body;
    const id = +req.params.id;
    try {
      const todo = await db.TodoItem.findUnique({ where: { id } });
      if (!todo) {
        res.json({ status: 404, messeage: "notFound" });
      }
      await db.TodoItem.update({
        where: { id },
        data: {
          text,
          state,
        },
      });
      res.json({ status: 200, data: "Device updated" });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTodo(req, res) {
    const id = +req.params.id;
    try {
      const todo = await db.TodoItem.findUnique({ where: { id } });
      if (!todo) res.json({ status: 404, messeage: "Not Found" });
      await db.TodoItem.delete({ where: { id } });
      res.json({ status: 200, data: "Device deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}
