# monomial

Library for representing and working with monomials under various constraints. This library is currently limited to *primitive* monomials.

## What monomial is?

A monomial is a mathematical expression of form $c x_1^{a_1} x_2^{a_2} \dots x_n^{a_k}$, where:

* $c$ is a constant coefficient (when $c = 1$, the monomial is called *primitive*).
* $x_i$ are variables.
* $a_i$ are non-negative integer exponents.

You can view monomial as a polynomial with just one term.

### Monomial degree

Degree of monomial $deg(u) = a_1 + a_2 + \dots + a_k$ is sum of monomial exponents.

### Examples:

* $-2x^4$ (monomial of 1 variable and degree 4)
* $3xy^2$ (monomial of 2 variables and degree 3)
* $x^2y^3z^4$ (*primitive* monomial of 3 variables and degree 9)

## Operations

### Supported constraints

In this library, you can apply following costraints to monomials:

* **Degree**: For monomial $u$ holds $deg(u) = d$.
* **Maximal exponent**: For each exponent $a_i$ of monomial holds $0 \leq a_i < m$.
