"use client"
import React, { useEffect, useState } from 'react'
import TareaTarjeta from './ui/TareaTarjeta';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

type Props = {
    tareas: tareaInterFace[];
    etiquetas: etiquetaInterFace[]
}

const TareaLista = ({ tareas, etiquetas }: Props) => {

    const [buscar, setBuscar] = useState("")
    const router = useRouter()
    const [listaTareas, setListaTareas] = useState(tareas)

    useEffect(() => {

        const tareasFiltradas = tareas.filter((tarea) =>
            tarea.titulo.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) ||
            tarea.descripcion.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) ||
            tarea.fechaACompletar.toString().toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) ||
            etiquetas.some((etiqueta) => etiqueta._id === tarea.etiquetaId && etiqueta.nombre.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()))
        )

        setListaTareas(tareasFiltradas)

    }, [tareas, buscar, etiquetas])

    function handleClick() {
        router.push("/tareas/crear")
    }

    return (
        <div className='flex flex-col w-full gap-6 max-w[1024px]'>

            <div className="flex flex-col md:flex-row justify-between w-full items-start md:items-baseline gap-4">

                <input type="text" placeholder='Buscar...' value={buscar} onChange={(e) => setBuscar(e.target.value)} className='w-full max-w-[348px] p-2 border rounded-full shadow bg-white' />

                <Button className="mb-4 cursor-pointer" variant="default" onClick={handleClick}>Crear tarea </Button>

            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {
                    listaTareas.map((tarea, index) => (
                        <TareaTarjeta
                            key={index}
                            tarea={tarea}
                            etiquetas={etiquetas}
                        />
                    ))}

            </section>
        </div>
    )
}

export default TareaLista