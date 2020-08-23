import { createGrid } from './create-grid.function';
import { outputSolution } from './output-solution.function';
import { readInput } from './read-input.function';
import { scoreSolution } from './score-solution.function';
import { readShapes } from './shape';

const shapes = readShapes();

export function runMap(mapNumber: number): number {
    const input = readInput(`map_${mapNumber}.input`);
    const grid = createGrid(input);

    let usedShapes: { id: number; cells: number[][] }[] = [];
    // Loop trough the grid top -> down then left -> right
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            let best: { id: number; cells: number[][]; score: number } | null = null;
            for (let s = 0; s < input.availableShapes.length; s++) {
                const shape = shapes.get(input.availableShapes[s].id);
                if (!shape) {
                    continue;
                }
                for (let o = 0; o < shape.orientations.length; o++) {
                    if (shape.orientations[o].canFit(grid, x, y)) {
                        const edges = shape.orientations[o].calculateEdges(grid, x, y);
                        const score = edges.filledEdges * 1024 + shape.capacity;
                        if (!best || score > best.score) {
                            best = {
                                cells: shape.orientations[o].cells.map(([eX, eY]) => [eX + x, eY + y]),
                                id: shape.id,
                                score,
                            };
                        }
                    }
                }
            }

            if (best) {
                const { id, cells } = best;
                const available = input.availableShapes.find(a => a.id === id);

                usedShapes.push({ id, cells });
                cells.forEach(([x, y]) => (grid[x][y] = id));
                if (available && available.count > 1) {
                    available.count--;
                } else if (available) {
                    input.availableShapes = input.availableShapes.filter(a => a !== available);
                }
            }
        }
    }

    const score = scoreSolution(grid, usedShapes, shapes);
    outputSolution(grid, usedShapes, score, 'output/map_' + mapNumber);
    return score;
}
