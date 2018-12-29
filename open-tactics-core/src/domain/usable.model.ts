import { Grabbable } from './grabbable.interface';
import { Item } from './item.model';

export class Usable implements Grabbable {
    item?: Item;
}
