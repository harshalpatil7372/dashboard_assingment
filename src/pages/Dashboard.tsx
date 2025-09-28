import React from "react";
import { useFetchMock } from "../hooks/useFetchMock";
import { MetricCard } from "../components/cards/MetricCard";
import { ChartCard } from "../components/cards/ChartCard";
import { StackedBarConversion } from "../components/charts/StackedBarConversion";
import { DonutChart } from "../components/charts/DonutChart";
import { FunnelChart } from "../components/charts/FunnelChart";
import { LineBarSocial } from "../components/charts/LineBarSocial";
import { ChatPanel } from "../components/chat/ChatPanel";
import { TableCard } from "../components/cards/TableCard";
import { TopNav } from "../components/layout/TopNav";
import { SummaryCard } from "../components/SummaryCard";

export const Dashboard: React.FC = () => {
  const { data, loading, error } = useFetchMock("/mock/charts.json");
  const metricsHook = useFetchMock("/mock/metrics.json");

  if (loading || metricsHook.loading) return <div className="p-8">Loading...</div>;
  if (error || metricsHook.error) return <div className="p-8">Error: {error ?? metricsHook.error}</div>;
  if (!data || !metricsHook.data) return <div className="p-8">No data</div>;

  const metrics = metricsHook.data.metrics;

  return (
    <div className="min-h-screen bg-gray-50 p-3 md:p-6">
      <TopNav />
      <br />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((m) => (
            <MetricCard
              key={m.id}
              label={m.label}
              value={m.value}
              delta={m.delta}
              trend={
                m.trend === "positive"
                  ? "up"
                  : m.trend === "negative"
                  ? "down"
                  : "neutral"
              }
              progressValue={m.progressValue}
              progressColor={m.progressColor}
              benchmark={m.benchmark}
              target={m.target}
            />
          ))}
        </div>

        <div className="w-full">
          <div className="h-full min-h-[400px] lg:min-h-[500px]">
            <ChatPanel />
          </div>
        </div>
      </div>

      <SummaryCard
        title="Performance Summary"
        insights={[
          "Revenue increased by 15% compared to last quarter",
          "Social media engagement is up 34% month-over-month"
        ]}
      />
      <br/>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 space-y-4">
          <ChartCard
            title="Conversion Attribution"
            filters={
              <div className="flex flex-wrap gap-2">
                <select className="border rounded-lg text-sm px-2 py-1">
                  <option>All Campaigns</option>
                  <option>Campaign A</option>
                  <option>Campaign B</option>
                </select>
                <select className="border rounded-lg text-sm px-2 py-1">
                  <option>Conversions</option>
                  <option>Clicks</option>
                  <option>Revenue</option>
                </select>
              </div>
            }
            action={
              <button className="px-3 py-1 text-sm border rounded-lg text-indigo-600 border-indigo-300 hover:bg-indigo-50">
                View Summary
              </button>
            }
          >
            <StackedBarConversion data={data.conversion_attribution} />
          </ChartCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ChartCard 
              title="Funnel - Marketing Contribution" 
              action={
                <button className="px-3 py-1 text-sm border rounded-lg text-indigo-600 border-indigo-300 hover:bg-indigo-50">
                  View Summary
                </button>
              }
            >
              <FunnelChart data={data.funnel} />
            </ChartCard>

            <ChartCard 
              title="Visits by Topic" 
              action={
                <button className="px-3 py-1 text-sm border rounded-lg text-indigo-600 border-indigo-300 hover:bg-indigo-50">
                  View Summary
                </button>
              }
            >
              <DonutChart data={data.visits_by_topic} />
            </ChartCard>
          </div>

          <ChartCard 
            title="Social Media" 
            action={
              <button className="px-3 py-1 text-sm border rounded-lg text-indigo-600 border-indigo-300 hover:bg-indigo-50">
                View Summary
              </button>
            }
          >
            <LineBarSocial data={data.social} />
          </ChartCard>
        </div>

        {/* Right Column - Side Charts and Table */}
        <div className="space-y-4">
          <ChartCard 
            title="Visits by Popular Persona" 
            action={
              <button className="px-3 py-1 text-sm border rounded-lg text-indigo-600 border-indigo-300 hover:bg-indigo-50">
                View Summary
              </button>
            }
          >
            <DonutChart data={data.visits_by_topic} />
          </ChartCard>
          
          <ChartCard 
            title="Downloads by Type" 
            action={
              <button className="px-3 py-1 text-sm border rounded-lg text-indigo-600 border-indigo-300 hover:bg-indigo-50">
                View Summary
              </button>
            }
          >
            <DonutChart data={data.downloads_by_type} />
          </ChartCard>
          
          <TableCard rows={data.table_rows} />
        </div>
      </div>

      <div className="mb-8">
        <TableCard
          rows={data.channel_performance || []}
          title="Channel Performance"
        />
      </div>
    </div>
  );
};