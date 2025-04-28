import { Schema, model, models } from "mongoose";

const tareaSchema = new Schema({
    titulo:{
        type: String,
        require: true,
    },

    descripcion:{
        type: String,
    },

    fechaACompletar:{
        type: Date,
        default: new Date()
    },

    isCompleted:{
        type: Boolean,
    },
})

const tarea = models.tarea || model("tarea", tareaSchema)

export default tarea