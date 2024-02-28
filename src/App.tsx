import { Alert, Button, Layout } from 'antd';
import Link from 'antd/es/typography/Link';
import { useState } from 'react';
import './App.css';
import logoImage from './assets/img/dataspan-logo.png';
import Filter from './components/Filter';
import PolygonRange from './components/PaligonRange';
import XRays from './components/XRays';
import DSTrashIcon from './components/icons/DSTrashIcon';
import useS3Data from './hooks/useS3Data';

const { Header, Footer, Sider, Content } = Layout;

const App = () => {
  const { isLoading, classesData, albumData } = useS3Data();
  const [selectedClassIndexes, setSelectedClassIndexes] = useState<number[]>([]);
  const [rangeValue, setRangeValue] = useState([0, 4]);

  const filteredAlbumData = albumData.filter((item) => {
    if (!item.polygons.length && rangeValue[0] === 0) {
      return true;
    }

    return item.polygons.some(
      (polygon) =>
        selectedClassIndexes.includes(polygon.classIndex) &&
        item.polygons.length >= rangeValue[0] &&
        item.polygons.length <= rangeValue[1]
    );
  });

  const handleClearFilter = () => {
    setSelectedClassIndexes([]);
    setRangeValue([0, 4]);
  };

  const renderCounter = () => (
    <div className={'text-lg'}>
      <span className={'font-semibold'}>{filteredAlbumData.length}</span> of{' '}
      <span className={'font-semibold'}>{albumData.length}</span>
    </div>
  );

  const renderSidebarFooter = () => (
    <div className={'flex items-center justify-between gap-2 px-2'}>
      <Button onClick={handleClearFilter} type={'text'} className={'text-sm font-semibold'} icon={<DSTrashIcon />}>
        Clear filter
      </Button>
      <Link href={'#'} className={'!text-black opacity-50'}>
        Need help?
      </Link>
    </div>
  );

  return (
    <Layout className={'min-h-[100vh] w-full overflow-hidden !bg-white'}>
      <Sider
        width="100%"
        className={'!box-content flex w-full !min-w-0 !max-w-[332px] flex-col !bg-white px-8 py-4 text-black'}
      >
        <div className={'h-full rounded-xl border-2 border-solid border-[#D1D1D6] p-4'}>
          <img className={'mb-11 max-w-full'} src={logoImage} alt="dataspan.ai" />

          {isLoading && <p>Loading...</p>}
          {!isLoading && classesData && (
            <>
              <div className={'flex flex-col gap-6'}>
                <div>
                  <Filter
                    albumClasses={classesData}
                    selectedClasses={selectedClassIndexes}
                    setSelectedClasses={setSelectedClassIndexes}
                  />
                </div>
                <div>
                  <PolygonRange rangeValue={rangeValue} setRangeValue={setRangeValue} />
                </div>
                <div>{renderSidebarFooter()}</div>
              </div>
            </>
          )}

          <Alert
            className={'mt-10'}
            message={
              <>
                <h4>Total: 8h</h4>
                <ul>
                  <li>Layout - 2h</li>
                  <li>Filter - 2h</li>
                  <li>Popup - 1h</li>
                  <li>Polygon - 2h</li>
                  <li>Other - 1h</li>
                </ul>
              </>
            }
          />
        </div>
      </Sider>
      <Layout className={'!bg-transparent py-4'}>
        <Header className={'flex items-center justify-between gap-2 bg-transparent p-4'}>
          <h1>Bone fracture detection</h1>
          {renderCounter()}
        </Header>
        <Content className={'px-4 pb-9 text-black'}>
          {isLoading && <p>Loading...</p>}
          {!isLoading && classesData && albumData && <XRays classesData={classesData} albumData={filteredAlbumData} />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
