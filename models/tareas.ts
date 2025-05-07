import { Schema, model, models } from "mongoose";

const tareaSchema = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
  },
  fechaACompletar: {
    type: Date,
    default: () => new Date(),
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  etiquetaId: {
    type: Schema.Types.ObjectId,
    ref:"Etiqueta",
  }
});

const Tarea = models?.Tarea || model("Tarea", tareaSchema);
export default Tarea;
