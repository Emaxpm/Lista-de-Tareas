"use client";
import React, { useEffect, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { obtenerEtiquetas } from "@/lib/action.etiqueta";
import { Textarea } from "@/components/ui/textarea"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

const formSchema = z.object({
  _id: z.string().optional(),
  titulo: z.string().min(2),
  descripcion: z.string(),
  fechaACompletar: z.date(),
  isCompleted: z.boolean(),
  etiquetaId: z.string(),
})

type Props = {
  type: "crear" | "editar";
  data?: tareaInterFace;
}

const FormularioTareaNueva = ({ type, data, }: Props) => {

  const router = useRouter();
  const [etiquetaLista, setEtiquetaLista] = useState<etiquetaInterFace[]>([])

  const tareaValoresPorDefecto = {
    titulo: "",
    descripcion: "",
    fechaACompletar: new Date(),
    isCompleted: false,
    etiquetaId: "",
  }

  const tareaEditarValores = {
    _id: data?._id,
    titulo: data?.titulo,
    descripcion: data?.descripcion,
    fechaACompletar: data?.fechaACompletar ? new Date(data?.fechaACompletar) : new Date(),
    isCompleted: data?.isCompleted,
    etiquedaId: data?.etiquetaId,
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

  useEffect(() => {
    const fetchEtiquetas = async () => {
      const etiquetas = await obtenerEtiquetas() as etiquetaInterFace[];
      setEtiquetaLista(etiquetas)
    }
    fetchEtiquetas()
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white border rounded-md p-4 space-y-8">


        <div className="flex flex-col lg:flex-row gap-12">

          <div className="flex flex-col min-w-72 gap-6">

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
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <div className="flex flex-col min-w-72 gap-6">

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
              name="etiquetaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Etiqueta</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una Etiqueta" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {etiquetaLista?.map((etiqueta) => (
                          <SelectItem
                            key={etiqueta._id}
                            value={etiqueta._id!}>
                            <span className="capitalize">
                              {etiqueta.nombre}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

        </div>

        <Button className="cursor-pointer w-full" type="submit">
          {type === "editar" ? "Guardar" : "Crear"}
        </Button>

      </form>
    </Form>
  )
}

export default FormularioTareaNueva
