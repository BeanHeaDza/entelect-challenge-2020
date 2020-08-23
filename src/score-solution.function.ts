import { IShape } from './shape';

export function scoreSolution(
    grid: number[][],
    usedShapes: { id: number; cells: number[][] }[],
    shapes: Map<number, IShape>,
): number {
    let finalScore = 0;
    let spacesFilled = 0;
    let totalCapacity = usedShapes
        .map(s => (shapes.get(s.id) as IShape).capacity)
        .reduce((sum, x) => sum + x, 0);

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            if (grid[x][y] > 0) {
                finalScore += 10;
                spacesFilled += 1;
            } else if (grid[x][y] === 0) {
                // top
                if (x > 0 && grid[x - 1][y] == 0) {
                    finalScore -= 2;
                }
                // bottom
                else if (x < grid.length - 1 && grid[x + 1][y] == 0) {
                    finalScore -= 2;
                }
                // left
                else if (y > 0 && grid[x][y - 1] == 0) {
                    finalScore -= 2;
                }
                // right
                else if (y < grid[x].length - 1 && grid[x][y + 1] == 0) {
                    finalScore -= 2;
                } else {
                    finalScore -= 4;
                }
            }
        }
    }

    const multiplier = totalCapacity / spacesFilled;

    return Math.ceil(finalScore * multiplier);
}
