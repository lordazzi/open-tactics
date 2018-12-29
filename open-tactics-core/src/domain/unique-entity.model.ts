import { Grabbable } from './grabbable.interface';
import { SpecieType } from './specie-type.enum';
import { Align } from './align.enum';
import { Gender } from './gender.enum';
import { EntityStatusType } from './entity-status-type.enum';
import { Vocation } from './vocation.enum';
import { UniqueAttributes } from './unique-attributes.model';

export class UniqueEntity {
    uid?: string;
    specie?: SpecieType;
    status?: EntityStatusType;
    level?: number;
    vocation?: Vocation | null;
    
    personalName?: string;
    alias?: string;
    fatherUid?: string | null;
    motherUid?: string | null;

    age?: number;
    willTurnOldIn?: number | null;
    willDieIn?: number | null;
    isDead: boolean = false;

    align?: Align;
    gender?: Gender;
    currentVocation?: Vocation | null;
    attributes?: UniqueAttributes;
    leaderRelationship: {
        [leaderUid: string]: number;
    } = {};

    carryWeightBase?: number;
    items: Grabbable[] = [];
}
