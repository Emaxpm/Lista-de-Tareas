"use server"
import Tarea from "@/models/tareas"; // Asegúrate que el modelo se llama 'Tarea' como en el modelo que corregimos
import { connectToDataBase } from "@/utils/database"
import { revalidatePath } from "next/cache";

export const createTarea = async (tareaNueva: tareaNueva) => {

    try {
        await connectToDataBase();
        const tareas = new Tarea(tareaNueva)
        const tareaCreada = await tareas.save()

        revalidatePath("/")

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

        revalidatePath("/")

        return JSON.parse(JSON.stringify(tareaActualizada));
    } catch (error) {
        console.error("Error al editar la tarea:", error);
    }
};

export const ToggleEstadoTarea = async (tareaId: string) => {
    try {
        await connectToDataBase();

        const tareaAEditar = await Tarea.findById(tareaId) as tareaInterFace;

        if (!tareaAEditar) return;

        const tareaActualizada = await Tarea.findByIdAndUpdate(
            tareaAEditar._id,
            {
                isCompleted: !tareaAEditar.isCompleted, // ← cambia al valor opuesto
            },
            { new: true }
        );

        revalidatePath("/");

        return JSON.parse(JSON.stringify(tareaActualizada));
    } catch (error) {
        console.error("Error al editar la tarea:", error);
    }
};


export const borrarTarea = async (id: string) => {
    try {
        await connectToDataBase();

        const tareaBorrada = await Tarea.findByIdAndDelete(id);

        revalidatePath("/")

        return JSON.parse(JSON.stringify(tareaBorrada));

    } catch (error) {
        console.error("Error al borrar tarea:", error);
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
