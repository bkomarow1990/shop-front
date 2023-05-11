import { useState } from 'react';
import { Slider, InputNumber } from 'antd';

export interface RangeSliderProps {
  min: number;
  max: number;
  range: [number, number];
  onRangeChange: (range: [number, number]) => void;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, range, onRangeChange }) => {
  const handleSliderChange = (values: [number, number]) => {
    onRangeChange(values);
  };

  const handleMinChange = (value: number | null | undefined) => {
    const newMin = typeof value === 'number' ? Math.min(value, range[1]) : range[0];
    onRangeChange([newMin, range[1]]);
  };

  const handleMaxChange = (value: number | null | undefined) => {
    const newMax = typeof value === 'number' ? Math.max(value, range[0]) : range[1];
    onRangeChange([range[0], newMax]);
  };

  return (
    <>
      <Slider range value={range} min={min} max={max} onChange={handleSliderChange} />
      <div className='d-flex justify-content-between'>
        <InputNumber value={range[0]} min={min} max={range[1]} onChange={handleMinChange} />
        <InputNumber value={range[1]} min={range[0]} max={max} onChange={handleMaxChange} />
      </div>
    </>
  );
};