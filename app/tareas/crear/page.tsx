"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { borrarTarea, editarTarea } from '@/lib/action.tarea'
import FormularioTareaNueva from '@/components/FormularioTareaNueva'

const page = async () => {

  

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

        <FormularioTareaNueva 
        type="crear"
        />

    </div>
  )
}

export default page