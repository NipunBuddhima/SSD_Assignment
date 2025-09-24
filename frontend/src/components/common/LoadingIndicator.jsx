// Simple Circular Indicator using MUI. Can be used inside divs and screen overlay (which is a  div itself. Look for index.css)

import React from 'react';
import CircularProgress from "@mui/material/CircularProgress";

function LoadingIndicator() {
  return (
      <CircularProgress/>
  )
}

export default LoadingIndicator