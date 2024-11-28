---
title: sed
---

Sed is short for `stream editor`. It is a command line tool for performing text transformations on input text or binary files.

## Examples

Replace all occurrences of `foo` with `bar` in a file:

```bash
sed 's/foo/bar/g' file.txt
```

Replace all occurrences of `foo` with `bar` in a file, but only on lines that start with `foo`:

```bash
sed '/^foo/s/foo/bar/g' file.txt
```

## Resources
[GNU sed manual](https://www.gnu.org/software/sed/manual/sed.html)
