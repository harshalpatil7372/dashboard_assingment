import React, { useState } from "react";

interface SummaryCardProps {
  title?: string;
  insights?: string[];
  defaultExpanded?: boolean;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title = "Summary",
  insights = [],
  defaultExpanded = true 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  // Default insights if none provided
  const defaultInsights = [
    "Overall, in this time period, campaign GGG_Fund_Informercial drove the highest traffic, with an 22% above average campaign traffic",
    "Facebook underperformed this month, missing click through target by 12%",
    "Page GGG Fund Facts is the top visited site at 31,862 visits in this time period"
  ];
  
  const displayInsights = insights.length > 0 ? insights : defaultInsights;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div 
        className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <svg 
            className={`w-4 h-4 text-blue-600 transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <h3 className="text-sm font-medium text-blue-600">{title}</h3>
        </div>
        
        <button className="text-xs text-blue-600 hover:text-blue-800 transition-colors">
          Was this helpful?
        </button>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="px-4 py-4">
          <div className="mb-3">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Traffic</h4>
          </div>
          
          <ul className="space-y-3">
            {displayInsights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {insight}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Demo component showing multiple examples
export default function SummaryDemo() {
  return (
    <div className="p-6 bg-gray-50 space-y-6">
      {/* Default Summary */}
      <SummaryCard />
      
      {/* Custom Summary */}
      <SummaryCard
        title="Performance Summary"
        insights={[
          "Revenue increased by 15% compared to last quarter",
          "Social media engagement is up 34% month-over-month",
          "Email campaign CTR exceeded target by 8.2%"
        ]}
      />
      
      {/* Collapsed Summary */}
      <SummaryCard
        title="Weekly Insights"
        defaultExpanded={false}
        insights={[
          "Mobile traffic now represents 68% of total visits",
          "Conversion rate improved by 2.3% after landing page optimization",
          "Top performing content category is 'How-to Guides' with 45% engagement"
        ]}
      />
    </div>
  );
}