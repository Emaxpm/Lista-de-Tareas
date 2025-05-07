import React from 'react'
import FormularioTareaNueva from '@/components/FormularioTareaNueva'

const page = async () => {

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <h2 className='mb-2'>Crear Tarea</h2>

        <FormularioTareaNueva 
        type="crear"
        />

    </div>
  )
}

export default page