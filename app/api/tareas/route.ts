import { connectToDataBase } from "@/utils/database"
import tarea from "@/models/tareas"
import { NextResponse } from "next/server"

export async function GET() {

    try {

        await connectToDataBase();

        const tareas = await tarea.find();
        return NextResponse.json(tareas);
    } catch (error) {
        console.error("Error al obtener tareas:", error);
        return new NextResponse("Error interno del servidor", {status:500});
    }
};

export async function POST(request: Request){
   
    try {
        await connectToDataBase();
        const data = await request.json()
        const tareas = new tarea(data) 
        const tareaCreada = await tareas.save()

        return NextResponse.json(tareaCreada, {status:201});
        
    } catch (error) {
        console.log("Error", error)
        return new NextResponse("Error interno del servidor", {status:500});
    }
}