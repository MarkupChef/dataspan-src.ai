import Polygon from './Polygon';

interface AlbumItem {
  albumName: string;
  name: string;
  image: string;
  thumbnail: string;
  polygons: Polygon[];
}

export default AlbumItem;
