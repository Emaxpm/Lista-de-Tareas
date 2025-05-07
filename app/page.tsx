import { obtenerTareas } from "@/lib/action.tarea";
import { obtenerEtiquetas } from "@/lib/action.etiqueta";
import TareaLista from "@/components/TareaLista";

export default async function Home() {

  const tareas = await obtenerTareas() as tareaInterFace[];
  const etiquetas = await obtenerEtiquetas() as etiquetaInterFace[];

  console.log("tareas", tareas)
  return (

    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <div className="flex flex-col gap-4 items-center max-w-screen-sm mb-18">

        <h1 className="text-4xl font-semibold text-gray-900 drop-shadow-xl">Lista de tareas</h1>

        <p className="text-gray-600 text-center">
          Descubre una nueva forma de gestionar tus tareas diarias con nuestra aplicación intuitiva y eficiente.
        </p>

      </div>

      <TareaLista
        tareas={tareas}
        etiquetas={etiquetas}
      />

    </div>
  );
}
