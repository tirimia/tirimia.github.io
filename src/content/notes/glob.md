---
title: Glob
---
Glob is a pattern matching language that is used to match file names. It is similar to regular expressions, but less powerful.

Globs are used in [shell](./shell.md) commands like `ls` and `find` to specify which files to list.

## Examples
The most basic example you will see is `*`, which matches anything.

Commonly it follows a path, like `src/*` to match all files in the `src` directory.

Double stars `**` match any number of directories, like `src/**/example.py` to find all `example.py` files in the `src` directory and any subdirectories.
