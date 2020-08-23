import { compileCanFitFunction } from './compile-can-fit-function.function';
import { compileEdgesFunction } from './compile-edges-function.function';
import { getAllRotationsAndReflections } from './get-all-rotations-and-reflections.function';
import { IShapeJson } from './shape-json.model';
import { IShape } from './shape.model';

export function parseShape(shape: IShapeJson): IShape {
    const orientations = getAllRotationsAndReflections(shape).map((orientation) => {
        const canFit = compileCanFitFunction(orientation);
        const calculateEdges = compileEdgesFunction(orientation);
        return {
            canFit,
            calculateEdges,
            cells: orientation.cells,
        };
    });

    return {
        id: shape.shape_id,
        capacity: shape.capacity,
        blocks: shape.orientations[0].cells.length,
        orientations,
    };
}
