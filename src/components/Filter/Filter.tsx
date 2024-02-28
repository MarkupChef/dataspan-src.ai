import { Button, Checkbox } from 'antd';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { CLASSES_COLORS_RGB } from '../../constants';

interface SidebarProps {
  albumClasses: AlbumClasses;
  selectedClasses: number[];
  setSelectedClasses: Dispatch<SetStateAction<number[]>>;
}

const Filter: FC<SidebarProps> = ({ albumClasses, selectedClasses, setSelectedClasses }) => {
  const allIndexes = albumClasses.names.map((_, index) => index);

  const handleToggleClass = (classIndex: number) => {
    if (selectedClasses.includes(classIndex)) {
      setSelectedClasses(selectedClasses.filter((c) => c !== classIndex));
    } else {
      setSelectedClasses([...selectedClasses, classIndex]);
    }
  };

  const handleSelectAll = () => {
    setSelectedClasses(allIndexes);
  };

  const handleDeselectAll = () => {
    setSelectedClasses([]);
  };

  useEffect(() => {
    setSelectedClasses(allIndexes);
  }, []);

  const renderClasses = () => (
    <ul className={'m-0 flex list-none flex-wrap gap-2 p-0'}>
      {albumClasses.names.map((nameClass, index) => {
        const classColor = CLASSES_COLORS_RGB[index];
        const rgbColor = `rgb(${classColor})`;
        const isChecked = selectedClasses.includes(index);

        return (
          <li key={index}>
            <Checkbox
              id={nameClass}
              className={'filter-checkbox'}
              name={nameClass}
              value={index}
              checked={isChecked}
              onChange={() => handleToggleClass(index)}
            >
              <div
                className={`inline-flex cursor-pointer items-center gap-2 rounded-3xl border-2 border-solid px-3 py-2`}
                style={{
                  borderColor: rgbColor,
                  backgroundColor: isChecked ? `rgba(${classColor}, 0.2)` : 'transparent',
                }}
              >
                <div className={'h-2 w-2 rounded-full'} style={{ backgroundColor: rgbColor }}></div>
                <span className={'text-xs font-semibold capitalize'}>{nameClass}</span>
              </div>
            </Checkbox>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <h2 className={'mb-4 mt-0 text-base font-semibold'}>Classes filter</h2>
      <div className={'mb-3 flex gap-4'}>
        <Button type={'link'} className={'p-0'} onClick={handleSelectAll}>
          Select All
        </Button>
        <Button type={'link'} className={'p-0'} onClick={handleDeselectAll}>
          Deselect All
        </Button>
      </div>
      {renderClasses()}
    </>
  );
};

export default Filter;
