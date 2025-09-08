# Conditional File Selection with Find Expressions

The find expression feature allows you to select files for renaming based on
powerful, custom conditions. Instead of just matching filenames, you can filter
files using their metadata with `-f/--find`.

The core idea is to provide an expression that evaluates to either `true` or
`false` for each file. Only the files for which the expression is true will be
included in the renaming operation.

## Syntax

The general syntax is:

```text
-f '{{<variable>} <operator> <value>}'
```

When comparing string values, you need need to wrap them in double quotes or
backticks:

```text
-f '{"{<string_variable>}" == "some_text"}'
```

The `<variable>` part refers to all the
[built-in variables](/guide/how-variables-work.html#built-in-variables)
supported by F2.

F2's find expressions support is backed by
[goval](https://github.com/maja42/goval) so see their documentation to learn
more about the supported `<operator>`s.

Note that any selected files will have their entire filename replaced but you
can control this by chaining multiple file/replace operations:

```text
f2 -f '<find_expression> -r '{f}{ext}' -f '<regex_expression>' -r '<new_name>'
```

## 1. Filtering by Time and Date

A common task is to manage files based on their age. You can use the `.since`
attribute, which provides the number of seconds since the file's timestamp.

### Select files older than 30 days

The expression calculates 30 days in seconds `(30 * 86400)` and compares it to
the file's birth time:

```bash
# Select files with a birth time greater than 30 days ago
f2 -f '{{btime.since} > (30 * 86400)}'
```

### Select images created less than a year ago

This example uses the creation date from EXIF data (`x.cdt`):

```bash
# Select images with a creation date less than 365 days ago
f2 -f '{{x.cdt.since} < (365 * 86400)}'
```

## 2. Filtering by Image EXIF Data

Find expressions are incredibly useful for photographers and anyone working with
large image collections.

### Select files from a specific camera model

```bash
# Note the quotes
f2 -f '{"{x.model}" == "Canon EOS 5D Mark III"}'
```

### Select images from a list of camera brands

```bash
f2 -f '{"{x.make}" in ["SONY", "CANON"]}'
```

### Select only high-ISO images

```bash
f2 -f '{{x.iso > 2000}}'
```

## 3. Organizing a Downloads Folder

You can combine find expressions with other f2 flags to create powerful
workflows. This example moves files and directories older than 30 days into
organized `year/month` subdirectories, while excluding any directories that have
already been organized (e.g., 2024, 2025).

```bash
f2 -E '^20\d{2}$' -d -f '{{btime.since} > (30 * 86400)}' -r '{btime.YYYY}/{btime.MM}/{f}{ext}'
```

Let's break it down:

- `-E '^20\d{2}$'`: Excludes any items whose names look like a year (e.g.,
  "2024", "2025") to avoid recursive moving.

- `-d`: Includes directories in the operation.

- `-f '{{btime.since} > (30 * 86400)}':` The **find expression** that selects
  only items older than 30 days.

- `-r '{btime.YYYY}/{btime.MM}/{f}{ext}':` The rename pattern that moves the
  selected files into a Year/Month/ directory structure.

## Supported Functions

These functions can be used inside find expressions to perform more complex
comparisons and data transformations.

- `strlen`: Calculates the number of characters in a string.

  ```bash
  f2 -f '{strlen({xt.FileName}) > 15}'
  ```

- `dur`: Parses a duration string (like "2d", "1h30m") and converts it into the
  total number of seconds.

  ```bash
  f2 -f '{{btime.since} < dur("2d")}'
  ```

- `contains`: Checks if a string contains a specific substring. This function is
  case-sensitive.

  ```bash
  f2 -f '{contains("{f}", "night-shoot")}'
  ```

- `size`: Parses a human-readable file size string (e.g., "2.5 MB", "512 kB")
  and converts it into bytes.

  ```bash
  f2 -f '{size("{xt.FileSize}") > size("50MB")}'
  ```

- `matches`: Checks if a string matches a given regular expression.

  ```bash
  f2 -f '{matches("{f}", "^DSC_\\d{4}$")}'
  ```
