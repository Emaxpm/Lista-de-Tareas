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
    FormDescription,
    FormMessage
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { createTarea, editarTarea } from "@/lib/action.tarea"
import { useRouter } from "next/navigation"

// Validación con Zod
const formSchema = z.object({
    _id:z.string().optional(),
    titulo: z.string().min(2),
    descripcion: z.string(),
    fechaACompletar: z.date(),
    isCompleted: z.boolean(),
})

type Props = {
    type: "crear" | "editar";
    data?: tareaInterFace;
}

const FormularioTareaNueva = ({ type, data }: Props) => {

    const [date, setDate] = React.useState<Date>()
    const router = useRouter();

    const tareaValoresPorDefecto = {
        titulo: "",
        descripcion: "",
        fechaACompletar: new Date(),
        isCompleted: false,
    }

    const tareaEditarValores = {
        _id: data?._id,
        titulo: data?.titulo,
        descripcion: data?.descripcion,
        fechaACompletar: data?.fechaACompletar ? new Date(data?.fechaACompletar) : new Date(),
        isCompleted: data?.isCompleted
    }

    const valoresIniciales = data && type === "editar" ? tareaEditarValores : tareaValoresPorDefecto;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: valoresIniciales,
    });


    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        try {

            if (type === "crear") {
                const tareaNueva = await createTarea(values)

                if (tareaNueva) {
                    router.push("/")
                    form.reset();
                } else {

                }
            }

            if (type === "editar" && values._id) {
                const tareaActualizada = await editarTarea(values as tareaInterFace);

                if (tareaActualizada) {
                    router.push("/")
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white border rounded-md p-4 space-y-8">
                <FormField
                    control={form.control}
                    name="titulo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Titulo</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="descripcion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="fechaACompletar"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fecha a completar</FormLabel>
                            <FormControl>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[280px] justify-start text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(date) => {
                                                // Asegurarse de que el valor sea una fecha antes de actualizar
                                                if (date) {
                                                    field.onChange(date); // Actualiza el valor en el formulario
                                                }
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isCompleted"
                    render={({ field }) => (
                        <FormItem className="flex flex-items-center gap-4">
                            <FormLabel>Tarea Completada? </FormLabel>
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Crear</Button>

            </form>
        </Form>
    )
}

export default FormularioTareaNueva
