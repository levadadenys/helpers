export type AnyArray = unknown[];

export type Expect<T extends true> = T;

export type Not<T> = T extends false ? true : false;