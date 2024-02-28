import AlbumItem from './AlbumItem';

interface Albums {
  test: AlbumItem[];
  train: AlbumItem[];
  valid: AlbumItem[];
}

export type AlbumsKeys = keyof Albums;

export default Albums;
