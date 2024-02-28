import Polygon from '../types/Polygon';

function parseLabelFile(labelFileContent: string): Polygon[] {
  const lines = labelFileContent.split('\n');
  let polygon: Polygon[] = [];

  lines.forEach((line) => {
    const lineData = line.split(' ');
    const classIndex = parseInt(lineData[0]);

    const vertices = lineData.slice(1).map((coord) => parseFloat(coord));

    const coordinates: { x: number; y: number }[] = [];
    for (let i = 0; i < vertices.length; i += 2) {
      coordinates.push({ x: vertices[i], y: vertices[i + 1] });
    }

    if (!isNaN(classIndex)) {
      polygon.push({ classIndex, coordinates });
    }
  });

  return polygon;
}

export default parseLabelFile;
