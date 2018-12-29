import { ItemType } from './item-type.enum';
import { Sprite } from './sprite.model';
import { Descriptionable } from './descriptionable.interface';

export class Item implements Descriptionable {
    id?: string;
    name?: string;
    description?: string;
    sprite?: Sprite;
    type?: ItemType;
    weight?: number;
    uidUntransferableOwner: string | null = null;
}
