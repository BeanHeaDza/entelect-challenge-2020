import { IOrientation } from './get-all-rotations-and-reflections.function';

export function compileCanFitFunction(
    orientation: IOrientation,
): (grid: number[][], xOffset: number, yOffset: number) => boolean {
    let canFitCode = `return xOffset + ${orientation.width} <= grid.length && yOffset + ${orientation.height} <= grid[0].length && `;
    canFitCode += orientation.cells.map(([x, y]) => `grid[xOffset + ${x}][yOffset + ${y}] === 0`).join(' && ');

    return new Function('grid', 'xOffset', 'yOffset', canFitCode) as any;
}
