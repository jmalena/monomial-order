[monomial](../wiki/globals) / rank

# Function: rank()

> **rank**(`ordering`, `u`, `c`): `bigint`

Defined in: [index.ts:42](https://github.com/jmalena/monomial/blob/9436c55c924419a6691cae4b665e86f5f1b5e441/src/index.ts#L42)

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
