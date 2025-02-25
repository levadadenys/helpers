import {Equals} from './../conditionTypes'
import {Expect} from './../utils'

export type ObjectValues<T extends object> = T[keyof T];

export type Optional<T> = T | undefined;

export type Pair<T1, T2> = [T1,T2];

// Example usage
type OptionalNumber = Optional<number>; // number | undefined;
type OptionalString = Optional<string>; // string | undefined;

type Coordinates = Pair<number, number>; // [number, number];
type MapEntry = Pair<string, unknown>; // [string, unknown];

// Tests

// @ts-expect-error
type ObjectValuesTest_1 = ObjectValues<number>; // Error: Type 'number' does not satisfy the constraint 'object'.
type ObjectValuesTest_2 = ObjectValues<{ name: string; age: number }>; // string | number

type OptionalTest_1 = Expect<Equals<Optional<number>, number | undefined>>; // Expect<true>
type OptionalTest_2 = Expect<Equals<Optional<string>, string | undefined>>; // Expect<true>

type PairTest_1 = Expect<Equals<Pair<number, string>, [number, string]>>; // Expect<true>
type PairTest_2 = Expect<Equals<Pair<boolean, number>, [boolean, number]>>; // Expect<true>
type PairTest_3 = Expect<Equals<Pair<unknown, unknown>, [unknown, unknown]>>; // Expect<true>
