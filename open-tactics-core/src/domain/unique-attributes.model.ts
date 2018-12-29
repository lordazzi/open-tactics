import { Attributes } from './attributes.interface';

export class UniqueAttributes implements Attributes {
    mind?: number;
    strength?: number;
    defense?: number;
    dexterity?: number;
    
    maxLife?: number;
    currentLife?: number;
    
    maxMana?: number;
    currentMana?: number;
    
    speed?: number;

    /**
     * How much waited to his turn
     */
    currentWaited?: number;
}
