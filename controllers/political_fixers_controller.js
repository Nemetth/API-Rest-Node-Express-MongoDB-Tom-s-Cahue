import Fixer from "../models/political_fixers_models.js";
import bcrypt from "bcrypt";

//Crear un operador

async function createFixer(req, res) {
  try {
    const fixer = new Fixer({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    const createdFixer = await fixer.save();
    res.status(201).json(createdFixer);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el operador político" });
  }
}

//Trae un listado de todos los operadores

async function listFixer(req, res) {
  try {
    const fixers = await Fixer.find();
    res.json(fixers);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la lista de Fixers" });
  }
}

//Trae un operador por Id

async function listFixerId(req, res) {
  const fixerId = req.params.id;
  try {
    const fixer = await Fixer.findById(fixerId);
    if (!fixer) {
      return res.status(404).json({ error: "Fixer no encontrado" });
    }
    res.json(fixer);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el Fixer por ID" });
  }
}

//Modificar un operador

async function updateFixer(req, res) {
  const fixerId = req.params.id;
  const newData = req.body;
  try {
    const fixer = await Fixer.findByIdAndUpdate(fixerId, newData, {
      new: true,
    });
    if (!fixer) {
      return res.status(404).json({ error: "Fixer no encontrado" });
    }
    res.json(fixer);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el fixer" });
  }
}

//Eliminar un operador

async function deleteFixer(req, res) {
  const fixerId = req.params.id;
  try {
    const fixer = await Fixer.findByIdAndDelete(fixerId);
    if (!fixer) {
      return res.status(404).json({ error: "Fixer no encontrado" });
    }
    res.json(fixer);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el fixer" });
  }
}

const fixers_controllers = {
  createFixer,
  listFixer,
  listFixerId,
  updateFixer,
  deleteFixer,
};

export default fixers_controllers;
