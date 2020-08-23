import { uniqBy } from 'lodash';
import { IShapeJson } from './shape-json.model';

export interface IOrientation {
    height: number;
    width: number;
    cells: number[][];
}
[];

export function getAllRotationsAndReflections({
    orientations,
}: Pick<IShapeJson, 'orientations'>): IOrientation[] {
    // loop through all rotations and reflections
    const faces = orientations.flatMap((o) => {
        return [
            o.cells,
            o.cells.map(([x, y]) => [-x, y]),
            o.cells.map(([x, y]) => [x, -y]),
            o.cells.map(([x, y]) => [-x, -y]),
        ];
    });

    // move shapes to the top left most corner
    const movedFaces = faces.map((cells) => {
        if (!cells || cells.length === 0) {
            return { height: 0, width: 0, cells };
        }

        let minX = cells[0][0],
            maxX = cells[0][0],
            minY = cells[0][1],
            maxY = cells[0][1];

        cells.slice(1).forEach(([x, y]) => {
            if (x < minX) {
                minX = x;
            }
            if (x > maxX) {
                maxX = x;
            }
            if (y < minY) {
                minY = y;
            }
            if (y > maxY) {
                maxY = y;
            }
        });

        return {
            height: maxY - minY + 1,
            width: maxX - minX + 1,
            cells: cells
                .map(([x, y]) => [x - minX, y - minY])
                .sort((a, b) => a[0] * 1024 + a[1] - b[0] * 1024 - b[1]),
        };
    });

    // remove duplicate shapes
    return uniqBy(movedFaces, (f) => f.cells.map((coords) => coords.join(',')).join('\n'));
}
