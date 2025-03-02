import { TriangleAlert } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="text-sm bg-red-100 text-destructive py-2 px-4 flex gap-2 rounded-md">
      <TriangleAlert size={16} className="mt-[.2rem]" />
      <div>{message}</div>
    </div>
  );
}
