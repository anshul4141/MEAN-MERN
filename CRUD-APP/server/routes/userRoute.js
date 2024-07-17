import express from "express";
import { create, getAll, getOne, remove, update } from "../controller/userController.js"; // Adjusted import path

const route = express.Router(); // Use Router() instead of Route()

route.post("/create", create);
route.get("/getAll", getAll);
route.get("/getOne/:id", getOne);
route.post("/update/:id", update);
route.post("/remove/:id", remove);

export default route;
