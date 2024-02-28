import { ConfigProvider, Tabs, TabsProps } from 'antd';
import { FC } from 'react';
import AlbumItem from '../../types/AlbumItem';
import Album from '../Album';

const XRays: FC<{ classesData: AlbumClasses; albumData: AlbumItem[] }> = ({ classesData, albumData }) => {
  const test = albumData.filter((xray) => xray.albumName === 'test');
  const train = albumData.filter((xray) => xray.albumName === 'train');
  const valid = albumData.filter((xray) => xray.albumName === 'valid');

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'All groups',
      children: <Album classesData={classesData} items={albumData} />,
    },
    {
      key: '2',
      label: 'Test',
      children: <Album classesData={classesData} items={test} />,
    },
    {
      key: '3',
      label: 'Train',
      children: <Album classesData={classesData} items={train} />,
    },
    {
      key: '4',
      label: 'Valid',
      children: <Album classesData={classesData} items={valid} />,
    },
  ];

  const TabsAntdStyles = {
    colorPrimaryBorder: '#FFD75C',
    inkBarColor: '#FFD75C',
    itemActiveColor: '#FFD75C',
    itemSelectedColor: '#FFD75C',
    itemHoverColor: '#FFD75C',
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: TabsAntdStyles,
        },
      }}
    >
      <Tabs defaultActiveKey="1" items={items} />
    </ConfigProvider>
  );
};

export default XRays;
