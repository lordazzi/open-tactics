import { WalkEffect } from '../domain/walk-effect.enum';
import { UniqueEntity } from '../domain/unique-entity.model';
import { Align } from '../domain/align.enum';
import { Vocation } from '../domain/vocation.enum';
import { SpecieType } from '../domain/specie-type.enum';
import { Attributes } from '../domain/attributes.interface';

export class VocationService {
    private static vocationRules: {
        [vocation: string]: {
            alignRestriction: Align[],
            specieRestriction: SpecieType[],
            defaultWalkEffect: WalkEffect[],
            maxAditionalPerLevel: Attributes;
            minAditionalPerLevel: Attributes;
        }
    } = {
        [Vocation.GENERIC_SOLDIER]: {
            alignRestriction: [Align.CHAOTIC, Align.LOYALTY, Align.NEUTRAL],
            specieRestriction: [
                SpecieType.HUMAN, SpecieType.SKELETON,
                SpecieType.LIZARD_MAN, SpecieType.EAGLE_MAN
            ],
            defaultWalkEffect: [],
            maxAditionalPerLevel: { },
            minAditionalPerLevel: { }
        },
    
        [Vocation.ATTACK_SPELL_HANDLER]: {
            alignRestriction: [Align.CHAOTIC, Align.NEUTRAL],
            specieRestriction: [SpecieType.HUMAN, SpecieType.GHOST, SpecieType.LICH],
            defaultWalkEffect: [WalkEffect.CANNOT_SWIN, WalkEffect.JUST_WEAK_JUMP],
            maxAditionalPerLevel: {
                mind: 3,
                maxMana: 3
            },
            minAditionalPerLevel: {
                mind: 1,
                maxMana: 1
            }
        },
    
        [Vocation.EFFECT_SPELL_HANDLER]: {
            alignRestriction: [Align.LOYALTY, Align.NEUTRAL],
            specieRestriction: [SpecieType.HUMAN, SpecieType.GHOST, SpecieType.ANGEL],
            defaultWalkEffect: [WalkEffect.CANNOT_SWIN, WalkEffect.JUST_WEAK_JUMP],
            maxAditionalPerLevel: {
                mind: 3,
                maxMana: 3
            },
            minAditionalPerLevel: {
                mind: 1,
                maxMana: 1
            }
        },
    
        [Vocation.NECROMANCER]: {
            alignRestriction: [Align.CHAOTIC],
            specieRestriction: [SpecieType.HUMAN, SpecieType.LICH],
            defaultWalkEffect: [WalkEffect.CANNOT_SWIN, WalkEffect.JUST_WEAK_JUMP],
            maxAditionalPerLevel: {
                mind: 3,
                maxMana: 3
            },
            minAditionalPerLevel: {
                mind: 1,
                maxMana: 1
            }
        },
    
        [Vocation.CLERIC]: {
            alignRestriction: [Align.LOYALTY],
            specieRestriction: [SpecieType.HUMAN, SpecieType.ANGEL],
            defaultWalkEffect: [WalkEffect.CANNOT_SWIN, WalkEffect.JUST_WEAK_JUMP],
            maxAditionalPerLevel: {
                mind: 3,
                maxMana: 3
            },
            minAditionalPerLevel: {
                mind: 1,
                maxMana: 1
            }
        },
    
        [Vocation.BEAST_TAMER]: {
            alignRestriction: [Align.LOYALTY, Align.NEUTRAL],
            specieRestriction: [SpecieType.HUMAN, SpecieType.LIZARD_MAN, SpecieType.EAGLE_MAN],
            defaultWalkEffect: [WalkEffect.NOT_AFFECT_WHILE_SWINNING],
            maxAditionalPerLevel: {
                strength: 2,
                defense: 2,
                dexterity: 2,
                maxLife: 2,
                speed: 2
            },
            minAditionalPerLevel: { }
        },
    
        [Vocation.WITCHER]: {
            alignRestriction: [Align.CHAOTIC, Align.NEUTRAL],
            specieRestriction: [SpecieType.HUMAN, SpecieType.LIZARD_MAN, SpecieType.EAGLE_MAN],
            defaultWalkEffect: [WalkEffect.NOT_AFFECT_WHILE_SWINNING],
            maxAditionalPerLevel: {
                strength: 2,
                defense: 2,
                dexterity: 2,
                maxLife: 2,
                speed: 2
            },
            minAditionalPerLevel: { }
        },
    
        [Vocation.BLOCKER]: {
            alignRestriction: [Align.LOYALTY],
            specieRestriction: [SpecieType.HUMAN, SpecieType.LIZARD_MAN],
            defaultWalkEffect: [],
            maxAditionalPerLevel: {
                strength: 2,
                defense: 4,
                maxLife: 3,
                maxMana: 0
            },
            minAditionalPerLevel: {
                strength: 1,
                defense: 2,
                maxLife: 1
            }
        },
    
        [Vocation.HIGHLANDER]: {
            alignRestriction: [Align.CHAOTIC],
            specieRestriction: [SpecieType.HUMAN, SpecieType.LIZARD_MAN],
            defaultWalkEffect: [],
            maxAditionalPerLevel: {
                strength: 4,
                defense: 2,
                maxLife: 3,
                maxMana: 0
            },
            minAditionalPerLevel: {
                strength: 2,
                defense: 1,
                maxLife: 1
            }
        },
    
        [Vocation.NINJA]: {
            alignRestriction: [Align.CHAOTIC],
            specieRestriction: [SpecieType.HUMAN, SpecieType.LIZARD_MAN, SpecieType.EAGLE_MAN],
            defaultWalkEffect: [WalkEffect.OVERJUMP],
            maxAditionalPerLevel: {
                mind: 2,
                strength: 2,
                dexterity: 3,
                speed: 2
            },
            minAditionalPerLevel: {
                mind: 0,
                strength: 0,
                dexterity: 1,
                speed: 1
            }
        },
    
        [Vocation.SWORD_MASTER]: {
            alignRestriction: [Align.LOYALTY],
            specieRestriction: [SpecieType.HUMAN, SpecieType.LIZARD_MAN, SpecieType.EAGLE_MAN],
            defaultWalkEffect: [WalkEffect.OVERJUMP],
            maxAditionalPerLevel: {
                mind: 2,
                strength: 2,
                dexterity: 3,
                speed: 2
            },
            minAditionalPerLevel: {
                mind: 0,
                strength: 0,
                dexterity: 1,
                speed: 1
            }
        },
    
        [Vocation.ARCHER]: {
            alignRestriction: [Align.CHAOTIC, Align.LOYALTY, Align.NEUTRAL],
            specieRestriction: [SpecieType.HUMAN, SpecieType.LIZARD_MAN, SpecieType.EAGLE_MAN],
            defaultWalkEffect: [],
            maxAditionalPerLevel: {
                mind: 0,
                strength: 1,
                defense: 1,
                dexterity: 4,
                speed: 2,
                maxLife: 2,
                maxMana: 0
            },
            minAditionalPerLevel: {
                dexterity: 2
            }
        },
    
        [Vocation.GUNNER]: {
            alignRestriction: [Align.CHAOTIC, Align.LOYALTY, Align.NEUTRAL],
            specieRestriction: [SpecieType.HUMAN, SpecieType.LIZARD_MAN, SpecieType.EAGLE_MAN],
            defaultWalkEffect: [],
            maxAditionalPerLevel: { },
            minAditionalPerLevel: { }
        }
    };

    private static instance: VocationService;

    constructor() {
        if (VocationService.instance) {
            return VocationService.instance;
        }

        VocationService.instance = this;
    }

    isVocationAllowed(entity: UniqueEntity, vocation: Vocation): boolean {
        const vocationService = VocationService.vocationRules[vocation];

        if (!entity.specie || !entity.align || !vocationService) {
            return false;
        }

        if (!vocationService.alignRestriction.includes(entity.align)) {
            return false;
        }

        if (!vocationService.specieRestriction.includes(entity.specie)) {
            return false;
        }

        return true;
    }
}
