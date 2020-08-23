import { runMap } from './run-map.function';

function numberWithSpaces(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const mapsToRun = [1, 2, 3, 4, 5];
let grandTotal = 0;

for (let i = 0; i < mapsToRun.length; i++) {
    const score = runMap(mapsToRun[i]);
    grandTotal += score;
    console.log(`Map ${mapsToRun[i]} score: ${numberWithSpaces(score)}`);
}

if (mapsToRun.length > 1) {
    console.log('Total: ' + numberWithSpaces(grandTotal));
}
