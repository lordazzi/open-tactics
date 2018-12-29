export class InvalidaArgumentException {
    code = 500;
    
    constructor(
        public message = 'InvalidaArgumentException'
    ) { }
}
