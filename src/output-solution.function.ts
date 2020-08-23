import { writeFileSync } from 'fs';
import { prettyPrint } from './pretty-print.function';

export function outputSolution(
    grid: number[][],
    usedShapes: { id: number; cells: number[][] }[],
    score: number,
    fileBase: string,
): void {
    const fileName = `${fileBase}_${score}`;

    const lines = usedShapes.map(s => `${s.id}|${s.cells.map(c => c.join(',')).join('|')}`);
    writeFileSync(fileName + '.txt', lines.join('\n'), { encoding: 'utf8' });
    prettyPrint(grid, fileName + '.png');
}
