import { AnalyticsChartSkeleton } from "./components/analytics/chart";

export default function DashboardLoading() {
  return (
    <main className="p-8 h-layout overflow-y-auto">
      <AnalyticsChartSkeleton />
      <section className="pt-8">
        <h3 className="text-2xl mb-4">Últimos pedidos</h3>
      </section>
    </main>
  );
}
