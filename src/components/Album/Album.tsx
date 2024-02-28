import { ConfigProvider, Pagination } from 'antd';
import { FC, useState } from 'react';
import { ITEMS_PER_PAGE } from '../../constants';
import AlbumItem from '../../types/AlbumItem';
import XRayItem from '../XRayItem';

interface AlbumProps {
  items: AlbumItem[];
  classesData: AlbumClasses;
}

const Album: FC<AlbumProps> = ({ classesData, items }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = ITEMS_PER_PAGE;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageItems = items.slice(startIndex, endIndex);

  const PaginationAntdStyles = {
    colorPrimary: '#fff',
    colorBorder: '#FFD75C',
    colorPrimaryBorder: '#FFD75C',
    colorPrimaryHover: '#fff',
    borderRadius: 100,
    colorPrimaryBorderHover: '#FFD75C',
    colorBgContainer: '#FFD75C',
  };

  return (
    <>
      <div className={'mb-10 flex flex-wrap gap-4'}>
        {currentPageItems.map((xray, index) => (
          <XRayItem
            key={index}
            classesData={classesData}
            name={xray.name}
            albumName={xray.albumName}
            image={xray.image}
            thumbnail={xray.thumbnail}
            polygons={xray.polygons}
          />
        ))}
      </div>
      <ConfigProvider
        theme={{
          components: {
            Pagination: PaginationAntdStyles,
          },
        }}
      >
        <Pagination
          className={'text-center'}
          defaultCurrent={1}
          total={items.length}
          defaultPageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          hideOnSinglePage={true}
        />
      </ConfigProvider>
    </>
  );
};

export default Album;
