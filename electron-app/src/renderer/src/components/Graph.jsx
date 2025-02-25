import * as React from 'react';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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
  // Get container width from parent
  const containerRef = React.useRef(null);
  const [chartWidth, setChartWidth] = React.useState(850);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setChartWidth(width - 32); // Subtract padding
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <LineChart
        width={chartWidth}
        height={isMobile ? 150 : isTablet ? 175 : 200}
        series={[{ data: uData, label: props.label, area: true, showMark: false, color: props.color }]}
        slotProps={{
          legend: {
            labelStyle: {
              fontSize: isMobile ? 12 : 14,
              fill: 'white',
            },
          },
        }}
        xAxis={[{ 
          scaleType: 'point', 
          data: xLabels,
          tickLabelStyle: {
            fontSize: isMobile ? 10 : 12,
          }
        }]}
        sx={{
          '& .MuiChartsAxis-line': {
            stroke: 'white!important',
            fontFamily: 'inherit',
          },
          '& .MuiChartsAxis-tickLabel': {
            fill: 'white!important',
            fontFamily: 'inherit',
          },
          [`& .${lineElementClasses.root}`]: {
            display: 'none',
          },
        }}
      />
    </div>
  );
}