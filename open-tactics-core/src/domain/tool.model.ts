import { Item } from './item.model';
import { Grabbable } from './grabbable.interface';

export class Tool implements Grabbable {
    item?: Item;
}
