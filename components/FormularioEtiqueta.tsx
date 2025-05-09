"use client";
import React from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createEtiqueta, editarEtiqueta } from "@/lib/action.etiqueta";

const formSchema = z.object({
    _id:z.string().optional(),
    nombre: z.string().min(2),
})

type Props = {
    type: "crear" | "editar";
    data?: etiquetaInterFace;
}

const FormularioEtiqueta = ({ type, data }: Props) => {

    const tareaValoresPorDefecto = {
        nombre: "",
    }

    const etiquetasEditarValores = {
        _id: data?._id,
        nombre: data?.nombre,   
    }

    const valoresIniciales = data && type === "editar" ? etiquetasEditarValores : tareaValoresPorDefecto;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: valoresIniciales,
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        try {

            if (type === "crear") {
                const etiquetaNueva = await createEtiqueta(values)

                if (etiquetaNueva) {
                    form.reset();
                } else {

                }
            }

            if (type === "editar" && values._id) {
                const etiquetaActualizada = await editarEtiqueta(values as etiquetaInterFace);

                if (etiquetaActualizada) {
                    form.reset();
                } else {

                }
            }

        } catch (error) {
            console.log("Error:", error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[80%] sm:max-w-[90%] md:w-[50%] lg:w-[40%] mx-auto bg-white border rounded-md p-4 space-y-8">
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre de Etiqueta</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="cursor-pointer">Crear etiqueta</Button>

            </form>
        </Form>
    )
}

export default FormularioEtiqueta
