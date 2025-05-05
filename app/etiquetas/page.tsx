import EtiquetaTarjeta from '@/components/EtiquetaTarjeta'
import FormularioEtiqueta from '@/components/FormularioEtiqueta'
import { Separator } from '@/components/ui/separator'
import { obtenerEtiquetas } from '@/lib/action.etiqueta'
import React from 'react'

const page = async() => {

  const etiquetas = await obtenerEtiquetas() as etiquetaInterFace[]


  return (
    <div>

        <h1 className='text-2xl font-semibold mb-4'>Etiquetas</h1>

        <FormularioEtiqueta
        type='crear'
        />

        <Separator className='my-5' />

        <div className='flex flex-wrap gap-6'>
          {etiquetas.map((etiqueta) => (
            <EtiquetaTarjeta
            key={etiqueta._id}
            etiqueta={etiqueta}
            />
          ))}
        </div>

        <Separator className='my-5' />

        <p className='text-gray-400'> {etiquetas.length} etiquetas</p>

    </div>
  )
}

export default page