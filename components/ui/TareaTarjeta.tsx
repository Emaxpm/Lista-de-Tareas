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
import { CheckIcon, Trash2, Pencil } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { useRouter } from 'next/navigation'
import { borrarTarea } from '@/lib/action.tarea'

type Props = {
    _id: string,
    titulo: string;
    desc: string;
    date: string;
    isCompleted: boolean;
}

const TareaTarjeta = ({_id, titulo, desc, date, isCompleted }: Props) => {

    const [completed, setCompleted] = useState(isCompleted)
    const router = useRouter()

    const handleClick = () => {
        setCompleted((prevState) => !prevState)
    }

    const handleEditar = () =>{
        router.push(`/tareas/editar/${_id}`)
    }

    async function handleEliminar() {
        if(_id){   
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

                {completed ? (
                    <CheckIcon className='text-green-600' />
                ) : (
                    <Button variant="outline" onClick={handleClick}>Completar</Button>
                )}

                <div className='flex gap-3'>
                    <Pencil className='text-gray-400 hover:text-blue-500 cursor-pointer' onClick={handleEditar} />
                    <Trash2 className='text-gray-400 hover:text-red-500 cursor-pointer' onClick={handleEliminar}/>
                </div>
            </CardFooter>

        </Card>

    )
}

export default TareaTarjeta