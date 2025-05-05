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
declare type etiquetaInterFace = {
    _id: string;
    nombre: string;
}

declare type etiquetaParams = {
    nombre: string;
}