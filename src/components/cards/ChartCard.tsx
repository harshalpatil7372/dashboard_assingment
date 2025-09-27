import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
  className?: string;
  filters?: React.ReactNode; // allow passing dropdowns/filters
  action?: React.ReactNode;  // allow passing action button (e.g., "View Summary")
};

export const ChartCard: React.FC<Props> = ({
  title,
  children,
  className,
  filters,
  action,
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-md p-5 ${className ?? ""}`}>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        {/* Title + Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <h2 className="text-base font-semibold text-gray-800">{title}</h2>
          {filters && <div className="flex flex-wrap gap-2">{filters}</div>}
        </div>

        {/* Action (e.g., button, link) */}
        {action && <div className="mt-2 sm:mt-0">{action}</div>}
      </div>

      {/* Body / Children */}
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
};
