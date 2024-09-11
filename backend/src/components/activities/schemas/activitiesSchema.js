import { z } from "zod";

export const activitiesSchema = z.object({
  titulo: z
    .string()
    .min(1, "Debe tener título")
    .max(100, "El titulo debe tener menos de 100 caracteres"),
  description: z.string().optional(),
  fecha_inicio: z
    .date()
    .refine((date) => date <= new Date(), "No te pueden dar una tarea futura"),
  fecha_fin: z
    .date()
    .refine(
      (date) => date >= new Date(),
      "La fecha de fin no puede ser en el pasado"
    ),
  estado: z
    .enum(["pendiente", "en progreso", "completada"])
    .default("pendiente"),
  user_id: z.number().int().positive(),
  prioridad_id: z.number().int().positive(),
});
