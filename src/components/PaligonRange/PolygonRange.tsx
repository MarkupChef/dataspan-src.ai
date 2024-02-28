import { ConfigProvider, Slider } from 'antd';
import { Dispatch, FC, SetStateAction } from 'react';

interface PolygonRangeProps {
  rangeValue: number[];
  setRangeValue: Dispatch<SetStateAction<number[]>>;
}

const PolygonRange: FC<PolygonRangeProps> = ({ rangeValue, setRangeValue }) => {
  const min = 0;
  const max = 4;
  const handleChange = (value: number[]) => {
    setRangeValue(value);
  };

  const SliderAntdStyles = {
    colorPrimaryBorderHover: '#FFD75C',
    trackBg: 'rgba(255,215,92,0.7)',
    trackHoverBg: '#FFD75C',
    dotActiveBorderColor: '#FFD75C',
    handleColor: '#FFD75C',
    handleActiveColor: '#FFD75C',
  };

  return (
    <>
      <h2 className={'mb-3 mt-0 text-base font-semibold'}>Polygon range</h2>
      <div className={'item-center flex justify-between gap-2 text-xs'}>
        <span>
          min <span className={'font-semibold'}>{min}</span>
        </span>
        <span>
          max <span className={'font-semibold'}>{max}</span>
        </span>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Slider: SliderAntdStyles,
          },
        }}
      >
        <Slider
          className={'!mb-0'}
          range
          min={min}
          max={max}
          marks={{
            0: ' ',
            1: ' ',
            2: ' ',
            3: ' ',
            4: ' ',
          }}
          value={rangeValue}
          onChange={handleChange}
        />
      </ConfigProvider>
    </>
  );
};

export default PolygonRange;
