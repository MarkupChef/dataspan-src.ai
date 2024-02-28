import AWS from 'aws-sdk';
import { NUMBER_REQUESTED_OBJECTS_FOR_ALBUM } from '../constants';
import parseLabelFile from '../helpers/parseLabelFile';
import AlbumItem from '../types/AlbumItem';
import { AlbumsKeys } from '../types/Albums';

const useGetAlbumData = async (albumName: AlbumsKeys, callback: (albumData: AlbumItem[]) => void) => {
  const albumBucketName = 'dataspan.frontend-home-assignment';
  const rootAlbumKey = 'bone-fracture-detection';

  AWS.config.region = 'eu-central-1';
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-central-1:31ebe2ab-fc9d-4a2c-96a9-9dee9a9db8b9',
  });

  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: albumBucketName },
  });

  const albumPhotosKey = `${rootAlbumKey}/${albumName}/images/`;

  try {
    const data = await s3
      .listObjects({ Bucket: albumBucketName, Prefix: albumPhotosKey, MaxKeys: NUMBER_REQUESTED_OBJECTS_FOR_ALBUM })
      .promise();

    const href = s3.endpoint.href;
    const bucketUrl = `${href}${albumBucketName}/`;

    if (!data.Contents) return console.error('No photos found in album');

    const labelFileKeys = data.Contents.map((photo) => {
      const photoKey = photo.Key as string;
      const imageName = photoKey && photoKey.split('/').pop();
      return `${rootAlbumKey}/${albumName}/labels/${imageName!.replace('.jpg', '.txt')}`;
    });

    const labelFilesPromises = labelFileKeys.map((key) =>
      s3.getObject({ Bucket: albumBucketName, Key: key }).promise()
    );

    const labelFilesData = await Promise.all(labelFilesPromises);

    const albumData: AlbumItem[] = data.Contents.map((photo, index) => {
      const photoKey = photo.Key as string;
      const imageName = photoKey && photoKey.split('/').pop();
      const imageFileURL = `${bucketUrl}${encodeURIComponent(photoKey)}`;
      const thumbnailFileURL = `${bucketUrl}${rootAlbumKey}/${encodeURIComponent(albumName + '/thumbnails/' + imageName)}`;
      const nameOfImage = imageName!.split('.')[0];

      const labelFileContent = labelFilesData[index].Body.toString('utf-8');

      return {
        albumName: albumName,
        name: nameOfImage,
        image: imageFileURL,
        thumbnail: thumbnailFileURL,
        polygons: parseLabelFile(labelFileContent),
      };
    });

    callback(albumData);
  } catch (error) {
    console.error('Error listing objects in album:', error);
  }
};

export default useGetAlbumData;
