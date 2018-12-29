import { Ethnicity } from './../domain/ethnicity.enum';
import { NatureElement } from './../domain/element.enum';
import { MathUtil } from './../util/math.util';
import { InvalidaArgumentException } from './../business/invalid-argument-exception';
import { VocationService } from './vocation.service';
import { SpecieType } from './../domain/specie-type.enum';
import { UniqueEntity } from './../domain/unique-entity.model';
import { Align } from './../domain/align.enum';
import { EntityType } from "../domain/entity-type.enum";
import { WalkEffect } from '../domain/walk-effect.enum';
import { ObjectUtil } from '../util/object.util';
import { Vocation } from '../domain/vocation.enum';
import { Attributes } from '../domain/attributes.interface';

export class SpecieService {
    private static entityTypes: {
        [entityType: string]: SpecieType[]
    } = {
            [EntityType.SENSIENT]: [SpecieType.HUMAN, SpecieType.LIZARD_MAN, SpecieType.EAGLE_MAN],
            [EntityType.BEAST]: [SpecieType.FIRE_DRAGON, SpecieType.POISON_DRAGON, SpecieType.COCKTRICE, SpecieType.OCTOPUS, SpecieType.GOLEM, SpecieType.GRYPHON],
            [EntityType.UNDEAD]: [SpecieType.SKELETON, SpecieType.GHOST, SpecieType.LICH, SpecieType.ANGEL]
        };

    private static specieRules: {
        [specieType: string]: {
            alignRestriction: Align[],
            elementRestriction: NatureElement[],
            ethnicityRestriction: Ethnicity[],
            defaultWalkEffect: WalkEffect[],
            heavyByDefault: boolean,
            hasHability: { [level: number]: string };
            initialCarryWeight: number | null,

            /**
             * Base value to calcule the initial age of the new unique entity
             */
            initialAge: number,

            /**
             * Number to generate different ages to each new unique entity
             */
            initialAgeVariant: number,
            turnOldIn: number | null,
            maxAge: number | null,

            maxAditionalPerLevel: Attributes,
            minAditionalPerLevel: Attributes,
            maxLostWhenAged: Attributes
        }
    } = {
            [SpecieType.HUMAN]: {
                alignRestriction: [Align.CHAOTIC, Align.LOYALTY, Align.NEUTRAL],
                elementRestriction: [NatureElement.FIRE, NatureElement.GROUND, NatureElement.WATER, NatureElement.WIND],
                ethnicityRestriction: [Ethnicity.WHITE, Ethnicity.YELLOW, Ethnicity.RED, Ethnicity.BLACK, Ethnicity.BROWN],
                defaultWalkEffect: [],
                heavyByDefault: false,
                hasHability: {},
                initialCarryWeight: 10,
                initialAge: 18,
                initialAgeVariant: 2,
                turnOldIn: 65,
                maxAge: 85,
                maxAditionalPerLevel: {
                    strength: 2,
                    defense: 2,
                    maxLife: 2
                },
                minAditionalPerLevel: {},
                maxLostWhenAged: {}
            },

            [SpecieType.LIZARD_MAN]: {
                alignRestriction: [Align.CHAOTIC, Align.LOYALTY, Align.NEUTRAL],
                elementRestriction: [NatureElement.WATER, NatureElement.GROUND],
                ethnicityRestriction: [Ethnicity.WHITE, Ethnicity.YELLOW, Ethnicity.RED, Ethnicity.BLACK, Ethnicity.PURPLE, Ethnicity.GREEN],
                defaultWalkEffect: [WalkEffect.NOT_AFFECT_WHILE_SWINNING],
                heavyByDefault: false,
                hasHability: {},
                initialCarryWeight: 10,
                initialAge: 18,
                initialAgeVariant: 2,
                turnOldIn: 80,
                maxAge: 130,
                maxAditionalPerLevel: {
                    mind: 0,
                    speed: 2,
                    maxLife: 2,
                    maxMana: 0
                },
                minAditionalPerLevel: {
                    dexterity: 1,
                    speed: 1,
                },
                maxLostWhenAged: {
                    mind: 0,
                    maxLife: 0,
                    maxMana: 0
                }
            },

            [SpecieType.EAGLE_MAN]: {
                alignRestriction: [Align.CHAOTIC, Align.LOYALTY, Align.NEUTRAL],
                elementRestriction: [NatureElement.WIND],
                ethnicityRestriction: [Ethnicity.YELLOW, Ethnicity.RED, Ethnicity.BROWN],
                defaultWalkEffect: [WalkEffect.FLY],
                heavyByDefault: false,
                hasHability: {
                    10: 'ion-shot',
                    18: 'tornado'
                },
                initialCarryWeight: 8,
                initialAge: 16,
                initialAgeVariant: 1,
                turnOldIn: 50,
                maxAge: 70,
                maxAditionalPerLevel: {
                    strength: 3,
                    dexterity: 3,
                    speed: 2
                },
                minAditionalPerLevel: {
                    dexterity: 1
                },
                maxLostWhenAged: {
                    mind: 2,
                    dexterity: 2,
                    maxMana: 2
                }
            },

            [SpecieType.FIRE_DRAGON]: {
                alignRestriction: [Align.CHAOTIC, Align.LOYALTY, Align.NEUTRAL],
                elementRestriction: [NatureElement.FIRE],
                ethnicityRestriction: [Ethnicity.WHITE, Ethnicity.YELLOW, Ethnicity.RED, Ethnicity.BLACK, Ethnicity.BROWN, Ethnicity.PURPLE, Ethnicity.GREEN],
                defaultWalkEffect: [WalkEffect.WALK_ON_LAVA],
                heavyByDefault: true,
                initialCarryWeight: null,
                hasHability: {
                    0: 'fireburn'
                },
                initialAge: 3,
                initialAgeVariant: 1,
                turnOldIn: 17,
                maxAge: 24,
                maxAditionalPerLevel: {
                    strength: 3,
                    defense: 3,
                    maxLife: 4,
                    maxMana: 0
                },
                minAditionalPerLevel: {
                    strength: 1,
                    defense: 1,
                    maxLife: 2
                },
                maxLostWhenAged: {
                    dexterity: 2,
                    mind: 2,
                    speed: 2,
                    maxMana: 0
                }
            },

            [SpecieType.POISON_DRAGON]: {
                alignRestriction: [Align.CHAOTIC, Align.LOYALTY, Align.NEUTRAL],
                elementRestriction: [NatureElement.GROUND],
                ethnicityRestriction: [Ethnicity.WHITE, Ethnicity.YELLOW, Ethnicity.RED, Ethnicity.BLACK, Ethnicity.BROWN, Ethnicity.PURPLE, Ethnicity.GREEN],
                defaultWalkEffect: [],
                heavyByDefault: true,
                initialCarryWeight: null,
                hasHability: {
                    0: 'poison'
                },
                initialAge: 3,
                initialAgeVariant: 1,
                turnOldIn: 18,
                maxAge: 25,
                maxAditionalPerLevel: {
                    strength: 3,
                    defense: 3,
                    maxLife: 4,
                    maxMana: 0
                },
                minAditionalPerLevel: {
                    strength: 1,
                    defense: 1,
                    maxLife: 2
                },
                maxLostWhenAged: {
                    dexterity: 2,
                    mind: 2,
                    speed: 2,
                    maxMana: 0
                }
            },

            [SpecieType.COCKTRICE]: {
                alignRestriction: [Align.CHAOTIC, Align.LOYALTY, Align.NEUTRAL],
                elementRestriction: [NatureElement.GROUND, NatureElement.WIND],
                ethnicityRestriction: [Ethnicity.BROWN, Ethnicity.PURPLE],
                defaultWalkEffect: [WalkEffect.FLY],
                heavyByDefault: false,
                initialCarryWeight: null,
                hasHability: {
                    0: 'petrify'
                },
                initialAge: 1,
                initialAgeVariant: 1,
                turnOldIn: 14,
                maxAge: 17,
                maxAditionalPerLevel: {
                    strength: 2,
                    defense: 3,
                    speed: 3,
                    maxLife: 4,
                    maxMana: 0
                },
                minAditionalPerLevel: {
                    speed: 1,
                    maxLife: 2
                },
                maxLostWhenAged: {
                    mind: 2,
                    strength: 2,
                    maxMana: 0
                }
            },

            [SpecieType.OCTOPUS]: {
                alignRestriction: [Align.CHAOTIC, Align.LOYALTY, Align.NEUTRAL],
                elementRestriction: [NatureElement.WATER],
                ethnicityRestriction: [Ethnicity.RED, Ethnicity.PURPLE, Ethnicity.GREEN],
                defaultWalkEffect: [WalkEffect.NOT_AFFECT_WHILE_SWINNING],
                heavyByDefault: true,
                initialCarryWeight: null,
                hasHability: {
                    0: 'eddy'
                },
                initialAge: 3,
                initialAgeVariant: 5,
                turnOldIn: 100,
                maxAge: 103,
                maxAditionalPerLevel: {
                    strength: 4,
                    defense: 3,
                    maxLife: 3,
                    maxMana: 0
                },
                minAditionalPerLevel: {
                    strength: 1,
                    defense: 1
                },
                maxLostWhenAged: {
                    mind: 2,
                    dexterity: 2,
                    speed: 2
                }
            },

            [SpecieType.GOLEM]: {
                alignRestriction: [Align.CHAOTIC, Align.LOYALTY, Align.NEUTRAL],
                elementRestriction: [NatureElement.GROUND],
                ethnicityRestriction: [Ethnicity.RED, Ethnicity.BROWN, Ethnicity.GREEN],
                defaultWalkEffect: [],
                heavyByDefault: true,
                initialCarryWeight: null,
                hasHability: { },
                initialAge: 0,
                initialAgeVariant: 500,
                turnOldIn: null,
                maxAge: null,
                maxAditionalPerLevel: {
                    strength: 4,
                    defense: 4,
                    maxLife: 4,
                    maxMana: 0
                },
                minAditionalPerLevel: {
                    strength: 1,
                    defense: 1,
                    maxLife: 1
                },
                maxLostWhenAged: {}
            },

            [SpecieType.GRYPHON]: {
                alignRestriction: [Align.CHAOTIC, Align.LOYALTY, Align.NEUTRAL],
                elementRestriction: [NatureElement.WIND],
                ethnicityRestriction: [Ethnicity.BROWN],
                defaultWalkEffect: [WalkEffect.FLY],
                heavyByDefault: false,
                hasHability: {
                    10: 'ion-shot',
                    18: 'tornado'
                },
                initialCarryWeight: 0,
                initialAge: 3,
                initialAgeVariant: 1,
                turnOldIn: 16,
                maxAge: 22,
                maxAditionalPerLevel: {
                    strength: 2,
                    dexterity: 3,
                    speed: 3,
                    maxMana: 0
                },
                minAditionalPerLevel: {
                    dexterity: 1,
                    speed: 1
                },
                maxLostWhenAged: {
                    maxMana: 0
                }
            },

            [SpecieType.SKELETON]: {
                alignRestriction: [Align.CHAOTIC, Align.LOYALTY, Align.NEUTRAL],
                elementRestriction: [
                    NatureElement.DARK, NatureElement.FIRE, NatureElement.GROUND,
                    NatureElement.LIGHT, NatureElement.WATER, NatureElement.WIND
                ],
                ethnicityRestriction: [Ethnicity.WHITE, Ethnicity.YELLOW, Ethnicity.RED, Ethnicity.BLACK, Ethnicity.BROWN, Ethnicity.PURPLE, Ethnicity.GREEN],
                defaultWalkEffect: [],
                heavyByDefault: false,
                hasHability: {},
                initialCarryWeight: 6,
                initialAge: 85,
                initialAgeVariant: 60,
                turnOldIn: null,
                maxAge: null,
                maxAditionalPerLevel: {
                    maxMana: 0
                },
                minAditionalPerLevel: {},
                maxLostWhenAged: {}
            },

            [SpecieType.GHOST]: {
                alignRestriction: [Align.CHAOTIC, Align.LOYALTY, Align.NEUTRAL],
                elementRestriction: [
                    NatureElement.DARK, NatureElement.FIRE, NatureElement.GROUND,
                    NatureElement.LIGHT, NatureElement.WATER, NatureElement.WIND
                ],
                ethnicityRestriction: [Ethnicity.WHITE, Ethnicity.YELLOW, Ethnicity.RED, Ethnicity.BLACK, Ethnicity.BROWN, Ethnicity.PURPLE, Ethnicity.GREEN],
                defaultWalkEffect: [WalkEffect.FLOAT, WalkEffect.TELEPORT],
                heavyByDefault: false,
                hasHability: {
                    7: 'lifesuck'
                },
                initialCarryWeight: 6,
                initialAge: 85,
                initialAgeVariant: 60,
                turnOldIn: null,
                maxAge: null,
                maxAditionalPerLevel: {
                    mind: 3,
                    strength: 0,
                    defense: 0,
                    maxMana: 3
                },
                minAditionalPerLevel: {
                    mind: 1,
                    maxMana: 1
                },
                maxLostWhenAged: {}
            },

            [SpecieType.LICH]: {
                alignRestriction: [Align.CHAOTIC, Align.NEUTRAL],
                elementRestriction: [
                    NatureElement.DARK, NatureElement.FIRE, NatureElement.GROUND,
                    NatureElement.WATER, NatureElement.WIND
                ],
                ethnicityRestriction: [Ethnicity.WHITE, Ethnicity.YELLOW, Ethnicity.RED, Ethnicity.BLACK, Ethnicity.BROWN, Ethnicity.PURPLE, Ethnicity.GREEN],
                defaultWalkEffect: [WalkEffect.NOT_AFFECT_WHILE_SWINNING],
                heavyByDefault: false,
                hasHability: {
                    7: 'lifesuck',
                    25: 'necro'
                },
                initialCarryWeight: 12,
                initialAge: 85,
                initialAgeVariant: 60,
                turnOldIn: null,
                maxAge: null,
                maxAditionalPerLevel: {
                    mind: 3,
                    maxLife: 3,
                    maxMana: 3
                },
                minAditionalPerLevel: {
                    mind: 1,
                    maxMana: 1
                },
                maxLostWhenAged: {}
            },

            [SpecieType.ANGEL]: {
                alignRestriction: [Align.LOYALTY, Align.NEUTRAL],
                elementRestriction: [
                    NatureElement.FIRE, NatureElement.GROUND, NatureElement.LIGHT,
                    NatureElement.WATER, NatureElement.WIND
                ],
                ethnicityRestriction: [Ethnicity.WHITE, Ethnicity.YELLOW, Ethnicity.RED, Ethnicity.BLACK, Ethnicity.BROWN, Ethnicity.PURPLE, Ethnicity.GREEN],
                defaultWalkEffect: [WalkEffect.FLY],
                heavyByDefault: false,
                hasHability: {
                    6: 'calm-song',
                    7: 'sad-song'
                },
                initialCarryWeight: 12,
                initialAge: 85,
                initialAgeVariant: 60,
                turnOldIn: null,
                maxAge: null,
                maxAditionalPerLevel: {
                    mind: 3,
                    maxLife: 3,
                    maxMana: 3
                },
                minAditionalPerLevel: {
                    mind: 1,
                    maxMana: 1
                },
                maxLostWhenAged: {}
            }
        };

    private static instance: SpecieService;

    constructor() {
        if (SpecieService.instance) {
            return SpecieService.instance;
        }

        SpecieService.instance = this;
    }

    private vocationService = new VocationService();

    turnIntoUndead(newSpecie: SpecieType, uniqueEntity: UniqueEntity): UniqueEntity {
        //  arguments validation
        const undeadList = SpecieService.entityTypes[EntityType.UNDEAD];
        if (!undeadList.includes(newSpecie)) {
            throw new InvalidaArgumentException(`"${newSpecie}" is not a undead specie.`);
        }

        if (uniqueEntity.age === undefined) {
            throw new InvalidaArgumentException(`"${uniqueEntity.personalName}" has no age, this is an error.`);
        }

        let isDead = uniqueEntity.isDead || false;
        if (!isDead && uniqueEntity.willDieIn) {
            isDead = uniqueEntity.age > uniqueEntity.willDieIn;
        }

        if (!isDead) {
            throw new InvalidaArgumentException(`Can't turn a alive entity into undead.`);
        }

        //  conversion
        const newUndead = ObjectUtil.clone<UniqueEntity>(uniqueEntity, UniqueEntity);
        newUndead.specie = newSpecie;
        newUndead.items = [];
        newUndead.vocation = Vocation.GENERIC_SOLDIER;

        return newUndead;
    }

    generateNewUniqueEntity(
        specie: SpecieType, personalName: string, element: NatureElement
    ): UniqueEntity {
        const entity = new UniqueEntity();
        entity.specie = specie;
        entity.personalName = personalName;
        entity.age = this.calculateInitialAge(specie);
        entity.currentVocation = this.getSpecieFirstVocation(entity);

        // if () {

        // }

        return entity;
    }

    getAttributesIncressByLevelUp(): Attributes {
        return {};
    }

    getAttributesDecressByAgeUp(): Attributes {
        return {};
    }

    private getSpecieFirstVocation(entity: UniqueEntity): Vocation | null {
        if (this.vocationService.isVocationAllowed(entity, Vocation.GENERIC_SOLDIER)) {
            return Vocation.GENERIC_SOLDIER;
        } else {
            return null;
        }
    }

    private calculateInitialAge(specie: SpecieType): number {
        const rules = SpecieService.specieRules[specie];
        let variant = MathUtil.integerRandom(rules.initialAgeVariant);
        const signal = MathUtil.arrayRandom([-1, 1]);
        variant = MathUtil.calc.multiply(variant, signal);

        return MathUtil.calc.sum(rules.initialAge, variant);
    }
}
