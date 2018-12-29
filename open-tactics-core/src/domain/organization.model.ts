import { OrganizationRole } from './organization-role.enum';
import { Align } from './align.enum';
import { Descriptionable } from './descriptionable.interface';

export class Organization implements Descriptionable {
    name?: string;
    description?: string;
    align?: Align;
    role?: OrganizationRole;
    leaderUid?: string;
}
