# Operating System Differences

F2 supports multiple operating systems, but there are some differences in how
file renaming is handled depending on the platform. Below are the key details
for each supported operating system.

## Linux

- Dot files are considered hidden by default, and you must use `-H/--hidden` to
  match on them.
- Filenames must be no longer than **255 bytes**.

## macOS

- Like Linux, dot files are considered hidden by default, and you must use
  `-H/--hidden` to match on them.
- Filenames must be no longer than **255 bytes**.
- The `:` character is forbidden in file names and will trigger a
  [conflict](/guide/conflict-detection) if included.

## Windows

- Unlike Linux and macOS, dot files are **not** considered hidden. Only files
  with the hidden attribute are treated as hidden on Windows.
- Filenames can be up to **260 characters** long.
- Windows has several restricted characters that cannot be used in file names:
  `<`, `>`, `:`, `"`, `|`, `?`, and `*`.
