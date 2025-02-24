# monomial

Package providing functionality for working with monomials, including operations under various constraints.

## Install

```sh
$ npm install --save monomial
```

## What is monomial?

A monomial is a mathematical expression of form $c x_1^{a_1} x_2^{a_2} \dots x_k^{a_k}$, where:

* $c$ is a constant coefficient (when $c = 1$, the monomial is called *primitive*).
* $x_i$ are variables.
* $a_i$ are exponents.

You can view monomial as a polynomial with just one term.

### Monomial degree

Degree of monomial $deg(u) = a_1 + a_2 + \dots + a_k$ is sum of monomial exponents.

### Examples:

* $-2x^4$ ($k=1$ and degree of 1)
* $3xy^2$ ($k=2$ and degree of 3)
* $x^2y^3z^4$ ($k=3$ and degre of 9; this monomial is also *primitive*)

## How is monomial represented?

Monomial of `k` variables is represented as k-tuple, where elements are exponents. In our JS/TS world, k-tuple is array of length $k$. Therefore monomial $u = xz^2 = x^1y^0z^2$ is represented as:

```typescript
const u: number[] = [1, 0, 2];
```

## Monomial orderings

Following monomial orderings are currently available:

* Lexicographic Order (lex)
* Graded Lexicographic Order (grlex)

and more of them will be supported in the future. Within this orderings, you can use performant [`rank`](https://github.com/jmalena/monomial/blob/main/docs/Function.rank.md) and [`unrank`](https://github.com/jmalena/monomial/blob/main/docs/Function.unrank.md) operations, supporting various constraints.

## Constrained monomials

You can also apply following constraints on monomials:

### Modulo constraint

Restrict your scope to monomials $u$ having exponent smaller than $m$. In this case grlex enumeration of first few monomials with parameters $k = 3$ and $m = 2$ looks as follows:

```typescript
[0, 0, 0] // Rank 1
[0, 0, 1] // Rank 2
[0, 1, 0] // Rank 3
[1, 0, 0] // Rank 4
[0, 1, 1] // Rank 5
[1, 0, 1] // Rank 6
…
```

### Degree constraint

*This will be added soon*.

<!--
Allows only monomials $á$ such that $deg(u) = d$. For parameters $k = 3$ and $d = 2$ under grlex order, we have:

```typescript
[0, 0, 2] // Rank 1
[0, 1, 1] // Rank 2
[0, 2, 0] // Rank 3
…
```
!-->

## Current limitations

Only *primitive* monomials and monomials with non-negative exponents are supported.
