[monomial](../wiki/globals) / rank

# Function: rank()

> **rank**(`order`, `k`, `u`): `bigint`

Defined in: [index.ts:11](https://github.com/jmalena/monomial/blob/9dade72b40103fe7936f99f831ce99a28bfb6c5a/src/index.ts#L11)

Finds the rank (1-based) of the `k`-tuple `u` within the given monomial ordering.
The rank is the position of `k`-tuple `u` in the monomial ordering of all possible `k`-tuples.

## Parameters

### order

`Order`

### k

`number`

The length of the searched `k`-tuple `u`.

### u

`number`[]

The `k`-tuple whose rank is being searched.

## Returns

`bigint`

The 1-based rank of the `k`-tuple `u`.
