---
title: Regular Expressions
---

Regular expressions are a way to match patterns in text.

They are used in [shell](./shell.md) commands like [grep](./grep.md) and [sed](./sed.md).

## Match groups
A regular expression can contain groups of text that can be referenced for later use.

Example: remove all quotes around a string made up of letters and numbers.
```bash
echo '"hello world"' | sed 's/^"\(.*\)"$/\1/'
```
The expession character by character is:
- `^` start of string
- `"` match a quote
- `\(` start a group - the backslash is used to [escape](./escape_character.md) the parenthesis
- `.*` match any character zero or more times
- `\)` end a group
- `$` end of string
- `"` match a quote
- `/` replace the matched text with
- `\1` the first match group
