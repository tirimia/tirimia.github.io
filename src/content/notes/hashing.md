---
title: Hashing
draft: true
---
Hashing is a way to represent data in a fixed length string of characters.

Hashes are often used to represent passwords, and are also used in [cryptography](./cryptography.md) to verify data integrity.

## Hash Functions
A hash function is a function that takes an input and returns a fixed length output.
They have to be [deterministic](./determinism.md), quick and irreversible (should be impossible to compute the input from the output).

Common hash functions you will see in use: `SHA-1`, `SHA-256`, `MD5`

How these functions work:
- The input data is broken down into blocks based on the block size of the hash function
- After the first chunk is processed, the resulting hash is combined with the rest of the data
- Rinse and repeat until all data is processed

## Hash Values
Hash values are the output of a hash function.

Ideally, the hash value is unique to the input data, but this is not always the case.
We call that a collision.

Collisions can be resolved by using a different hash function, or by using a [salt](./salting.md).

## Uses
Hashes are used in a variety of places:
- [Dictionaries](./dictionary.md)
