import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';

export function prettyPrint(grid: number[][], filePath: string) {
    const canvas = createCanvas(grid.length * 10 + 1, grid[0].length * 10 + 1);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            ctx.fillStyle = getColor(grid[x][y]);
            ctx.fillRect(x * 10 + 1, y * 10 + 1, 9, 9);
        }
    }

    writeFileSync(filePath, canvas.toBuffer());
}

function getColor(num: number): string {
    if (num === 0) {
        return 'white';
    } else if (num < 0) {
        return 'black';
    }

    return 'hsl(' + ((num * (360 / 25)) % 360) + ',50%,50%)';
}
