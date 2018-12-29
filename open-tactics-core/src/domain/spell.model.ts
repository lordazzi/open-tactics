import { Descriptionable } from './descriptionable.interface';
import { NatureElement } from './element.enum';
import { Animation } from './animation.model';
import { SpellLaunchStrategy } from './spell-launch-strategy.enum';

export class Spell implements Descriptionable {
    id?: string;
    name?: string;
    description?: string;
    element?: NatureElement;
    launchStrategy: SpellLaunchStrategy = SpellLaunchStrategy.INDIRECT;
    distanceBase: number | null = null;
    mpCost?: number;
}
