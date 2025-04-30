declare type tareaNueva = {
    titulo:string;
    descripcion: string;
    fechaACompletar: Date;
    isCompleted: boolean
}

declare type tareaInterFace = {
    _id: string;
    titulo: string;
    descripcion: string;
    fechaACompletar: Date; // <-- usar Date
    isCompleted: boolean;
}
