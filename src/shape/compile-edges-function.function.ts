import { countBy } from 'lodash';
import { IOrientation } from './get-all-rotations-and-reflections.function';

export function compileEdgesFunction(
    orientation: IOrientation,
): (
    grid: number[][],
    xOffset: number,
    yOffset: number,
) => { filledEdges: number; totalEdges: number; emptyEdges: number } {
    // Get all the edges of all the cells
    const edges = orientation.cells
        .flatMap(([x, y]) => [
            [x + 1, y],
            [x - 1, y],
            [x, y + 1],
            [x, y - 1],
        ])
        // Filter out edges that are pointing to cells in the shape
        .filter(([x1, y1]) => !orientation.cells.some(([x2, y2]) => x1 === x2 && y1 === y2));

    const edgeCounts = countBy(edges, (e) => e.join(','));
    const groupedEdges: {
        top: [number, number][];
        bottom: [number, number][];
        left: [number, number][];
        right: [number, number][];
        inner: { cell: [number, number]; count: number }[];
    } = { top: [], bottom: [], left: [], right: [], inner: [] };
    let totalEdges = 0;
    Object.keys(edgeCounts).forEach((key) => {
        const [x, y] = key.split(',').map(Number);
        if (y < 0) {
            groupedEdges.top.push([x, y]);
        } else if (y === orientation.height) {
            groupedEdges.bottom.push([x, y]);
        } else if (x < 0) {
            groupedEdges.left.push([x, y]);
        } else if (x === orientation.width) {
            groupedEdges.right.push([x, y]);
        } else {
            groupedEdges.inner.push({ cell: [x, y], count: edgeCounts[key] });
        }

        totalEdges += edgeCounts[key];
    });

    const mapCellToIfStatement = ([x, y]: number[], count: number) =>
        `if (grid[${x} + xOffset][${y} + yOffset] === 0) { emptyEdges += ${count} }`;

    let calculateEdgesCode = `let totalEdges = ${totalEdges};\nlet emptyEdges = 0;\nlet filledEdges = 0;\n`;
    calculateEdgesCode += `let isTop = yOffset === 0;\nlet isBottom = yOffset + ${orientation.height} === grid[0].length;\n`;
    calculateEdgesCode += `let isLeft = xOffset === 0;\nlet isRight = xOffset + ${orientation.width} === grid.length;\n`;
    calculateEdgesCode += `if (!isTop) {\n${groupedEdges.top
        .map((c) => mapCellToIfStatement(c, 1))
        .join('\n')}\n}\n`;
    calculateEdgesCode += `if (!isBottom) {\n${groupedEdges.bottom
        .map((c) => mapCellToIfStatement(c, 1))
        .join('\n')}\n}\n`;
    calculateEdgesCode += `if (!isLeft) {\n${groupedEdges.left
        .map((c) => mapCellToIfStatement(c, 1))
        .join('\n')}\n}\n`;
    calculateEdgesCode += `if (!isRight) {\n${groupedEdges.right
        .map((c) => mapCellToIfStatement(c, 1))
        .join('\n')}\n}\n`;
    calculateEdgesCode +=
        groupedEdges.inner.map((e) => mapCellToIfStatement(e.cell, e.count)).join('\n') + '\n';
    calculateEdgesCode += 'filledEdges = totalEdges - emptyEdges;\n';
    calculateEdgesCode += 'return { filledEdges, totalEdges, emptyEdges };';

    return new Function('grid', 'xOffset', 'yOffset', calculateEdgesCode) as any;
}
