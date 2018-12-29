import { UniqueEntity } from './../domain/unique-entity.model';
import { Spell } from '../domain/spell.model';

export interface SpellSpecification {
    id: string;
    spell: Spell;

    conjure(conjurer: UniqueEntity): Spell;
}
