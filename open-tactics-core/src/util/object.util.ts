import { Class } from './class';

export class ObjectUtil {
    private constructor() { }

    static clone<T>(instance: T, schema: Class<T>): T {
        return JSON.parse(JSON.stringify(instance)) as T;
    }

    static join(...obj: { [prop: string]: any }[]): { [prop: string]: any } {
        const resultSet: { [prop: string]: any } = {}; 
        obj.forEach(joinMe => {
            Object.keys(joinMe).forEach(key => {
                resultSet[key] = joinMe[key];
            });
        });

        return resultSet;
    }
}
