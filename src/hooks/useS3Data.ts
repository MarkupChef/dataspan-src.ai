import { useEffect, useRef, useState } from 'react';
import { ALBUMS } from '../constants';
import AlbumItem from '../types/AlbumItem';
import { AlbumsKeys } from '../types/Albums';
import useGetAlbumData from './useGetAlbumData';
import useGetClasses from './useGetClasses';

const useS3Data = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isLoadedRef = useRef<boolean>(false);
  const [classesData, setClassesData] = useState<AlbumClasses | null>(null);
  const [albumData, setAlbumData] = useState<AlbumItem[]>([]);

  const albums = ALBUMS;

  useEffect(() => {
    if (isLoadedRef.current) {
      return;
    }

    Promise.all([
      new Promise((resolve) => {
        useGetClasses((data) => {
          setClassesData(data);
          resolve(null);
        });
      }),
      ...albums.map(
        (album) =>
          new Promise((resolve) => {
            useGetAlbumData(album as AlbumsKeys, resolve);
          })
      ),
    ]).then((results) => {
      const albumDataResults = results.slice(1) as AlbumItem[][]; // Exclude the first result which is from useGetClasses
      setAlbumData(albumDataResults.flat());
      isLoadedRef.current = true;
      setIsLoading(false);
    });
  }, []);

  return { isLoading, classesData, albumData };
};

export default useS3Data;
