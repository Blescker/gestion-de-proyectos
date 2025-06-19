// controllers/planificacion.controller.js
import axios from 'axios';
import { List } from '../models/List.js';
import { Card } from '../models/Card.js';
import { Project } from '../models/Project.js';

export const generarPlan = async (req, res) => {
  const { descripcion, proyectoId } = req.body;

  if (!descripcion || !proyectoId) {
    return res.status(400).json({ msg: 'Descripción y proyectoId son requeridos' });
  }

  try {
    // 1. Enviar mensaje a la IA (Flask/LangChain)
    const respuesta = await axios.post('http://langchain:5001/planificar', {
      mensaje: descripcion,
      sesion_id: req.user._id
    });

    const mensajeIA = respuesta.data.respuesta;

    // 2. Intentar parsear el JSON si existe
    let planJSON = null;
    try {
      // Busca un bloque JSON en la respuesta de la IA
      const match = mensajeIA.match(/\{[\s\S]*\}/);
      if (match) planJSON = JSON.parse(match[0]);
    } catch (e) {
      // No hay JSON, solo explicación
    }

    // 3. Si hay JSON, crear listas y tareas
    if (planJSON && planJSON.listas) {
      const creadas = [];
      for (const lista of planJSON.listas) {
        // Crea la lista
        const nuevaLista = new List({
          nombre: lista.nombre,
          proyectoId,
        });
        const listaGuardada = await nuevaLista.save();

        // Crea las tareas/cards de la lista
        for (const tarea of (lista.tareas || [])) {
          const nuevaCard = new Card({
            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            listaId: listaGuardada._id,
          });
          await nuevaCard.save();
        }
        creadas.push(listaGuardada);
      }
      return res.status(201).json({ msg: 'Planificación creada', listas: creadas });
    }

    // 4. Si no hay JSON, solo envía la explicación al frontend
    res.status(200).json({ mensajeIA });

  } catch (error) {
    console.error('Error en /api/planificar:', error);
    res.status(500).json({ msg: 'No se pudo generar la planificación' });
  }
};
