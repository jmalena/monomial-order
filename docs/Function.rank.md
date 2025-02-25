[monomial](../wiki/globals) / rank

# Function: rank()

> **rank**(`order`, `u`, `c`): `bigint`

Defined in: [index.ts:42](https://github.com/jmalena/monomial/blob/cb4adf9eef484926e83882c47a7261e594623f9d/src/index.ts#L42)

Returns the rank (1-based) of the `k`-tuple `u` within the given monomial order under constraints `c`.

## Parameters

### order

`Order`

The monomial order.

### u

`number`[]

The `k`-tuple whose rank is being requested.

### c

`OrderConstraints`

The constraints applied on the monomial order.

## Returns

`bigint`

The 1-based rank of the `k`-tuple `u`.
