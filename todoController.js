import db from "./db.js";

export default class TodoController {
  async getTodos(_, res) {
    const todos = await db.TodoItem.findMany();
    todos
      ? res.status(200).json({ data: todos })
      : res.status(404).json({ messeage: "List not found" });
  }

  async addTodo(req, res) {
    try {
      const { title, description, done } = req.body;
      console.log(req.body);
      const newTodo = await db.TodoItem.create({
        data: {
          title,
          description: description ?? "",
          done: done ?? false,
        },
      });

      res.status(200).json({ data: newTodo });
    } catch (error) {
      console.log(error);
    }
  }

  async updateTodo(req, res) {
    const { title, description, done } = req.body;
    const id = +req.params.id;
    try {
      const todo = await db.TodoItem.findUnique({ where: { id } });
      if (!todo) {
        res.status(404).json({ messeage: "Not Found" });
      }
      const updatedTodo = await db.TodoItem.update({
        where: { id },
        data: {
          title,
          description,
          done,
        },
      });
      res.status(200).json({ data: updatedTodo });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTodo(req, res) {
    const id = +req.params.id;
    try {
      const todo = await db.TodoItem.findUnique({ where: { id } });
      if (!todo) res.status(404).json({ messeage: "Not Found" });
      const deletedTodo = await db.TodoItem.delete({ where: { id } });
      res.status(200).json({ data: deletedTodo });
    } catch (error) {
      console.log(error);
    }
  }
}
