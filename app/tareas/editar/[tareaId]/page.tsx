// SIN "use client" – componente del servidor
import { obtenerTarea } from "@/lib/action.tarea";
import FormularioTareaNueva from "@/components/FormularioTareaNueva";

type Props = {
  params: { tareaId: string };
};

export default async function Page({ params }: Props) {
  const tarea = await obtenerTarea(params.tareaId); // Se obtiene desde el servidor

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-slate-300">
      <h1>Editar Tarea</h1>
      <FormularioTareaNueva type="editar" data={tarea} />
    </div>
  );
}





