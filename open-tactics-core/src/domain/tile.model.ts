import { TileType } from './tile-type.enum';
import { Descriptionable } from './descriptionable.interface';

export class Tile implements Descriptionable {
    name?: string;
    description?: string;
    type?: TileType;
}
