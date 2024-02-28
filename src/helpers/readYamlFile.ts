import YAML from 'yaml';

function readYamlFile(yamlString: string): { nc: number; names: string[] } | null {
  try {
    const data = YAML.parse(yamlString);

    return {
      nc: data.nc,
      names: data.names,
    };
  } catch (error) {
    console.error('Error parsing YAML file:', error);
    return null;
  }
}

export default readYamlFile;
