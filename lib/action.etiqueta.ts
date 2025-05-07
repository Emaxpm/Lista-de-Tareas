"use server"
import Etiqueta from "@/models/etiqueta";
import { connectToDataBase } from "@/utils/database";
import { revalidatePath } from "next/cache";

export const createEtiqueta = async (etiquetaNueva: etiquetaParams) => {

    try {
        await connectToDataBase();
        const etiqueta = new Etiqueta(etiquetaNueva)
        const etiquetaCreada = await etiqueta.save()

        revalidatePath("/etiquetas")

        return JSON.parse(JSON.stringify(etiquetaCreada))

    } catch (error) {
        console.log("Error", error)
    }
}

export const editarEtiqueta = async (etiqueta: etiquetaInterFace) => {

    try {
        await connectToDataBase();

        const etiquetaAEditar = await Etiqueta.findById(etiqueta._id) as etiquetaInterFace;

        if (!etiquetaAEditar) return;

        const etiquetaActualizada = await Etiqueta.findByIdAndUpdate(
            etiquetaAEditar._id,
            etiqueta,
            { new: true }
        );

        revalidatePath("/etiquetas")

        return JSON.parse(JSON.stringify(etiquetaActualizada));
    } catch (error) {
        console.error("Error al editar la tarea:", error);
    }
};

export const borrarEtiqueta = async (etiquetaId: string) => {
    try {
        await connectToDataBase();

        const etiquetaBorrada = await Etiqueta.findByIdAndDelete(etiquetaId);

        revalidatePath("/etiquetas")

        return JSON.parse(JSON.stringify(etiquetaBorrada));

    } catch (error) {
        console.error("Error al borrar tarea:", error);
    }
}

export const obtenerEtiquetas = async () => {
    try {
        await connectToDataBase();
        const etiquetas = await Etiqueta.find()
        return JSON.parse(JSON.stringify(etiquetas));

    } catch (error) {
        console.log("Error:", error)
    }
}