import { Router } from "express";
import { UserController } from "../controllers/userController";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", userController.createUser);
userRoutes.get("/", userController.getAllUsers);
userRoutes.get("/:id", userController.getUserById);
userRoutes.put("/:id", userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);

export default userRoutes;
