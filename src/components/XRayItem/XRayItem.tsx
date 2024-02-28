import { Modal, Tooltip } from 'antd';
import { FC, useState } from 'react';
import { CLASSES_COLORS_RGB } from '../../constants';
import AlbumItem from '../../types/AlbumItem';
import Polygon from '../../types/Polygon';

interface XRayItemProps {
  classesData: AlbumClasses;
  albumName: string;
  image: string;
  thumbnail: string;
  name: string;
  polygons: Polygon[];
}

interface RenderPolygonsProps {
  polygons: AlbumItem['polygons'];
  imgWidth: number;
  imgHeight: number;
  isShowTitle?: boolean;
}

const XRayItem: FC<XRayItemProps> = ({ classesData, albumName, name, image, thumbnail, polygons }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const thumbnailWidth = 130;
  const thumbnailHeight = 130;

  const imgWidth = 447;
  const imgHeight = 447;

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const renderPolygons = ({ polygons, imgWidth, imgHeight, isShowTitle }: RenderPolygonsProps) =>
    polygons.map((polygon, polygonIndex) => {
      const minX = Math.min(...polygon.coordinates.map((coord) => coord.x));
      const maxX = Math.max(...polygon.coordinates.map((coord) => coord.x));
      const minY = Math.min(...polygon.coordinates.map((coord) => coord.y));
      const maxY = Math.max(...polygon.coordinates.map((coord) => coord.y));

      const width = maxX - minX;
      const height = maxY - minY;

      const color = CLASSES_COLORS_RGB[polygon.classIndex];

      return (
        <div
          key={polygonIndex}
          style={{
            position: 'absolute',
            top: minY * imgHeight,
            left: minX * imgWidth,
            width: width * imgWidth,
            height: height * imgHeight,
            backgroundColor: 'transparent',
            borderRadius: '3px',
            border: `1px solid rgb(${color})`,
          }}
        >
          {isShowTitle && (
            <div
              className={'absolute bottom-[100%] left-0 w-full text-left font-light'}
              style={{
                width: width * imgWidth + 1,
                fontSize: '12px',
                backgroundColor: `rgb(${color})`,
                padding: '0 0.3em',
                lineHeight: 1,
                boxSizing: 'border-box',
              }}
            >
              {classesData.names[polygon.classIndex]}
            </div>
          )}

          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <polygon
              points={polygon.coordinates
                .map(({ x, y }) => `${(x - minX) * imgWidth},${(y - minY) * imgHeight}`)
                .join(' ')}
              style={{ fill: `rgba(${color}, 0.3)`, stroke: CLASSES_COLORS_RGB[polygon.classIndex], strokeWidth: 1 }}
            />
          </svg>
        </div>
      );
    });

  const renderUniqueClassesNames = (polygons: AlbumItem['polygons']) => {
    const allNames = polygons.map((polygon) => classesData.names[polygon.classIndex]);
    const uniqueNames = [...new Set(allNames)];

    return (
      <div className={'flex flex-col items-start gap-2'}>
        {uniqueNames.map((name, index) => {
          const colorsRGB = `rgb(${CLASSES_COLORS_RGB[classesData.names.indexOf(name)]})`;

          return (
            <div
              key={index}
              className={'inline-block rounded-2xl px-6 py-1 leading-none text-black'}
              style={{ backgroundColor: colorsRGB }}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <figure className={'relative m-0 w-[130px]'} onClick={handleImageClick}>
        <img src={thumbnail} width={thumbnailWidth} height={thumbnailHeight} alt={name} />
        {polygons.length > 0 && renderPolygons({ polygons, imgWidth: thumbnailWidth, imgHeight: thumbnailHeight })}
        <Tooltip title={name}>
          <figcaption className={'truncate'}>{name}</figcaption>
        </Tooltip>
      </figure>
      <Modal
        width={520}
        title={<div className={'text-sm font-normal capitalize'}>{name}</div>}
        footer={false}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <p className={'text-xs font-light'}>Details</p>
        <div className={'mb-4'}>{renderUniqueClassesNames(polygons)}</div>
        <div className={'relative text-center'}>
          <img className={'max-h-[447px] max-w-full'} width={imgWidth} height={imgHeight} src={image} alt={name} />
          {polygons.length > 0 && renderPolygons({ polygons, imgWidth, imgHeight, isShowTitle: true })}
        </div>
      </Modal>
    </>
  );
};

export default XRayItem;
