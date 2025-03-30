export type Equals<A,B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

export type If<Condition, TrueType, FalseType> = Condition extends true ? TrueType : FalseType;

export type evenDigit = 0 | 2 | 4 | 6 | 8;
export type IsEven<T extends number> = `${T}` extends `${number}${evenDigit}` ? true : false;

export type IsNumber<T> = T extends number ? true : false;

export type IsString<T> = T extends string ? true : false;

// Tests
type EqualsTest_1 = Equals<"🍌", "🍌">;// true
type EqualsTest_2 =  Equals<"🍏", "🍌">; // false
type EqualsTest_3 = Equals<string, "🍌">; // false
type EqualsTest_4 = Equals<"🍌", string>; // false

type IfTest_1 = If<IsNumber<42>, "yes", "no">; // "yes"
type IfTest_2 = If<Equals<'a', 'a'>, "yes", "no">; // "yes"
type IfTest_3 = If<Equals<'a', 'b'>, "yes", "no">; // "no"

type IsEventTest_1 = IsEven<42>; // true
type IsEventTest_2 = IsEven<13>; // false

type IsNumberTest_1 = IsNumber<42>; // true
type IsNumberTest_2 = IsNumber<"42">; // false

type IsStringTest_1 = IsString<"42">; // true
type IsStringTest_2 = IsString<42>; // false