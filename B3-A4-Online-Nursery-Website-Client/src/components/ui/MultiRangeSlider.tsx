import React, { useState } from "react";
import "../cssStyles/multiRangeSlider.css";

const MultiRangeSlider = ({
  min,
  max,
  step = 0.1,
  onChange,
}: {
  min: number;
  max: number;
  step?: number;
  onChange: (values: { min: number; max: number }) => void;
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - 1);
    setMinVal(value);
    onChange({ min: value, max: maxVal });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + 1);
    setMaxVal(value);
    onChange({ min: minVal, max: value });
  };

  return (
    <div className="multi-range-slider">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        step={step}
        onChange={(e) => handleMinChange(e)}
        className="thumb thumb-left"
        style={{ zIndex: minVal > max - 10 ? "5" : "3" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        step={step}
        onChange={(e) => handleMaxChange(e)}
        className="thumb thumb-right"
        style={{ zIndex: maxVal < min + 10 ? "5" : "4" }}
      />
      <div className="slider">
        <div
          className="slider-track"
          style={{
            left: `${((minVal - min) / (max - min)) * 100}%`,
            right: `${100 - ((maxVal - min) / (max - min)) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
