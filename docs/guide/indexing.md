# Renaming with an Index

F2 supports indexing through an auto-incrementing number, making it convenient
to create sequenced output such as `log001.txt`, `log002.txt`, `log003.txt`, and
so on.

The indexing format can be highly customizable to suit different needs,
providing control over step size, zero-padding, number format (such as Roman
numerals or binary), starting values, and even which numbers to skip.

The complete syntax for indexing is:

```text
{<start>%<padding>d<format><step><skip>}
```

Where everything in `<>` is optional. Below are some key features and examples
of how indexing can be used effectively.

## Indexing Syntax Overview

- `{%d}`: The basic syntax for indexing, which yields numbers starting from 1.

```text
1, 2, 3, 4, ...
```

- `{5%d}`: Specify a starting number. Here, 5 is the start value.

```text
5, 6, 7, 8, ...
```

- `{$1%d}`: Use a capture variable (must be numeric). This allows dynamic
  starting values, with optional auto-increment when paired with a step.

- `{5%02d}`: Add padding with zeros to make the number have at least two digits.

```text
05, 06, 07, ...
```

- `{%02dr}`: Use Roman numerals for indexing (`r`). Roman numerals are supported
  up to 3999 (MMMCMXCIX).

```text
I, II, III, IV, ...
```

- `{%db}`: Use binary format (`b`). Other options include hexadecimal (`h`) and
  octal (`o`).

```text
1, 10, 11, 100, ...
```

- `{10%03d5}`: Specify a step increment for the indexing. In this case, the
  start is 10, the minimum width is 3, and the numbers increment by 5.

```text
010, 015, 020, 025, ...
```

- `%d<1-5;7-8;11>`: Specify numbers to be skipped during indexing. In this
  example, numbers between 1-5, 7-8, and 11 are excluded.

```text
6, 9, 10, 12, ...
```

## Examples of Indexing

### 1. Index with Padding

This example renames a series of files to unsplash-image-001.jpg,
unsplash-image-002.jpg, etc., with a three-digit zero-padded index.

```bash
f2 -r "unsplash-image-{%03d}" -e
```

Output:

```text
┌──────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                                          | RENAMED                 | STATUS |
| ************************************************************************************ |
| kevin-wong-tt7aK2yV7xo-unsplash.jpg               | unsplash-image-001.jpg  | ok     |
| nathan-anderson-7TGVEgcTKlY-unsplash.jpg          | unsplash-image-002.jpg  | ok     |
| ...                                               | ...                     | ...    |
└──────────────────────────────────────────────────────────────────────────────────────┘
```

### 2. Index in Roman Numerals Starting from 10

Renaming files with Roman numeral indexing, starting at `X`:

```bash
f2 -r "unsplash-image-{10%03dr}" -e
```

Output:

```text
┌───────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                                          | RENAMED                  | STATUS |
| ************************************************************************************* |
| kevin-wong-tt7aK2yV7xo-unsplash.jpg               | unsplash-image-X.jpg     | ok     |
| nathan-anderson-7TGVEgcTKlY-unsplash.jpg          | unsplash-image-XI.jpg    | ok     |
| ...                                               | ...                      | ...    |
└───────────────────────────────────────────────────────────────────────────────────────┘
```

### 3. Skip Some Numbers While Indexing

In this example, numbers between `1-5` and `10-20` are skipped:

```bash
f2 -r "unsplash-image-{%03d<1-5;10-20>}" -e
```

Output:

```text
┌──────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                                          | RENAMED                 | STATUS |
| ************************************************************************************ |
| kevin-wong-tt7aK2yV7xo-unsplash.jpg               | unsplash-image-006.jpg  | ok     |
| nathan-anderson-7TGVEgcTKlY-unsplash.jpg          | unsplash-image-007.jpg  | ok     |
| ...                                               | ...                     | ...    |
└──────────────────────────────────────────────────────────────────────────────────────┘
```

### 4. Auto Increment in Steps of 5

Here, the index starts at 1 and increments in steps of 5:

```bash
f2 -r "unsplash-image-{%03d5}" -e
```

Output:

```text
┌──────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                                          | RENAMED                 | STATUS |
| ************************************************************************************ |
| kevin-wong-tt7aK2yV7xo-unsplash.jpg               | unsplash-image-001.jpg  | ok     |
| nathan-anderson-7TGVEgcTKlY-unsplash.jpg          | unsplash-image-006.jpg  | ok     |
| ...                                               | ...                     | ...    |
└──────────────────────────────────────────────────────────────────────────────────────┘
```

### 5. Auto Increment in Negative Steps

Starting from 20 and decreasing by 2 each time:

```bash
f2 -r "unsplash-image-{20%03d-2}" -e
```

Output:

```text
┌──────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                                          | RENAMED                 | STATUS |
| ************************************************************************************ |
| kevin-wong-tt7aK2yV7xo-unsplash.jpg               | unsplash-image-020.jpg  | ok     |
| nathan-anderson-7TGVEgcTKlY-unsplash.jpg          | unsplash-image-018.jpg  | ok     |
| ...                                               | ...                     | ...    |
└──────────────────────────────────────────────────────────────────────────────────────┘
```

### 6. Multiple Indices in a Filename

Using multiple index formats, one with a decimal index and another with Roman
numerals:

```bash
f2 -r "{10%05d}-unsplash-image-{%03dr}" -e
```

Output:

```text
┌────────────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                                          | RENAMED                       | STATUS |
| ****************************************************************************************** |
| kevin-wong-tt7aK2yV7xo-unsplash.jpg               | 00010-unsplash-image-I.jpg    | ok     |
| nathan-anderson-7TGVEgcTKlY-unsplash.jpg          | 00011-unsplash-image-II.jpg   | ok     |
| ...                                               | ...                           | ...    |
└────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 7. Indexing Using a Capture Variable

You can use a capture variable to generate the index. The number is not
incremented unless an explicit `<step>` is used.

Here `$1` is used to extract an existing number, then it's padded to 3 digits:

```bash
f2 -f 'doc(\d+)' -r 'doc_{$1%03d}' -e
```

Output:

```text
┌──────────────────────────────────┐
| ORIGINAL  | RENAMED     | STATUS |
| ******************************** |
| doc1.txt  | doc_001.txt | ok     |
| doc4.txt  | doc_004.txt | ok     |
| doc99.txt | doc_099.txt | ok     |
└──────────────────────────────────┘
```

## Resetting Indices Per Directory

When you're using indices in a renaming operation that recurses into
subdirectories, you can use the `--reset-index-per-dir` option to reset the
index in each directory instead of globally incrementing for the whole
operation.

**Without --reset-index-per-dir**

```bash
f2 -r '{%03d}' -R
```

Output:

```text
*——————————————————————————*——————————————————*————————*
|         ORIGINAL         |     RENAMED      | STATUS |
*——————————————————————————*——————————————————*————————*
| 01.txt                   |              001 | ok     |
| 02.txt                   |              002 | ok     |
| 03.txt                   |              003 | ok     |
| house-chores/cleaning.md | house-chores/004 | ok     |
| house-chores/laundry.md  | house-chores/005 | ok     |
| house-chores/mowing.md   | house-chores/006 | ok     |
*——————————————————————————*——————————————————*————————*
```

**With --reset-index-per-dir**

```bash
f2 -r '{%03d}' -R --reset-index-per-dir
```

Output:

```text
*——————————————————————————*——————————————————*————————*
|         ORIGINAL         |     RENAMED      | STATUS |
*——————————————————————————*——————————————————*————————*
| 01.txt                   |              001 | ok     |
| 02.txt                   |              002 | ok     |
| 03.txt                   |              003 | ok     |
| house-chores/cleaning.md | house-chores/001 | ok     |
| house-chores/laundry.md  | house-chores/002 | ok     |
| house-chores/mowing.md   | house-chores/003 | ok     |
*——————————————————————————*——————————————————*————————*
```
