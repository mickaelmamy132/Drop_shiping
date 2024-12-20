import * as React from 'react';

import { PieChart } from '@mui/x-charts/PieChart';
import { legendClasses } from '@mui/x-charts/ChartsLegend';


const otherProps = {
  width: 600,  // Increased width
  height: 400, // Increased height
  sx: {
    [`.${legendClasses.root}`]: {
      transform: 'translate(20px, 0)',
    },
  },
};

const data = [
  { team: 'Amber Ants', rank: 3, points: 31 },
  { team: 'Eagle Warriors', rank: 1, points: 50 },
  { team: 'Elephant Trunk', rank: 4, points: 18 },
  { team: 'Jaguars', rank: 2, points: 37 },
  { team: 'Smooth Pandas', rank: 5, points: 6 },
];

export default function Donate({ produit2 }) {
  return (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
      <PieChart
        series={[
          {
            data: data.map((d) => ({ label: d.team, id: d.team, value: d.points })),
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -45,
            endAngle: 225,
            cx: 150,
            cy: 150,
            valueFormatter: (v, { dataIndex }) => {
              const { rank } = data[dataIndex];
              return `has ${v.value} points and is ranked ${rank}.`;
            },
          },
        ]}
        {...otherProps}
      />
    </div>
  );
}