[monomial-order](../wiki/globals) / rank

# Function: rank()

> **rank**(`ordering`, `u`, `c`): `bigint`

Defined in: [index.ts:42](https://github.com/jmalena/monomial-order/blob/c2e19d19c9d2e5f1ab04a42d1e136f616b0c8b7f/src/index.ts#L42)

Returns the rank (1-based) of the `k`-tuple `u` within the given monomial ordering under constraints `c`.

## Parameters

### ordering

`Ordering`

The monomial ordering.

### u

`number`[]

The `k`-tuple whose rank is being requested.

### c

`OrderingConstraints`

The constraints applied on the monomial ordering.

## Returns

`bigint`

The 1-based rank of the `k`-tuple `u`.
