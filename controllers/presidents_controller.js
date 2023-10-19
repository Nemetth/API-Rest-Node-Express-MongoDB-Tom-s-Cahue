import President from "../models/presidents_models.js";

//Crear un presidente

async function createPresident(req) {
  console.log();
  let president = new President({
    name: req.body.name,
    age: req.body.age,
    description: req.body.description,
    ideology: req.body.ideology,
    status: req.body.status,
  });
  return await president.save();
}

//Trae un listado de todos los presidentes

async function listPresident(req, res) {
  try {
    const presidents = await President.find();
    res.json(presidents);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la lista de presidentes" });
  }
}

//Trae un presidente por Id

async function listPresidentId(req, res) {
  const presidentId = req.params.id;
  try {
    const president = await President.findById(presidentId);
    if (!president) {
      return res.status(404).json({ error: "Presidente no encontrado" });
    }
    res.json(president);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el presidente por ID" });
  }
}

//Modificar un presidente

async function updatePresident(req, res) {
  const presidentId = req.params.id;
  const newData = req.body;
  try {
    const president = await President.findByIdAndUpdate(presidentId, newData, {
      new: true,
    });
    if (!president) {
      return res.status(404).json({ error: "Presidente no encontrado" });
    }
    res.json(president);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el presidente" });
  }
}

//Eliminar un presidente

async function deletePresident(req, res) {
  const presidentId = req.params.id;
  try {
    const president = await President.findByIdAndDelete(presidentId);
    if (!president) {
      return res.status(404).json({ error: "Presidente no encontrado" });
    }
    res.json(president);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el presidente" });
  }
}

//Filtrar presidentes por edad

async function ageFilter(req, res) {
  const age = req.query.age;

  try {
    const presidents = await President.find({ age: { $gte: age } });
    res.json(presidents);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la lista de presidentes" });
  }
}

//Filtrar presidentes por ideología

async function ideologyFilter(req, res) {
  const ideology = req.query.ideology;
  try {
    const presidents = await President.find({ ideology: ideology });
    res.json(presidents);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la lista de presidentes" });
  }
}

//Traer presidentes ordenados por su edad de mayor a menor

async function orderedAge(req, res) {
  try {
    const presidents = await President.find().sort({ age: 1 });
    console.log(presidents);
    res.json(presidents);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la lista de presidentes" });
  }
}

//Traer presidentes paginados

async function paginatedPresident(req, res) {
  const paginated = req.query.paginated;
  const limited = req.query.limit;
  const skipedPagge = (paginated - 1) * limited;
  console.log(limited);
  console.log(skipedPagge);
  console.log(paginated);
  try {
    const presidents = await President.find().skip(skipedPagge).limit(limited);
    res.json(presidents);
  } catch {
    res.status(500).json({ error: "Error al obtener la lista de presidentes" });
  }
}

const presidents_controller = {
  createPresident,
  listPresident,
  updatePresident,
  createPresident,
  listPresidentId,
  deletePresident,
  ageFilter,
  ideologyFilter,
  orderedAge,
  paginatedPresident,
};

export default presidents_controller;
