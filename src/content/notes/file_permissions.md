---
title: File Permissions
---

File permissions are a way to control who can read (r), write (w), and execute (x) a file or directory.

The permissions are split into three groups:

- User
- Group
- Others

Permissions are usually written as three digits, where the first digit is the user, the second digit is the group, and the third digit is the others.
To calculate the three digits, you can use the following formula:

`r = 4 (read), w = 2 (write), x = 1 (execute)`

As you may have noticed, the values are powers of two. That comes in very handy as we can then represent the persmissions a single binary (or [octal](./number_base.md)) number by concatenating the three blocks of three binary digits.

For example, if the user can do everything, the group can read and write, but others can only execute, the permissions would be
 | Base/Scope                           | <mark>User</mark> | <mark>Group</mark> | <mark>Others</mark> |
 |--------------------------------------|-------------------|--------------------|---------------------|
 | <mark class="alt-mark">Binary</mark> | 111               | 110                | 001                 |
 | <mark class="alt-mark">Octal</mark>  | 7                 | 6                  | 1                   |
