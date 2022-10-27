import { Router } from "express";
import TodoController from "./todoController.js";

const todoController = new TodoController();
const router = new Router();

router.get("/", todoController.getTodos.bind(todoController));
router.post("/", todoController.addTodo.bind(todoController));
router.put("/:id", todoController.updateTodo.bind(todoController));
router.delete("/:id", todoController.deleteTodo.bind(todoController));

export default router;