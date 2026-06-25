import type { z } from "zod/v4";
import type { createBlogFormSchema } from "./schemas";

export type CreateBlogFormValues = z.infer<typeof createBlogFormSchema>;
