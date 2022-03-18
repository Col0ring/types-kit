export declare type And<A extends ArrayAndReadonlyArrayByPassArray> = If<
IsTuple<A>,
A extends ArrayAndReadonlyArrayByPassArray<[infer Current, ...infer Rest]>
? If<
Current,
If<
IsTuple<Rest>,
And<Rest>,
Or<[IsEmptyTypeArray<Rest>, IsTruthy<ArrayItem<Rest>>]>
>,
false
>
: A extends ArrayAndReadonlyArrayByPassArray<[...infer Rest, infer Current]>
? If<
Current,
If<
IsTuple<Rest>,
And<Rest>,
Or<[IsEmptyTypeArray<Rest>, IsTruthy<ArrayItem<Rest>>]>
>,
false
>
: never,
IsTruthy<ArrayItem<A>>
>

export declare type ArrayAndReadonlyArrayByPassArray<
T extends unknown[] | readonly unknown[] = unknown[]
> = T | Readonly<T>

export declare type ArrayAndReadonlyArrayByPassItem<T = any> = T[] | readonly T[]

export declare type ArrayEntry<T extends readonly unknown[]> = [number, T[number]]

export declare type ArrayItem<T extends ArrayAndReadonlyArrayByPassItem> =
T extends ArrayAndReadonlyArrayByPassItem<infer Item> ? Item : never

export declare type ArrayTuple<
N extends number,
V = any,
// array tool, don't pass in parameters
HelperArray extends V[] = []
> = N extends N
? HelperArray['length'] extends N
? HelperArray
: ArrayTuple<N, V, [...HelperArray, V]>
: never

export declare type C = DeepReplacePick<
    {
    a: {
        b: {
            c: 2
        }
    }
    e: {
        c: 2
    }
},
['a.b.c', 'e.c'],
[1, '000']
>

export declare type Class<T, P extends unknown[] = unknown[]> = Constructor<T, P> & {
    prototype: T
}

/**
 * @description Get keys by Condition (value)
 * @example
 * ```ts
 *  interface Props {
 *    a?: number
 *    b: string
 *    c: boolean
 *  }
 *
 *  // Expect: 'b' | 'c'
 *  type PropKeys = ConditionalKeys<Props, string | boolean>
 *  // Set exact true, expect: 'c'
 *  type PropKeys2 = ConditionalKeys<Props, string | boolean, true>
 * ```
 */
export declare type ConditionalKeys<T, Condition, Exact extends boolean = false> = {
    [K in Keys<T>]: Exact extends true
    ? T[K] extends Condition
    ? K
    : never
    : T[K] extends infer V
    ? V extends Condition
    ? K
    : never
    : never
}[Keys<T>]

/**
 * @description Omit by Condition (value)
 * @example
 * ```ts
 *  interface Props {
 a?: number
 b: string
 c: boolean
 }
 *
 *  // Expect: { b: string }
 *  type NewProps = ConditionalPick<Props, number | boolean>
 *   // Set exact true, expect: { a?: number, b: string }
 *  type NewProps = ConditionalPick<Props, number | boolean, true>
 * ```
 */
export declare type ConditionalOmit<
T,
Condition,
Exact extends boolean = false
> = StrictOmit<T, ConditionalKeys<T, Condition, Exact>>

/**
 * @description Pick by Condition (value)
 * @example
 * ```ts
 *  interface Props {
 a?: number
 b: string
 c: boolean
 }
 *
 *  // Expect: { a?: number, c: boolean }
 *  type NewProps = ConditionalPick<Props, number | boolean>
 *  // Set exact true, expect: { c: boolean }
 *  type NewProps = ConditionalPick<Props, number | boolean>
 * ```
 */
export declare type ConditionalPick<T, Condition, Exact extends boolean = false> = Pick<
T,
ConditionalKeys<T, Condition, Exact>
>

export declare type Constructor<T, P extends unknown[] = unknown[]> = new (
...args: P
) => T

/**
 *
 * @description Get the deep specified value from T
 * @example
 * ```ts
 *  interface Props {
 a: {
 d: () => void
 }
 b: string
 c: boolean
 }
 *
 *  // Expect: (()=> void) | number | string
 *  type PropValues = Get<Props, 'a.d' | 'b'>
 * ```
 */
export declare type DeepGet<
T,
K extends DeepKeys<T>
> = K extends `${infer Head}.${infer Tail}`
? Head extends Keys<T>
? T[Head] extends infer V
? V extends V
? IsObject<V> extends true
? Tail extends DeepKeys<V>
? DeepGet<V, Tail>
: never
: // if the value of the parent property is not an object, like a?.b, then the value of b will be undefined
undefined
: never
: never
: never
: K extends keyof T
? T[K]
: never

/**
 *
 * @description Get deep keys of T
 * @example
 * ```ts
 *  interface Props {
 a?: {
 readonly b?: number
 c: {
 d?: number
 }
 }
 e: number
 }
 *
 *  // Expect: 'a' | 'a.b' | 'a.c' | 'a.c.d' | 'e'
 *  type PropKeys = DeepKeys<Props>
 * ```
 */
export declare type DeepKeys<T> = InternalDeepKeys<T>

/**
 *
 * @description Get the deep value path from T
 * @example
 * ```ts
 *  interface Props {
 a?: {
 c: boolean
 d: () => void
 e: number
 }
 b: string
 }
 *
 *  // Expect: { a?: { c: boolean; d: () => void } }
 *  type PropValues = DeepPick<Props, 'a.c' | 'a.d'>
 * ```
 */
export declare type DeepPick<T, K extends DeepKeys<T>> = {
    [P in keyof T as P extends OtherToString<K>
    ? P
    : K extends `${infer Head}.${string}`
    ? P extends Head
    ? P
    : never
    : never]: P extends OtherToString<K> // merge
    ? T[P]
    : [Exclude<K, Keys<T>>] extends [`${infer Head}.${infer Tail}`]
    ? P extends Head
    ? T[P] extends infer V
    ? V extends V
    ? IsObject<V> extends true
    ? DeepPick<
    V,
    Extract<
    Tail extends Tail
    ? `${P}.${Tail}` extends K
    ? Tail
    : never
    : never,
    DeepKeys<V>
    >
    >
    : V
    : never
    : never
    : never
    : never
}

export declare type DeepReplacePick<
T,
KeysArr extends readonly DeepKeys<T>[],
ValuesArr extends Fill<KeysArr['length'], unknown>
> = InternalDeepReplacePick<T, KeysArr, ValuesArr>

export declare type DeepReplacePickKeys<
Key,
KeysArr extends readonly unknown[],
ValuesArr extends readonly unknown[],
ResultKeys extends readonly unknown[] = [],
ResultValues extends readonly unknown[] = []
> = KeysArr extends [KeysArr[0], ...infer RestKeys]
? ValuesArr extends [ValuesArr[0], ...infer RestValues]
? KeysArr[0] extends `${infer Head}.${infer Tail}`
? Key extends Head
? DeepReplacePickKeys<
Key,
RestKeys,
RestValues,
[...ResultKeys, Tail],
[...ResultValues, ValuesArr[0]]
>
: DeepReplacePickKeys<
Key,
RestKeys,
RestValues,
ResultKeys,
ResultValues
>
: Key extends KeysArr[0]
? DeepReplacePickKeys<
Key,
RestKeys,
RestValues,
[...ResultKeys, KeysArr[0]],
[...ResultValues, ValuesArr[0]]
>
: DeepReplacePickKeys<Key, RestKeys, RestValues, ResultKeys, ResultValues>
: [ResultKeys, ResultValues]
: [ResultKeys, ResultValues]

export declare type DeepReplacePickValue<
Key,
Current,
KeysArr extends readonly unknown[],
ValuesArr extends readonly unknown[]
> = Key extends KeysArr[0]
? [true, ValuesArr[0]]
: KeysArr extends [KeysArr[0], ...infer RestKeys]
? ValuesArr extends [ValuesArr[0], ...infer RestValues]
? DeepReplacePickValue<Key, Current, RestKeys, RestValues>
: [false, Current]
: [false, Current]

/**
 *
 * @description Get deep values of T
 * @example
 * ```ts
 *  interface Props {
 a?: {
 d: () => void
 }
 b: string
 c: boolean
 }
 *
 *  // Expect: { d: () => void } | (() => void) | string | boolean | undefined
 *  type PropValues = DeepValueOf<Props>
 * ```
 */
export declare type DeepValueOf<T> = {
    [K in Keys<T>]: T[K] extends infer V
    ? V extends V
    ? IsObject<V> extends true
    ? T[K] | DeepValueOf<T[K]>
    : T[K]
    : never
    : never
}[Keys<T>]

export declare type Entries<T> = Entry<T> extends infer E
? IsNever<E> extends true
? never
: E[]
: never

export declare type Entry<T> = T extends ReadonlyMap<unknown, unknown>
? MapEntry<T>
: T extends ReadonlySet<unknown>
? SetEntry<T>
: T extends readonly unknown[]
? ArrayEntry<T>
: T extends object
? ObjectEntry<T>
: never

export declare type EqualTag = 'equal'

export declare type ExtendsTag = 'extends'

export declare type Falsy = 0 | false | '' | undefined | null | void | never | unknown

export declare type FalsyWithoutUnknown =
| 0
| false
| ''
| undefined
| null
| void
| never

export declare type Fill<L extends number, V> = L extends L ? InternalFill<L, V> : never

export declare type Flat<T extends readonly unknown[]> = T extends T
? true extends IsTuple<T>
? T extends readonly [infer A, ...infer B]
? A extends readonly unknown[]
? [...Flat<A>, ...Flat<B>]
: [A, ...Flat<B>]
: T extends readonly [...infer A, infer B]
? B extends readonly unknown[]
? [...Flat<A>, ...Flat<B>]
: [...Flat<A>, B]
: never
: // array or empty array
true extends IsEmptyTypeArray<T>
? []
: FlattedArrayItem<T>[]
: never

export declare type FlattedArrayItem<T extends ArrayAndReadonlyArrayByPassItem> =
T extends ArrayAndReadonlyArrayByPassItem<infer Item>
? Item extends ArrayAndReadonlyArrayByPassItem
? FlattedArrayItem<Item>
: Item
: never

/**
 *
 * @description Get the specified value from T
 * @example
 * ```ts
 *  interface Props {
 a?: number
 b: string
 c: boolean
 }
 *
 *  // Expect: number | string | undefined
 *  type PropValues = Get<Props, 'a' | 'b'>
 * ```
 */
export declare type Get<T, K extends Keys<T>> = T[K]

export declare type If<Condition, Case1, Case2> = IfExtends<
[IsTruthy<Condition>, true],
Case1,
Case2
>

export declare type IfElseIf<
A extends ArrayAndReadonlyArrayByPassArray<
// if/else if/else
[[Condition: any, Result: any], ...[Condition: any, Result: any][], any]
>
> = A extends ArrayAndReadonlyArrayByPassArray<
[infer IfExpression, ...infer ElseIfExpressions, infer ElseResult]
>
? IfExpression extends [infer IfCondition, infer IfResult]
? If<
IfCondition,
IfResult,
If<
IsTuple<ElseIfExpressions>,
ElseIfExpressions extends [
[infer ElseIfCondition, infer ElseIfResult],
...infer OtherElseIfExpressions
]
? OtherElseIfExpressions extends [Condition: any, Result: any][]
? IfElseIf<
[
[ElseIfCondition, ElseIfResult],
...OtherElseIfExpressions,
ElseResult
]
>
: If<ElseIfCondition, ElseIfResult, ElseResult>
: ElseResult,
// empty array or array
ElseIfExpressions extends [
infer ElseIfCondition,
infer ElseIfResult
][]
? If<ElseIfCondition, ElseIfResult, ElseResult>
: ElseResult
>
>
: // feedback
ElseResult
: never

export declare type IfExtends<Condition extends [any, any], Case1, Case2> = [
Condition[0]
] extends [Condition[1]]
? Case1
: Case2

export declare type Includes<
T extends readonly unknown[],
V,
Type extends EqualTag | ExtendsTag = ExtendsTag
> = T extends T
? true extends IsTuple<T>
? T extends [infer Current, ...infer Rest]
? [Type] extends [EqualTag]
? true extends IsEquals<V, Current>
? true
: Includes<Rest, V, Type>
: [V] extends [Current]
? true
: Includes<Rest, V, Type>
: T extends [...infer Rest, infer Current]
? [Type] extends [EqualTag]
? true extends IsEquals<V, Current>
? true
: Includes<Rest, V, Type>
: [V] extends [Current]
? true
: Includes<Rest, V, Type>
: never
: IsEquals<ArrayItem<T>, V>
: never

export declare type IndexMatches<
Head extends readonly unknown[],
Tail extends readonly unknown[],
Index extends number
> = Head['length'] extends Index
? true
: `-${Tail['length']}` extends `${Index}`
? true
: false

export declare type InternalDeepKeys<T, P extends string = ''> = keyof {
    [K in Keys<T> as K extends PathKey
    ? P extends ''
    ? T[K] extends infer V
    ? V extends V
    ? IsObject<V> extends true
    ? // we will get values like 0 and '0', but only need to recurse once
    K | (K extends number ? never : InternalDeepKeys<V, `${K}`>)
    : K
    : never
    : never
    : T[K] extends infer V
    ? V extends V
    ? IsObject<V> extends true
    ?
    | `${P}.${K}`
    | (K extends number ? never : InternalDeepKeys<V, `${P}.${K}`>)
    : `${P}.${K}`
    : never
    : never
    : never]: never
}

export declare type InternalDeepReplacePick<
T,
KeysArr extends readonly unknown[],
ValuesArr extends readonly unknown[]
> = {
    [P in keyof T as P extends Keys<T> ? P : never]: DeepReplacePickValue<
    P,
    T[P],
    KeysArr,
    ValuesArr
    > extends [infer Res, infer V]
    ? Res extends true
    ? V
    : V extends object
    ? // get filter keys and values
    DeepReplacePickKeys<P, KeysArr, ValuesArr> extends [
    infer ResultKeys,
    infer ResultValues
    ]
    ? ResultKeys extends readonly unknown[]
    ? ResultValues extends readonly unknown[]
    ? IsEmptyTypeArray<ResultKeys> extends true
    ? V
    : InternalDeepReplacePick<V, ResultKeys, ResultValues>
    : never
    : never
    : never
    : V
    : never
}

export declare type InternalFill<
L extends number,
V,
Res extends readonly unknown[] = []
> = Res['length'] extends L ? Res : InternalFill<L, V, [...Res, V]>

export declare type IsAny<T> = IsExtends<number, 0 & T>

export declare type IsEmptyTypeArray<T extends ArrayAndReadonlyArrayByPassArray> =
T extends T ? IsExtends<T['length'], 0> : never

export declare type IsEquals<A, B> = (<T>() => T extends A ? 1 : 2) extends <
T
>() => T extends B ? 1 : 2
? true
: false

export declare type IsExtends<A, B> = [A] extends [B] ? true : false

export declare type IsFalsy<T> = IfExtends<
[T, never],
true,
IfExtends<
[T, FalsyWithoutUnknown],
IfExtends<[IsAny<T>, true], false, true>,
IsUnknown<T>
>
>

export declare type IsNever<T> = IsExtends<T, never>

export declare type IsObject<T> = IfExtends<
[T, object],
IfExtends<[IsAny<T>, true], false, true>,
false
>

export declare type IsReadonlyArray<T extends ArrayAndReadonlyArrayByPassArray> =
T extends T ? Not<IsExtends<T, any[]>> : never

export declare type IsTruthy<T> = IfExtends<[IsFalsy<T>, true], false, true>

export declare type IsTuple<T extends ArrayAndReadonlyArrayByPassArray> = T extends T
? IsExtends<T, Tuple>
: never

export declare type IsUnknown<T> = IfExtends<
[unknown, T],
IfExtends<[IsAny<T>, true], false, true>,
false
>

/**
 * @description Get the value type of an Iterable / AsyncIterable
 * @example
 * ```ts
 * function* IterableValueFoo() {
 yield 1
 yield 2
 }
 // Expect: 1 | 2
 type FooType = IterableValue<ReturnType<typeof IterableValueFoo>>
 async function* IterableValueBar() {
 yield 3
 yield 4
 }
 // Expect: 3 | 4
 type BarType = IterableValue<ReturnType<typeof IterableValueBar>>
 * ```
 */
export declare type IterableValue<T> = T extends Iterable<infer U>
? U
: T extends AsyncIterable<infer U>
? U
: never

export declare type Iterate<
Start extends number,
End extends number,
Head extends readonly unknown[],
Tail extends readonly unknown[],
Result extends readonly unknown[],
InRange extends boolean
> = Tail extends [infer X, ...infer XS]
? If<
// if end is out of range
IndexMatches<Head, Tail, End>,
Result,
If<
// if start is out of range
Or<[InRange, IndexMatches<Head, Tail, Start>]>,
Iterate<Start, End, [...Head, X], XS, [...Result, X], true>,
Iterate<Start, End, [...Head, X], XS, Result, false>
>
>
: Result

/**
 *
 * @description Get keys of T
 * @example
 * ```ts
 *  interface Props {
 *    a?: number
 *    b: number
 *    c: number
 *  }
 *
 *  // Expect: 'a' | 'b' | 'c'
 *  type PropKeys = Keys<Props>
 * ```
 */
export declare type Keys<T> = T extends readonly unknown[]
? // unknown[] extends readonly unknown[], but readonly unknown[] not extends unknown[]
TupleKeys<T> extends infer K
? K extends keyof T
? K
: never
: never
: keyof T

/**
 *
 * @description Get the last type in a union type (important!: the result is random when you are using tsc, the correct type can only be obtained through the editor environment)
 * @example
 * ```ts
 * // Expect: 2
 * type Foo = LastInUnion<1 | 2>
 * ```
 * if it is necessary to output one type from overload, TS selects the last signature in the overload.
 */
export declare type LastInUnion<U> = UnionToIntersection<
U extends unknown ? (x: U) => 0 : never
> extends (x: infer L) => 0
? L
: never

export declare type MapEntry<T extends ReadonlyMap<unknown, unknown>> =
T extends ReadonlyMap<infer K, infer V> ? [K, V] : never

/**
 *
 * @description Make all properties in T mutable (remove readonly decorator)
 * @example
 * ```ts
 *    interface Props {
 *      readonly a: number;
 *      readonly b: number;
 *      readonly c: number;
 *    };
 *    // Expect: { a: number; b: number; c: number; }
 *    type NewProps = Mutable<Props>;
 * ```
 */
export declare type Mutable<T> = {
    -readonly [P in keyof T]: T[P]
}

/**
 *
 * @description Make all properties (includes deep properties) in T mutable (remove readonly decorator)
 * @example
 * ```ts
 * interface Props {
 readonly a: {
 readonly d: number
 };
 readonly b: number;
 readonly c: number;
 };
 // Expect: { a: { d: number }; b: number; c: number; }
 type NewProps = MutableDeep<Props>;
 * ```
 */
// here we use keyof T, which can allow us return a array at the end
export declare type MutableDeep<T> = {
    -readonly [P in keyof T]: MutableDeep<T[P]>
}

/**
 * @description Get mutable property keys of T
 * @example
 * ```ts
 * interface Props {
 readonly a?: number
 b: number
 readonly c: number
 }
 // Expect: 'b'
 type Keys = ReadonlyKeys<Props>
 * ```
 */
export declare type MutableKeys<T> = Exclude<Keys<T>, ReadonlyKeys<T>>

export declare type Not<T> = If<IsFalsy<T>, true, false>

export declare type ObjectEntry<T extends object> = [
Keys<T> extends infer K ? (K extends number ? K : never) : never,
T[Keys<T>]
]

/**
 * @description Get optional property keys of T
 * @example
 * ```ts
 * interface Props {
 a?: number
 readonly b: number
 c?: number
 }

 // Expect: 'a' | 'c'
 type PropKeys = OptionalKeys<Props>
 * ```
 */
export declare type OptionalKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? K : never
}[Keys<T>]

export declare type Or<A extends ArrayAndReadonlyArrayByPassArray> = If<
IsTuple<A>,
A extends ArrayAndReadonlyArrayByPassArray<[infer Current, ...infer Rest]>
? If<Current, true, Or<Rest>>
: A extends ArrayAndReadonlyArrayByPassArray<[...infer Rest, infer Current]>
? If<Current, true, Or<Rest>>
: never,
IsTruthy<ArrayItem<A>>
>

export declare type OtherToString<T> = T extends
| string
| number
| bigint
| boolean
| null
| undefined
? `${T}`
: never

/**
 *
 * @description Make all properties (includes deep properties) in T optional
 * @example
 * ```ts
 * interface Props {
 a: {
 d: number
 };
 b: number;
 c: number;
 };
 // Expect: { a?: { d?: number }; b?: number; c?: number; }
 type NewProps = PartialDeep<Props>;
 * ```
 */
// here we use keyof T, which can allow us return a array at the end
export declare type PartialDeep<T> = {
    [P in keyof T]?: PartialDeep<T[P]>
}

export declare type PathKey = string | number

/**
 * @description Create a type that requires all of the given keys or none of the given keys. The remaining keys are kept as is.
 * @example
 * ```ts
 interface Responder {
 text?: () => string;
 json?: () => string;
 secure?: boolean;
 };

 const responder1: RequireAllOrNone<Responder, 'text' | 'json'> = {
 secure: true
 };
 const responder2: RequireAllOrNone<Responder, 'text' | 'json'> = {
 text: () => '{"message": "hi"}',
 json: () => '{"message": "ok"}',
 secure: true
 };
 const responder2: RequireAllOrNone<Responder, 'text' | 'json'> = {
 json: () => '{"message": "ok"}', // throw error
 secure: true
 };
 * ```
 */
export declare type PickAllOrNone<T, K extends Keys<T>> = StrictOmit<T, K> &
(
| Required<Pick<T, K>>
| Partial<{
    [P in keyof T as P extends K ? P : never]: never
}>
)

/**
 * @description Create a type that requires at least one of the given keys. The remaining keys are kept as is.
 * @example
 * ```ts
 interface Responder {
 text?: () => string;
 json?: () => string;
 secure?: boolean;
 };
 const responder: RequireAtLeastOne<Responder, 'text' | 'json'> = {
 // set at least one property, 'text' or 'json', otherwise throw error
 json: () => '{"message": "ok"}',
 secure: true
 };
 * ```
 */
export declare type PickAtLeastOne<T, K extends Keys<T>> = StrictOmit<T, K> &
    {
    [P in K]: Required<Pick<T, P>> & Partial<Pick<T, StrictExclude<K, P>>>
}[K]

/**
 * @description Create a type that requires at least one of the given keys. The remaining keys are kept as is.
 * @example
 * ```ts
 interface Responder {
 text?: () => string;
 json?: () => string;
 secure?: boolean;
 };
 const responder1: PickExactlyOne<Responder, 'text' | 'json'> = {
 json: () => '{"message": "ok"}',
 secure: true
 };
 const responder2: PickExactlyOne<Responder, 'text' | 'json'> = {
 text: () => '{"message": "ok"}',
 secure: true
 };
 const responder2: PickExactlyOne<Responder, 'text' | 'json'> = {
 text: () => '{"message": "ok"}', // throw error
 json: () => '{"message": "ok"}',
 secure: true
 };
 * ```
 */
export declare type PickExactlyOne<T, K extends Keys<T>> = StrictOmit<T, K> &
    {
    [P in K]: Required<Pick<T, P>> &
    Partial<{
        [Q in keyof T as Q extends Exclude<K, P> ? Q : never]: never
    }>
}[K]

/**
 *
 * @description Make all properties (includes deep properties) in T readonly (add readonly decorator)
 * @example
 * ```ts
 * interface Props {
 a: {
 d: number
 };
 b: number;
 c: number;
 };
 // Expect: { readonly a: { readonly d: number }; readonly b: number; readonly c: number; }
 type NewProps = ReadonlyDeep<Props>;
 * ```
 */
// here we use keyof T, which can allow us return a array at the end
export declare type ReadonlyDeep<T> = {
    readonly [P in keyof T]: ReadonlyDeep<T[P]>
}

/**
 * @description Get readonly property keys of T
 * @example
 * ```ts
 * interface Props {
 readonly a?: number
 b: number
 readonly c: number
 }
 // Expect: 'a' | 'c'
 type Keys = ReadonlyKeys<Props>
 * ```
 */
// we need to traverse keyof T but not Keys<T>, otherwise the result of IsEquals will not be as expected
export declare type ReadonlyKeys<T> = {
    // remove undefined key
    [K in keyof T]-?: If<
    IsEquals<{ [P in K]: T[P] }, { -readonly [P in K]: T[P] }>,
    never,
    K
    >
}[Keys<T>]

/**
 * @description Create a type that only has explicitly defined properties, absent of any index signatures.
 * @example
 * ```ts
 *  interface Props {
 a?: number
 readonly b: number
 c: number
 [x: number]: number
 [x: string]: number | undefined
 [x: symbol]: number
 }
 // Expect: { a?: number, readonly b: number, c: number }
 type NewProps = RemoveIndexSignature<Props>
 * ```
 */
export declare type RemoveIndexSignature<T> = {
    [K in keyof T as K extends Keys<T>
    ? {} extends Record<K, never>
    ? never
    : K
    : never]: T[K]
}

export declare type SetEntry<T extends ReadonlySet<unknown>> = T extends ReadonlySet<
infer U
>
? [U, U]
: never

/**
 *
 * @description Make some properties in T mutable (remove readonly decorator)
 * @example
 * ```ts
 * interface Props {
 readonly a: number;
 readonly b: number;
 readonly c: number;
 };
 // Expect: {  a: number; b: number; readonly c: number; }
 type NewProps = setMutable<Props, 'a' | 'b'>;
 * ```
 */
export declare type setMutable<T, K extends Keys<T>> = Simplify<
StrictOmit<T, K> & Mutable<Pick<T, K>>
>

/**
 * 
 * @description Make some properties (includes deep properties) in T readonly (add readonly decorator)
 * @example
 * ```ts
 * interface Props {
 readonly a: {
 b?: number
 readonly c: {
 d: number
 }
 }
 readonly e: number
 }
 // Expect: {
 //   a: {
 //     b?: number | undefined
 //      c: {
 //       d: number
 //     }
 //   }
 //   readonly e: number
 // }
 type NewProps = setMutableDeepPick<Props, 'a' | 'a.c'>
 * ```
 */
export declare type setMutableDeepPick<T, K extends DeepKeys<T>> = IsNever<
Extract<K, Keys<T>>
> extends true
? // for tuple when not match the first level properties
    {
    [P in keyof T]: T[P] extends infer V
    ? V extends V
    ? IsObject<V> extends true
    ? setMutableDeepPick<
    V,
    // distributed condition type
    K extends `${infer Head}.${infer Tail}`
    ? P extends Head
    ? Extract<
    Tail extends Tail
    ? `${P}.${Tail}` extends K
    ? Tail
    : never
    : never,
    DeepKeys<V>
    >
    : never
    : never
    >
    : V
    : never
    : never
}
: Simplify<
    {
    -readonly [P in keyof T as If<
    And<[IsExtends<P, Keys<T>>, IsExtends<P, K>]>,
    P,
    never
    >]: T[P] extends infer V
    ? V extends V
    ? IsObject<V> extends true
    ? setMutableDeepPick<
    V,
    // distributed condition type
    K extends `${infer Head}.${infer Tail}`
    ? P extends Head
    ? Extract<
    Tail extends Tail
    ? `${P}.${Tail}` extends K
    ? Tail
    : never
    : never,
    DeepKeys<V>
    >
    : never
    : never
    >
    : V
    : never
    : never
} & {
    [P in keyof T as If<
    And<[IsExtends<P, Keys<T>>, Not<IsExtends<P, K>>]>,
    P,
    never
    >]: T[P] extends infer V
    ? V extends V
    ? IsObject<V> extends true
    ? setMutableDeepPick<
    V,
    // distributed condition type
    K extends `${infer Head}.${infer Tail}`
    ? P extends Head
    ? Extract<
    Tail extends Tail
    ? `${P}.${Tail}` extends K
    ? Tail
    : never
    : never,
    DeepKeys<V>
    >
    : never
    : never
    >
    : V
    : never
    : never
}
>

/**
 *
 * @description Make some properties in T optional
 * @example
 * ```ts
 * interface Props {
 a: number;
 b: number;
 c: number;
 };
 // Expect: {  a?: number;  b?: number; c: number; }
 type NewProps = SetOptional<Props, 'a' | 'b'>;
 * ```
 */
export declare type SetOptional<T, K extends Keys<T>> = Simplify<
StrictOmit<T, K> & Partial<Pick<T, K>>
>

/**
 * 
 * @description Make some properties (includes deep properties) in T optional
 * @example
 * ```ts
 * interface Props {
 a: {
 b?: number
 readonly c: {
 d: number
 }
 }
 e: number
 }
 // Expect: {
 //    a?: {
 //     b?: number | undefined
 //     readonly c: {
 //        d?: number
 //     }
 //   }
 //    e?: number
 // }
 type NewProps = SetOptionalDeep<Props, 'e' | 'a' | 'a.c.d'>
 * ```
 */
export declare type SetOptionalDeep<T, K extends DeepKeys<T>> = IsNever<
Extract<K, Keys<T>>
> extends true
? // for tuple when not match the first level properties
    {
    [P in keyof T]: T[P] extends infer V
    ? V extends V
    ? IsObject<V> extends true
    ? SetOptionalDeep<
    V,
    // distributed condition type
    K extends `${infer Head}.${infer Tail}`
    ? P extends Head
    ? Extract<
    Tail extends Tail
    ? `${P}.${Tail}` extends K
    ? Tail
    : never
    : never,
    DeepKeys<V>
    >
    : never
    : never
    >
    : V
    : never
    : never
}
: Simplify<
    {
    [P in keyof T as If<
    And<[IsExtends<P, Keys<T>>, IsExtends<P, K>]>,
    P,
    never
    >]?: T[P] extends infer V
    ? V extends V
    ? IsObject<V> extends true
    ? SetOptionalDeep<
    V,
    // distributed condition type
    K extends `${infer Head}.${infer Tail}`
    ? P extends Head
    ? Extract<
    Tail extends Tail
    ? `${P}.${Tail}` extends K
    ? Tail
    : never
    : never,
    DeepKeys<V>
    >
    : never
    : never
    >
    : V
    : never
    : never
} & {
    [P in keyof T as If<
    And<[IsExtends<P, Keys<T>>, Not<IsExtends<P, K>>]>,
    P,
    never
    >]: T[P] extends infer V
    ? V extends V
    ? IsObject<V> extends true
    ? SetOptionalDeep<
    V,
    // distributed condition type
    K extends `${infer Head}.${infer Tail}`
    ? P extends Head
    ? Extract<
    Tail extends Tail
    ? `${P}.${Tail}` extends K
    ? Tail
    : never
    : never,
    DeepKeys<V>
    >
    : never
    : never
    >
    : V
    : never
    : never
}
>

/**
 *
 * @description Make some properties in T readonly (add readonly decorator)
 * @example
 * ```ts
 * interface Props {
 a: number;
 b: number;
 c: number;
 };
 // Expect: { readonly a: number; readonly b:   number; c: number; }
 type NewProps = SetReadonly<Props, 'a' | 'b'>;
 * ```
 */
export declare type SetReadonly<T, K extends Keys<T>> = Simplify<
StrictOmit<T, K> & Readonly<Pick<T, K>>
>

/**
 * 
 * @description Make some properties (includes deep properties) in T readonly (add readonly decorator)
 * @example
 * ```ts
 * interface Props {
 a: {
 b?: number
 readonly c: {
 d: number
 }
 }
 e: number
 }
 // Expect: {
 //   readonly a: {
 //     b?: number | undefined
 //     readonly c: {
 //       readonly d: number
 //     }
 //   }
 //   readonly e: number
 // }
 type NewProps = SetReadonlyDeep<Props, 'e' | 'a' | 'a.c.d'>
 * ```
 */
export declare type SetReadonlyDeep<T, K extends DeepKeys<T>> = IsNever<
Extract<K, Keys<T>>
> extends true
? // for tuple when not match the first level properties
    {
    [P in keyof T]: T[P] extends infer V
    ? V extends V
    ? IsObject<V> extends true
    ? SetReadonlyDeep<
    V,
    // distributed condition type
    K extends `${infer Head}.${infer Tail}`
    ? P extends Head
    ? Extract<
    Tail extends Tail
    ? `${P}.${Tail}` extends K
    ? Tail
    : never
    : never,
    DeepKeys<V>
    >
    : never
    : never
    >
    : V
    : never
    : never
}
: Simplify<
    {
    readonly [P in keyof T as If<
    And<[IsExtends<P, Keys<T>>, IsExtends<P, K>]>,
    P,
    never
    >]: T[P] extends infer V
    ? V extends V
    ? IsObject<V> extends true
    ? SetReadonlyDeep<
    V,
    // distributed condition type
    K extends `${infer Head}.${infer Tail}`
    ? P extends Head
    ? Extract<
    Tail extends Tail
    ? `${P}.${Tail}` extends K
    ? Tail
    : never
    : never,
    DeepKeys<V>
    >
    : never
    : never
    >
    : V
    : never
    : never
} & {
    [P in keyof T as If<
    And<[IsExtends<P, Keys<T>>, Not<IsExtends<P, K>>]>,
    P,
    never
    >]: T[P] extends infer V
    ? V extends V
    ? IsObject<V> extends true
    ? SetReadonlyDeep<
    V,
    // distributed condition type
    K extends `${infer Head}.${infer Tail}`
    ? P extends Head
    ? Extract<
    Tail extends Tail
    ? `${P}.${Tail}` extends K
    ? Tail
    : never
    : never,
    DeepKeys<V>
    >
    : never
    : never
    >
    : V
    : never
    : never
}
>

/**
 *
 * @description Flatten the type output to improve type hints shown in editors
 * @example
 * ```ts
 * type Props = { a: 1, b: 2, c: 3 } & { d: 4 }
 * // Expect: { a: 1, b: 2, c: 3, d: 4 }
 * type SimplifiedProps = Simplify<Props>
 * ```
 */
export declare type Simplify<T> = {
    [K in keyof T]: T[K]
}

export declare type Slice<
T extends readonly unknown[],
Start extends number = 0,
End extends number = T['length']
> = T extends T ? Iterate<Start, End, [], T, [], false> : never

/**
 *
 * @description Strict version of Exclude
 * @example
 * ```ts
 * type Foo = 'a' | 'b' | 'c'
 * // Expect: 'b' | 'c'
 * type Bar = StrictExclude<Foo, 'a'>
 * ```
 */
export declare type StrictExclude<T, U extends T> = Exclude<T, U>

/**
 *
 * @description Strict version of Omit
 * @example
 * ```ts
 * interface Props = { a: 1, b: 2, c: 3 }
 * // Expect: { b: 2, c: 3  }
 * type PropValue = StrictOmit<Props, 'a'>
 * ```
 */
export declare type StrictOmit<T, K extends Keys<T>> = {
    [P in keyof T as P extends StrictExclude<
    Keys<T>,
    OtherToString<K> extends infer V
    ? [V] extends [Keys<T>]
    ? V
    : never
    : never
    >
    ? P
    : never]: T[P]
}

export declare type Switch<
T,
A extends ArrayAndReadonlyArrayByPassArray<
// if/else if/else
[...Cases: [Case: any, Result: any][], DefaultResult: any]
>,
Type extends EqualTag | ExtendsTag = ExtendsTag
> = A extends ArrayAndReadonlyArrayByPassArray<
[...infer CaseExpressions, infer DefaultResult]
>
? If<
IsTuple<CaseExpressions>,
CaseExpressions extends [
[infer CurrentCase, infer CurrentResult],
...infer OtherCases
]
? IfExtends<
[Type, EqualTag],
If<
IsEquals<T, CurrentCase>,
CurrentResult,
OtherCases extends [Case: any, Result: any][]
? Switch<T, [...OtherCases, DefaultResult]>
: DefaultResult
>,
If<
IsExtends<T, CurrentCase>,
CurrentResult,
OtherCases extends [Case: any, Result: any][]
? Switch<T, [...OtherCases, DefaultResult]>
: DefaultResult
>
>
: DefaultResult,
// empty array or array
CaseExpressions extends [infer Case, infer Result][]
? If<
IsEmptyTypeArray<CaseExpressions>,
DefaultResult,
// will not filter empty arrays, it will return unknown
IfExtends<
[Type, EqualTag],
If<IsEquals<T, Case>, Result, DefaultResult>,
If<IsExtends<T, Case>, Result, DefaultResult>
>
>
: DefaultResult
>
: never

export declare type Tuple<T = any, R = T> = ArrayAndReadonlyArrayByPassArray<
[T, ...R[]] | [...R[], T]
>

/**
 * @description Get keys of tuple T
 * @example
 * ```ts
 * // Expect: 0 | 1 | '0' | '1'
 * type Keys = TupleKeys<[3, 4]>
 * ```
 */
export declare type TupleKeys<T extends readonly unknown[]> = T extends readonly [
any,
...infer Tail
]
? TupleKeys<Tail> | Tail['length'] | `${Tail['length']}`
: never

/**
 * @description Convert a tuple to an object, it can pass in a tag to modify the key value
 * @example
 * ```ts
 * // Expect: { a: 'a'; b: 'b' }
 * type Foo = TupleToObject<['a', 'b']>
 * // Expect: { A: 'a'; B: 'b' }
 * type Bar = TupleToObject<['a', 'b'], 'Uppercase'>
 * ```
 */
export declare type TupleToObject<
T,
N extends
| 'Uppercase'
| 'Lowercase'
| 'Capitalize'
| 'Uncapitalize'
| 'default' = 'default'
> = T extends readonly any[]
? {
    [P in T[number] as Switch<
    N,
    [
    ['Uppercase', Uppercase<P>],
    ['Lowercase', Lowercase<P>],
    ['Capitalize', Capitalize<P>],
    ['Uncapitalize', Uncapitalize<P>],
    P
    ]
    >]: P
}
: never

/**
 * @description Convert a tuple to union type
 * @example
 * ```ts
 * // Expect: string | number
 * type Foo = TupleToUnion<[string, number]>
 * ```
 */
export declare type TupleToUnion<T> = T extends readonly unknown[] ? T[number] : never

/**
 * @description Convert union type to Intersection type
 * @example
 * ```ts
 * // Expect: { a: number } & { b: number }
 * type Props = UnionToIntersection<{ a: number } | { b: number }>
 * ```
 */
export declare type UnionToIntersection<U> = (
U extends any ? (k: U) => void : never
) extends (k: infer I) => void
? I
: never

/**
 * @see https://github.com/type-challenges/type-challenges/issues/737
 * @description Convert union type to a tuple
 * @example
 * ```ts
 * // Expect: ['3', '1', '2']
 * type Foo = UnionToTuple<'3' | '1' | '2'>
 * ```
 */
export declare type UnionToTuple<U> = [U] extends [never] // no type
? []
: [...UnionToTuple<Exclude<U, LastInUnion<U>>>, LastInUnion<U>]

/**
 *
 * @description Get values of T
 * @example
 * ```ts
 *  interface Props {
 *    a?: number
 *    b: string
 *    c: boolean
 *  }
 *
 *  // Expect: number | string | boolean | undefined
 *  type PropValues = ValueOf<Props>
 * ```
 */
export declare type ValueOf<T> = T[Keys<T>]

export { }
