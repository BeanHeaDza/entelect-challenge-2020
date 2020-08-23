import { readFileSync } from 'fs';
import { parseShape } from './parse-shape.function';
import { IShapeJson } from './shape-json.model';
import { IShape } from './shape.model';

export function readShapes(): Map<number, IShape> {
    const { shapes }: { shapes: IShapeJson[] } = JSON.parse(readFileSync('shapes.json', { encoding: 'UTF8' }));
    const result = new Map<number, IShape>();
    shapes.forEach(s => result.set(s.shape_id, parseShape(s)));

    return result;
}
