import { UniqueEntity } from './../domain/unique-entity.model';
import { Spell } from './../domain/spell.model';
import { SpellSpecification } from './spell-specification.interface';
import { NatureElement } from '../domain/element.enum';
import { SpellLaunchStrategy } from '../domain/spell-launch-strategy.enum';

export class Fireburn implements SpellSpecification {

    readonly id = 'fireburn';
    readonly spell = new Spell();

    constructor() {
        this.spell.id = this.id;
        this.spell.element = NatureElement.FIRE;
        this.spell.mpCost = 10;
        this.spell.name = 'FireBurn'
        this.spell.description = 'Damages target with fire. Burns off grass.'
    }

    conjure(conjurer: UniqueEntity): Spell {
        return new Spell();
    }
}
