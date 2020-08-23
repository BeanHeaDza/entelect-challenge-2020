import { readFileSync } from 'fs';

export function readInput(fileName: string): IInput {
    const data = readFileSync(fileName, { encoding: 'UTF8' }).split('\n');
    const [rows, columns] = data[0].split(',').map(Number);
    const shapeCount = +data[1];
    const availableShapes = data
        .slice(3, 3 + shapeCount)
        .map(x => x.split(',').map(Number))
        .map(([id, count]) => ({ id, count, cap: 0 }));

    const blockedCells = data[3 + shapeCount].split('|').map(cell => cell.split(',').map(Number)) as any;

    return { rows, columns, availableShapes, blockedCells };
}

export interface IInput {
    rows: number;
    columns: number;
    availableShapes: { id: number; count: number; cap?: number }[];
    blockedCells: [number, number][];
}
