import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1),
  project: z.string(),
  assignedTo: z.string().optional(),
});