import * as React from 'react';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

export default function SimpleAreaChart(props) {
  return (
    <LineChart
      width={850}
      height={200}
      series={[{ data: uData, label: props.label, area: true, showMark: false, color: props.color }]}
      slotProps={{
        legend: {
          labelStyle: {
            fontSize: 14,
            fill: 'white',
          },
        },
      }}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      sx={{
        // Change the color of the x and y axis lines
        '& .MuiChartsAxis-line': {
          stroke: 'white', // Change this to your desired color
        },
        // Change the color of the x and y axis labels
        '& .MuiChartsAxis-tickLabel': {
          fill: 'white', // Change this to your desired color
        },
        // Hide the line elements if needed
        [`& .${lineElementClasses.root}`]: {
          display: 'none',
        },
      }}
    />
  );
}