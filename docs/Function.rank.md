[monomial](../wiki/globals) / rank

# Function: rank()

> **rank**(`order`, `k`, `u`): `bigint`

Defined in: [index.ts:14](https://github.com/jmalena/monomial/blob/e6e2e62ff6c2ed1f037b21147ad8741b88e74ecc/src/index.ts#L14)

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
