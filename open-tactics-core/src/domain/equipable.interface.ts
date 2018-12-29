import { Attributes } from './attributes.interface';
import { EquipmentSlot } from "./equipment-slot.enum";
import { NatureElement } from './element.enum';

export interface Equipable {
    slot?: EquipmentSlot;
    element: NatureElement | null;
    attributes?: Attributes;
}