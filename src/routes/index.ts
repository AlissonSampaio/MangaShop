import { Router } from "express";
import mangaRoutes from "./mangaRoutes";
import userRoutes from "./userRoutes";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/manga", mangaRoutes);

export default routes;
