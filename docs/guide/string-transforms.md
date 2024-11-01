# String Transformations

F2 offers a variety of powerful options for transforming file names in many
ways. These transformations can be used to adjust file names for consistency,
readability, or compliance with certain naming standards.

For instance, you can change the case of characters, clean up invalid
characters, or even parse and modify dates embedded in the file names. These
transformations can be applied to the entire filename, specific parts of the
filename, or a capture variable.

## Case Transformation

F2 provides several options to transform the case of characters in file names:

- `{.up}`: Converts the text to **UPPERCASE**.
- `{.lw}`: Converts the text to **lowercase**.
- `{.ti}`: Converts the text to **Title Case**.

### 1. Transform the Entire Filename to Lowercase

To make all characters in the file names lowercase, you can use:

```bash
f2 -r '{.lw}'
```

Result:

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                                  | RENAMED                                   | STATUS |
| ********************************************************************************************** |
| The Lost World by Arthur Conan Doyle.epub | the lost world by arthur conan doyle.epub | ok     |
| Ulysses by James Joyce.epub               | ulysses by james joyce.epub               | ok     |
| War and Peace by Graf Leo Tolstoy.epub    | war and peace by graf leo tolstoy.epub    | ok     |
└────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 2. Make the Author Names Uppercase

Capture the author names and change them to uppercase while preserving the
title:

```bash
f2 -f '(.*) by (.*)' -r '$1 - {<$2>.up}' -e
```

Result:

```text
┌───────────────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                                  | RENAMED                                  | STATUS |
| ********************************************************************************************* |
| The Lost World by Arthur Conan Doyle.epub | The Lost World - ARTHUR CONAN DOYLE.epub | ok     |
| Ulysses by James Joyce.epub               | Ulysses - JAMES JOYCE.epub               | ok     |
| War and Peace by Graf Leo Tolstoy.epub    | War and Peace - GRAF LEO TOLSTOY.epub    | ok     |
└───────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3. Transform to Title Case After Replacing Characters

Replace hyphens with spaces and transform the entire filename (excluding the
extension) to title case:

```text
f2 -f '-' -r ' ' -r '{.ti}' -e
```

Result:

```text
┌────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                      | RENAMED                       | STATUS |
| ********************************************************************** |
| 1984-george-orwell.epub       | 1984 George Orwell.epub       | ok     |
| hill-think-and-grow-rich.epub | Hill Think And Grow Rich.epub | ok     |
| the-shunned-house.epub        | The Shunned House.epub        | ok     |
└────────────────────────────────────────────────────────────────────────┘
```

## Cleaning Up Filenames

F2 offers special transformations to help clean up file names, especially useful
when migrating files between operating systems that have different naming
conventions and character restrictions:

- `{.win}`: Remove characters that are not allowed in Windows file names (`<`,
  `>`, `"`, `:`, `\`, `/`, `|`, `?`, `*`).
- `{.mac}`: Remove characters not allowed in macOS file names (`:`).
- `{.di}`: Remove diacritics, replacing accented characters with their closest
  non-accented equivalents (e.g., `très` bien.jpg becomes `tres bien.jpg`).

### 1. Strip Forbidden Characters for Windows

To remove forbidden characters from a filename and also reduce multiple spaces
to a single space:

```bash
f2 -f '.*' -r '{.win}' -f '[ ]{2,}' -r ' '
```

Result:

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                                          | RENAMED                                 | STATUS |
| **************************************************************************************************** |
| This file <> contains ::: ?\ forbidden characters | This file contains forbidden characters | ok     |
└──────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 2. Remove Diacritics from Filenames

Replace characters with diacritics in the file name:

```bash
f2 -f 'žůžo' -r '{.di}'
```

Result:

```text
┌──────────────────────────────┐
| ORIGINAL | RENAMED  | STATUS |
| **************************** |
| žůžo.txt | zuzo.txt | ok     |
└──────────────────────────────┘
```

## Parsing Arbitrary Text as Dates

You can attempt to parse arbitrary text in a filename as a date by using
`{.dt.<token>}`, where `<token>` corresponds to a
[date token](/guide/date-variables.html#date-tokens). This is especially useful
if the filename contains a date that you want to extract or format differently.

For example:

```bash
f2 -f "Screenshot from (.*)\.png" -r '{<$1>.dt.YYYY}/{<$1>.dt.MMMM}/{f}{ext}'
```

Result:

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                                | RENAMED                                                                         | STATUS |
| ********************************************************************************************************************************** |
| Screenshot from 2022-04-12 14:37:35.png | 2022/April/Screenshot from 2022-04-12 14:37:35.png                              | ok     |
| Screenshot from 2022-06-03 11:29:16.png | 2022/June/Screenshot from 2022-06-03 11:29:16.png                               | ok     |
| Screenshot from 2022-09-26 21:19:15.png | 2022/September/Screenshot from 2022-09-26 21:19:15.png                          | ok     |
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

```
