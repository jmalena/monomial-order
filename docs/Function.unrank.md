[monomial](../wiki/globals) / unrank

# Function: unrank()

> **unrank**\<`K`\>(`_k`, `_rank`): `KTuple`\<`K`, `number`\>

Defined in: [index.ts:25](https://github.com/jmalena/monomial/blob/f2aef221f537a80e1c53982315984393ca802643/src/index.ts#L25)

Finds the `k`-tuple `u` corresponding to a given rank within the specified monomial ordering.
The rank is the position of `k`-tuple `u` in the monomial ordering of all possible `k`-tuples.

## Type Parameters

• **K** *extends* `number`

## Parameters

### \_k

`K`

### \_rank

`bigint`

## Returns

`KTuple`\<`K`, `number`\>

The `k`-tuple corresponding to the given rank in the monomial ordering.
