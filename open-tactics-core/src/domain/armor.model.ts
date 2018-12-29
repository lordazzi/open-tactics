import { Item } from './item.model';
import { Grabbable } from './grabbable.interface';
import { EquipmentAttributes } from './equipment-attributes.model';
import { EquipmentSlot } from './equipment-slot.enum';
import { Equipable } from './equipable.interface';
import { NatureElement } from './element.enum';

export class Armor implements Grabbable, Equipable {
    item?: Item;
    slot?: EquipmentSlot;
    element: NatureElement | null = null;
    attributes?: EquipmentAttributes;
}
