---
title: Escape Character
---

Representing newlines, tabs, and other special characters in a string is a common task.

Using only [ascii](./ascii.md) characters, we can represent these special concepts typically with a backslash followed by one or more (typically mnemonic) characters. They can also be used to represent numbers, like `\x1f` for the [hex](./number_base.md) value `0x1f`.

A common escape sequence you might have already seen (when your browser maybe is missing a font) is `\u` followed by four [hexadecimal](./number_base.md) digits representing the [unicode](./unicode.md) value of the character.

For example, to represent a newline, we use `\n`
