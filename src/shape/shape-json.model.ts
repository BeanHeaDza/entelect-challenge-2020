export interface IShapeJson {
    shape_id: number;
    bounding_box: number;
    capacity: number;
    orientations: { rotation: number; cells: number[][] }[];
}