[monomial](../wiki/globals) / unrank

# Function: unrank()

> **unrank**(`order`, `k`, `rank`): `number`[]

Defined in: [index.ts:23](https://github.com/jmalena/monomial/blob/2bb18875914db655a36ced0a9786547056e433fc/src/index.ts#L23)

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
