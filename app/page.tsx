import TareaTarjeta from "@/components/ui/TareaTarjeta";
import { obtenerTareas } from "@/lib/action.tarea";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default async function Home() {

 const tareas = await obtenerTareas() as tareaInterFace[];

  console.log("tareas", tareas)
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] 	bg-slate-300">
      <div className="flex flex-col gap-4 items-center max-w-screen-sm mb-18">

        <h1 className="text-4xl font-semibold text-gray-900 drop-shadow-xl">Lista de tareas</h1>

        <p className="text-gray-600 text-center">
          Descubre una nueva forma de gestionar tus tareas diarias con nuestra aplicación intuitiva y eficiente.
        </p>

      </div>

      <div className="flex justify-end w-full">
        <Link href="/tareas/crear">
        <Button className="mb-4" variant="default">Crear tarea </Button>
        </Link>
        
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full ">
        {
          tareas.map((tarea,index) => (
            <TareaTarjeta
            key={index}
            _id={tarea._id}
            titulo={tarea.titulo}
            desc={tarea.descripcion}
            date={new Date(tarea.fechaACompletar).toLocaleDateString("es-ES")}
            isCompleted={tarea.isCompleted}

            />
          ))}

      </section>
    </div>
  );
}
