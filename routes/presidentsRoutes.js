import express from "express";
import token from "../middlewares/auth.js";
import presidents_controller from "../controllers/presidents_controller.js";

const router = express.Router();

//Crear un presidente

router.post("/", token, presidents_controller.createPresident);

//Filtrar presidente por edad

router.get("/age", token, presidents_controller.ageFilter);

//Filtrar presidente por ideología

router.get("/ideology", token, presidents_controller.ideologyFilter);

//Traer un listado de presidentes con paginado

router.get("/paginated/", token, presidents_controller.paginatedPresident);

//Trae un listado de todos los presidentes

router.get("/", token, presidents_controller.listPresident);

//Trae un listado de presidentes por ID

router.get("/:id", token, presidents_controller.listPresidentId);

//Traer un listado de presidentes ordenados por su edad de menor a mayor

router.get("/age/order", token, presidents_controller.orderedAge);

//Actualizar la información de un documento

router.put("/:id", token, presidents_controller.updatePresident);

//Eliminar un presidente

router.delete("/:id", token, presidents_controller.deletePresident);

export default router;
