import { Descriptionable } from './descriptionable.interface';
import { UniqueTerrain } from './unique-terrain.model';

export class Map implements Descriptionable {
    name?: string;
    description?: string;
    terrain: UniqueTerrain[][] = []
}
