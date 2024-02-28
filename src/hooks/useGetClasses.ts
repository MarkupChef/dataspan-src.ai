import AWS from 'aws-sdk';
import readYamlFile from '../helpers/readYamlFile';

const useGetClasses = (callback: (albumClass: AlbumClasses | null) => void) => {
  const albumBucketName = 'dataspan.frontend-home-assignment';
  const rootAlbumKey = 'bone-fracture-detection';

  // Здесь вы можете установить конфигурацию AWS SDK, если она еще не установлена
  AWS.config.region = 'eu-central-1'; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-central-1:31ebe2ab-fc9d-4a2c-96a9-9dee9a9db8b9',
  });

  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: albumBucketName },
  });

  const params = {
    Bucket: 'dataspan.frontend-home-assignment',
    Key: 'bone-fracture-detection/data.yaml',
  };

  s3.getObject(params, function (err, data) {
    if (err) {
      console.error('Error getting data.yaml:', err);
      callback(null);
    } else {
      // Получаем содержимое файла data.yaml в виде строки
      const yamlString = data.Body.toString('utf-8');
      const yamlData = readYamlFile(yamlString);
      callback(yamlData);
    }
  });
};

export default useGetClasses;
