export interface IShape {
    id: number;
    capacity: number;
    blocks: number;
    orientations: {
        cells: number[][];
        canFit: (grid: number[][], xOffset: number, yOffset: number) => boolean;
        calculateEdges: (
            grid: number[][],
            xOffset: number,
            yOffset: number,
        ) => {
            filledEdges: number;
            totalEdges: number;
            emptyEdges: number;
        };
    }[];
}