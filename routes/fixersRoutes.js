import express from "express";
import political_fixers_controller from "../controllers/political_fixers_controller.js";
import token from "../middlewares/auth.js";

const router = express.Router();

//Crear un operador político

router.post("/", political_fixers_controller.createFixer);

//Trae un listado de todos los operadores políticos

router.get("/", token, political_fixers_controller.listFixer);

//Trae un listado de operador políticos por ID

router.get("/:id", token, political_fixers_controller.listFixerId);

//Actualizar la información de un operador político

router.put("/:id", token, political_fixers_controller.updateFixer);

//Eliminar un operador político

router.delete("/:id", token, political_fixers_controller.deleteFixer);

export default router;
