[monomial](../wiki/globals) / unrank

# Function: unrank()

> **unrank**(`ordering`, `rank`, `c`): `number`[]

Defined in: [index.ts:66](https://github.com/jmalena/monomial/blob/9436c55c924419a6691cae4b665e86f5f1b5e441/src/index.ts#L66)

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
