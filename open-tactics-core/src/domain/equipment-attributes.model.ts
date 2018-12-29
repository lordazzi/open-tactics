import { Attributes } from './attributes.interface';

export class EquipmentAttributes implements Attributes {
    mind?: number;
    strength?: number;
    defense?: number;
    dexterity?: number;
    speed?: number;
    maxLife?: number;
    maxMana?: number;
}
