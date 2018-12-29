import { Tool } from './../domain/tool.model';
import { Armor } from './../domain/armor.model';
import { Usable } from './../domain/usable.model';
import { Grabbable } from './../domain/grabbable.interface';
import { Weapon } from '../domain/weapon.model';
import { ItemType } from '../domain/item-type.enum';
import { InvalidaArgumentException } from '../business/invalid-argument-exception';

export class ItemService {
    private static instance: ItemService;

    constructor() {
        if (ItemService.instance) {
            return ItemService.instance;
        }

        ItemService.instance = this;
    }

    isWeapon(grabbable: Grabbable): grabbable is Weapon {
        if (!grabbable.item) {
            throw new InvalidaArgumentException();
        }

        return grabbable.item.type === ItemType.WEAPON || false;
    }

    isUsable(grabbable: Grabbable): grabbable is Usable {
        if (!grabbable.item) {
            throw new InvalidaArgumentException();
        }

        return grabbable.item.type === ItemType.USABLE || false;
    }

    isArmor(grabbable: Grabbable): grabbable is Armor {
        if (!grabbable.item) {
            throw new InvalidaArgumentException();
        }

        return grabbable.item.type === ItemType.ARMOR || false;
    }

    isTool(grabbable: Grabbable): grabbable is Tool {
        if (!grabbable.item) {
            throw new InvalidaArgumentException();
        }

        return grabbable.item.type === ItemType.TOOL || false;
    }
}