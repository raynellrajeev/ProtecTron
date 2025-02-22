import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { desktopOS, valueFormatter } from '../assets/WebUsageStats';

export default function PieArcLabel(props) {
  return (
    <>
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.value}%`, // Label format
            arcLabelMinAngle: 35, // Minimum angle to show labels
            arcLabelRadius: '60%', // Radius for label positioning
            ...data, // Spread the data object
          },
        ]}
        slotProps={{
          legend: {
            labelStyle: {
              fontSize: 14,
              fill: 'white',
            },
          },
        }}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white', // Change text color to white
            fontWeight: 'bold', // Keep the text bold
          },
        }}
        {...size} // Spread the size object
        />
    </>
  );
}

const size = {
  width: 400,
  height: 200,
};

const data = {
  data: desktopOS, // Your data
  valueFormatter, // Your value formatter
};