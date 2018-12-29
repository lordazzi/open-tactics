import { Grabbable } from './grabbable.interface';
import { Item } from './item.model';
import { WeaponDistanceType } from './weapon-distance.type.enum';
import { NatureElement } from './element.enum';
import { WeaponHanOccupation } from './weapon-hand-occupation.enum';
import { EquipmentAttributes } from './equipment-attributes.model';
import { EquipmentSlot } from './equipment-slot.enum';
import { Equipable } from './equipable.interface';

export class Weapon implements Grabbable, Equipable {
    item?: Item;
    hands?: WeaponHanOccupation;
    distanceType?: WeaponDistanceType;
    element: NatureElement | null = null;
    distance?: number;
    slot?: EquipmentSlot.HAND;
    attributes?: EquipmentAttributes;
}
