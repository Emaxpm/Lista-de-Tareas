"use client"
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Trash2, Pencil, CircleCheckBigIcon, CircleIcon } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { useRouter } from 'next/navigation'
import { borrarTarea, ToggleEstadoTarea } from '@/lib/action.tarea'

type Props = {
    tarea: tareaInterFace
    etiquetas: etiquetaInterFace[]
}

const TareaTarjeta = ({ tarea, etiquetas }: Props) => {

    const [completed, setCompleted] = useState(tarea.isCompleted)
    const router = useRouter()
    const [etiqueta, setEtiqueta] = useState<string>()

    const handleCompletarTarea = async () => {

        if (tarea._id) {
            const tareaActualizada = await ToggleEstadoTarea(tarea._id);
            setCompleted(tareaActualizada.isCompleted);
        }
    }

    const handleEditar = () => {
        router.push(`/tareas/editar/${tarea._id}`)
    }

    async function handleEliminar() {
        if (tarea._id) {
           await borrarTarea(tarea._id);
        }
    }

    useEffect(() => {
        const etiquetaSeleccionada = etiquetas.find((etiqueta) => etiqueta._id === tarea.etiquetaId)

        if (etiquetaSeleccionada) {
            setEtiqueta(etiquetaSeleccionada.nombre);
        }

    }, [etiquetas, tarea])

    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-xl text-gray-800'>
                    {tarea.titulo}
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
                <p className='text-sm textgray-600'> {tarea.descripcion} </p>
            </CardContent>
            <Separator />

            <div className='inline-block w-fit text-sm bg-gray-200 text-gray-800 rounded-full px-3 py-1 mx-4 my-2'>
                {etiqueta}
            </div>

            <CardFooter className='flex flex-wrap items-center justify-between gap-4'>
                <p className="text-sm text-gray-600">
                    {new Date(tarea.fechaACompletar).toLocaleDateString()}
                </p>

                <div className='flex gap-3'>

                    <Pencil className='text-gray-400 hover:text-blue-500 cursor-pointer' onClick={handleEditar} />

                    <Trash2 className='text-gray-400 hover:text-red-500 cursor-pointer' onClick={handleEliminar} />

                    {completed ? (

                        <CircleCheckBigIcon className="text-green-600 cursor-pointer" onClick={handleCompletarTarea} />

                    ) : (
                        <CircleIcon className="text-gray-400 hover:text-green-600 cursor-pointer" onClick={handleCompletarTarea} />
                    )}

                </div>
            </CardFooter>
        </Card>
    )
}

export default TareaTarjeta