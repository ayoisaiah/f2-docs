# How Variables Work

F2 supports the use of variables in replacement strings, allowing you to
dynamically insert file information into new filenames during renaming.

<!-- prettier-ignore-start -->
::: info
[Regex capture variables](/reference/regex#capture-variables-in-f2) are also supported but discussed separately.
:::
<!-- prettier-ignore-end -->

## Syntax Overview

In F2, any text within curly braces (`{<var>}`) is treated as a variable. Since
version 1.9.0, a single pair of curly braces is used (e.g., `{var}`), although
the older double-brace syntax (`{{<var>}}`) is still supported for backward
compatibility.

The following example assumes your current working directory is house-chores and
contains these files:

```bash
house-chores/
├── cleaning.md
├── laundry.md
├── mowing.md
└── washing.md
```

You can include one or more variables in the replacement string. For instance,
`{p}`, `{f}`, and `{ext}` represent the parent directory, filename, and file
extension respectively.

```bash
f2 -r "{p}_{f}{ext}"
```

F2 will replace each variable with the appropriate data from the file:

- `{p}` becomes `house-chores` (the parent directory).
- `{f}` becomes the original filename (`cleaning`, `laundry`, etc.).
- `{ext}` becomes the original file extension (`.md`).

```text
 *—————————————*——————————————————————————*————————*
 |  ORIGINAL   |         RENAMED          | STATUS |
 *—————————————*——————————————————————————*————————*
 | cleaning.md | house-chores_cleaning.md | ok     |
 | laundry.md  | house-chores_laundry.md  | ok     |
 | mowing.md   | house-chores_mowing.md   | ok     |
 | washing.md  | house-chores_washing.md  | ok     |
 *—————————————*——————————————————————————*————————*
```

## Transforming Variables

You can also
[transform variables](https://f2.freshman.tech/guide/string-transforms.html).
For example, to uppercase the filename:

```bash
f2 -r "{p}_{f.up}{ext}"
```

Output:

```text
 *—————————————*——————————————————————————*————————*
 |  ORIGINAL   |         RENAMED          | STATUS |
 *—————————————*——————————————————————————*————————*
 | cleaning.md | house-chores_CLEANING.md | ok     |
 | laundry.md  | house-chores_LAUNDRY.md  | ok     |
 | mowing.md   | house-chores_MOWING.md   | ok     |
 | washing.md  | house-chores_WASHING.md  | ok     |
 *—————————————*——————————————————————————*————————*
```

These transformations (uppercase, lowercase, titlecase, etc.) are global and can
be applied to any variable.

## Customizing Variables

Some variables, like `{p}`, also offer unique customization options. Assuming
the absolute path for the `house-chores` directory is:

```text
/home/user/dev/demo/f2/docs/house-chores
```

You may retrieve each directory in the path by prefixing the `{p}` variable with
a number as in `{2p}`, `{3p}` etc. Here, this will yield the following output:

- `{p}` or `{1p}`: house-chores
- `{2p}`: docs
- `{3p}`: f2
- `{4p}`: dev
- and so on

```bash
f2 -r "{3p.up}_{2p}_{p}_{f.up}{ext}"
```

Output:

```text
*—————————————*——————————————————————————————————*————————*
|  ORIGINAL   |             RENAMED              | STATUS |
*—————————————*——————————————————————————————————*————————*
| cleaning.md | F2_docs_house-chores_CLEANING.md | ok     |
| laundry.md  | F2_docs_house-chores_LAUNDRY.md  | ok     |
| mowing.md   | F2_docs_house-chores_MOWING.md   | ok     |
| washing.md  | F2_docs_house-chores_WASHING.md  | ok     |
*—————————————*——————————————————————————————————*————————*
```

## Built-in Variables

The following variables have been provided for maximum flexibility in file
renaming:

- [Filepath variables](https://f2.freshman.tech/guide/filename-path-variables.html)
- [Exif variables](https://f2.freshman.tech/guide/exif-variables.html)
- [ID3 variables](https://f2.freshman.tech/guide/id3-variables.html)
- [Date variables](https://f2.freshman.tech/guide/date-variables.html)
- [Exiftool variables](https://f2.freshman.tech/guide/exiftool-variables.html)
- [File hash variables](https://f2.freshman.tech/guide/file-hash-variables.html)
- [String transformations](https://f2.freshman.tech/guide/string-transforms.html)
