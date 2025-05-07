"use client"
import { borrarEtiqueta } from '@/lib/action.etiqueta'
import { XIcon } from 'lucide-react'
import React from 'react'

type Props = {
    etiqueta: etiquetaInterFace
}

const EtiquetaTarjeta = ({etiqueta}: Props) => {

    function handleBorrar() {
        borrarEtiqueta(etiqueta._id!)
    }

  return (
    <div className='flex justify-between items-center gap-6 min-w-28 bg-white border rounded-full shadow p-3'>
        <span className='text-gray-800 capitalize'>
            {etiqueta.nombre}
        </span>

            <XIcon
            size={18}
            className='text-gray-400 cursor-pointer hover:text-red-600'
            onClick={handleBorrar}
            />
    </div>
  )
}

export default EtiquetaTarjeta