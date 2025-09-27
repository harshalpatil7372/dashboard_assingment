import React from "react";

type Props = {
  label: string;
  value: number | string;
  delta?: number;
  trend?: 'up' | 'down' | 'neutral';
  progressValue?: number;
  progressColor?: 'green' | 'orange' | 'blue' | 'red';
  benchmark?: number;
  target?: number;
};

export const MetricCard: React.FC<Props> = ({ 
  label, 
  value, 
  delta, 
  trend = 'neutral',
  progressValue = 75,
  progressColor = 'green',
  benchmark,
  target
}) => {
  const deltaStr = delta === undefined ? null : `${delta > 0 ? "+" : ""}${delta}%`;
  
  const getProgressColorClass = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-500';
      case 'orange': return 'bg-orange-500';
      case 'blue': return 'bg-blue-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendIcon = () => {
    if (trend === 'up') {
      return (
        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
        </svg>
      );
    } else if (trend === 'down') {
      return (
        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow">
      {/* Header with label and trend icon */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-600 font-medium">{label}</div>
        <div className="flex items-center gap-1">
          {getTrendIcon()}
          <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Main value */}
      <div className="text-3xl font-bold text-gray-900 mb-3">
        {value}
      </div>

      {/* Delta/Change indicator */}
      {deltaStr && (
        <div className="mb-3">
          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
            delta! >= 0 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          }`}>
            {delta! >= 0 ? '↗' : '↘'} {deltaStr}
          </span>
        </div>
      )}

      {/* Progress bar */}
      <div className="mb-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${getProgressColorClass(progressColor)}`}
            style={{ width: `${Math.min(progressValue, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Bottom metrics */}
      <div className="flex justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          {benchmark && (
            <span>
              <span className="text-gray-400">Benchmark:</span> {benchmark.toLocaleString()}
            </span>
          )}
          {target && (
            <span>
              <span className="text-gray-400">Target:</span> {target.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Data source attribution */}
      <div className="mt-2 pt-2 border-t border-gray-100">
        <div className="text-xs text-gray-400">
          Data sourced from: Adobe Analytics • 1 Mar - 18 Mar
        </div>
      </div>
    </div>
  );
};