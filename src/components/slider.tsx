import React, { useState } from 'react';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
}

const ColorSlider: React.FC<SliderProps> = ({ value, onChange }) => {
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  const backgroundStyle = {
    background: `linear-gradient(to right, grey ${value}%, white ${value}%)`,
  };

  const indicatorStyle = {
    ...styles.indicator,
    left: `calc(${value}% - 10px)`,
  };

  // Add margin to prevent the indicator from being cut off
  const sliderContainerStyle = {
    ...styles.sliderContainer,
    paddingLeft: '10px',
    paddingRight: '10px',
  };

  return (
    <div style={{ ...sliderContainerStyle, ...backgroundStyle }}>
      <input
        type="range"
        min="0" // Minimum value set to 5
        max="100" // Maximum value set to 95
        value={value}
        onChange={handleSliderChange}
        style={styles.slider}
      />
      <div style={indicatorStyle} />
    </div>
  );
};

const styles = {
  sliderContainer: {
    width: 'calc(100% - 20px)', // Adjusted width to account for padding
    height: '20px',
    position: 'relative' as 'relative',
    cursor: 'pointer',
    borderRadius: '10px',
    overflow: 'visible',
    boxSizing: 'border-box' as 'border-box',
  },
  slider: {
    width: '100%',
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    opacity: 0, // Hidden but still interactive
  },
  indicator: {
    position: 'absolute' as 'absolute',
    top: '50%',
    width: '20px',
    height: '20px',
    backgroundColor: 'black',
    borderRadius: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none' as 'none', // Non-interactive
  }
};

export default ColorSlider;
