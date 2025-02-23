[monomial](../wiki/globals) / unrank

# Function: unrank()

> **unrank**(`order`, `k`, `rank`): `number`[]

Defined in: [index.ts:23](https://github.com/jmalena/monomial/blob/9dade72b40103fe7936f99f831ce99a28bfb6c5a/src/index.ts#L23)

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
