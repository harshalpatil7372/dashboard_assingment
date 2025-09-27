import React from "react";
import { render, screen } from "@testing-library/react";
import { LineBarSocial } from "./charts/LineBarSocial";

// Mock recharts to avoid canvas issues in tests
jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  ComposedChart: ({ children, data }) => (
    <div className="recharts-composed-chart" data-testid="composed-chart">
      {children}
      <div data-testid="chart-data">{JSON.stringify(data)}</div>
    </div>
  ),
  XAxis: () => <div className="recharts-x-axis" />,
  YAxis: () => <div className="recharts-y-axis" />,
  Tooltip: () => <div className="recharts-tooltip" />,
  Legend: () => <div className="recharts-legend" />,
  Bar: () => <div className="recharts-bar" />,
  Line: () => <div className="recharts-line" />
}));

describe("LineBarSocial", () => {
  it("renders without crashing when data is empty array", () => {
    render(<LineBarSocial data={[]} />);
    expect(screen.getByTestId("composed-chart")).toBeInTheDocument();
  });

  it("handles array data format correctly", () => {
    const mockData = [
      { date: "2024-01-01", likes: 100, shares: 50, impressions: 1000 },
      { date: "2024-01-02", likes: 150, shares: 60, impressions: 1200 }
    ];

    render(<LineBarSocial data={mockData} />);
    
    const chartData = screen.getByTestId("chart-data");
    expect(chartData.textContent).toContain("2024-01-01");
    expect(chartData.textContent).toContain("100");
  });

  it("transforms object-with-arrays format correctly", () => {
    const mockData = {
      date: ["2024-01-01", "2024-01-02"],
      likes: [100, 150],
      shares: [50, 60],
      impressions: [1000, 1200]
    };

    render(<LineBarSocial data={mockData} />);
    
    const chartData = screen.getByTestId("chart-data");
    const parsedData = JSON.parse(chartData.textContent);
    
    expect(parsedData).toHaveLength(2);
    expect(parsedData[0]).toEqual({
      date: "2024-01-01",
      likes: 100,
      shares: 50,
      impressions: 1000
    });
  });

  it("handles missing data points by using zero as default", () => {
    const incompleteData = {
      date: ["2024-01-01", "2024-01-02"],
      likes: [100], // missing second value
      shares: [50, 60],
      impressions: [1000, 1200]
    };

    render(<LineBarSocial data={incompleteData} />);
    
    const chartData = screen.getByTestId("chart-data");
    const parsedData = JSON.parse(chartData.textContent);
    
    expect(parsedData[1].likes).toBe(0); // Should default to 0
    expect(parsedData[1].shares).toBe(60);
  });

  it("renders all chart components", () => {
    const mockData = [
      { date: "2024-01-01", likes: 100, shares: 50, impressions: 1000 }
    ];

    render(<LineBarSocial data={mockData} />);
    
    expect(screen.getByTestId("composed-chart")).toBeInTheDocument();
    expect(screen.getByText(/chart-data/)).toBeInTheDocument();
  });

  it("applies correct container styling", () => {
    const mockData = [{ date: "2024-01-01", likes: 100, shares: 50, impressions: 1000 }];
    
    const { container } = render(<LineBarSocial data={mockData} />);
    
    const wrapperDiv = container.firstChild;
    expect(wrapperDiv).toHaveStyle("width: 100%");
    expect(wrapperDiv).toHaveStyle("height: 280px");
  });

  it("handles null or undefined data safely", () => {
    render(<LineBarSocial data={null} />);
    expect(screen.getByTestId("composed-chart")).toBeInTheDocument();
    
    render(<LineBarSocial data={undefined} />);
    expect(screen.getByTestId("composed-chart")).toBeInTheDocument();
  });

  it("handles empty object data", () => {
    render(<LineBarSocial data={{}} />);
    expect(screen.getByTestId("composed-chart")).toBeInTheDocument();
  });
});