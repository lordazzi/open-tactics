import { NatureElement } from './../domain/element.enum';
import { Fireburn } from './../spell/fireburn.spell';
import { SpellSpecification } from './../spell/spell-specification.interface';
import { ObjectUtil } from '../util/object.util';
import { InvalidaArgumentException } from '../business/invalid-argument-exception';

export class SpellService {
    private spellRegister: {
        [spellId: string]: SpellSpecification
    } = {};

    private readonly spellRegisterByElement: {
        [element: string]: {
            [spellId: string]: SpellSpecification
        }
    } = {
        /**
         * Fire spells
         */
        [NatureElement.FIRE]: {
            fireburn: new Fireburn(),
            stun: new Fireburn(),
            melt: new Fireburn(),
            heat: new Fireburn(),
            'zoshonell-pray': new Fireburn(),
            magmagod: new Fireburn(),
        },

        /**
         * Water spells
         */
        [NatureElement.WATER]: {
            'ice-blast': new Fireburn(),
            clear: new Fireburn(),
            'slow-move': new Fireburn(),
            'heal-rain': new Fireburn(),
            'gurza-pray': new Fireburn(),
            'fenril': new Fireburn(),
            'acid-rain': new Fireburn(),
        },

        /**
         * Ground spells
         */
        [NatureElement.GROUND]: {
            acid: new Fireburn(),
            poison: new Fireburn(),
            jump: new Fireburn(),
            petrify: new Fireburn(),
            'bartha-pray': new Fireburn(),
            gnome: new Fireburn(),
            meteor: new Fireburn(),
        },

        /**
         * Wind spells
         */
        [NatureElement.WIND]: {
            'ion-shot': new Fireburn(),
            storm: new Fireburn(),
            tornado: new Fireburn(),
            quick: new Fireburn(),
            thunder: new Fireburn(),
            teleport: new Fireburn(),
            'hahnela-pray': new Fireburn(),
            kaminari: new Fireburn(),
        },

        /**
         * Light spells
         */
        [NatureElement.LIGHT]: {
            heal: new Fireburn(),
            exorcism: new Fireburn(),
            vitalize: new Fireburn(),
            'heal-plus': new Fireburn(),
            'light-bow': new Fireburn(),
            'heal-all': new Fireburn(),
            'ishtar-pray': new Fireburn(),
            revivify: new Fireburn(),
        },

        /**
         * Dark spells
         */
        [NatureElement.DARK]: {
            incubus: new Fireburn(),
            charm: new Fireburn(),
            pain: new Fireburn(),
            charge: new Fireburn(),
            paradigm: new Fireburn(),
            'asmodee-pray': new Fireburn(),
            'dark-law': new Fireburn(),
            'necro': new Fireburn(),
        }
    };

    constructor() {
        this.onInit();
    }

    private onInit(): void {
        this.spellRegister = ObjectUtil.join(
            this.spellRegisterByElement[NatureElement.FIRE],
            this.spellRegisterByElement[NatureElement.GROUND],
            this.spellRegisterByElement[NatureElement.WATER],
            this.spellRegisterByElement[NatureElement.WIND],
            this.spellRegisterByElement[NatureElement.LIGHT],
            this.spellRegisterByElement[NatureElement.DARK]
        );
    }

    getSpellById(spellId: string): SpellSpecification {
        if (this.spellRegister[spellId]) {
            return this.spellRegister[spellId];
        }

        throw new InvalidaArgumentException('Spell not found');
    }
}
