---
title: URL
---
Short for `Uniform Resource Locator`.

You'll see them as addresses to web pages, database connection strings, file locations in cloud buckets, and many other uses.

## Components (simplified)
A URL has three main components:

1. Protocol
2. Host
3. Path

### Protocol
The protocol is the first part of the URL, and tells the client how to connect to the server. In browsers, it is usually `http` or `https`.

### Host
The host is the second part of the URL, and tells the browser where to connect to. It is usually a domain name, but can also be an IP address.

### Path
The path is the third part of the URL, and tells the client what to request from the server. It is usually a file path, but can also be a directory path.

### Examples
`https://www.google.com/` is a URL that connects to the Google website.

`https://www.google.com/search?q=hello` is a URL that connects to the Google search page, and passes a query string to the server.

`https://www.google.com/search?q=hello#results` is a URL that connects to the Google search page, passes a query string to the server, and scrolls to the results section.

## Components (detailed)
### Scheme
The scheme is the first part of the URL, and tells the client how to connect to the server. In browsers, it is usually `http` or `https`.

 ### Domain
 The domain is the second part of the URL, and tells the browser where to connect to. It is usually a domain name, but can also be an IP address.
 ### Port
 The port is the third part of the URL, and tells the browser which port to connect to. It is usually `80` for `http` and `443` for `https`.
 ### Path
 The path is the fourth part of the URL, and tells the client what to request from the server. It is usually a file path, but can also be a directory path.
 ### Query String
 The query string is the fifth part of the URL, and tells the client what to request from the server. It follows the path after a `?` character and may contain key-value pairs separated by `&`.
 ### Fragment
 The fragment is the sixth part of the URL, and tells the client which specific part of the page is being requested.
