import { Router } from "express";
import TodoController from "../Controller/todoController";

const todoController = new TodoController();
const router = new Router();

router.get("/", todoController.getTodos.bind(todoController));
router.post("/", todoController.addTodo.bind(todoController));
router.patch("/:id", todoController.updateTodo.bind(todoController));
router.delete("/:id", todoController.deleteTodo.bind(todoController));

export default router;
