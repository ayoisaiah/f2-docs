# Sorting Matches in F2

Sorting files before renaming them is often useful, especially when applying an
index in the replacement string. F2 offers robust sorting options to customize
this process.

## Using the `--sort` Flag

The `--sort` flag lets you define the sorting order, with several available
options:

- `default`: The default option which sorts the files in lexicographical order.
- `natural`: Sort according to natural order so that filenames containing
  numbers are ordered naturally.
- `size`: Sort the files by size.
- `mtime`: Sort the files by last modified time.
- `btime`: Sort the files by file birth time.
- `atime`: Sort the files by last access time.
- `ctime`: Sort the files by last changed time.
- `time_var`: Sort the files by a custom time variable (use with `--sort-var`).
- `int_var`: Sort the files using a custom integer variable (use with
  `--sort-var`).
- `string_var`: Sort the files using a custom string variable (use with
  `--sort-var`).

Sorting is in ascending order by default; for descending order, use `--sortr`:

```bash
f2 -f 'image' -r 'pic-{%03d}' --sort natural # ascending order
```

```bash
f2 -f 'image' -r 'pic-{%03d}' --sortr natural # descending order
```

## Sorting by Custom Variables

With `time_var`, `int_var`, and `string_var`, you can sort files using custom
attributes. These must be used
alongside``--sort-var to specify the variable. For instance, if sorting with`time_var`, `--sort-var`
should resolve to a datetime string:

```bash
f2 -f 'image' -r 'pic-{%03d}' --sort time_var --sort-var '{xt.DateTimeOriginal}'
```

Here, the `DateTimeOriginal` attribute (using
[exiftool](/guide/exiftool-variables)) sorts images by the date they were taken.
Without exiftool, the `{x.cdt}` variable could serve a similar purpose.

Another example, is sorting by ISO which will use `int_var` instead since the
ISO property is an integer:

```bash
f2 -f 'image' -r 'pic-{%03d}' --sort time_var --sort-var '{xt.ISO}'
```

## Directory-Specific Sorting

When renaming files recursively, the `--sort` option can affect the order in
which files are processed.

By default, sort operates globally, meaning all files across all subdirectories
are sorted together as one big list. If you're using [indexes](/guide/indexing),
it may not yield the ordering that you want.

```bash
f2 -f '.*\.txt' -r 'doc-{%03d}' -R --sort mtime
```

Output:

```text
*————————————*——————————————*————————*
|  ORIGINAL  |   RENAMED    | STATUS |
*————————————*——————————————*————————*
| b.txt      | doc-001      | ok     |
| dir1/e.txt | dir1/doc-002 | ok     |
| a.txt      | doc-003      | ok     |
| dir1/d.txt | dir1/doc-004 | ok     |
| dir1/f.txt | dir1/doc-005 | ok     |
| c.txt      | doc-006      | ok     |
*————————————*——————————————*————————*
```

If you want to keep your files organized within their respective directories,
you can append the `--sort-per-dir` option. This applies the sorting locally
within each directory.

```bash
f2 -f '.*\.txt' -r 'doc-{%03d}' -R --sort mtime --sort-per-dir
```

Output:

```text
*————————————*——————————————*————————*
|  ORIGINAL  |   RENAMED    | STATUS |
*————————————*——————————————*————————*
| b.txt      | doc-001      | ok     |
| a.txt      | doc-002      | ok     |
| c.txt      | doc-003      | ok     |
| dir1/e.txt | dir1/doc-004 | ok     |
| dir1/d.txt | dir1/doc-005 | ok     |
| dir1/f.txt | dir1/doc-006 | ok     |
*————————————*——————————————*————————*
```

In this command, each directory's `.txt` files are renamed in order of
modification time, but only compared with other files in the same directory.
This way, directory hierarchy is preserved, and files are consistently renamed
within their local context.
