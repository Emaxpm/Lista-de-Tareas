"use server"

import tarea from "@/models/tareas"
import { connectToDataBase } from "@/utils/database"

export const createTarea = async(tareaNueva: tareaNueva) =>{
    // const tareaNueva = {
    //     titulo: "Hola soy prueba",
    //     desc: "Holaaa sigo siendo la prueba",
    //     isCompleted: false
    // }

    await connectToDataBase();

    try {
        const tareas = new tarea(tareaNueva) 
        const tareaCreada = await tareas.save()

        return JSON.parse(JSON.stringify(tareaCreada))
        
    } catch (error) {
        console.log("Error", error)
    }
}

export const editarTarea = async() =>{

    await connectToDataBase();

    try {
        const tareaID = "680bdae0fa414680e48fc083"

        const tareaNueva = {
            titulo: "Hola soy prueba 2",
            desc: "Holaaa sigo siendo la prueba 222",
            isCompleted: false
        }

        const tareaActualizada = await tarea.findByIdAndUpdate(tareaID, tareaNueva, {new:true})

        return JSON.parse(JSON.stringify(tareaActualizada))

    } catch (error) {
        
    }
}

export const borrarTarea = async () => {

    await connectToDataBase();

    try {
        const tareaID = "680bdfa4fa414680e48fc085"

        const tareaBorrada = await tarea.findByIdAndDelete(tareaID)

        return "ok"
    } catch (error) {
        
    }
}

export const obtenerTareas = async () => {
    try {
        const tareas = await tarea.find();
        return JSON.parse(JSON.stringify(tareas));
    } catch (error) {
        console.error("Error al obtener tareas:", error);
        return []; // ⚠️ Esto evita que tareas sea undefined
    }
};
