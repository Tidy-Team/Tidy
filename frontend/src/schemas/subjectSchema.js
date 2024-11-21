import { z } from 'zod'

export const subjectSchema = z.object({
  title: z.string({
    required_error: 'El título es obligatorio',
  }),
  teacher: z.string({
    required_error: 'El título es obligatorio',
  }),
})
