import { IInput } from './read-input.function';

export function createGrid({ blockedCells, columns, rows }: IInput): number[][] {
    const grid: number[][] = [];
    for (let x = 0; x < columns; x++) {
        grid[x] = [];
        for (let y = 0; y < rows; y++) {
            grid[x][y] = 0;
        }
    }

    blockedCells.forEach(([x, y]) => (grid[x][y] = -1));

    return grid;
}
