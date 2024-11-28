---
title: Environment Variables
---

Environment variables are a way to store information about the system for programs to use.

They are a core part of [designing robust and extensible software](./12_factor_apps.md)

## Important environment variables
`$PATH` is a variable that tells the shell where to look for executables.
`$HOME` is the user's home directory.
`$USER` is the user's username.

## Setting environment variables
To set an environment variable, use the `export` command.

```bash
export MY_VARIABLE=my_value
```

## Using environment variables
To use an environment variable, use the `$` symbol followed by the variable name.

```bash
echo $MY_VARIABLE
```

## Resources
[Environment variables in the Bash manual](https://www.gnu.org/software/bash/manual/html_node/Bash-Variables.html)
