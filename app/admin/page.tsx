import { NavigationGrid } from "@/components/dashboard/navigation-grid";

export default function Page() {
  return (
    <div>
      <NavigationGrid loading={false} stats={null} />
    </div>
  );
}
