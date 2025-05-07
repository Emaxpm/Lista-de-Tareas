"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { borrarTarea, editarTarea } from '@/lib/action.tarea'
import FormularioTareaNueva from '@/components/FormularioTareaNueva'

const page = () => {

    // async function handleCrear() {
    //     const tarea = await createTarea()
    // }

    // async function handleEditar() {
    //     const tarea = await editarTarea()
    //     console.log("Tarea Editad", tarea)
    // }

    // async function handleBorrar() {
    //     const tarea = await borrarTarea()
    // }

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] min-h-screen p-8 pb-20 sm:p-20 bg-gradient-to-r from-green-200 via-blue-200 to-blue-400">

        <FormularioTareaNueva 
        type="crear" 
        />

    </div>
  )
}

export default page