export type AnyArray = any[];

export type Expect<T extends true> = T;

export type Not<T> = T extends false ? true : false;