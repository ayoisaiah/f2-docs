# Environmental Variables

F2 provides additional flexibility through environment variables, allowing you
to configure default settings that persist across multiple sessions. This is
particularly useful for options you rarely change and reduces the need to pass
specific flags every time you run a command.

## 1. F2_DEFAULT_OPTS

You can use the `F2_DEFAULT_OPTS` environment variable to set frequently used
options as the default for every renaming operation. This way, you don't have to
include these options manually in each command.

For example, to always run F2 in execute mode, include hidden files, and process
directories as well as files, you can set:

```bash
export F2_DEFAULT_OPTS='-x -H -d'
```

In this case:

- `-x`: Enables execute mode (applies the renaming changes immediately).
- `-H`: Includes hidden files in the renaming operation.
- `-d`: Processes directories as well as files.

You can configure the command-line options in `F2_DEFAULT_OPTS`:

```text
--exclude
--exclude-dir
--exec
--exiftool-opts
--fix-conflicts
--fix-conflicts-pattern
--hidden
--ignore-case
--ignore-ext
--include-dir
--json
--no-color
--quiet
--recursive
--sort
--sortr
--reset-index-per-dir
--string-mode
--verbose
```

You can execute your F2 commands with the `--verbose` option to see which
options are being applied from the environment.

```bash
F2_DEFAULT_OPTS="-V -H" f2 -f 'hid'
```

Outputs:

```text
default option '--hidden' applied from the environment: true
default option '--verbose' applied from the environment: true
*——————————*—————————*————————*
| ORIGINAL | RENAMED | STATUS |
*——————————*—————————*————————*
| .hidden  | .den    | ok     |
*——————————*—————————*————————*
```

## 2. F2_NO_COLOR and NO_COLOR

Setting either of these environment variables disables colored output in F2,
which can be helpful when working in environments that don't support color
formatting (e.g., scripts or certain terminals).

```bash
export F2_NO_COLOR=true
export NO_COLOR=true
```

With either variable set, F2's output will be in plain text without any colors.
