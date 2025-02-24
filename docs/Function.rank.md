[monomial](../wiki/globals) / rank

# Function: rank()

> **rank**(`order`, `u`, `c`): `bigint`

Defined in: [index.ts:36](https://github.com/jmalena/monomial/blob/2fd30fed996803077a8aaaee894126ec2c1f2862/src/index.ts#L36)

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
