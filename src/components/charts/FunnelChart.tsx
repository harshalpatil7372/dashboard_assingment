import React, { useState } from "react";

export const FunnelChart: React.FC<{ 
  data: { stage: string; value: number }[] 
}> = ({ data }) => {
  
  const defaultData = [
    { stage: "Impressions", value: 1182 },
    { stage: "Clicks", value: 909 }
  ];
  
  const chartData = data && data.length > 0 ? data : defaultData;
  
  if (!chartData || chartData.length === 0) {
    return <div className="text-gray-400 p-4">No funnel data</div>;
  }

  const getSegmentWidth = (index: number, total: number) => {
    const baseWidth = 100;
    const reduction = (100 / (total + 1)) * (index + 1);
    return Math.max(30, baseWidth - reduction);
  };

  const getSegmentColor = (index: number) => {
    const colors = [
      'bg-gradient-to-r from-blue-200 to-blue-300',
      'bg-gradient-to-r from-blue-400 to-blue-500', 
      'bg-gradient-to-r from-blue-600 to-blue-700'
    ];
    return colors[index] || 'bg-blue-500';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
        </div>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="relative w-full max-w-md">
          {chartData.map((item, index) => {
            const segmentWidth = getSegmentWidth(index, chartData.length);
            const segmentColor = getSegmentColor(index);
            
            return (
              <div key={index} className="relative mb-1">
                <div 
                  className={`${segmentColor} mx-auto relative flex items-center justify-center text-white font-medium shadow-sm`}
                  style={{ 
                    width: `${segmentWidth}%`, 
                    height: '60px',
                    clipPath: index < chartData.length - 1 
                      ? 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)'
                      : 'polygon(5% 0%, 95% 0%, 90% 100%, 10% 100%)'
                  }}
                >
                  <div className="text-center">
                    <div className="text-sm font-medium">{item.stage}</div>
                    <div className="text-lg font-bold">{item.value.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            );
          })}
        <div className="mt-4 text-right w-full max-w-md">
          <div className="text-sm text-gray-600 mb-1">Cost Per</div>
          <div className="text-sm text-gray-600">Conversion - $23.02</div>
        </div>
        </div>
      </div>
    </div>
  );
};