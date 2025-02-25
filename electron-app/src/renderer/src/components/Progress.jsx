import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function CircularProgressWithLabel(props) {
  const containerRef = React.useRef(null);
  const [size, setSize] = React.useState(200);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const minDimension = Math.min(containerWidth, containerHeight);
        // Use 70% of the container's smallest dimension
        setSize(minDimension * 0.7);
      }
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const getFontSize = () => {
    if (isMobile) return size * 0.1;
    if (isTablet) return size * 0.13;
    return size * 0.15;
  };

  return (
    <Box ref={containerRef} className="w-full h-full flex items-center justify-center p-4">
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress 
          variant="determinate" 
          {...props} 
          size={size}
          thickness={3}
          sx={{
            color: '#2196F3',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            component="div"
            sx={{
              fontSize: getFontSize(),
              fontWeight: 'semibold',
              color: 'white',
              fontFamily: 'inherit',
            }}
          >
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}