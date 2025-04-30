"use server"
import Tarea from "@/models/tareas"; // Asegúrate que el modelo se llama 'Tarea' como en el modelo que corregimos
import { connectToDataBase } from "@/utils/database"

export const createTarea = async(tareaNueva: tareaNueva) =>{

    try {
        await connectToDataBase();
        const tareas = new Tarea(tareaNueva) 
        const tareaCreada = await tareas.save()

        return JSON.parse(JSON.stringify(tareaCreada))
        
    } catch (error) {
        console.log("Error", error)
    }
}

export const editarTarea = async (tareaDatos: tareaInterFace) => {
    try {
        await connectToDataBase();

        const tareaAEditar = await Tarea.findById(tareaDatos._id) as tareaInterFace;

        if (!tareaAEditar) return;

        const tareaActualizada = await Tarea.findByIdAndUpdate(
            tareaAEditar._id,
            tareaDatos,
            { new: true }
        );

        return JSON.parse(JSON.stringify(tareaActualizada));
    } catch (error) {
        console.error("Error al editar la tarea:", error);
    }
};

export const borrarTarea = async () => {
    
    try {
        await connectToDataBase();
        const tareaID = "680bdfa4fa414680e48fc085"

        const tareaBorrada = await Tarea.findByIdAndDelete(tareaID)

        return "ok"
    } catch (error) {
        
    }
}

export const obtenerTareas = async () => {

    try {

        await connectToDataBase();

        const tareas = await Tarea.find();
        return JSON.parse(JSON.stringify(tareas));
    } catch (error) {
        console.error("Error al obtener tareas:", error);
        return []; 
    }
};

export const obtenerTarea = async (tareaId: string) => {

    try {

        await connectToDataBase();

        const tareas = await Tarea.findById(tareaId);
        return JSON.parse(JSON.stringify(tareas));
    } catch (error) {
        console.error("Error al obtener tareas:", error);
        return []; 
    }
};
