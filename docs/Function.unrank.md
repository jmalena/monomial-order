[monomial](../wiki/globals) / unrank

# Function: unrank()

> **unrank**(`order`, `k`, `rank`): `number`[]

Defined in: [index.ts:26](https://github.com/jmalena/monomial/blob/f6e63a247b69e5bb8458169faad9d1ca5cb824e4/src/index.ts#L26)

Finds the `k`-tuple `u` corresponding to a given rank within the specified monomial ordering.
The rank is the position of `k`-tuple `u` in the monomial ordering of all possible `k`-tuples.

## Parameters

### order

`Order`

### k

`number`

The length of the generated `k`-tuple `u`.

### rank

`bigint`

The 1-based rank of the `k`-tuple.

## Returns

`number`[]

The `k`-tuple corresponding to the given rank in the monomial ordering.
