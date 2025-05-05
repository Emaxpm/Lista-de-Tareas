"use client"
import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckIcon, Trash2, Pencil, CircleCheckBigIcon, CircleIcon } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { useRouter } from 'next/navigation'
import { borrarTarea, ToggleEstadoTarea } from '@/lib/action.tarea'

type Props = {
    _id: string,
    titulo: string;
    desc: string;
    date: string;
    isCompleted: boolean;
}

const TareaTarjeta = ({ _id, titulo, desc, date, isCompleted }: Props) => {

    const [completed, setCompleted] = useState(isCompleted)
    const router = useRouter()

    const handleCompletarTarea = async () => {

        if (_id) {
            const tareaActualizada = await ToggleEstadoTarea(_id);
            setCompleted(tareaActualizada.isCompleted);
        }
    }

    const handleEditar = () => {
        router.push(`/tareas/editar/${_id}`)
    }

    async function handleEliminar() {
        if (_id) {
            const tareaBorrada = await borrarTarea(_id);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-xl text-gray-800'>
                    {titulo}
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
                <p className='text-sm textgray-600'> {desc} </p>
            </CardContent>
            <Separator />
            <CardFooter className='flex flex-wrap items-center justify-between gap-4'>
                <p className="text-sm text-gray-600">
                    {date}
                </p>

                <div className='flex gap-3'>

                    <Pencil className='text-gray-400 hover:text-blue-500 cursor-pointer' onClick={handleEditar} />

                    <Trash2 className='text-gray-400 hover:text-red-500 cursor-pointer' onClick={handleEliminar} />

                    {completed ? (
                        
                        <CircleCheckBigIcon className="text-green-600 cursor-pointer"  onClick={handleCompletarTarea} />

                    ) : (
                        <CircleIcon className="text-gray-400 hover:text-green-600 cursor-pointer" onClick={handleCompletarTarea}/>
                    )}

                </div>
            </CardFooter>

        </Card>

    )
}

export default TareaTarjeta