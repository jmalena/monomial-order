[monomial](../wiki/globals) / rank

# Function: rank()

> **rank**\<`K`\>(`_k`, `_u`): `bigint`

Defined in: [index.ts:13](https://github.com/jmalena/monomial/blob/1638ff5c9241e55dbf9abc285b76ef3a69177640/src/index.ts#L13)

Finds the rank of the `k`-tuple `u` within the given monomial ordering.
The rank is the position of `k`-tuple `u` in the monomial ordering of all possible `k`-tuples.

## Type Parameters

• **K** *extends* `number`

## Parameters

### \_k

`K`

### \_u

`KTuple`\<`K`, `number`\>

## Returns

`bigint`

The 1-based rank of the `k`-tuple `u`.
