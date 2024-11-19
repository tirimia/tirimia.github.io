---
title: HTML Encoding
---
[URIs](./uri.md) only support a [subset](./set_theory.md) of [ASCII](./ascii.md) characters as mentioned in [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986#section-2).

In order to pass

Languages typically include a way to turn arbitrary strings into correctly encoded strings, like the following example in [Python](./python.md)

```python
from html import escape
from urllib.parse import quote

example_string = 'spaces and \\/ slashes >'

print(f'Plain:   {example_string}')
print(f'Quoted:  {quote(example_string)}')
print(f'Escaped: {escape(example_string)}')
```
Output:
```
Plain:   spaces and \/ slashes >
Quoted:  spaces%20and%20%5C/%20slashes%20%3E
Escaped: spaces and \/ slashes &gt;
```
link to URI
link to URL
link to what RFCs are
