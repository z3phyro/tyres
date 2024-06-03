import { Input, maxLength, minLength, object, regex, string } from "valibot";

export const InitializationSchema = object({
  projectName: string([
    minLength(1, "Project name is required"),
    maxLength(100, "Project name is too long"),
  ]),
  translationsPath: string([
    minLength(1, "Path to translations is required"),
    regex(/^(?:\.{1,2}\/)?(?:[a-zA-Z0-9_-]+\/)*$/, "Invalid path")
  ]),
  featureFlagsPath: string([
    minLength(1, "Path to feature flags is required"),
    regex(/^(?:\.{1,2}\/)?(?:[a-zA-Z0-9_-]+\/)*$/, "Invalid path")
  ])
});

export type InitializationSchemaForm = Input<typeof InitializationSchema>;

