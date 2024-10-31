import { z } from 'zod';

export const subjectSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  teacher: z.string({
    required_error: 'Teacher name is required',
  }),
});
