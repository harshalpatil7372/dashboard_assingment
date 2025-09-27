import React from "react";

export const TableCard: React.FC<{ rows: any[]; title?: string }> = ({ rows, title }) => {
  if (!rows || rows.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-lg font-medium text-gray-900 mb-4">{title ?? "Table"}</div>
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <svg className="w-12 h-12 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-sm">No data available</p>
        </div>
      </div>
    );
  }

  const keys = Object.keys(rows[0]);
  
  const formatHeader = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  const formatCellValue = (value: any) => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return String(value);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {keys.map((k) => (
                <th 
                  key={k} 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatHeader(k)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((r, idx) => (
              <tr 
                key={idx} 
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {keys.map((k) => (
                  <td 
                    key={k} 
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {formatCellValue(r[k])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Showing {rows.length} {rows.length === 1 ? 'entry' : 'entries'}
        </div>
      </div>
    </div>
  );
};