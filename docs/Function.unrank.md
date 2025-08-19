[monomial-order](../wiki/globals) / unrank

# Function: unrank()

> **unrank**(`ordering`, `rank`, `c`): `number`[]

Defined in: [index.ts:66](https://github.com/jmalena/monomial-order/blob/c2e19d19c9d2e5f1ab04a42d1e136f616b0c8b7f/src/index.ts#L66)

Returns the `k`-tuple `u` corresponding to a given `rank` (1-based) within the given monomial ordering under constraints `c`.

## Parameters

### ordering

`Ordering`

The monomial ordering.

### rank

`bigint`

The 1-based rank of the `k`-tuple `u`.

### c

`OrderingConstraints`

The constraints applied on the monomial ordering.

## Returns

`number`[]

The `k`-tuple corresponding to the `rank` in the given monomial ordering.
