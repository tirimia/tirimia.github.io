---
title: File access modes
draft: true
---

These modes describe how the [kernel](./kernel.md) should open a file.

Common modes are:
- read
- write (overwrites files)
- append (add to end of file)
- binary (read/write in binary mode)
- text (read/write in text mode)
- a combination of the above

These modes are set when the file is opened. To change them, you need to close the [file descriptor](./file_descriptor.md) and then create another.

## Relevant links
- How [C](./c.md) expects [file modes](https://www.gnu.org/software/libc/manual/html_node/Access-Modes.html) to be passed
- [Python](./python.md) file [modes](https://www.geeksforgeeks.org/file-mode-in-python/)
