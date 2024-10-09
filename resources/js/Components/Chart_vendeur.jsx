import * as React from 'react';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsClipPath } from '@mui/x-charts/ChartsClipPath';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';

// Temporary dataset and valueFormatter
const dataset = [
  { month: 'Jan', seoul: 10, paris: 5 },
  { month: 'Feb', seoul: 12, paris: 6 },
  // Add more data as needed
];

const valueFormatter = (value) => `${value}°C`;

export default function Chart_vendeur() {
  const id = React.useId();
  const clipPathId = `${id}-clip-path`;
  return (
    <div style={{ width: '100%' }}>
      <ResponsiveChartContainer
        height={300}
        dataset={dataset}
        series={[
          { type: 'bar', dataKey: 'seoul', label: 'Seoul', valueFormatter },
          { type: 'bar', dataKey: 'paris', label: 'Paris', valueFormatter },
        ]}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      >
        <ChartsClipPath id={clipPathId} />
        <g clipPath={`url(#${clipPathId})`}>
          <BarPlot />
        </g>
        <ChartsXAxis />
        <ChartsYAxis />
      </ResponsiveChartContainer>
    </div>
  );
}