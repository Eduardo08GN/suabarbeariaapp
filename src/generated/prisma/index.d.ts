
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Tenant
 * 
 */
export type Tenant = $Result.DefaultSelection<Prisma.$TenantPayload>
/**
 * Model Unit
 * 
 */
export type Unit = $Result.DefaultSelection<Prisma.$UnitPayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model Barber
 * 
 */
export type Barber = $Result.DefaultSelection<Prisma.$BarberPayload>
/**
 * Model BarberUnit
 * 
 */
export type BarberUnit = $Result.DefaultSelection<Prisma.$BarberUnitPayload>
/**
 * Model BarberBlock
 * 
 */
export type BarberBlock = $Result.DefaultSelection<Prisma.$BarberBlockPayload>
/**
 * Model Client
 * 
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model Booking
 * 
 */
export type Booking = $Result.DefaultSelection<Prisma.$BookingPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  MASTER: 'MASTER',
  TENANT: 'TENANT'
};

export type Role = (typeof Role)[keyof typeof Role]


export const TenantStatus: {
  ONBOARDING: 'ONBOARDING',
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  CANCELLED: 'CANCELLED'
};

export type TenantStatus = (typeof TenantStatus)[keyof typeof TenantStatus]


export const ServiceCategory: {
  HAIR: 'HAIR',
  BEARD: 'BEARD',
  CHEMISTRY: 'CHEMISTRY',
  AESTHETICS: 'AESTHETICS',
  COMBO: 'COMBO',
  TREATMENT: 'TREATMENT'
};

export type ServiceCategory = (typeof ServiceCategory)[keyof typeof ServiceCategory]


export const BookingStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED_CLIENT: 'CANCELLED_CLIENT',
  CANCELLED_BARBER: 'CANCELLED_BARBER',
  NO_SHOW: 'NO_SHOW'
};

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]


export const BookingOrigin: {
  APP: 'APP',
  WHATSAPP: 'WHATSAPP',
  WALK_IN: 'WALK_IN',
  PHONE: 'PHONE',
  INSTAGRAM: 'INSTAGRAM'
};

export type BookingOrigin = (typeof BookingOrigin)[keyof typeof BookingOrigin]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type TenantStatus = $Enums.TenantStatus

export const TenantStatus: typeof $Enums.TenantStatus

export type ServiceCategory = $Enums.ServiceCategory

export const ServiceCategory: typeof $Enums.ServiceCategory

export type BookingStatus = $Enums.BookingStatus

export const BookingStatus: typeof $Enums.BookingStatus

export type BookingOrigin = $Enums.BookingOrigin

export const BookingOrigin: typeof $Enums.BookingOrigin

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tenant`: Exposes CRUD operations for the **Tenant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tenants
    * const tenants = await prisma.tenant.findMany()
    * ```
    */
  get tenant(): Prisma.TenantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.unit`: Exposes CRUD operations for the **Unit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Units
    * const units = await prisma.unit.findMany()
    * ```
    */
  get unit(): Prisma.UnitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.barber`: Exposes CRUD operations for the **Barber** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Barbers
    * const barbers = await prisma.barber.findMany()
    * ```
    */
  get barber(): Prisma.BarberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.barberUnit`: Exposes CRUD operations for the **BarberUnit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BarberUnits
    * const barberUnits = await prisma.barberUnit.findMany()
    * ```
    */
  get barberUnit(): Prisma.BarberUnitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.barberBlock`: Exposes CRUD operations for the **BarberBlock** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BarberBlocks
    * const barberBlocks = await prisma.barberBlock.findMany()
    * ```
    */
  get barberBlock(): Prisma.BarberBlockDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.booking.findMany()
    * ```
    */
  get booking(): Prisma.BookingDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Tenant: 'Tenant',
    Unit: 'Unit',
    Service: 'Service',
    Barber: 'Barber',
    BarberUnit: 'BarberUnit',
    BarberBlock: 'BarberBlock',
    Client: 'Client',
    Booking: 'Booking'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "tenant" | "unit" | "service" | "barber" | "barberUnit" | "barberBlock" | "client" | "booking"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Tenant: {
        payload: Prisma.$TenantPayload<ExtArgs>
        fields: Prisma.TenantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findFirst: {
            args: Prisma.TenantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findMany: {
            args: Prisma.TenantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          create: {
            args: Prisma.TenantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          createMany: {
            args: Prisma.TenantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          delete: {
            args: Prisma.TenantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          update: {
            args: Prisma.TenantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          deleteMany: {
            args: Prisma.TenantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TenantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          upsert: {
            args: Prisma.TenantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          aggregate: {
            args: Prisma.TenantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenant>
          }
          groupBy: {
            args: Prisma.TenantGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantCountArgs<ExtArgs>
            result: $Utils.Optional<TenantCountAggregateOutputType> | number
          }
        }
      }
      Unit: {
        payload: Prisma.$UnitPayload<ExtArgs>
        fields: Prisma.UnitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UnitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UnitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          findFirst: {
            args: Prisma.UnitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UnitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          findMany: {
            args: Prisma.UnitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>[]
          }
          create: {
            args: Prisma.UnitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          createMany: {
            args: Prisma.UnitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UnitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>[]
          }
          delete: {
            args: Prisma.UnitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          update: {
            args: Prisma.UnitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          deleteMany: {
            args: Prisma.UnitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UnitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UnitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>[]
          }
          upsert: {
            args: Prisma.UnitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitPayload>
          }
          aggregate: {
            args: Prisma.UnitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUnit>
          }
          groupBy: {
            args: Prisma.UnitGroupByArgs<ExtArgs>
            result: $Utils.Optional<UnitGroupByOutputType>[]
          }
          count: {
            args: Prisma.UnitCountArgs<ExtArgs>
            result: $Utils.Optional<UnitCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      Barber: {
        payload: Prisma.$BarberPayload<ExtArgs>
        fields: Prisma.BarberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BarberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BarberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberPayload>
          }
          findFirst: {
            args: Prisma.BarberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BarberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberPayload>
          }
          findMany: {
            args: Prisma.BarberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberPayload>[]
          }
          create: {
            args: Prisma.BarberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberPayload>
          }
          createMany: {
            args: Prisma.BarberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BarberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberPayload>[]
          }
          delete: {
            args: Prisma.BarberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberPayload>
          }
          update: {
            args: Prisma.BarberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberPayload>
          }
          deleteMany: {
            args: Prisma.BarberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BarberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BarberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberPayload>[]
          }
          upsert: {
            args: Prisma.BarberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberPayload>
          }
          aggregate: {
            args: Prisma.BarberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBarber>
          }
          groupBy: {
            args: Prisma.BarberGroupByArgs<ExtArgs>
            result: $Utils.Optional<BarberGroupByOutputType>[]
          }
          count: {
            args: Prisma.BarberCountArgs<ExtArgs>
            result: $Utils.Optional<BarberCountAggregateOutputType> | number
          }
        }
      }
      BarberUnit: {
        payload: Prisma.$BarberUnitPayload<ExtArgs>
        fields: Prisma.BarberUnitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BarberUnitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberUnitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BarberUnitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberUnitPayload>
          }
          findFirst: {
            args: Prisma.BarberUnitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberUnitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BarberUnitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberUnitPayload>
          }
          findMany: {
            args: Prisma.BarberUnitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberUnitPayload>[]
          }
          create: {
            args: Prisma.BarberUnitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberUnitPayload>
          }
          createMany: {
            args: Prisma.BarberUnitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BarberUnitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberUnitPayload>[]
          }
          delete: {
            args: Prisma.BarberUnitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberUnitPayload>
          }
          update: {
            args: Prisma.BarberUnitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberUnitPayload>
          }
          deleteMany: {
            args: Prisma.BarberUnitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BarberUnitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BarberUnitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberUnitPayload>[]
          }
          upsert: {
            args: Prisma.BarberUnitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberUnitPayload>
          }
          aggregate: {
            args: Prisma.BarberUnitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBarberUnit>
          }
          groupBy: {
            args: Prisma.BarberUnitGroupByArgs<ExtArgs>
            result: $Utils.Optional<BarberUnitGroupByOutputType>[]
          }
          count: {
            args: Prisma.BarberUnitCountArgs<ExtArgs>
            result: $Utils.Optional<BarberUnitCountAggregateOutputType> | number
          }
        }
      }
      BarberBlock: {
        payload: Prisma.$BarberBlockPayload<ExtArgs>
        fields: Prisma.BarberBlockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BarberBlockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberBlockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BarberBlockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberBlockPayload>
          }
          findFirst: {
            args: Prisma.BarberBlockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberBlockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BarberBlockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberBlockPayload>
          }
          findMany: {
            args: Prisma.BarberBlockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberBlockPayload>[]
          }
          create: {
            args: Prisma.BarberBlockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberBlockPayload>
          }
          createMany: {
            args: Prisma.BarberBlockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BarberBlockCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberBlockPayload>[]
          }
          delete: {
            args: Prisma.BarberBlockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberBlockPayload>
          }
          update: {
            args: Prisma.BarberBlockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberBlockPayload>
          }
          deleteMany: {
            args: Prisma.BarberBlockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BarberBlockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BarberBlockUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberBlockPayload>[]
          }
          upsert: {
            args: Prisma.BarberBlockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BarberBlockPayload>
          }
          aggregate: {
            args: Prisma.BarberBlockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBarberBlock>
          }
          groupBy: {
            args: Prisma.BarberBlockGroupByArgs<ExtArgs>
            result: $Utils.Optional<BarberBlockGroupByOutputType>[]
          }
          count: {
            args: Prisma.BarberBlockCountArgs<ExtArgs>
            result: $Utils.Optional<BarberBlockCountAggregateOutputType> | number
          }
        }
      }
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>
        fields: Prisma.ClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      Booking: {
        payload: Prisma.$BookingPayload<ExtArgs>
        fields: Prisma.BookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findFirst: {
            args: Prisma.BookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findMany: {
            args: Prisma.BookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          create: {
            args: Prisma.BookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          createMany: {
            args: Prisma.BookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          delete: {
            args: Prisma.BookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          update: {
            args: Prisma.BookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          deleteMany: {
            args: Prisma.BookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          upsert: {
            args: Prisma.BookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          aggregate: {
            args: Prisma.BookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBooking>
          }
          groupBy: {
            args: Prisma.BookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingCountArgs<ExtArgs>
            result: $Utils.Optional<BookingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    tenant?: TenantOmit
    unit?: UnitOmit
    service?: ServiceOmit
    barber?: BarberOmit
    barberUnit?: BarberUnitOmit
    barberBlock?: BarberBlockOmit
    client?: ClientOmit
    booking?: BookingOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TenantCountOutputType
   */

  export type TenantCountOutputType = {
    users: number
    services: number
    barbers: number
    bookings: number
    clients: number
    units: number
  }

  export type TenantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | TenantCountOutputTypeCountUsersArgs
    services?: boolean | TenantCountOutputTypeCountServicesArgs
    barbers?: boolean | TenantCountOutputTypeCountBarbersArgs
    bookings?: boolean | TenantCountOutputTypeCountBookingsArgs
    clients?: boolean | TenantCountOutputTypeCountClientsArgs
    units?: boolean | TenantCountOutputTypeCountUnitsArgs
  }

  // Custom InputTypes
  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantCountOutputType
     */
    select?: TenantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountBarbersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BarberWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountClientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountUnitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UnitWhereInput
  }


  /**
   * Count Type UnitCountOutputType
   */

  export type UnitCountOutputType = {
    barberUnits: number
    bookings: number
  }

  export type UnitCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barberUnits?: boolean | UnitCountOutputTypeCountBarberUnitsArgs
    bookings?: boolean | UnitCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes
  /**
   * UnitCountOutputType without action
   */
  export type UnitCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitCountOutputType
     */
    select?: UnitCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UnitCountOutputType without action
   */
  export type UnitCountOutputTypeCountBarberUnitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BarberUnitWhereInput
  }

  /**
   * UnitCountOutputType without action
   */
  export type UnitCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }


  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    bookings: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | ServiceCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes
  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     */
    select?: ServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }


  /**
   * Count Type BarberCountOutputType
   */

  export type BarberCountOutputType = {
    units: number
    bookings: number
    blocks: number
  }

  export type BarberCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    units?: boolean | BarberCountOutputTypeCountUnitsArgs
    bookings?: boolean | BarberCountOutputTypeCountBookingsArgs
    blocks?: boolean | BarberCountOutputTypeCountBlocksArgs
  }

  // Custom InputTypes
  /**
   * BarberCountOutputType without action
   */
  export type BarberCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberCountOutputType
     */
    select?: BarberCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BarberCountOutputType without action
   */
  export type BarberCountOutputTypeCountUnitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BarberUnitWhereInput
  }

  /**
   * BarberCountOutputType without action
   */
  export type BarberCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }

  /**
   * BarberCountOutputType without action
   */
  export type BarberCountOutputTypeCountBlocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BarberBlockWhereInput
  }


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    bookings: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | ClientCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    role: $Enums.Role | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    role: $Enums.Role | null
    tenantId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    role: number
    tenantId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    tenantId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    password: string
    role: $Enums.Role
    tenantId: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | User$tenantArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | User$tenantArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | User$tenantArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    tenantId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "role" | "tenantId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | User$tenantArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | User$tenantArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | User$tenantArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      password: string
      role: $Enums.Role
      tenantId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends User$tenantArgs<ExtArgs> = {}>(args?: Subset<T, User$tenantArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly tenantId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.tenant
   */
  export type User$tenantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    where?: TenantWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Tenant
   */

  export type AggregateTenant = {
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  export type TenantMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    phone: string | null
    email: string | null
    logo: string | null
    colorPrimary: string | null
    colorAccent: string | null
    status: $Enums.TenantStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    phone: string | null
    email: string | null
    logo: string | null
    colorPrimary: string | null
    colorAccent: string | null
    status: $Enums.TenantStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    phone: number
    email: number
    address: number
    logo: number
    colorPrimary: number
    colorAccent: number
    openingHours: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TenantMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    phone?: true
    email?: true
    logo?: true
    colorPrimary?: true
    colorAccent?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    phone?: true
    email?: true
    logo?: true
    colorPrimary?: true
    colorAccent?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    phone?: true
    email?: true
    address?: true
    logo?: true
    colorPrimary?: true
    colorAccent?: true
    openingHours?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TenantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenant to aggregate.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tenants
    **/
    _count?: true | TenantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantMaxAggregateInputType
  }

  export type GetTenantAggregateType<T extends TenantAggregateArgs> = {
        [P in keyof T & keyof AggregateTenant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenant[P]>
      : GetScalarType<T[P], AggregateTenant[P]>
  }




  export type TenantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantWhereInput
    orderBy?: TenantOrderByWithAggregationInput | TenantOrderByWithAggregationInput[]
    by: TenantScalarFieldEnum[] | TenantScalarFieldEnum
    having?: TenantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantCountAggregateInputType | true
    _min?: TenantMinAggregateInputType
    _max?: TenantMaxAggregateInputType
  }

  export type TenantGroupByOutputType = {
    id: string
    name: string
    slug: string
    phone: string | null
    email: string | null
    address: JsonValue | null
    logo: string | null
    colorPrimary: string
    colorAccent: string
    openingHours: JsonValue | null
    status: $Enums.TenantStatus
    createdAt: Date
    updatedAt: Date
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  type GetTenantGroupByPayload<T extends TenantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantGroupByOutputType[P]>
            : GetScalarType<T[P], TenantGroupByOutputType[P]>
        }
      >
    >


  export type TenantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    logo?: boolean
    colorPrimary?: boolean
    colorAccent?: boolean
    openingHours?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Tenant$usersArgs<ExtArgs>
    services?: boolean | Tenant$servicesArgs<ExtArgs>
    barbers?: boolean | Tenant$barbersArgs<ExtArgs>
    bookings?: boolean | Tenant$bookingsArgs<ExtArgs>
    clients?: boolean | Tenant$clientsArgs<ExtArgs>
    units?: boolean | Tenant$unitsArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    logo?: boolean
    colorPrimary?: boolean
    colorAccent?: boolean
    openingHours?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    logo?: boolean
    colorPrimary?: boolean
    colorAccent?: boolean
    openingHours?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    logo?: boolean
    colorPrimary?: boolean
    colorAccent?: boolean
    openingHours?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TenantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "phone" | "email" | "address" | "logo" | "colorPrimary" | "colorAccent" | "openingHours" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["tenant"]>
  export type TenantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Tenant$usersArgs<ExtArgs>
    services?: boolean | Tenant$servicesArgs<ExtArgs>
    barbers?: boolean | Tenant$barbersArgs<ExtArgs>
    bookings?: boolean | Tenant$bookingsArgs<ExtArgs>
    clients?: boolean | Tenant$clientsArgs<ExtArgs>
    units?: boolean | Tenant$unitsArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TenantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TenantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TenantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tenant"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      services: Prisma.$ServicePayload<ExtArgs>[]
      barbers: Prisma.$BarberPayload<ExtArgs>[]
      bookings: Prisma.$BookingPayload<ExtArgs>[]
      clients: Prisma.$ClientPayload<ExtArgs>[]
      units: Prisma.$UnitPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      phone: string | null
      email: string | null
      address: Prisma.JsonValue | null
      logo: string | null
      colorPrimary: string
      colorAccent: string
      openingHours: Prisma.JsonValue | null
      status: $Enums.TenantStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tenant"]>
    composites: {}
  }

  type TenantGetPayload<S extends boolean | null | undefined | TenantDefaultArgs> = $Result.GetResult<Prisma.$TenantPayload, S>

  type TenantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TenantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TenantCountAggregateInputType | true
    }

  export interface TenantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tenant'], meta: { name: 'Tenant' } }
    /**
     * Find zero or one Tenant that matches the filter.
     * @param {TenantFindUniqueArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantFindUniqueArgs>(args: SelectSubset<T, TenantFindUniqueArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tenant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TenantFindUniqueOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantFindFirstArgs>(args?: SelectSubset<T, TenantFindFirstArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tenants
     * const tenants = await prisma.tenant.findMany()
     * 
     * // Get first 10 Tenants
     * const tenants = await prisma.tenant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantWithIdOnly = await prisma.tenant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantFindManyArgs>(args?: SelectSubset<T, TenantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tenant.
     * @param {TenantCreateArgs} args - Arguments to create a Tenant.
     * @example
     * // Create one Tenant
     * const Tenant = await prisma.tenant.create({
     *   data: {
     *     // ... data to create a Tenant
     *   }
     * })
     * 
     */
    create<T extends TenantCreateArgs>(args: SelectSubset<T, TenantCreateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tenants.
     * @param {TenantCreateManyArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantCreateManyArgs>(args?: SelectSubset<T, TenantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tenants and returns the data saved in the database.
     * @param {TenantCreateManyAndReturnArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tenant.
     * @param {TenantDeleteArgs} args - Arguments to delete one Tenant.
     * @example
     * // Delete one Tenant
     * const Tenant = await prisma.tenant.delete({
     *   where: {
     *     // ... filter to delete one Tenant
     *   }
     * })
     * 
     */
    delete<T extends TenantDeleteArgs>(args: SelectSubset<T, TenantDeleteArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tenant.
     * @param {TenantUpdateArgs} args - Arguments to update one Tenant.
     * @example
     * // Update one Tenant
     * const tenant = await prisma.tenant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantUpdateArgs>(args: SelectSubset<T, TenantUpdateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tenants.
     * @param {TenantDeleteManyArgs} args - Arguments to filter Tenants to delete.
     * @example
     * // Delete a few Tenants
     * const { count } = await prisma.tenant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantDeleteManyArgs>(args?: SelectSubset<T, TenantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantUpdateManyArgs>(args: SelectSubset<T, TenantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants and returns the data updated in the database.
     * @param {TenantUpdateManyAndReturnArgs} args - Arguments to update many Tenants.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TenantUpdateManyAndReturnArgs>(args: SelectSubset<T, TenantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tenant.
     * @param {TenantUpsertArgs} args - Arguments to update or create a Tenant.
     * @example
     * // Update or create a Tenant
     * const tenant = await prisma.tenant.upsert({
     *   create: {
     *     // ... data to create a Tenant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tenant we want to update
     *   }
     * })
     */
    upsert<T extends TenantUpsertArgs>(args: SelectSubset<T, TenantUpsertArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantCountArgs} args - Arguments to filter Tenants to count.
     * @example
     * // Count the number of Tenants
     * const count = await prisma.tenant.count({
     *   where: {
     *     // ... the filter for the Tenants we want to count
     *   }
     * })
    **/
    count<T extends TenantCountArgs>(
      args?: Subset<T, TenantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantAggregateArgs>(args: Subset<T, TenantAggregateArgs>): Prisma.PrismaPromise<GetTenantAggregateType<T>>

    /**
     * Group by Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TenantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantGroupByArgs['orderBy'] }
        : { orderBy?: TenantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TenantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tenant model
   */
  readonly fields: TenantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tenant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Tenant$usersArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    services<T extends Tenant$servicesArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    barbers<T extends Tenant$barbersArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$barbersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookings<T extends Tenant$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    clients<T extends Tenant$clientsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$clientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    units<T extends Tenant$unitsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$unitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tenant model
   */
  interface TenantFieldRefs {
    readonly id: FieldRef<"Tenant", 'String'>
    readonly name: FieldRef<"Tenant", 'String'>
    readonly slug: FieldRef<"Tenant", 'String'>
    readonly phone: FieldRef<"Tenant", 'String'>
    readonly email: FieldRef<"Tenant", 'String'>
    readonly address: FieldRef<"Tenant", 'Json'>
    readonly logo: FieldRef<"Tenant", 'String'>
    readonly colorPrimary: FieldRef<"Tenant", 'String'>
    readonly colorAccent: FieldRef<"Tenant", 'String'>
    readonly openingHours: FieldRef<"Tenant", 'Json'>
    readonly status: FieldRef<"Tenant", 'TenantStatus'>
    readonly createdAt: FieldRef<"Tenant", 'DateTime'>
    readonly updatedAt: FieldRef<"Tenant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tenant findUnique
   */
  export type TenantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findUniqueOrThrow
   */
  export type TenantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findFirst
   */
  export type TenantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findFirstOrThrow
   */
  export type TenantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findMany
   */
  export type TenantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenants to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant create
   */
  export type TenantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to create a Tenant.
     */
    data: XOR<TenantCreateInput, TenantUncheckedCreateInput>
  }

  /**
   * Tenant createMany
   */
  export type TenantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant createManyAndReturn
   */
  export type TenantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant update
   */
  export type TenantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to update a Tenant.
     */
    data: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
    /**
     * Choose, which Tenant to update.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant updateMany
   */
  export type TenantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to update.
     */
    limit?: number
  }

  /**
   * Tenant updateManyAndReturn
   */
  export type TenantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to update.
     */
    limit?: number
  }

  /**
   * Tenant upsert
   */
  export type TenantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The filter to search for the Tenant to update in case it exists.
     */
    where: TenantWhereUniqueInput
    /**
     * In case the Tenant found by the `where` argument doesn't exist, create a new Tenant with this data.
     */
    create: XOR<TenantCreateInput, TenantUncheckedCreateInput>
    /**
     * In case the Tenant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
  }

  /**
   * Tenant delete
   */
  export type TenantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter which Tenant to delete.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant deleteMany
   */
  export type TenantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenants to delete
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to delete.
     */
    limit?: number
  }

  /**
   * Tenant.users
   */
  export type Tenant$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Tenant.services
   */
  export type Tenant$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Tenant.barbers
   */
  export type Tenant$barbersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barber
     */
    select?: BarberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barber
     */
    omit?: BarberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberInclude<ExtArgs> | null
    where?: BarberWhereInput
    orderBy?: BarberOrderByWithRelationInput | BarberOrderByWithRelationInput[]
    cursor?: BarberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BarberScalarFieldEnum | BarberScalarFieldEnum[]
  }

  /**
   * Tenant.bookings
   */
  export type Tenant$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Tenant.clients
   */
  export type Tenant$clientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    cursor?: ClientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Tenant.units
   */
  export type Tenant$unitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    where?: UnitWhereInput
    orderBy?: UnitOrderByWithRelationInput | UnitOrderByWithRelationInput[]
    cursor?: UnitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UnitScalarFieldEnum | UnitScalarFieldEnum[]
  }

  /**
   * Tenant without action
   */
  export type TenantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
  }


  /**
   * Model Unit
   */

  export type AggregateUnit = {
    _count: UnitCountAggregateOutputType | null
    _min: UnitMinAggregateOutputType | null
    _max: UnitMaxAggregateOutputType | null
  }

  export type UnitMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    slug: string | null
    phone: string | null
    active: boolean | null
  }

  export type UnitMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    slug: string | null
    phone: string | null
    active: boolean | null
  }

  export type UnitCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    slug: number
    address: number
    phone: number
    active: number
    _all: number
  }


  export type UnitMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    slug?: true
    phone?: true
    active?: true
  }

  export type UnitMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    slug?: true
    phone?: true
    active?: true
  }

  export type UnitCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    slug?: true
    address?: true
    phone?: true
    active?: true
    _all?: true
  }

  export type UnitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Unit to aggregate.
     */
    where?: UnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Units to fetch.
     */
    orderBy?: UnitOrderByWithRelationInput | UnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Units from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Units.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Units
    **/
    _count?: true | UnitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UnitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UnitMaxAggregateInputType
  }

  export type GetUnitAggregateType<T extends UnitAggregateArgs> = {
        [P in keyof T & keyof AggregateUnit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUnit[P]>
      : GetScalarType<T[P], AggregateUnit[P]>
  }




  export type UnitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UnitWhereInput
    orderBy?: UnitOrderByWithAggregationInput | UnitOrderByWithAggregationInput[]
    by: UnitScalarFieldEnum[] | UnitScalarFieldEnum
    having?: UnitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UnitCountAggregateInputType | true
    _min?: UnitMinAggregateInputType
    _max?: UnitMaxAggregateInputType
  }

  export type UnitGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    slug: string
    address: JsonValue | null
    phone: string | null
    active: boolean
    _count: UnitCountAggregateOutputType | null
    _min: UnitMinAggregateOutputType | null
    _max: UnitMaxAggregateOutputType | null
  }

  type GetUnitGroupByPayload<T extends UnitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UnitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UnitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UnitGroupByOutputType[P]>
            : GetScalarType<T[P], UnitGroupByOutputType[P]>
        }
      >
    >


  export type UnitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    slug?: boolean
    address?: boolean
    phone?: boolean
    active?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    barberUnits?: boolean | Unit$barberUnitsArgs<ExtArgs>
    bookings?: boolean | Unit$bookingsArgs<ExtArgs>
    _count?: boolean | UnitCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["unit"]>

  export type UnitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    slug?: boolean
    address?: boolean
    phone?: boolean
    active?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["unit"]>

  export type UnitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    slug?: boolean
    address?: boolean
    phone?: boolean
    active?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["unit"]>

  export type UnitSelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    slug?: boolean
    address?: boolean
    phone?: boolean
    active?: boolean
  }

  export type UnitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "slug" | "address" | "phone" | "active", ExtArgs["result"]["unit"]>
  export type UnitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    barberUnits?: boolean | Unit$barberUnitsArgs<ExtArgs>
    bookings?: boolean | Unit$bookingsArgs<ExtArgs>
    _count?: boolean | UnitCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UnitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type UnitIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $UnitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Unit"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      barberUnits: Prisma.$BarberUnitPayload<ExtArgs>[]
      bookings: Prisma.$BookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      slug: string
      address: Prisma.JsonValue | null
      phone: string | null
      active: boolean
    }, ExtArgs["result"]["unit"]>
    composites: {}
  }

  type UnitGetPayload<S extends boolean | null | undefined | UnitDefaultArgs> = $Result.GetResult<Prisma.$UnitPayload, S>

  type UnitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UnitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UnitCountAggregateInputType | true
    }

  export interface UnitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Unit'], meta: { name: 'Unit' } }
    /**
     * Find zero or one Unit that matches the filter.
     * @param {UnitFindUniqueArgs} args - Arguments to find a Unit
     * @example
     * // Get one Unit
     * const unit = await prisma.unit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UnitFindUniqueArgs>(args: SelectSubset<T, UnitFindUniqueArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Unit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UnitFindUniqueOrThrowArgs} args - Arguments to find a Unit
     * @example
     * // Get one Unit
     * const unit = await prisma.unit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UnitFindUniqueOrThrowArgs>(args: SelectSubset<T, UnitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Unit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitFindFirstArgs} args - Arguments to find a Unit
     * @example
     * // Get one Unit
     * const unit = await prisma.unit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UnitFindFirstArgs>(args?: SelectSubset<T, UnitFindFirstArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Unit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitFindFirstOrThrowArgs} args - Arguments to find a Unit
     * @example
     * // Get one Unit
     * const unit = await prisma.unit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UnitFindFirstOrThrowArgs>(args?: SelectSubset<T, UnitFindFirstOrThrowArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Units that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Units
     * const units = await prisma.unit.findMany()
     * 
     * // Get first 10 Units
     * const units = await prisma.unit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const unitWithIdOnly = await prisma.unit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UnitFindManyArgs>(args?: SelectSubset<T, UnitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Unit.
     * @param {UnitCreateArgs} args - Arguments to create a Unit.
     * @example
     * // Create one Unit
     * const Unit = await prisma.unit.create({
     *   data: {
     *     // ... data to create a Unit
     *   }
     * })
     * 
     */
    create<T extends UnitCreateArgs>(args: SelectSubset<T, UnitCreateArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Units.
     * @param {UnitCreateManyArgs} args - Arguments to create many Units.
     * @example
     * // Create many Units
     * const unit = await prisma.unit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UnitCreateManyArgs>(args?: SelectSubset<T, UnitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Units and returns the data saved in the database.
     * @param {UnitCreateManyAndReturnArgs} args - Arguments to create many Units.
     * @example
     * // Create many Units
     * const unit = await prisma.unit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Units and only return the `id`
     * const unitWithIdOnly = await prisma.unit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UnitCreateManyAndReturnArgs>(args?: SelectSubset<T, UnitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Unit.
     * @param {UnitDeleteArgs} args - Arguments to delete one Unit.
     * @example
     * // Delete one Unit
     * const Unit = await prisma.unit.delete({
     *   where: {
     *     // ... filter to delete one Unit
     *   }
     * })
     * 
     */
    delete<T extends UnitDeleteArgs>(args: SelectSubset<T, UnitDeleteArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Unit.
     * @param {UnitUpdateArgs} args - Arguments to update one Unit.
     * @example
     * // Update one Unit
     * const unit = await prisma.unit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UnitUpdateArgs>(args: SelectSubset<T, UnitUpdateArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Units.
     * @param {UnitDeleteManyArgs} args - Arguments to filter Units to delete.
     * @example
     * // Delete a few Units
     * const { count } = await prisma.unit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UnitDeleteManyArgs>(args?: SelectSubset<T, UnitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Units.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Units
     * const unit = await prisma.unit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UnitUpdateManyArgs>(args: SelectSubset<T, UnitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Units and returns the data updated in the database.
     * @param {UnitUpdateManyAndReturnArgs} args - Arguments to update many Units.
     * @example
     * // Update many Units
     * const unit = await prisma.unit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Units and only return the `id`
     * const unitWithIdOnly = await prisma.unit.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UnitUpdateManyAndReturnArgs>(args: SelectSubset<T, UnitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Unit.
     * @param {UnitUpsertArgs} args - Arguments to update or create a Unit.
     * @example
     * // Update or create a Unit
     * const unit = await prisma.unit.upsert({
     *   create: {
     *     // ... data to create a Unit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Unit we want to update
     *   }
     * })
     */
    upsert<T extends UnitUpsertArgs>(args: SelectSubset<T, UnitUpsertArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Units.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitCountArgs} args - Arguments to filter Units to count.
     * @example
     * // Count the number of Units
     * const count = await prisma.unit.count({
     *   where: {
     *     // ... the filter for the Units we want to count
     *   }
     * })
    **/
    count<T extends UnitCountArgs>(
      args?: Subset<T, UnitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UnitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Unit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UnitAggregateArgs>(args: Subset<T, UnitAggregateArgs>): Prisma.PrismaPromise<GetUnitAggregateType<T>>

    /**
     * Group by Unit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UnitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UnitGroupByArgs['orderBy'] }
        : { orderBy?: UnitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UnitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUnitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Unit model
   */
  readonly fields: UnitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Unit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UnitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    barberUnits<T extends Unit$barberUnitsArgs<ExtArgs> = {}>(args?: Subset<T, Unit$barberUnitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarberUnitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookings<T extends Unit$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, Unit$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Unit model
   */
  interface UnitFieldRefs {
    readonly id: FieldRef<"Unit", 'String'>
    readonly tenantId: FieldRef<"Unit", 'String'>
    readonly name: FieldRef<"Unit", 'String'>
    readonly slug: FieldRef<"Unit", 'String'>
    readonly address: FieldRef<"Unit", 'Json'>
    readonly phone: FieldRef<"Unit", 'String'>
    readonly active: FieldRef<"Unit", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Unit findUnique
   */
  export type UnitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * Filter, which Unit to fetch.
     */
    where: UnitWhereUniqueInput
  }

  /**
   * Unit findUniqueOrThrow
   */
  export type UnitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * Filter, which Unit to fetch.
     */
    where: UnitWhereUniqueInput
  }

  /**
   * Unit findFirst
   */
  export type UnitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * Filter, which Unit to fetch.
     */
    where?: UnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Units to fetch.
     */
    orderBy?: UnitOrderByWithRelationInput | UnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Units.
     */
    cursor?: UnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Units from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Units.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Units.
     */
    distinct?: UnitScalarFieldEnum | UnitScalarFieldEnum[]
  }

  /**
   * Unit findFirstOrThrow
   */
  export type UnitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * Filter, which Unit to fetch.
     */
    where?: UnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Units to fetch.
     */
    orderBy?: UnitOrderByWithRelationInput | UnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Units.
     */
    cursor?: UnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Units from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Units.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Units.
     */
    distinct?: UnitScalarFieldEnum | UnitScalarFieldEnum[]
  }

  /**
   * Unit findMany
   */
  export type UnitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * Filter, which Units to fetch.
     */
    where?: UnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Units to fetch.
     */
    orderBy?: UnitOrderByWithRelationInput | UnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Units.
     */
    cursor?: UnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Units from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Units.
     */
    skip?: number
    distinct?: UnitScalarFieldEnum | UnitScalarFieldEnum[]
  }

  /**
   * Unit create
   */
  export type UnitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * The data needed to create a Unit.
     */
    data: XOR<UnitCreateInput, UnitUncheckedCreateInput>
  }

  /**
   * Unit createMany
   */
  export type UnitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Units.
     */
    data: UnitCreateManyInput | UnitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Unit createManyAndReturn
   */
  export type UnitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * The data used to create many Units.
     */
    data: UnitCreateManyInput | UnitCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Unit update
   */
  export type UnitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * The data needed to update a Unit.
     */
    data: XOR<UnitUpdateInput, UnitUncheckedUpdateInput>
    /**
     * Choose, which Unit to update.
     */
    where: UnitWhereUniqueInput
  }

  /**
   * Unit updateMany
   */
  export type UnitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Units.
     */
    data: XOR<UnitUpdateManyMutationInput, UnitUncheckedUpdateManyInput>
    /**
     * Filter which Units to update
     */
    where?: UnitWhereInput
    /**
     * Limit how many Units to update.
     */
    limit?: number
  }

  /**
   * Unit updateManyAndReturn
   */
  export type UnitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * The data used to update Units.
     */
    data: XOR<UnitUpdateManyMutationInput, UnitUncheckedUpdateManyInput>
    /**
     * Filter which Units to update
     */
    where?: UnitWhereInput
    /**
     * Limit how many Units to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Unit upsert
   */
  export type UnitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * The filter to search for the Unit to update in case it exists.
     */
    where: UnitWhereUniqueInput
    /**
     * In case the Unit found by the `where` argument doesn't exist, create a new Unit with this data.
     */
    create: XOR<UnitCreateInput, UnitUncheckedCreateInput>
    /**
     * In case the Unit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UnitUpdateInput, UnitUncheckedUpdateInput>
  }

  /**
   * Unit delete
   */
  export type UnitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    /**
     * Filter which Unit to delete.
     */
    where: UnitWhereUniqueInput
  }

  /**
   * Unit deleteMany
   */
  export type UnitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Units to delete
     */
    where?: UnitWhereInput
    /**
     * Limit how many Units to delete.
     */
    limit?: number
  }

  /**
   * Unit.barberUnits
   */
  export type Unit$barberUnitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberUnit
     */
    select?: BarberUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberUnit
     */
    omit?: BarberUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberUnitInclude<ExtArgs> | null
    where?: BarberUnitWhereInput
    orderBy?: BarberUnitOrderByWithRelationInput | BarberUnitOrderByWithRelationInput[]
    cursor?: BarberUnitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BarberUnitScalarFieldEnum | BarberUnitScalarFieldEnum[]
  }

  /**
   * Unit.bookings
   */
  export type Unit$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Unit without action
   */
  export type UnitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
  }


  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    price: number | null
    durationMin: number | null
    sortOrder: number | null
  }

  export type ServiceSumAggregateOutputType = {
    price: number | null
    durationMin: number | null
    sortOrder: number | null
  }

  export type ServiceMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    category: $Enums.ServiceCategory | null
    description: string | null
    price: number | null
    durationMin: number | null
    active: boolean | null
    sortOrder: number | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    category: $Enums.ServiceCategory | null
    description: string | null
    price: number | null
    durationMin: number | null
    active: boolean | null
    sortOrder: number | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    category: number
    description: number
    price: number
    durationMin: number
    active: number
    sortOrder: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    price?: true
    durationMin?: true
    sortOrder?: true
  }

  export type ServiceSumAggregateInputType = {
    price?: true
    durationMin?: true
    sortOrder?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    category?: true
    description?: true
    price?: true
    durationMin?: true
    active?: true
    sortOrder?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    category?: true
    description?: true
    price?: true
    durationMin?: true
    active?: true
    sortOrder?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    category?: true
    description?: true
    price?: true
    durationMin?: true
    active?: true
    sortOrder?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    category: $Enums.ServiceCategory
    description: string | null
    price: number
    durationMin: number
    active: boolean
    sortOrder: number
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    price?: boolean
    durationMin?: boolean
    active?: boolean
    sortOrder?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    bookings?: boolean | Service$bookingsArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    price?: boolean
    durationMin?: boolean
    active?: boolean
    sortOrder?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    price?: boolean
    durationMin?: boolean
    active?: boolean
    sortOrder?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    price?: boolean
    durationMin?: boolean
    active?: boolean
    sortOrder?: boolean
  }

  export type ServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "category" | "description" | "price" | "durationMin" | "active" | "sortOrder", ExtArgs["result"]["service"]>
  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    bookings?: boolean | Service$bookingsArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      bookings: Prisma.$BookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      category: $Enums.ServiceCategory
      description: string | null
      price: number
      durationMin: number
      active: boolean
      sortOrder: number
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Services and returns the data saved in the database.
     * @param {ServiceCreateManyAndReturnArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services and returns the data updated in the database.
     * @param {ServiceUpdateManyAndReturnArgs} args - Arguments to update many Services.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    bookings<T extends Service$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, Service$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Service model
   */
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'String'>
    readonly tenantId: FieldRef<"Service", 'String'>
    readonly name: FieldRef<"Service", 'String'>
    readonly category: FieldRef<"Service", 'ServiceCategory'>
    readonly description: FieldRef<"Service", 'String'>
    readonly price: FieldRef<"Service", 'Float'>
    readonly durationMin: FieldRef<"Service", 'Int'>
    readonly active: FieldRef<"Service", 'Boolean'>
    readonly sortOrder: FieldRef<"Service", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service createManyAndReturn
   */
  export type ServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service updateManyAndReturn
   */
  export type ServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to delete.
     */
    limit?: number
  }

  /**
   * Service.bookings
   */
  export type Service$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
  }


  /**
   * Model Barber
   */

  export type AggregateBarber = {
    _count: BarberCountAggregateOutputType | null
    _avg: BarberAvgAggregateOutputType | null
    _sum: BarberSumAggregateOutputType | null
    _min: BarberMinAggregateOutputType | null
    _max: BarberMaxAggregateOutputType | null
  }

  export type BarberAvgAggregateOutputType = {
    commissionPct: number | null
  }

  export type BarberSumAggregateOutputType = {
    commissionPct: number | null
  }

  export type BarberMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    nickname: string | null
    photoUrl: string | null
    commissionPct: number | null
    active: boolean | null
  }

  export type BarberMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    nickname: string | null
    photoUrl: string | null
    commissionPct: number | null
    active: boolean | null
  }

  export type BarberCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    nickname: number
    photoUrl: number
    commissionPct: number
    active: number
    _all: number
  }


  export type BarberAvgAggregateInputType = {
    commissionPct?: true
  }

  export type BarberSumAggregateInputType = {
    commissionPct?: true
  }

  export type BarberMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    nickname?: true
    photoUrl?: true
    commissionPct?: true
    active?: true
  }

  export type BarberMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    nickname?: true
    photoUrl?: true
    commissionPct?: true
    active?: true
  }

  export type BarberCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    nickname?: true
    photoUrl?: true
    commissionPct?: true
    active?: true
    _all?: true
  }

  export type BarberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Barber to aggregate.
     */
    where?: BarberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Barbers to fetch.
     */
    orderBy?: BarberOrderByWithRelationInput | BarberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BarberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Barbers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Barbers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Barbers
    **/
    _count?: true | BarberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BarberAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BarberSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BarberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BarberMaxAggregateInputType
  }

  export type GetBarberAggregateType<T extends BarberAggregateArgs> = {
        [P in keyof T & keyof AggregateBarber]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBarber[P]>
      : GetScalarType<T[P], AggregateBarber[P]>
  }




  export type BarberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BarberWhereInput
    orderBy?: BarberOrderByWithAggregationInput | BarberOrderByWithAggregationInput[]
    by: BarberScalarFieldEnum[] | BarberScalarFieldEnum
    having?: BarberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BarberCountAggregateInputType | true
    _avg?: BarberAvgAggregateInputType
    _sum?: BarberSumAggregateInputType
    _min?: BarberMinAggregateInputType
    _max?: BarberMaxAggregateInputType
  }

  export type BarberGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    nickname: string | null
    photoUrl: string | null
    commissionPct: number
    active: boolean
    _count: BarberCountAggregateOutputType | null
    _avg: BarberAvgAggregateOutputType | null
    _sum: BarberSumAggregateOutputType | null
    _min: BarberMinAggregateOutputType | null
    _max: BarberMaxAggregateOutputType | null
  }

  type GetBarberGroupByPayload<T extends BarberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BarberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BarberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BarberGroupByOutputType[P]>
            : GetScalarType<T[P], BarberGroupByOutputType[P]>
        }
      >
    >


  export type BarberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    nickname?: boolean
    photoUrl?: boolean
    commissionPct?: boolean
    active?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    units?: boolean | Barber$unitsArgs<ExtArgs>
    bookings?: boolean | Barber$bookingsArgs<ExtArgs>
    blocks?: boolean | Barber$blocksArgs<ExtArgs>
    _count?: boolean | BarberCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["barber"]>

  export type BarberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    nickname?: boolean
    photoUrl?: boolean
    commissionPct?: boolean
    active?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["barber"]>

  export type BarberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    nickname?: boolean
    photoUrl?: boolean
    commissionPct?: boolean
    active?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["barber"]>

  export type BarberSelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    nickname?: boolean
    photoUrl?: boolean
    commissionPct?: boolean
    active?: boolean
  }

  export type BarberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "nickname" | "photoUrl" | "commissionPct" | "active", ExtArgs["result"]["barber"]>
  export type BarberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    units?: boolean | Barber$unitsArgs<ExtArgs>
    bookings?: boolean | Barber$bookingsArgs<ExtArgs>
    blocks?: boolean | Barber$blocksArgs<ExtArgs>
    _count?: boolean | BarberCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BarberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type BarberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $BarberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Barber"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      units: Prisma.$BarberUnitPayload<ExtArgs>[]
      bookings: Prisma.$BookingPayload<ExtArgs>[]
      blocks: Prisma.$BarberBlockPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      nickname: string | null
      photoUrl: string | null
      commissionPct: number
      active: boolean
    }, ExtArgs["result"]["barber"]>
    composites: {}
  }

  type BarberGetPayload<S extends boolean | null | undefined | BarberDefaultArgs> = $Result.GetResult<Prisma.$BarberPayload, S>

  type BarberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BarberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BarberCountAggregateInputType | true
    }

  export interface BarberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Barber'], meta: { name: 'Barber' } }
    /**
     * Find zero or one Barber that matches the filter.
     * @param {BarberFindUniqueArgs} args - Arguments to find a Barber
     * @example
     * // Get one Barber
     * const barber = await prisma.barber.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BarberFindUniqueArgs>(args: SelectSubset<T, BarberFindUniqueArgs<ExtArgs>>): Prisma__BarberClient<$Result.GetResult<Prisma.$BarberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Barber that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BarberFindUniqueOrThrowArgs} args - Arguments to find a Barber
     * @example
     * // Get one Barber
     * const barber = await prisma.barber.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BarberFindUniqueOrThrowArgs>(args: SelectSubset<T, BarberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BarberClient<$Result.GetResult<Prisma.$BarberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Barber that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberFindFirstArgs} args - Arguments to find a Barber
     * @example
     * // Get one Barber
     * const barber = await prisma.barber.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BarberFindFirstArgs>(args?: SelectSubset<T, BarberFindFirstArgs<ExtArgs>>): Prisma__BarberClient<$Result.GetResult<Prisma.$BarberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Barber that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberFindFirstOrThrowArgs} args - Arguments to find a Barber
     * @example
     * // Get one Barber
     * const barber = await prisma.barber.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BarberFindFirstOrThrowArgs>(args?: SelectSubset<T, BarberFindFirstOrThrowArgs<ExtArgs>>): Prisma__BarberClient<$Result.GetResult<Prisma.$BarberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Barbers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Barbers
     * const barbers = await prisma.barber.findMany()
     * 
     * // Get first 10 Barbers
     * const barbers = await prisma.barber.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const barberWithIdOnly = await prisma.barber.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BarberFindManyArgs>(args?: SelectSubset<T, BarberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Barber.
     * @param {BarberCreateArgs} args - Arguments to create a Barber.
     * @example
     * // Create one Barber
     * const Barber = await prisma.barber.create({
     *   data: {
     *     // ... data to create a Barber
     *   }
     * })
     * 
     */
    create<T extends BarberCreateArgs>(args: SelectSubset<T, BarberCreateArgs<ExtArgs>>): Prisma__BarberClient<$Result.GetResult<Prisma.$BarberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Barbers.
     * @param {BarberCreateManyArgs} args - Arguments to create many Barbers.
     * @example
     * // Create many Barbers
     * const barber = await prisma.barber.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BarberCreateManyArgs>(args?: SelectSubset<T, BarberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Barbers and returns the data saved in the database.
     * @param {BarberCreateManyAndReturnArgs} args - Arguments to create many Barbers.
     * @example
     * // Create many Barbers
     * const barber = await prisma.barber.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Barbers and only return the `id`
     * const barberWithIdOnly = await prisma.barber.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BarberCreateManyAndReturnArgs>(args?: SelectSubset<T, BarberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Barber.
     * @param {BarberDeleteArgs} args - Arguments to delete one Barber.
     * @example
     * // Delete one Barber
     * const Barber = await prisma.barber.delete({
     *   where: {
     *     // ... filter to delete one Barber
     *   }
     * })
     * 
     */
    delete<T extends BarberDeleteArgs>(args: SelectSubset<T, BarberDeleteArgs<ExtArgs>>): Prisma__BarberClient<$Result.GetResult<Prisma.$BarberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Barber.
     * @param {BarberUpdateArgs} args - Arguments to update one Barber.
     * @example
     * // Update one Barber
     * const barber = await prisma.barber.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BarberUpdateArgs>(args: SelectSubset<T, BarberUpdateArgs<ExtArgs>>): Prisma__BarberClient<$Result.GetResult<Prisma.$BarberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Barbers.
     * @param {BarberDeleteManyArgs} args - Arguments to filter Barbers to delete.
     * @example
     * // Delete a few Barbers
     * const { count } = await prisma.barber.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BarberDeleteManyArgs>(args?: SelectSubset<T, BarberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Barbers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Barbers
     * const barber = await prisma.barber.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BarberUpdateManyArgs>(args: SelectSubset<T, BarberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Barbers and returns the data updated in the database.
     * @param {BarberUpdateManyAndReturnArgs} args - Arguments to update many Barbers.
     * @example
     * // Update many Barbers
     * const barber = await prisma.barber.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Barbers and only return the `id`
     * const barberWithIdOnly = await prisma.barber.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BarberUpdateManyAndReturnArgs>(args: SelectSubset<T, BarberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Barber.
     * @param {BarberUpsertArgs} args - Arguments to update or create a Barber.
     * @example
     * // Update or create a Barber
     * const barber = await prisma.barber.upsert({
     *   create: {
     *     // ... data to create a Barber
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Barber we want to update
     *   }
     * })
     */
    upsert<T extends BarberUpsertArgs>(args: SelectSubset<T, BarberUpsertArgs<ExtArgs>>): Prisma__BarberClient<$Result.GetResult<Prisma.$BarberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Barbers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberCountArgs} args - Arguments to filter Barbers to count.
     * @example
     * // Count the number of Barbers
     * const count = await prisma.barber.count({
     *   where: {
     *     // ... the filter for the Barbers we want to count
     *   }
     * })
    **/
    count<T extends BarberCountArgs>(
      args?: Subset<T, BarberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BarberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Barber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BarberAggregateArgs>(args: Subset<T, BarberAggregateArgs>): Prisma.PrismaPromise<GetBarberAggregateType<T>>

    /**
     * Group by Barber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BarberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BarberGroupByArgs['orderBy'] }
        : { orderBy?: BarberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BarberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBarberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Barber model
   */
  readonly fields: BarberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Barber.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BarberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    units<T extends Barber$unitsArgs<ExtArgs> = {}>(args?: Subset<T, Barber$unitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarberUnitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookings<T extends Barber$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, Barber$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    blocks<T extends Barber$blocksArgs<ExtArgs> = {}>(args?: Subset<T, Barber$blocksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarberBlockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Barber model
   */
  interface BarberFieldRefs {
    readonly id: FieldRef<"Barber", 'String'>
    readonly tenantId: FieldRef<"Barber", 'String'>
    readonly name: FieldRef<"Barber", 'String'>
    readonly nickname: FieldRef<"Barber", 'String'>
    readonly photoUrl: FieldRef<"Barber", 'String'>
    readonly commissionPct: FieldRef<"Barber", 'Float'>
    readonly active: FieldRef<"Barber", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Barber findUnique
   */
  export type BarberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barber
     */
    select?: BarberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barber
     */
    omit?: BarberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberInclude<ExtArgs> | null
    /**
     * Filter, which Barber to fetch.
     */
    where: BarberWhereUniqueInput
  }

  /**
   * Barber findUniqueOrThrow
   */
  export type BarberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barber
     */
    select?: BarberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barber
     */
    omit?: BarberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberInclude<ExtArgs> | null
    /**
     * Filter, which Barber to fetch.
     */
    where: BarberWhereUniqueInput
  }

  /**
   * Barber findFirst
   */
  export type BarberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barber
     */
    select?: BarberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barber
     */
    omit?: BarberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberInclude<ExtArgs> | null
    /**
     * Filter, which Barber to fetch.
     */
    where?: BarberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Barbers to fetch.
     */
    orderBy?: BarberOrderByWithRelationInput | BarberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Barbers.
     */
    cursor?: BarberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Barbers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Barbers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Barbers.
     */
    distinct?: BarberScalarFieldEnum | BarberScalarFieldEnum[]
  }

  /**
   * Barber findFirstOrThrow
   */
  export type BarberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barber
     */
    select?: BarberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barber
     */
    omit?: BarberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberInclude<ExtArgs> | null
    /**
     * Filter, which Barber to fetch.
     */
    where?: BarberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Barbers to fetch.
     */
    orderBy?: BarberOrderByWithRelationInput | BarberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Barbers.
     */
    cursor?: BarberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Barbers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Barbers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Barbers.
     */
    distinct?: BarberScalarFieldEnum | BarberScalarFieldEnum[]
  }

  /**
   * Barber findMany
   */
  export type BarberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barber
     */
    select?: BarberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barber
     */
    omit?: BarberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberInclude<ExtArgs> | null
    /**
     * Filter, which Barbers to fetch.
     */
    where?: BarberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Barbers to fetch.
     */
    orderBy?: BarberOrderByWithRelationInput | BarberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Barbers.
     */
    cursor?: BarberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Barbers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Barbers.
     */
    skip?: number
    distinct?: BarberScalarFieldEnum | BarberScalarFieldEnum[]
  }

  /**
   * Barber create
   */
  export type BarberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barber
     */
    select?: BarberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barber
     */
    omit?: BarberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberInclude<ExtArgs> | null
    /**
     * The data needed to create a Barber.
     */
    data: XOR<BarberCreateInput, BarberUncheckedCreateInput>
  }

  /**
   * Barber createMany
   */
  export type BarberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Barbers.
     */
    data: BarberCreateManyInput | BarberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Barber createManyAndReturn
   */
  export type BarberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barber
     */
    select?: BarberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Barber
     */
    omit?: BarberOmit<ExtArgs> | null
    /**
     * The data used to create many Barbers.
     */
    data: BarberCreateManyInput | BarberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Barber update
   */
  export type BarberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barber
     */
    select?: BarberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barber
     */
    omit?: BarberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberInclude<ExtArgs> | null
    /**
     * The data needed to update a Barber.
     */
    data: XOR<BarberUpdateInput, BarberUncheckedUpdateInput>
    /**
     * Choose, which Barber to update.
     */
    where: BarberWhereUniqueInput
  }

  /**
   * Barber updateMany
   */
  export type BarberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Barbers.
     */
    data: XOR<BarberUpdateManyMutationInput, BarberUncheckedUpdateManyInput>
    /**
     * Filter which Barbers to update
     */
    where?: BarberWhereInput
    /**
     * Limit how many Barbers to update.
     */
    limit?: number
  }

  /**
   * Barber updateManyAndReturn
   */
  export type BarberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barber
     */
    select?: BarberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Barber
     */
    omit?: BarberOmit<ExtArgs> | null
    /**
     * The data used to update Barbers.
     */
    data: XOR<BarberUpdateManyMutationInput, BarberUncheckedUpdateManyInput>
    /**
     * Filter which Barbers to update
     */
    where?: BarberWhereInput
    /**
     * Limit how many Barbers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Barber upsert
   */
  export type BarberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barber
     */
    select?: BarberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barber
     */
    omit?: BarberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberInclude<ExtArgs> | null
    /**
     * The filter to search for the Barber to update in case it exists.
     */
    where: BarberWhereUniqueInput
    /**
     * In case the Barber found by the `where` argument doesn't exist, create a new Barber with this data.
     */
    create: XOR<BarberCreateInput, BarberUncheckedCreateInput>
    /**
     * In case the Barber was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BarberUpdateInput, BarberUncheckedUpdateInput>
  }

  /**
   * Barber delete
   */
  export type BarberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barber
     */
    select?: BarberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barber
     */
    omit?: BarberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberInclude<ExtArgs> | null
    /**
     * Filter which Barber to delete.
     */
    where: BarberWhereUniqueInput
  }

  /**
   * Barber deleteMany
   */
  export type BarberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Barbers to delete
     */
    where?: BarberWhereInput
    /**
     * Limit how many Barbers to delete.
     */
    limit?: number
  }

  /**
   * Barber.units
   */
  export type Barber$unitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberUnit
     */
    select?: BarberUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberUnit
     */
    omit?: BarberUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberUnitInclude<ExtArgs> | null
    where?: BarberUnitWhereInput
    orderBy?: BarberUnitOrderByWithRelationInput | BarberUnitOrderByWithRelationInput[]
    cursor?: BarberUnitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BarberUnitScalarFieldEnum | BarberUnitScalarFieldEnum[]
  }

  /**
   * Barber.bookings
   */
  export type Barber$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Barber.blocks
   */
  export type Barber$blocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberBlock
     */
    select?: BarberBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberBlock
     */
    omit?: BarberBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberBlockInclude<ExtArgs> | null
    where?: BarberBlockWhereInput
    orderBy?: BarberBlockOrderByWithRelationInput | BarberBlockOrderByWithRelationInput[]
    cursor?: BarberBlockWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BarberBlockScalarFieldEnum | BarberBlockScalarFieldEnum[]
  }

  /**
   * Barber without action
   */
  export type BarberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Barber
     */
    select?: BarberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Barber
     */
    omit?: BarberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberInclude<ExtArgs> | null
  }


  /**
   * Model BarberUnit
   */

  export type AggregateBarberUnit = {
    _count: BarberUnitCountAggregateOutputType | null
    _min: BarberUnitMinAggregateOutputType | null
    _max: BarberUnitMaxAggregateOutputType | null
  }

  export type BarberUnitMinAggregateOutputType = {
    id: string | null
    barberId: string | null
    unitId: string | null
  }

  export type BarberUnitMaxAggregateOutputType = {
    id: string | null
    barberId: string | null
    unitId: string | null
  }

  export type BarberUnitCountAggregateOutputType = {
    id: number
    barberId: number
    unitId: number
    schedule: number
    _all: number
  }


  export type BarberUnitMinAggregateInputType = {
    id?: true
    barberId?: true
    unitId?: true
  }

  export type BarberUnitMaxAggregateInputType = {
    id?: true
    barberId?: true
    unitId?: true
  }

  export type BarberUnitCountAggregateInputType = {
    id?: true
    barberId?: true
    unitId?: true
    schedule?: true
    _all?: true
  }

  export type BarberUnitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BarberUnit to aggregate.
     */
    where?: BarberUnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BarberUnits to fetch.
     */
    orderBy?: BarberUnitOrderByWithRelationInput | BarberUnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BarberUnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BarberUnits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BarberUnits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BarberUnits
    **/
    _count?: true | BarberUnitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BarberUnitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BarberUnitMaxAggregateInputType
  }

  export type GetBarberUnitAggregateType<T extends BarberUnitAggregateArgs> = {
        [P in keyof T & keyof AggregateBarberUnit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBarberUnit[P]>
      : GetScalarType<T[P], AggregateBarberUnit[P]>
  }




  export type BarberUnitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BarberUnitWhereInput
    orderBy?: BarberUnitOrderByWithAggregationInput | BarberUnitOrderByWithAggregationInput[]
    by: BarberUnitScalarFieldEnum[] | BarberUnitScalarFieldEnum
    having?: BarberUnitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BarberUnitCountAggregateInputType | true
    _min?: BarberUnitMinAggregateInputType
    _max?: BarberUnitMaxAggregateInputType
  }

  export type BarberUnitGroupByOutputType = {
    id: string
    barberId: string
    unitId: string
    schedule: JsonValue
    _count: BarberUnitCountAggregateOutputType | null
    _min: BarberUnitMinAggregateOutputType | null
    _max: BarberUnitMaxAggregateOutputType | null
  }

  type GetBarberUnitGroupByPayload<T extends BarberUnitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BarberUnitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BarberUnitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BarberUnitGroupByOutputType[P]>
            : GetScalarType<T[P], BarberUnitGroupByOutputType[P]>
        }
      >
    >


  export type BarberUnitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barberId?: boolean
    unitId?: boolean
    schedule?: boolean
    barber?: boolean | BarberDefaultArgs<ExtArgs>
    unit?: boolean | UnitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["barberUnit"]>

  export type BarberUnitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barberId?: boolean
    unitId?: boolean
    schedule?: boolean
    barber?: boolean | BarberDefaultArgs<ExtArgs>
    unit?: boolean | UnitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["barberUnit"]>

  export type BarberUnitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barberId?: boolean
    unitId?: boolean
    schedule?: boolean
    barber?: boolean | BarberDefaultArgs<ExtArgs>
    unit?: boolean | UnitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["barberUnit"]>

  export type BarberUnitSelectScalar = {
    id?: boolean
    barberId?: boolean
    unitId?: boolean
    schedule?: boolean
  }

  export type BarberUnitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "barberId" | "unitId" | "schedule", ExtArgs["result"]["barberUnit"]>
  export type BarberUnitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barber?: boolean | BarberDefaultArgs<ExtArgs>
    unit?: boolean | UnitDefaultArgs<ExtArgs>
  }
  export type BarberUnitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barber?: boolean | BarberDefaultArgs<ExtArgs>
    unit?: boolean | UnitDefaultArgs<ExtArgs>
  }
  export type BarberUnitIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barber?: boolean | BarberDefaultArgs<ExtArgs>
    unit?: boolean | UnitDefaultArgs<ExtArgs>
  }

  export type $BarberUnitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BarberUnit"
    objects: {
      barber: Prisma.$BarberPayload<ExtArgs>
      unit: Prisma.$UnitPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      barberId: string
      unitId: string
      schedule: Prisma.JsonValue
    }, ExtArgs["result"]["barberUnit"]>
    composites: {}
  }

  type BarberUnitGetPayload<S extends boolean | null | undefined | BarberUnitDefaultArgs> = $Result.GetResult<Prisma.$BarberUnitPayload, S>

  type BarberUnitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BarberUnitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BarberUnitCountAggregateInputType | true
    }

  export interface BarberUnitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BarberUnit'], meta: { name: 'BarberUnit' } }
    /**
     * Find zero or one BarberUnit that matches the filter.
     * @param {BarberUnitFindUniqueArgs} args - Arguments to find a BarberUnit
     * @example
     * // Get one BarberUnit
     * const barberUnit = await prisma.barberUnit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BarberUnitFindUniqueArgs>(args: SelectSubset<T, BarberUnitFindUniqueArgs<ExtArgs>>): Prisma__BarberUnitClient<$Result.GetResult<Prisma.$BarberUnitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BarberUnit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BarberUnitFindUniqueOrThrowArgs} args - Arguments to find a BarberUnit
     * @example
     * // Get one BarberUnit
     * const barberUnit = await prisma.barberUnit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BarberUnitFindUniqueOrThrowArgs>(args: SelectSubset<T, BarberUnitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BarberUnitClient<$Result.GetResult<Prisma.$BarberUnitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BarberUnit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberUnitFindFirstArgs} args - Arguments to find a BarberUnit
     * @example
     * // Get one BarberUnit
     * const barberUnit = await prisma.barberUnit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BarberUnitFindFirstArgs>(args?: SelectSubset<T, BarberUnitFindFirstArgs<ExtArgs>>): Prisma__BarberUnitClient<$Result.GetResult<Prisma.$BarberUnitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BarberUnit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberUnitFindFirstOrThrowArgs} args - Arguments to find a BarberUnit
     * @example
     * // Get one BarberUnit
     * const barberUnit = await prisma.barberUnit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BarberUnitFindFirstOrThrowArgs>(args?: SelectSubset<T, BarberUnitFindFirstOrThrowArgs<ExtArgs>>): Prisma__BarberUnitClient<$Result.GetResult<Prisma.$BarberUnitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BarberUnits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberUnitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BarberUnits
     * const barberUnits = await prisma.barberUnit.findMany()
     * 
     * // Get first 10 BarberUnits
     * const barberUnits = await prisma.barberUnit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const barberUnitWithIdOnly = await prisma.barberUnit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BarberUnitFindManyArgs>(args?: SelectSubset<T, BarberUnitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarberUnitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BarberUnit.
     * @param {BarberUnitCreateArgs} args - Arguments to create a BarberUnit.
     * @example
     * // Create one BarberUnit
     * const BarberUnit = await prisma.barberUnit.create({
     *   data: {
     *     // ... data to create a BarberUnit
     *   }
     * })
     * 
     */
    create<T extends BarberUnitCreateArgs>(args: SelectSubset<T, BarberUnitCreateArgs<ExtArgs>>): Prisma__BarberUnitClient<$Result.GetResult<Prisma.$BarberUnitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BarberUnits.
     * @param {BarberUnitCreateManyArgs} args - Arguments to create many BarberUnits.
     * @example
     * // Create many BarberUnits
     * const barberUnit = await prisma.barberUnit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BarberUnitCreateManyArgs>(args?: SelectSubset<T, BarberUnitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BarberUnits and returns the data saved in the database.
     * @param {BarberUnitCreateManyAndReturnArgs} args - Arguments to create many BarberUnits.
     * @example
     * // Create many BarberUnits
     * const barberUnit = await prisma.barberUnit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BarberUnits and only return the `id`
     * const barberUnitWithIdOnly = await prisma.barberUnit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BarberUnitCreateManyAndReturnArgs>(args?: SelectSubset<T, BarberUnitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarberUnitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BarberUnit.
     * @param {BarberUnitDeleteArgs} args - Arguments to delete one BarberUnit.
     * @example
     * // Delete one BarberUnit
     * const BarberUnit = await prisma.barberUnit.delete({
     *   where: {
     *     // ... filter to delete one BarberUnit
     *   }
     * })
     * 
     */
    delete<T extends BarberUnitDeleteArgs>(args: SelectSubset<T, BarberUnitDeleteArgs<ExtArgs>>): Prisma__BarberUnitClient<$Result.GetResult<Prisma.$BarberUnitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BarberUnit.
     * @param {BarberUnitUpdateArgs} args - Arguments to update one BarberUnit.
     * @example
     * // Update one BarberUnit
     * const barberUnit = await prisma.barberUnit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BarberUnitUpdateArgs>(args: SelectSubset<T, BarberUnitUpdateArgs<ExtArgs>>): Prisma__BarberUnitClient<$Result.GetResult<Prisma.$BarberUnitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BarberUnits.
     * @param {BarberUnitDeleteManyArgs} args - Arguments to filter BarberUnits to delete.
     * @example
     * // Delete a few BarberUnits
     * const { count } = await prisma.barberUnit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BarberUnitDeleteManyArgs>(args?: SelectSubset<T, BarberUnitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BarberUnits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberUnitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BarberUnits
     * const barberUnit = await prisma.barberUnit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BarberUnitUpdateManyArgs>(args: SelectSubset<T, BarberUnitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BarberUnits and returns the data updated in the database.
     * @param {BarberUnitUpdateManyAndReturnArgs} args - Arguments to update many BarberUnits.
     * @example
     * // Update many BarberUnits
     * const barberUnit = await prisma.barberUnit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BarberUnits and only return the `id`
     * const barberUnitWithIdOnly = await prisma.barberUnit.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BarberUnitUpdateManyAndReturnArgs>(args: SelectSubset<T, BarberUnitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarberUnitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BarberUnit.
     * @param {BarberUnitUpsertArgs} args - Arguments to update or create a BarberUnit.
     * @example
     * // Update or create a BarberUnit
     * const barberUnit = await prisma.barberUnit.upsert({
     *   create: {
     *     // ... data to create a BarberUnit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BarberUnit we want to update
     *   }
     * })
     */
    upsert<T extends BarberUnitUpsertArgs>(args: SelectSubset<T, BarberUnitUpsertArgs<ExtArgs>>): Prisma__BarberUnitClient<$Result.GetResult<Prisma.$BarberUnitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BarberUnits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberUnitCountArgs} args - Arguments to filter BarberUnits to count.
     * @example
     * // Count the number of BarberUnits
     * const count = await prisma.barberUnit.count({
     *   where: {
     *     // ... the filter for the BarberUnits we want to count
     *   }
     * })
    **/
    count<T extends BarberUnitCountArgs>(
      args?: Subset<T, BarberUnitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BarberUnitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BarberUnit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberUnitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BarberUnitAggregateArgs>(args: Subset<T, BarberUnitAggregateArgs>): Prisma.PrismaPromise<GetBarberUnitAggregateType<T>>

    /**
     * Group by BarberUnit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberUnitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BarberUnitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BarberUnitGroupByArgs['orderBy'] }
        : { orderBy?: BarberUnitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BarberUnitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBarberUnitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BarberUnit model
   */
  readonly fields: BarberUnitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BarberUnit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BarberUnitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    barber<T extends BarberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BarberDefaultArgs<ExtArgs>>): Prisma__BarberClient<$Result.GetResult<Prisma.$BarberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    unit<T extends UnitDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UnitDefaultArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BarberUnit model
   */
  interface BarberUnitFieldRefs {
    readonly id: FieldRef<"BarberUnit", 'String'>
    readonly barberId: FieldRef<"BarberUnit", 'String'>
    readonly unitId: FieldRef<"BarberUnit", 'String'>
    readonly schedule: FieldRef<"BarberUnit", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * BarberUnit findUnique
   */
  export type BarberUnitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberUnit
     */
    select?: BarberUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberUnit
     */
    omit?: BarberUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberUnitInclude<ExtArgs> | null
    /**
     * Filter, which BarberUnit to fetch.
     */
    where: BarberUnitWhereUniqueInput
  }

  /**
   * BarberUnit findUniqueOrThrow
   */
  export type BarberUnitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberUnit
     */
    select?: BarberUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberUnit
     */
    omit?: BarberUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberUnitInclude<ExtArgs> | null
    /**
     * Filter, which BarberUnit to fetch.
     */
    where: BarberUnitWhereUniqueInput
  }

  /**
   * BarberUnit findFirst
   */
  export type BarberUnitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberUnit
     */
    select?: BarberUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberUnit
     */
    omit?: BarberUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberUnitInclude<ExtArgs> | null
    /**
     * Filter, which BarberUnit to fetch.
     */
    where?: BarberUnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BarberUnits to fetch.
     */
    orderBy?: BarberUnitOrderByWithRelationInput | BarberUnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BarberUnits.
     */
    cursor?: BarberUnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BarberUnits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BarberUnits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BarberUnits.
     */
    distinct?: BarberUnitScalarFieldEnum | BarberUnitScalarFieldEnum[]
  }

  /**
   * BarberUnit findFirstOrThrow
   */
  export type BarberUnitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberUnit
     */
    select?: BarberUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberUnit
     */
    omit?: BarberUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberUnitInclude<ExtArgs> | null
    /**
     * Filter, which BarberUnit to fetch.
     */
    where?: BarberUnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BarberUnits to fetch.
     */
    orderBy?: BarberUnitOrderByWithRelationInput | BarberUnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BarberUnits.
     */
    cursor?: BarberUnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BarberUnits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BarberUnits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BarberUnits.
     */
    distinct?: BarberUnitScalarFieldEnum | BarberUnitScalarFieldEnum[]
  }

  /**
   * BarberUnit findMany
   */
  export type BarberUnitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberUnit
     */
    select?: BarberUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberUnit
     */
    omit?: BarberUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberUnitInclude<ExtArgs> | null
    /**
     * Filter, which BarberUnits to fetch.
     */
    where?: BarberUnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BarberUnits to fetch.
     */
    orderBy?: BarberUnitOrderByWithRelationInput | BarberUnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BarberUnits.
     */
    cursor?: BarberUnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BarberUnits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BarberUnits.
     */
    skip?: number
    distinct?: BarberUnitScalarFieldEnum | BarberUnitScalarFieldEnum[]
  }

  /**
   * BarberUnit create
   */
  export type BarberUnitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberUnit
     */
    select?: BarberUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberUnit
     */
    omit?: BarberUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberUnitInclude<ExtArgs> | null
    /**
     * The data needed to create a BarberUnit.
     */
    data: XOR<BarberUnitCreateInput, BarberUnitUncheckedCreateInput>
  }

  /**
   * BarberUnit createMany
   */
  export type BarberUnitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BarberUnits.
     */
    data: BarberUnitCreateManyInput | BarberUnitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BarberUnit createManyAndReturn
   */
  export type BarberUnitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberUnit
     */
    select?: BarberUnitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BarberUnit
     */
    omit?: BarberUnitOmit<ExtArgs> | null
    /**
     * The data used to create many BarberUnits.
     */
    data: BarberUnitCreateManyInput | BarberUnitCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberUnitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BarberUnit update
   */
  export type BarberUnitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberUnit
     */
    select?: BarberUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberUnit
     */
    omit?: BarberUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberUnitInclude<ExtArgs> | null
    /**
     * The data needed to update a BarberUnit.
     */
    data: XOR<BarberUnitUpdateInput, BarberUnitUncheckedUpdateInput>
    /**
     * Choose, which BarberUnit to update.
     */
    where: BarberUnitWhereUniqueInput
  }

  /**
   * BarberUnit updateMany
   */
  export type BarberUnitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BarberUnits.
     */
    data: XOR<BarberUnitUpdateManyMutationInput, BarberUnitUncheckedUpdateManyInput>
    /**
     * Filter which BarberUnits to update
     */
    where?: BarberUnitWhereInput
    /**
     * Limit how many BarberUnits to update.
     */
    limit?: number
  }

  /**
   * BarberUnit updateManyAndReturn
   */
  export type BarberUnitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberUnit
     */
    select?: BarberUnitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BarberUnit
     */
    omit?: BarberUnitOmit<ExtArgs> | null
    /**
     * The data used to update BarberUnits.
     */
    data: XOR<BarberUnitUpdateManyMutationInput, BarberUnitUncheckedUpdateManyInput>
    /**
     * Filter which BarberUnits to update
     */
    where?: BarberUnitWhereInput
    /**
     * Limit how many BarberUnits to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberUnitIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BarberUnit upsert
   */
  export type BarberUnitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberUnit
     */
    select?: BarberUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberUnit
     */
    omit?: BarberUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberUnitInclude<ExtArgs> | null
    /**
     * The filter to search for the BarberUnit to update in case it exists.
     */
    where: BarberUnitWhereUniqueInput
    /**
     * In case the BarberUnit found by the `where` argument doesn't exist, create a new BarberUnit with this data.
     */
    create: XOR<BarberUnitCreateInput, BarberUnitUncheckedCreateInput>
    /**
     * In case the BarberUnit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BarberUnitUpdateInput, BarberUnitUncheckedUpdateInput>
  }

  /**
   * BarberUnit delete
   */
  export type BarberUnitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberUnit
     */
    select?: BarberUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberUnit
     */
    omit?: BarberUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberUnitInclude<ExtArgs> | null
    /**
     * Filter which BarberUnit to delete.
     */
    where: BarberUnitWhereUniqueInput
  }

  /**
   * BarberUnit deleteMany
   */
  export type BarberUnitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BarberUnits to delete
     */
    where?: BarberUnitWhereInput
    /**
     * Limit how many BarberUnits to delete.
     */
    limit?: number
  }

  /**
   * BarberUnit without action
   */
  export type BarberUnitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberUnit
     */
    select?: BarberUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberUnit
     */
    omit?: BarberUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberUnitInclude<ExtArgs> | null
  }


  /**
   * Model BarberBlock
   */

  export type AggregateBarberBlock = {
    _count: BarberBlockCountAggregateOutputType | null
    _min: BarberBlockMinAggregateOutputType | null
    _max: BarberBlockMaxAggregateOutputType | null
  }

  export type BarberBlockMinAggregateOutputType = {
    id: string | null
    barberId: string | null
    startTime: Date | null
    endTime: Date | null
    reason: string | null
  }

  export type BarberBlockMaxAggregateOutputType = {
    id: string | null
    barberId: string | null
    startTime: Date | null
    endTime: Date | null
    reason: string | null
  }

  export type BarberBlockCountAggregateOutputType = {
    id: number
    barberId: number
    startTime: number
    endTime: number
    reason: number
    _all: number
  }


  export type BarberBlockMinAggregateInputType = {
    id?: true
    barberId?: true
    startTime?: true
    endTime?: true
    reason?: true
  }

  export type BarberBlockMaxAggregateInputType = {
    id?: true
    barberId?: true
    startTime?: true
    endTime?: true
    reason?: true
  }

  export type BarberBlockCountAggregateInputType = {
    id?: true
    barberId?: true
    startTime?: true
    endTime?: true
    reason?: true
    _all?: true
  }

  export type BarberBlockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BarberBlock to aggregate.
     */
    where?: BarberBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BarberBlocks to fetch.
     */
    orderBy?: BarberBlockOrderByWithRelationInput | BarberBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BarberBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BarberBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BarberBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BarberBlocks
    **/
    _count?: true | BarberBlockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BarberBlockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BarberBlockMaxAggregateInputType
  }

  export type GetBarberBlockAggregateType<T extends BarberBlockAggregateArgs> = {
        [P in keyof T & keyof AggregateBarberBlock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBarberBlock[P]>
      : GetScalarType<T[P], AggregateBarberBlock[P]>
  }




  export type BarberBlockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BarberBlockWhereInput
    orderBy?: BarberBlockOrderByWithAggregationInput | BarberBlockOrderByWithAggregationInput[]
    by: BarberBlockScalarFieldEnum[] | BarberBlockScalarFieldEnum
    having?: BarberBlockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BarberBlockCountAggregateInputType | true
    _min?: BarberBlockMinAggregateInputType
    _max?: BarberBlockMaxAggregateInputType
  }

  export type BarberBlockGroupByOutputType = {
    id: string
    barberId: string
    startTime: Date
    endTime: Date
    reason: string | null
    _count: BarberBlockCountAggregateOutputType | null
    _min: BarberBlockMinAggregateOutputType | null
    _max: BarberBlockMaxAggregateOutputType | null
  }

  type GetBarberBlockGroupByPayload<T extends BarberBlockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BarberBlockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BarberBlockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BarberBlockGroupByOutputType[P]>
            : GetScalarType<T[P], BarberBlockGroupByOutputType[P]>
        }
      >
    >


  export type BarberBlockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barberId?: boolean
    startTime?: boolean
    endTime?: boolean
    reason?: boolean
    barber?: boolean | BarberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["barberBlock"]>

  export type BarberBlockSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barberId?: boolean
    startTime?: boolean
    endTime?: boolean
    reason?: boolean
    barber?: boolean | BarberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["barberBlock"]>

  export type BarberBlockSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barberId?: boolean
    startTime?: boolean
    endTime?: boolean
    reason?: boolean
    barber?: boolean | BarberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["barberBlock"]>

  export type BarberBlockSelectScalar = {
    id?: boolean
    barberId?: boolean
    startTime?: boolean
    endTime?: boolean
    reason?: boolean
  }

  export type BarberBlockOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "barberId" | "startTime" | "endTime" | "reason", ExtArgs["result"]["barberBlock"]>
  export type BarberBlockInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barber?: boolean | BarberDefaultArgs<ExtArgs>
  }
  export type BarberBlockIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barber?: boolean | BarberDefaultArgs<ExtArgs>
  }
  export type BarberBlockIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    barber?: boolean | BarberDefaultArgs<ExtArgs>
  }

  export type $BarberBlockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BarberBlock"
    objects: {
      barber: Prisma.$BarberPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      barberId: string
      startTime: Date
      endTime: Date
      reason: string | null
    }, ExtArgs["result"]["barberBlock"]>
    composites: {}
  }

  type BarberBlockGetPayload<S extends boolean | null | undefined | BarberBlockDefaultArgs> = $Result.GetResult<Prisma.$BarberBlockPayload, S>

  type BarberBlockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BarberBlockFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BarberBlockCountAggregateInputType | true
    }

  export interface BarberBlockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BarberBlock'], meta: { name: 'BarberBlock' } }
    /**
     * Find zero or one BarberBlock that matches the filter.
     * @param {BarberBlockFindUniqueArgs} args - Arguments to find a BarberBlock
     * @example
     * // Get one BarberBlock
     * const barberBlock = await prisma.barberBlock.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BarberBlockFindUniqueArgs>(args: SelectSubset<T, BarberBlockFindUniqueArgs<ExtArgs>>): Prisma__BarberBlockClient<$Result.GetResult<Prisma.$BarberBlockPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BarberBlock that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BarberBlockFindUniqueOrThrowArgs} args - Arguments to find a BarberBlock
     * @example
     * // Get one BarberBlock
     * const barberBlock = await prisma.barberBlock.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BarberBlockFindUniqueOrThrowArgs>(args: SelectSubset<T, BarberBlockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BarberBlockClient<$Result.GetResult<Prisma.$BarberBlockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BarberBlock that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberBlockFindFirstArgs} args - Arguments to find a BarberBlock
     * @example
     * // Get one BarberBlock
     * const barberBlock = await prisma.barberBlock.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BarberBlockFindFirstArgs>(args?: SelectSubset<T, BarberBlockFindFirstArgs<ExtArgs>>): Prisma__BarberBlockClient<$Result.GetResult<Prisma.$BarberBlockPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BarberBlock that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberBlockFindFirstOrThrowArgs} args - Arguments to find a BarberBlock
     * @example
     * // Get one BarberBlock
     * const barberBlock = await prisma.barberBlock.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BarberBlockFindFirstOrThrowArgs>(args?: SelectSubset<T, BarberBlockFindFirstOrThrowArgs<ExtArgs>>): Prisma__BarberBlockClient<$Result.GetResult<Prisma.$BarberBlockPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BarberBlocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberBlockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BarberBlocks
     * const barberBlocks = await prisma.barberBlock.findMany()
     * 
     * // Get first 10 BarberBlocks
     * const barberBlocks = await prisma.barberBlock.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const barberBlockWithIdOnly = await prisma.barberBlock.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BarberBlockFindManyArgs>(args?: SelectSubset<T, BarberBlockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarberBlockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BarberBlock.
     * @param {BarberBlockCreateArgs} args - Arguments to create a BarberBlock.
     * @example
     * // Create one BarberBlock
     * const BarberBlock = await prisma.barberBlock.create({
     *   data: {
     *     // ... data to create a BarberBlock
     *   }
     * })
     * 
     */
    create<T extends BarberBlockCreateArgs>(args: SelectSubset<T, BarberBlockCreateArgs<ExtArgs>>): Prisma__BarberBlockClient<$Result.GetResult<Prisma.$BarberBlockPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BarberBlocks.
     * @param {BarberBlockCreateManyArgs} args - Arguments to create many BarberBlocks.
     * @example
     * // Create many BarberBlocks
     * const barberBlock = await prisma.barberBlock.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BarberBlockCreateManyArgs>(args?: SelectSubset<T, BarberBlockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BarberBlocks and returns the data saved in the database.
     * @param {BarberBlockCreateManyAndReturnArgs} args - Arguments to create many BarberBlocks.
     * @example
     * // Create many BarberBlocks
     * const barberBlock = await prisma.barberBlock.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BarberBlocks and only return the `id`
     * const barberBlockWithIdOnly = await prisma.barberBlock.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BarberBlockCreateManyAndReturnArgs>(args?: SelectSubset<T, BarberBlockCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarberBlockPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BarberBlock.
     * @param {BarberBlockDeleteArgs} args - Arguments to delete one BarberBlock.
     * @example
     * // Delete one BarberBlock
     * const BarberBlock = await prisma.barberBlock.delete({
     *   where: {
     *     // ... filter to delete one BarberBlock
     *   }
     * })
     * 
     */
    delete<T extends BarberBlockDeleteArgs>(args: SelectSubset<T, BarberBlockDeleteArgs<ExtArgs>>): Prisma__BarberBlockClient<$Result.GetResult<Prisma.$BarberBlockPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BarberBlock.
     * @param {BarberBlockUpdateArgs} args - Arguments to update one BarberBlock.
     * @example
     * // Update one BarberBlock
     * const barberBlock = await prisma.barberBlock.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BarberBlockUpdateArgs>(args: SelectSubset<T, BarberBlockUpdateArgs<ExtArgs>>): Prisma__BarberBlockClient<$Result.GetResult<Prisma.$BarberBlockPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BarberBlocks.
     * @param {BarberBlockDeleteManyArgs} args - Arguments to filter BarberBlocks to delete.
     * @example
     * // Delete a few BarberBlocks
     * const { count } = await prisma.barberBlock.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BarberBlockDeleteManyArgs>(args?: SelectSubset<T, BarberBlockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BarberBlocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberBlockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BarberBlocks
     * const barberBlock = await prisma.barberBlock.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BarberBlockUpdateManyArgs>(args: SelectSubset<T, BarberBlockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BarberBlocks and returns the data updated in the database.
     * @param {BarberBlockUpdateManyAndReturnArgs} args - Arguments to update many BarberBlocks.
     * @example
     * // Update many BarberBlocks
     * const barberBlock = await prisma.barberBlock.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BarberBlocks and only return the `id`
     * const barberBlockWithIdOnly = await prisma.barberBlock.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BarberBlockUpdateManyAndReturnArgs>(args: SelectSubset<T, BarberBlockUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BarberBlockPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BarberBlock.
     * @param {BarberBlockUpsertArgs} args - Arguments to update or create a BarberBlock.
     * @example
     * // Update or create a BarberBlock
     * const barberBlock = await prisma.barberBlock.upsert({
     *   create: {
     *     // ... data to create a BarberBlock
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BarberBlock we want to update
     *   }
     * })
     */
    upsert<T extends BarberBlockUpsertArgs>(args: SelectSubset<T, BarberBlockUpsertArgs<ExtArgs>>): Prisma__BarberBlockClient<$Result.GetResult<Prisma.$BarberBlockPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BarberBlocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberBlockCountArgs} args - Arguments to filter BarberBlocks to count.
     * @example
     * // Count the number of BarberBlocks
     * const count = await prisma.barberBlock.count({
     *   where: {
     *     // ... the filter for the BarberBlocks we want to count
     *   }
     * })
    **/
    count<T extends BarberBlockCountArgs>(
      args?: Subset<T, BarberBlockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BarberBlockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BarberBlock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberBlockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BarberBlockAggregateArgs>(args: Subset<T, BarberBlockAggregateArgs>): Prisma.PrismaPromise<GetBarberBlockAggregateType<T>>

    /**
     * Group by BarberBlock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BarberBlockGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BarberBlockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BarberBlockGroupByArgs['orderBy'] }
        : { orderBy?: BarberBlockGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BarberBlockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBarberBlockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BarberBlock model
   */
  readonly fields: BarberBlockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BarberBlock.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BarberBlockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    barber<T extends BarberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BarberDefaultArgs<ExtArgs>>): Prisma__BarberClient<$Result.GetResult<Prisma.$BarberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BarberBlock model
   */
  interface BarberBlockFieldRefs {
    readonly id: FieldRef<"BarberBlock", 'String'>
    readonly barberId: FieldRef<"BarberBlock", 'String'>
    readonly startTime: FieldRef<"BarberBlock", 'DateTime'>
    readonly endTime: FieldRef<"BarberBlock", 'DateTime'>
    readonly reason: FieldRef<"BarberBlock", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BarberBlock findUnique
   */
  export type BarberBlockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberBlock
     */
    select?: BarberBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberBlock
     */
    omit?: BarberBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberBlockInclude<ExtArgs> | null
    /**
     * Filter, which BarberBlock to fetch.
     */
    where: BarberBlockWhereUniqueInput
  }

  /**
   * BarberBlock findUniqueOrThrow
   */
  export type BarberBlockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberBlock
     */
    select?: BarberBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberBlock
     */
    omit?: BarberBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberBlockInclude<ExtArgs> | null
    /**
     * Filter, which BarberBlock to fetch.
     */
    where: BarberBlockWhereUniqueInput
  }

  /**
   * BarberBlock findFirst
   */
  export type BarberBlockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberBlock
     */
    select?: BarberBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberBlock
     */
    omit?: BarberBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberBlockInclude<ExtArgs> | null
    /**
     * Filter, which BarberBlock to fetch.
     */
    where?: BarberBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BarberBlocks to fetch.
     */
    orderBy?: BarberBlockOrderByWithRelationInput | BarberBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BarberBlocks.
     */
    cursor?: BarberBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BarberBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BarberBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BarberBlocks.
     */
    distinct?: BarberBlockScalarFieldEnum | BarberBlockScalarFieldEnum[]
  }

  /**
   * BarberBlock findFirstOrThrow
   */
  export type BarberBlockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberBlock
     */
    select?: BarberBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberBlock
     */
    omit?: BarberBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberBlockInclude<ExtArgs> | null
    /**
     * Filter, which BarberBlock to fetch.
     */
    where?: BarberBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BarberBlocks to fetch.
     */
    orderBy?: BarberBlockOrderByWithRelationInput | BarberBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BarberBlocks.
     */
    cursor?: BarberBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BarberBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BarberBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BarberBlocks.
     */
    distinct?: BarberBlockScalarFieldEnum | BarberBlockScalarFieldEnum[]
  }

  /**
   * BarberBlock findMany
   */
  export type BarberBlockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberBlock
     */
    select?: BarberBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberBlock
     */
    omit?: BarberBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberBlockInclude<ExtArgs> | null
    /**
     * Filter, which BarberBlocks to fetch.
     */
    where?: BarberBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BarberBlocks to fetch.
     */
    orderBy?: BarberBlockOrderByWithRelationInput | BarberBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BarberBlocks.
     */
    cursor?: BarberBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BarberBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BarberBlocks.
     */
    skip?: number
    distinct?: BarberBlockScalarFieldEnum | BarberBlockScalarFieldEnum[]
  }

  /**
   * BarberBlock create
   */
  export type BarberBlockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberBlock
     */
    select?: BarberBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberBlock
     */
    omit?: BarberBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberBlockInclude<ExtArgs> | null
    /**
     * The data needed to create a BarberBlock.
     */
    data: XOR<BarberBlockCreateInput, BarberBlockUncheckedCreateInput>
  }

  /**
   * BarberBlock createMany
   */
  export type BarberBlockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BarberBlocks.
     */
    data: BarberBlockCreateManyInput | BarberBlockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BarberBlock createManyAndReturn
   */
  export type BarberBlockCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberBlock
     */
    select?: BarberBlockSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BarberBlock
     */
    omit?: BarberBlockOmit<ExtArgs> | null
    /**
     * The data used to create many BarberBlocks.
     */
    data: BarberBlockCreateManyInput | BarberBlockCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberBlockIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BarberBlock update
   */
  export type BarberBlockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberBlock
     */
    select?: BarberBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberBlock
     */
    omit?: BarberBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberBlockInclude<ExtArgs> | null
    /**
     * The data needed to update a BarberBlock.
     */
    data: XOR<BarberBlockUpdateInput, BarberBlockUncheckedUpdateInput>
    /**
     * Choose, which BarberBlock to update.
     */
    where: BarberBlockWhereUniqueInput
  }

  /**
   * BarberBlock updateMany
   */
  export type BarberBlockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BarberBlocks.
     */
    data: XOR<BarberBlockUpdateManyMutationInput, BarberBlockUncheckedUpdateManyInput>
    /**
     * Filter which BarberBlocks to update
     */
    where?: BarberBlockWhereInput
    /**
     * Limit how many BarberBlocks to update.
     */
    limit?: number
  }

  /**
   * BarberBlock updateManyAndReturn
   */
  export type BarberBlockUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberBlock
     */
    select?: BarberBlockSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BarberBlock
     */
    omit?: BarberBlockOmit<ExtArgs> | null
    /**
     * The data used to update BarberBlocks.
     */
    data: XOR<BarberBlockUpdateManyMutationInput, BarberBlockUncheckedUpdateManyInput>
    /**
     * Filter which BarberBlocks to update
     */
    where?: BarberBlockWhereInput
    /**
     * Limit how many BarberBlocks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberBlockIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BarberBlock upsert
   */
  export type BarberBlockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberBlock
     */
    select?: BarberBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberBlock
     */
    omit?: BarberBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberBlockInclude<ExtArgs> | null
    /**
     * The filter to search for the BarberBlock to update in case it exists.
     */
    where: BarberBlockWhereUniqueInput
    /**
     * In case the BarberBlock found by the `where` argument doesn't exist, create a new BarberBlock with this data.
     */
    create: XOR<BarberBlockCreateInput, BarberBlockUncheckedCreateInput>
    /**
     * In case the BarberBlock was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BarberBlockUpdateInput, BarberBlockUncheckedUpdateInput>
  }

  /**
   * BarberBlock delete
   */
  export type BarberBlockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberBlock
     */
    select?: BarberBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberBlock
     */
    omit?: BarberBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberBlockInclude<ExtArgs> | null
    /**
     * Filter which BarberBlock to delete.
     */
    where: BarberBlockWhereUniqueInput
  }

  /**
   * BarberBlock deleteMany
   */
  export type BarberBlockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BarberBlocks to delete
     */
    where?: BarberBlockWhereInput
    /**
     * Limit how many BarberBlocks to delete.
     */
    limit?: number
  }

  /**
   * BarberBlock without action
   */
  export type BarberBlockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BarberBlock
     */
    select?: BarberBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BarberBlock
     */
    omit?: BarberBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BarberBlockInclude<ExtArgs> | null
  }


  /**
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _avg: ClientAvgAggregateOutputType | null
    _sum: ClientSumAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientAvgAggregateOutputType = {
    totalVisits: number | null
  }

  export type ClientSumAggregateOutputType = {
    totalVisits: number | null
  }

  export type ClientMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    phone: string | null
    email: string | null
    totalVisits: number | null
    lastVisit: Date | null
    createdAt: Date | null
  }

  export type ClientMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    phone: string | null
    email: string | null
    totalVisits: number | null
    lastVisit: Date | null
    createdAt: Date | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    phone: number
    email: number
    totalVisits: number
    lastVisit: number
    createdAt: number
    _all: number
  }


  export type ClientAvgAggregateInputType = {
    totalVisits?: true
  }

  export type ClientSumAggregateInputType = {
    totalVisits?: true
  }

  export type ClientMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    phone?: true
    email?: true
    totalVisits?: true
    lastVisit?: true
    createdAt?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    phone?: true
    email?: true
    totalVisits?: true
    lastVisit?: true
    createdAt?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    phone?: true
    email?: true
    totalVisits?: true
    lastVisit?: true
    createdAt?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type ClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: ClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _avg?: ClientAvgAggregateInputType
    _sum?: ClientSumAggregateInputType
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    phone: string
    email: string | null
    totalVisits: number
    lastVisit: Date | null
    createdAt: Date
    _count: ClientCountAggregateOutputType | null
    _avg: ClientAvgAggregateOutputType | null
    _sum: ClientSumAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    totalVisits?: boolean
    lastVisit?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    bookings?: boolean | Client$bookingsArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    totalVisits?: boolean
    lastVisit?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    totalVisits?: boolean
    lastVisit?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    totalVisits?: boolean
    lastVisit?: boolean
    createdAt?: boolean
  }

  export type ClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "phone" | "email" | "totalVisits" | "lastVisit" | "createdAt", ExtArgs["result"]["client"]>
  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    bookings?: boolean | Client$bookingsArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type ClientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      bookings: Prisma.$BookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      phone: string
      email: string | null
      totalVisits: number
      lastVisit: Date | null
      createdAt: Date
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client'], meta: { name: 'Client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientFindManyArgs>(args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
     */
    create<T extends ClientCreateArgs>(args: SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientCreateManyArgs>(args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clients and returns the data saved in the database.
     * @param {ClientCreateManyAndReturnArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
     */
    delete<T extends ClientDeleteArgs>(args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientUpdateArgs>(args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientDeleteManyArgs>(args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientUpdateManyArgs>(args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients and returns the data updated in the database.
     * @param {ClientUpdateManyAndReturnArgs} args - Arguments to update many Clients.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClientUpdateManyAndReturnArgs>(args: SelectSubset<T, ClientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Client model
   */
  readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    bookings<T extends Client$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, Client$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Client model
   */
  interface ClientFieldRefs {
    readonly id: FieldRef<"Client", 'String'>
    readonly tenantId: FieldRef<"Client", 'String'>
    readonly name: FieldRef<"Client", 'String'>
    readonly phone: FieldRef<"Client", 'String'>
    readonly email: FieldRef<"Client", 'String'>
    readonly totalVisits: FieldRef<"Client", 'Int'>
    readonly lastVisit: FieldRef<"Client", 'DateTime'>
    readonly createdAt: FieldRef<"Client", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>
  }

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client createManyAndReturn
   */
  export type ClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client updateManyAndReturn
   */
  export type ClientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
  }

  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to delete.
     */
    limit?: number
  }

  /**
   * Client.bookings
   */
  export type Client$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Client without action
   */
  export type ClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
  }


  /**
   * Model Booking
   */

  export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  export type BookingAvgAggregateOutputType = {
    durationMin: number | null
    price: number | null
  }

  export type BookingSumAggregateOutputType = {
    durationMin: number | null
    price: number | null
  }

  export type BookingMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    unitId: string | null
    barberId: string | null
    clientId: string | null
    serviceId: string | null
    dateTime: Date | null
    durationMin: number | null
    price: number | null
    status: $Enums.BookingStatus | null
    origin: $Enums.BookingOrigin | null
    campaignRef: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    unitId: string | null
    barberId: string | null
    clientId: string | null
    serviceId: string | null
    dateTime: Date | null
    durationMin: number | null
    price: number | null
    status: $Enums.BookingStatus | null
    origin: $Enums.BookingOrigin | null
    campaignRef: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingCountAggregateOutputType = {
    id: number
    tenantId: number
    unitId: number
    barberId: number
    clientId: number
    serviceId: number
    dateTime: number
    durationMin: number
    price: number
    status: number
    origin: number
    campaignRef: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BookingAvgAggregateInputType = {
    durationMin?: true
    price?: true
  }

  export type BookingSumAggregateInputType = {
    durationMin?: true
    price?: true
  }

  export type BookingMinAggregateInputType = {
    id?: true
    tenantId?: true
    unitId?: true
    barberId?: true
    clientId?: true
    serviceId?: true
    dateTime?: true
    durationMin?: true
    price?: true
    status?: true
    origin?: true
    campaignRef?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingMaxAggregateInputType = {
    id?: true
    tenantId?: true
    unitId?: true
    barberId?: true
    clientId?: true
    serviceId?: true
    dateTime?: true
    durationMin?: true
    price?: true
    status?: true
    origin?: true
    campaignRef?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingCountAggregateInputType = {
    id?: true
    tenantId?: true
    unitId?: true
    barberId?: true
    clientId?: true
    serviceId?: true
    dateTime?: true
    durationMin?: true
    price?: true
    status?: true
    origin?: true
    campaignRef?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Booking to aggregate.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookings
    **/
    _count?: true | BookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingMaxAggregateInputType
  }

  export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
        [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooking[P]>
      : GetScalarType<T[P], AggregateBooking[P]>
  }




  export type BookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithAggregationInput | BookingOrderByWithAggregationInput[]
    by: BookingScalarFieldEnum[] | BookingScalarFieldEnum
    having?: BookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingCountAggregateInputType | true
    _avg?: BookingAvgAggregateInputType
    _sum?: BookingSumAggregateInputType
    _min?: BookingMinAggregateInputType
    _max?: BookingMaxAggregateInputType
  }

  export type BookingGroupByOutputType = {
    id: string
    tenantId: string
    unitId: string | null
    barberId: string
    clientId: string
    serviceId: string
    dateTime: Date
    durationMin: number
    price: number
    status: $Enums.BookingStatus
    origin: $Enums.BookingOrigin
    campaignRef: string | null
    createdAt: Date
    updatedAt: Date
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingGroupByOutputType[P]>
            : GetScalarType<T[P], BookingGroupByOutputType[P]>
        }
      >
    >


  export type BookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    unitId?: boolean
    barberId?: boolean
    clientId?: boolean
    serviceId?: boolean
    dateTime?: boolean
    durationMin?: boolean
    price?: boolean
    status?: boolean
    origin?: boolean
    campaignRef?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    unit?: boolean | Booking$unitArgs<ExtArgs>
    barber?: boolean | BarberDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    unitId?: boolean
    barberId?: boolean
    clientId?: boolean
    serviceId?: boolean
    dateTime?: boolean
    durationMin?: boolean
    price?: boolean
    status?: boolean
    origin?: boolean
    campaignRef?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    unit?: boolean | Booking$unitArgs<ExtArgs>
    barber?: boolean | BarberDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    unitId?: boolean
    barberId?: boolean
    clientId?: boolean
    serviceId?: boolean
    dateTime?: boolean
    durationMin?: boolean
    price?: boolean
    status?: boolean
    origin?: boolean
    campaignRef?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    unit?: boolean | Booking$unitArgs<ExtArgs>
    barber?: boolean | BarberDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectScalar = {
    id?: boolean
    tenantId?: boolean
    unitId?: boolean
    barberId?: boolean
    clientId?: boolean
    serviceId?: boolean
    dateTime?: boolean
    durationMin?: boolean
    price?: boolean
    status?: boolean
    origin?: boolean
    campaignRef?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BookingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "unitId" | "barberId" | "clientId" | "serviceId" | "dateTime" | "durationMin" | "price" | "status" | "origin" | "campaignRef" | "createdAt" | "updatedAt", ExtArgs["result"]["booking"]>
  export type BookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    unit?: boolean | Booking$unitArgs<ExtArgs>
    barber?: boolean | BarberDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type BookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    unit?: boolean | Booking$unitArgs<ExtArgs>
    barber?: boolean | BarberDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type BookingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    unit?: boolean | Booking$unitArgs<ExtArgs>
    barber?: boolean | BarberDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }

  export type $BookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Booking"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      unit: Prisma.$UnitPayload<ExtArgs> | null
      barber: Prisma.$BarberPayload<ExtArgs>
      client: Prisma.$ClientPayload<ExtArgs>
      service: Prisma.$ServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      unitId: string | null
      barberId: string
      clientId: string
      serviceId: string
      dateTime: Date
      durationMin: number
      price: number
      status: $Enums.BookingStatus
      origin: $Enums.BookingOrigin
      campaignRef: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["booking"]>
    composites: {}
  }

  type BookingGetPayload<S extends boolean | null | undefined | BookingDefaultArgs> = $Result.GetResult<Prisma.$BookingPayload, S>

  type BookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookingCountAggregateInputType | true
    }

  export interface BookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Booking'], meta: { name: 'Booking' } }
    /**
     * Find zero or one Booking that matches the filter.
     * @param {BookingFindUniqueArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingFindUniqueArgs>(args: SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Booking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookingFindUniqueOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingFindFirstArgs>(args?: SelectSubset<T, BookingFindFirstArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.booking.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.booking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingWithIdOnly = await prisma.booking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingFindManyArgs>(args?: SelectSubset<T, BookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Booking.
     * @param {BookingCreateArgs} args - Arguments to create a Booking.
     * @example
     * // Create one Booking
     * const Booking = await prisma.booking.create({
     *   data: {
     *     // ... data to create a Booking
     *   }
     * })
     * 
     */
    create<T extends BookingCreateArgs>(args: SelectSubset<T, BookingCreateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookings.
     * @param {BookingCreateManyArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingCreateManyArgs>(args?: SelectSubset<T, BookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookings and returns the data saved in the database.
     * @param {BookingCreateManyAndReturnArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookingCreateManyAndReturnArgs>(args?: SelectSubset<T, BookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Booking.
     * @param {BookingDeleteArgs} args - Arguments to delete one Booking.
     * @example
     * // Delete one Booking
     * const Booking = await prisma.booking.delete({
     *   where: {
     *     // ... filter to delete one Booking
     *   }
     * })
     * 
     */
    delete<T extends BookingDeleteArgs>(args: SelectSubset<T, BookingDeleteArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Booking.
     * @param {BookingUpdateArgs} args - Arguments to update one Booking.
     * @example
     * // Update one Booking
     * const booking = await prisma.booking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingUpdateArgs>(args: SelectSubset<T, BookingUpdateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookings.
     * @param {BookingDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.booking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingDeleteManyArgs>(args?: SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingUpdateManyArgs>(args: SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings and returns the data updated in the database.
     * @param {BookingUpdateManyAndReturnArgs} args - Arguments to update many Bookings.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookingUpdateManyAndReturnArgs>(args: SelectSubset<T, BookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Booking.
     * @param {BookingUpsertArgs} args - Arguments to update or create a Booking.
     * @example
     * // Update or create a Booking
     * const booking = await prisma.booking.upsert({
     *   create: {
     *     // ... data to create a Booking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Booking we want to update
     *   }
     * })
     */
    upsert<T extends BookingUpsertArgs>(args: SelectSubset<T, BookingUpsertArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.booking.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends BookingCountArgs>(
      args?: Subset<T, BookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingAggregateArgs>(args: Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>

    /**
     * Group by Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingGroupByArgs['orderBy'] }
        : { orderBy?: BookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Booking model
   */
  readonly fields: BookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Booking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    unit<T extends Booking$unitArgs<ExtArgs> = {}>(args?: Subset<T, Booking$unitArgs<ExtArgs>>): Prisma__UnitClient<$Result.GetResult<Prisma.$UnitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    barber<T extends BarberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BarberDefaultArgs<ExtArgs>>): Prisma__BarberClient<$Result.GetResult<Prisma.$BarberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Booking model
   */
  interface BookingFieldRefs {
    readonly id: FieldRef<"Booking", 'String'>
    readonly tenantId: FieldRef<"Booking", 'String'>
    readonly unitId: FieldRef<"Booking", 'String'>
    readonly barberId: FieldRef<"Booking", 'String'>
    readonly clientId: FieldRef<"Booking", 'String'>
    readonly serviceId: FieldRef<"Booking", 'String'>
    readonly dateTime: FieldRef<"Booking", 'DateTime'>
    readonly durationMin: FieldRef<"Booking", 'Int'>
    readonly price: FieldRef<"Booking", 'Float'>
    readonly status: FieldRef<"Booking", 'BookingStatus'>
    readonly origin: FieldRef<"Booking", 'BookingOrigin'>
    readonly campaignRef: FieldRef<"Booking", 'String'>
    readonly createdAt: FieldRef<"Booking", 'DateTime'>
    readonly updatedAt: FieldRef<"Booking", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Booking findUnique
   */
  export type BookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findUniqueOrThrow
   */
  export type BookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findFirst
   */
  export type BookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findFirstOrThrow
   */
  export type BookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findMany
   */
  export type BookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking create
   */
  export type BookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to create a Booking.
     */
    data: XOR<BookingCreateInput, BookingUncheckedCreateInput>
  }

  /**
   * Booking createMany
   */
  export type BookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Booking createManyAndReturn
   */
  export type BookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking update
   */
  export type BookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to update a Booking.
     */
    data: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
    /**
     * Choose, which Booking to update.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking updateMany
   */
  export type BookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
  }

  /**
   * Booking updateManyAndReturn
   */
  export type BookingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking upsert
   */
  export type BookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The filter to search for the Booking to update in case it exists.
     */
    where: BookingWhereUniqueInput
    /**
     * In case the Booking found by the `where` argument doesn't exist, create a new Booking with this data.
     */
    create: XOR<BookingCreateInput, BookingUncheckedCreateInput>
    /**
     * In case the Booking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
  }

  /**
   * Booking delete
   */
  export type BookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter which Booking to delete.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking deleteMany
   */
  export type BookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookings to delete
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to delete.
     */
    limit?: number
  }

  /**
   * Booking.unit
   */
  export type Booking$unitArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unit
     */
    select?: UnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Unit
     */
    omit?: UnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitInclude<ExtArgs> | null
    where?: UnitWhereInput
  }

  /**
   * Booking without action
   */
  export type BookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    role: 'role',
    tenantId: 'tenantId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TenantScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    phone: 'phone',
    email: 'email',
    address: 'address',
    logo: 'logo',
    colorPrimary: 'colorPrimary',
    colorAccent: 'colorAccent',
    openingHours: 'openingHours',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TenantScalarFieldEnum = (typeof TenantScalarFieldEnum)[keyof typeof TenantScalarFieldEnum]


  export const UnitScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    slug: 'slug',
    address: 'address',
    phone: 'phone',
    active: 'active'
  };

  export type UnitScalarFieldEnum = (typeof UnitScalarFieldEnum)[keyof typeof UnitScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    category: 'category',
    description: 'description',
    price: 'price',
    durationMin: 'durationMin',
    active: 'active',
    sortOrder: 'sortOrder'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const BarberScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    nickname: 'nickname',
    photoUrl: 'photoUrl',
    commissionPct: 'commissionPct',
    active: 'active'
  };

  export type BarberScalarFieldEnum = (typeof BarberScalarFieldEnum)[keyof typeof BarberScalarFieldEnum]


  export const BarberUnitScalarFieldEnum: {
    id: 'id',
    barberId: 'barberId',
    unitId: 'unitId',
    schedule: 'schedule'
  };

  export type BarberUnitScalarFieldEnum = (typeof BarberUnitScalarFieldEnum)[keyof typeof BarberUnitScalarFieldEnum]


  export const BarberBlockScalarFieldEnum: {
    id: 'id',
    barberId: 'barberId',
    startTime: 'startTime',
    endTime: 'endTime',
    reason: 'reason'
  };

  export type BarberBlockScalarFieldEnum = (typeof BarberBlockScalarFieldEnum)[keyof typeof BarberBlockScalarFieldEnum]


  export const ClientScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    phone: 'phone',
    email: 'email',
    totalVisits: 'totalVisits',
    lastVisit: 'lastVisit',
    createdAt: 'createdAt'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const BookingScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    unitId: 'unitId',
    barberId: 'barberId',
    clientId: 'clientId',
    serviceId: 'serviceId',
    dateTime: 'dateTime',
    durationMin: 'durationMin',
    price: 'price',
    status: 'status',
    origin: 'origin',
    campaignRef: 'campaignRef',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'TenantStatus'
   */
  export type EnumTenantStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TenantStatus'>
    


  /**
   * Reference to a field of type 'TenantStatus[]'
   */
  export type ListEnumTenantStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TenantStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ServiceCategory'
   */
  export type EnumServiceCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceCategory'>
    


  /**
   * Reference to a field of type 'ServiceCategory[]'
   */
  export type ListEnumServiceCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceCategory[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BookingStatus'
   */
  export type EnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus'>
    


  /**
   * Reference to a field of type 'BookingStatus[]'
   */
  export type ListEnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus[]'>
    


  /**
   * Reference to a field of type 'BookingOrigin'
   */
  export type EnumBookingOriginFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingOrigin'>
    


  /**
   * Reference to a field of type 'BookingOrigin[]'
   */
  export type ListEnumBookingOriginFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingOrigin[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    tenantId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    tenant?: XOR<TenantNullableScalarRelationFilter, TenantWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    tenantId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    tenantId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    tenant?: XOR<TenantNullableScalarRelationFilter, TenantWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    tenantId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    tenantId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TenantWhereInput = {
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    id?: StringFilter<"Tenant"> | string
    name?: StringFilter<"Tenant"> | string
    slug?: StringFilter<"Tenant"> | string
    phone?: StringNullableFilter<"Tenant"> | string | null
    email?: StringNullableFilter<"Tenant"> | string | null
    address?: JsonNullableFilter<"Tenant">
    logo?: StringNullableFilter<"Tenant"> | string | null
    colorPrimary?: StringFilter<"Tenant"> | string
    colorAccent?: StringFilter<"Tenant"> | string
    openingHours?: JsonNullableFilter<"Tenant">
    status?: EnumTenantStatusFilter<"Tenant"> | $Enums.TenantStatus
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    users?: UserListRelationFilter
    services?: ServiceListRelationFilter
    barbers?: BarberListRelationFilter
    bookings?: BookingListRelationFilter
    clients?: ClientListRelationFilter
    units?: UnitListRelationFilter
  }

  export type TenantOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    colorPrimary?: SortOrder
    colorAccent?: SortOrder
    openingHours?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    services?: ServiceOrderByRelationAggregateInput
    barbers?: BarberOrderByRelationAggregateInput
    bookings?: BookingOrderByRelationAggregateInput
    clients?: ClientOrderByRelationAggregateInput
    units?: UnitOrderByRelationAggregateInput
  }

  export type TenantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    name?: StringFilter<"Tenant"> | string
    phone?: StringNullableFilter<"Tenant"> | string | null
    email?: StringNullableFilter<"Tenant"> | string | null
    address?: JsonNullableFilter<"Tenant">
    logo?: StringNullableFilter<"Tenant"> | string | null
    colorPrimary?: StringFilter<"Tenant"> | string
    colorAccent?: StringFilter<"Tenant"> | string
    openingHours?: JsonNullableFilter<"Tenant">
    status?: EnumTenantStatusFilter<"Tenant"> | $Enums.TenantStatus
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    users?: UserListRelationFilter
    services?: ServiceListRelationFilter
    barbers?: BarberListRelationFilter
    bookings?: BookingListRelationFilter
    clients?: ClientListRelationFilter
    units?: UnitListRelationFilter
  }, "id" | "slug">

  export type TenantOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    colorPrimary?: SortOrder
    colorAccent?: SortOrder
    openingHours?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TenantCountOrderByAggregateInput
    _max?: TenantMaxOrderByAggregateInput
    _min?: TenantMinOrderByAggregateInput
  }

  export type TenantScalarWhereWithAggregatesInput = {
    AND?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    OR?: TenantScalarWhereWithAggregatesInput[]
    NOT?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tenant"> | string
    name?: StringWithAggregatesFilter<"Tenant"> | string
    slug?: StringWithAggregatesFilter<"Tenant"> | string
    phone?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    email?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    address?: JsonNullableWithAggregatesFilter<"Tenant">
    logo?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    colorPrimary?: StringWithAggregatesFilter<"Tenant"> | string
    colorAccent?: StringWithAggregatesFilter<"Tenant"> | string
    openingHours?: JsonNullableWithAggregatesFilter<"Tenant">
    status?: EnumTenantStatusWithAggregatesFilter<"Tenant"> | $Enums.TenantStatus
    createdAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
  }

  export type UnitWhereInput = {
    AND?: UnitWhereInput | UnitWhereInput[]
    OR?: UnitWhereInput[]
    NOT?: UnitWhereInput | UnitWhereInput[]
    id?: StringFilter<"Unit"> | string
    tenantId?: StringFilter<"Unit"> | string
    name?: StringFilter<"Unit"> | string
    slug?: StringFilter<"Unit"> | string
    address?: JsonNullableFilter<"Unit">
    phone?: StringNullableFilter<"Unit"> | string | null
    active?: BoolFilter<"Unit"> | boolean
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    barberUnits?: BarberUnitListRelationFilter
    bookings?: BookingListRelationFilter
  }

  export type UnitOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    active?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    barberUnits?: BarberUnitOrderByRelationAggregateInput
    bookings?: BookingOrderByRelationAggregateInput
  }

  export type UnitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_slug?: UnitTenantIdSlugCompoundUniqueInput
    AND?: UnitWhereInput | UnitWhereInput[]
    OR?: UnitWhereInput[]
    NOT?: UnitWhereInput | UnitWhereInput[]
    tenantId?: StringFilter<"Unit"> | string
    name?: StringFilter<"Unit"> | string
    slug?: StringFilter<"Unit"> | string
    address?: JsonNullableFilter<"Unit">
    phone?: StringNullableFilter<"Unit"> | string | null
    active?: BoolFilter<"Unit"> | boolean
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    barberUnits?: BarberUnitListRelationFilter
    bookings?: BookingListRelationFilter
  }, "id" | "tenantId_slug">

  export type UnitOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    active?: SortOrder
    _count?: UnitCountOrderByAggregateInput
    _max?: UnitMaxOrderByAggregateInput
    _min?: UnitMinOrderByAggregateInput
  }

  export type UnitScalarWhereWithAggregatesInput = {
    AND?: UnitScalarWhereWithAggregatesInput | UnitScalarWhereWithAggregatesInput[]
    OR?: UnitScalarWhereWithAggregatesInput[]
    NOT?: UnitScalarWhereWithAggregatesInput | UnitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Unit"> | string
    tenantId?: StringWithAggregatesFilter<"Unit"> | string
    name?: StringWithAggregatesFilter<"Unit"> | string
    slug?: StringWithAggregatesFilter<"Unit"> | string
    address?: JsonNullableWithAggregatesFilter<"Unit">
    phone?: StringNullableWithAggregatesFilter<"Unit"> | string | null
    active?: BoolWithAggregatesFilter<"Unit"> | boolean
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: StringFilter<"Service"> | string
    tenantId?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    category?: EnumServiceCategoryFilter<"Service"> | $Enums.ServiceCategory
    description?: StringNullableFilter<"Service"> | string | null
    price?: FloatFilter<"Service"> | number
    durationMin?: IntFilter<"Service"> | number
    active?: BoolFilter<"Service"> | boolean
    sortOrder?: IntFilter<"Service"> | number
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    bookings?: BookingListRelationFilter
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    durationMin?: SortOrder
    active?: SortOrder
    sortOrder?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    bookings?: BookingOrderByRelationAggregateInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    tenantId?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    category?: EnumServiceCategoryFilter<"Service"> | $Enums.ServiceCategory
    description?: StringNullableFilter<"Service"> | string | null
    price?: FloatFilter<"Service"> | number
    durationMin?: IntFilter<"Service"> | number
    active?: BoolFilter<"Service"> | boolean
    sortOrder?: IntFilter<"Service"> | number
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    bookings?: BookingListRelationFilter
  }, "id">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    durationMin?: SortOrder
    active?: SortOrder
    sortOrder?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Service"> | string
    tenantId?: StringWithAggregatesFilter<"Service"> | string
    name?: StringWithAggregatesFilter<"Service"> | string
    category?: EnumServiceCategoryWithAggregatesFilter<"Service"> | $Enums.ServiceCategory
    description?: StringNullableWithAggregatesFilter<"Service"> | string | null
    price?: FloatWithAggregatesFilter<"Service"> | number
    durationMin?: IntWithAggregatesFilter<"Service"> | number
    active?: BoolWithAggregatesFilter<"Service"> | boolean
    sortOrder?: IntWithAggregatesFilter<"Service"> | number
  }

  export type BarberWhereInput = {
    AND?: BarberWhereInput | BarberWhereInput[]
    OR?: BarberWhereInput[]
    NOT?: BarberWhereInput | BarberWhereInput[]
    id?: StringFilter<"Barber"> | string
    tenantId?: StringFilter<"Barber"> | string
    name?: StringFilter<"Barber"> | string
    nickname?: StringNullableFilter<"Barber"> | string | null
    photoUrl?: StringNullableFilter<"Barber"> | string | null
    commissionPct?: FloatFilter<"Barber"> | number
    active?: BoolFilter<"Barber"> | boolean
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    units?: BarberUnitListRelationFilter
    bookings?: BookingListRelationFilter
    blocks?: BarberBlockListRelationFilter
  }

  export type BarberOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    nickname?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    commissionPct?: SortOrder
    active?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    units?: BarberUnitOrderByRelationAggregateInput
    bookings?: BookingOrderByRelationAggregateInput
    blocks?: BarberBlockOrderByRelationAggregateInput
  }

  export type BarberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BarberWhereInput | BarberWhereInput[]
    OR?: BarberWhereInput[]
    NOT?: BarberWhereInput | BarberWhereInput[]
    tenantId?: StringFilter<"Barber"> | string
    name?: StringFilter<"Barber"> | string
    nickname?: StringNullableFilter<"Barber"> | string | null
    photoUrl?: StringNullableFilter<"Barber"> | string | null
    commissionPct?: FloatFilter<"Barber"> | number
    active?: BoolFilter<"Barber"> | boolean
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    units?: BarberUnitListRelationFilter
    bookings?: BookingListRelationFilter
    blocks?: BarberBlockListRelationFilter
  }, "id">

  export type BarberOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    nickname?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    commissionPct?: SortOrder
    active?: SortOrder
    _count?: BarberCountOrderByAggregateInput
    _avg?: BarberAvgOrderByAggregateInput
    _max?: BarberMaxOrderByAggregateInput
    _min?: BarberMinOrderByAggregateInput
    _sum?: BarberSumOrderByAggregateInput
  }

  export type BarberScalarWhereWithAggregatesInput = {
    AND?: BarberScalarWhereWithAggregatesInput | BarberScalarWhereWithAggregatesInput[]
    OR?: BarberScalarWhereWithAggregatesInput[]
    NOT?: BarberScalarWhereWithAggregatesInput | BarberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Barber"> | string
    tenantId?: StringWithAggregatesFilter<"Barber"> | string
    name?: StringWithAggregatesFilter<"Barber"> | string
    nickname?: StringNullableWithAggregatesFilter<"Barber"> | string | null
    photoUrl?: StringNullableWithAggregatesFilter<"Barber"> | string | null
    commissionPct?: FloatWithAggregatesFilter<"Barber"> | number
    active?: BoolWithAggregatesFilter<"Barber"> | boolean
  }

  export type BarberUnitWhereInput = {
    AND?: BarberUnitWhereInput | BarberUnitWhereInput[]
    OR?: BarberUnitWhereInput[]
    NOT?: BarberUnitWhereInput | BarberUnitWhereInput[]
    id?: StringFilter<"BarberUnit"> | string
    barberId?: StringFilter<"BarberUnit"> | string
    unitId?: StringFilter<"BarberUnit"> | string
    schedule?: JsonFilter<"BarberUnit">
    barber?: XOR<BarberScalarRelationFilter, BarberWhereInput>
    unit?: XOR<UnitScalarRelationFilter, UnitWhereInput>
  }

  export type BarberUnitOrderByWithRelationInput = {
    id?: SortOrder
    barberId?: SortOrder
    unitId?: SortOrder
    schedule?: SortOrder
    barber?: BarberOrderByWithRelationInput
    unit?: UnitOrderByWithRelationInput
  }

  export type BarberUnitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    barberId_unitId?: BarberUnitBarberIdUnitIdCompoundUniqueInput
    AND?: BarberUnitWhereInput | BarberUnitWhereInput[]
    OR?: BarberUnitWhereInput[]
    NOT?: BarberUnitWhereInput | BarberUnitWhereInput[]
    barberId?: StringFilter<"BarberUnit"> | string
    unitId?: StringFilter<"BarberUnit"> | string
    schedule?: JsonFilter<"BarberUnit">
    barber?: XOR<BarberScalarRelationFilter, BarberWhereInput>
    unit?: XOR<UnitScalarRelationFilter, UnitWhereInput>
  }, "id" | "barberId_unitId">

  export type BarberUnitOrderByWithAggregationInput = {
    id?: SortOrder
    barberId?: SortOrder
    unitId?: SortOrder
    schedule?: SortOrder
    _count?: BarberUnitCountOrderByAggregateInput
    _max?: BarberUnitMaxOrderByAggregateInput
    _min?: BarberUnitMinOrderByAggregateInput
  }

  export type BarberUnitScalarWhereWithAggregatesInput = {
    AND?: BarberUnitScalarWhereWithAggregatesInput | BarberUnitScalarWhereWithAggregatesInput[]
    OR?: BarberUnitScalarWhereWithAggregatesInput[]
    NOT?: BarberUnitScalarWhereWithAggregatesInput | BarberUnitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BarberUnit"> | string
    barberId?: StringWithAggregatesFilter<"BarberUnit"> | string
    unitId?: StringWithAggregatesFilter<"BarberUnit"> | string
    schedule?: JsonWithAggregatesFilter<"BarberUnit">
  }

  export type BarberBlockWhereInput = {
    AND?: BarberBlockWhereInput | BarberBlockWhereInput[]
    OR?: BarberBlockWhereInput[]
    NOT?: BarberBlockWhereInput | BarberBlockWhereInput[]
    id?: StringFilter<"BarberBlock"> | string
    barberId?: StringFilter<"BarberBlock"> | string
    startTime?: DateTimeFilter<"BarberBlock"> | Date | string
    endTime?: DateTimeFilter<"BarberBlock"> | Date | string
    reason?: StringNullableFilter<"BarberBlock"> | string | null
    barber?: XOR<BarberScalarRelationFilter, BarberWhereInput>
  }

  export type BarberBlockOrderByWithRelationInput = {
    id?: SortOrder
    barberId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    reason?: SortOrderInput | SortOrder
    barber?: BarberOrderByWithRelationInput
  }

  export type BarberBlockWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BarberBlockWhereInput | BarberBlockWhereInput[]
    OR?: BarberBlockWhereInput[]
    NOT?: BarberBlockWhereInput | BarberBlockWhereInput[]
    barberId?: StringFilter<"BarberBlock"> | string
    startTime?: DateTimeFilter<"BarberBlock"> | Date | string
    endTime?: DateTimeFilter<"BarberBlock"> | Date | string
    reason?: StringNullableFilter<"BarberBlock"> | string | null
    barber?: XOR<BarberScalarRelationFilter, BarberWhereInput>
  }, "id">

  export type BarberBlockOrderByWithAggregationInput = {
    id?: SortOrder
    barberId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    reason?: SortOrderInput | SortOrder
    _count?: BarberBlockCountOrderByAggregateInput
    _max?: BarberBlockMaxOrderByAggregateInput
    _min?: BarberBlockMinOrderByAggregateInput
  }

  export type BarberBlockScalarWhereWithAggregatesInput = {
    AND?: BarberBlockScalarWhereWithAggregatesInput | BarberBlockScalarWhereWithAggregatesInput[]
    OR?: BarberBlockScalarWhereWithAggregatesInput[]
    NOT?: BarberBlockScalarWhereWithAggregatesInput | BarberBlockScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BarberBlock"> | string
    barberId?: StringWithAggregatesFilter<"BarberBlock"> | string
    startTime?: DateTimeWithAggregatesFilter<"BarberBlock"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"BarberBlock"> | Date | string
    reason?: StringNullableWithAggregatesFilter<"BarberBlock"> | string | null
  }

  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    id?: StringFilter<"Client"> | string
    tenantId?: StringFilter<"Client"> | string
    name?: StringFilter<"Client"> | string
    phone?: StringFilter<"Client"> | string
    email?: StringNullableFilter<"Client"> | string | null
    totalVisits?: IntFilter<"Client"> | number
    lastVisit?: DateTimeNullableFilter<"Client"> | Date | string | null
    createdAt?: DateTimeFilter<"Client"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    bookings?: BookingListRelationFilter
  }

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    totalVisits?: SortOrder
    lastVisit?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    bookings?: BookingOrderByRelationAggregateInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_phone?: ClientTenantIdPhoneCompoundUniqueInput
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    tenantId?: StringFilter<"Client"> | string
    name?: StringFilter<"Client"> | string
    phone?: StringFilter<"Client"> | string
    email?: StringNullableFilter<"Client"> | string | null
    totalVisits?: IntFilter<"Client"> | number
    lastVisit?: DateTimeNullableFilter<"Client"> | Date | string | null
    createdAt?: DateTimeFilter<"Client"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    bookings?: BookingListRelationFilter
  }, "id" | "tenantId_phone">

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    totalVisits?: SortOrder
    lastVisit?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ClientCountOrderByAggregateInput
    _avg?: ClientAvgOrderByAggregateInput
    _max?: ClientMaxOrderByAggregateInput
    _min?: ClientMinOrderByAggregateInput
    _sum?: ClientSumOrderByAggregateInput
  }

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    OR?: ClientScalarWhereWithAggregatesInput[]
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Client"> | string
    tenantId?: StringWithAggregatesFilter<"Client"> | string
    name?: StringWithAggregatesFilter<"Client"> | string
    phone?: StringWithAggregatesFilter<"Client"> | string
    email?: StringNullableWithAggregatesFilter<"Client"> | string | null
    totalVisits?: IntWithAggregatesFilter<"Client"> | number
    lastVisit?: DateTimeNullableWithAggregatesFilter<"Client"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
  }

  export type BookingWhereInput = {
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    id?: StringFilter<"Booking"> | string
    tenantId?: StringFilter<"Booking"> | string
    unitId?: StringNullableFilter<"Booking"> | string | null
    barberId?: StringFilter<"Booking"> | string
    clientId?: StringFilter<"Booking"> | string
    serviceId?: StringFilter<"Booking"> | string
    dateTime?: DateTimeFilter<"Booking"> | Date | string
    durationMin?: IntFilter<"Booking"> | number
    price?: FloatFilter<"Booking"> | number
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    origin?: EnumBookingOriginFilter<"Booking"> | $Enums.BookingOrigin
    campaignRef?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    unit?: XOR<UnitNullableScalarRelationFilter, UnitWhereInput> | null
    barber?: XOR<BarberScalarRelationFilter, BarberWhereInput>
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }

  export type BookingOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    unitId?: SortOrderInput | SortOrder
    barberId?: SortOrder
    clientId?: SortOrder
    serviceId?: SortOrder
    dateTime?: SortOrder
    durationMin?: SortOrder
    price?: SortOrder
    status?: SortOrder
    origin?: SortOrder
    campaignRef?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    unit?: UnitOrderByWithRelationInput
    barber?: BarberOrderByWithRelationInput
    client?: ClientOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
  }

  export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    tenantId?: StringFilter<"Booking"> | string
    unitId?: StringNullableFilter<"Booking"> | string | null
    barberId?: StringFilter<"Booking"> | string
    clientId?: StringFilter<"Booking"> | string
    serviceId?: StringFilter<"Booking"> | string
    dateTime?: DateTimeFilter<"Booking"> | Date | string
    durationMin?: IntFilter<"Booking"> | number
    price?: FloatFilter<"Booking"> | number
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    origin?: EnumBookingOriginFilter<"Booking"> | $Enums.BookingOrigin
    campaignRef?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    unit?: XOR<UnitNullableScalarRelationFilter, UnitWhereInput> | null
    barber?: XOR<BarberScalarRelationFilter, BarberWhereInput>
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }, "id">

  export type BookingOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    unitId?: SortOrderInput | SortOrder
    barberId?: SortOrder
    clientId?: SortOrder
    serviceId?: SortOrder
    dateTime?: SortOrder
    durationMin?: SortOrder
    price?: SortOrder
    status?: SortOrder
    origin?: SortOrder
    campaignRef?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BookingCountOrderByAggregateInput
    _avg?: BookingAvgOrderByAggregateInput
    _max?: BookingMaxOrderByAggregateInput
    _min?: BookingMinOrderByAggregateInput
    _sum?: BookingSumOrderByAggregateInput
  }

  export type BookingScalarWhereWithAggregatesInput = {
    AND?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    OR?: BookingScalarWhereWithAggregatesInput[]
    NOT?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Booking"> | string
    tenantId?: StringWithAggregatesFilter<"Booking"> | string
    unitId?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    barberId?: StringWithAggregatesFilter<"Booking"> | string
    clientId?: StringWithAggregatesFilter<"Booking"> | string
    serviceId?: StringWithAggregatesFilter<"Booking"> | string
    dateTime?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    durationMin?: IntWithAggregatesFilter<"Booking"> | number
    price?: FloatWithAggregatesFilter<"Booking"> | number
    status?: EnumBookingStatusWithAggregatesFilter<"Booking"> | $Enums.BookingStatus
    origin?: EnumBookingOriginWithAggregatesFilter<"Booking"> | $Enums.BookingOrigin
    campaignRef?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant?: TenantCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.Role
    tenantId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.Role
    tenantId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantCreateInput = {
    id?: string
    name: string
    slug: string
    phone?: string | null
    email?: string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: string | null
    colorPrimary?: string
    colorAccent?: string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.TenantStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutTenantInput
    services?: ServiceCreateNestedManyWithoutTenantInput
    barbers?: BarberCreateNestedManyWithoutTenantInput
    bookings?: BookingCreateNestedManyWithoutTenantInput
    clients?: ClientCreateNestedManyWithoutTenantInput
    units?: UnitCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    phone?: string | null
    email?: string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: string | null
    colorPrimary?: string
    colorAccent?: string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.TenantStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    services?: ServiceUncheckedCreateNestedManyWithoutTenantInput
    barbers?: BarberUncheckedCreateNestedManyWithoutTenantInput
    bookings?: BookingUncheckedCreateNestedManyWithoutTenantInput
    clients?: ClientUncheckedCreateNestedManyWithoutTenantInput
    units?: UnitUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    colorPrimary?: StringFieldUpdateOperationsInput | string
    colorAccent?: StringFieldUpdateOperationsInput | string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutTenantNestedInput
    services?: ServiceUpdateManyWithoutTenantNestedInput
    barbers?: BarberUpdateManyWithoutTenantNestedInput
    bookings?: BookingUpdateManyWithoutTenantNestedInput
    clients?: ClientUpdateManyWithoutTenantNestedInput
    units?: UnitUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    colorPrimary?: StringFieldUpdateOperationsInput | string
    colorAccent?: StringFieldUpdateOperationsInput | string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    services?: ServiceUncheckedUpdateManyWithoutTenantNestedInput
    barbers?: BarberUncheckedUpdateManyWithoutTenantNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutTenantNestedInput
    clients?: ClientUncheckedUpdateManyWithoutTenantNestedInput
    units?: UnitUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateManyInput = {
    id?: string
    name: string
    slug: string
    phone?: string | null
    email?: string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: string | null
    colorPrimary?: string
    colorAccent?: string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.TenantStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    colorPrimary?: StringFieldUpdateOperationsInput | string
    colorAccent?: StringFieldUpdateOperationsInput | string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    colorPrimary?: StringFieldUpdateOperationsInput | string
    colorAccent?: StringFieldUpdateOperationsInput | string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UnitCreateInput = {
    id?: string
    name: string
    slug: string
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: string | null
    active?: boolean
    tenant: TenantCreateNestedOneWithoutUnitsInput
    barberUnits?: BarberUnitCreateNestedManyWithoutUnitInput
    bookings?: BookingCreateNestedManyWithoutUnitInput
  }

  export type UnitUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    slug: string
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: string | null
    active?: boolean
    barberUnits?: BarberUnitUncheckedCreateNestedManyWithoutUnitInput
    bookings?: BookingUncheckedCreateNestedManyWithoutUnitInput
  }

  export type UnitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    tenant?: TenantUpdateOneRequiredWithoutUnitsNestedInput
    barberUnits?: BarberUnitUpdateManyWithoutUnitNestedInput
    bookings?: BookingUpdateManyWithoutUnitNestedInput
  }

  export type UnitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    barberUnits?: BarberUnitUncheckedUpdateManyWithoutUnitNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutUnitNestedInput
  }

  export type UnitCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    slug: string
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: string | null
    active?: boolean
  }

  export type UnitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UnitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ServiceCreateInput = {
    id?: string
    name: string
    category: $Enums.ServiceCategory
    description?: string | null
    price: number
    durationMin: number
    active?: boolean
    sortOrder?: number
    tenant: TenantCreateNestedOneWithoutServicesInput
    bookings?: BookingCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    category: $Enums.ServiceCategory
    description?: string | null
    price: number
    durationMin: number
    active?: boolean
    sortOrder?: number
    bookings?: BookingUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumServiceCategoryFieldUpdateOperationsInput | $Enums.ServiceCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    durationMin?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    tenant?: TenantUpdateOneRequiredWithoutServicesNestedInput
    bookings?: BookingUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumServiceCategoryFieldUpdateOperationsInput | $Enums.ServiceCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    durationMin?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    bookings?: BookingUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    category: $Enums.ServiceCategory
    description?: string | null
    price: number
    durationMin: number
    active?: boolean
    sortOrder?: number
  }

  export type ServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumServiceCategoryFieldUpdateOperationsInput | $Enums.ServiceCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    durationMin?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumServiceCategoryFieldUpdateOperationsInput | $Enums.ServiceCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    durationMin?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type BarberCreateInput = {
    id?: string
    name: string
    nickname?: string | null
    photoUrl?: string | null
    commissionPct?: number
    active?: boolean
    tenant: TenantCreateNestedOneWithoutBarbersInput
    units?: BarberUnitCreateNestedManyWithoutBarberInput
    bookings?: BookingCreateNestedManyWithoutBarberInput
    blocks?: BarberBlockCreateNestedManyWithoutBarberInput
  }

  export type BarberUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    nickname?: string | null
    photoUrl?: string | null
    commissionPct?: number
    active?: boolean
    units?: BarberUnitUncheckedCreateNestedManyWithoutBarberInput
    bookings?: BookingUncheckedCreateNestedManyWithoutBarberInput
    blocks?: BarberBlockUncheckedCreateNestedManyWithoutBarberInput
  }

  export type BarberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    commissionPct?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    tenant?: TenantUpdateOneRequiredWithoutBarbersNestedInput
    units?: BarberUnitUpdateManyWithoutBarberNestedInput
    bookings?: BookingUpdateManyWithoutBarberNestedInput
    blocks?: BarberBlockUpdateManyWithoutBarberNestedInput
  }

  export type BarberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    commissionPct?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    units?: BarberUnitUncheckedUpdateManyWithoutBarberNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutBarberNestedInput
    blocks?: BarberBlockUncheckedUpdateManyWithoutBarberNestedInput
  }

  export type BarberCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    nickname?: string | null
    photoUrl?: string | null
    commissionPct?: number
    active?: boolean
  }

  export type BarberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    commissionPct?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BarberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    commissionPct?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BarberUnitCreateInput = {
    id?: string
    schedule: JsonNullValueInput | InputJsonValue
    barber: BarberCreateNestedOneWithoutUnitsInput
    unit: UnitCreateNestedOneWithoutBarberUnitsInput
  }

  export type BarberUnitUncheckedCreateInput = {
    id?: string
    barberId: string
    unitId: string
    schedule: JsonNullValueInput | InputJsonValue
  }

  export type BarberUnitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    schedule?: JsonNullValueInput | InputJsonValue
    barber?: BarberUpdateOneRequiredWithoutUnitsNestedInput
    unit?: UnitUpdateOneRequiredWithoutBarberUnitsNestedInput
  }

  export type BarberUnitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    schedule?: JsonNullValueInput | InputJsonValue
  }

  export type BarberUnitCreateManyInput = {
    id?: string
    barberId: string
    unitId: string
    schedule: JsonNullValueInput | InputJsonValue
  }

  export type BarberUnitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    schedule?: JsonNullValueInput | InputJsonValue
  }

  export type BarberUnitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    schedule?: JsonNullValueInput | InputJsonValue
  }

  export type BarberBlockCreateInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    reason?: string | null
    barber: BarberCreateNestedOneWithoutBlocksInput
  }

  export type BarberBlockUncheckedCreateInput = {
    id?: string
    barberId: string
    startTime: Date | string
    endTime: Date | string
    reason?: string | null
  }

  export type BarberBlockUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    barber?: BarberUpdateOneRequiredWithoutBlocksNestedInput
  }

  export type BarberBlockUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BarberBlockCreateManyInput = {
    id?: string
    barberId: string
    startTime: Date | string
    endTime: Date | string
    reason?: string | null
  }

  export type BarberBlockUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BarberBlockUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClientCreateInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    totalVisits?: number
    lastVisit?: Date | string | null
    createdAt?: Date | string
    tenant: TenantCreateNestedOneWithoutClientsInput
    bookings?: BookingCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    phone: string
    email?: string | null
    totalVisits?: number
    lastVisit?: Date | string | null
    createdAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    lastVisit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutClientsNestedInput
    bookings?: BookingUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    lastVisit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    phone: string
    email?: string | null
    totalVisits?: number
    lastVisit?: Date | string | null
    createdAt?: Date | string
  }

  export type ClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    lastVisit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    lastVisit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateInput = {
    id?: string
    dateTime: Date | string
    durationMin: number
    price: number
    status?: $Enums.BookingStatus
    origin?: $Enums.BookingOrigin
    campaignRef?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutBookingsInput
    unit?: UnitCreateNestedOneWithoutBookingsInput
    barber: BarberCreateNestedOneWithoutBookingsInput
    client: ClientCreateNestedOneWithoutBookingsInput
    service: ServiceCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateInput = {
    id?: string
    tenantId: string
    unitId?: string | null
    barberId: string
    clientId: string
    serviceId: string
    dateTime: Date | string
    durationMin: number
    price: number
    status?: $Enums.BookingStatus
    origin?: $Enums.BookingOrigin
    campaignRef?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    origin?: EnumBookingOriginFieldUpdateOperationsInput | $Enums.BookingOrigin
    campaignRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutBookingsNestedInput
    unit?: UnitUpdateOneWithoutBookingsNestedInput
    barber?: BarberUpdateOneRequiredWithoutBookingsNestedInput
    client?: ClientUpdateOneRequiredWithoutBookingsNestedInput
    service?: ServiceUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    unitId?: NullableStringFieldUpdateOperationsInput | string | null
    barberId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    dateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    origin?: EnumBookingOriginFieldUpdateOperationsInput | $Enums.BookingOrigin
    campaignRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateManyInput = {
    id?: string
    tenantId: string
    unitId?: string | null
    barberId: string
    clientId: string
    serviceId: string
    dateTime: Date | string
    durationMin: number
    price: number
    status?: $Enums.BookingStatus
    origin?: $Enums.BookingOrigin
    campaignRef?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    origin?: EnumBookingOriginFieldUpdateOperationsInput | $Enums.BookingOrigin
    campaignRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    unitId?: NullableStringFieldUpdateOperationsInput | string | null
    barberId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    dateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    origin?: EnumBookingOriginFieldUpdateOperationsInput | $Enums.BookingOrigin
    campaignRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TenantNullableScalarRelationFilter = {
    is?: TenantWhereInput | null
    isNot?: TenantWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumTenantStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TenantStatus | EnumTenantStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTenantStatusFilter<$PrismaModel> | $Enums.TenantStatus
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type ServiceListRelationFilter = {
    every?: ServiceWhereInput
    some?: ServiceWhereInput
    none?: ServiceWhereInput
  }

  export type BarberListRelationFilter = {
    every?: BarberWhereInput
    some?: BarberWhereInput
    none?: BarberWhereInput
  }

  export type BookingListRelationFilter = {
    every?: BookingWhereInput
    some?: BookingWhereInput
    none?: BookingWhereInput
  }

  export type ClientListRelationFilter = {
    every?: ClientWhereInput
    some?: ClientWhereInput
    none?: ClientWhereInput
  }

  export type UnitListRelationFilter = {
    every?: UnitWhereInput
    some?: UnitWhereInput
    none?: UnitWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BarberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UnitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TenantCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    logo?: SortOrder
    colorPrimary?: SortOrder
    colorAccent?: SortOrder
    openingHours?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    logo?: SortOrder
    colorPrimary?: SortOrder
    colorAccent?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    logo?: SortOrder
    colorPrimary?: SortOrder
    colorAccent?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumTenantStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TenantStatus | EnumTenantStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTenantStatusWithAggregatesFilter<$PrismaModel> | $Enums.TenantStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTenantStatusFilter<$PrismaModel>
    _max?: NestedEnumTenantStatusFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TenantScalarRelationFilter = {
    is?: TenantWhereInput
    isNot?: TenantWhereInput
  }

  export type BarberUnitListRelationFilter = {
    every?: BarberUnitWhereInput
    some?: BarberUnitWhereInput
    none?: BarberUnitWhereInput
  }

  export type BarberUnitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UnitTenantIdSlugCompoundUniqueInput = {
    tenantId: string
    slug: string
  }

  export type UnitCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    active?: SortOrder
  }

  export type UnitMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    phone?: SortOrder
    active?: SortOrder
  }

  export type UnitMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    phone?: SortOrder
    active?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumServiceCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceCategory | EnumServiceCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceCategory[] | ListEnumServiceCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceCategory[] | ListEnumServiceCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceCategoryFilter<$PrismaModel> | $Enums.ServiceCategory
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    price?: SortOrder
    durationMin?: SortOrder
    active?: SortOrder
    sortOrder?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    price?: SortOrder
    durationMin?: SortOrder
    sortOrder?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    price?: SortOrder
    durationMin?: SortOrder
    active?: SortOrder
    sortOrder?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    price?: SortOrder
    durationMin?: SortOrder
    active?: SortOrder
    sortOrder?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    price?: SortOrder
    durationMin?: SortOrder
    sortOrder?: SortOrder
  }

  export type EnumServiceCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceCategory | EnumServiceCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceCategory[] | ListEnumServiceCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceCategory[] | ListEnumServiceCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceCategoryWithAggregatesFilter<$PrismaModel> | $Enums.ServiceCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceCategoryFilter<$PrismaModel>
    _max?: NestedEnumServiceCategoryFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BarberBlockListRelationFilter = {
    every?: BarberBlockWhereInput
    some?: BarberBlockWhereInput
    none?: BarberBlockWhereInput
  }

  export type BarberBlockOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BarberCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    nickname?: SortOrder
    photoUrl?: SortOrder
    commissionPct?: SortOrder
    active?: SortOrder
  }

  export type BarberAvgOrderByAggregateInput = {
    commissionPct?: SortOrder
  }

  export type BarberMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    nickname?: SortOrder
    photoUrl?: SortOrder
    commissionPct?: SortOrder
    active?: SortOrder
  }

  export type BarberMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    nickname?: SortOrder
    photoUrl?: SortOrder
    commissionPct?: SortOrder
    active?: SortOrder
  }

  export type BarberSumOrderByAggregateInput = {
    commissionPct?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BarberScalarRelationFilter = {
    is?: BarberWhereInput
    isNot?: BarberWhereInput
  }

  export type UnitScalarRelationFilter = {
    is?: UnitWhereInput
    isNot?: UnitWhereInput
  }

  export type BarberUnitBarberIdUnitIdCompoundUniqueInput = {
    barberId: string
    unitId: string
  }

  export type BarberUnitCountOrderByAggregateInput = {
    id?: SortOrder
    barberId?: SortOrder
    unitId?: SortOrder
    schedule?: SortOrder
  }

  export type BarberUnitMaxOrderByAggregateInput = {
    id?: SortOrder
    barberId?: SortOrder
    unitId?: SortOrder
  }

  export type BarberUnitMinOrderByAggregateInput = {
    id?: SortOrder
    barberId?: SortOrder
    unitId?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BarberBlockCountOrderByAggregateInput = {
    id?: SortOrder
    barberId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    reason?: SortOrder
  }

  export type BarberBlockMaxOrderByAggregateInput = {
    id?: SortOrder
    barberId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    reason?: SortOrder
  }

  export type BarberBlockMinOrderByAggregateInput = {
    id?: SortOrder
    barberId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    reason?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ClientTenantIdPhoneCompoundUniqueInput = {
    tenantId: string
    phone: string
  }

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    totalVisits?: SortOrder
    lastVisit?: SortOrder
    createdAt?: SortOrder
  }

  export type ClientAvgOrderByAggregateInput = {
    totalVisits?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    totalVisits?: SortOrder
    lastVisit?: SortOrder
    createdAt?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    totalVisits?: SortOrder
    lastVisit?: SortOrder
    createdAt?: SortOrder
  }

  export type ClientSumOrderByAggregateInput = {
    totalVisits?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type EnumBookingOriginFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingOrigin | EnumBookingOriginFieldRefInput<$PrismaModel>
    in?: $Enums.BookingOrigin[] | ListEnumBookingOriginFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingOrigin[] | ListEnumBookingOriginFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingOriginFilter<$PrismaModel> | $Enums.BookingOrigin
  }

  export type UnitNullableScalarRelationFilter = {
    is?: UnitWhereInput | null
    isNot?: UnitWhereInput | null
  }

  export type ClientScalarRelationFilter = {
    is?: ClientWhereInput
    isNot?: ClientWhereInput
  }

  export type ServiceScalarRelationFilter = {
    is?: ServiceWhereInput
    isNot?: ServiceWhereInput
  }

  export type BookingCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    unitId?: SortOrder
    barberId?: SortOrder
    clientId?: SortOrder
    serviceId?: SortOrder
    dateTime?: SortOrder
    durationMin?: SortOrder
    price?: SortOrder
    status?: SortOrder
    origin?: SortOrder
    campaignRef?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingAvgOrderByAggregateInput = {
    durationMin?: SortOrder
    price?: SortOrder
  }

  export type BookingMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    unitId?: SortOrder
    barberId?: SortOrder
    clientId?: SortOrder
    serviceId?: SortOrder
    dateTime?: SortOrder
    durationMin?: SortOrder
    price?: SortOrder
    status?: SortOrder
    origin?: SortOrder
    campaignRef?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    unitId?: SortOrder
    barberId?: SortOrder
    clientId?: SortOrder
    serviceId?: SortOrder
    dateTime?: SortOrder
    durationMin?: SortOrder
    price?: SortOrder
    status?: SortOrder
    origin?: SortOrder
    campaignRef?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingSumOrderByAggregateInput = {
    durationMin?: SortOrder
    price?: SortOrder
  }

  export type EnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type EnumBookingOriginWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingOrigin | EnumBookingOriginFieldRefInput<$PrismaModel>
    in?: $Enums.BookingOrigin[] | ListEnumBookingOriginFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingOrigin[] | ListEnumBookingOriginFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingOriginWithAggregatesFilter<$PrismaModel> | $Enums.BookingOrigin
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingOriginFilter<$PrismaModel>
    _max?: NestedEnumBookingOriginFilter<$PrismaModel>
  }

  export type TenantCreateNestedOneWithoutUsersInput = {
    create?: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>
    connectOrCreate?: TenantCreateOrConnectWithoutUsersInput
    connect?: TenantWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TenantUpdateOneWithoutUsersNestedInput = {
    create?: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>
    connectOrCreate?: TenantCreateOrConnectWithoutUsersInput
    upsert?: TenantUpsertWithoutUsersInput
    disconnect?: TenantWhereInput | boolean
    delete?: TenantWhereInput | boolean
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutUsersInput, TenantUpdateWithoutUsersInput>, TenantUncheckedUpdateWithoutUsersInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserCreateNestedManyWithoutTenantInput = {
    create?: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput> | UserCreateWithoutTenantInput[] | UserUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTenantInput | UserCreateOrConnectWithoutTenantInput[]
    createMany?: UserCreateManyTenantInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ServiceCreateNestedManyWithoutTenantInput = {
    create?: XOR<ServiceCreateWithoutTenantInput, ServiceUncheckedCreateWithoutTenantInput> | ServiceCreateWithoutTenantInput[] | ServiceUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutTenantInput | ServiceCreateOrConnectWithoutTenantInput[]
    createMany?: ServiceCreateManyTenantInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type BarberCreateNestedManyWithoutTenantInput = {
    create?: XOR<BarberCreateWithoutTenantInput, BarberUncheckedCreateWithoutTenantInput> | BarberCreateWithoutTenantInput[] | BarberUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: BarberCreateOrConnectWithoutTenantInput | BarberCreateOrConnectWithoutTenantInput[]
    createMany?: BarberCreateManyTenantInputEnvelope
    connect?: BarberWhereUniqueInput | BarberWhereUniqueInput[]
  }

  export type BookingCreateNestedManyWithoutTenantInput = {
    create?: XOR<BookingCreateWithoutTenantInput, BookingUncheckedCreateWithoutTenantInput> | BookingCreateWithoutTenantInput[] | BookingUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutTenantInput | BookingCreateOrConnectWithoutTenantInput[]
    createMany?: BookingCreateManyTenantInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type ClientCreateNestedManyWithoutTenantInput = {
    create?: XOR<ClientCreateWithoutTenantInput, ClientUncheckedCreateWithoutTenantInput> | ClientCreateWithoutTenantInput[] | ClientUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutTenantInput | ClientCreateOrConnectWithoutTenantInput[]
    createMany?: ClientCreateManyTenantInputEnvelope
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
  }

  export type UnitCreateNestedManyWithoutTenantInput = {
    create?: XOR<UnitCreateWithoutTenantInput, UnitUncheckedCreateWithoutTenantInput> | UnitCreateWithoutTenantInput[] | UnitUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UnitCreateOrConnectWithoutTenantInput | UnitCreateOrConnectWithoutTenantInput[]
    createMany?: UnitCreateManyTenantInputEnvelope
    connect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput> | UserCreateWithoutTenantInput[] | UserUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTenantInput | UserCreateOrConnectWithoutTenantInput[]
    createMany?: UserCreateManyTenantInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<ServiceCreateWithoutTenantInput, ServiceUncheckedCreateWithoutTenantInput> | ServiceCreateWithoutTenantInput[] | ServiceUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutTenantInput | ServiceCreateOrConnectWithoutTenantInput[]
    createMany?: ServiceCreateManyTenantInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type BarberUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<BarberCreateWithoutTenantInput, BarberUncheckedCreateWithoutTenantInput> | BarberCreateWithoutTenantInput[] | BarberUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: BarberCreateOrConnectWithoutTenantInput | BarberCreateOrConnectWithoutTenantInput[]
    createMany?: BarberCreateManyTenantInputEnvelope
    connect?: BarberWhereUniqueInput | BarberWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<BookingCreateWithoutTenantInput, BookingUncheckedCreateWithoutTenantInput> | BookingCreateWithoutTenantInput[] | BookingUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutTenantInput | BookingCreateOrConnectWithoutTenantInput[]
    createMany?: BookingCreateManyTenantInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type ClientUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<ClientCreateWithoutTenantInput, ClientUncheckedCreateWithoutTenantInput> | ClientCreateWithoutTenantInput[] | ClientUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutTenantInput | ClientCreateOrConnectWithoutTenantInput[]
    createMany?: ClientCreateManyTenantInputEnvelope
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
  }

  export type UnitUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<UnitCreateWithoutTenantInput, UnitUncheckedCreateWithoutTenantInput> | UnitCreateWithoutTenantInput[] | UnitUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UnitCreateOrConnectWithoutTenantInput | UnitCreateOrConnectWithoutTenantInput[]
    createMany?: UnitCreateManyTenantInputEnvelope
    connect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
  }

  export type EnumTenantStatusFieldUpdateOperationsInput = {
    set?: $Enums.TenantStatus
  }

  export type UserUpdateManyWithoutTenantNestedInput = {
    create?: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput> | UserCreateWithoutTenantInput[] | UserUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTenantInput | UserCreateOrConnectWithoutTenantInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutTenantInput | UserUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: UserCreateManyTenantInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutTenantInput | UserUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: UserUpdateManyWithWhereWithoutTenantInput | UserUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ServiceUpdateManyWithoutTenantNestedInput = {
    create?: XOR<ServiceCreateWithoutTenantInput, ServiceUncheckedCreateWithoutTenantInput> | ServiceCreateWithoutTenantInput[] | ServiceUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutTenantInput | ServiceCreateOrConnectWithoutTenantInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutTenantInput | ServiceUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: ServiceCreateManyTenantInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutTenantInput | ServiceUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutTenantInput | ServiceUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type BarberUpdateManyWithoutTenantNestedInput = {
    create?: XOR<BarberCreateWithoutTenantInput, BarberUncheckedCreateWithoutTenantInput> | BarberCreateWithoutTenantInput[] | BarberUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: BarberCreateOrConnectWithoutTenantInput | BarberCreateOrConnectWithoutTenantInput[]
    upsert?: BarberUpsertWithWhereUniqueWithoutTenantInput | BarberUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: BarberCreateManyTenantInputEnvelope
    set?: BarberWhereUniqueInput | BarberWhereUniqueInput[]
    disconnect?: BarberWhereUniqueInput | BarberWhereUniqueInput[]
    delete?: BarberWhereUniqueInput | BarberWhereUniqueInput[]
    connect?: BarberWhereUniqueInput | BarberWhereUniqueInput[]
    update?: BarberUpdateWithWhereUniqueWithoutTenantInput | BarberUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: BarberUpdateManyWithWhereWithoutTenantInput | BarberUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: BarberScalarWhereInput | BarberScalarWhereInput[]
  }

  export type BookingUpdateManyWithoutTenantNestedInput = {
    create?: XOR<BookingCreateWithoutTenantInput, BookingUncheckedCreateWithoutTenantInput> | BookingCreateWithoutTenantInput[] | BookingUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutTenantInput | BookingCreateOrConnectWithoutTenantInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutTenantInput | BookingUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: BookingCreateManyTenantInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutTenantInput | BookingUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutTenantInput | BookingUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type ClientUpdateManyWithoutTenantNestedInput = {
    create?: XOR<ClientCreateWithoutTenantInput, ClientUncheckedCreateWithoutTenantInput> | ClientCreateWithoutTenantInput[] | ClientUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutTenantInput | ClientCreateOrConnectWithoutTenantInput[]
    upsert?: ClientUpsertWithWhereUniqueWithoutTenantInput | ClientUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: ClientCreateManyTenantInputEnvelope
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    update?: ClientUpdateWithWhereUniqueWithoutTenantInput | ClientUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: ClientUpdateManyWithWhereWithoutTenantInput | ClientUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[]
  }

  export type UnitUpdateManyWithoutTenantNestedInput = {
    create?: XOR<UnitCreateWithoutTenantInput, UnitUncheckedCreateWithoutTenantInput> | UnitCreateWithoutTenantInput[] | UnitUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UnitCreateOrConnectWithoutTenantInput | UnitCreateOrConnectWithoutTenantInput[]
    upsert?: UnitUpsertWithWhereUniqueWithoutTenantInput | UnitUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: UnitCreateManyTenantInputEnvelope
    set?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    disconnect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    delete?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    connect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    update?: UnitUpdateWithWhereUniqueWithoutTenantInput | UnitUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: UnitUpdateManyWithWhereWithoutTenantInput | UnitUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: UnitScalarWhereInput | UnitScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput> | UserCreateWithoutTenantInput[] | UserUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTenantInput | UserCreateOrConnectWithoutTenantInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutTenantInput | UserUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: UserCreateManyTenantInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutTenantInput | UserUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: UserUpdateManyWithWhereWithoutTenantInput | UserUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<ServiceCreateWithoutTenantInput, ServiceUncheckedCreateWithoutTenantInput> | ServiceCreateWithoutTenantInput[] | ServiceUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutTenantInput | ServiceCreateOrConnectWithoutTenantInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutTenantInput | ServiceUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: ServiceCreateManyTenantInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutTenantInput | ServiceUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutTenantInput | ServiceUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type BarberUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<BarberCreateWithoutTenantInput, BarberUncheckedCreateWithoutTenantInput> | BarberCreateWithoutTenantInput[] | BarberUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: BarberCreateOrConnectWithoutTenantInput | BarberCreateOrConnectWithoutTenantInput[]
    upsert?: BarberUpsertWithWhereUniqueWithoutTenantInput | BarberUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: BarberCreateManyTenantInputEnvelope
    set?: BarberWhereUniqueInput | BarberWhereUniqueInput[]
    disconnect?: BarberWhereUniqueInput | BarberWhereUniqueInput[]
    delete?: BarberWhereUniqueInput | BarberWhereUniqueInput[]
    connect?: BarberWhereUniqueInput | BarberWhereUniqueInput[]
    update?: BarberUpdateWithWhereUniqueWithoutTenantInput | BarberUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: BarberUpdateManyWithWhereWithoutTenantInput | BarberUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: BarberScalarWhereInput | BarberScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<BookingCreateWithoutTenantInput, BookingUncheckedCreateWithoutTenantInput> | BookingCreateWithoutTenantInput[] | BookingUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutTenantInput | BookingCreateOrConnectWithoutTenantInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutTenantInput | BookingUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: BookingCreateManyTenantInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutTenantInput | BookingUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutTenantInput | BookingUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type ClientUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<ClientCreateWithoutTenantInput, ClientUncheckedCreateWithoutTenantInput> | ClientCreateWithoutTenantInput[] | ClientUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutTenantInput | ClientCreateOrConnectWithoutTenantInput[]
    upsert?: ClientUpsertWithWhereUniqueWithoutTenantInput | ClientUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: ClientCreateManyTenantInputEnvelope
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    update?: ClientUpdateWithWhereUniqueWithoutTenantInput | ClientUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: ClientUpdateManyWithWhereWithoutTenantInput | ClientUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[]
  }

  export type UnitUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<UnitCreateWithoutTenantInput, UnitUncheckedCreateWithoutTenantInput> | UnitCreateWithoutTenantInput[] | UnitUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UnitCreateOrConnectWithoutTenantInput | UnitCreateOrConnectWithoutTenantInput[]
    upsert?: UnitUpsertWithWhereUniqueWithoutTenantInput | UnitUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: UnitCreateManyTenantInputEnvelope
    set?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    disconnect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    delete?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    connect?: UnitWhereUniqueInput | UnitWhereUniqueInput[]
    update?: UnitUpdateWithWhereUniqueWithoutTenantInput | UnitUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: UnitUpdateManyWithWhereWithoutTenantInput | UnitUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: UnitScalarWhereInput | UnitScalarWhereInput[]
  }

  export type TenantCreateNestedOneWithoutUnitsInput = {
    create?: XOR<TenantCreateWithoutUnitsInput, TenantUncheckedCreateWithoutUnitsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutUnitsInput
    connect?: TenantWhereUniqueInput
  }

  export type BarberUnitCreateNestedManyWithoutUnitInput = {
    create?: XOR<BarberUnitCreateWithoutUnitInput, BarberUnitUncheckedCreateWithoutUnitInput> | BarberUnitCreateWithoutUnitInput[] | BarberUnitUncheckedCreateWithoutUnitInput[]
    connectOrCreate?: BarberUnitCreateOrConnectWithoutUnitInput | BarberUnitCreateOrConnectWithoutUnitInput[]
    createMany?: BarberUnitCreateManyUnitInputEnvelope
    connect?: BarberUnitWhereUniqueInput | BarberUnitWhereUniqueInput[]
  }

  export type BookingCreateNestedManyWithoutUnitInput = {
    create?: XOR<BookingCreateWithoutUnitInput, BookingUncheckedCreateWithoutUnitInput> | BookingCreateWithoutUnitInput[] | BookingUncheckedCreateWithoutUnitInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUnitInput | BookingCreateOrConnectWithoutUnitInput[]
    createMany?: BookingCreateManyUnitInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type BarberUnitUncheckedCreateNestedManyWithoutUnitInput = {
    create?: XOR<BarberUnitCreateWithoutUnitInput, BarberUnitUncheckedCreateWithoutUnitInput> | BarberUnitCreateWithoutUnitInput[] | BarberUnitUncheckedCreateWithoutUnitInput[]
    connectOrCreate?: BarberUnitCreateOrConnectWithoutUnitInput | BarberUnitCreateOrConnectWithoutUnitInput[]
    createMany?: BarberUnitCreateManyUnitInputEnvelope
    connect?: BarberUnitWhereUniqueInput | BarberUnitWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutUnitInput = {
    create?: XOR<BookingCreateWithoutUnitInput, BookingUncheckedCreateWithoutUnitInput> | BookingCreateWithoutUnitInput[] | BookingUncheckedCreateWithoutUnitInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUnitInput | BookingCreateOrConnectWithoutUnitInput[]
    createMany?: BookingCreateManyUnitInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type TenantUpdateOneRequiredWithoutUnitsNestedInput = {
    create?: XOR<TenantCreateWithoutUnitsInput, TenantUncheckedCreateWithoutUnitsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutUnitsInput
    upsert?: TenantUpsertWithoutUnitsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutUnitsInput, TenantUpdateWithoutUnitsInput>, TenantUncheckedUpdateWithoutUnitsInput>
  }

  export type BarberUnitUpdateManyWithoutUnitNestedInput = {
    create?: XOR<BarberUnitCreateWithoutUnitInput, BarberUnitUncheckedCreateWithoutUnitInput> | BarberUnitCreateWithoutUnitInput[] | BarberUnitUncheckedCreateWithoutUnitInput[]
    connectOrCreate?: BarberUnitCreateOrConnectWithoutUnitInput | BarberUnitCreateOrConnectWithoutUnitInput[]
    upsert?: BarberUnitUpsertWithWhereUniqueWithoutUnitInput | BarberUnitUpsertWithWhereUniqueWithoutUnitInput[]
    createMany?: BarberUnitCreateManyUnitInputEnvelope
    set?: BarberUnitWhereUniqueInput | BarberUnitWhereUniqueInput[]
    disconnect?: BarberUnitWhereUniqueInput | BarberUnitWhereUniqueInput[]
    delete?: BarberUnitWhereUniqueInput | BarberUnitWhereUniqueInput[]
    connect?: BarberUnitWhereUniqueInput | BarberUnitWhereUniqueInput[]
    update?: BarberUnitUpdateWithWhereUniqueWithoutUnitInput | BarberUnitUpdateWithWhereUniqueWithoutUnitInput[]
    updateMany?: BarberUnitUpdateManyWithWhereWithoutUnitInput | BarberUnitUpdateManyWithWhereWithoutUnitInput[]
    deleteMany?: BarberUnitScalarWhereInput | BarberUnitScalarWhereInput[]
  }

  export type BookingUpdateManyWithoutUnitNestedInput = {
    create?: XOR<BookingCreateWithoutUnitInput, BookingUncheckedCreateWithoutUnitInput> | BookingCreateWithoutUnitInput[] | BookingUncheckedCreateWithoutUnitInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUnitInput | BookingCreateOrConnectWithoutUnitInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutUnitInput | BookingUpsertWithWhereUniqueWithoutUnitInput[]
    createMany?: BookingCreateManyUnitInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutUnitInput | BookingUpdateWithWhereUniqueWithoutUnitInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutUnitInput | BookingUpdateManyWithWhereWithoutUnitInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type BarberUnitUncheckedUpdateManyWithoutUnitNestedInput = {
    create?: XOR<BarberUnitCreateWithoutUnitInput, BarberUnitUncheckedCreateWithoutUnitInput> | BarberUnitCreateWithoutUnitInput[] | BarberUnitUncheckedCreateWithoutUnitInput[]
    connectOrCreate?: BarberUnitCreateOrConnectWithoutUnitInput | BarberUnitCreateOrConnectWithoutUnitInput[]
    upsert?: BarberUnitUpsertWithWhereUniqueWithoutUnitInput | BarberUnitUpsertWithWhereUniqueWithoutUnitInput[]
    createMany?: BarberUnitCreateManyUnitInputEnvelope
    set?: BarberUnitWhereUniqueInput | BarberUnitWhereUniqueInput[]
    disconnect?: BarberUnitWhereUniqueInput | BarberUnitWhereUniqueInput[]
    delete?: BarberUnitWhereUniqueInput | BarberUnitWhereUniqueInput[]
    connect?: BarberUnitWhereUniqueInput | BarberUnitWhereUniqueInput[]
    update?: BarberUnitUpdateWithWhereUniqueWithoutUnitInput | BarberUnitUpdateWithWhereUniqueWithoutUnitInput[]
    updateMany?: BarberUnitUpdateManyWithWhereWithoutUnitInput | BarberUnitUpdateManyWithWhereWithoutUnitInput[]
    deleteMany?: BarberUnitScalarWhereInput | BarberUnitScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutUnitNestedInput = {
    create?: XOR<BookingCreateWithoutUnitInput, BookingUncheckedCreateWithoutUnitInput> | BookingCreateWithoutUnitInput[] | BookingUncheckedCreateWithoutUnitInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUnitInput | BookingCreateOrConnectWithoutUnitInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutUnitInput | BookingUpsertWithWhereUniqueWithoutUnitInput[]
    createMany?: BookingCreateManyUnitInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutUnitInput | BookingUpdateWithWhereUniqueWithoutUnitInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutUnitInput | BookingUpdateManyWithWhereWithoutUnitInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type TenantCreateNestedOneWithoutServicesInput = {
    create?: XOR<TenantCreateWithoutServicesInput, TenantUncheckedCreateWithoutServicesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutServicesInput
    connect?: TenantWhereUniqueInput
  }

  export type BookingCreateNestedManyWithoutServiceInput = {
    create?: XOR<BookingCreateWithoutServiceInput, BookingUncheckedCreateWithoutServiceInput> | BookingCreateWithoutServiceInput[] | BookingUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutServiceInput | BookingCreateOrConnectWithoutServiceInput[]
    createMany?: BookingCreateManyServiceInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<BookingCreateWithoutServiceInput, BookingUncheckedCreateWithoutServiceInput> | BookingCreateWithoutServiceInput[] | BookingUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutServiceInput | BookingCreateOrConnectWithoutServiceInput[]
    createMany?: BookingCreateManyServiceInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type EnumServiceCategoryFieldUpdateOperationsInput = {
    set?: $Enums.ServiceCategory
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TenantUpdateOneRequiredWithoutServicesNestedInput = {
    create?: XOR<TenantCreateWithoutServicesInput, TenantUncheckedCreateWithoutServicesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutServicesInput
    upsert?: TenantUpsertWithoutServicesInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutServicesInput, TenantUpdateWithoutServicesInput>, TenantUncheckedUpdateWithoutServicesInput>
  }

  export type BookingUpdateManyWithoutServiceNestedInput = {
    create?: XOR<BookingCreateWithoutServiceInput, BookingUncheckedCreateWithoutServiceInput> | BookingCreateWithoutServiceInput[] | BookingUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutServiceInput | BookingCreateOrConnectWithoutServiceInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutServiceInput | BookingUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: BookingCreateManyServiceInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutServiceInput | BookingUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutServiceInput | BookingUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<BookingCreateWithoutServiceInput, BookingUncheckedCreateWithoutServiceInput> | BookingCreateWithoutServiceInput[] | BookingUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutServiceInput | BookingCreateOrConnectWithoutServiceInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutServiceInput | BookingUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: BookingCreateManyServiceInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutServiceInput | BookingUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutServiceInput | BookingUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type TenantCreateNestedOneWithoutBarbersInput = {
    create?: XOR<TenantCreateWithoutBarbersInput, TenantUncheckedCreateWithoutBarbersInput>
    connectOrCreate?: TenantCreateOrConnectWithoutBarbersInput
    connect?: TenantWhereUniqueInput
  }

  export type BarberUnitCreateNestedManyWithoutBarberInput = {
    create?: XOR<BarberUnitCreateWithoutBarberInput, BarberUnitUncheckedCreateWithoutBarberInput> | BarberUnitCreateWithoutBarberInput[] | BarberUnitUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: BarberUnitCreateOrConnectWithoutBarberInput | BarberUnitCreateOrConnectWithoutBarberInput[]
    createMany?: BarberUnitCreateManyBarberInputEnvelope
    connect?: BarberUnitWhereUniqueInput | BarberUnitWhereUniqueInput[]
  }

  export type BookingCreateNestedManyWithoutBarberInput = {
    create?: XOR<BookingCreateWithoutBarberInput, BookingUncheckedCreateWithoutBarberInput> | BookingCreateWithoutBarberInput[] | BookingUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutBarberInput | BookingCreateOrConnectWithoutBarberInput[]
    createMany?: BookingCreateManyBarberInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type BarberBlockCreateNestedManyWithoutBarberInput = {
    create?: XOR<BarberBlockCreateWithoutBarberInput, BarberBlockUncheckedCreateWithoutBarberInput> | BarberBlockCreateWithoutBarberInput[] | BarberBlockUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: BarberBlockCreateOrConnectWithoutBarberInput | BarberBlockCreateOrConnectWithoutBarberInput[]
    createMany?: BarberBlockCreateManyBarberInputEnvelope
    connect?: BarberBlockWhereUniqueInput | BarberBlockWhereUniqueInput[]
  }

  export type BarberUnitUncheckedCreateNestedManyWithoutBarberInput = {
    create?: XOR<BarberUnitCreateWithoutBarberInput, BarberUnitUncheckedCreateWithoutBarberInput> | BarberUnitCreateWithoutBarberInput[] | BarberUnitUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: BarberUnitCreateOrConnectWithoutBarberInput | BarberUnitCreateOrConnectWithoutBarberInput[]
    createMany?: BarberUnitCreateManyBarberInputEnvelope
    connect?: BarberUnitWhereUniqueInput | BarberUnitWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutBarberInput = {
    create?: XOR<BookingCreateWithoutBarberInput, BookingUncheckedCreateWithoutBarberInput> | BookingCreateWithoutBarberInput[] | BookingUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutBarberInput | BookingCreateOrConnectWithoutBarberInput[]
    createMany?: BookingCreateManyBarberInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type BarberBlockUncheckedCreateNestedManyWithoutBarberInput = {
    create?: XOR<BarberBlockCreateWithoutBarberInput, BarberBlockUncheckedCreateWithoutBarberInput> | BarberBlockCreateWithoutBarberInput[] | BarberBlockUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: BarberBlockCreateOrConnectWithoutBarberInput | BarberBlockCreateOrConnectWithoutBarberInput[]
    createMany?: BarberBlockCreateManyBarberInputEnvelope
    connect?: BarberBlockWhereUniqueInput | BarberBlockWhereUniqueInput[]
  }

  export type TenantUpdateOneRequiredWithoutBarbersNestedInput = {
    create?: XOR<TenantCreateWithoutBarbersInput, TenantUncheckedCreateWithoutBarbersInput>
    connectOrCreate?: TenantCreateOrConnectWithoutBarbersInput
    upsert?: TenantUpsertWithoutBarbersInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutBarbersInput, TenantUpdateWithoutBarbersInput>, TenantUncheckedUpdateWithoutBarbersInput>
  }

  export type BarberUnitUpdateManyWithoutBarberNestedInput = {
    create?: XOR<BarberUnitCreateWithoutBarberInput, BarberUnitUncheckedCreateWithoutBarberInput> | BarberUnitCreateWithoutBarberInput[] | BarberUnitUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: BarberUnitCreateOrConnectWithoutBarberInput | BarberUnitCreateOrConnectWithoutBarberInput[]
    upsert?: BarberUnitUpsertWithWhereUniqueWithoutBarberInput | BarberUnitUpsertWithWhereUniqueWithoutBarberInput[]
    createMany?: BarberUnitCreateManyBarberInputEnvelope
    set?: BarberUnitWhereUniqueInput | BarberUnitWhereUniqueInput[]
    disconnect?: BarberUnitWhereUniqueInput | BarberUnitWhereUniqueInput[]
    delete?: BarberUnitWhereUniqueInput | BarberUnitWhereUniqueInput[]
    connect?: BarberUnitWhereUniqueInput | BarberUnitWhereUniqueInput[]
    update?: BarberUnitUpdateWithWhereUniqueWithoutBarberInput | BarberUnitUpdateWithWhereUniqueWithoutBarberInput[]
    updateMany?: BarberUnitUpdateManyWithWhereWithoutBarberInput | BarberUnitUpdateManyWithWhereWithoutBarberInput[]
    deleteMany?: BarberUnitScalarWhereInput | BarberUnitScalarWhereInput[]
  }

  export type BookingUpdateManyWithoutBarberNestedInput = {
    create?: XOR<BookingCreateWithoutBarberInput, BookingUncheckedCreateWithoutBarberInput> | BookingCreateWithoutBarberInput[] | BookingUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutBarberInput | BookingCreateOrConnectWithoutBarberInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutBarberInput | BookingUpsertWithWhereUniqueWithoutBarberInput[]
    createMany?: BookingCreateManyBarberInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutBarberInput | BookingUpdateWithWhereUniqueWithoutBarberInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutBarberInput | BookingUpdateManyWithWhereWithoutBarberInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type BarberBlockUpdateManyWithoutBarberNestedInput = {
    create?: XOR<BarberBlockCreateWithoutBarberInput, BarberBlockUncheckedCreateWithoutBarberInput> | BarberBlockCreateWithoutBarberInput[] | BarberBlockUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: BarberBlockCreateOrConnectWithoutBarberInput | BarberBlockCreateOrConnectWithoutBarberInput[]
    upsert?: BarberBlockUpsertWithWhereUniqueWithoutBarberInput | BarberBlockUpsertWithWhereUniqueWithoutBarberInput[]
    createMany?: BarberBlockCreateManyBarberInputEnvelope
    set?: BarberBlockWhereUniqueInput | BarberBlockWhereUniqueInput[]
    disconnect?: BarberBlockWhereUniqueInput | BarberBlockWhereUniqueInput[]
    delete?: BarberBlockWhereUniqueInput | BarberBlockWhereUniqueInput[]
    connect?: BarberBlockWhereUniqueInput | BarberBlockWhereUniqueInput[]
    update?: BarberBlockUpdateWithWhereUniqueWithoutBarberInput | BarberBlockUpdateWithWhereUniqueWithoutBarberInput[]
    updateMany?: BarberBlockUpdateManyWithWhereWithoutBarberInput | BarberBlockUpdateManyWithWhereWithoutBarberInput[]
    deleteMany?: BarberBlockScalarWhereInput | BarberBlockScalarWhereInput[]
  }

  export type BarberUnitUncheckedUpdateManyWithoutBarberNestedInput = {
    create?: XOR<BarberUnitCreateWithoutBarberInput, BarberUnitUncheckedCreateWithoutBarberInput> | BarberUnitCreateWithoutBarberInput[] | BarberUnitUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: BarberUnitCreateOrConnectWithoutBarberInput | BarberUnitCreateOrConnectWithoutBarberInput[]
    upsert?: BarberUnitUpsertWithWhereUniqueWithoutBarberInput | BarberUnitUpsertWithWhereUniqueWithoutBarberInput[]
    createMany?: BarberUnitCreateManyBarberInputEnvelope
    set?: BarberUnitWhereUniqueInput | BarberUnitWhereUniqueInput[]
    disconnect?: BarberUnitWhereUniqueInput | BarberUnitWhereUniqueInput[]
    delete?: BarberUnitWhereUniqueInput | BarberUnitWhereUniqueInput[]
    connect?: BarberUnitWhereUniqueInput | BarberUnitWhereUniqueInput[]
    update?: BarberUnitUpdateWithWhereUniqueWithoutBarberInput | BarberUnitUpdateWithWhereUniqueWithoutBarberInput[]
    updateMany?: BarberUnitUpdateManyWithWhereWithoutBarberInput | BarberUnitUpdateManyWithWhereWithoutBarberInput[]
    deleteMany?: BarberUnitScalarWhereInput | BarberUnitScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutBarberNestedInput = {
    create?: XOR<BookingCreateWithoutBarberInput, BookingUncheckedCreateWithoutBarberInput> | BookingCreateWithoutBarberInput[] | BookingUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutBarberInput | BookingCreateOrConnectWithoutBarberInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutBarberInput | BookingUpsertWithWhereUniqueWithoutBarberInput[]
    createMany?: BookingCreateManyBarberInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutBarberInput | BookingUpdateWithWhereUniqueWithoutBarberInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutBarberInput | BookingUpdateManyWithWhereWithoutBarberInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type BarberBlockUncheckedUpdateManyWithoutBarberNestedInput = {
    create?: XOR<BarberBlockCreateWithoutBarberInput, BarberBlockUncheckedCreateWithoutBarberInput> | BarberBlockCreateWithoutBarberInput[] | BarberBlockUncheckedCreateWithoutBarberInput[]
    connectOrCreate?: BarberBlockCreateOrConnectWithoutBarberInput | BarberBlockCreateOrConnectWithoutBarberInput[]
    upsert?: BarberBlockUpsertWithWhereUniqueWithoutBarberInput | BarberBlockUpsertWithWhereUniqueWithoutBarberInput[]
    createMany?: BarberBlockCreateManyBarberInputEnvelope
    set?: BarberBlockWhereUniqueInput | BarberBlockWhereUniqueInput[]
    disconnect?: BarberBlockWhereUniqueInput | BarberBlockWhereUniqueInput[]
    delete?: BarberBlockWhereUniqueInput | BarberBlockWhereUniqueInput[]
    connect?: BarberBlockWhereUniqueInput | BarberBlockWhereUniqueInput[]
    update?: BarberBlockUpdateWithWhereUniqueWithoutBarberInput | BarberBlockUpdateWithWhereUniqueWithoutBarberInput[]
    updateMany?: BarberBlockUpdateManyWithWhereWithoutBarberInput | BarberBlockUpdateManyWithWhereWithoutBarberInput[]
    deleteMany?: BarberBlockScalarWhereInput | BarberBlockScalarWhereInput[]
  }

  export type BarberCreateNestedOneWithoutUnitsInput = {
    create?: XOR<BarberCreateWithoutUnitsInput, BarberUncheckedCreateWithoutUnitsInput>
    connectOrCreate?: BarberCreateOrConnectWithoutUnitsInput
    connect?: BarberWhereUniqueInput
  }

  export type UnitCreateNestedOneWithoutBarberUnitsInput = {
    create?: XOR<UnitCreateWithoutBarberUnitsInput, UnitUncheckedCreateWithoutBarberUnitsInput>
    connectOrCreate?: UnitCreateOrConnectWithoutBarberUnitsInput
    connect?: UnitWhereUniqueInput
  }

  export type BarberUpdateOneRequiredWithoutUnitsNestedInput = {
    create?: XOR<BarberCreateWithoutUnitsInput, BarberUncheckedCreateWithoutUnitsInput>
    connectOrCreate?: BarberCreateOrConnectWithoutUnitsInput
    upsert?: BarberUpsertWithoutUnitsInput
    connect?: BarberWhereUniqueInput
    update?: XOR<XOR<BarberUpdateToOneWithWhereWithoutUnitsInput, BarberUpdateWithoutUnitsInput>, BarberUncheckedUpdateWithoutUnitsInput>
  }

  export type UnitUpdateOneRequiredWithoutBarberUnitsNestedInput = {
    create?: XOR<UnitCreateWithoutBarberUnitsInput, UnitUncheckedCreateWithoutBarberUnitsInput>
    connectOrCreate?: UnitCreateOrConnectWithoutBarberUnitsInput
    upsert?: UnitUpsertWithoutBarberUnitsInput
    connect?: UnitWhereUniqueInput
    update?: XOR<XOR<UnitUpdateToOneWithWhereWithoutBarberUnitsInput, UnitUpdateWithoutBarberUnitsInput>, UnitUncheckedUpdateWithoutBarberUnitsInput>
  }

  export type BarberCreateNestedOneWithoutBlocksInput = {
    create?: XOR<BarberCreateWithoutBlocksInput, BarberUncheckedCreateWithoutBlocksInput>
    connectOrCreate?: BarberCreateOrConnectWithoutBlocksInput
    connect?: BarberWhereUniqueInput
  }

  export type BarberUpdateOneRequiredWithoutBlocksNestedInput = {
    create?: XOR<BarberCreateWithoutBlocksInput, BarberUncheckedCreateWithoutBlocksInput>
    connectOrCreate?: BarberCreateOrConnectWithoutBlocksInput
    upsert?: BarberUpsertWithoutBlocksInput
    connect?: BarberWhereUniqueInput
    update?: XOR<XOR<BarberUpdateToOneWithWhereWithoutBlocksInput, BarberUpdateWithoutBlocksInput>, BarberUncheckedUpdateWithoutBlocksInput>
  }

  export type TenantCreateNestedOneWithoutClientsInput = {
    create?: XOR<TenantCreateWithoutClientsInput, TenantUncheckedCreateWithoutClientsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutClientsInput
    connect?: TenantWhereUniqueInput
  }

  export type BookingCreateNestedManyWithoutClientInput = {
    create?: XOR<BookingCreateWithoutClientInput, BookingUncheckedCreateWithoutClientInput> | BookingCreateWithoutClientInput[] | BookingUncheckedCreateWithoutClientInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutClientInput | BookingCreateOrConnectWithoutClientInput[]
    createMany?: BookingCreateManyClientInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<BookingCreateWithoutClientInput, BookingUncheckedCreateWithoutClientInput> | BookingCreateWithoutClientInput[] | BookingUncheckedCreateWithoutClientInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutClientInput | BookingCreateOrConnectWithoutClientInput[]
    createMany?: BookingCreateManyClientInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type TenantUpdateOneRequiredWithoutClientsNestedInput = {
    create?: XOR<TenantCreateWithoutClientsInput, TenantUncheckedCreateWithoutClientsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutClientsInput
    upsert?: TenantUpsertWithoutClientsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutClientsInput, TenantUpdateWithoutClientsInput>, TenantUncheckedUpdateWithoutClientsInput>
  }

  export type BookingUpdateManyWithoutClientNestedInput = {
    create?: XOR<BookingCreateWithoutClientInput, BookingUncheckedCreateWithoutClientInput> | BookingCreateWithoutClientInput[] | BookingUncheckedCreateWithoutClientInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutClientInput | BookingCreateOrConnectWithoutClientInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutClientInput | BookingUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: BookingCreateManyClientInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutClientInput | BookingUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutClientInput | BookingUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<BookingCreateWithoutClientInput, BookingUncheckedCreateWithoutClientInput> | BookingCreateWithoutClientInput[] | BookingUncheckedCreateWithoutClientInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutClientInput | BookingCreateOrConnectWithoutClientInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutClientInput | BookingUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: BookingCreateManyClientInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutClientInput | BookingUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutClientInput | BookingUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type TenantCreateNestedOneWithoutBookingsInput = {
    create?: XOR<TenantCreateWithoutBookingsInput, TenantUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutBookingsInput
    connect?: TenantWhereUniqueInput
  }

  export type UnitCreateNestedOneWithoutBookingsInput = {
    create?: XOR<UnitCreateWithoutBookingsInput, UnitUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UnitCreateOrConnectWithoutBookingsInput
    connect?: UnitWhereUniqueInput
  }

  export type BarberCreateNestedOneWithoutBookingsInput = {
    create?: XOR<BarberCreateWithoutBookingsInput, BarberUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: BarberCreateOrConnectWithoutBookingsInput
    connect?: BarberWhereUniqueInput
  }

  export type ClientCreateNestedOneWithoutBookingsInput = {
    create?: XOR<ClientCreateWithoutBookingsInput, ClientUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutBookingsInput
    connect?: ClientWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutBookingsInput = {
    create?: XOR<ServiceCreateWithoutBookingsInput, ServiceUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutBookingsInput
    connect?: ServiceWhereUniqueInput
  }

  export type EnumBookingStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookingStatus
  }

  export type EnumBookingOriginFieldUpdateOperationsInput = {
    set?: $Enums.BookingOrigin
  }

  export type TenantUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<TenantCreateWithoutBookingsInput, TenantUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutBookingsInput
    upsert?: TenantUpsertWithoutBookingsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutBookingsInput, TenantUpdateWithoutBookingsInput>, TenantUncheckedUpdateWithoutBookingsInput>
  }

  export type UnitUpdateOneWithoutBookingsNestedInput = {
    create?: XOR<UnitCreateWithoutBookingsInput, UnitUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UnitCreateOrConnectWithoutBookingsInput
    upsert?: UnitUpsertWithoutBookingsInput
    disconnect?: UnitWhereInput | boolean
    delete?: UnitWhereInput | boolean
    connect?: UnitWhereUniqueInput
    update?: XOR<XOR<UnitUpdateToOneWithWhereWithoutBookingsInput, UnitUpdateWithoutBookingsInput>, UnitUncheckedUpdateWithoutBookingsInput>
  }

  export type BarberUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<BarberCreateWithoutBookingsInput, BarberUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: BarberCreateOrConnectWithoutBookingsInput
    upsert?: BarberUpsertWithoutBookingsInput
    connect?: BarberWhereUniqueInput
    update?: XOR<XOR<BarberUpdateToOneWithWhereWithoutBookingsInput, BarberUpdateWithoutBookingsInput>, BarberUncheckedUpdateWithoutBookingsInput>
  }

  export type ClientUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<ClientCreateWithoutBookingsInput, ClientUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutBookingsInput
    upsert?: ClientUpsertWithoutBookingsInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutBookingsInput, ClientUpdateWithoutBookingsInput>, ClientUncheckedUpdateWithoutBookingsInput>
  }

  export type ServiceUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<ServiceCreateWithoutBookingsInput, ServiceUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutBookingsInput
    upsert?: ServiceUpsertWithoutBookingsInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutBookingsInput, ServiceUpdateWithoutBookingsInput>, ServiceUncheckedUpdateWithoutBookingsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumTenantStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TenantStatus | EnumTenantStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTenantStatusFilter<$PrismaModel> | $Enums.TenantStatus
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumTenantStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TenantStatus | EnumTenantStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTenantStatusWithAggregatesFilter<$PrismaModel> | $Enums.TenantStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTenantStatusFilter<$PrismaModel>
    _max?: NestedEnumTenantStatusFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumServiceCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceCategory | EnumServiceCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceCategory[] | ListEnumServiceCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceCategory[] | ListEnumServiceCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceCategoryFilter<$PrismaModel> | $Enums.ServiceCategory
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumServiceCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceCategory | EnumServiceCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceCategory[] | ListEnumServiceCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceCategory[] | ListEnumServiceCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceCategoryWithAggregatesFilter<$PrismaModel> | $Enums.ServiceCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceCategoryFilter<$PrismaModel>
    _max?: NestedEnumServiceCategoryFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type NestedEnumBookingOriginFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingOrigin | EnumBookingOriginFieldRefInput<$PrismaModel>
    in?: $Enums.BookingOrigin[] | ListEnumBookingOriginFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingOrigin[] | ListEnumBookingOriginFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingOriginFilter<$PrismaModel> | $Enums.BookingOrigin
  }

  export type NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type NestedEnumBookingOriginWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingOrigin | EnumBookingOriginFieldRefInput<$PrismaModel>
    in?: $Enums.BookingOrigin[] | ListEnumBookingOriginFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingOrigin[] | ListEnumBookingOriginFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingOriginWithAggregatesFilter<$PrismaModel> | $Enums.BookingOrigin
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingOriginFilter<$PrismaModel>
    _max?: NestedEnumBookingOriginFilter<$PrismaModel>
  }

  export type TenantCreateWithoutUsersInput = {
    id?: string
    name: string
    slug: string
    phone?: string | null
    email?: string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: string | null
    colorPrimary?: string
    colorAccent?: string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.TenantStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceCreateNestedManyWithoutTenantInput
    barbers?: BarberCreateNestedManyWithoutTenantInput
    bookings?: BookingCreateNestedManyWithoutTenantInput
    clients?: ClientCreateNestedManyWithoutTenantInput
    units?: UnitCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    slug: string
    phone?: string | null
    email?: string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: string | null
    colorPrimary?: string
    colorAccent?: string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.TenantStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutTenantInput
    barbers?: BarberUncheckedCreateNestedManyWithoutTenantInput
    bookings?: BookingUncheckedCreateNestedManyWithoutTenantInput
    clients?: ClientUncheckedCreateNestedManyWithoutTenantInput
    units?: UnitUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutUsersInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>
  }

  export type TenantUpsertWithoutUsersInput = {
    update: XOR<TenantUpdateWithoutUsersInput, TenantUncheckedUpdateWithoutUsersInput>
    create: XOR<TenantCreateWithoutUsersInput, TenantUncheckedCreateWithoutUsersInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutUsersInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutUsersInput, TenantUncheckedUpdateWithoutUsersInput>
  }

  export type TenantUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    colorPrimary?: StringFieldUpdateOperationsInput | string
    colorAccent?: StringFieldUpdateOperationsInput | string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUpdateManyWithoutTenantNestedInput
    barbers?: BarberUpdateManyWithoutTenantNestedInput
    bookings?: BookingUpdateManyWithoutTenantNestedInput
    clients?: ClientUpdateManyWithoutTenantNestedInput
    units?: UnitUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    colorPrimary?: StringFieldUpdateOperationsInput | string
    colorAccent?: StringFieldUpdateOperationsInput | string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutTenantNestedInput
    barbers?: BarberUncheckedUpdateManyWithoutTenantNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutTenantNestedInput
    clients?: ClientUncheckedUpdateManyWithoutTenantNestedInput
    units?: UnitUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type UserCreateWithoutTenantInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutTenantInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutTenantInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput>
  }

  export type UserCreateManyTenantInputEnvelope = {
    data: UserCreateManyTenantInput | UserCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type ServiceCreateWithoutTenantInput = {
    id?: string
    name: string
    category: $Enums.ServiceCategory
    description?: string | null
    price: number
    durationMin: number
    active?: boolean
    sortOrder?: number
    bookings?: BookingCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutTenantInput = {
    id?: string
    name: string
    category: $Enums.ServiceCategory
    description?: string | null
    price: number
    durationMin: number
    active?: boolean
    sortOrder?: number
    bookings?: BookingUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutTenantInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutTenantInput, ServiceUncheckedCreateWithoutTenantInput>
  }

  export type ServiceCreateManyTenantInputEnvelope = {
    data: ServiceCreateManyTenantInput | ServiceCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type BarberCreateWithoutTenantInput = {
    id?: string
    name: string
    nickname?: string | null
    photoUrl?: string | null
    commissionPct?: number
    active?: boolean
    units?: BarberUnitCreateNestedManyWithoutBarberInput
    bookings?: BookingCreateNestedManyWithoutBarberInput
    blocks?: BarberBlockCreateNestedManyWithoutBarberInput
  }

  export type BarberUncheckedCreateWithoutTenantInput = {
    id?: string
    name: string
    nickname?: string | null
    photoUrl?: string | null
    commissionPct?: number
    active?: boolean
    units?: BarberUnitUncheckedCreateNestedManyWithoutBarberInput
    bookings?: BookingUncheckedCreateNestedManyWithoutBarberInput
    blocks?: BarberBlockUncheckedCreateNestedManyWithoutBarberInput
  }

  export type BarberCreateOrConnectWithoutTenantInput = {
    where: BarberWhereUniqueInput
    create: XOR<BarberCreateWithoutTenantInput, BarberUncheckedCreateWithoutTenantInput>
  }

  export type BarberCreateManyTenantInputEnvelope = {
    data: BarberCreateManyTenantInput | BarberCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type BookingCreateWithoutTenantInput = {
    id?: string
    dateTime: Date | string
    durationMin: number
    price: number
    status?: $Enums.BookingStatus
    origin?: $Enums.BookingOrigin
    campaignRef?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    unit?: UnitCreateNestedOneWithoutBookingsInput
    barber: BarberCreateNestedOneWithoutBookingsInput
    client: ClientCreateNestedOneWithoutBookingsInput
    service: ServiceCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutTenantInput = {
    id?: string
    unitId?: string | null
    barberId: string
    clientId: string
    serviceId: string
    dateTime: Date | string
    durationMin: number
    price: number
    status?: $Enums.BookingStatus
    origin?: $Enums.BookingOrigin
    campaignRef?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingCreateOrConnectWithoutTenantInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutTenantInput, BookingUncheckedCreateWithoutTenantInput>
  }

  export type BookingCreateManyTenantInputEnvelope = {
    data: BookingCreateManyTenantInput | BookingCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type ClientCreateWithoutTenantInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    totalVisits?: number
    lastVisit?: Date | string | null
    createdAt?: Date | string
    bookings?: BookingCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutTenantInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    totalVisits?: number
    lastVisit?: Date | string | null
    createdAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutTenantInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutTenantInput, ClientUncheckedCreateWithoutTenantInput>
  }

  export type ClientCreateManyTenantInputEnvelope = {
    data: ClientCreateManyTenantInput | ClientCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type UnitCreateWithoutTenantInput = {
    id?: string
    name: string
    slug: string
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: string | null
    active?: boolean
    barberUnits?: BarberUnitCreateNestedManyWithoutUnitInput
    bookings?: BookingCreateNestedManyWithoutUnitInput
  }

  export type UnitUncheckedCreateWithoutTenantInput = {
    id?: string
    name: string
    slug: string
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: string | null
    active?: boolean
    barberUnits?: BarberUnitUncheckedCreateNestedManyWithoutUnitInput
    bookings?: BookingUncheckedCreateNestedManyWithoutUnitInput
  }

  export type UnitCreateOrConnectWithoutTenantInput = {
    where: UnitWhereUniqueInput
    create: XOR<UnitCreateWithoutTenantInput, UnitUncheckedCreateWithoutTenantInput>
  }

  export type UnitCreateManyTenantInputEnvelope = {
    data: UnitCreateManyTenantInput | UnitCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutTenantInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutTenantInput, UserUncheckedUpdateWithoutTenantInput>
    create: XOR<UserCreateWithoutTenantInput, UserUncheckedCreateWithoutTenantInput>
  }

  export type UserUpdateWithWhereUniqueWithoutTenantInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutTenantInput, UserUncheckedUpdateWithoutTenantInput>
  }

  export type UserUpdateManyWithWhereWithoutTenantInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutTenantInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    tenantId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type ServiceUpsertWithWhereUniqueWithoutTenantInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutTenantInput, ServiceUncheckedUpdateWithoutTenantInput>
    create: XOR<ServiceCreateWithoutTenantInput, ServiceUncheckedCreateWithoutTenantInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutTenantInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutTenantInput, ServiceUncheckedUpdateWithoutTenantInput>
  }

  export type ServiceUpdateManyWithWhereWithoutTenantInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutTenantInput>
  }

  export type ServiceScalarWhereInput = {
    AND?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    OR?: ServiceScalarWhereInput[]
    NOT?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    id?: StringFilter<"Service"> | string
    tenantId?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    category?: EnumServiceCategoryFilter<"Service"> | $Enums.ServiceCategory
    description?: StringNullableFilter<"Service"> | string | null
    price?: FloatFilter<"Service"> | number
    durationMin?: IntFilter<"Service"> | number
    active?: BoolFilter<"Service"> | boolean
    sortOrder?: IntFilter<"Service"> | number
  }

  export type BarberUpsertWithWhereUniqueWithoutTenantInput = {
    where: BarberWhereUniqueInput
    update: XOR<BarberUpdateWithoutTenantInput, BarberUncheckedUpdateWithoutTenantInput>
    create: XOR<BarberCreateWithoutTenantInput, BarberUncheckedCreateWithoutTenantInput>
  }

  export type BarberUpdateWithWhereUniqueWithoutTenantInput = {
    where: BarberWhereUniqueInput
    data: XOR<BarberUpdateWithoutTenantInput, BarberUncheckedUpdateWithoutTenantInput>
  }

  export type BarberUpdateManyWithWhereWithoutTenantInput = {
    where: BarberScalarWhereInput
    data: XOR<BarberUpdateManyMutationInput, BarberUncheckedUpdateManyWithoutTenantInput>
  }

  export type BarberScalarWhereInput = {
    AND?: BarberScalarWhereInput | BarberScalarWhereInput[]
    OR?: BarberScalarWhereInput[]
    NOT?: BarberScalarWhereInput | BarberScalarWhereInput[]
    id?: StringFilter<"Barber"> | string
    tenantId?: StringFilter<"Barber"> | string
    name?: StringFilter<"Barber"> | string
    nickname?: StringNullableFilter<"Barber"> | string | null
    photoUrl?: StringNullableFilter<"Barber"> | string | null
    commissionPct?: FloatFilter<"Barber"> | number
    active?: BoolFilter<"Barber"> | boolean
  }

  export type BookingUpsertWithWhereUniqueWithoutTenantInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutTenantInput, BookingUncheckedUpdateWithoutTenantInput>
    create: XOR<BookingCreateWithoutTenantInput, BookingUncheckedCreateWithoutTenantInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutTenantInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutTenantInput, BookingUncheckedUpdateWithoutTenantInput>
  }

  export type BookingUpdateManyWithWhereWithoutTenantInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutTenantInput>
  }

  export type BookingScalarWhereInput = {
    AND?: BookingScalarWhereInput | BookingScalarWhereInput[]
    OR?: BookingScalarWhereInput[]
    NOT?: BookingScalarWhereInput | BookingScalarWhereInput[]
    id?: StringFilter<"Booking"> | string
    tenantId?: StringFilter<"Booking"> | string
    unitId?: StringNullableFilter<"Booking"> | string | null
    barberId?: StringFilter<"Booking"> | string
    clientId?: StringFilter<"Booking"> | string
    serviceId?: StringFilter<"Booking"> | string
    dateTime?: DateTimeFilter<"Booking"> | Date | string
    durationMin?: IntFilter<"Booking"> | number
    price?: FloatFilter<"Booking"> | number
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    origin?: EnumBookingOriginFilter<"Booking"> | $Enums.BookingOrigin
    campaignRef?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
  }

  export type ClientUpsertWithWhereUniqueWithoutTenantInput = {
    where: ClientWhereUniqueInput
    update: XOR<ClientUpdateWithoutTenantInput, ClientUncheckedUpdateWithoutTenantInput>
    create: XOR<ClientCreateWithoutTenantInput, ClientUncheckedCreateWithoutTenantInput>
  }

  export type ClientUpdateWithWhereUniqueWithoutTenantInput = {
    where: ClientWhereUniqueInput
    data: XOR<ClientUpdateWithoutTenantInput, ClientUncheckedUpdateWithoutTenantInput>
  }

  export type ClientUpdateManyWithWhereWithoutTenantInput = {
    where: ClientScalarWhereInput
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyWithoutTenantInput>
  }

  export type ClientScalarWhereInput = {
    AND?: ClientScalarWhereInput | ClientScalarWhereInput[]
    OR?: ClientScalarWhereInput[]
    NOT?: ClientScalarWhereInput | ClientScalarWhereInput[]
    id?: StringFilter<"Client"> | string
    tenantId?: StringFilter<"Client"> | string
    name?: StringFilter<"Client"> | string
    phone?: StringFilter<"Client"> | string
    email?: StringNullableFilter<"Client"> | string | null
    totalVisits?: IntFilter<"Client"> | number
    lastVisit?: DateTimeNullableFilter<"Client"> | Date | string | null
    createdAt?: DateTimeFilter<"Client"> | Date | string
  }

  export type UnitUpsertWithWhereUniqueWithoutTenantInput = {
    where: UnitWhereUniqueInput
    update: XOR<UnitUpdateWithoutTenantInput, UnitUncheckedUpdateWithoutTenantInput>
    create: XOR<UnitCreateWithoutTenantInput, UnitUncheckedCreateWithoutTenantInput>
  }

  export type UnitUpdateWithWhereUniqueWithoutTenantInput = {
    where: UnitWhereUniqueInput
    data: XOR<UnitUpdateWithoutTenantInput, UnitUncheckedUpdateWithoutTenantInput>
  }

  export type UnitUpdateManyWithWhereWithoutTenantInput = {
    where: UnitScalarWhereInput
    data: XOR<UnitUpdateManyMutationInput, UnitUncheckedUpdateManyWithoutTenantInput>
  }

  export type UnitScalarWhereInput = {
    AND?: UnitScalarWhereInput | UnitScalarWhereInput[]
    OR?: UnitScalarWhereInput[]
    NOT?: UnitScalarWhereInput | UnitScalarWhereInput[]
    id?: StringFilter<"Unit"> | string
    tenantId?: StringFilter<"Unit"> | string
    name?: StringFilter<"Unit"> | string
    slug?: StringFilter<"Unit"> | string
    address?: JsonNullableFilter<"Unit">
    phone?: StringNullableFilter<"Unit"> | string | null
    active?: BoolFilter<"Unit"> | boolean
  }

  export type TenantCreateWithoutUnitsInput = {
    id?: string
    name: string
    slug: string
    phone?: string | null
    email?: string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: string | null
    colorPrimary?: string
    colorAccent?: string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.TenantStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutTenantInput
    services?: ServiceCreateNestedManyWithoutTenantInput
    barbers?: BarberCreateNestedManyWithoutTenantInput
    bookings?: BookingCreateNestedManyWithoutTenantInput
    clients?: ClientCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutUnitsInput = {
    id?: string
    name: string
    slug: string
    phone?: string | null
    email?: string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: string | null
    colorPrimary?: string
    colorAccent?: string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.TenantStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    services?: ServiceUncheckedCreateNestedManyWithoutTenantInput
    barbers?: BarberUncheckedCreateNestedManyWithoutTenantInput
    bookings?: BookingUncheckedCreateNestedManyWithoutTenantInput
    clients?: ClientUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutUnitsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutUnitsInput, TenantUncheckedCreateWithoutUnitsInput>
  }

  export type BarberUnitCreateWithoutUnitInput = {
    id?: string
    schedule: JsonNullValueInput | InputJsonValue
    barber: BarberCreateNestedOneWithoutUnitsInput
  }

  export type BarberUnitUncheckedCreateWithoutUnitInput = {
    id?: string
    barberId: string
    schedule: JsonNullValueInput | InputJsonValue
  }

  export type BarberUnitCreateOrConnectWithoutUnitInput = {
    where: BarberUnitWhereUniqueInput
    create: XOR<BarberUnitCreateWithoutUnitInput, BarberUnitUncheckedCreateWithoutUnitInput>
  }

  export type BarberUnitCreateManyUnitInputEnvelope = {
    data: BarberUnitCreateManyUnitInput | BarberUnitCreateManyUnitInput[]
    skipDuplicates?: boolean
  }

  export type BookingCreateWithoutUnitInput = {
    id?: string
    dateTime: Date | string
    durationMin: number
    price: number
    status?: $Enums.BookingStatus
    origin?: $Enums.BookingOrigin
    campaignRef?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutBookingsInput
    barber: BarberCreateNestedOneWithoutBookingsInput
    client: ClientCreateNestedOneWithoutBookingsInput
    service: ServiceCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutUnitInput = {
    id?: string
    tenantId: string
    barberId: string
    clientId: string
    serviceId: string
    dateTime: Date | string
    durationMin: number
    price: number
    status?: $Enums.BookingStatus
    origin?: $Enums.BookingOrigin
    campaignRef?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingCreateOrConnectWithoutUnitInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutUnitInput, BookingUncheckedCreateWithoutUnitInput>
  }

  export type BookingCreateManyUnitInputEnvelope = {
    data: BookingCreateManyUnitInput | BookingCreateManyUnitInput[]
    skipDuplicates?: boolean
  }

  export type TenantUpsertWithoutUnitsInput = {
    update: XOR<TenantUpdateWithoutUnitsInput, TenantUncheckedUpdateWithoutUnitsInput>
    create: XOR<TenantCreateWithoutUnitsInput, TenantUncheckedCreateWithoutUnitsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutUnitsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutUnitsInput, TenantUncheckedUpdateWithoutUnitsInput>
  }

  export type TenantUpdateWithoutUnitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    colorPrimary?: StringFieldUpdateOperationsInput | string
    colorAccent?: StringFieldUpdateOperationsInput | string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutTenantNestedInput
    services?: ServiceUpdateManyWithoutTenantNestedInput
    barbers?: BarberUpdateManyWithoutTenantNestedInput
    bookings?: BookingUpdateManyWithoutTenantNestedInput
    clients?: ClientUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutUnitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    colorPrimary?: StringFieldUpdateOperationsInput | string
    colorAccent?: StringFieldUpdateOperationsInput | string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    services?: ServiceUncheckedUpdateManyWithoutTenantNestedInput
    barbers?: BarberUncheckedUpdateManyWithoutTenantNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutTenantNestedInput
    clients?: ClientUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type BarberUnitUpsertWithWhereUniqueWithoutUnitInput = {
    where: BarberUnitWhereUniqueInput
    update: XOR<BarberUnitUpdateWithoutUnitInput, BarberUnitUncheckedUpdateWithoutUnitInput>
    create: XOR<BarberUnitCreateWithoutUnitInput, BarberUnitUncheckedCreateWithoutUnitInput>
  }

  export type BarberUnitUpdateWithWhereUniqueWithoutUnitInput = {
    where: BarberUnitWhereUniqueInput
    data: XOR<BarberUnitUpdateWithoutUnitInput, BarberUnitUncheckedUpdateWithoutUnitInput>
  }

  export type BarberUnitUpdateManyWithWhereWithoutUnitInput = {
    where: BarberUnitScalarWhereInput
    data: XOR<BarberUnitUpdateManyMutationInput, BarberUnitUncheckedUpdateManyWithoutUnitInput>
  }

  export type BarberUnitScalarWhereInput = {
    AND?: BarberUnitScalarWhereInput | BarberUnitScalarWhereInput[]
    OR?: BarberUnitScalarWhereInput[]
    NOT?: BarberUnitScalarWhereInput | BarberUnitScalarWhereInput[]
    id?: StringFilter<"BarberUnit"> | string
    barberId?: StringFilter<"BarberUnit"> | string
    unitId?: StringFilter<"BarberUnit"> | string
    schedule?: JsonFilter<"BarberUnit">
  }

  export type BookingUpsertWithWhereUniqueWithoutUnitInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutUnitInput, BookingUncheckedUpdateWithoutUnitInput>
    create: XOR<BookingCreateWithoutUnitInput, BookingUncheckedCreateWithoutUnitInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutUnitInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutUnitInput, BookingUncheckedUpdateWithoutUnitInput>
  }

  export type BookingUpdateManyWithWhereWithoutUnitInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutUnitInput>
  }

  export type TenantCreateWithoutServicesInput = {
    id?: string
    name: string
    slug: string
    phone?: string | null
    email?: string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: string | null
    colorPrimary?: string
    colorAccent?: string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.TenantStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutTenantInput
    barbers?: BarberCreateNestedManyWithoutTenantInput
    bookings?: BookingCreateNestedManyWithoutTenantInput
    clients?: ClientCreateNestedManyWithoutTenantInput
    units?: UnitCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutServicesInput = {
    id?: string
    name: string
    slug: string
    phone?: string | null
    email?: string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: string | null
    colorPrimary?: string
    colorAccent?: string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.TenantStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    barbers?: BarberUncheckedCreateNestedManyWithoutTenantInput
    bookings?: BookingUncheckedCreateNestedManyWithoutTenantInput
    clients?: ClientUncheckedCreateNestedManyWithoutTenantInput
    units?: UnitUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutServicesInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutServicesInput, TenantUncheckedCreateWithoutServicesInput>
  }

  export type BookingCreateWithoutServiceInput = {
    id?: string
    dateTime: Date | string
    durationMin: number
    price: number
    status?: $Enums.BookingStatus
    origin?: $Enums.BookingOrigin
    campaignRef?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutBookingsInput
    unit?: UnitCreateNestedOneWithoutBookingsInput
    barber: BarberCreateNestedOneWithoutBookingsInput
    client: ClientCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutServiceInput = {
    id?: string
    tenantId: string
    unitId?: string | null
    barberId: string
    clientId: string
    dateTime: Date | string
    durationMin: number
    price: number
    status?: $Enums.BookingStatus
    origin?: $Enums.BookingOrigin
    campaignRef?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingCreateOrConnectWithoutServiceInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutServiceInput, BookingUncheckedCreateWithoutServiceInput>
  }

  export type BookingCreateManyServiceInputEnvelope = {
    data: BookingCreateManyServiceInput | BookingCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type TenantUpsertWithoutServicesInput = {
    update: XOR<TenantUpdateWithoutServicesInput, TenantUncheckedUpdateWithoutServicesInput>
    create: XOR<TenantCreateWithoutServicesInput, TenantUncheckedCreateWithoutServicesInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutServicesInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutServicesInput, TenantUncheckedUpdateWithoutServicesInput>
  }

  export type TenantUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    colorPrimary?: StringFieldUpdateOperationsInput | string
    colorAccent?: StringFieldUpdateOperationsInput | string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutTenantNestedInput
    barbers?: BarberUpdateManyWithoutTenantNestedInput
    bookings?: BookingUpdateManyWithoutTenantNestedInput
    clients?: ClientUpdateManyWithoutTenantNestedInput
    units?: UnitUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    colorPrimary?: StringFieldUpdateOperationsInput | string
    colorAccent?: StringFieldUpdateOperationsInput | string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    barbers?: BarberUncheckedUpdateManyWithoutTenantNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutTenantNestedInput
    clients?: ClientUncheckedUpdateManyWithoutTenantNestedInput
    units?: UnitUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type BookingUpsertWithWhereUniqueWithoutServiceInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutServiceInput, BookingUncheckedUpdateWithoutServiceInput>
    create: XOR<BookingCreateWithoutServiceInput, BookingUncheckedCreateWithoutServiceInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutServiceInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutServiceInput, BookingUncheckedUpdateWithoutServiceInput>
  }

  export type BookingUpdateManyWithWhereWithoutServiceInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutServiceInput>
  }

  export type TenantCreateWithoutBarbersInput = {
    id?: string
    name: string
    slug: string
    phone?: string | null
    email?: string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: string | null
    colorPrimary?: string
    colorAccent?: string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.TenantStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutTenantInput
    services?: ServiceCreateNestedManyWithoutTenantInput
    bookings?: BookingCreateNestedManyWithoutTenantInput
    clients?: ClientCreateNestedManyWithoutTenantInput
    units?: UnitCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutBarbersInput = {
    id?: string
    name: string
    slug: string
    phone?: string | null
    email?: string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: string | null
    colorPrimary?: string
    colorAccent?: string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.TenantStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    services?: ServiceUncheckedCreateNestedManyWithoutTenantInput
    bookings?: BookingUncheckedCreateNestedManyWithoutTenantInput
    clients?: ClientUncheckedCreateNestedManyWithoutTenantInput
    units?: UnitUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutBarbersInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutBarbersInput, TenantUncheckedCreateWithoutBarbersInput>
  }

  export type BarberUnitCreateWithoutBarberInput = {
    id?: string
    schedule: JsonNullValueInput | InputJsonValue
    unit: UnitCreateNestedOneWithoutBarberUnitsInput
  }

  export type BarberUnitUncheckedCreateWithoutBarberInput = {
    id?: string
    unitId: string
    schedule: JsonNullValueInput | InputJsonValue
  }

  export type BarberUnitCreateOrConnectWithoutBarberInput = {
    where: BarberUnitWhereUniqueInput
    create: XOR<BarberUnitCreateWithoutBarberInput, BarberUnitUncheckedCreateWithoutBarberInput>
  }

  export type BarberUnitCreateManyBarberInputEnvelope = {
    data: BarberUnitCreateManyBarberInput | BarberUnitCreateManyBarberInput[]
    skipDuplicates?: boolean
  }

  export type BookingCreateWithoutBarberInput = {
    id?: string
    dateTime: Date | string
    durationMin: number
    price: number
    status?: $Enums.BookingStatus
    origin?: $Enums.BookingOrigin
    campaignRef?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutBookingsInput
    unit?: UnitCreateNestedOneWithoutBookingsInput
    client: ClientCreateNestedOneWithoutBookingsInput
    service: ServiceCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutBarberInput = {
    id?: string
    tenantId: string
    unitId?: string | null
    clientId: string
    serviceId: string
    dateTime: Date | string
    durationMin: number
    price: number
    status?: $Enums.BookingStatus
    origin?: $Enums.BookingOrigin
    campaignRef?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingCreateOrConnectWithoutBarberInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutBarberInput, BookingUncheckedCreateWithoutBarberInput>
  }

  export type BookingCreateManyBarberInputEnvelope = {
    data: BookingCreateManyBarberInput | BookingCreateManyBarberInput[]
    skipDuplicates?: boolean
  }

  export type BarberBlockCreateWithoutBarberInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    reason?: string | null
  }

  export type BarberBlockUncheckedCreateWithoutBarberInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    reason?: string | null
  }

  export type BarberBlockCreateOrConnectWithoutBarberInput = {
    where: BarberBlockWhereUniqueInput
    create: XOR<BarberBlockCreateWithoutBarberInput, BarberBlockUncheckedCreateWithoutBarberInput>
  }

  export type BarberBlockCreateManyBarberInputEnvelope = {
    data: BarberBlockCreateManyBarberInput | BarberBlockCreateManyBarberInput[]
    skipDuplicates?: boolean
  }

  export type TenantUpsertWithoutBarbersInput = {
    update: XOR<TenantUpdateWithoutBarbersInput, TenantUncheckedUpdateWithoutBarbersInput>
    create: XOR<TenantCreateWithoutBarbersInput, TenantUncheckedCreateWithoutBarbersInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutBarbersInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutBarbersInput, TenantUncheckedUpdateWithoutBarbersInput>
  }

  export type TenantUpdateWithoutBarbersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    colorPrimary?: StringFieldUpdateOperationsInput | string
    colorAccent?: StringFieldUpdateOperationsInput | string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutTenantNestedInput
    services?: ServiceUpdateManyWithoutTenantNestedInput
    bookings?: BookingUpdateManyWithoutTenantNestedInput
    clients?: ClientUpdateManyWithoutTenantNestedInput
    units?: UnitUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutBarbersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    colorPrimary?: StringFieldUpdateOperationsInput | string
    colorAccent?: StringFieldUpdateOperationsInput | string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    services?: ServiceUncheckedUpdateManyWithoutTenantNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutTenantNestedInput
    clients?: ClientUncheckedUpdateManyWithoutTenantNestedInput
    units?: UnitUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type BarberUnitUpsertWithWhereUniqueWithoutBarberInput = {
    where: BarberUnitWhereUniqueInput
    update: XOR<BarberUnitUpdateWithoutBarberInput, BarberUnitUncheckedUpdateWithoutBarberInput>
    create: XOR<BarberUnitCreateWithoutBarberInput, BarberUnitUncheckedCreateWithoutBarberInput>
  }

  export type BarberUnitUpdateWithWhereUniqueWithoutBarberInput = {
    where: BarberUnitWhereUniqueInput
    data: XOR<BarberUnitUpdateWithoutBarberInput, BarberUnitUncheckedUpdateWithoutBarberInput>
  }

  export type BarberUnitUpdateManyWithWhereWithoutBarberInput = {
    where: BarberUnitScalarWhereInput
    data: XOR<BarberUnitUpdateManyMutationInput, BarberUnitUncheckedUpdateManyWithoutBarberInput>
  }

  export type BookingUpsertWithWhereUniqueWithoutBarberInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutBarberInput, BookingUncheckedUpdateWithoutBarberInput>
    create: XOR<BookingCreateWithoutBarberInput, BookingUncheckedCreateWithoutBarberInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutBarberInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutBarberInput, BookingUncheckedUpdateWithoutBarberInput>
  }

  export type BookingUpdateManyWithWhereWithoutBarberInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutBarberInput>
  }

  export type BarberBlockUpsertWithWhereUniqueWithoutBarberInput = {
    where: BarberBlockWhereUniqueInput
    update: XOR<BarberBlockUpdateWithoutBarberInput, BarberBlockUncheckedUpdateWithoutBarberInput>
    create: XOR<BarberBlockCreateWithoutBarberInput, BarberBlockUncheckedCreateWithoutBarberInput>
  }

  export type BarberBlockUpdateWithWhereUniqueWithoutBarberInput = {
    where: BarberBlockWhereUniqueInput
    data: XOR<BarberBlockUpdateWithoutBarberInput, BarberBlockUncheckedUpdateWithoutBarberInput>
  }

  export type BarberBlockUpdateManyWithWhereWithoutBarberInput = {
    where: BarberBlockScalarWhereInput
    data: XOR<BarberBlockUpdateManyMutationInput, BarberBlockUncheckedUpdateManyWithoutBarberInput>
  }

  export type BarberBlockScalarWhereInput = {
    AND?: BarberBlockScalarWhereInput | BarberBlockScalarWhereInput[]
    OR?: BarberBlockScalarWhereInput[]
    NOT?: BarberBlockScalarWhereInput | BarberBlockScalarWhereInput[]
    id?: StringFilter<"BarberBlock"> | string
    barberId?: StringFilter<"BarberBlock"> | string
    startTime?: DateTimeFilter<"BarberBlock"> | Date | string
    endTime?: DateTimeFilter<"BarberBlock"> | Date | string
    reason?: StringNullableFilter<"BarberBlock"> | string | null
  }

  export type BarberCreateWithoutUnitsInput = {
    id?: string
    name: string
    nickname?: string | null
    photoUrl?: string | null
    commissionPct?: number
    active?: boolean
    tenant: TenantCreateNestedOneWithoutBarbersInput
    bookings?: BookingCreateNestedManyWithoutBarberInput
    blocks?: BarberBlockCreateNestedManyWithoutBarberInput
  }

  export type BarberUncheckedCreateWithoutUnitsInput = {
    id?: string
    tenantId: string
    name: string
    nickname?: string | null
    photoUrl?: string | null
    commissionPct?: number
    active?: boolean
    bookings?: BookingUncheckedCreateNestedManyWithoutBarberInput
    blocks?: BarberBlockUncheckedCreateNestedManyWithoutBarberInput
  }

  export type BarberCreateOrConnectWithoutUnitsInput = {
    where: BarberWhereUniqueInput
    create: XOR<BarberCreateWithoutUnitsInput, BarberUncheckedCreateWithoutUnitsInput>
  }

  export type UnitCreateWithoutBarberUnitsInput = {
    id?: string
    name: string
    slug: string
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: string | null
    active?: boolean
    tenant: TenantCreateNestedOneWithoutUnitsInput
    bookings?: BookingCreateNestedManyWithoutUnitInput
  }

  export type UnitUncheckedCreateWithoutBarberUnitsInput = {
    id?: string
    tenantId: string
    name: string
    slug: string
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: string | null
    active?: boolean
    bookings?: BookingUncheckedCreateNestedManyWithoutUnitInput
  }

  export type UnitCreateOrConnectWithoutBarberUnitsInput = {
    where: UnitWhereUniqueInput
    create: XOR<UnitCreateWithoutBarberUnitsInput, UnitUncheckedCreateWithoutBarberUnitsInput>
  }

  export type BarberUpsertWithoutUnitsInput = {
    update: XOR<BarberUpdateWithoutUnitsInput, BarberUncheckedUpdateWithoutUnitsInput>
    create: XOR<BarberCreateWithoutUnitsInput, BarberUncheckedCreateWithoutUnitsInput>
    where?: BarberWhereInput
  }

  export type BarberUpdateToOneWithWhereWithoutUnitsInput = {
    where?: BarberWhereInput
    data: XOR<BarberUpdateWithoutUnitsInput, BarberUncheckedUpdateWithoutUnitsInput>
  }

  export type BarberUpdateWithoutUnitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    commissionPct?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    tenant?: TenantUpdateOneRequiredWithoutBarbersNestedInput
    bookings?: BookingUpdateManyWithoutBarberNestedInput
    blocks?: BarberBlockUpdateManyWithoutBarberNestedInput
  }

  export type BarberUncheckedUpdateWithoutUnitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    commissionPct?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    bookings?: BookingUncheckedUpdateManyWithoutBarberNestedInput
    blocks?: BarberBlockUncheckedUpdateManyWithoutBarberNestedInput
  }

  export type UnitUpsertWithoutBarberUnitsInput = {
    update: XOR<UnitUpdateWithoutBarberUnitsInput, UnitUncheckedUpdateWithoutBarberUnitsInput>
    create: XOR<UnitCreateWithoutBarberUnitsInput, UnitUncheckedCreateWithoutBarberUnitsInput>
    where?: UnitWhereInput
  }

  export type UnitUpdateToOneWithWhereWithoutBarberUnitsInput = {
    where?: UnitWhereInput
    data: XOR<UnitUpdateWithoutBarberUnitsInput, UnitUncheckedUpdateWithoutBarberUnitsInput>
  }

  export type UnitUpdateWithoutBarberUnitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    tenant?: TenantUpdateOneRequiredWithoutUnitsNestedInput
    bookings?: BookingUpdateManyWithoutUnitNestedInput
  }

  export type UnitUncheckedUpdateWithoutBarberUnitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    bookings?: BookingUncheckedUpdateManyWithoutUnitNestedInput
  }

  export type BarberCreateWithoutBlocksInput = {
    id?: string
    name: string
    nickname?: string | null
    photoUrl?: string | null
    commissionPct?: number
    active?: boolean
    tenant: TenantCreateNestedOneWithoutBarbersInput
    units?: BarberUnitCreateNestedManyWithoutBarberInput
    bookings?: BookingCreateNestedManyWithoutBarberInput
  }

  export type BarberUncheckedCreateWithoutBlocksInput = {
    id?: string
    tenantId: string
    name: string
    nickname?: string | null
    photoUrl?: string | null
    commissionPct?: number
    active?: boolean
    units?: BarberUnitUncheckedCreateNestedManyWithoutBarberInput
    bookings?: BookingUncheckedCreateNestedManyWithoutBarberInput
  }

  export type BarberCreateOrConnectWithoutBlocksInput = {
    where: BarberWhereUniqueInput
    create: XOR<BarberCreateWithoutBlocksInput, BarberUncheckedCreateWithoutBlocksInput>
  }

  export type BarberUpsertWithoutBlocksInput = {
    update: XOR<BarberUpdateWithoutBlocksInput, BarberUncheckedUpdateWithoutBlocksInput>
    create: XOR<BarberCreateWithoutBlocksInput, BarberUncheckedCreateWithoutBlocksInput>
    where?: BarberWhereInput
  }

  export type BarberUpdateToOneWithWhereWithoutBlocksInput = {
    where?: BarberWhereInput
    data: XOR<BarberUpdateWithoutBlocksInput, BarberUncheckedUpdateWithoutBlocksInput>
  }

  export type BarberUpdateWithoutBlocksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    commissionPct?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    tenant?: TenantUpdateOneRequiredWithoutBarbersNestedInput
    units?: BarberUnitUpdateManyWithoutBarberNestedInput
    bookings?: BookingUpdateManyWithoutBarberNestedInput
  }

  export type BarberUncheckedUpdateWithoutBlocksInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    commissionPct?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    units?: BarberUnitUncheckedUpdateManyWithoutBarberNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutBarberNestedInput
  }

  export type TenantCreateWithoutClientsInput = {
    id?: string
    name: string
    slug: string
    phone?: string | null
    email?: string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: string | null
    colorPrimary?: string
    colorAccent?: string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.TenantStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutTenantInput
    services?: ServiceCreateNestedManyWithoutTenantInput
    barbers?: BarberCreateNestedManyWithoutTenantInput
    bookings?: BookingCreateNestedManyWithoutTenantInput
    units?: UnitCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutClientsInput = {
    id?: string
    name: string
    slug: string
    phone?: string | null
    email?: string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: string | null
    colorPrimary?: string
    colorAccent?: string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.TenantStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    services?: ServiceUncheckedCreateNestedManyWithoutTenantInput
    barbers?: BarberUncheckedCreateNestedManyWithoutTenantInput
    bookings?: BookingUncheckedCreateNestedManyWithoutTenantInput
    units?: UnitUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutClientsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutClientsInput, TenantUncheckedCreateWithoutClientsInput>
  }

  export type BookingCreateWithoutClientInput = {
    id?: string
    dateTime: Date | string
    durationMin: number
    price: number
    status?: $Enums.BookingStatus
    origin?: $Enums.BookingOrigin
    campaignRef?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutBookingsInput
    unit?: UnitCreateNestedOneWithoutBookingsInput
    barber: BarberCreateNestedOneWithoutBookingsInput
    service: ServiceCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutClientInput = {
    id?: string
    tenantId: string
    unitId?: string | null
    barberId: string
    serviceId: string
    dateTime: Date | string
    durationMin: number
    price: number
    status?: $Enums.BookingStatus
    origin?: $Enums.BookingOrigin
    campaignRef?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingCreateOrConnectWithoutClientInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutClientInput, BookingUncheckedCreateWithoutClientInput>
  }

  export type BookingCreateManyClientInputEnvelope = {
    data: BookingCreateManyClientInput | BookingCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type TenantUpsertWithoutClientsInput = {
    update: XOR<TenantUpdateWithoutClientsInput, TenantUncheckedUpdateWithoutClientsInput>
    create: XOR<TenantCreateWithoutClientsInput, TenantUncheckedCreateWithoutClientsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutClientsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutClientsInput, TenantUncheckedUpdateWithoutClientsInput>
  }

  export type TenantUpdateWithoutClientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    colorPrimary?: StringFieldUpdateOperationsInput | string
    colorAccent?: StringFieldUpdateOperationsInput | string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutTenantNestedInput
    services?: ServiceUpdateManyWithoutTenantNestedInput
    barbers?: BarberUpdateManyWithoutTenantNestedInput
    bookings?: BookingUpdateManyWithoutTenantNestedInput
    units?: UnitUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutClientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    colorPrimary?: StringFieldUpdateOperationsInput | string
    colorAccent?: StringFieldUpdateOperationsInput | string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    services?: ServiceUncheckedUpdateManyWithoutTenantNestedInput
    barbers?: BarberUncheckedUpdateManyWithoutTenantNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutTenantNestedInput
    units?: UnitUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type BookingUpsertWithWhereUniqueWithoutClientInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutClientInput, BookingUncheckedUpdateWithoutClientInput>
    create: XOR<BookingCreateWithoutClientInput, BookingUncheckedCreateWithoutClientInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutClientInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutClientInput, BookingUncheckedUpdateWithoutClientInput>
  }

  export type BookingUpdateManyWithWhereWithoutClientInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutClientInput>
  }

  export type TenantCreateWithoutBookingsInput = {
    id?: string
    name: string
    slug: string
    phone?: string | null
    email?: string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: string | null
    colorPrimary?: string
    colorAccent?: string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.TenantStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutTenantInput
    services?: ServiceCreateNestedManyWithoutTenantInput
    barbers?: BarberCreateNestedManyWithoutTenantInput
    clients?: ClientCreateNestedManyWithoutTenantInput
    units?: UnitCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutBookingsInput = {
    id?: string
    name: string
    slug: string
    phone?: string | null
    email?: string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: string | null
    colorPrimary?: string
    colorAccent?: string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.TenantStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTenantInput
    services?: ServiceUncheckedCreateNestedManyWithoutTenantInput
    barbers?: BarberUncheckedCreateNestedManyWithoutTenantInput
    clients?: ClientUncheckedCreateNestedManyWithoutTenantInput
    units?: UnitUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutBookingsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutBookingsInput, TenantUncheckedCreateWithoutBookingsInput>
  }

  export type UnitCreateWithoutBookingsInput = {
    id?: string
    name: string
    slug: string
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: string | null
    active?: boolean
    tenant: TenantCreateNestedOneWithoutUnitsInput
    barberUnits?: BarberUnitCreateNestedManyWithoutUnitInput
  }

  export type UnitUncheckedCreateWithoutBookingsInput = {
    id?: string
    tenantId: string
    name: string
    slug: string
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: string | null
    active?: boolean
    barberUnits?: BarberUnitUncheckedCreateNestedManyWithoutUnitInput
  }

  export type UnitCreateOrConnectWithoutBookingsInput = {
    where: UnitWhereUniqueInput
    create: XOR<UnitCreateWithoutBookingsInput, UnitUncheckedCreateWithoutBookingsInput>
  }

  export type BarberCreateWithoutBookingsInput = {
    id?: string
    name: string
    nickname?: string | null
    photoUrl?: string | null
    commissionPct?: number
    active?: boolean
    tenant: TenantCreateNestedOneWithoutBarbersInput
    units?: BarberUnitCreateNestedManyWithoutBarberInput
    blocks?: BarberBlockCreateNestedManyWithoutBarberInput
  }

  export type BarberUncheckedCreateWithoutBookingsInput = {
    id?: string
    tenantId: string
    name: string
    nickname?: string | null
    photoUrl?: string | null
    commissionPct?: number
    active?: boolean
    units?: BarberUnitUncheckedCreateNestedManyWithoutBarberInput
    blocks?: BarberBlockUncheckedCreateNestedManyWithoutBarberInput
  }

  export type BarberCreateOrConnectWithoutBookingsInput = {
    where: BarberWhereUniqueInput
    create: XOR<BarberCreateWithoutBookingsInput, BarberUncheckedCreateWithoutBookingsInput>
  }

  export type ClientCreateWithoutBookingsInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    totalVisits?: number
    lastVisit?: Date | string | null
    createdAt?: Date | string
    tenant: TenantCreateNestedOneWithoutClientsInput
  }

  export type ClientUncheckedCreateWithoutBookingsInput = {
    id?: string
    tenantId: string
    name: string
    phone: string
    email?: string | null
    totalVisits?: number
    lastVisit?: Date | string | null
    createdAt?: Date | string
  }

  export type ClientCreateOrConnectWithoutBookingsInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutBookingsInput, ClientUncheckedCreateWithoutBookingsInput>
  }

  export type ServiceCreateWithoutBookingsInput = {
    id?: string
    name: string
    category: $Enums.ServiceCategory
    description?: string | null
    price: number
    durationMin: number
    active?: boolean
    sortOrder?: number
    tenant: TenantCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateWithoutBookingsInput = {
    id?: string
    tenantId: string
    name: string
    category: $Enums.ServiceCategory
    description?: string | null
    price: number
    durationMin: number
    active?: boolean
    sortOrder?: number
  }

  export type ServiceCreateOrConnectWithoutBookingsInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutBookingsInput, ServiceUncheckedCreateWithoutBookingsInput>
  }

  export type TenantUpsertWithoutBookingsInput = {
    update: XOR<TenantUpdateWithoutBookingsInput, TenantUncheckedUpdateWithoutBookingsInput>
    create: XOR<TenantCreateWithoutBookingsInput, TenantUncheckedCreateWithoutBookingsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutBookingsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutBookingsInput, TenantUncheckedUpdateWithoutBookingsInput>
  }

  export type TenantUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    colorPrimary?: StringFieldUpdateOperationsInput | string
    colorAccent?: StringFieldUpdateOperationsInput | string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutTenantNestedInput
    services?: ServiceUpdateManyWithoutTenantNestedInput
    barbers?: BarberUpdateManyWithoutTenantNestedInput
    clients?: ClientUpdateManyWithoutTenantNestedInput
    units?: UnitUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableJsonNullValueInput | InputJsonValue
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    colorPrimary?: StringFieldUpdateOperationsInput | string
    colorAccent?: StringFieldUpdateOperationsInput | string
    openingHours?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTenantNestedInput
    services?: ServiceUncheckedUpdateManyWithoutTenantNestedInput
    barbers?: BarberUncheckedUpdateManyWithoutTenantNestedInput
    clients?: ClientUncheckedUpdateManyWithoutTenantNestedInput
    units?: UnitUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type UnitUpsertWithoutBookingsInput = {
    update: XOR<UnitUpdateWithoutBookingsInput, UnitUncheckedUpdateWithoutBookingsInput>
    create: XOR<UnitCreateWithoutBookingsInput, UnitUncheckedCreateWithoutBookingsInput>
    where?: UnitWhereInput
  }

  export type UnitUpdateToOneWithWhereWithoutBookingsInput = {
    where?: UnitWhereInput
    data: XOR<UnitUpdateWithoutBookingsInput, UnitUncheckedUpdateWithoutBookingsInput>
  }

  export type UnitUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    tenant?: TenantUpdateOneRequiredWithoutUnitsNestedInput
    barberUnits?: BarberUnitUpdateManyWithoutUnitNestedInput
  }

  export type UnitUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    barberUnits?: BarberUnitUncheckedUpdateManyWithoutUnitNestedInput
  }

  export type BarberUpsertWithoutBookingsInput = {
    update: XOR<BarberUpdateWithoutBookingsInput, BarberUncheckedUpdateWithoutBookingsInput>
    create: XOR<BarberCreateWithoutBookingsInput, BarberUncheckedCreateWithoutBookingsInput>
    where?: BarberWhereInput
  }

  export type BarberUpdateToOneWithWhereWithoutBookingsInput = {
    where?: BarberWhereInput
    data: XOR<BarberUpdateWithoutBookingsInput, BarberUncheckedUpdateWithoutBookingsInput>
  }

  export type BarberUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    commissionPct?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    tenant?: TenantUpdateOneRequiredWithoutBarbersNestedInput
    units?: BarberUnitUpdateManyWithoutBarberNestedInput
    blocks?: BarberBlockUpdateManyWithoutBarberNestedInput
  }

  export type BarberUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    commissionPct?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    units?: BarberUnitUncheckedUpdateManyWithoutBarberNestedInput
    blocks?: BarberBlockUncheckedUpdateManyWithoutBarberNestedInput
  }

  export type ClientUpsertWithoutBookingsInput = {
    update: XOR<ClientUpdateWithoutBookingsInput, ClientUncheckedUpdateWithoutBookingsInput>
    create: XOR<ClientCreateWithoutBookingsInput, ClientUncheckedCreateWithoutBookingsInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutBookingsInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutBookingsInput, ClientUncheckedUpdateWithoutBookingsInput>
  }

  export type ClientUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    lastVisit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutClientsNestedInput
  }

  export type ClientUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    lastVisit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUpsertWithoutBookingsInput = {
    update: XOR<ServiceUpdateWithoutBookingsInput, ServiceUncheckedUpdateWithoutBookingsInput>
    create: XOR<ServiceCreateWithoutBookingsInput, ServiceUncheckedCreateWithoutBookingsInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutBookingsInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutBookingsInput, ServiceUncheckedUpdateWithoutBookingsInput>
  }

  export type ServiceUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumServiceCategoryFieldUpdateOperationsInput | $Enums.ServiceCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    durationMin?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    tenant?: TenantUpdateOneRequiredWithoutServicesNestedInput
  }

  export type ServiceUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumServiceCategoryFieldUpdateOperationsInput | $Enums.ServiceCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    durationMin?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type UserCreateManyTenantInput = {
    id?: string
    email: string
    name: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCreateManyTenantInput = {
    id?: string
    name: string
    category: $Enums.ServiceCategory
    description?: string | null
    price: number
    durationMin: number
    active?: boolean
    sortOrder?: number
  }

  export type BarberCreateManyTenantInput = {
    id?: string
    name: string
    nickname?: string | null
    photoUrl?: string | null
    commissionPct?: number
    active?: boolean
  }

  export type BookingCreateManyTenantInput = {
    id?: string
    unitId?: string | null
    barberId: string
    clientId: string
    serviceId: string
    dateTime: Date | string
    durationMin: number
    price: number
    status?: $Enums.BookingStatus
    origin?: $Enums.BookingOrigin
    campaignRef?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientCreateManyTenantInput = {
    id?: string
    name: string
    phone: string
    email?: string | null
    totalVisits?: number
    lastVisit?: Date | string | null
    createdAt?: Date | string
  }

  export type UnitCreateManyTenantInput = {
    id?: string
    name: string
    slug: string
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: string | null
    active?: boolean
  }

  export type UserUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumServiceCategoryFieldUpdateOperationsInput | $Enums.ServiceCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    durationMin?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    bookings?: BookingUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumServiceCategoryFieldUpdateOperationsInput | $Enums.ServiceCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    durationMin?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    bookings?: BookingUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumServiceCategoryFieldUpdateOperationsInput | $Enums.ServiceCategory
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    durationMin?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type BarberUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    commissionPct?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    units?: BarberUnitUpdateManyWithoutBarberNestedInput
    bookings?: BookingUpdateManyWithoutBarberNestedInput
    blocks?: BarberBlockUpdateManyWithoutBarberNestedInput
  }

  export type BarberUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    commissionPct?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    units?: BarberUnitUncheckedUpdateManyWithoutBarberNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutBarberNestedInput
    blocks?: BarberBlockUncheckedUpdateManyWithoutBarberNestedInput
  }

  export type BarberUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    commissionPct?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BookingUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    origin?: EnumBookingOriginFieldUpdateOperationsInput | $Enums.BookingOrigin
    campaignRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unit?: UnitUpdateOneWithoutBookingsNestedInput
    barber?: BarberUpdateOneRequiredWithoutBookingsNestedInput
    client?: ClientUpdateOneRequiredWithoutBookingsNestedInput
    service?: ServiceUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitId?: NullableStringFieldUpdateOperationsInput | string | null
    barberId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    dateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    origin?: EnumBookingOriginFieldUpdateOperationsInput | $Enums.BookingOrigin
    campaignRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitId?: NullableStringFieldUpdateOperationsInput | string | null
    barberId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    dateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    origin?: EnumBookingOriginFieldUpdateOperationsInput | $Enums.BookingOrigin
    campaignRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    lastVisit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    lastVisit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    totalVisits?: IntFieldUpdateOperationsInput | number
    lastVisit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UnitUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    barberUnits?: BarberUnitUpdateManyWithoutUnitNestedInput
    bookings?: BookingUpdateManyWithoutUnitNestedInput
  }

  export type UnitUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    barberUnits?: BarberUnitUncheckedUpdateManyWithoutUnitNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutUnitNestedInput
  }

  export type UnitUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BarberUnitCreateManyUnitInput = {
    id?: string
    barberId: string
    schedule: JsonNullValueInput | InputJsonValue
  }

  export type BookingCreateManyUnitInput = {
    id?: string
    tenantId: string
    barberId: string
    clientId: string
    serviceId: string
    dateTime: Date | string
    durationMin: number
    price: number
    status?: $Enums.BookingStatus
    origin?: $Enums.BookingOrigin
    campaignRef?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BarberUnitUpdateWithoutUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    schedule?: JsonNullValueInput | InputJsonValue
    barber?: BarberUpdateOneRequiredWithoutUnitsNestedInput
  }

  export type BarberUnitUncheckedUpdateWithoutUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    schedule?: JsonNullValueInput | InputJsonValue
  }

  export type BarberUnitUncheckedUpdateManyWithoutUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    schedule?: JsonNullValueInput | InputJsonValue
  }

  export type BookingUpdateWithoutUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    origin?: EnumBookingOriginFieldUpdateOperationsInput | $Enums.BookingOrigin
    campaignRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutBookingsNestedInput
    barber?: BarberUpdateOneRequiredWithoutBookingsNestedInput
    client?: ClientUpdateOneRequiredWithoutBookingsNestedInput
    service?: ServiceUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    dateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    origin?: EnumBookingOriginFieldUpdateOperationsInput | $Enums.BookingOrigin
    campaignRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyWithoutUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    barberId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    dateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    origin?: EnumBookingOriginFieldUpdateOperationsInput | $Enums.BookingOrigin
    campaignRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateManyServiceInput = {
    id?: string
    tenantId: string
    unitId?: string | null
    barberId: string
    clientId: string
    dateTime: Date | string
    durationMin: number
    price: number
    status?: $Enums.BookingStatus
    origin?: $Enums.BookingOrigin
    campaignRef?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    origin?: EnumBookingOriginFieldUpdateOperationsInput | $Enums.BookingOrigin
    campaignRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutBookingsNestedInput
    unit?: UnitUpdateOneWithoutBookingsNestedInput
    barber?: BarberUpdateOneRequiredWithoutBookingsNestedInput
    client?: ClientUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    unitId?: NullableStringFieldUpdateOperationsInput | string | null
    barberId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    dateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    origin?: EnumBookingOriginFieldUpdateOperationsInput | $Enums.BookingOrigin
    campaignRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    unitId?: NullableStringFieldUpdateOperationsInput | string | null
    barberId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    dateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    origin?: EnumBookingOriginFieldUpdateOperationsInput | $Enums.BookingOrigin
    campaignRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BarberUnitCreateManyBarberInput = {
    id?: string
    unitId: string
    schedule: JsonNullValueInput | InputJsonValue
  }

  export type BookingCreateManyBarberInput = {
    id?: string
    tenantId: string
    unitId?: string | null
    clientId: string
    serviceId: string
    dateTime: Date | string
    durationMin: number
    price: number
    status?: $Enums.BookingStatus
    origin?: $Enums.BookingOrigin
    campaignRef?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BarberBlockCreateManyBarberInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    reason?: string | null
  }

  export type BarberUnitUpdateWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    schedule?: JsonNullValueInput | InputJsonValue
    unit?: UnitUpdateOneRequiredWithoutBarberUnitsNestedInput
  }

  export type BarberUnitUncheckedUpdateWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    schedule?: JsonNullValueInput | InputJsonValue
  }

  export type BarberUnitUncheckedUpdateManyWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    schedule?: JsonNullValueInput | InputJsonValue
  }

  export type BookingUpdateWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    origin?: EnumBookingOriginFieldUpdateOperationsInput | $Enums.BookingOrigin
    campaignRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutBookingsNestedInput
    unit?: UnitUpdateOneWithoutBookingsNestedInput
    client?: ClientUpdateOneRequiredWithoutBookingsNestedInput
    service?: ServiceUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    unitId?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    dateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    origin?: EnumBookingOriginFieldUpdateOperationsInput | $Enums.BookingOrigin
    campaignRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    unitId?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    dateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    origin?: EnumBookingOriginFieldUpdateOperationsInput | $Enums.BookingOrigin
    campaignRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BarberBlockUpdateWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BarberBlockUncheckedUpdateWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BarberBlockUncheckedUpdateManyWithoutBarberInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BookingCreateManyClientInput = {
    id?: string
    tenantId: string
    unitId?: string | null
    barberId: string
    serviceId: string
    dateTime: Date | string
    durationMin: number
    price: number
    status?: $Enums.BookingStatus
    origin?: $Enums.BookingOrigin
    campaignRef?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    origin?: EnumBookingOriginFieldUpdateOperationsInput | $Enums.BookingOrigin
    campaignRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutBookingsNestedInput
    unit?: UnitUpdateOneWithoutBookingsNestedInput
    barber?: BarberUpdateOneRequiredWithoutBookingsNestedInput
    service?: ServiceUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    unitId?: NullableStringFieldUpdateOperationsInput | string | null
    barberId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    dateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    origin?: EnumBookingOriginFieldUpdateOperationsInput | $Enums.BookingOrigin
    campaignRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    unitId?: NullableStringFieldUpdateOperationsInput | string | null
    barberId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    dateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMin?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    origin?: EnumBookingOriginFieldUpdateOperationsInput | $Enums.BookingOrigin
    campaignRef?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}