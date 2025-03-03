import { MetricData } from "@/types/metrics";

interface BaseChartProps {
  data: MetricData[];
  title: string;
  height?: number;
  width?: number;
  className?: string;
}

export function BaseChart({
  data,
  title,
  height = 300,
  width = 500,
  className,
}: BaseChartProps) {
  // Common chart setup and container logic
  return (
    <div className={`chart-container ${className || ""}`}>
      <h3>{title}</h3>
      <div style={{ height, width }}>
        {/* Child components will render here */}
      </div>
    </div>
  );
}
