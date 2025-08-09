import { Spinner } from "@heroui/spinner";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner color="warning" size="lg" />
    </div>
  );
}
