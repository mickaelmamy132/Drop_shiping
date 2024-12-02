import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const dataset = [
  { month: 'Jan', london: 18.9, paris: 53, newYork: 83.6, seoul: 28.2 },
  { month: 'Feb', london: 28.8, paris: 47.9, newYork: 78.8, seoul: 25.1 },
  { month: 'Mar', london: 39.3, paris: 64.8, newYork: 88.5, seoul: 47.3 },
  { month: 'Apr', london: 43.4, paris: 50.2, newYork: 94.5, seoul: 64.9 },
  { month: 'May', london: 49.9, paris: 62.1, newYork: 98.4, seoul: 69.1 },
  { month: 'Jun', london: 55.9, paris: 58.1, newYork: 93.7, seoul: 89.4 },
];

const valueFormatter = (value) => `${value}mm`;

const chartSetting = {
  yAxis: [
    {
      label: 'rainfall (mm)',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

export default function BarsDataset() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'london', label: 'London', valueFormatter },
        { dataKey: 'paris', label: 'Paris', valueFormatter },
        { dataKey: 'newYork', label: 'New York', valueFormatter },
        { dataKey: 'seoul', label: 'Seoul', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}