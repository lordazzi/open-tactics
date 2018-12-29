import { Calc } from 'calc-js';

export class MathUtil {
    private constructor() { }

    static readonly calc = Calc;

    static integerRandom(to: number, from = 0): number {
        return Math.floor(Math.random() * (to - from)) + from;
    }

    static arrayRandom<T>(collection: T[]): T {
        return collection[this.integerRandom(collection.length)];
    }
}
