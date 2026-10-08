import { AppShell } from "@/components/app-shell";
import { validateContent } from "@/content";
export default function Home() {
  const errors = validateContent();
  if (errors.length)
    throw new Error(
      `Educational content validation failed: ${errors.join("; ")}`,
    );
  return <AppShell />;
}
